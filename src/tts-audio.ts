// Cloudflare Pages builds ship without the stored audio files (they blew past
// the 20,000-file free-plan cap). There, pronunciation is synthesized on demand
// by the /api/tts Pages Function (Google Cloud TTS, edge-cached). Everywhere
// else the local recordings are used exactly as before. __MENSCHEN_TTS__ is a
// build-time constant from vite.config.js.
declare const __MENSCHEN_TTS__: boolean | undefined;
export const TTS_MODE = typeof __MENSCHEN_TTS__ !== 'undefined' && __MENSCHEN_TTS__;

export function ttsUrl(text: string, rate = 0.95): string {
 return '/api/tts?text=' + encodeURIComponent(text) + '&rate=' + rate;
}

// One pronunciation record ({id, type, text}) -> playable URL for this build.
export function recordPronunciationUrl(record: {id?: string; text?: string} | undefined): string | undefined {
 if (!record) return undefined;
 if (TTS_MODE) return record.text ? ttsUrl(record.text) : undefined;
 return window.PRONUNCIATION_FILES?.[record.id as string];
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
