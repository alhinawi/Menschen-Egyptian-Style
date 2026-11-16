import './reader-transitions.css';

let cancelActive: (() => void) | undefined;
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
/** A new gesture dismisses the visual layer, never the requested navigation. */
function watchSkip(cancel: () => void) {
  const skip = () => cancel();
  document.addEventListener('pointerdown', skip, {capture: true, once: true});
  document.addEventListener('keydown', skip, {capture: true, once: true});
  return () => {
    document.removeEventListener('pointerdown', skip, true);
    document.removeEventListener('keydown', skip, true);
  };
}

/** Clone only the lightweight cover, not the exercise tree or its state. */
export function openBookCover(cover: HTMLElement, open: () => void): void {
  cancelActive?.();
  if (reduced()) {open(); return;}
  const scene = document.createElement('div');
  scene.className = 'bookOpeningScene';
  scene.setAttribute('aria-hidden', 'true');
  scene.inert = true;
  const leaf = cover.cloneNode(true) as HTMLElement;
  leaf.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
  leaf.classList.add('bookOpeningLeaf');
  scene.append(leaf);
  document.body.append(scene);
  let unwatch = () => {};
  const clear = () => {
    scene.remove(); unwatch(); clearTimeout(timeout);
    if (cancelActive === clear) cancelActive = undefined;
  };
  const timeout = window.setTimeout(clear, 1000);
  cancelActive = clear;
  unwatch = watchSkip(clear);
  // No waiting for animationend: the reader is already usable underneath.
  open();
  requestAnimationFrame(() => scene.classList.add('isOpening'));
  leaf.addEventListener('animationend', event => {if (event.target === leaf) clear();});
}

/** For cold routes, snapshot the loading surface synchronously, start the
 * outgoing door, then fetch/mount behind it. Network never gates animation. */
export async function openLessonDoor(update: () => void | Promise<void>, direction:1|-1=1, begin?:()=>void): Promise<void> {
  cancelActive?.();
  if (reduced() || !document.startViewTransition) {begin?.();await update();return;}
  document.documentElement.dataset.readerTransition = 'door';
  document.documentElement.dataset.readerDirection = direction===-1?'backward':'forward';
  const transition = document.startViewTransition(async () => {if(begin)begin();else await update();});
  let unwatch = () => {};
  const clear = () => {
    transition.skipTransition();
    unwatch(); clearTimeout(timeout);
    if (cancelActive === clear) {
      cancelActive = undefined;
      delete document.documentElement.dataset.readerTransition;
      delete document.documentElement.dataset.readerDirection;
    }
  };
  const timeout = window.setTimeout(clear, 1400);
  cancelActive = clear;
  unwatch = watchSkip(clear);
  void transition.ready.then(() => {document.dispatchEvent(new Event('menschen:paper'));}).catch(() => {});
  void transition.finished.catch(() => {}).finally(clear);
  if(begin){
    // Even if skipped, navigation still runs. No callback waits on a fetch.
    await transition.ready.catch(()=>{});
    await update();
  }else await transition.updateCallbackDone;
}
