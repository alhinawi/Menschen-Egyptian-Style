// Laptop page layouts for the reader: one page (default flip book), two
// pages side by side (book spreadEl via the vendored PageFlip landscape
// orientation), or four pages per screen (2x2 live overview grid). The
// layout switcher is laptop-only (hover + fine pointer + wide viewportEl);
// touch and small screens always stay on the single-page flip book.
//
// Adapters keep owning their flip instance, zoom and gestures. This module
// works through the window globals every adapter publishes
// (menschenBook/menschenPages/bookZoom) plus two hooks the adapters call at
// navigation time (menschenNav/menschenGoTo, set only while the grid is
// active) and one query hook (menschenBookWidth) that keeps their zoom math
// aware of the two-page spreadEl width.

type LayoutMode = 1 | 2 | 4;

const STORAGE_KEY = 'menschen-page-layout';
const DESKTOP_QUERY = '(hover:hover) and (pointer:fine) and (min-width:1100px)';

export function initReaderLayout(): (() => void) | undefined {
  const flip = (window as any).menschenBook;
  const pages = (window as any).menschenPages as HTMLElement[] | undefined;
  const stageNode = document.querySelector<HTMLElement>('#pageStage');
  const spreadNode = document.querySelector<HTMLElement>('#spread');
  const viewportNode = document.querySelector<HTMLElement>('#viewport');
  const zoomNode = document.querySelector<HTMLElement>('#zoomValue');
  if (!flip || !pages?.length || !stageNode || !spreadNode || !viewportNode || !zoomNode) return undefined;
  // Aliases keep the non-null narrowing inside the nested functions below.
  const stageEl: HTMLElement = stageNode, spreadEl: HTMLElement = spreadNode,
    viewportEl: HTMLElement = viewportNode, zoomEl: HTMLElement = zoomNode;

  const settings = flip.getSettings();
  const baseWidth: number = settings.width;
  const pageHeight: number = settings.height;
  const desktop = matchMedia(DESKTOP_QUERY);

  let mode: LayoutMode = 1;
  let grid: HTMLElement | null = null;
  let gridStart = 0;
  let gridHome: HTMLElement | null = null;
  let zoomMirror: MutationObserver | null = null;
  let shieldAttached = false;
  let dragStart: {x: number; y: number} | null = null;
  let dragBlocked = false;

  const currentZoom = (): number => {
    const raw = zoomEl.dataset.zoom || zoomEl.textContent || '100%';
    const n = Number(String(raw).replace('%', ''));
    return Number.isFinite(n) && n > 0 ? n / 100 : 1;
  };
  const applyZoom = (n?: number) => {
    const bookZoom = (window as any).bookZoom;
    if (typeof bookZoom === 'function') bookZoom(n ?? currentZoom());
  };
  // The React reader store republishes (page indicator, prev/next disabled)
  // whenever the zoom marker mutates; re-setting the attribute is a cheap
  // publish poke after grid navigation.
  const publish = () => {
    zoomEl.dataset.zoom = zoomEl.dataset.zoom || '100%';
  };

  function clearFlipInline(page: HTMLElement) {
    page.classList.remove('--left', '--right', '--soft', '--hard');
    page.style.display = '';
    page.style.position = '';
    page.style.left = '';
    page.style.top = '';
    page.style.right = '';
    page.style.bottom = '';
    page.style.zIndex = '';
    page.style.transform = '';
    page.style.margin = '';
  }

  // The book viewport grows with its content (the window scrolls), so the
  // usable height is the window minus the fixed header and bottom bar.
  function visibleHeight(): number {
    const header = document.querySelector('header:not(.page header)')?.getBoundingClientRect().bottom || 0;
    const controls = document.querySelector('.controls')?.getBoundingClientRect().height || 0;
    return Math.max(240, innerHeight - header - controls);
  }
  function cellScale(): number {
    const gap = 16, pad = 24;
    const availW = Math.min(viewportEl.clientWidth, innerWidth) - pad * 2 - gap;
    const availH = visibleHeight() - pad * 2 - gap;
    const s = Math.min(availW / 2 / baseWidth, availH / 2 / pageHeight, 1);
    return Math.max(0.15, s);
  }

  function syncGridHeader() {
    const jump = document.querySelector<HTMLInputElement>('#pageJump');
    if (jump) jump.value = String(gridStart);
    const prev = document.querySelector<HTMLButtonElement>('#prev');
    const next = document.querySelector<HTMLButtonElement>('#next');
    if (prev) prev.disabled = gridStart === 0;
    if (next) next.disabled = gridStart + 4 >= pages!.length;
    publish();
  }

  // The vendored flip book keeps repainting its own pages (inline position,
  // size and display:none for pages it does not show) even while the grid
  // owns them, so the grid re-applies its cell style whenever that happens.
  let cellScaleNow = 1;
  function applyCellStyle(page: HTMLElement, s: number) {
    page.style.cssText = '';
    page.style.display = 'block';
    page.style.position = 'relative';
    page.style.zoom = String(s);
    page.hidden = false;
  }
  const guard = new MutationObserver(records => {
    guard.disconnect();
    for (const r of records) {
      const page = r.target as HTMLElement;
      if (grid && page.parentElement?.classList.contains('pageGridCell')) applyCellStyle(page, cellScaleNow);
    }
    if (grid) grid.querySelectorAll<HTMLElement>('.page').forEach(pg => guard.observe(pg, {attributes: true, attributeFilter: ['style']}));
  });

  function renderGridWindow() {
    if (!grid) return;
    guard.disconnect();
    grid.innerHTML = '';
    const s = cellScale();
    cellScaleNow = s;
    // Pin to two columns so four cells always form a 2x2 block, never a 1x4 row.
    grid.style.width = Math.ceil(baseWidth * s * 2 + 16 + 24) + 'px';
    grid.style.marginInline = 'auto';
    // Per-lesson stylesheets restyle #pageGrid as a block, so set the flex layout inline.
    Object.assign(grid.style, {display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'flex-start', gap: '16px', padding: '12px', boxSizing: 'border-box'});
    for (let i = gridStart; i < Math.min(gridStart + 4, pages!.length); i++) {
      const page = pages![i];
      page.hidden = false;
      clearFlipInline(page);
      applyCellStyle(page, s);
      guard.observe(page, {attributes: true, attributeFilter: ['style']});
      const cell = document.createElement('div');
      cell.className = 'pageGridCell';
      cell.style.width = baseWidth * s + 'px';
      cell.style.height = pageHeight * s + 'px';
      cell.append(page);
      grid.append(cell);
    }
    for (let i = 0; i < pages!.length; i++) {
      if (i < gridStart || i >= gridStart + 4) pages![i].hidden = true;
    }
    grid.style.zoom = String(currentZoom());
    syncGridHeader();
  }

  function gridGo(dir: number) {
    const maxStart = Math.max(0, Math.ceil(pages!.length / 4) * 4 - 4);
    const next = Math.max(0, Math.min(maxStart, gridStart + dir * 4));
    if (next === gridStart) return;
    gridStart = next;
    renderGridWindow();
  }
  function gridGoTo(index: number) {
    const clamped = Math.max(0, Math.min(pages!.length - 1, index));
    gridStart = Math.floor(clamped / 4) * 4;
    renderGridWindow();
  }

  // While the grid owns the pages the flip book must not see pointer drags:
  // its gesture handlers would start a fold on the hidden stageEl and restyle
  // live pages. Window-capture listeners fire before the adapters' viewportEl
  // and window handlers, so horizontal swipes and pinches are intercepted
  // here and turned into grid navigation. Plain taps and zoomed panning keep
  // working: taps never become drags, and a horizontally scrollable viewportEl
  // means the adapters pan instead of turning.
  function viewportCanPanX(): boolean {
    return viewportEl.scrollWidth - viewportEl.clientWidth > 60;
  }
  function pointOf(e: Event, ended = false): {x: number; y: number} | null {
    if (e instanceof MouseEvent) return {x: e.clientX, y: e.clientY};
    if (e instanceof TouchEvent) {
      const list = ended ? e.changedTouches : e.touches;
      const t = list[0];
      return t ? {x: t.clientX, y: t.clientY} : null;
    }
    return null;
  }
  function shieldDown(e: Event) {
    const p = pointOf(e);
    dragStart = p ? {x: p.x, y: p.y} : null;
    dragBlocked = false;
    if (e.type === 'touchstart' && (e as TouchEvent).touches.length > 1) {
      dragStart = null;
      dragBlocked = true;
      e.stopImmediatePropagation();
    }
  }
  function shieldMove(e: Event) {
    if (dragBlocked) {
      e.stopImmediatePropagation();
      if (e.cancelable && e.type === 'touchmove') e.preventDefault();
      return;
    }
    if (!dragStart) return;
    const p = pointOf(e);
    if (!p) return;
    const dx = p.x - dragStart.x, dy = p.y - dragStart.y;
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.4 && !viewportCanPanX()) {
      dragBlocked = true;
      e.stopImmediatePropagation();
      if (e.cancelable && e.type === 'touchmove') e.preventDefault();
    }
  }
  function shieldUp(e: Event) {
    if (dragBlocked) {
      e.stopImmediatePropagation();
      const p = pointOf(e, true);
      if (p && dragStart) {
        const dx = p.x - dragStart.x;
        if (dx <= -40) gridGo(1);
        else if (dx >= 40) gridGo(-1);
      }
    }
    dragStart = null;
    dragBlocked = false;
  }
  function attachShield() {
    if (shieldAttached) return;
    shieldAttached = true;
    window.addEventListener('mousedown', shieldDown, true);
    window.addEventListener('mousemove', shieldMove, true);
    window.addEventListener('mouseup', shieldUp, true);
    window.addEventListener('touchstart', shieldDown, true);
    window.addEventListener('touchmove', shieldMove, {capture: true, passive: false});
    window.addEventListener('touchend', shieldUp, true);
    window.addEventListener('touchcancel', shieldUp, true);
  }
  function detachShield() {
    if (!shieldAttached) return;
    shieldAttached = false;
    window.removeEventListener('mousedown', shieldDown, true);
    window.removeEventListener('mousemove', shieldMove, true);
    window.removeEventListener('mouseup', shieldUp, true);
    window.removeEventListener('touchstart', shieldDown, true);
    window.removeEventListener('touchmove', shieldMove, true);
    window.removeEventListener('touchend', shieldUp, true);
    window.removeEventListener('touchcancel', shieldUp, true);
    dragStart = null;
    dragBlocked = false;
  }

  function widenStage() {
    stageEl.style.width = baseWidth * 2 + 'px';
    spreadEl.style.width = baseWidth * 2 + 'px';
    flip.update();
  }
  function narrowStage() {
    stageEl.style.width = '';
    spreadEl.style.width = '';
    flip.update();
  }

  function setupGrid(current: number) {
    gridHome = pages![0].parentElement;
    stageEl.style.display = 'none';
    spreadEl.style.width = '100%';
    grid = document.createElement('div');
    grid.id = 'pageGrid';
    spreadEl.append(grid);
    // Tells the reader store (and through it the fullscreen cover) that the
    // grid owns the pages now; page 0 in a grid window is not the cover.
    document.body.dataset.readerGrid = 'true';
    gridStart = Math.floor(current / 4) * 4;
    (window as any).menschenNav = (dir: number) => gridGo(dir);
    (window as any).menschenGoTo = (index: number) => gridGoTo(index);
    attachShield();
    zoomMirror = new MutationObserver(() => {
      if (grid) grid.style.zoom = String(currentZoom());
    });
    zoomMirror.observe(zoomEl, {attributes: true, attributeFilter: ['data-zoom']});
    renderGridWindow();
  }

  function teardownGrid(nextMode: LayoutMode) {
    const current = gridStart;
    guard.disconnect();
    detachShield();
    zoomMirror?.disconnect();
    zoomMirror = null;
    (window as any).menschenNav = undefined;
    (window as any).menschenGoTo = undefined;
    if (gridHome) {
      for (const page of pages!) {
        page.hidden = false;
        page.style.zoom = '';
        clearFlipInline(page);
        gridHome.append(page);
      }
    }
    grid?.remove();
    grid = null;
    gridHome = null;
    delete document.body.dataset.readerGrid;
    stageEl.style.display = '';
    spreadEl.style.width = nextMode === 2 ? baseWidth * 2 + 'px' : '';
    flip.update();
    if (flip.getCurrentPageIndex() !== current) flip.turnToPage(current);
    else publish();
  }

  function setMode(next: LayoutMode) {
    if (next !== 1 && !desktop.matches) next = 1;
    if (next === mode) return;
    const current = flip.getCurrentPageIndex();
    if (mode === 4) teardownGrid(next);
    else if (mode === 2) narrowStage();
    mode = next;
    try { localStorage.setItem(STORAGE_KEY, String(mode)); } catch { /* storage unavailable */ }
    if (mode === 2) {
      widenStage();
      if (flip.getCurrentPageIndex() !== current) flip.turnToPage(current);
      applyZoom(Math.min(1, innerWidth / (baseWidth * 2)));
    } else if (mode === 4) {
      setupGrid(current);
      applyZoom(1);
    } else {
      applyZoom();
    }
    window.dispatchEvent(new Event('menschen:layout'));
  }

  (window as any).menschenBookWidth = () => (mode === 2 ? baseWidth * 2 : baseWidth);
  (window as any).menschenLayout = {
    getMode: () => mode,
    setMode: (n: number) => setMode((n === 2 || n === 4 ? n : 1) as LayoutMode),
  };

  const onDesktopChange = () => {
    if (!desktop.matches && mode !== 1) setMode(1);
    if (mode === 4) renderGridWindow();
  };
  desktop.addEventListener('change', onDesktopChange);
  const onResize = () => {
    if (mode === 4) renderGridWindow();
  };
  window.addEventListener('resize', onResize);

  const saved = (() => {
    try { return Number(localStorage.getItem(STORAGE_KEY)); } catch { return 1; }
  })();
  if ((saved === 2 || saved === 4) && desktop.matches) setMode(saved as LayoutMode);
  else window.dispatchEvent(new Event('menschen:layout'));

  return () => {
    if (mode === 4) teardownGrid(1);
    else if (mode === 2) narrowStage();
    mode = 1;
    desktop.removeEventListener('change', onDesktopChange);
    window.removeEventListener('resize', onResize);
    (window as any).menschenBookWidth = undefined;
    (window as any).menschenLayout = undefined;
    (window as any).menschenNav = undefined;
    (window as any).menschenGoTo = undefined;
  };
}
