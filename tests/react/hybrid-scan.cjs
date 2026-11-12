const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../..');
// Every committed scan record must be internally consistent before it can render.
for(const book of fs.readdirSync(path.join(root,'src/scan-data'))){
 const dir=path.join(root,'src/scan-data',book);if(!fs.statSync(dir).isDirectory())continue;
 for(const file of fs.readdirSync(dir).filter(f=>f.endsWith('.json'))){
  const d=JSON.parse(fs.readFileSync(path.join(dir,file),'utf8'));
  assert.equal(d.book,book);assert(d.width>0&&d.height>0);assert(fs.existsSync(path.join(root,d.image)));
  const png=fs.readFileSync(path.join(root,d.image));assert.equal(png.readUInt32BE(16),d.width,`${book}/${file}: wrong image width`);assert.equal(png.readUInt32BE(20),d.height,`${book}/${file}: wrong image height`);
  assert(d.review.verifiedWords>=0&&d.review.verifiedWords<=d.words.length,`${book}/${file}: invalid reviewed count`);
  for(const item of [...d.words,...d.fields,...d.audio]){
   assert(item.x>=0&&item.y>=0&&item.w>0&&item.h>0,`${book}/${file}: invalid box`);
   assert(item.x+item.w<=d.width&&item.y+item.h<=d.height,`${book}/${file}: box outside scan`);
  }
  assert.equal(new Set(d.fields.map(f=>f.id)).size,d.fields.length);
  for(const f of d.fields){assert(d.groups.some(g=>g.id===f.group),`${file}: unknown group`);if(f.kind==='radio'){assert(f.name&&f.value,`${book}/${file}: radio requires name and value`);assert(['true','false'].includes(f.answer),`${book}/${file}: radio requires boolean answer`);}}
  for(const a of d.audio)assert(fs.existsSync(path.join(root,a.src)),`${file}: missing audio`);
 }
}
const server=http.createServer((req,res)=>{
 const url=req.url.split('?')[0];const f=path.join(root,'dist',url==='/'?'index.html':url);
 try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.mp3':'audio/mpeg'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}
 catch{res.writeHead(404);res.end('not found')}
});
(async()=>{
 await new Promise(r=>server.listen(5192,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 try{for(const width of [320,390,550]){
  const p=await browser.newPage({viewport:{width,height:900},isMobile:true,hasTouch:true});
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  // p41–56 are now native. Keep hybrid coverage on the unconverted next lesson.
  const data=require('../../src/scan-data/kb-a11/p57.json');
  await p.goto('http://127.0.0.1:5192/l10-12.html#57');
  await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  const h=p.locator('.hybridScan[data-scan-page="57"]');await h.waitFor();
  assert.equal(await h.locator('input').count(),data.fields.length);
  const ratio=await h.locator('img').evaluate(i=>{const r=i.getBoundingClientRect();return Math.abs(r.width/r.height-i.naturalWidth/i.naturalHeight)});
  assert(ratio<0.001,'scan aspect ratio changed');
  for(const f of data.fields.filter(f=>f.answer==='true'))await h.locator('[data-field-id="'+f.id+'"]').check({force:true});
  for(const button of await h.locator('.hybridCheck button').all()){await button.evaluate(e=>e.scrollIntoView({block:'center'}));await button.click();}
  for(const text of await h.locator('output').allTextContents())assert.equal(text,'✓ Richtig!');
  await h.locator('[data-field-id=a-flughafen]').check({force:true});
  await h.locator('.hybridCheck button').first().click();
  assert.equal(await h.locator('output').first().textContent(),'Noch einmal');
  await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  assert(await h.locator('[data-field-id=a-flughafen]').isChecked());
  // Isolate the original handler; large screen-space targets have their own phone suite.
  await h.locator('.hybridAudio').first().evaluate(e=>e.click());
  await p.waitForFunction(()=>{const a=document.querySelector('.hybridScan[data-scan-page="57"] .hybridTools audio');return a&&!a.paused&&a.readyState>0});
  assert.equal(await h.locator('.hybridTools audio').getAttribute('src'),data.audio[0].src);
  await h.locator('.tapWord').first().evaluate(e=>e.click());
  assert(await p.locator('.meaningPopup').evaluate(d=>d.open));
  assert.deepEqual(errors,[]);
  console.log(`${width}px: scan ratio, grading, wrong-answer feedback, saved answers, audio, translation passed`);
  await p.close();
 }
 for(const [file,min] of [['l2-3.html',500],['l4-6.html',1000],['ab2.html',400],['kb-a12-l13-16.html',1500]]){
 const p=await browser.newPage();await p.goto('http://127.0.0.1:5192/'+file);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 assert(await p.locator('.tapWord').count()>=min,file+': normal printed text lost translation');
 await p.locator('.tapWord').first().evaluate(e=>e.click());assert(await p.locator('.meaningPopup').evaluate(d=>d.open),file+': meaning dialog did not open');
 console.log(file,await p.locator('.tapWord').count(),'normal-page translation hotspots passed');await p.close();
 }
 const p=await browser.newPage();await p.goto('http://127.0.0.1:5192/index.html#9');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 for(const [n,min] of [[9,80],[10,100],[11,100]]){assert(await p.locator(`[data-scan-page="${n}"] .tapWord, [data-native-page="${n}"] .tapWord`).count()>=min,`p${n}: tap words missing`)}await p.close();
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
