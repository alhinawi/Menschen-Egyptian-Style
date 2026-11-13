// Install lightweight hooks synchronously so the first play/seek works too.
// The range-probe/blob implementation downloads only when audio is used.
let implementation: Promise<typeof import('./seekable-audio')> | undefined;
const load = () => implementation ??= import('./seekable-audio').catch(error => {
 implementation = undefined;
 throw error;
});
const hasHttpSource = (a: HTMLAudioElement) => {
 const src = a.getAttribute('src') || a.querySelector('source')?.getAttribute('src');
 return !!src && !src.startsWith('blob:');
};
export function installSeekableAudio() {
 const realPlay = HTMLMediaElement.prototype.play;
 HTMLMediaElement.prototype.play = function(this: HTMLMediaElement) {
  if (this instanceof HTMLAudioElement && hasHttpSource(this)) {
   return load().then(m => m.ensureSeekable(this as HTMLAudioElement)).catch(() => {}).then(() => realPlay.call(this));
  }
  return realPlay.call(this);
 };
 document.addEventListener('seeking', e => {
  const a = e.target;
  if (a instanceof HTMLAudioElement && hasHttpSource(a)) void load().then(m => m.ensureSeekable(a, a.currentTime)).catch(() => {});
 }, true);
}
