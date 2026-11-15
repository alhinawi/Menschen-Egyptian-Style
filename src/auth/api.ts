// Client for the Menscheny API (Cloudflare Workers + D1, see backend/).
// The token stays in localStorage; every call works anonymously too.

// Dev override: VITE_API_BASE at build time, or a localStorage flag for a
// locally running worker (wrangler dev), without touching production builds.
const BASE = (() => {
  try {
    const override = localStorage.getItem('menscheny-api-base');
    if (override) return override;
  } catch {
    // private mode
  }
  return (import.meta.env?.VITE_API_BASE as string | undefined) || 'https://menscheny-api.hnz.workers.dev';
})();
const TOKEN_KEY = 'menscheny-token';

// Capture an auth-related URL hash the moment this module evaluates: the book
// router rewrites location.hash to page anchors (#cover, #18, ...) on boot,
// which would eat #auth-callback / #email-verified before React mounts.
const EARLY_HASH = typeof window !== 'undefined' ? window.location.hash : '';

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  /** profile photo as a data URL or Google picture URL, null when unset */
  avatar?: string | null;
  /** Google profile picture URL captured at sign-in, for switching back */
  google_avatar?: string | null;
  /** false until an email/password sign-up confirms the inbox via the link */
  email_verified?: boolean;
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(t: string | null) {
  try {
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // private mode
  }
}

async function req<T>(path: string, opts: { method?: string; body?: unknown; auth?: boolean; keepalive?: boolean } = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (opts.auth && token) headers.Authorization = `Bearer ${token}`;
  const r = await fetch(`${BASE}/api${path}`, {
    method: opts.method || 'GET',
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    keepalive: opts.keepalive,
  });
  if (r.status === 401 && opts.auth) setToken(null);
  const data = (await r.json().catch(() => ({}))) as Record<string, unknown>;
  if (!r.ok) throw new Error(typeof data.error === 'string' ? data.error : `http_${r.status}`);
  return data as T;
}

export async function register(name: string, email: string, password: string, progress?: Record<string, string>): Promise<ApiUser> {
  const d = await req<{ user: ApiUser; token: string }>('/auth/register', { method: 'POST', body: { name, email, password, ...(progress ? { progress } : {}) } });
  setToken(d.token);
  return d.user;
}

export async function login(email: string, password: string): Promise<ApiUser> {
  const d = await req<{ user: ApiUser; token: string }>('/auth/login', { method: 'POST', body: { email, password } });
  setToken(d.token);
  return d.user;
}

export async function logout(): Promise<void> {
  try {
    await req('/auth/logout', { method: 'POST', auth: true });
  } catch {
    // fine either way; drop the local token
  }
  setToken(null);
}

export function me(): Promise<{ user: ApiUser }> {
  return req<{ user: ApiUser }>('/me', { auth: true });
}

export async function updateMe(patch: { name?: string; avatar?: string | null }): Promise<ApiUser> {
  const d = await req<{ user: ApiUser }>('/me', { method: 'PATCH', auth: true, body: patch });
  return d.user;
}

// ---------- leaderboard ----------

export interface LeaderboardRow { rank: number; name: string; points: number }
export function getLeaderboard(): Promise<{ top: LeaderboardRow[]; me: { rank: number; points: number } | null }> {
  return req('/leaderboard', { auth: true });
}

// ---------- progress sync ----------

export function getProgress(): Promise<{ progress: Record<string, unknown> | null; updated_at: string | null }> {
  return req('/progress', { auth: true });
}

export function putProgress(progress: Record<string, string>, keepalive = false): Promise<{ updated_at: string }> {
  return req('/progress', { method: 'PUT', auth: true, body: { progress }, keepalive });
}

// ---------- Google OAuth ----------

export interface AuthConfig {
  google: boolean;
  /** true only when a real mail sender is configured on the worker */
  emailVerification: boolean;
}

/** which sign-in providers the backend is configured for; defaults to hidden */
export async function getAuthConfig(): Promise<AuthConfig> {
  try {
    const r = await fetch(`${BASE}/api/auth/config`);
    if (!r.ok) return { google: false, emailVerification: false };
    const body = await r.json();
    return { google: Boolean(body && body.google), emailVerification: Boolean(body && body.emailVerification) };
  } catch {
    return { google: false, emailVerification: false };
  }
}

/** where the site sends the browser to start Google sign-in */
export function googleLoginUrl(): string {
  return `${BASE}/api/auth/google/start?origin=${encodeURIComponent(window.location.origin)}`;
}

export function resendVerification(): Promise<{ message: string }> {
  return req('/auth/resend-verification', { method: 'POST', auth: true });
}

/**
 * The verification link in the email lands on the worker, which redirects to
 * <origin>/#email-verified?status=ok|expired|invalid. Reads and clears it.
 */
export function consumeEmailVerifiedCallback(): string | null {
  const m = /^#email-verified\?(.*)$/.exec(EARLY_HASH);
  if (!m) return null;
  const status = new URLSearchParams(m[1]).get('status');
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  return status;
}

/**
 * The worker redirects back to <origin>/#auth-callback?token=...&provider=google
 * after Google sign-in. Reads and clears that hash, saving the API token.
 * Returns the token (or "error:<code>") when a callback was consumed.
 */
export function consumeGoogleAuthCallback(): string | null {
  const m = /^#auth-callback\?(.*)$/.exec(EARLY_HASH);
  if (!m) return null;
  const params = new URLSearchParams(m[1]);
  const token = params.get('token');
  const error = params.get('error');
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  if (token) {
    setToken(token);
    return token;
  }
  return error ? `error:${error}` : null;
}
