import type {PersistenceRuntime} from '../types/runtime';

export interface ScanExerciseRow {
  label: string;
  answer: string;
}

export interface ScanExercise {
  id: string;
  number: string;
  title: string;
  note?: string;
  rows: ScanExerciseRow[];
  choices?: string[];
}

export interface ScanPage {
  page: number;
  title: string;
  tracks: number[];
  exercises: ScanExercise[];
}

export interface VocabItem {
  id: string;
  text: string;
  arabic: string;
  lesson: number;
}

interface ScanSnapshot {
  page: ScanPage | null;
  vocabulary: VocabItem[];
  values: Record<string, unknown>;
  revision: number;
}

let snapshot: ScanSnapshot = {page: null, vocabulary: [], values: {}, revision: 0}, runtime: PersistenceRuntime | null = null, listeners = new Set<() => void>();

export const scanStore = {
  getSnapshot: (): ScanSnapshot => snapshot,
  subscribe(fn: () => void): () => void {
    listeners.add(fn);
    return () => {listeners.delete(fn);};
  },
  connect(next: PersistenceRuntime): () => void {
    runtime = next;
    return () => {runtime = null;};
  },
  refresh(page: ScanPage): void {
    snapshot = {...snapshot, page, vocabulary: (window.AB1720_VOCAB as VocabItem[]) || [], values: {...runtime!.getState()}, revision: snapshot.revision + 1};
    listeners.forEach(fn => fn());
  },
  save(updates: Record<string, unknown>, clearKey?: string): void {
    runtime!.update(updates, clearKey);
    snapshot = {...snapshot, values: {...runtime!.getState()}};
    listeners.forEach(fn => fn());
  }
};
