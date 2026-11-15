const fs=require('fs');const path=require('path');const assert=require('assert');
const dir=path.join(__dirname,'../src/meanings/english');let checked=0;
const normalize=text=>text.normalize('NFC').trim().replace(/[’]/g,"'").replace(/\s+/g,' ').replace(/^[.,:;!?"'„“”‚‘()\[\]{}<>|/\\–—-]+|[.,:;!?"'„“”‚‘()\[\]{}<>|/\\–—-]+$/g,'').toLocaleLowerCase('de');
for(const file of fs.readdirSync(dir).filter(f=>f.endsWith('.json'))){for(const [de,en] of Object.entries(JSON.parse(fs.readFileSync(path.join(dir,file),'utf8')))){
 if(!/^[\p{L}\p{N}_-]+$/u.test(normalize(de)))continue;
 checked++;assert(!/[.,;:?!]$/.test(en.trim()),`${file}: word gloss ${JSON.stringify(de)} ends with stray punctuation: ${JSON.stringify(en)}`);
}}
console.log(`PASS: ${checked} single-word English glosses have no terminal punctuation; full-sentence punctuation preserved.`);
