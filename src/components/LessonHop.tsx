import {useEffect} from 'react';
import {MODULE_ORDER, MODULES, modulePages} from '../library-data';

/**
 * Cross-module page turning. Each module's flip stops at its own first/last
 * page; this lets the arrows and swipe/drag gestures continue into the
 * neighbouring module of the same book (A1.1 into A1.2 included): next at
 * the last page opens the next module's first page, prev at the first page
 * opens the previous module's last page.
 */
export function LessonHop({slug}: {slug: string}) {
  useEffect(() => {
    const mod = MODULES[slug];
    if (!mod) return;
    const sequence = MODULE_ORDER.filter(s => MODULES[s]?.book === mod.book);
    const index = sequence.indexOf(slug);
    if (index < 0) return;

    const nextSlug = sequence[index + 1];
    const prevSlug = index > 0 ? sequence[index - 1] : undefined;
    const nextUrl = nextSlug ? `${nextSlug}.html#${modulePages(nextSlug)[0]}` : null;
    const prevTokens = prevSlug ? modulePages(prevSlug) : [];
    const prevUrl = prevTokens.length ? `${prevSlug}.html#${prevTokens[prevTokens.length - 1]}` : null;

    const pageIndex = (): number => (window as any).menschenBook?.getCurrentPageIndex?.() ?? 0;
    const pageCount = (): number => (window as any).menschenPages?.length ?? 0;
    const ready = (): boolean => ((window as any).menschenBook?.getState?.() ?? 'read') === 'read';
    const hopUrl = (dir: 1 | -1): string | null =>
      dir > 0
        ? nextUrl && pageIndex() === pageCount() - 1 ? nextUrl : null
        : prevUrl && pageIndex() === 0 ? prevUrl : null;

    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest?.('#next,#prev') as HTMLButtonElement | null;
      if (!btn) return;
      const url = hopUrl(btn.id === 'next' ? 1 : -1);
      if (!url) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      location.assign(url);
    };
    document.addEventListener('click', onClick, true);

    // The adapters disable the arrow on their boundary page; re-enable it
    // whenever a hop continues from that boundary.
    const observer = new MutationObserver(records => {
      for (const record of records) {
        const btn = record.target as HTMLButtonElement;
        if (btn.disabled && hopUrl(btn.id === 'next' ? 1 : -1)) btn.disabled = false;
      }
    });
    for (const id of ['next', 'prev']) {
      const btn = document.getElementById(id) as HTMLButtonElement | null;
      if (!btn) continue;
      observer.observe(btn, {attributes: true, attributeFilter: ['disabled']});
      if (btn.disabled && hopUrl(id === 'next' ? 1 : -1)) btn.disabled = false;
    }

    // Boundary swipe/drag. The adapters refuse to start a flip at their
    // first/last page, so a horizontal swipe there does nothing; recognise it
    // here and hop instead. Boundary state is captured at gesture start so a
    // swipe INTO the boundary page never triggers a second navigation.
    const zoomed = () => document.body.dataset.bookZoomed === 'true';
    const isControl = (t: EventTarget | null) =>
      !!(t as Element | null)?.closest?.('input,select,textarea,button,a,audio,label:has(input),[contenteditable]');
    interface Gesture {x: number; y: number; axis: 'horizontal' | 'vertical' | null; dir: 1 | -1 | 0; canNext: boolean; canPrev: boolean}
    let gesture: Gesture | null = null;

    const gestureStart = (x: number, y: number, target: EventTarget | null) => {
      if (!ready() || zoomed() || isControl(target) || document.body.dataset.textSelection === 'true') {
        gesture = null;
        return;
      }
      const last = pageCount() - 1;
      gesture = {x, y, axis: null, dir: 0, canNext: !!nextUrl && pageIndex() === last, canPrev: !!prevUrl && pageIndex() === 0};
    };
    const gestureMove = (x: number, y: number) => {
      if (!gesture || gesture.axis) return;
      const dx = x - gesture.x, dy = y - gesture.y;
      if (Math.max(Math.abs(dx), Math.abs(dy)) <= 10) return;
      gesture.axis = Math.abs(dx) > Math.abs(dy) * 1.4 ? 'horizontal' : 'vertical';
      if (gesture.axis === 'horizontal') gesture.dir = dx < 0 ? 1 : -1;
    };
    const gestureEnd = (x: number) => {
      const g = gesture;
      gesture = null;
      if (!g || g.axis !== 'horizontal' || !g.dir || zoomed()) return;
      const url = g.dir > 0 ? (g.canNext ? nextUrl : null) : (g.canPrev ? prevUrl : null);
      if (!url) return;
      const progress = g.dir > 0 ? g.x - x : x - g.x;
      const width = document.getElementById('viewport')?.clientWidth ?? innerWidth;
      if (progress > Math.max(55, width * .24)) location.assign(url);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) { gesture = null; return; }
      const t = e.touches[0];
      gestureStart(t.clientX, t.clientY, e.target);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      gestureMove(t.clientX, t.clientY);
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (t) gestureEnd(t.clientX);
    };
    const onTouchCancel = () => { gesture = null; };
    const onMouseDown = (e: MouseEvent) => {
      if (e.button || (e.target as Element | null)?.closest?.('.tapWord')) return;
      gestureStart(e.clientX, e.clientY, e.target);
    };
    const onMouseMove = (e: MouseEvent) => gestureMove(e.clientX, e.clientY);
    const onMouseUp = (e: MouseEvent) => gestureEnd(e.clientX);

    document.addEventListener('touchstart', onTouchStart, {passive: true});
    document.addEventListener('touchmove', onTouchMove, {passive: true});
    document.addEventListener('touchend', onTouchEnd, {passive: true});
    document.addEventListener('touchcancel', onTouchCancel, {passive: true});
    document.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('click', onClick, true);
      observer.disconnect();
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('touchcancel', onTouchCancel);
      document.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [slug]);
  return null;
}
