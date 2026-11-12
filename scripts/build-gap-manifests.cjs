// Build TSV manifests for the pronunciation gap-fill batches.
// Usage: node scripts/build-gap-manifests.cjs <outdir>
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const AD = path.join(ROOT, 'src/adapters');

// Exact replicas of meanings.ts normalizers
const selectionNorm = (s) => s.normalize('NFC').replace(/[’]/g, "'").replace(/^\s*(?:[0-9]+|[a-z](?=\s))\s*[.)]?\s*(?=[A-ZÄÖÜ])/, '').toLocaleLowerCase('de').replace(/([a-zäöüß])(\d)/g, '$1 $2').replace(/(\d)([a-zäöüß])/g, '$1 $2').replace(/[^a-zäöüß0-9]+/g, ' ').trim();
const norm = (s) => s.normalize('NFC').trim().replace(/[’]/g, "'").replace(/\s+/g, ' ').replace(/[.!?…]+$/g, '').toLocaleLowerCase('de');

function loadAdapterFile(file) {
  // window sandbox per file; collect what the file pushes/assigns
  const window = {
    MENSCHEN_PHRASES: {}, MENSCHEN_WORDS: {},
    PRONUNCIATION_INDEX: [], PRONUNCIATION_FILES: {},
  };
  let src = fs.readFileSync(file, 'utf8');
  src = src.replace(/^import\s.*$/gm, ''); // data files don't need their imports
  src = src.replace(/export\s+default\s+function\s+mount\s*\(\s*\)\s*\{/, 'function mount(){');
  const fn = new Function('window', src + '\nmount();');
  try { fn(window); } catch (e) { console.error('WARN eval failed', path.basename(file), e.message); }
  return window;
}

const files = fs.readdirSync(AD).filter(f => /(?:sentences|glossary|pronunciation-index)\.ts$/.test(f));
const phraseKeys = new Set(), wordKeys = new Set();
const records = new Map(); // id -> {id,text,type}
const filesMap = new Map(); // id -> path

for (const f of files) {
  const w = loadAdapterFile(path.join(AD, f));
  for (const k of Object.keys(w.MENSCHEN_PHRASES || {})) if (k.trim()) phraseKeys.add(k);
  for (const k of Object.keys(w.MENSCHEN_WORDS || {})) if (k.trim()) wordKeys.add(k);
  for (const r of (w.PRONUNCIATION_INDEX || [])) if (r && r.id) records.set(r.id, r);
  for (const [id, p] of Object.entries(w.PRONUNCIATION_FILES || {})) filesMap.set(id, p);
}

const fileExists = (id) => {
  const p = filesMap.get(id);
  return p && fs.existsSync(path.join(ROOT, p));
};

// 1) existing records without a usable file (skip ones whose mp3 already exists on disk - wiring only)
const wiringOnly = [...records.values()].filter(r => !fileExists(r.id) && fs.existsSync(path.join(ROOT, 'assets/pronunciation', r.id + '.mp3')));
if (wiringOnly.length) console.error('wiring-only (mp3 already on disk):', wiringOnly.map(r => r.id).join(' '));
const orphanRecords = [...records.values()].filter(r => !fileExists(r.id) && !wiringOnly.includes(r));
// 2) phrase keys (sentence mode) uncovered by a file-bearing sentence record
const sentenceRecordsByNorm = new Map();
for (const r of records.values()) if (r.type === 'sentence' && fileExists(r.id)) sentenceRecordsByNorm.set(norm(r.text), r);
const orphanSentenceNorms = new Set(orphanRecords.filter(r => r.type === 'sentence').map(r => norm(r.text)));
const uncoveredPhrases = new Map(); // norm -> key
for (const k of phraseKeys) {
  const n = norm(k);
  if (!sentenceRecordsByNorm.has(n) && !orphanSentenceNorms.has(n) && !uncoveredPhrases.has(n)) uncoveredPhrases.set(n, k);
}
// 3) word keys uncovered by a file-bearing word record
const wordRecordsByNorm = new Map();
for (const r of records.values()) if (r.type === 'word' && fileExists(r.id)) wordRecordsByNorm.set(norm(r.text), r);
const orphanWordNorms = new Set(orphanRecords.filter(r => r.type === 'word').map(r => norm(r.text)));
const uncoveredWords = new Map();
for (const k of wordKeys) {
  const n = norm(k);
  if (!wordRecordsByNorm.has(n) && !orphanWordNorms.has(n) && !uncoveredWords.has(n)) uncoveredWords.set(n, k);
}

const outdir = process.argv[2] || '/tmp/gapfill';
fs.mkdirSync(outdir, { recursive: true });
const esc = (t) => t.replace(/\t/g, ' ').replace(/\n/g, ' ');

// Batch A: orphan records keep their existing ids
fs.writeFileSync(path.join(outdir, 'batchA-sentences.tsv'),
  orphanRecords.filter(r => r.type === 'sentence').sort((a, b) => a.id.localeCompare(b.id)).map(r => `${r.id}\t${esc(r.text)}`).join('\n') + '\n');
const orphanWords = orphanRecords.filter(r => r.type === 'word').sort((a, b) => a.id.localeCompare(b.id));
if (orphanWords.length) fs.writeFileSync(path.join(outdir, 'batchA-words-orphan.tsv'),
  orphanWords.map(r => `${r.id}\t${esc(r.text)}`).join('\n') + '\n');

// Batch B: uncovered phrase keys get new ids xsNNNN
let i = 0;
const rowsB = [...uncoveredPhrases.values()].sort((a, b) => a.localeCompare(b, 'de')).map(t => `xs${String(++i).padStart(4, '0')}\t${esc(t)}`);
fs.writeFileSync(path.join(outdir, 'batchB-phrases.tsv'), rowsB.join('\n') + '\n');

// Batch C: uncovered word keys get new ids xwNNNN
let j = 0;
const rowsC = [...uncoveredWords.values()].sort((a, b) => a.localeCompare(b, 'de')).map(t => `xw${String(++j).padStart(4, '0')}\t${esc(t)}`);
fs.writeFileSync(path.join(outdir, 'batchC-words.tsv'), rowsC.join('\n') + '\n');

console.log(JSON.stringify({
  phraseKeys: phraseKeys.size, wordKeys: wordKeys.size,
  records: records.size, filesEntries: filesMap.size,
  orphanSentenceRecords: orphanRecords.filter(r => r.type === 'sentence').length,
  orphanWordRecords: orphanWords.length,
  uncoveredPhrases: rowsB.length, uncoveredWords: rowsC.length,
}, null, 1));
