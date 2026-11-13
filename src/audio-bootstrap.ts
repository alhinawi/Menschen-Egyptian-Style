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
   // Start playback synchronously so the user's tap always produces sound.
   // The old flow awaited the range probe and the full blob download first,
   // which on a phone left the tap silent for seconds (looking dead) and let
   // the play() gesture context expire. Convert in the background instead;
   // ensureSeekable preserves position and resumes when the blob is ready.
   const started = realPlay.call(this);
   void load().then(m => m.ensureSeekable(this as HTMLAudioElement)).catch(() => {});
   return started;
  }
  return realPlay.call(this);
 };
 document.addEventListener('seeking', e => {
  const a = e.target;
  if (a instanceof HTMLAudioElement && hasHttpSource(a)) void load().then(m => m.ensureSeekable(a, a.currentTime)).catch(() => {});
 }, true);
}
