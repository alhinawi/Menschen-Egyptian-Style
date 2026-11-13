const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');const root=path.resolve(__dirname,'../..');
// Mimics Cloudflare Pages: Range headers are ignored, full body with 200, no Accept-Ranges.
const server=http.createServer((q,r)=>{try{const f=path.join(root,'dist',q.url.split('?')[0]);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{await new Promise(r=>server.listen(5296,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});try{for(const width of[390,1280]){
 const p=await b.newPage({viewport:{width,height:844},deviceScaleFactor:2});
 await p.goto('http://localhost:5296/l2-3.html#13');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(400);
 await p.locator('[data-large-audio],.nkbListen,.hybridAudio,.nativeAudioMarker,.nkAudio,.npListen,.nabListen,.mListen,.listen').first().evaluate(el=>el.click());
 await p.waitForFunction(()=>{const a=document.querySelector('.page[data-page="13"] audio');return a&&a.duration>2&&!a.paused});
 const dur=await p.locator('.page[data-page="13"] audio').evaluate(a=>a.duration);
 const target=Math.floor(dur/2);
 // Drag the floating player's progress bar to the middle, like the user did.
 const slider=p.locator('.readerAudioPanel input[type=range]');
 await slider.evaluate((el,v)=>{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,String(v));el.dispatchEvent(new Event('input',{bubbles:true}))},target);
 await p.waitForTimeout(1800);
 const t=await p.locator('.page[data-page="13"] audio').evaluate(a=>a.currentTime);
 console.log(width,'duration',dur.toFixed(1),'sought',target,'currentTime after 1.8s',t.toFixed(1));
 assert(t>target-1,'seek restarted from the beginning (no-range host not handled)');
 await p.screenshot({path:'/tmp/fidelity/audio-seek-norange-'+width+'.png'});
 await p.close()}}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
