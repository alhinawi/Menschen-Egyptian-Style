// Timers scheduled by a service after its initial mount still belong to it.
export interface ServiceLifecycle {
  timeout(fn: (...args: unknown[]) => void, ms: number, ...args: unknown[]): number | undefined;
  frame(fn: (time: number) => void): number | undefined;
  dispose(): void;
}

export function serviceLifecycle(): ServiceLifecycle {
  const pending = new Set<number>(), frames = new Set<number>();
  let disposed = false;
  return {
    timeout(fn, ms, ...args) {
      if (disposed) return undefined;
      const id = window.setTimeout(() => {
        pending.delete(id);
        if (!disposed) fn(...args);
      }, ms);
      pending.add(id);
      return id;
    },
    frame(fn) {
      if (disposed) return undefined;
      const id = window.requestAnimationFrame(time => {
        frames.delete(id);
        if (!disposed) fn(time);
      });
      frames.add(id);
      return id;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const id of pending) window.clearTimeout(id);
      pending.clear();
      for (const id of frames) window.cancelAnimationFrame(id);
      frames.clear();
    }
  };
}
