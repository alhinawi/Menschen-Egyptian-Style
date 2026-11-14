// Cloudflare Pages builds ship only a prioritized subset of the recorded audio
// (the full 21,687 clips blew past the 20,000-file free-plan cap). The build
// writes the list of shipped clips into src/generated/cf-audio-manifest.json
// (see vite.config.js). Here, a pronunciation resolves to its real recording
// when the manifest lists it, and to /api/tts (Microsoft Edge neural voices,
// edge-cached) otherwise. Everywhere else the local recordings are used
// exactly as before. __MENSCHEN_TTS__ is a build-time constant from
// vite.config.js.
import cfAudioManifest from './generated/cf-audio-manifest.json';

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
 if (file && INCLUDED!.has(file)) return file; // real recording shipped in this build
 return record.text ? ttsUrl(record.text) : undefined; // synthesized fallback
}

export function installTtsMode() {
 if (!TTS_MODE) return;
 document.body.dataset.audio = 'tts';
 // Original coursebook tracks (dialogue CDs) have no transcripts, so they
 // cannot be synthesized; hide their play buttons instead of dead-ends.
 const style = document.createElement('style');
 style.textContent = 'body[data-audio="tts"] .listen,body[data-audio="tts"] .naAudio,'
  + 'body[data-audio="tts"] .nativeAudioMarker,body[data-audio="tts"] .hybridAudio{display:none!important}';
 document.head.append(style);
}
