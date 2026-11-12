// Lifecycle boundary for fold, geometry, audio and canvas services.
// Native React components own content, controls and exercise state.
import type {ExerciseRuntime, LessonDispose, LessonInitializer, PersistenceRuntime} from '../types/runtime';

type ListenerRecord = [EventTarget, string, EventListenerOrEventListenerObject | null, boolean | AddEventListenerOptions | undefined];

export function mountLesson(initializers: LessonInitializer[]): LessonDispose {
  const listeners: ListenerRecord[] = [], timeouts: number[] = [], intervals: number[] = [], disposers: Array<() => void> = [];
  let exercise: ExerciseRuntime | undefined, persistence: PersistenceRuntime | undefined;
  const originalAdd = EventTarget.prototype.addEventListener;
  const originalTimeout = window.setTimeout, originalInterval = window.setInterval;
  const before = new Set<Element>(document.body.children);
  EventTarget.prototype.addEventListener = function (this: EventTarget, type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions) {
    listeners.push([this, type, listener, options]);
    return originalAdd.call(this, type, listener, options);
  };
  window.setTimeout = ((...args: Parameters<typeof setTimeout>) => {
    const id = originalTimeout(...args);
    timeouts.push(id);
    return id;
  }) as typeof setTimeout;
  window.setInterval = ((...args: Parameters<typeof setInterval>) => {
    const id = originalInterval(...args);
    intervals.push(id);
    return id;
  }) as typeof setInterval;
  try {
    initializers.forEach(init => {
      const result = init();
      if (result && typeof result === 'object') {
        if (result.exercise) exercise = result.exercise;
        if (result.persistence) persistence = result.persistence;
        if (typeof result.dispose === 'function') disposers.push(() => result.dispose!());
      } else if (typeof result === 'function') disposers.push(result);
    });
  } finally {
    EventTarget.prototype.addEventListener = originalAdd;
    window.setTimeout = originalTimeout;
    window.setInterval = originalInterval;
  }
  let disposed = false;
  const book = window.menschenBook;
  const dispose = (() => {
    if (disposed) return;
    disposed = true;
    disposers.reverse().forEach(fn => fn());
    document.querySelectorAll<HTMLAudioElement>('audio').forEach(a => {
      a.pause();
      a.removeAttribute('src');
      a.load();
    });
    listeners.forEach(([target, type, fn, options]) => target.removeEventListener(type, fn, options));
    timeouts.forEach(clearTimeout);
    intervals.forEach(clearInterval);
    book?.destroy?.();
    [...document.body.children].filter(n => !before.has(n)).forEach(n => n.remove());
  }) as LessonDispose;
  dispose.exercise = exercise;
  dispose.persistence = persistence;
  return dispose;
}
