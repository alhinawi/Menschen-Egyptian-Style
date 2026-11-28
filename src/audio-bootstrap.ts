// Install lightweight hooks synchronously so the first play/seek works too.
// The range-probe/blob implementation downloads only when audio is used.
import {trackAudioUrl} from './tts-audio';
let implementation: Promise<typeof import('./seekable-audio')> | undefined;
const load = () => implementation ??= import('./seekable-audio').catch(error => {
 implementation = undefined;
 throw error;
});
const hasHttpSource = (a: HTMLAudioElement) => {
 const src = a.getAttribute('src') || a.querySelector('source')?.getAttribute('src');
 return !!src && !src.startsWith('blob:');
};
const toCdn = (a: HTMLAudioElement) => {
 // Cloudflare Pages does not honor the generated _redirects rules for
 // root-level /assets/*.mp3 (only directory rules fire), so those tracks 200
 // as the SPA fallback and break playback. Point them at the CDN directly.
 const attr = a.getAttribute('src');
 if (attr && !attr.startsWith('blob:')) {
  const cdn = trackAudioUrl(attr);
  if (cdn !== attr) a.src = cdn;
  return;
 }
 const child = a.querySelector('source');
 const s = child?.getAttribute('src');
 if (child && s && !s.startsWith('blob:')) {
  const cdn = trackAudioUrl(s);
  if (cdn !== s) { child.setAttribute('src', cdn); a.load(); }
 }
};
export function installSeekableAudio() {
 const realPlay = HTMLMediaElement.prototype.play;
 HTMLMediaElement.prototype.play = function(this: HTMLMediaElement) {
  if (this instanceof HTMLAudioElement && this.dataset.readerAudioRole!=='feedback') toCdn(this);
  if (this instanceof HTMLAudioElement && this.dataset.readerAudioRole!=='feedback' && hasHttpSource(this)) {
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
