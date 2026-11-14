import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
// Static files keep their original URL, and copyrighted source PDFs stay excluded.
// One SPA entry (index.html); closeBundle emits a per-route html for every
// legacy URL with its own title/OG meta stamped in, so crawlers that run no
// JS still get the right preview and old links keep working.
const ROOT = {
  title: 'Menschen · Lektion 1',
  ogTitle: 'Menschen. - The Interactive German Coursebook',
  description: 'Flip real pages, hear the original audio, and tap any word for its meaning in Egyptian Arabic. A1.1 + A1.2 · 24 lessons.',
  ogImage: 'assets/og.png',
  url: 'https://menscheny.pages.dev/',
};
function stamp(html, file, m) {
  const swap = (from, to, count) => {
    const parts = html.split(from);
    if (parts.length - 1 !== count) throw new Error(`stamp ${file}: expected ${count} of ${from.slice(0, 60)}, found ${parts.length - 1}`);
    html = parts.join(to);
  };
  swap(`<title>${ROOT.title}</title>`, `<title>${m.title}</title>`, 1);
  swap(`content="${ROOT.ogTitle}"`, `content="${m.ogTitle}"`, 2);
  swap(`content="${ROOT.description}"`, `content="${m.description}"`, 3);
  swap(`content="${ROOT.url}"`, `content="${ROOT.url}${file}"`, 1);
  swap(`href="${ROOT.url}"`, `href="${ROOT.url}${file}"`, 1);
  swap(`${ROOT.url}${ROOT.ogImage}"`, `${ROOT.url}${m.ogImage}"`, 2);
  return html;
}
// Cloudflare Pages free plan caps a site at 20,000 files, and the build
// container was killed while copying all 21,687 audio files (~1.3 GB). On
// Cloudflare builds (CF_PAGES=1) we ship a PRIORITIZED SUBSET of the recorded
// audio that keeps the whole deployment around 19k files, plus a manifest of
// what made the cut (src/generated/cf-audio-manifest.json, written in
// buildStart and imported by src/tts-audio.ts). Pronunciation for a clip that
// is not in the build falls back to /api/tts (a Pages Function speaking
// Microsoft Edge neural voices, edge-cached). Vercel and local builds keep the
// full audio copy and behave exactly as before.
//
// Priority (owner's call: feedback SFX first, then KB before AB, common
// vocabulary first):
//   0  selection-audio   - exercise/unit listening clips (no TTS fallback path)
//   1  KB lesson audio   - a11l*/a12l*/k17-20 clips, A1.1 lessons before A1.2
//   2  KB A1.2 fill-exercise audio (a12fs/a12fw)
//   3  generic vocabulary clips (w*/xw*/s*/xs*)
//   5  Arbeitsbuch clips (ab*, a12ab* in assets/tts)
// Feedback SFX (correct/wrong answer voices) are not part of this copy at all:
// they live in src/assets/feedback and are bundled by Vite itself, so they are
// always in the build. CD album tracks (assets/ab11) stay excluded - they have
// no transcripts for TTS to cover and their buttons are hidden in TTS mode.
const ON_CLOUDFLARE_PAGES = !!process.env.CF_PAGES;
const AUDIO_FILE = /\.(mp3|wav|ogg|m4a|flac)$/i;
const AUDIO_BUDGET = 13000; // ~5.8k non-audio files + 13k audio = ~18.8k < 20k
const HARD_FILE_LIMIT = 19300; // abort the build rather than deploy over the cap
const MANIFEST_FILE = path.join('src', 'generated', 'cf-audio-manifest.json');

function audioPriority(rel) {
  const m = rel.replace(/\\/g, '/').match(/^assets\/([^/]+)\/([^/]+)$/);
  if (!m) {
    // Root-level audio is all CD lesson tracks (kb-cd*, ab-cd*, *-trackNN):
    // no transcripts exist, so /api/tts cannot cover them and the on-page
    // track players would be dead. Ship them right after selection-audio.
    const base = rel.split('/').pop().toLowerCase();
    if (/-(cd\d-)?track\d+/.test(base)) return [0, 1, 0, rel];
    return [8, 0, 0, rel];
  }
  const dir = m[1], base = m[2].toLowerCase();
  if (dir === 'ab11') return null; // CD album tracks: excluded (see above)
  if (dir === 'selection-audio') return [0, 0, 0, rel];
  let mm;
  if ((mm = base.match(/^a11l(\d{4})[sw]/))) return [1, 1, +mm[1].slice(0, 2), rel];
  if ((mm = base.match(/^a11l(\d{1,2})[sw]/))) return [1, 1, +mm[1], rel];
  if ((mm = base.match(/^a12l(\d{4})[swpu]/))) return [1, 2, +mm[1].slice(0, 2), rel];
  if ((mm = base.match(/^a12l(\d{1,2})[swpu]/))) return [1, 2, +mm[1], rel];
  if ((mm = base.match(/^k(\d{2})\d{2}[sw]/))) return [1, 2, +mm[1], rel];
  if ((mm = base.match(/^a12f[sw](\d+)/))) return [2, 2, Math.floor(+mm[1] / 100), rel];
  if (dir === 'tts') return [5, 2, 0, rel]; // a12ab* = Arbeitsbuch A1.2
  if (/^ab/.test(base)) return [5, 1, 0, rel]; // Arbeitsbuch after all KB
  return [3, 0, 0, rel]; // generic vocabulary
}

function listAllAudio() {
  const out = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (AUDIO_FILE.test(entry.name)) out.push(p.replace(/\\/g, '/'));
    }
  })('assets');
  return out;
}

// Audio files a Cloudflare build ships, in priority order, capped to budget.
function cfAudioSelection() {
  const ranked = [];
  for (const rel of listAllAudio()) {
    const key = audioPriority(rel);
    if (key) ranked.push([key, rel]);
  }
  ranked.sort((a, b) => {
    for (let i = 0; i < 4; i++) {
      const x = a[0][i], y = b[0][i];
      if (x !== y) return x < y ? -1 : 1;
    }
    return 0;
  });
  return ranked.slice(0, AUDIO_BUDGET).map(([, rel]) => rel);
}

function countFiles(dir) {
  let n = 0;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, entry.name);
    n += entry.isDirectory() ? countFiles(p) : 1;
  }
  return n;
}

export default defineConfig({define:{__MENSCHEN_TTS__:JSON.stringify(ON_CLOUDFLARE_PAGES)},plugins:[react(),{name:'book-static-assets',
 buildStart(){
  // The manifest mirrors the closeBundle copy exactly: the frontend resolves a
  // pronunciation to its recorded file when the manifest lists it, else /api/tts.
  fs.mkdirSync(path.dirname(MANIFEST_FILE), {recursive:true});
  const selected = ON_CLOUDFLARE_PAGES ? cfAudioSelection() : [];
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(selected));
  if(ON_CLOUDFLARE_PAGES)console.log(`[cf-audio] manifest: ${selected.length} of ${listAllAudio().length} audio files selected (budget ${AUDIO_BUDGET})`);
 },
 closeBundle(){
 const audioSet = ON_CLOUDFLARE_PAGES ? new Set(JSON.parse(fs.readFileSync(MANIFEST_FILE,'utf8'))) : null;
 for(const name of fs.readdirSync('.')){
  if(name==='assets'){
   if(ON_CLOUDFLARE_PAGES)fs.cpSync(name,'dist/assets',{recursive:true,filter:file=>{
    const rel = path.relative('.', file).replace(/\\/g, '/');
    return !AUDIO_FILE.test(file) || audioSet.has(rel);
   }});
   else fs.cpSync(name,'dist/assets',{recursive:true});
  }
  else if(/\.(css|svg|png|jpg|webp|mp3)$/.test(name))fs.copyFileSync(name,path.join('dist',name));
 }
 const spa = fs.readFileSync('dist/index.html','utf8');
 const metas = JSON.parse(fs.readFileSync('src/route-meta.json','utf8'));
 for(const [file, m] of Object.entries(metas)){
  if(file==='index.html')continue;
  fs.writeFileSync(path.join('dist',file), stamp(spa,file,m));
 }
 const total = countFiles('dist');
 console.log(`[cf-audio] dist holds ${total} files (cap 20,000)`);
 if(ON_CLOUDFLARE_PAGES && total > HARD_FILE_LIMIT)throw new Error(`dist has ${total} files, over the safety limit of ${HARD_FILE_LIMIT} (Cloudflare cap 20,000) - lower AUDIO_BUDGET`);
}}],build:{outDir:'dist',emptyOutDir:true,rolldownOptions:{input:{main:'index.html'}}},server:{host:'127.0.0.1'}});
