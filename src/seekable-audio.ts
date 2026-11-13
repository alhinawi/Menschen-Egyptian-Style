// The book's mp3s are static assets. Some hosts (Cloudflare Pages) answer HTTP
// Range requests with 200 and the full body instead of 206, and Chrome then
// restarts playback from 0 whenever the user drags the progress bar to an
// unbuffered position. Detect that once per session; on such hosts, download
// the whole track into a blob: URL before the first play. Blob media is fully
// seekable in memory, so the progress bar works everywhere.
//
// The probe uses a cache-busting query on purpose: Cloudflare honors ranges
// for edge-cached variants but answers 200 on a cache miss, and media-element
// requests key the cache differently than fetch(), so probing the plain URL
// can say 206 while real playback requests still get 200. A cache-miss probe
// is the worst case; hosts that serve 206 even on a miss (Vercel) skip the
// conversion entirely.

const MAX_BLOBS = 10; // cap held track bytes; oldest unused blobs are revoked

let probe: Promise<boolean> | null = null;
const blobs = new Map<string, Promise<string>>(); // original src -> blob url
const busy = new WeakSet<HTMLAudioElement>();

function httpSrc(a: HTMLAudioElement): string | undefined {
  const attr = a.getAttribute('src');
  if (attr) return attr.startsWith('blob:') ? undefined : attr;
  const s = a.querySelector('source')?.getAttribute('src');
  return s && !s.startsWith('blob:') ? s : undefined;
}

function rangesBroken(src: string): Promise<boolean> {
  if (!probe) {
    const miss = src + (src.includes('?') ? '&' : '?') + '__rangeprobe=1';
    probe = fetch(miss, {headers: {Range: 'bytes=0-0'}})
      .then(r => {
        void r.body?.cancel().catch(() => {});
        return r.status !== 206;
      })
      .catch(() => false); // network trouble: leave playback alone
  }
  return probe;
}

function blobFor(src: string): Promise<string> {
  let p = blobs.get(src);
  if (!p) {
    p = fetch(src)
      .then(r => {
        if (!r.ok) throw new Error('audio fetch failed: ' + r.status);
        return r.blob();
      })
      .then(b => URL.createObjectURL(b));
    blobs.set(src, p);
    void p.then(() => trimBlobs()).catch(() => {});
  }
  return p;
}

function trimBlobs() {
  while (blobs.size > MAX_BLOBS) {
    const oldest = blobs.keys().next().value;
    if (oldest === undefined) return;
    const urlPromise = blobs.get(oldest);
    let inUse = false;
    document.querySelectorAll<HTMLAudioElement>('audio').forEach(a => {
      if (a.dataset.originalSrc === oldest) inUse = true;
    });
    if (inUse) return; // every cached track is on a live element; keep them
    blobs.delete(oldest);
    void urlPromise?.then(url => URL.revokeObjectURL(url)).catch(() => {});
  }
}

async function ensureSeekable(a: HTMLAudioElement, resumeAt?: number): Promise<void> {
  const src = httpSrc(a);
  if (!src || busy.has(a) || !(await rangesBroken(src))) return;
  busy.add(a);
  try {
    const url = await blobFor(src);
    const wasPlaying = !a.paused && !a.ended;
    const restore = resumeAt ?? a.currentTime;
    a.dataset.originalSrc = src;
    const onMeta = () => {
      a.removeEventListener('loadedmetadata', onMeta);
      try {
        if (restore > 0 && restore <= (a.duration || restore)) a.currentTime = restore;
      } catch {}
    };
    a.addEventListener('loadedmetadata', onMeta);
    const child = a.querySelector('source');
    if (!a.getAttribute('src') && child) {
      child.setAttribute('src', url);
      a.load();
    } else {
      a.src = url;
    }
    if (wasPlaying) void HTMLMediaElement.prototype.play.call(a);
  } catch {
    // conversion failed; the original src still plays, seeking stays limited
  } finally {
    busy.delete(a);
  }
}

export function installSeekableAudio() {
  const realPlay = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function (this: HTMLMediaElement) {
    if (this instanceof HTMLAudioElement && httpSrc(this)) {
      return ensureSeekable(this).then(() => realPlay.call(this));
    }
    return realPlay.call(this);
  };
  // Seeking a native-controls player before the first play hits the same
  // restart; convert on demand and restore the requested position.
  document.addEventListener(
    'seeking',
    e => {
      const a = e.target;
      if (a instanceof HTMLAudioElement && httpSrc(a)) void ensureSeekable(a, a.currentTime);
    },
    true,
  );
}
