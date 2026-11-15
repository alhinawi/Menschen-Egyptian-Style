// Auth state store for the Menscheny account (same pattern as the other
// family apps: tiny external store + useSyncExternalStore).
import { useCallback, useSyncExternalStore } from 'react';
import * as api from './api';

export type AuthStatus = 'loading' | 'anon' | 'authed';
export interface AuthState {
  status: AuthStatus;
  user: api.ApiUser | null;
}

let state: AuthState = { status: 'loading', user: null };
const listeners = new Set<() => void>();
let started = false;

function emit() {
  listeners.forEach((l) => l());
}
function set(s: AuthState) {
  state = s;
  emit();
}

export async function signIn(email: string, password: string) {
  const user = await api.login(email, password);
  set({ status: 'authed', user });
}

export async function signUp(name: string, email: string, password: string) {
  const user = await api.register(name, email, password);
  set({ status: 'authed', user });
}

export async function signOut() {
  await api.logout();
  set({ status: 'anon', user: null });
}

function init() {
  if (started || typeof window === 'undefined') return;
  started = true;
  // A Google sign-in redirect (#auth-callback?token=...) takes priority: the
  // worker already issued the API token, we just load the account behind it.
  const cb = api.consumeGoogleAuthCallback();
  if (cb && cb.startsWith('error:')) {
    set({ status: 'anon', user: null });
    return;
  }
  if (!api.getToken()) {
    set({ status: 'anon', user: null });
    return;
  }
  api
    .me()
    .then((d) => set({ status: 'authed', user: d.user }))
    .catch(() => set({ status: 'anon', user: null }));
}

export function useAuth(): AuthState {
  const subscribe = useCallback((cb: () => void) => {
    listeners.add(cb);
    init();
    return () => {
      listeners.delete(cb);
    };
  }, []);
  return useSyncExternalStore(subscribe, () => state, () => state);
}
