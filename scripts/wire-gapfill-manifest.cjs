// Idempotently add "gapfill-pronunciation-index" to the initializers of every
// lesson page that mounts "meanings", right after it.
// Usage: node scripts/wire-gapfill-manifest.cjs
const fs = require('fs');
const path = require('path');
const M = path.join(__dirname, '../src/lessons/manifest.json');
const d = JSON.parse(fs.readFileSync(M, 'utf8'));
let touched = 0;
for (const [k, v] of Object.entries(d)) {
  const init = v.initializers || [];
  if (init.includes('meanings') && !init.includes('gapfill-pronunciation-index')) {
    init.splice(init.indexOf('meanings'), 0, 'gapfill-pronunciation-index');
    touched++;
  }
}
fs.writeFileSync(M, JSON.stringify(d, null, 2) + '\n');
console.log(`pages wired: ${touched}`);
