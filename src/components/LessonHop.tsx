import {useEffect} from 'react';
import {MODULE_ORDER, MODULES, modulePages} from '../library-data';

/**
 * Cross-module page turning. Each module's flip stops at its own first/last
 * page; this lets the arrows continue into the neighbouring module of the
 * same book (A1.1 into A1.2 included): next at the last page opens the next
 * module's first page, prev at the first page opens the previous module's
 * last page.
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

    return () => {
      document.removeEventListener('click', onClick, true);
      observer.disconnect();
    };
  }, [slug]);
  return null;
}
