import {createContext, createElement, useContext, useSyncExternalStore} from 'react';
import type {ReactNode} from 'react';

export interface ReaderSnapshot {
  ready: boolean;
  zoom: string;
  soundOn?: boolean;
  page: string;
  previousDisabled: boolean;
  nextDisabled: boolean;
}

type DomHandler = (this: Element, event: {target: Element; currentTarget: Element; preventDefault(): void}) => void;

export interface ReaderStore {
  subscribe(fn: () => void): () => void;
  getSnapshot(): ReaderSnapshot;
  connect(): () => void;
  act(key: string, event: {currentTarget: Element; preventDefault(): void}): void;
}

export const ReaderContext = createContext<ReaderStore | null>(null);

export function createReaderStore(): ReaderStore {
  let listeners = new Set<() => void>(),
    snapshot: ReaderSnapshot = {ready: false, zoom: '', page: '', previousDisabled: true, nextDisabled: false},
    handlers = new Map<string, DomHandler>(),
    restore: Array<[Element, string, DomHandler | null]> = [];
  function publish(): void {
    const next: ReaderSnapshot = {
      ready: true,
      zoom: (document.querySelector('#zoomValue') as HTMLElement | null)?.dataset.zoom || document.querySelector('#zoomValue')?.textContent || '',
      soundOn: (document.querySelector('.soundToggle') as HTMLElement | null)?.dataset.soundOn !== 'false',
      page: (document.querySelector('#pageJump') as HTMLInputElement | null)?.value || '',
      previousDisabled: (document.querySelector('#prev') as HTMLButtonElement | null)?.disabled || false,
      nextDisabled: (document.querySelector('#next') as HTMLButtonElement | null)?.disabled || false
    };
    if (JSON.stringify(next) !== JSON.stringify(snapshot)) {
      snapshot = next;
      listeners.forEach(fn => fn());
    }
  }
  return {
    subscribe(fn) {
      listeners.add(fn);
      return () => {listeners.delete(fn);};
    },
    getSnapshot: () => snapshot,
    connect() {
      for (const el of document.querySelectorAll('#prev,#next,#plus,#minus,#fit,#pageJump,#lessonNav,.soundToggle,.listen,#closeAudio,.coverOpen,#palette,#audioToggle,[data-jump],[data-color],#clearMap')) {
        const key = (el as HTMLElement).dataset.reactControlId || el.id || 'soundToggle';
        const type = el.tagName === 'SELECT' ? 'onchange' : 'onclick';
        const current = (el as unknown as Record<string, DomHandler | null>)[type];
        if (typeof current === 'function') {
          handlers.set(key, current);
          restore.push([el, type, current]);
          (el as unknown as Record<string, DomHandler | null>)[type] = null;
        }
      }
      window.menschenBook?.on('flip', publish);
      const observer = new MutationObserver(publish);
      for (const el of document.querySelectorAll('#zoomValue,.soundToggle')) observer.observe(el, {attributes: true, attributeFilter: ['data-zoom', 'data-sound-on']});
      publish();
      return () => {
        observer.disconnect();
        restore.forEach(([el, type, fn]) => {(el as unknown as Record<string, DomHandler | null>)[type] = fn;});
        handlers.clear();
        restore = [];
        listeners.clear();
      };
    },
    act(key, event) {
      handlers.get(key)?.call(event.currentTarget, {target: event.currentTarget, currentTarget: event.currentTarget, preventDefault: () => event.preventDefault()});
      publish();
    }
  };
}

interface ReaderControlProps {
  tag: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attrs: Record<string, any>;
  children: ReactNode[];
}

export function ReaderControl({tag, attrs, children}: ReaderControlProps) {
  const store = useContext(ReaderContext)!;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const key = attrs.id || (attrs.className?.split(' ').includes('soundToggle') ? 'soundToggle' : attrs['data-react-control-id']);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: Record<string, any> = {...attrs};
  if (tag === 'select') props.onChange = (e: React.ChangeEvent<Element>) => store.act(attrs['data-react-control-id'] || key, e);
  else props.onClick = (e: React.MouseEvent<Element>) => store.act(attrs['data-react-control-id'] || key, e);
  if(['prev','next','fit','plus','minus'].includes(key)){props['aria-label']=({prev:'Previous page',next:'Next page',fit:'Fit page',plus:'Zoom in',minus:'Zoom out'} as Record<string,string>)[key];props.title=props['aria-label']}
  if(attrs.className?.split(' ').includes('coverOpen'))return createElement(tag,props,'Open book ←');
  if (key === 'prev' && snapshot.ready) props.disabled = snapshot.previousDisabled;
  if (key === 'next' && snapshot.ready) props.disabled = snapshot.nextDisabled;
  if (key === 'soundToggle') {
    props['aria-pressed'] = snapshot.soundOn !== false;
    props['aria-label'] = snapshot.soundOn !== false ? 'Turn sound off' : 'Turn sound on';
    props.title = props['aria-label'];
    return createElement(tag, props, createElement('svg', {viewBox: '0 0 24 24', width: 22, height: 22, 'aria-hidden': true, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round'}, createElement('path', {d: 'M11 5 6 9H3v6h3l5 4V5Z'}), createElement('path', {className: 'soundWaves', d: 'M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14'}), createElement('path', {className: 'soundSlash', d: 'M3 3l18 18'})));
  }
  return createElement(tag, props, ...children);
}

export function ZoomValue({tag, attrs, children}: ReaderControlProps) {
  const store = useContext(ReaderContext)!;
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  return createElement(tag, attrs, snapshot.ready ? snapshot.zoom : children);
}
