import {useEffect} from 'react';
import {MODULE_ORDER, MODULES, modulePages} from '../library-data';

const HOP_FLAG = 'menschen-hop';
const HOP_ZOOM = 'menschen-hop-zoom';
const HOP_DIR = 'menschen-hop-dir';
const VEIL_BG = '#e8e8e4'; // book.css body background on every module
const FLIP_MAX_DEG = 105; // past 90 the turning page is invisible (backface hidden)
const FLIP_COMPLETE_PROGRESS = .3; // release past this completes the turn
const FLIP_FLICK_VELOCITY = .35; // px/ms in the turning direction completes it too

const lessonJson = import.meta.glob<{default: unknown[]}>('../lessons/*.json');

function makeVeil(opacity: string, pointerEvents: string): HTMLDivElement {
  const veil = document.createElement('div');
  veil.style.cssText = `position:fixed;inset:0;z-index:200;background:${VEIL_BG};opacity:${opacity};transition:opacity .16s ease;pointer-events:${pointerEvents}`;
  return veil;
}

/**
 * Cross-module page turning. Each module's flip stops at its own first/last
 * page; this lets the arrows and swipe/drag gestures continue into the
 * neighbouring module of the same book (A1.1 into A1.2 included): next at
 * the last page opens the next module's first page, prev at the first page
 * opens the previous module's last page. Boundary swipes turn the page with
 * the finger, exactly like an in-module flip: the page follows the drag,
 * settles back when released early, and completes the turn into the next
 * lesson otherwise. The hop is seamless: the neighbour is prefetched ahead
 * of time, a veil in the page's own background colour covers the document
 * swap, and the zoom level carries over.
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

    // Turn the on-screen page by an angle around the spine, like a real flip.
    // Forward (next lesson) turns around the left edge, backward around the
    // right edge. Past 90deg the page is hidden by backface-visibility, which
    // reads as the page having settled onto the other side.
    const setFlipAngle = (deg: number, dir: 1 | -1, animate: 'none' | 'settle' | 'complete') => {
      const vp = viewport();
      if (!vp) return;
      const parent = vp.parentElement as HTMLElement | null;
      if (parent) parent.style.perspective = deg ? '1600px' : '';
      vp.style.backfaceVisibility = 'hidden';
      vp.style.willChange = deg ? 'transform' : '';
      vp.style.transition =
        animate === 'settle' ? 'transform .18s ease-out'
        : animate === 'complete' ? 'transform .22s ease-in'
        : 'none';
      vp.style.transformOrigin = dir > 0 ? 'left center' : 'right center';
      vp.style.transform = deg ? `rotateY(${dir > 0 ? -deg : deg}deg)` : '';
    };
    const clearFlip = () => setFlipAngle(0, 1, 'none');

    // Arrival from a hop: cover the load with a veil, settle the new page in
    // from the side the turn came from, and restore the zoom level.
    if (sessionStorage.getItem(HOP_FLAG)) {
      sessionStorage.removeItem(HOP_FLAG);
      const zoom = Number(sessionStorage.getItem(HOP_ZOOM));
      sessionStorage.removeItem(HOP_ZOOM);
      const dir = Number(sessionStorage.getItem(HOP_DIR)) === -1 ? -1 : 1;
      sessionStorage.removeItem(HOP_DIR);
      const veil = makeVeil('1', 'auto');
      veil.style.transitionDuration = '.18s';
      document.body.append(veil);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (zoom > 0) (window as any).bookZoom?.(zoom);
        // The new page starts slightly raised on the arrival side and settles
        // flat, finishing the turn the departing page began.
        setFlipAngle(28, dir, 'none');
        veil.style.opacity = '0';
        requestAnimationFrame(() => {
          setFlipAngle(0, dir, 'settle');
          setTimeout(() => { veil.remove(); clearFlip(); }, 320);
        });
      }));
    }

    const prefetchTimer = window.setTimeout(() => {
      for (const url of [nextUrl, prevUrl]) {
        if (!url) continue;
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        link.as = 'document';
        document.head.append(link);
      }
      for (const [s, token] of [[nextSlug, modulePages(nextSlug ?? '')[0]], [prevSlug, prevTokens[prevTokens.length - 1]]] as const) {
        if (!s || !token) continue;
        const nodes = lessonJson[`../lessons/${s}.json`];
        if (!nodes) continue;
        nodes().then(mod => {
          const srcs: string[] = [];
          const walk = (n: unknown, collect: boolean) => {
            if (!Array.isArray(n) || typeof n[0] !== 'string') return;
            const attrs = n[1];
            const mine = collect || (attrs != null && typeof attrs === 'object' && !Array.isArray(attrs) && (attrs as Record<string, unknown>)['data-page'] === token);
            if (mine && n[0] === 'img' && attrs != null && typeof attrs === 'object' && !Array.isArray(attrs) && typeof (attrs as Record<string, unknown>).src === 'string') {
              srcs.push((attrs as Record<string, unknown>).src as string);
            }
            const children = Array.isArray(n[2]) ? n[2] : [];
            children.forEach((c: unknown) => walk(c, mine));
          };
          mod.default.forEach(n => walk(n, false));
          srcs.slice(0, 6).forEach(src => { const img = new Image(); img.src = src; });
        }).catch(() => { /* prefetch is best-effort */ });
      }
    }, 1500);

    const depart = (url: string, dir: 1 | -1) => {
      const spread = document.querySelector<HTMLElement>('#spread');
      sessionStorage.setItem(HOP_FLAG, '1');
      sessionStorage.setItem(HOP_DIR, String(dir));
      if (spread?.style.zoom) sessionStorage.setItem(HOP_ZOOM, spread.style.zoom);
      // Finish the page turn, then swap the document under a veil.
      setFlipAngle(FLIP_MAX_DEG, dir, 'complete');
      setTimeout(() => {
        const veil = makeVeil('1', 'auto');
        veil.style.transition = 'none';
        document.body.append(veil);
        location.assign(url);
      }, 230);
    };

    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest?.('#next,#prev') as HTMLButtonElement | null;
      if (!btn) return;
      const dir = btn.id === 'next' ? 1 : -1;
      const url = hopUrl(dir);
      if (!url) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      depart(url, dir);
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

    // Boundary swipe/drag with finger tracking. The adapters refuse to start
    // a flip at their first/last page, so an in-page swipe there does
    // nothing; here the page turns with the finger like a normal flip and,
    // on release, either settles back or completes into the neighbour
    // module. Boundary state is captured at gesture start so a swipe INTO
    // the boundary page never triggers a navigation.
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
      const last = pageCount() - 1;
      gesture = {
        x, y, axis: null, dir: 0,
        canNext: !!nextUrl && pageIndex() === last,
        canPrev: !!prevUrl && pageIndex() === 0,
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
      // The page turns with the finger.
      const progress = Math.min(Math.max((gesture.dir > 0 ? gesture.x - x : x - gesture.x) / viewportWidth(), 0), 1);
      gesture.flipping = true;
      setFlipAngle(progress * FLIP_MAX_DEG, gesture.dir, 'none');
    };
    const gestureEnd = (x: number) => {
      const g = gesture;
      gesture = null;
      if (!g || g.axis !== 'horizontal' || !g.dir || zoomed()) return;
      const url = g.dir > 0 ? (g.canNext ? nextUrl : null) : (g.canPrev ? prevUrl : null);
      if (!g.flipping) return;
      if (!url) { setFlipAngle(0, g.dir, 'settle'); return; }
      const progress = Math.max((g.dir > 0 ? g.x - x : x - g.x) / viewportWidth(), 0);
      const flick = (g.dir > 0 ? -g.velocity : g.velocity) > FLIP_FLICK_VELOCITY;
      if (progress > FLIP_COMPLETE_PROGRESS || flick) depart(url, g.dir);
      else setFlipAngle(0, g.dir, 'settle');
    };
    const gestureCancel = () => {
      if (gesture?.flipping && gesture.dir) setFlipAngle(0, gesture.dir, 'settle');
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
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (t) gestureEnd(t.clientX);
    };
    const onTouchCancel = () => gestureCancel();
    const onMouseDown = (e: MouseEvent) => gestureStart(e.clientX, e.clientY, e.target);
    const onMouseMove = (e: MouseEvent) => gestureMove(e.clientX, e.clientY);
    const onMouseUp = (e: MouseEvent) => gestureEnd(e.clientX);

    document.addEventListener('touchstart', onTouchStart, {passive: true, capture: true});
    document.addEventListener('touchmove', onTouchMove, {passive: true, capture: true});
    document.addEventListener('touchend', onTouchEnd, {passive: true, capture: true});
    document.addEventListener('touchcancel', onTouchCancel, {passive: true, capture: true});
    document.addEventListener('mousedown', onMouseDown, true);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      clearTimeout(prefetchTimer);
      document.removeEventListener('click', onClick, true);
      observer.disconnect();
      document.removeEventListener('touchstart', onTouchStart, true);
      document.removeEventListener('touchmove', onTouchMove, true);
      document.removeEventListener('touchend', onTouchEnd, true);
      document.removeEventListener('touchcancel', onTouchCancel, true);
      document.removeEventListener('mousedown', onMouseDown, true);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [slug]);
  return null;
}
