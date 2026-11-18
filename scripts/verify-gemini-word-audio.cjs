// Confirm each route-specific alias uses the same reviewed word recording.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const rows = JSON.parse(fs.readFileSync('docs/gemini-word-audio-batch-001.json', 'utf8'));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const voices = new Map();
let aliases = 0;
assert.equal(rows.length, 30);
for (const row of rows) {
  assert.ok(['Erinome', 'Iapetus'].includes(row.voice));
  voices.set(row.voice, (voices.get(row.voice) || 0) + 1);
  const expected = hash(row.files[0]);
  for (const file of row.files) {
    assert.equal(hash(file), expected, `different recording for alias ${file}`);
    assert.ok(fs.statSync(file).size > 1000, `empty recording ${file}`);
    aliases++;
  }
}
assert.equal(voices.get('Erinome'), 15);
assert.equal(voices.get('Iapetus'), 15);
console.log(`PASS: 30 reviewed words, ${aliases} static paths, 15 clips per voice`);
