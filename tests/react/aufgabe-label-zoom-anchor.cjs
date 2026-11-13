// The permanent player shows the printed exercise id ("Aufgabe 5a") derived
// from page data, never guessed; falls back to "CDx · Track y". Round audio
// markers keep a constant on-screen size and stay pinned to their printed
// play marker at every zoom level. A play() aborted by a new load must not
// surface as an unhandled rejection.
const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');const root=path.resolve(__dirname,'../..');const server=http.createServer((q,r)=>{try{const f=path.join(root,'dist',q.url.split('?')[0]);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
const label=async p=>await p.locator('.readerAudioPanel .readerAudioHeading strong').textContent();
const clickMarker=async(p,aria)=>{
 await p.locator(`.largeAudioMarker[aria-label="${aria}"]`).first().click();
 await p.waitForTimeout(300);
 return (await label(p))?.trim();
};
(async()=>{await new Promise(r=>server.listen(5297,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});try{
 fs.mkdirSync('/tmp/fidelity',{recursive:true});
 const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
 await p.addInitScript(()=>{window.__errs=[];window.addEventListener('unhandledrejection',e=>window.__errs.push(String(e.reason&&e.reason.name||e.reason)))});
 // 1. KB A1.1 p15: exercise ids annotated from the printed page.
 await p.goto('http://localhost:5297/l2-3.html#15');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.waitForSelector('.largeAudioMarker');
 assert.equal(await clickMarker(p,'CD1 · Track16'),'Aufgabe 5a','p15 track16 label');
 console.log('p15 track16 -> Aufgabe 5a PASS');
 assert.equal(await clickMarker(p,'CD1 · Track13'),'Aufgabe 1b','p15 track13 label');
 console.log('p15 track13 -> Aufgabe 1b PASS');
 await p.screenshot({path:'/tmp/fidelity/aufgabe-label-p15.png'});
 // 2. Fallback on an unannotated page keeps the CD/Track label.
 await p.goto('http://localhost:5297/l2-3.html#14');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.waitForSelector('.largeAudioMarker');
 assert.equal(await clickMarker(p,'CD1 · Track12'),'CD1 · Track 12','p14 fallback label');
 console.log('p14 fallback -> CD1 · Track 12 PASS');
 // 3. AB A1.1 p31: number from the printed mNumber + same-row part letter.
 await p.goto('http://localhost:5297/ab4-6.html#31');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.waitForSelector('.largeAudioMarker');
 assert.equal(await clickMarker(p,'Originalaudio 1 14'),'Aufgabe 4a','p31 track14 label');
 console.log('p31 track14 -> Aufgabe 4a PASS');
 assert.equal(await clickMarker(p,'Originalaudio 1 15'),'Aufgabe 4b','p31 track15 label');
 await p.screenshot({path:'/tmp/fidelity/aufgabe-label-p31.png'});
 console.log('p31 track15 -> Aufgabe 4b PASS');
 // 4. KB A1.2 p49: the number below the opener hero belongs to the audio.
 await p.goto('http://localhost:5297/l21-24.html#49');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.waitForSelector('.largeAudioMarker');
 assert.equal(await clickMarker(p,'Originalaudio 3 32 abspielen'),'Aufgabe 1','p49 track32 label');
 await p.screenshot({path:'/tmp/fidelity/aufgabe-label-p49.png'});
 console.log('p49 track32 -> Aufgabe 1 PASS');
 // 5. AbortError from an interrupted play() must not surface unhandled.
 await p.evaluate(()=>{const a=new Audio('assets/kb-cd1-track13.mp3');a.play();a.src='assets/kb-cd1-track14.mp3';a.load()});
 await p.waitForTimeout(600);
 assert.deepEqual(await p.evaluate(()=>window.__errs),[],'unhandled rejections: '+JSON.stringify(await p.evaluate(()=>window.__errs)));
 console.log('interrupted play() stays silent PASS');
 // 6. Markers keep constant size and stay pinned at zoom 44% / 157% / 300%.
 for(const[route,hash]of[['index.html','12'],['l2-3.html','15'],['ab4-6.html','31']]){
  await p.goto(`http://localhost:5297/${route}#${hash}`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  await p.waitForSelector('.largeAudioMarker');
  for(const z of[0.44,1.57,3]){
   await p.evaluate(z=>window.bookZoom(z),z);
   await p.waitForTimeout(500);
   const drift=await p.evaluate(()=>[...document.querySelectorAll('.largeAudioMarker')].flatMap(m=>{
    const page=document.querySelectorAll('.page')[Number(document.querySelector('#pageJump').value)];
    const sources=[...page.querySelectorAll('[data-audio-proxied="true"]')];
    const q=m.getBoundingClientRect();const cx=q.left+q.width/2,cy=q.top;
    // Clustered markers anchor at their first track's source; single markers at theirs.
    if(/Audios auswählen/.test(m.getAttribute('aria-label')||'')){
     const best=Math.min(...sources.map(b=>{const r=b.getBoundingClientRect();return Math.abs(cx-(r.left+r.width/2))}));
     return sources.length?[[best,0,q.width]]:[];
    }
    const src=sources.find(b=>b.getAttribute('aria-label')===m.getAttribute('aria-label'));
    if(!src)return[];const r=src.getBoundingClientRect();
    // Pinned to the source centre, unless that would leave the circle partly
    // offscreen — then it slides to the nearest fully visible position.
    const minX=window.scrollX+2,maxX=window.scrollX+window.innerWidth-46;
    const wantLeft=Math.min(Math.max(r.left+window.scrollX+r.width/2-22,minX),Math.max(minX,maxX));
    return [[Math.abs(q.left+window.scrollX-wantLeft),Math.abs(q.top-(r.top+r.height/2-22)),q.width]];
   }));
   assert(drift.length>0,'no marker/source pairs at zoom '+z);
   for(const[dx,dy,w]of drift){assert(dx<=46,`x drift ${dx}px at zoom ${z} on ${route}#${hash}`);assert(dy<=46,`y drift ${dy}px at zoom ${z}`);assert(Math.abs(w-44)<=1.5,`marker width ${w} at zoom ${z}`)}
   console.log(`${route}#${hash} zoom ${z}: pinned, 44px PASS (${drift.length} markers)`);
  }
  await p.evaluate(()=>window.bookZoom(1));
 }
 await p.screenshot({path:'/tmp/fidelity/aufgabe-zoom-final.png'});
 await p.close();
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
