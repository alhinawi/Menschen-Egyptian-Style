import {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {ReaderContext} from './ReaderControls';
import type {ReaderStore} from './ReaderControls';
import {
  BOOKS, MODULES, findModuleForPage, lessonForPage, lessonUrl,
  levelExtras, levelLessons, modulePages,
} from '../library-data';
import {navigateLesson, lessonUrl as spaLessonUrl} from '../navigate';
// Styles: Tailwind utilities (see classNames) + authored shell rules in ../tailwind.css

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
      setHeaderSlot(null);
      setPageSlot(null);
    };
  }, [slug]);

  useEffect(() => {
    const jump = document.querySelector<HTMLSelectElement>('#pageJump');
    if (!jump) return;
    setPageIndex(Number(jump.value) || 0);
    const sync = () => setPageIndex(Number(jump.value) || 0);
    sync();
    window.menschenBook?.on?.('flip', sync);
    jump.addEventListener('change', sync);
    const unsubscribe = store?.subscribe(sync);
    return () => {
      jump.removeEventListener('change', sync);
      unsubscribe?.();
    };
  }, [store, slug]);

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
      if (target) void navigateLesson(target.slug, String(page));
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
      <button type="button" className="lnv-pill flex-auto min-w-0 flex items-center gap-[7px] h-[38px] px-3 py-0 leading-[normal] border border-[#ddd6c8] rounded-[10px] bg-[#f6efdd] text-[#344137] font-semibold text-[12.5px] font-[Arial,sans-serif] cursor-pointer whitespace-nowrap max-[480px]:px-2 max-[480px]:gap-[5px] max-[480px]:text-[11px]" aria-haspopup="dialog" onClick={() => setPanel('nav')}>
        <span className="lnv-dot size-[7px] rounded-full bg-[var(--accent,#713c46)] flex-none max-[480px]:hidden"/><span className="lnv-pillText overflow-hidden text-ellipsis">{pillText}</span><span className="lnv-chev ml-auto text-[#a08c5f] text-[10px]">▾</span>
      </button>, headerSlot)}
    {pageSlot && createPortal(
      <button type="button" className="lnv-pagePill flex items-center gap-1.5 h-9 min-w-16 justify-center px-[11px] py-0 border border-[#d3d4cd] rounded-md bg-transparent text-[#344137] font-semibold text-[12px] font-[Arial,sans-serif] cursor-pointer" aria-haspopup="dialog" aria-label={`Seite wählen, aktuell ${pagePillText === 'Cover' ? 'Cover' : 'Seite ' + pagePillText}`} onClick={() => setPanel('pages')}>
        {pagePillText}<span className="lnv-chev ml-[2px] text-[#a08c5f] text-[9px]!">▴</span>
      </button>, pageSlot)}
    {panel === 'nav' && createPortal(
      <div className={noAnim ? 'lnv-overlay lnv-noanim fixed inset-0 z-[90]' : 'lnv-overlay fixed inset-0 z-[90]'} role="dialog" aria-label="Library">
        <div className={`lnv-scrim absolute inset-0 bg-[rgba(24,16,10,.55)] touch-none${noAnim ? '' : ' animate-lnv-fade'}`} onClick={close}/>
        <aside className={`lnv-panelBox absolute top-0 bottom-0 left-0 h-auto w-[min(322px,86vw)] bg-[#fdfaf2] text-[#2b2620] shadow-[8px_0_32px_rgba(20,12,6,.35)] flex flex-col dark:bg-[#232a26] dark:text-[#e8e2d4]${noAnim ? '' : ' animate-lnv-slide'}`}>
          <div className="lnv-head flex items-center gap-2.5 px-4 pt-4 pb-3">
            <span className="lnv-brand font-bold text-[22px] font-[Georgia,serif]">Menschen<b className="text-[var(--accent,#713c46)]">.</b></span>
            <button type="button" className="lnv-close ml-auto size-8 min-h-8 rounded-full border border-[#ddd2b8] bg-white text-[#6b6152] text-[15px] p-0" aria-label="Close menu" onClick={close}>×</button>
          </div>
          <div className="lnv-label font-bold text-[10.5px] font-[Arial,sans-serif] tracking-[.16em] text-[#a08c5f] px-4 pt-0.5 pb-2.5">CHOOSE YOUR BOOK</div>
          {BOOKS.map(b => {
            if (b.id === mod.book) {
              return (
                <div key={b.id} className="lnv-bookcard sel flex gap-3 items-center text-left mx-3.5 mb-2.5 p-2.5 rounded-2xl border-[1.5px] border-[#c9a45a] shadow-[0_0_0_1px_#c9a45a,0_6px_16px_rgba(113,60,70,.10)] bg-[#fffdf6] cursor-pointer text-inherit no-underline dark:bg-[#333c36] dark:border-[#c9a45a]" aria-current="true">
                  <img src={b.cover} alt="" className="w-11 h-[60px] object-cover rounded-md shadow-[0_2px_6px_rgba(0,0,0,.25)] flex-none"/>
                  <span className="lnv-bt font-bold text-[16.5px] font-[Georgia,serif] flex flex-col gap-0.5">{b.title}<small className="font-normal text-[11px] font-[Arial,sans-serif] text-[#8a7d63] dark:text-[#9aa396]">{b.subtitle}</small></span>
                </div>
              );
            }
            // Switch straight to the matching Lektion in the other book and
            // keep the library open after the page loads.
            return (
              <a key={b.id} className="lnv-bookcard flex gap-3 items-center text-left mx-3.5 mb-2.5 p-2.5 rounded-2xl border-[1.5px] border-[#e4d9bd] bg-white cursor-pointer text-inherit no-underline dark:bg-[#2c342f] dark:border-[#43504a] dark:text-[#e8e2d4]" href={lessonUrl(switchTarget(b.id))}
                onClick={e => {
                  e.preventDefault();
                  const t = switchTarget(b.id);
                  void navigateLesson(t.slug, String(t.pages[0]));
                }}>
                <img src={b.cover} alt="" className="w-11 h-[60px] object-cover rounded-md shadow-[0_2px_6px_rgba(0,0,0,.25)] flex-none"/>
                <span className="lnv-bt font-bold text-[16.5px] font-[Georgia,serif] flex flex-col gap-0.5">{b.title}<small className="font-normal text-[11px] font-[Arial,sans-serif] text-[#8a7d63] dark:text-[#9aa396]">{b.subtitle}</small></span>
              </a>
            );
          })}
          <div className="lnv-scroll flex-1 overflow-y-auto overscroll-contain touch-pan-y pb-6">
            <a className="lnv-home flex items-baseline gap-2.5 mx-5 mt-0.5 mb-1.5 py-[9px] font-bold text-[13.5px] font-[Arial,sans-serif] text-[#3a332b] no-underline border-b border-[#eee3c8] dark:text-[#ddd6c6] dark:border-[#3a443e]" href={mod.book === 'kb' ? 'index.html#cover' : 'ab1.html#abcover'} onClick={e => { e.preventDefault(); void navigateLesson(mod.book === 'kb' ? 'index' : 'ab1', mod.book === 'kb' ? 'cover' : 'abcover'); }}>Cover</a>
            {levels.map(level => (
              <div key={level}>
                <div className="lnv-lvl font-extrabold text-[11px] font-[Arial,sans-serif] tracking-[.14em] text-[var(--accent,#713c46)] px-5 pt-3 pb-1.5">{bookInfo.title.toUpperCase()} · {level}</div>
                {levelLessons(mod.book, level).map(entry => {
                  const isCurrent = entry.slug === slug && currentPage != null && entry.pages.includes(currentPage);
                  return (
                    <a key={entry.slug + entry.label} className={'lnv-row flex items-center gap-[11px] px-5 py-[8.5px] font-normal text-[13.5px] font-[Arial,sans-serif] no-underline dark:text-[#ddd6c6]' + (isCurrent ? ' cur bg-[color-mix(in_srgb,var(--accent,#713c46)_12%,transparent)]' : ' text-[#3a332b]')}
                      href={lessonUrl(entry)}>
                      <span className={'lnv-no size-[26px] rounded-full border flex items-center justify-center font-bold text-[12px] font-[Georgia,serif] flex-none' + (isCurrent ? ' bg-[var(--accent,#713c46)] border-[var(--accent,#713c46)] text-white' : ' border-[#d8cba4] text-[#6b6152]')}>{entry.short === 'MP' ? '✦' : entry.short.replace('L', '')}</span>
                      <span className={'lnv-nm' + (isCurrent ? ' font-bold' : '') + (entry.short === 'MP' ? ' text-[#8a7d63] italic' : (isCurrent ? ' text-[var(--accent,#713c46)]' : ''))}>{entry.label}</span>
                      <span className="lnv-pp ml-auto text-[10.5px] text-[#a2946f] dark:text-[#9aa396]">pp. {entry.pages[0]}–{entry.pages[entry.pages.length - 1]}</span>
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>
      </div>, document.body)}
    {panel === 'pages' && createPortal(
      <div className={noAnim ? 'lnv-overlay lnv-noanim fixed inset-0 z-[90]' : 'lnv-overlay fixed inset-0 z-[90]'} role="dialog" aria-label="All pages">
        <div className={`lnv-scrim absolute inset-0 bg-[rgba(24,16,10,.55)] touch-none${noAnim ? '' : ' animate-lnv-fade'}`} onClick={close}/>
        <div className={`lnv-sheet absolute inset-x-0 bottom-0 top-[84px] bg-[#fdfaf2] text-[#2b2620] rounded-t-[22px] shadow-[0_-12px_40px_rgba(20,12,6,.4)] flex flex-col dark:bg-[#232a26] dark:text-[#e8e2d4]${noAnim ? '' : ' animate-lnv-rise'}`}>
          <div className="lnv-grab w-11 h-[5px] rounded-[3px] bg-[#d8cba4] mx-auto mt-2.5 mb-1 flex-none"/>
          <div className="lnv-shead px-5 pt-2 pb-2.5 border-b border-[#eee3c8] dark:border-[#3a443e]">
            <div className="lnv-st font-bold text-[18px] font-[Georgia,serif]">All pages</div>
            <div className="lnv-ss font-normal text-[11px] font-[Arial,sans-serif] text-[#8a7d63] mt-0.5 dark:text-[#9aa396]">{bookInfo.title} · {mod.level} — jump to any page</div>
          </div>
          <div className="lnv-sheetscroll flex-1 overflow-y-auto overscroll-contain touch-pan-y pb-7">
            {levelLessons(mod.book, mod.level).map(entry => (
              <div key={entry.slug + entry.label}>
                <div className={'lnv-psec font-extrabold text-[10.5px] font-[Arial,sans-serif] tracking-[.13em] px-5 pt-3 pb-1.5' + (currentPage != null && entry.pages.includes(currentPage) ? ' cur text-[#a5832f] dark:text-[#d4b674] after:content-[""] after:inline-block after:size-1.5 after:rounded-full after:bg-[#c9a45a] after:ml-[7px] after:align-[1px]' : ' text-[var(--accent,#713c46)]')}>{entry.label.toUpperCase()}</div>
                <div className="lnv-pgrid grid grid-cols-4 gap-2 px-5">
                  {entry.pages.map(p => (
                    <button type="button" key={p} className={'lnv-pg h-9 rounded-[9px] border flex items-center justify-center font-semibold text-[12.5px] font-[Arial,sans-serif] cursor-pointer p-0 min-h-9' + (p === currentPage ? ' cur bg-[#c9a45a] border-[#b08d3f] text-[#2b2620] font-extrabold' : ' border-[#ddd2b8] bg-white text-[#4a4234]')}
                      onClick={() => {close(); gotoPage(p);}}>{p}</button>
                  ))}
                </div>
              </div>
            ))}
            {levelExtras(mod.book, mod.level).map(entry => (
              <div key={entry.slug}>
                <div className={'lnv-psec font-extrabold text-[10.5px] font-[Arial,sans-serif] tracking-[.13em] px-5 pt-3 pb-1.5' + (currentPage != null && entry.pages.includes(currentPage) ? ' cur text-[#a5832f] dark:text-[#d4b674] after:content-[""] after:inline-block after:size-1.5 after:rounded-full after:bg-[#c9a45a] after:ml-[7px] after:align-[1px]' : ' text-[var(--accent,#713c46)]')}>EXTRAS</div>
                <div className="lnv-pgrid grid grid-cols-4 gap-2 px-5">
                  {entry.pages.map(p => (
                    <button type="button" key={p} className={'lnv-pg h-9 rounded-[9px] border flex items-center justify-center font-semibold text-[12.5px] font-[Arial,sans-serif] cursor-pointer p-0 min-h-9' + (p === currentPage ? ' cur bg-[#c9a45a] border-[#b08d3f] text-[#2b2620] font-extrabold' : ' border-[#ddd2b8] bg-white text-[#4a4234]')}
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
