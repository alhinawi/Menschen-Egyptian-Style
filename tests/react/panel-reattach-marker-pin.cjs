// The permanent player must survive #viewport replacement, and the round audio
// markers must stay pinned to the printed art while scrolling.
const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');const root=path.resolve(__dirname,'../..');const server=http.createServer((q,r)=>{try{const f=path.join(root,'dist',q.url.split('?')[0]);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{await new Promise(r=>server.listen(5296,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
 await p.goto('http://localhost:5296/l10-12.html#57');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.waitForSelector('.readerAudioPanel .readerAudioPlayer');
 // 1. A re-render that wipes the foreign panel host (hydration fallback, SPA
 //    lesson switch) must not lose the player: the next update tick re-anchors.
 await p.evaluate(()=>document.querySelector('.readerAudioPanel')?.remove());
 await p.waitForFunction(()=>{const el=document.querySelector('.readerAudioPanel');return el&&el.isConnected&&el.previousElementSibling===document.querySelector('#viewport')&&el.querySelector('.readerAudioPlayer')},{timeout:3000});
 console.log('panel re-anchors after host wipe PASS');
 // 1b. A play request resurrects the wiped panel synchronously, before any tick.
 const revived=await p.evaluate(()=>{document.querySelector('.readerAudioPanel')?.remove();const a=document.querySelector('audio');if(a)void a.play().catch(()=>{});return document.querySelectorAll('.readerAudioPanel').length});
 assert.equal(revived,1,'play did not immediately re-create the panel host');
 await p.waitForSelector('.readerAudioPanel .readerAudioPlayer',{timeout:1000});
 console.log('play request immediately re-creates the panel PASS');
 // 2. Markers stay pinned to their source buttons during scrolling.
 await p.goto('http://localhost:5296/ab4-6.html#31');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.waitForSelector('.largeAudioMarker');
 const measure=()=>[...document.querySelectorAll('.largeAudioMarker')].flatMap(m=>{const page=document.querySelector('.page[data-page="31"]');const src=[...page.querySelectorAll('.mListen,.nabListen,.listen')].find(b=>b.getAttribute('aria-label')===m.getAttribute('aria-label'));if(!src)return[];const r=src.getBoundingClientRect();return [[m.getAttribute('aria-label'),m.getBoundingClientRect().top-(r.top+r.height/2-22)]]});
 const pairs=await p.evaluate(measure);
 const base=Object.fromEntries(pairs);let maxDrift=0;
 for(let y=0;y<=150;y+=6){await p.evaluate(y=>window.scrollTo(0,y),y);const drift=await p.evaluate(measure);for(const[lab,d]of drift){if(base[lab]!==undefined)maxDrift=Math.max(maxDrift,Math.abs(d-base[lab]))}}
 assert(Object.keys(base).length>0,'no marker/source pairs found');
 assert(maxDrift<=2,'marker drift during scroll: '+maxDrift+'px');
 console.log('markers pinned during scroll PASS, max drift',maxDrift,'px');
 await p.screenshot({path:'/tmp/fidelity/panel-reattach-marker-pin.png'});
 await p.close();
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
