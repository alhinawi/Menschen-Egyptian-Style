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
  assert.equal(d.review.verifiedWords,d.words.length);
  for(const item of [...d.words,...d.fields,...d.audio]){
   assert(item.x>=0&&item.y>=0&&item.w>0&&item.h>0,`${book}/${file}: invalid box`);
   assert(item.x+item.w<=d.width&&item.y+item.h<=d.height,`${book}/${file}: box outside scan`);
  }
  assert.equal(new Set(d.fields.map(f=>f.id)).size,d.fields.length);
  for(const f of d.fields)assert(d.groups.some(g=>g.id===f.group),`${file}: unknown group`);
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
  await p.goto('http://127.0.0.1:5192/l7-9.html#46');
  await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  const h=p.locator('.hybridScan');await h.waitFor();
  assert.equal(await h.locator('input').count(),7);
  const ratio=await h.locator('img').evaluate(i=>{const r=i.getBoundingClientRect();return Math.abs(r.width/r.height-i.naturalWidth/i.naturalHeight)});
  assert(ratio<0.001,'scan aspect ratio changed');
  const radio=h.locator('[data-field-id=a2]');await radio.check({force:true});
  await h.locator('[data-field-id=b2]').check({force:true});
  for(const [id,value]of [['time3','nach'],['time4','vor'],['time5','nach']])await h.locator(`[data-field-id=${id}]`).fill(value);
  for(const button of await h.locator('.hybridCheck button').all())await button.click({force:true});
  assert.deepEqual(await h.locator('output').allTextContents(),['✓ Richtig!','✓ Richtig!']);
  await h.locator('[data-field-id=time3]').fill('vor');
  await h.locator('.hybridCheck button').nth(1).click({force:true});
  assert.equal(await h.locator('output').nth(1).textContent(),'Noch einmal');
  await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  assert.equal(await p.locator('[data-field-id=time3]').inputValue(),'vor');assert(await p.locator('[data-field-id=a2]').isChecked());
  await p.locator('.hybridAudio').click({force:true});
  await p.waitForFunction(()=>{const a=document.querySelector('.hybridTools audio');return a&&!a.paused&&a.readyState>0});
  assert.equal(await p.locator('.hybridTools audio').getAttribute('src'),'assets/kb-cd2-track06.mp3');
  await p.locator('.hybridWord[data-word=Theater]').click({force:true});
  await p.waitForFunction(()=>document.body.innerText.includes('مسرح'));
  assert.deepEqual(errors,[]);
  console.log(`${width}px: scan ratio, grading, wrong-answer feedback, saved answers, audio, translation passed`);
  await p.close();
 }}finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
