const{chromium}=require('playwright'),fs=require('fs'),http=require('http'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),manifest=require('../src/lessons/manifest.json');
const server=http.createServer((req,res)=>{let f=path.join(root,'dist',req.url.split('?')[0]);if(!path.extname(f))f+='.html';try{res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png','.webp':'image/webp'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end()}});
(async()=>{await new Promise(r=>server.listen(5194,'127.0.0.1',r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});try{
for(const [file,cfg] of Object.entries(manifest).filter(([,c])=>!c.reader)){
 const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:5194/index.html');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.goto('http://127.0.0.1:5194/'+file+(file==='original-viewer.html'?'?page=41':''));await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForFunction(()=>{const i=document.querySelector('#paper');return i?.complete&&i.naturalWidth>0});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(350);await p.locator('#paper').evaluate(e=>e.decode());
 const out='/downloads/viewer-'+(process.env.BEFORE?'before':'after')+'-'+cfg.slug+'.png';await p.screenshot({path:out});
 if(!process.env.BEFORE){
  assert(await p.evaluate(()=>!!document.querySelector('.originalViewer')),'viewer frame missing');
  const rect=await p.locator('header').boundingBox();assert(rect.height>=60&&rect.height<110);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=390));
  const old=await p.locator('#page').textContent();await p.locator('#next').click();assert.notEqual(await p.locator('#page').textContent(),old);await p.locator('#prev').click();assert.equal(await p.locator('#page').textContent(),old);
  await p.locator('#plus').click();assert.equal(await p.locator('#zoom').textContent(),'125%');await p.locator('#minus').click();assert.equal(await p.locator('#zoom').textContent(),'100%');await p.locator('#actual').click();assert.notEqual(await p.locator('#zoom').textContent(),'100%');await p.locator('#fit').click();assert.equal(await p.locator('#zoom').textContent(),'100%');
  await p.locator('[aria-label="Schließen"]').click();await p.waitForURL('**/index.html');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');assert.equal(await p.locator('.originalViewer').count(),0,'viewer styles leak after close');
 }
 assert.deepEqual(errors,[]);console.log(cfg.slug,process.env.BEFORE?'BEFORE captured':'390px image/zoom/fit/prev/next/close PASS');await p.close();
}
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
