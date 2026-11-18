// Run after CF_PAGES=1 npm run build. Every indexed word must ship a static clip.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const words = JSON.parse(fs.readFileSync('src/word-audio-paths.json', 'utf8'));
const shipped = new Set(JSON.parse(fs.readFileSync('src/generated/cf-audio-manifest.json', 'utf8')));
assert.equal(words.length, new Set(words).size, 'word paths must be deduplicated');
assert.ok(words.length > 7000, 'word inventory must not silently shrink');
for (const file of words) {
  assert.ok(shipped.has(file), `word excluded from deployment: ${file}`);
  assert.ok(fs.statSync(`dist/${file}`).size > 100, `empty word audio: ${file}`);
}
console.log(`PASS: ${words.length} unique word clips ship as non-empty static files`);
