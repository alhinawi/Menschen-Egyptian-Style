// GET /api/tts?text=...&rate=0.95 -> MP3 from Google Cloud Text-to-Speech.
// The API key stays server-side (Pages project env var GOOGLE_TTS_API_KEY).
// Responses are immutable per (text, rate) so they are cached at the edge with
// the Cache API and served free on repeat presses. Pages Functions only run for
// paths missing from the static output, so this never touches page traffic.
const MAX_TEXT = 500;
const VOICE = 'de-DE-Neural2-C';
const LANG = 'de-DE';

export async function onRequestGet({ request, env, waitUntil }) {
  const url = new URL(request.url);
  const text = (url.searchParams.get('text') || '').trim();
  if (!text) return json({ error: 'missing text' }, 400);
  if (text.length > MAX_TEXT) return json({ error: 'text too long' }, 400);
  const rate = Math.min(1.5, Math.max(0.5, parseFloat(url.searchParams.get('rate') || '0.95') || 0.95));

  // Cheap hotlink guard: when a Referer is present it must be one of our sites.
  // Audio element fetches send Referer on all modern browsers; absent = allow.
  const ref = request.headers.get('Referer');
  if (ref) {
    const host = new URL(ref).hostname;
    if (!/(^|\.)menscheny\.pages\.dev$|(^|\.)germani\.pages\.dev$|^localhost$/.test(host)) {
      return json({ error: 'forbidden' }, 403);
    }
  }

  const cache = caches.default;
  const key = new Request(url.toString(), request);
  const hit = await cache.match(key);
  if (hit) return hit;

  if (!env.GOOGLE_TTS_API_KEY) return json({ error: 'tts not configured' }, 503);

  const g = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + env.GOOGLE_TTS_API_KEY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: LANG, name: VOICE },
      audioConfig: { audioEncoding: 'MP3', speakingRate: rate },
    }),
  });
  if (!g.ok) return json({ error: 'tts upstream failed', status: g.status }, 502);

  const { audioContent } = await g.json();
  if (!audioContent) return json({ error: 'tts upstream empty' }, 502);
  const bytes = Uint8Array.from(atob(audioContent), c => c.charCodeAt(0));
  const res = new Response(bytes, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
    },
  });
  waitUntil(cache.put(key, res.clone()));
  return res;
}

function json(body, status) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}
