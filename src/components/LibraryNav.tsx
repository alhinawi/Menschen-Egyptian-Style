import {useUiLanguage} from '../ui-language';
import {PageImage} from './PageImage';
import {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {ReaderContext} from './ReaderControls';
import type {ReaderStore} from './ReaderControls';
import {
  BOOKS, MODULES, MODULE_ORDER, findModuleForPage, lessonForPage, lessonUrl,
  levelExtras, levelLessons, modulePages, levelCover,
} from '../library-data';
import {navigateLesson, prefetchLesson, resolveHref, lessonUrl as spaLessonUrl} from '../navigate';
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
  const {t} = useUiLanguage();
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
    const sync = () => {
      const index=Number(jump.value)||0;
      setPageIndex(index);
      if(!mod)return;
      const token=document.querySelectorAll<HTMLElement>('.page')[index]?.dataset.page||'';
      const lesson=lessonForPage(mod,Number(token));
      const book=`${mod.book==='kb'?'Kursbuch':'Arbeitsbuch'} ${mod.level}`;
      // The home route names the book, never the entire site as lesson 1.
      document.title=slug==='index'?'Menschen Egyptian Style · Deutsch A1':
        `${lesson?.label ?? book} · Menschen Egyptian Style${lesson?' · '+book:''}`;
    };
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

  // Warm only nearby modules at idle; no whole-library download on a phone.
  useEffect(() => {
    const timer=window.setTimeout(()=>{
      const sameBook=MODULE_ORDER.filter(s=>MODULES[s]?.book===mod?.book),i=sameBook.indexOf(slug);
      const targets=new Set([sameBook[i-1],sameBook[i+1]]);
      // Book/level entry cards are as likely as the next lesson on menu open.
      if(panel)for(const book of ['kb','ab'] as const)for(const level of ['A1.1','A1.2','A2.1'] as const)targets.add(levelCover(book,level).slug);
      for(const next of targets)if(next&&next!==slug)void prefetchLesson(next);
    },panel?0:500);
    return ()=>clearTimeout(timer);
  },[slug,panel]);
  useEffect(() => {
    if(!panel)return;
    const warm=(event:Event)=>{const anchor=(event.target as Element).closest?.('a[href]');const target=anchor&&resolveHref(anchor.getAttribute('href')||'');if(target)void prefetchLesson(target.slug,target.token);};
    document.addEventListener('pointerover',warm,{passive:true});document.addEventListener('pointerdown',warm,{passive:true});document.addEventListener('focusin',warm);
    return()=>{document.removeEventListener('pointerover',warm);document.removeEventListener('pointerdown',warm);document.removeEventListener('focusin',warm);};
  },[panel]);

  if (!mod) return null;

  const pages = modulePages(slug);
  const currentToken = document.querySelectorAll<HTMLElement>('.page')[pageIndex]?.dataset.page ?? pages[Math.min(pageIndex, pages.length - 1)] ?? '';
  // Non-numbered pages: book covers and the index how-to page.
  const special: Record<string, string> = {cover: 'Cover', abcover: 'Cover', howto: 'Guide', imprint: 'Imprint', 'inside-back-cover': 'Inside back cover', 'back-cover': 'Back cover'};
  const currentPage = currentToken in special ? null : Number(currentToken);
  const currentLesson = currentPage == null ? null : lessonForPage(mod, currentPage);
  const bookInfo = BOOKS.find(b => b.id === mod.book)!;
  const cover = levelCover(mod.book, mod.level);
  const bookTag = mod.book === 'kb' ? 'KB' : 'AB';
  const pillText = currentPage == null
    ? (['imprint', 'inside-back-cover', 'back-cover'].includes(currentToken) ? (currentToken === 'inside-back-cover' ? 'Inside cover' : special[currentToken]) : `${bookTag} ${mod.level} · ${special[currentToken] ?? 'Cover'}`)
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

  const levels: Array<'A1.1' | 'A1.2' | 'A2.1'> = ['A1.1', 'A1.2', 'A2.1'];

  return <>
    {headerSlot && createPortal(
      <button type="button" className="lnv-pill flex-auto min-w-0 flex items-center gap-[7px] h-[38px] px-3 py-0 leading-[normal] border border-[#ddd6c8] rounded-[10px] bg-[#f6efdd] text-[#344137] font-semibold text-[12.5px] font-[Arial,sans-serif] cursor-pointer whitespace-nowrap max-[480px]:px-2 max-[480px]:gap-[5px] max-[480px]:text-[11px]" aria-haspopup="dialog" onClick={() => setPanel('nav')}>
        <span className="lnv-dot size-[7px] rounded-full bg-[var(--accent,#713c46)] flex-none max-[480px]:hidden"/><span className="lnv-pillText overflow-hidden text-ellipsis">{pillText}</span><span className="lnv-chev ml-auto text-[#75623a] dark:text-[#c9b489] text-[10px]">▾</span>
      </button>, headerSlot)}
    {pageSlot && createPortal(
      <button type="button" className={(isNaN(Number(pagePillText)) ? 'lnv-wordPage ' : '')+"lnv-pagePill flex items-center gap-1.5 h-9 min-w-16 justify-center px-[11px] py-0 border border-[#d3d4cd] rounded-md bg-transparent text-[#344137] font-semibold text-[12px] font-[Arial,sans-serif] cursor-pointer"} aria-haspopup="dialog" aria-label={`Choose page, current page ${pagePillText === 'Cover' ? 'Cover' : 'Seite ' + pagePillText}`} onClick={() => setPanel('pages')}>
        <span className="lnv-pageLabel">{pagePillText}</span><span className="lnv-chev ml-[2px] text-[#75623a] dark:text-[#c9b489] text-[9px]!">▴</span>
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
          <div className="lnv-bookgrid grid grid-cols-2 gap-2 mx-3.5 mb-3">
            {levels.flatMap(level => BOOKS.filter(b => level !== 'A2.1' || b.id === 'kb').map(b => {
              const target = levelCover(b.id, level);
              const selected = b.id === mod.book && level === mod.level;
              return <a key={b.id + level} className={'lnv-bookcard flex items-center gap-2 p-2 rounded-xl border bg-white text-inherit no-underline dark:bg-[#2c342f] dark:text-[#e8e2d4]' + (selected ? ' sel border-[#c9a45a] ring-1 ring-[#c9a45a]' : ' border-[#e4d9bd] dark:border-[#43504a]')}
                aria-label={`${t(b.title)} ${level}`} aria-current={selected ? 'true' : undefined}
                href={spaLessonUrl(target.slug, target.token)} onClick={e => {e.preventDefault();close();void navigateLesson(target.slug, target.token);}}>
                <PageImage loading="eager" src={level === 'A2.1' ? 'assets/kb-a21-cover.webp' : level === 'A1.2' ? `assets/${b.id}-a12-cover.webp` : b.cover} alt="" className="w-8 h-[44px] object-contain rounded-sm shadow-sm flex-none"/>
                <span className="lnv-bt font-bold text-[12px] font-[Georgia,serif] flex flex-col gap-1 min-w-0">{t(b.title)}<small className="font-normal text-[11px] font-[Arial,sans-serif] text-[#8a7d63] dark:text-[#9aa396]">{level}</small></span>
              </a>;
            }))}
          </div>
          <div className="lnv-scroll flex-1 overflow-y-auto overscroll-contain touch-pan-y pb-6">
            <a className="lnv-home flex items-baseline gap-2.5 mx-5 mt-0.5 mb-1.5 py-[9px] font-bold text-[13.5px] font-[Arial,sans-serif] text-[#3a332b] no-underline border-b border-[#eee3c8] dark:text-[#ddd6c6] dark:border-[#3a443e]" href={spaLessonUrl(cover.slug, cover.token)} onClick={e => { e.preventDefault(); close(); void navigateLesson(cover.slug, cover.token); }}>Cover</a>
            {levels.map(level => (
              <div key={level}>
                <div className="lnv-lvl font-extrabold text-[11px] font-[Arial,sans-serif] tracking-[.14em] text-[var(--accent,#713c46)] px-5 pt-3 pb-1.5">{bookInfo.title.toUpperCase()} · {level}</div>
                {levelLessons(mod.book, level).map(entry => {
                  const isCurrent = entry.slug === slug && currentPage != null && entry.pages.includes(currentPage);
                  return (
                    <a key={entry.slug + entry.label} className={'lnv-row flex items-center gap-[11px] px-5 py-[8.5px] font-normal text-[13.5px] font-[Arial,sans-serif] no-underline dark:text-[#ddd6c6]' + (isCurrent ? ' cur bg-[color-mix(in_srgb,var(--accent,#713c46)_12%,transparent)]' : ' text-[#3a332b]')}
                      href={lessonUrl(entry)}
                      onClick={e => { e.preventDefault(); close(); void navigateLesson(entry.slug, String(entry.pages[0])); }}>
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
            <div className="lnv-ss font-normal text-[11px] font-[Arial,sans-serif] text-[#8a7d63] mt-0.5 dark:text-[#9aa396]">{bookInfo.title} · {mod.level} - jump to any page</div>
          </div>
          <div className="lnv-sheetscroll flex-1 overflow-y-auto overscroll-contain touch-pan-y pb-7">
            {<div className="flex gap-2 px-5 pt-3"><button type="button" aria-current={currentToken === (mod.book === 'kb' ? 'cover' : 'abcover') ? 'page' : undefined} className={'lnv-pg h-10 min-w-20 px-4 rounded-md border' + (currentToken === (mod.book === 'kb' ? 'cover' : 'abcover') ? ' cur bg-[#c9a45a] border-[#b08d3f] text-[#2b2620] font-extrabold' : '')} onClick={()=>{close();void navigateLesson(cover.slug,cover.token)}}>Cover</button><button type="button" aria-current={currentToken === 'howto' ? 'page' : undefined} className={'lnv-pg h-10 min-w-20 px-4 rounded-md border' + (currentToken === 'howto' ? ' cur bg-[#c9a45a] border-[#b08d3f] text-[#2b2620] font-extrabold' : '')} onClick={()=>{close();void navigateLesson('index','howto')}}>Guide</button></div>}

            {slug === 'l21-24' && <div className="flex flex-col gap-2 px-5 py-3">{['imprint', 'inside-back-cover', 'back-cover'].map(token => <button type="button" key={token} className="lnv-pg h-9 rounded-md border" onClick={() => {close(); const idx = [...document.querySelectorAll<HTMLElement>('.page')].findIndex(p => p.dataset.page === token); const jump = document.querySelector<HTMLSelectElement>('#pageJump'); if (jump && idx >= 0) {jump.value = String(idx); jump.dispatchEvent(new Event('change', {bubbles: true}));}}}>{special[token]} (unnumbered)</button>)}</div>}
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
