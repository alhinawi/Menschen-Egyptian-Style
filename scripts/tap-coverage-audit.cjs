// Tap-coverage audit: for every reader page of every module, how many
// tappable words/sentences resolve to a translation and to recorded audio
// (vs browser-TTS fallback), using the exact runtime lookup logic.
const { chromium } = require('playwright');
const http = require('http'); const fs = require('fs'); const path = require('path');
const root = path.resolve('dist');
const manifest = JSON.parse(fs.readFileSync('src/lessons/manifest.json', 'utf8'));

const server = http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]); if(p==='/')p='/index.html';
  const f = path.join(root,p);
  if(fs.existsSync(f)&&fs.statSync(f).isFile()){
    const ext=path.extname(f); const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.mp3':'audio/mpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.jpg':'image/jpeg','.woff2':'font/woff2'}[ext]||'application/octet-stream';
    res.writeHead(200,{'Content-Type':mime}); fs.createReadStream(f).pipe(res);
  } else { res.writeHead(404); res.end('nf'); }
});

const norm = (s) => (s||'').normalize('NFC').trim().replace(/[’]/g,"'").replace(/\s+/g,' ').replace(/[.!?…]+$/g,'').toLocaleLowerCase('de');

(async()=>{
  await new Promise(r=>server.listen(5199,r));
  const browser = await chromium.launch();
  const files = Object.entries(manifest).filter(([f,c])=>c.reader).map(([f,c])=>({file:f, slug:c.slug, inits:c.initializers}));
  const all = [];
  for(const {file, slug, inits} of files){
    const page = await browser.newPage({viewport:{width:390,height:844}});
    let data;
    try{
      await page.goto('http://localhost:5199/'+file, {waitUntil:'load'});
      await page.waitForSelector('[data-book-ready]', {timeout:20000});
      await page.waitForTimeout(600);
      data = await page.evaluate(()=>{
        const pages=[...document.querySelectorAll('.page[data-page]')].map(pg=>{
          const scan=!!pg.querySelector('.hybridScan');
          const taps=[...pg.querySelectorAll('.tapWord')].map(el=>({w:el.dataset.word||'',p:el.dataset.phrase||el.dataset.word||''}));
          // untappable German tokens on non-scan pages (rough): text not inside tappable spans / controls
          let untapped=0;
          if(!scan){
            const skip=el=>el.closest('.tapWord,.tapSentence,.translation,button,select,input,.number,script,style');
            const walker=document.createTreeWalker(pg,NodeFilter.SHOW_TEXT);
            let n; while(n=walker.nextNode()){
              if(skip(n.parentElement))continue;
              const t=n.textContent||'';
              const m=t.match(/[A-Za-zÄÖÜäöüß]{2,}/g);
              if(m)untapped+=m.length;
            }
          }
          const review=pg.querySelector('.hybridScan')?.dataset.reviewStatus||null;
          return {page:pg.dataset.page, scan, review, taps, untapped};
        });
        return {
          pages,
          words: window.MENSCHEN_WORDS||{},
          phrases: window.MENSCHEN_PHRASES||{},
          records: window.PRONUNCIATION_INDEX||[],
          files: window.PRONUNCIATION_FILES||{},
          tts: typeof window.speechSynthesis!=='undefined'
        };
      });
    }catch(e){ data={error:String(e).slice(0,200)}; }
    await page.close();
    if(data.error){ all.push({file, slug, error:data.error}); console.log(file,'ERROR',data.error); continue; }

    // resolve lookups exactly like meanings.ts
    const words=data.words, phrases=new Map(Object.entries(data.phrases).map(([k,v])=>[norm(k),v]));
    const records=data.records, filesMap=data.files;
    const audioFor=(mode,text)=>{const r=records.find(r=>r.type===mode&&norm(r.text)===norm(text));return r?filesMap[r.id]:undefined};
    let totals={tapWords:0, wTransOK:0, wAudioRec:0, wAudioMissingFile:0, wTtsOnly:0, phrases:0, pTransOK:0, pAudioRec:0, untapped:0, emptyPages:0, partialPages:0};
    const missingWords=new Map(), missingPhrases=new Map();
    for(const pg of data.pages){
      if(pg.review==='partial')totals.partialPages++;
      if(!pg.taps.length){totals.emptyPages++; }
      totals.untapped+=pg.untapped;
      const seenP=new Set();
      for(const t of pg.taps){
        totals.tapWords++;
        const wt=words[norm(t.w)];
        if(wt)totals.wTransOK++; else missingWords.set(norm(t.w),(missingWords.get(norm(t.w))||0)+1);
        const wa=audioFor('word',t.w);
        if(wa){ if(fs.existsSync(path.join(root,wa))) totals.wAudioRec++; else totals.wAudioMissingFile++; } else totals.wTtsOnly++;
        const pn=norm(t.p);
        if(t.p && !seenP.has(pn)){ seenP.add(pn); totals.phrases++;
          if(phrases.get(pn))totals.pTransOK++; else missingPhrases.set(t.p.slice(0,60),(missingPhrases.get(t.p.slice(0,60))||0)+1);
          const pa=audioFor('sentence',t.p); if(pa&&fs.existsSync(path.join(root,pa)))totals.pAudioRec++;
        }
      }
    }
    all.push({file, slug, inits:inits.join(','), pageCount:data.pages.length, dictWords:Object.keys(words).length, dictPhrases:Object.keys(phrases).size??0, recs:records.length, pronunciationFiles:Object.keys(filesMap).length, tts:data.tts, totals,
      missingWords:[...missingWords.entries()],
      missingPhrases:[...missingPhrases.entries()], emptyPageIds:data.pages.filter(p=>!p.taps.length).map(p=>p.page)});
    console.log(file, 'pages:',data.pages.length, 'tapWords:',totals.tapWords, 'noTrans:',totals.tapWords-totals.wTransOK, 'ttsOnly:',totals.wTtsOnly, 'untappedTokens:',totals.untapped, 'emptyPages:',totals.emptyPages);
  }
  fs.writeFileSync('/tmp/tap-coverage.json', JSON.stringify(all,null,1));
  await browser.close(); server.close();
})();
