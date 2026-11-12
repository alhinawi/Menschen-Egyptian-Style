// Regenerate src/adapters/gapfill-pronunciation-index.ts from the gap manifests.
// Includes only ids whose mp3 is already present in assets/pronunciation/,
// so the adapter can be regenerated after each batch lands.
// Usage: node scripts/build-gapfill-adapter.cjs
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const batches = [
  { tsv: '/tmp/gapfill/batchA-sentences.tsv', type: 'sentence' },
  { tsv: '/tmp/gapfill/batchB-phrases.tsv', type: 'sentence' },
  { tsv: '/tmp/gapfill/batchC-words.tsv', type: 'word' },
];
// wiring-only ids: mp3s already on disk, just need FILES entries
const wiringOnly = ['a11l23s092', 'a11l23s093', 'a11l23s094', 'a11l23s095'];

// ids that already have records in other adapter files (don't re-push them)
const AD = path.join(ROOT, 'src/adapters');
const existingIds = new Set();
for (const f of fs.readdirSync(AD).filter(f => /pronunciation-index\.ts$/.test(f) && f !== 'gapfill-pronunciation-index.ts')) {
  const window = { PRONUNCIATION_INDEX: [], PRONUNCIATION_FILES: {} };
  let src = fs.readFileSync(path.join(AD, f), 'utf8').replace(/^import\s.*$/gm, '')
    .replace(/export\s+default\s+function\s+mount\s*\(\s*\)\s*\{/, 'function mount(){');
  try { new Function('window', src + '\nmount();')(window); } catch (e) {}
  for (const r of window.PRONUNCIATION_INDEX) if (r && r.id) existingIds.add(r.id);
}

const records = [], files = {};
for (const b of batches) {
  if (!fs.existsSync(b.tsv)) continue;
  for (const line of fs.readFileSync(b.tsv, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    const tab = line.indexOf('\t');
    const id = line.slice(0, tab), text = line.slice(tab + 1);
    const mp3 = `assets/pronunciation/${id}.mp3`;
    if (fs.existsSync(path.join(ROOT, mp3))) {
      if (!existingIds.has(id)) records.push({ id, text, type: b.type });
      files[id] = mp3;
    }
  }
}
for (const id of wiringOnly) {
  const mp3 = `assets/pronunciation/${id}.mp3`;
  if (fs.existsSync(path.join(ROOT, mp3))) files[id] = mp3;
}

const src = `export default function mount(){
window.PRONUNCIATION_INDEX.push(...${JSON.stringify(records)});
Object.assign(window.PRONUNCIATION_FILES,${JSON.stringify(files)});
}
`;
fs.writeFileSync(path.join(ROOT, 'src/adapters/gapfill-pronunciation-index.ts'), src);
console.log(`adapter written: ${records.length} records, ${Object.keys(files).length} file entries`);
