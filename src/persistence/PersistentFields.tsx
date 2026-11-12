import {createContext, createElement, useContext, useReducer, useMemo} from 'react';
import type {ReactNode} from 'react';
import type {PersistenceRuntime} from '../types/runtime';

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface PersistenceController {
  read(key: string): unknown;
  update(values: Record<string, unknown>): void;
  connect(next?: PersistenceRuntime): () => void;
  input(el: FieldElement): void;
}

export const PersistenceContext = createContext<PersistenceController | null>(null);

export function usePersistenceController(): PersistenceController {
  const [, dispatch] = useReducer((state: Record<string, unknown>, action: Record<string, unknown>) => ({...state, ...action}), {});
  const controller = useMemo<PersistenceController>(() => {
    let runtime: PersistenceRuntime | null = null;
    const fields = (): FieldElement[] => [...document.querySelectorAll<FieldElement>('input,select,textarea')].filter(el => el.id !== 'pageJump');
    const key = (el: FieldElement, list: FieldElement[]): string => el.dataset.note || 'field-' + list.indexOf(el);
    return {
      read(key) {
        return runtime?.getState()[key];
      },
      update(values) {
        runtime?.update(values);
        dispatch(values);
      },
      connect(next) {
        runtime = next ?? null;
        if (!runtime) return () => {};
        const saved = runtime.getState();
        const list = fields();
        for (const el of list) {
          const value = saved[key(el, list)];
          if (el instanceof HTMLInputElement && (el.type === 'radio' || el.type === 'checkbox')) el.checked = value === true;
          else if (typeof value === 'string') el.value = value;
        }
        dispatch(saved);
        return () => {runtime = null;};
      },
      input(el) {
        if (!runtime) return;
        const list = fields();
        if (!list.includes(el)) return;
        const checkable = el instanceof HTMLInputElement && (el.type === 'radio' || el.type === 'checkbox');
        const updates: Record<string, unknown> = {[key(el, list)]: checkable ? (el as HTMLInputElement).checked : el.value};
        if (el instanceof HTMLInputElement && el.type === 'radio') for (const peer of list.filter(p => p !== el && p.name === el.name && p instanceof HTMLInputElement && p.type === 'radio')) updates[key(peer, list)] = false;
        runtime.update(updates);
        dispatch(updates);
      }
    };
  }, []);
  return controller;
}

export function PersistentField({tag, attrs, children}: {tag: string; attrs: Record<string, unknown>; children: ReactNode[]}) {
  useContext(PersistenceContext);
  return createElement(tag, attrs, ...children);
}
