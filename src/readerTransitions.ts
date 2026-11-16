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

/** Keep the outgoing browser snapshot covering cold routes until the target
 * is mounted. Only then swing the one door onto the ready destination. */
export async function openLessonDoor(update: () => void | Promise<void>, direction:1|-1=1): Promise<void> {
  cancelActive?.();
  if (reduced() || !document.startViewTransition) {await update();return;}
  document.documentElement.dataset.readerTransition = 'door';
  document.documentElement.dataset.readerDirection = direction===-1?'backward':'forward';
  let work:Promise<void>|undefined;
  const transition = document.startViewTransition(() => {work=Promise.resolve().then(update);return work;});
  let unwatch = () => {};
  const clear = () => {
    transition.skipTransition();unwatch();
    if (cancelActive === clear) {
      cancelActive = undefined;
      delete document.documentElement.dataset.readerTransition;
      delete document.documentElement.dataset.readerDirection;
    }
  };
  cancelActive = clear;
  // A click may skip decoration, but never cancels route loading.
  unwatch = watchSkip(clear);
  void transition.ready.then(() => {document.dispatchEvent(new Event('menschen:paper'));}).catch(() => {});
  void transition.finished.catch(() => {}).finally(clear);
  // Browsers may drop a snapshot on a very slow connection. That is not a
  // failed route: keep its original DOM until the real update finishes.
  await transition.updateCallbackDone.catch(error=>{if(!work)throw error;});
  await work;
}
