// Post-fill coverage check: every MENSCHEN_PHRASES key must resolve to a
// file-bearing sentence record, every MENSCHEN_WORDS key to a file-bearing
// word record, and every PRONUNCIATION_FILES path must exist on disk.
// Usage: node scripts/verify-audio-coverage.cjs
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const AD = path.join(ROOT, 'src/adapters');
const norm = (s) => s.normalize('NFC').trim().replace(/[’]/g, "'").replace(/\s+/g, ' ').replace(/[.!?…]+$/g, '').toLocaleLowerCase('de');

const phraseKeys = new Set(), wordKeys = new Set();
const records = new Map(), filesMap = new Map();
for (const f of fs.readdirSync(AD).filter(f => /(?:sentences|glossary|pronunciation-index)\.ts$/.test(f))) {
  const window = { MENSCHEN_PHRASES: {}, MENSCHEN_WORDS: {}, PRONUNCIATION_INDEX: [], PRONUNCIATION_FILES: {} };
  let src = fs.readFileSync(path.join(AD, f), 'utf8').replace(/^import\s.*$/gm, '')
    .replace(/export\s+default\s+function\s+mount\s*\(\s*\)\s*\{/, 'function mount(){');
  try { new Function('window', src + '\nmount();')(window); } catch (e) { console.error('WARN', f, e.message); }
  for (const k of Object.keys(window.MENSCHEN_PHRASES)) if (k.trim()) phraseKeys.add(k);
  for (const k of Object.keys(window.MENSCHEN_WORDS)) if (k.trim()) wordKeys.add(k);
  for (const r of window.PRONUNCIATION_INDEX) if (r && r.id) records.set(r.id, r);
  for (const [id, p] of Object.entries(window.PRONUNCIATION_FILES)) filesMap.set(id, p);
}
const fileExists = (id) => { const p = filesMap.get(id); return p && fs.existsSync(path.join(ROOT, p)); };
const sN = new Set(), wN = new Set();
for (const r of records.values()) if (fileExists(r.id)) (r.type === 'sentence' ? sN : r.type === 'word' ? wN : null)?.add(norm(r.text));

const missP = [...phraseKeys].filter(k => !sN.has(norm(k)));
const missW = [...wordKeys].filter(k => !wN.has(norm(k)));
const missingFiles = [...filesMap.entries()].filter(([id, p]) => !fs.existsSync(path.join(ROOT, p)));
const dupes = [...records.keys()].length;
console.log(JSON.stringify({
  phrases: { total: phraseKeys.size, missing: missP.length, sample: missP.slice(0, 5) },
  words: { total: wordKeys.size, missing: missW.length, sample: missW.slice(0, 5) },
  records: dupes, filesEntries: filesMap.size, filesMissingOnDisk: missingFiles.length,
  missingSample: missingFiles.slice(0, 5),
}, null, 1));
process.exit(missP.length || missW.length || missingFiles.length ? 1 : 0);
