import {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {ReaderContext} from './ReaderControls';
import type {ReaderStore} from './ReaderControls';
import {
  BOOKS, MODULES, findModuleForPage, lessonForPage, lessonUrl,
  levelExtras, levelLessons, modulePages,
} from '../library-data';
import '../library-nav.css';

type Panel = 'nav' | 'pages' | null;

/**
 * Replaces the header lesson dropdown with a location pill that opens a
 * slide-out library (book cards first, then Lektionen), and the bottom
 * pageJump select with a pill that opens an all-pages sheet for the whole
 * book level. The original selects stay in the DOM (hidden) so existing
 * adapters and the reader store keep working unchanged.
 */
export function LibraryNav({slug}: {slug: string}) {
  const mod = MODULES[slug];
  const store = useContext(ReaderContext) as ReaderStore | null;
  const [panel, setPanel] = useState<Panel>(() => {
    const wanted = new URLSearchParams(location.search).get('lnv');
    if (wanted === 'nav' || wanted === 'pages') return wanted;
    // A book switch in the library asks the next page to reopen it.
    try {
      if (sessionStorage.getItem('menschen-libnav') === 'open') {
        sessionStorage.removeItem('menschen-libnav');
        return 'nav';
      }
    } catch {}
    return null;
  });
  // Screenshot/test hook: ?lnv= renders the final state without entry animation.
  const noAnim = new URLSearchParams(location.search).has('lnv');
  const [headerSlot, setHeaderSlot] = useState<HTMLElement | null>(null);
  const [pageSlot, setPageSlot] = useState<HTMLElement | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  useLayoutEffect(() => {
    const select = document.querySelector('.headerBrand select, #lessonNav');
    let hs: HTMLElement | null = null;
    if (select?.parentElement) {
      hs = document.createElement('span');
      hs.className = 'lnv-headerSlot';
      select.parentElement.insertBefore(hs, select);
    }
    const jump = document.querySelector<HTMLSelectElement>('#pageJump');
    let ps: HTMLElement | null = null;
    if (jump) {
      ps = document.createElement('span');
      ps.className = 'lnv-pageSlot';
      jump.insertAdjacentElement('beforebegin', ps);
      setPageIndex(Number(jump.value) || 0);
    }
    setHeaderSlot(hs);
    setPageSlot(ps);
    return () => {
      hs?.remove();
      ps?.remove();
    };
  }, []);

  useEffect(() => {
    const jump = document.querySelector<HTMLSelectElement>('#pageJump');
    if (!jump) return;
    const sync = () => setPageIndex(Number(jump.value) || 0);
    sync();
    window.menschenBook?.on?.('flip', sync);
    jump.addEventListener('change', sync);
    const unsubscribe = store?.subscribe(sync);
    return () => {
      jump.removeEventListener('change', sync);
      unsubscribe?.();
    };
  }, [store]);

  // While a panel is open: lock the page behind against scroll chaining and
  // scroll the list so the current lesson/page is in view.
  useEffect(() => {
    if (!panel) return;
    document.body.classList.add('lnv-lock');
    const box = document.querySelector<HTMLElement>('.lnv-scroll, .lnv-sheetscroll');
    const cur = box?.querySelector<HTMLElement>('.lnv-row.cur, .lnv-pg.cur');
    if (box && cur) {
      const b = box.getBoundingClientRect(), r = cur.getBoundingClientRect();
      box.scrollTop += r.top - b.top - box.clientHeight / 2 + r.height / 2;
    }
    const overlay = document.querySelector<HTMLElement>('.lnv-overlay');
    const stop = (e: TouchEvent) => {
      if (!(e.target as Element | null)?.closest?.('.lnv-panelBox, .lnv-sheet')) e.preventDefault();
    };
    overlay?.addEventListener('touchmove', stop, {passive: false});
    return () => {
      document.body.classList.remove('lnv-lock');
      overlay?.removeEventListener('touchmove', stop);
    };
  }, [panel]);

  if (!mod) return null;

  const pages = modulePages(slug);
  const currentToken = pages[Math.min(pageIndex, pages.length - 1)] ?? '';
  // Non-numbered pages: book covers and the index how-to page.
  const special: Record<string, string> = {cover: 'Cover', abcover: 'Cover', howto: 'Guide'};
  const currentPage = currentToken in special ? null : Number(currentToken);
  const currentLesson = currentPage == null ? null : lessonForPage(mod, currentPage);
  const bookInfo = BOOKS.find(b => b.id === mod.book)!;
  const bookTag = mod.book === 'kb' ? 'KB' : 'AB';
  const pillText = currentPage == null
    ? `${bookTag} ${mod.level} · ${special[currentToken] ?? 'Cover'}`
    : `${bookTag} ${mod.level} · ${currentLesson?.short ?? 'p.' + currentPage}`;
  const pagePillText = currentPage == null ? (special[currentToken] ?? 'Cover') : String(currentPage);

  const close = () => setPanel(null);

  const gotoPage = (page: number) => {
    const idx = modulePages(slug).indexOf(String(page));
    if (idx >= 0) {
      const jump = document.querySelector<HTMLSelectElement>('#pageJump');
      if (jump) {
        jump.value = String(idx);
        jump.dispatchEvent(new Event('change', {bubbles: true}));
      }
    } else {
      const target = findModuleForPage(mod.book, mod.level, page);
      if (target) location.href = `${target.slug}.html#${page}`;
    }
  };

  const levels: Array<'A1.1' | 'A1.2'> = ['A1.1', 'A1.2'];
  // Tapping the other book's card switches straight to the matching
  // Lektion there (same level, same lesson when it exists).
  const switchTarget = (target: 'kb' | 'ab') => {
    const candidates = levelLessons(target, mod.level);
    const match = currentLesson ? candidates.find(l => l.label === currentLesson.label) : null;
    return (match ?? candidates[0])!;
  };

  return <>
    {headerSlot && createPortal(
      <button type="button" className="lnv-pill" aria-haspopup="dialog" onClick={() => setPanel('nav')}>
        <span className="lnv-dot"/><span className="lnv-pillText">{pillText}</span><span className="lnv-chev">▾</span>
      </button>, headerSlot)}
    {pageSlot && createPortal(
      <button type="button" className="lnv-pagePill" aria-haspopup="dialog" aria-label={`Seite wählen, aktuell ${pagePillText === 'Cover' ? 'Cover' : 'Seite ' + pagePillText}`} onClick={() => setPanel('pages')}>
        {pagePillText}<span className="lnv-chev">▴</span>
      </button>, pageSlot)}
    {panel === 'nav' && createPortal(
      <div className={noAnim ? 'lnv-overlay lnv-noanim' : 'lnv-overlay'} role="dialog" aria-label="Library">
        <div className="lnv-scrim" onClick={close}/>
        <aside className="lnv-panelBox">
          <div className="lnv-head">
            <span className="lnv-brand">Menschen<b>.</b></span>
            <button type="button" className="lnv-close" aria-label="Close menu" onClick={close}>×</button>
          </div>
          <div className="lnv-label">CHOOSE YOUR BOOK</div>
          {BOOKS.map(b => {
            if (b.id === mod.book) {
              return (
                <div key={b.id} className="lnv-bookcard sel" aria-current="true">
                  <img src={b.cover} alt=""/>
                  <span className="lnv-bt">{b.title}<small>{b.subtitle}</small></span>
                </div>
              );
            }
            // Switch straight to the matching Lektion in the other book and
            // keep the library open after the page loads.
            return (
              <a key={b.id} className="lnv-bookcard" href={lessonUrl(switchTarget(b.id))}
                onClick={() => { try { sessionStorage.setItem('menschen-libnav', 'open'); } catch {} }}>
                <img src={b.cover} alt=""/>
                <span className="lnv-bt">{b.title}<small>{b.subtitle}</small></span>
                <span className="lnv-cardchev">›</span>
              </a>
            );
          })}
          <div className="lnv-scroll">
            <a className="lnv-home" href={mod.book === 'kb' ? 'index.html#cover' : 'ab1.html#abcover'}>Cover</a>
            {levels.map(level => (
              <div key={level}>
                <div className="lnv-lvl">{bookInfo.title.toUpperCase()} · {level}</div>
                {levelLessons(mod.book, level).map(entry => {
                  const isCurrent = entry.slug === slug && currentPage != null && entry.pages.includes(currentPage);
                  return (
                    <a key={entry.slug + entry.label} className={'lnv-row' + (isCurrent ? ' cur' : '') + (entry.short === 'MP' ? ' mp' : '')}
                      href={lessonUrl(entry)}>
                      <span className="lnv-no">{entry.short === 'MP' ? '✦' : entry.short.replace('L', '')}</span>
                      <span className="lnv-nm">{entry.label}</span>
                      <span className="lnv-pp">pp. {entry.pages[0]}–{entry.pages[entry.pages.length - 1]}</span>
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>
      </div>, document.body)}
    {panel === 'pages' && createPortal(
      <div className={noAnim ? 'lnv-overlay lnv-noanim' : 'lnv-overlay'} role="dialog" aria-label="All pages">
        <div className="lnv-scrim" onClick={close}/>
        <div className="lnv-sheet">
          <div className="lnv-grab"/>
          <div className="lnv-shead">
            <div className="lnv-st">All pages</div>
            <div className="lnv-ss">{bookInfo.title} · {mod.level} — jump to any page</div>
          </div>
          <div className="lnv-sheetscroll">
            {levelLessons(mod.book, mod.level).map(entry => (
              <div key={entry.slug + entry.label}>
                <div className="lnv-psec">{entry.label.toUpperCase()}</div>
                <div className="lnv-pgrid">
                  {entry.pages.map(p => (
                    <button type="button" key={p} className={'lnv-pg' + (p === currentPage ? ' cur' : '')}
                      onClick={() => {close(); gotoPage(p);}}>{p}</button>
                  ))}
                </div>
              </div>
            ))}
            {levelExtras(mod.book, mod.level).map(entry => (
              <div key={entry.slug}>
                <div className="lnv-psec">EXTRAS</div>
                <div className="lnv-pgrid">
                  {entry.pages.map(p => (
                    <button type="button" key={p} className={'lnv-pg' + (p === currentPage ? ' cur' : '')}
                      onClick={() => {close(); gotoPage(p);}}>{p}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>, document.body)}
  </>;
}
