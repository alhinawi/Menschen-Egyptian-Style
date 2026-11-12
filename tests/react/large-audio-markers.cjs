const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
const root=path.resolve(__dirname,'../..');
const cases=[['l4-6',27],['l7-9',41],['l7-9',43],['l7-9',46],['index',9],['l2-3',17],['kb-a12-l13-16',9],['kb-a12-l13-16',11],['ab1',8],['ab3',21],['ab2',15],['ab-a12-l13-16',33]];
const server=http.createServer((q,r)=>{try{const f=path.join(root,'dist',q.url.split('?')[0]);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{await new Promise(r=>server.listen(5192,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});try{
for(const width of[320,390])for(const[file,pg]of cases){
 const p=await b.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{window.audioPlays=[];HTMLMediaElement.prototype.play=function(){window.audioPlays.push(this.src);return Promise.resolve()}});
 await p.goto(`http://localhost:5192/${file}.html#${pg}`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(650);
 const buttons=p.locator('[data-large-audio]');assert(await buttons.count()>0,`${file} p${pg}: no buttons`);
 let played=0;
 for(let i=0;i<await buttons.count();i++){
  const button=buttons.nth(i),box=await button.boundingBox();assert.equal(box.width,44);assert.equal(box.height,44);assert(box.x>=0&&box.x+44<=width);
  await button.click();
  const chooser=p.locator('.audioTrackChooser[open]');
  if(await chooser.count()){
   const count=await chooser.locator('.audioTrackChoice').count();assert(count>1);
   for(let j=0;j<count;j++){
    if(j)await button.click();
    await chooser.locator('.audioTrackChoice').nth(j).click();played++;
   }
  }else played++;
 }
 await p.waitForTimeout(100);const sources=await p.evaluate(()=>window.audioPlays);assert.equal(sources.length,played);assert(sources.every(s=>s.endsWith('.mp3')));assert.deepEqual(errors,[]);
 await p.screenshot({path:`/tmp/fidelity/audio-${file}-${pg}-${width}.png`});
 if(file==='l4-6'){await buttons.last().click();await p.screenshot({path:`/tmp/fidelity/audio-chooser-${width}.png`});await p.locator('.audioTrackChooserHead button').click();
  await p.locator('#next').count().then(async n=>{if(n){await p.locator('#next').click();await p.waitForTimeout(700);assert.equal(await p.locator('.audioTrackChooser[open]').count(),0)}});
 }
 console.log(width,file,pg,played,'track handlers / 44px targets PASS');await p.close();
}
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
