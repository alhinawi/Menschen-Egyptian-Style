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
    return wanted === 'nav' || wanted === 'pages' ? wanted : null;
  });
  // Screenshot/test hook: ?lnv= renders the final state without entry animation.
  const noAnim = new URLSearchParams(location.search).has('lnv');
  const [book, setBook] = useState<'kb' | 'ab'>(mod?.book ?? 'kb');
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

  if (!mod) return null;

  const pages = modulePages(slug);
  const currentToken = pages[Math.min(pageIndex, pages.length - 1)] ?? '';
  const currentPage = currentToken === 'cover' ? null : Number(currentToken);
  const currentLesson = currentPage == null ? null : lessonForPage(mod, currentPage);
  const bookInfo = BOOKS.find(b => b.id === mod.book)!;
  const bookTag = mod.book === 'kb' ? 'KB' : 'AB';
  const pillText = currentPage == null
    ? `${bookTag} ${mod.level} · Cover`
    : `${bookTag} ${mod.level} · ${currentLesson?.short ?? 'p.' + currentPage}`;
  const pagePillText = currentPage == null ? 'Cover' : `Seite ${currentPage}`;

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
  const selectedBook = BOOKS.find(b => b.id === book)!;

  return <>
    {headerSlot && createPortal(
      <button type="button" className="lnv-pill" aria-haspopup="dialog" onClick={() => {setBook(mod.book); setPanel('nav');}}>
        <span className="lnv-dot"/><span className="lnv-pillText">{pillText}</span><span className="lnv-chev">▾</span>
      </button>, headerSlot)}
    {pageSlot && createPortal(
      <button type="button" className="lnv-pagePill" aria-haspopup="dialog" onClick={() => setPanel('pages')}>
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
          {BOOKS.map(b => (
            <button type="button" key={b.id}
              className={'lnv-bookcard' + (b.id === book ? ' sel' : '')}
              aria-pressed={b.id === book}
              onClick={() => setBook(b.id)}>
              <img src={b.cover} alt=""/>
              <span className="lnv-bt">{b.title}<small>{b.subtitle}</small></span>
              <span className="lnv-cardchev">{b.id === book ? '▾' : '›'}</span>
            </button>
          ))}
          <div className="lnv-scroll">
            <a className="lnv-home" href="index.html#cover">Cover<small>الغلاف · البداية</small></a>
            {levels.map(level => (
              <div key={level}>
                <div className="lnv-lvl">{selectedBook.title.toUpperCase()} · {level}</div>
                {levelLessons(book, level).map(entry => {
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
