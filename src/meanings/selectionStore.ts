export interface SelectionSnapshot {
  mode: 'word' | 'sentence';
  selecting: boolean;
  actionHidden: boolean;
  actionLabel: string;
}

type ActionMap = Record<string, (() => void) | undefined>;

let snapshot: SelectionSnapshot = {mode: 'word', selecting: false, actionHidden: true, actionLabel: 'ترجم التحديد واسمعه'}, actions: ActionMap = {}, listeners = new Set<() => void>();

export const selectionStore = {
  getSnapshot: (): SelectionSnapshot => snapshot,
  subscribe(fn: () => void): () => void {
    listeners.add(fn);
    return () => {listeners.delete(fn);};
  },
  update(next: Partial<SelectionSnapshot>): void {
    snapshot = {...snapshot, ...next};
    listeners.forEach(fn => fn());
  },
  connect(next: ActionMap): () => void {
    actions = next;
    return () => {actions = {};};
  },
  act(name: string): void {
    actions[name]?.();
  }
};
