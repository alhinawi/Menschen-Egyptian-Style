interface ViewerOptions {pages: number[]; imagePrefix: string}
interface Point {x: number; y: number; d?: number}

/** A standalone viewer never uses the page-flip reader's handlers or state. */
export function mountOriginalViewer({pages, imagePrefix}: ViewerOptions) {
  const canvas = document.querySelector<HTMLElement>('#canvas')!;
  const paper = document.querySelector<HTMLImageElement>('#paper')!;
  const zoom = document.querySelector<HTMLElement>('#zoom')!;
  const previousButton = document.querySelector<HTMLButtonElement>('#prev')!;
  const nextButton = document.querySelector<HTMLButtonElement>('#next')!;
  const minus = document.querySelector<HTMLButtonElement>('#minus')!;
  const plus = document.querySelector<HTMLButtonElement>('#plus')!;
  const full = document.querySelector<HTMLButtonElement>('#full')!;
  const hint = document.querySelector<HTMLElement>('.hint')!;
  const requested = Number(new URLSearchParams(location.search).get('page'));
  let page = pages.includes(requested) ? requested : pages[0];
  let scale = 1;
  const points = new Map<number, Point>();
  let previous: Point | undefined;
  const cleanups: Array<() => void> = [];
  function listen(target: EventTarget, type: string, fn: EventListener, options?: AddEventListenerOptions) {
    target.addEventListener(type, fn, options);
    cleanups.push(() => target.removeEventListener(type, fn, options));
  }
  function setScale(value: number, anchor = {x: canvas.clientWidth / 2, y: canvas.clientHeight / 2}) {
    const old = scale;
    scale = Math.max(.5, Math.min(4, value));
    const x = (canvas.scrollLeft + anchor.x) / old;
    const y = (canvas.scrollTop + anchor.y) / old;
    paper.style.width = canvas.clientWidth * scale + 'px';
    canvas.scrollLeft = x * scale - anchor.x;
    canvas.scrollTop = y * scale - anchor.y;
    zoom.textContent = Math.round(scale * 100) + '%';
    minus.disabled = scale <= .5;
    plus.disabled = scale >= 4;
    hint.style.opacity = scale > 1 ? '0' : '1';
  }
  function update() {
    paper.src = imagePrefix + page + '.png';
    paper.alt = 'Originalbuch Seite ' + page;
    document.querySelector<HTMLElement>('#page')!.textContent = 'Seite ' + page;
    previousButton.disabled = page === pages[0];
    nextButton.disabled = page === pages[pages.length - 1];
    const url = new URL(location.href);
    url.searchParams.set('page', String(page));
    history.replaceState(history.state, '', url.pathname + url.search + url.hash);
    points.clear(); previous = undefined;
    setScale(1);
    canvas.scrollTo(0, 0);
  }
  listen(plus, 'click', () => setScale(scale + .25));
  listen(minus, 'click', () => setScale(scale - .25));
  listen(document.querySelector('#fit')!, 'click', () => {setScale(1); canvas.scrollTo(0, 0);});
  listen(previousButton, 'click', () => {page = pages[Math.max(0, pages.indexOf(page) - 1)]; update();});
  listen(nextButton, 'click', () => {page = pages[Math.min(pages.length - 1, pages.indexOf(page) + 1)]; update();});
  full.disabled = !document.documentElement.requestFullscreen;
  function syncFullscreen() {full.setAttribute('aria-pressed', String(!!document.fullscreenElement));}
  listen(full, 'click', () => {
    const change = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    change.catch(() => {full.title = 'Fullscreen is unavailable in this browser';});
  });
  listen(document, 'fullscreenchange', syncFullscreen);
  syncFullscreen();
  function geometry(): Point | undefined {
    const a = [...points.values()];
    return a.length > 1 ? {x: (a[0].x + a[1].x) / 2, y: (a[0].y + a[1].y) / 2, d: Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y)} : a[0];
  }
  listen(canvas, 'pointerdown', event => {
    const e = event as PointerEvent;
    canvas.setPointerCapture(e.pointerId);
    points.set(e.pointerId, {x: e.clientX, y: e.clientY}); previous = geometry();
  });
  listen(canvas, 'pointermove', event => {
    const e = event as PointerEvent;
    if (!points.has(e.pointerId)) return;
    points.set(e.pointerId, {x: e.clientX, y: e.clientY});
    const g = geometry()!;
    if (points.size > 1 && previous?.d && g.d) {
      const r = canvas.getBoundingClientRect();
      setScale(scale * g.d / previous.d, {x: g.x - r.left, y: g.y - r.top});
    } else if (previous) {
      canvas.scrollLeft -= g.x - previous.x; canvas.scrollTop -= g.y - previous.y;
    }
    previous = g;
  });
  const end: EventListener = event => {points.delete((event as PointerEvent).pointerId); previous = geometry();};
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) listen(canvas, type, end);
  listen(canvas, 'wheel', event => {
    const e = event as WheelEvent;
    if (e.ctrlKey) {e.preventDefault(); setScale(scale * (e.deltaY < 0 ? 1.1 : .9));}
  }, {passive: false});
  listen(window, 'resize', () => setScale(scale));
  const oldZoom = window.setViewerZoom;
  window.setViewerZoom = setScale;
  update();
  return () => {
    cleanups.forEach(cleanup => cleanup());
    points.clear();
    window.setViewerZoom = oldZoom;
  };
}
