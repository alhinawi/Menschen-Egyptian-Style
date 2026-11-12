export interface MeaningSnapshot {
  german: string;
  arabic: string;
  mode: 'word' | 'sentence';
  wordDisabled: boolean;
  sentenceDisabled: boolean;
  audioDisabled: boolean;
  pendingHidden: boolean;
  pending: string;
  machine: boolean;
  machineState: 'idle'|'loading'|'done'|'error';
}

type ActionMap = Record<string, (() => void) | undefined>;

const initial: MeaningSnapshot = {german: '', arabic: '', mode: 'word', wordDisabled: true, sentenceDisabled: true, audioDisabled: true, pendingHidden: true, pending: '', machine:false, machineState:'idle'};
let snapshot = initial, actions: ActionMap = {}, listeners = new Set<() => void>();

export const meaningStore = {
  getSnapshot: (): MeaningSnapshot => snapshot,
  subscribe(fn: () => void): () => void {
    listeners.add(fn);
    return () => {listeners.delete(fn);};
  },
  update(next: Partial<MeaningSnapshot>): void {
    snapshot = {...snapshot, ...next};
    listeners.forEach(fn => fn());
  },
  connect(next: ActionMap): () => void {
    actions = next;
    return () => {
      actions = {};
      snapshot = initial;
    };
  },
  act(action: string): void {
    actions[action]?.();
  }
};
