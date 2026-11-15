// Progress sync: mirrors the learner's localStorage progress and settings into
// the account on the Menscheny API (D1), so answers survive a new device.
//
// Local-first: the site keeps writing to localStorage exactly as before. This
// module collects the synced namespace into one blob, pushes it (debounced)
// while signed in, and on sign-in merges the server blob with the local one.
// The merge never deletes a key and never downgrades progress: a checked-off
// exercise stays checked off, a written answer is never replaced by an empty
// one. That is the "no data loss" rule, in both directions.

import * as api from './api';

// What belongs to the learner's progress/settings. The API token
// (menscheny-token) and the dev API-base override never match these.
const SYNCED_PREFIXES = ['menschen-book-', 'native-'];
const SYNCED_EXACT = new Set(['menschen-ui-language', 'menschen-translation-mode', 'menschen.feedbackVoices']);

export function isSyncedKey(key: string): boolean {
  return SYNCED_EXACT.has(key) || SYNCED_PREFIXES.some((p) => key.startsWith(p));
}

export type ProgressBlob = Record<string, string>;

export function collectLocalProgress(): ProgressBlob {
  const blob: ProgressBlob = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !isSyncedKey(key)) continue;
      const value = localStorage.getItem(key);
      if (value !== null) blob[key] = value;
    }
  } catch {
    // private mode: nothing to collect
  }
  return blob;
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

// Scalar conflict rule: progress wins over its absence; otherwise the local
// (most recently used device) value wins.
function preferScalar(server: unknown, local: unknown): unknown {
  if (server === true || local === true) return true;
  if (typeof server === 'number' && typeof local === 'number') return Math.max(server, local);
  if (typeof server === 'string' && typeof local === 'string') {
    if (server && !local) return server;
    return local;
  }
  return local === undefined ? server : local;
}

function mergeJson(server: unknown, local: unknown): unknown {
  if (server === undefined) return local;
  if (local === undefined) return server;
  if (isPlainObject(server) && isPlainObject(local)) {
    const out: Record<string, unknown> = {...server};
    for (const key of Object.keys(local)) out[key] = mergeJson(server[key], local[key]);
    return out;
  }
  return preferScalar(server, local);
}

function mergeValue(serverRaw: string | undefined, localRaw: string | undefined): string | undefined {
  if (serverRaw === undefined) return localRaw;
  if (localRaw === undefined) return serverRaw;
  if (serverRaw === localRaw) return localRaw;
  let server: unknown, local: unknown;
  try {
    server = JSON.parse(serverRaw);
  } catch {
    return localRaw;
  }
  try {
    local = JSON.parse(localRaw);
  } catch {
    return localRaw;
  }
  const merged = mergeJson(server, local);
  try {
    return JSON.stringify(merged);
  } catch {
    return localRaw;
  }
}

export function mergeBlobs(server: ProgressBlob, local: ProgressBlob): ProgressBlob {
  const out: ProgressBlob = {...server};
  for (const key of Object.keys(local)) {
    const merged = mergeValue(server[key], local[key]);
    if (merged !== undefined) out[key] = merged;
  }
  return out;
}

// ---------- sync engine ----------

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

let status: SyncStatus = 'idle';
const listeners = new Set<() => void>();
function setStatus(next: SyncStatus) {
  if (status === next) return;
  status = next;
  listeners.forEach((fn) => fn());
}
export const getSyncStatus = () => status;
export function subscribeSyncStatus(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

let applying = false; // true while we write merged state into localStorage
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let lastFocusPull = 0;
let installed = false;

function applyToLocal(blob: ProgressBlob, localSnapshot?: ProgressBlob) {
  applying = true;
  try {
    for (const [key, value] of Object.entries(blob)) {
      try {
        const current = localStorage.getItem(key);
        // A key the user changed while the server round-trip was in flight is
        // newer than the snapshot the merge was built from: keep theirs.
        const snapshotValue = localSnapshot ? (localSnapshot[key] ?? null) : null;
        if (localSnapshot && current !== null && current !== snapshotValue) {
          blob[key] = current;
          continue;
        }
        if (current !== value) localStorage.setItem(key, value);
      } catch {
        // private mode: skip
      }
    }
    // The UI language and sound preference modules cache their value in memory;
    // tell every open tab the storage changed so they re-read it.
    window.dispatchEvent(new StorageEvent('storage', {key: null}));
  } finally {
    applying = false;
  }
}

function schedulePush() {
  if (!api.getToken()) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushTimer = null;
    void pushNow();
  }, 1500);
}

async function pushNow() {
  if (!api.getToken()) return;
  setStatus('syncing');
  try {
    await api.putProgress(collectLocalProgress());
    setStatus('synced');
  } catch {
    setStatus('error');
  }
}

/** Pull the server blob, merge with local (never losing either side), apply
 * locally and push the union back when it adds something. */
export async function syncDown(): Promise<void> {
  if (!api.getToken()) return;
  setStatus('syncing');
  try {
    const server = await api.getProgress();
    const serverBlob = (server.progress ?? {}) as ProgressBlob;
    const localSnapshot = collectLocalProgress();
    const merged = mergeBlobs(serverBlob, localSnapshot);
    applyToLocal(merged, localSnapshot);
    if (JSON.stringify(merged) !== JSON.stringify(serverBlob)) await api.putProgress(merged);
    setStatus('synced');
  } catch {
    setStatus('error');
  }
}

/** Hook localStorage writes once: any write to a synced key schedules a push.
 * The adapters write to localStorage directly in dozens of places; wrapping
 * Storage.prototype keeps this one integration point instead of touching them. */
export function installProgressSync() {
  if (installed || typeof window === 'undefined') return;
  installed = true;

  const setItem = Storage.prototype.setItem;
  const removeItem = Storage.prototype.removeItem;
  const clear = Storage.prototype.clear;
  Storage.prototype.setItem = function (key: string, value: string) {
    setItem.call(this, key, value);
    if (!applying && this === localStorage && isSyncedKey(key)) schedulePush();
  };
  Storage.prototype.removeItem = function (key: string) {
    removeItem.call(this, key);
    if (!applying && this === localStorage && isSyncedKey(key)) schedulePush();
  };
  Storage.prototype.clear = function () {
    clear.call(this);
    if (!applying && this === localStorage) schedulePush();
  };

  // Other tabs of the same browser wrote something.
  window.addEventListener('storage', (e) => {
    if (applying) return;
    if (e.key === null || isSyncedKey(e.key)) schedulePush();
  });

  // Another device may have pushed while this tab slept: re-merge on focus.
  window.addEventListener('focus', () => {
    const now = Date.now();
    if (now - lastFocusPull < 60_000) return;
    lastFocusPull = now;
    void syncDown();
  });

  // Best effort flush when the page goes away.
  window.addEventListener('pagehide', () => {
    if (api.getToken()) void api.putProgress(collectLocalProgress(), true);
  });
}

/** Called once auth confirms a signed-in user. */
export async function startProgressSync() {
  installProgressSync();
  await syncDown();
}

export function stopProgressSync() {
  if (pushTimer) {
    clearTimeout(pushTimer);
    pushTimer = null;
  }
  setStatus('idle');
}
