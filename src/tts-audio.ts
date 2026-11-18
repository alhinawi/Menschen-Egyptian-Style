// Cloudflare Pages builds ship only a prioritized subset of the recorded audio
// (the full 21,687 clips blew past the 20,000-file free-plan cap). The build
// writes the list of shipped clips into src/generated/cf-audio-manifest.json
// (see vite.config.js). Here, a pronunciation resolves to its real recording
// when the build manifest lists it, then to the dedicated static audio CDN.
// Only texts with no static mapping use /api/tts (Edge neural voices). Everywhere else the local recordings are used
// exactly as before. __MENSCHEN_TTS__ is a build-time constant from
// vite.config.js.
import cfAudioManifest from './generated/cf-audio-manifest.json';
import audioCdnManifest from './audio-cdn-manifest.json';

const AUDIO_CDN_ORIGIN = 'https://menschen-audio.pages.dev';
const CDN_FILES: Readonly<Record<string, string>> = audioCdnManifest;

declare const __MENSCHEN_TTS__: boolean | undefined;
export const TTS_MODE = typeof __MENSCHEN_TTS__ !== 'undefined' && __MENSCHEN_TTS__;

const INCLUDED: Set<string> | null = TTS_MODE ? new Set(cfAudioManifest as string[]) : null;

export function ttsUrl(text: string, rate = 0.95): string {
 return '/api/tts?text=' + encodeURIComponent(text) + '&rate=' + rate;
}

// One pronunciation record ({id, type, text}) -> playable URL for this build.
export function recordPronunciationUrl(record: {id?: string; text?: string} | undefined): string | undefined {
 if (!record) return undefined;
 const file = record.id ? window.PRONUNCIATION_FILES?.[record.id as string] : undefined;
 if (!TTS_MODE) return file;
 if (file && INCLUDED!.has(file)) return file; // static recording shipped in this build
 if (file && CDN_FILES[file]) return AUDIO_CDN_ORIGIN + CDN_FILES[file];
 return record.text ? ttsUrl(record.text) : undefined; // synthesized fallback
}

export function installTtsMode() {
 if (!TTS_MODE) return;
 document.body.dataset.audio = 'tts';
 // Original coursebook tracks (dialogue CDs) have no transcripts, so they
 // cannot be synthesized; hide their play buttons instead of dead-ends.
 // Narrow exception: original-CD tracks this build actually packaged (e.g.
 // the AB CD1 tracks the Arbeitsbuch Lektion 5 pages need) keep their
 // controls - the files ship, so those buttons are not dead ends.
 const packagedTracks = (cfAudioManifest as string[])
  .filter(f => /^assets\/[^/]*-(cd\d-)?track\d+\.(mp3|wav|ogg)$/i.test(f));
 const exempt = packagedTracks.map(f => `:not([data-audio-src="${f}"])`).join('');
 const style = document.createElement('style');
 style.textContent = 'body[data-audio="tts"] '
  + `:is(.listen,.naAudio,.nativeAudioMarker,.hybridAudio)${exempt}{display:none!important}`;
 document.head.append(style);
}
