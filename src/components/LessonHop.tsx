import {useEffect} from 'react';
import {MODULE_ORDER, MODULES, modulePages, lessonForPage} from '../library-data';
import {navigateLesson, prefetchLesson} from '../navigate';

const HOP_ZOOM = 'menschen-hop-zoom';
const FLIP_COMPLETE_PROGRESS = .3;
const FLIP_FLICK_VELOCITY = .35;

/**
 * Cross-lesson navigation shares one door transition with the library picker.
 * Boundary swipes detect intent only. Do not rotate the live viewport with
 * the finger, reset it, then start a second snapshot animation on release.
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
    const viewport = () => document.getElementById('viewport') as HTMLElement | null;
    const viewportWidth = () => viewport()?.clientWidth ?? innerWidth;
    const hopUrl = (dir: 1 | -1): string | null =>
      dir > 0
        ? nextUrl && pageIndex() === pageCount() - 1 ? nextUrl : null
        : prevUrl && pageIndex() === 0 ? prevUrl : null;

    // The common route-neutral loader also warms boundary destinations.
    const prefetchTimer = window.setTimeout(() => {
      if(nextSlug)void prefetchLesson(nextSlug,modulePages(nextSlug)[0]);
      if(prevSlug)void prefetchLesson(prevSlug,prevTokens[prevTokens.length-1]);
    },1500);

    const depart = (target: {slug: string; token: string} | null, dir: 1 | -1) => {
      if (!target) return;
      const spread = document.querySelector<HTMLElement>('#spread');
      if (spread?.style.zoom) sessionStorage.setItem(HOP_ZOOM, spread.style.zoom);
      // The common navigator owns the door animation. Never hold navigation
      // behind a timeout or a pointer-blocking veil.
      void navigateLesson(target.slug, target.token).then(() => {
        const zoom = Number(sessionStorage.getItem(HOP_ZOOM));
        sessionStorage.removeItem(HOP_ZOOM);
        if (zoom > 0) (window as any).bookZoom?.(zoom);
      });
    };

    const hopTarget = (dir: 1 | -1): {slug: string; token: string} | null => {
      const tokens = modulePages(slug);
      const from = tokens[pageIndex()], to = tokens[pageIndex() + dir];
      const before = lessonForPage(mod, Number(from)), after = lessonForPage(mod, Number(to));
      if (to && before && after && before.label !== after.label) return {slug, token: to};
      if (dir > 0) return nextSlug && pageIndex() === pageCount() - 1 ? {slug: nextSlug, token: modulePages(nextSlug)[0]} : null;
      return prevSlug && pageIndex() === 0 && prevTokens.length ? {slug: prevSlug, token: prevTokens[prevTokens.length - 1]} : null;
    };
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest?.('#next,#prev') as HTMLButtonElement | null;
      if (!btn) return;
      const dir = btn.id === 'next' ? 1 : -1;
      const target = hopTarget(dir);
      if (!target) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      depart(target, dir);
    };
    document.addEventListener('click', onClick, true);
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof Element && e.target.closest('input,select,textarea,button,[contenteditable],dialog')) return;
      const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      const target = dir ? hopTarget(dir) : null;
      if (target) {e.preventDefault();e.stopImmediatePropagation();depart(target, dir as 1 | -1);}
    };
    document.addEventListener('keydown', onKey, true);

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

    // Boundary swipes detect intent without moving the live page. A release
    // past the threshold starts the single shared door; early release does
    // nothing. Capture boundary state at start to avoid hopping twice.
    const zoomed = () => document.body.dataset.bookZoomed === 'true';
    const isControl = (t: EventTarget | null) =>
      !!(t as Element | null)?.closest?.('input,select,textarea,button,a,audio,label:has(input),[contenteditable]');
    interface Gesture {
      x: number; y: number;
      axis: 'horizontal' | 'vertical' | null;
      dir: 1 | -1 | 0;
      canNext: boolean; canPrev: boolean;
      flipping: boolean;
      lastX: number; lastT: number; velocity: number;
    }
    let gesture: Gesture | null = null;

    const gestureStart = (x: number, y: number, target: EventTarget | null) => {
      if (!ready() || zoomed() || isControl(target) || document.body.dataset.textSelection === 'true') {
        gesture = null;
        return;
      }
      gesture = {
        x, y, axis: null, dir: 0,
        canNext: !!hopTarget(1),
        canPrev: !!hopTarget(-1),
        flipping: false, lastX: x, lastT: performance.now(), velocity: 0,
      };
    };
    const gestureMove = (x: number, y: number) => {
      if (!gesture) return;
      const now = performance.now();
      const dt = now - gesture.lastT;
      if (dt > 0) {
        const v = (x - gesture.lastX) / dt;
        gesture.velocity = gesture.velocity * .6 + v * .4;
        gesture.lastX = x;
        gesture.lastT = now;
      }
      if (!gesture.axis) {
        const dx = x - gesture.x, dy = y - gesture.y;
        if (Math.max(Math.abs(dx), Math.abs(dy)) <= 10) return;
        gesture.axis = Math.abs(dx) > Math.abs(dy) * 1.4 ? 'horizontal' : 'vertical';
        if (gesture.axis === 'horizontal') gesture.dir = dx < 0 ? 1 : -1;
      }
      if (gesture.axis !== 'horizontal' || !gesture.dir) return;
      if (gesture.dir > 0 ? !gesture.canNext : !gesture.canPrev) return;
      // Claim this cross-lesson swipe without painting a preliminary flip.
      gesture.flipping = true;
    };
    const gestureEnd = (x: number) => {
      const g = gesture;
      gesture = null;
      if (!g || g.axis !== 'horizontal' || !g.dir || zoomed()) return;
      const target = g.dir > 0 ? (g.canNext ? hopTarget(1) : null) : (g.canPrev ? hopTarget(-1) : null);
      if (!g.flipping) return;
      if (!target) return;
      const progress = Math.max((g.dir > 0 ? g.x - x : x - g.x) / viewportWidth(), 0);
      const flick = (g.dir > 0 ? -g.velocity : g.velocity) > FLIP_FLICK_VELOCITY;
      if (progress > FLIP_COMPLETE_PROGRESS || flick) depart(target, g.dir);

    };
    const gestureCancel = () => {
      gesture = null;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) { gestureCancel(); return; }
      const t = e.touches[0];
      gestureStart(t.clientX, t.clientY, e.target);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      gestureMove(t.clientX, t.clientY);
      if (gesture?.flipping) e.stopImmediatePropagation();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      const owned = gesture?.flipping;
      if (t) gestureEnd(t.clientX);
      if (owned) e.stopImmediatePropagation();
    };
    const onTouchCancel = () => gestureCancel();
    const onMouseDown = (e: MouseEvent) => gestureStart(e.clientX, e.clientY, e.target);
    const onMouseMove = (e: MouseEvent) => {gestureMove(e.clientX,e.clientY);if(gesture?.flipping)e.stopImmediatePropagation();};
    const onMouseUp = (e: MouseEvent) => gestureEnd(e.clientX);

    document.addEventListener('touchstart', onTouchStart, {passive: true, capture: true});
    document.addEventListener('touchmove', onTouchMove, {passive: true, capture: true});
    document.addEventListener('touchend', onTouchEnd, {passive: true, capture: true});
    document.addEventListener('touchcancel', onTouchCancel, {passive: true, capture: true});
    document.addEventListener('mousedown', onMouseDown, true);
    window.addEventListener('mousemove', onMouseMove, true);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      clearTimeout(prefetchTimer);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKey, true);
      observer.disconnect();
      document.removeEventListener('touchstart', onTouchStart, true);
      document.removeEventListener('touchmove', onTouchMove, true);
      document.removeEventListener('touchend', onTouchEnd, true);
      document.removeEventListener('touchcancel', onTouchCancel, true);
      document.removeEventListener('mousedown', onMouseDown, true);
      window.removeEventListener('mousemove', onMouseMove, true);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [slug]);
  return null;
}
