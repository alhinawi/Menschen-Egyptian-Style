import {useLayoutEffect, useRef, useState} from 'react';
import type {ImgHTMLAttributes} from 'react';

// Keep exercises mounted for the legacy startup adapters, but do not send
// off-page artwork requests. One observer serves every image in the reader.
const pending = new Map<HTMLImageElement, () => void>();
let observer: MutationObserver | undefined;
let frame = 0;
function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    // While the four-page overview grid owns the pages, the flip's "current
    // page" is only one of the visible cells: every page shown in a grid
    // cell must activate its images, not just that one.
    const gridPages = new Set(document.querySelectorAll<HTMLElement>('#pageGrid .page'));
    const pages = gridPages.size ? [] : [...document.querySelectorAll<HTMLElement>('#pageStage .page')];
    const book = window.menschenBook;
    const index = book?.getCurrentPageIndex?.();
    const initial = location.hash.slice(1);
    const current = pages[index ?? -1] || pages.find(p => p.dataset.page === initial) || pages[0];
    // Prefetch the two neighbours on either side of the current page so a
    // page turn never waits on the network (no blank or spinner flash).
    const currentIndex = pages.indexOf(current);
    const near = new Set([-2, -1, 0, 1, 2].map(d => pages[currentIndex + d]).filter(Boolean));
    for (const [image, activate] of pending) {
      const page = image.closest<HTMLElement>('.page');
      if (!page || gridPages.has(page) || (!gridPages.size && near.has(page))) {
        pending.delete(image);
        activate();
      }
    }
  });
}
function watch(image: HTMLImageElement, activate: () => void) {
  pending.set(image, activate);
  if (!observer) {
    observer = new MutationObserver(records => {
      if (records.some(r => r.type === 'childList' || (r.target instanceof Element && r.target.matches('.page, #pageStage')))) schedule();
    });
    // The grid moves pages into #pageGrid under #spread (a #pageStage
    // sibling), so watch #viewport to catch grid navigation and layout
    // switches as well as flip-book mutations.
    const stage = document.querySelector('#viewport') || document.querySelector('#pageStage') || document.body;
    observer.observe(stage, {subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'style', 'hidden']});
    window.addEventListener('hashchange', schedule);
  }
  schedule();
  return () => {
    pending.delete(image);
    if (!pending.size) {
      observer?.disconnect(); observer = undefined;
      window.removeEventListener('hashchange', schedule);
      cancelAnimationFrame(frame); frame = 0;
    }
  };
}
export function PageImage({src, srcSet, loading = 'lazy', decoding = 'async', ...props}: ImgHTMLAttributes<HTMLImageElement>) {
  const image = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState(false);
  useLayoutEffect(() => image.current ? watch(image.current, () => setActive(true)) : undefined, []);
  return <img {...props} ref={image} loading={loading} decoding={decoding} src={active ? src : undefined} srcSet={active ? srcSet : undefined} data-page-image={active ? 'active' : 'deferred'} />;
}
