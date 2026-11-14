// GET /api/tts?text=...&voice=m|f&rate=0.95 -> MP3 spoken by Microsoft Edge's
// neural TTS (the free read-aloud endpoint the Edge browser itself uses).
// No API key: requests authenticate with a time-boxed Sec-MS-GEC token that is
// derived in pure JS below (a port of the algorithm every Edge client runs).
// The endpoint only accepts WebSocket upgrades carrying a desktop-Edge
// User-Agent, so the function opens the socket with a Workers fetch upgrade
// (plain new WebSocket() cannot set User-Agent).
// Voice defaults to the male voice; voice=f selects the female one - Microsoft
// serves exactly two real de-DE voices. Responses are immutable per
// (text, voice, rate) and cached at the edge, so repeat presses are free.
// Pages Functions only run for paths missing from the static output, so this
// never touches page traffic.
const MAX_TEXT = 500;
const VOICES = { m: 'de-DE-ChristophNeural', f: 'de-DE-TanjaNeural' };
const EDGE_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0';
const GEC_VERSION = '2-143.0.3650.75';

export async function onRequestGet({ request, waitUntil }) {
  const url = new URL(request.url);
  const text = (url.searchParams.get('text') || '').trim();
  if (!text) return json({ error: 'missing text' }, 400);
  if (text.length > MAX_TEXT) return json({ error: 'text too long' }, 400);
  const voice = VOICES[url.searchParams.get('voice')] || VOICES.m;
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

  let bytes;
  try {
    bytes = await synthesize(text, voice, rate);
  } catch (err) {
    return json({ error: 'tts upstream failed', detail: String(err && err.message || err) }, 502);
  }
  if (!bytes.audio.length) return json({ error: 'tts upstream empty', diag: bytes.diag }, 502);
  const res = new Response(bytes.audio, {
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

function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;');
}

// One synthesis round-trip: open the socket, send speech.config + SSML, collect
// binary audio frames until turn.end.
async function synthesize(text, voice, rate) {
  const gec = await generateSecMsGec();
  const cid = crypto.randomUUID().replaceAll('-', '');
  const wss = 'https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1'
    + '?TrustedClientToken=' + TOKEN
    + '&ConnectionId=' + cid
    + '&Sec-MS-GEC=' + gec
    + '&Sec-MS-GEC-Version=' + GEC_VERSION;
  const resp = await fetch(wss, { headers: { 'Upgrade': 'websocket', 'User-Agent': EDGE_UA } });
  const ws = resp.webSocket;
  if (!ws) throw new Error('websocket upgrade refused (status ' + resp.status + ')');
  ws.accept();

  const ratePct = Math.round((rate - 1) * 100);
  const rateStr = (ratePct >= 0 ? '+' : '') + ratePct + '%';
  const ts = new Date().toUTCString().replace('GMT', 'GMT+0000 (Coordinated Universal Time)');
  ws.send('X-Timestamp:' + ts + '\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n'
    + '{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}\r\n');
  const ssml = "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>"
    + "<voice name='" + voice + "'><prosody pitch='+0Hz' rate='" + rateStr + "' volume='+0%'>"
    + xmlEscape(text) + '</prosody></voice></speak>';
  ws.send('X-RequestId:' + crypto.randomUUID().replaceAll('-', '') + '\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:' + ts + 'Z\r\nPath:ssml\r\n\r\n' + ssml);

  return await new Promise((resolve, reject) => {
    const chunks = [];
    const diag = [];
    let sawEnd = false;
    const timer = setTimeout(() => { try { ws.close(); } catch (_) {} reject(new Error('tts timed out; diag:' + diag.join(' ~ '))); }, 20000);
    ws.addEventListener('message', async ev => {
      try {
        if (typeof ev.data === 'string') {
          const pm = /Path:([\w.]+)/.exec(ev.data); if (pm) diag.push(pm[1]);
          if (ev.data.indexOf('Path:turn.end') !== -1) {
            sawEnd = true;
            clearTimeout(timer);
            try { ws.close(); } catch (_) {}
            const total = chunks.reduce((n, c) => n + c.length, 0);
            const out = new Uint8Array(total);
            let off = 0;
            for (const c of chunks) { out.set(c, off); off += c.length; }
            resolve({ audio: out, diag });
          }
          return;
        }
        // workerd hands binary frames over as Blob, not ArrayBuffer.
        let data = ev.data;
        if (!(data instanceof ArrayBuffer)) data = await data.arrayBuffer();
        const buf = new Uint8Array(data);
        if (buf.length < 2) return;
        const hlen = (buf[0] << 8) | buf[1];
        const head = new TextDecoder().decode(buf.subarray(2, 2 + hlen));
        diag.push('bin:' + buf.length + ':h' + hlen + ':' + head.slice(0, 100).replace(/[\r\n]+/g, '|'));
        if (head.indexOf('Path:audio') !== -1 && buf.length > 2 + hlen) chunks.push(buf.subarray(2 + hlen));
      } catch (err) { clearTimeout(timer); reject(err); }
    });
    ws.addEventListener('error', () => { clearTimeout(timer); reject(new Error('websocket error')); });
    ws.addEventListener('close', () => { if (!sawEnd) { clearTimeout(timer); reject(new Error('websocket closed before turn.end')); } });
  });
}

// Faithful JS port of edge-tts 7.3.1 Sec-MS-GEC v2 (drm.py).
// The hash is a SHA-256 variant with a custom midstate schedule; every op is
// 32-bit, so JS bitwise + Math.imul replicate it exactly.
const TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
const M = 0xFFFFFFFF;
const rol16 = v => (((v << 16) | (v >>> 16)) >>> 0);
const rotr = (x, n) => ((x >>> n) | (x << (32 - n))) >>> 0;
const S1 = e => rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
const S0 = a => rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
const Ch = (e, f, g) => g ^ (e & (f ^ g));
const Maj = (a, b, c) => (a & b) | (c & (a | b));
const sig0 = v => ((v >>> 7) ^ (v << 25) ^ (v >>> 18) ^ (v << 14) ^ (v >>> 3)) >>> 0;
const sig1 = v => ((v >>> 17) ^ (v << 15) ^ (v >>> 19) ^ (v << 13) ^ (v >>> 10)) >>> 0;

const INIT = [0x6A09E667,0xBB67AE85,0x3C6EF372,0xA54FF53A,0x510E527F,0x9B05688C,0x1F83D9AB,0x5BE0CD19];
const STATE = [0xFD9FBEA2,0x91243CE7,0xBE499094,0xCD2E1E0A,0x6C006F49,0x04BD35AB,0xFEB0A7E4,0x03EFFBD2];
const SCHED = [0xEB24BF9E,0x1558691F,0xA0C09EE2,0x0CFA32BA,0xA622EE8C,0xD1DD9491,0xC0DD25A0,0xF9E70AB6,0xF0C31573,0x7058CE4E,0x7188E606,0x00E5AB33,0xD258B060,0x72766564];
const K = [0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0x0FC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x06CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2];
const ADJ = 0xC9DC06A7;
const K_BLOCK = [...K.slice(0, 14), ADJ, ...K.slice(15)];
const SIGMA0_ADJ = 0x059C0B80;
const SIGMA1_ADJ = 0x000B92C0;

function expand(words, first) {
  for (let i = first; i < 64; i++) {
    const x = words[i - 2], y = words[i - 15];
    const s1 = (x >>> 17) ^ (x << 15) ^ (x >>> 19) ^ (x << 13) ^ (x >>> 10);
    const s0 = (y >>> 7) ^ (y << 25) ^ (y >>> 18) ^ (y << 14) ^ (y >>> 3);
    words[i] = (s1 + words[i - 7] + s0 + words[i - 16]) >>> 0;
  }
}

function rounds(state, words, firstRound) {
  let [a, b, c, d, e, f, g, h] = state;
  const constants = firstRound === 14 ? K_BLOCK : K;
  const aligned = Math.min(64, Math.floor((firstRound + 7) / 8) * 8);
  for (let i = firstRound; i < aligned; i++) {
    const t1 = h + S1(e) + Ch(e, f, g) + constants[i] + words[i];
    const t2 = S0(a) + Maj(a, b, c);
    h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
  }
  for (let i = aligned; i < 64; i += 8) {
    let t1 = h + S1(e) + Ch(e, f, g) + constants[i] + words[i];
    d = (d + t1) >>> 0;
    h = (t1 + S0(a) + Maj(a, b, c)) >>> 0;
    t1 = g + S1(d) + Ch(d, e, f) + constants[i + 1] + words[i + 1];
    c = (c + t1) >>> 0;
    g = (t1 + S0(h) + Maj(h, a, b)) >>> 0;
    t1 = f + S1(c) + Ch(c, d, e) + constants[i + 2] + words[i + 2];
    b = (b + t1) >>> 0;
    f = (t1 + S0(g) + Maj(g, h, a)) >>> 0;
    t1 = e + S1(b) + Ch(b, c, d) + constants[i + 3] + words[i + 3];
    a = (a + t1) >>> 0;
    e = (t1 + S0(f) + Maj(f, g, h)) >>> 0;
    t1 = d + S1(a) + Ch(a, b, c) + constants[i + 4] + words[i + 4];
    h = (h + t1) >>> 0;
    d = (t1 + S0(e) + Maj(e, f, g)) >>> 0;
    t1 = c + S1(h) + Ch(h, a, b) + constants[i + 5] + words[i + 5];
    g = (g + t1) >>> 0;
    c = (t1 + S0(d) + Maj(d, e, f)) >>> 0;
    t1 = b + S1(g) + Ch(g, h, a) + constants[i + 6] + words[i + 6];
    f = (f + t1) >>> 0;
    b = (t1 + S0(c) + Maj(c, d, e)) >>> 0;
    t1 = a + S1(f) + Ch(f, g, h) + constants[i + 7] + words[i + 7];
    e = (e + t1) >>> 0;
    a = (t1 + S0(b) + Maj(b, c, d)) >>> 0;
  }
  return [a, b, c, d, e, f, g, h];
}

let cachedInit = null; // {head: string, state: number[]} - token head changes every 5 min
function shaInit(data) {
  const words = new Array(14).fill(0);
  words[14] = (data[0] << 16) | (data[1] << 8) | data[2];
  words[15] = ((data[3] << 24) | (data[4] << 16) | (data[5] << 8) | data[6]) >>> 0;
  for (let i = 16; i < 30; i++) {
    let value = SCHED[i - 16];
    if (i - 2 >= 14) value += i === 16 ? (sig1(words[i - 2]) ^ SIGMA1_ADJ) : sig1(words[i - 2]);
    if (i - 7 >= 14) value += words[i - 7];
    if (i - 15 >= 14) value += i === 29 ? (sig0(words[i - 15]) ^ SIGMA0_ADJ) : sig0(words[i - 15]);
    words[i] = value >>> 0;
  }
  words[30] = (sig1(words[28]) + words[23] + sig0(words[15]) + words[14] + ADJ - K[14]) >>> 0;
  expand(words, 31);
  const working = rounds(STATE, words, 14);
  return working.map((x, i) => (x + INIT[i]) >>> 0);
}

function sha256Custom(data) {
  const head = String.fromCharCode(...data.subarray(0, 7));
  if (!cachedInit || cachedInit.head !== head) cachedInit = { head, state: shaInit(data.subarray(0, 7)) };
  const length = 57 + data.length;
  const rest = data.subarray(7);
  const padLen = ((55 - length) % 64 + 64) % 64;
  const padded = new Uint8Array(rest.length + 1 + padLen + 8);
  padded.set(rest);
  padded[rest.length] = 0x80;
  const dv = new DataView(padded.buffer);
  dv.setUint32(padded.length - 8, Math.floor((length * 8) / 0x100000000));
  dv.setUint32(padded.length - 4, (length * 8) >>> 0);
  let state = cachedInit.state;
  for (let off = 0; off < padded.length; off += 64) {
    const words = new Array(64);
    for (let i = 0; i < 16; i++) words[i] = dv.getUint32(off + i * 4);
    expand(words, 16);
    const working = rounds(state, words, 0);
    state = state.map((x, i) => (x + working[i]) >>> 0);
  }
  return state;
}

const COEFF_C = [0xE82E91B1,0x44DE24C6,0x3BEB65BC,0xC89C5933,0x8D1EC211,0x314EF5D5,0xE92491B1,0xF0A5B9D5,0x06064CF3,0xDA79FA60,0xBED20560,0x89F9C9F8,0x35FA38C6,0xCB49E3C6];
const COEFF_O = [0xB32700D0,0x88DFF51D,0x29514038,0xB328CBDF,0xD405B4D5,0x26E55F3C,0x607801C6,0x82B2C1FB,0xFA51A3DA,0x207CC464,0x3C3C74F3,0xD2D14B61,0xBB04A2C1,0xC5626167];

function wordsLe(bytes) {
  const out = [];
  for (let i = 0; i < bytes.length; i += 4)
    out.push(((bytes[i] || 0) | ((bytes[i + 1] || 0) << 8) | ((bytes[i + 2] || 0) << 16) | ((bytes[i + 3] || 0) << 24)) >>> 0);
  if (out.length % 2) out.push(0);
  return out;
}

function cs64(data, digestBytes) {
  const dvb = new DataView(digestBytes.buffer, digestBytes.byteOffset);
  const keyA = (dvb.getUint32(0, true) | 1) >>> 0;
  const keyB = (dvb.getUint32(4, true) | 1) >>> 0;
  const factors = [Math.imul(keyA, 0x82893933) >>> 0, Math.imul(keyB, 0x82893933) >>> 0];
  const terms = COEFF_C.map((c, i) => Math.imul(c, factors[i % 2]) >>> 0);
  const offsets = COEFF_O.slice();
  const words = wordsLe([0, ...data]);
  words.forEach((word, index) => {
    let term = Math.imul(word, index % 2 === 0 ? keyA : keyB);
    let offset = Math.imul(rol16(word), index % 2 === 0 ? 0xEF0569FB : 0xC31713DB);
    if (index === 0) { term += Math.imul(0xF2F90B1A, factors[0]); offset += 0x0B1A0000; }
    terms.push(term >>> 0);
    offsets.push(offset >>> 0);
  });
  let swapAcc = 0, swapLast = 0, state = 0, acc = 0;
  for (let i = 0; i < terms.length; i += 2) {
    const x = terms[i], y = terms[i + 1];
    let t = rol16((offsets[i] + x) >>> 0);
    let q = Math.imul(t, 0x76F50F34) >>> 0;
    swapAcc = (swapAcc + ((Math.imul(rol16(q), 0xC3EFEA97) + q) >>> 0)) >>> 0;
    t = rol16((offsets[i + 1] + y) >>> 0);
    q = Math.imul(t, 0x1881CE3C) >>> 0;
    swapLast = (Math.imul(rol16(q), 0x35BD1EC9) + q) >>> 0;
    swapAcc = (swapAcc + swapLast) >>> 0;
    state = (Math.imul(state, keyA) + x) >>> 0;
    state = Math.imul(rol16(state), 0xCF98B111) >>> 0;
    state = Math.imul(rol16(state), 0x87085B9F) >>> 0;
    state = Math.imul(rol16(state), 0x12CEB96D) >>> 0;
    state = Math.imul(rol16(state), 0x257E1D83) >>> 0;
    acc = (acc + state) >>> 0;
    let t2 = (Math.imul(state, keyB) + y) >>> 0;
    t2 = Math.imul(rol16(t2), 0xA27416F5) >>> 0;
    t2 = Math.imul(rol16(t2), 0xD38396FF) >>> 0;
    state = Math.imul(rol16(Math.imul(rol16(t2), 0x7C932B89) >>> 0), 0xBFA49F69) >>> 0;
    acc = (acc + state) >>> 0;
  }
  return [(swapLast ^ state) >>> 0, (swapAcc ^ acc) >>> 0];
}

const hexU32LE = w => [w & 255, (w >>> 8) & 255, (w >>> 16) & 255, (w >>> 24) & 255]
  .map(b => b.toString(16).padStart(2, '0')).join('');

async function generateSecMsGec(nowSec) {
  const unix = nowSec !== undefined ? nowSec : Date.now() / 1000;
  let ticks = unix + 11644473600;
  ticks -= ticks % 300;
  ticks *= 1e7;
  const data = new TextEncoder().encode(ticks.toFixed(0) + TOKEN);
  const state = sha256Custom(data);
  const digestBytes = new Uint8Array(32);
  const dv = new DataView(digestBytes.buffer);
  state.forEach((w, i) => dv.setUint32(i * 4, w));
  const [a, b] = cs64(data, digestBytes);
  const cs64hex = (hexU32LE(a) + hexU32LE(b)).toUpperCase();
  const sha = [...digestBytes].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
  return `${cs64hex}-${sha}`;
}
