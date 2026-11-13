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
    const pages = [...document.querySelectorAll<HTMLElement>('#pageStage .page')];
    const book = window.menschenBook;
    const index = book?.getCurrentPageIndex?.();
    const initial = location.hash.slice(1);
    const current = pages[index ?? -1] || pages.find(p => p.dataset.page === initial) || pages[0];
    for (const [image, activate] of pending) {
      const page = image.closest<HTMLElement>('.page');
      if (!page || page === current) {
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
    const stage = document.querySelector('#pageStage') || document.body;
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
