// HybridScan pages: a group check earns one sub-flag per typed field graded right (partial credit),
// wrong fields earn nothing, and a repeat check adds nothing.
const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((q,r)=>{try{let u=q.url.split('?')[0];if(!path.extname(u)&&!fs.existsSync(path.join(root,'dist',u)))u='/index.html';const f=path.join(root,'dist',u);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.json':'application/json'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{await new Promise(r=>server.listen(5298,r));
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
try{
 const p=await b.newPage({viewport:{width:390,height:1000}});await p.route('**/menscheny-api*/**',r=>r.fulfill({status:503,body:'{}'}));await p.route('**/api/**',r=>r.fulfill({status:503,body:'{}'}));
 await p.goto('http://localhost:5298/ab4-6.html');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(1500);
 const pages=await p.locator('.hybridScan').evaluateAll(els=>els.map(e=>({book:e.dataset.scanBook,page:e.dataset.scanPage})));
 assert.ok(pages.length>0,'hybrid pages render on ab4-6');
 let done=false;
 for(const meta of pages){
  const file=path.join(root,'src/scan-data',meta.book,'p'+meta.page+'.json');if(!fs.existsSync(file))continue;
  const d=JSON.parse(fs.readFileSync(file));
  const graded=g=>d.fields.filter(f=>f.group===g.id&&f.answer!==undefined&&(f.kind||'text')==='text'&&!f.answer.includes('|')&&f.answer.trim());
  const all=g=>d.fields.filter(f=>f.group===g.id&&f.answer!==undefined);
  const groups=d.groups.filter(g=>all(g).length>0||(d.matchings||[]).some(m=>m.group===g.id&&m.answers));
  const gi=groups.findIndex(g=>graded(g).length>=3&&graded(g).length===all(g).length);if(gi<0)continue;
  const fields=graded(groups[gi]);
  const scan=p.locator('.hybridScan[data-scan-book="'+meta.book+'"][data-scan-page="'+meta.page+'"]');
  await p.goto('http://localhost:5298/ab4-6.html#'+meta.page);await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(1200);
  const flags=async()=>p.evaluate(k=>{const o=JSON.parse(localStorage.getItem('native-done-ab4-6')||'{}');return Object.keys(o).filter(x=>x.includes(':f-')&&o[x]===true).map(x=>x.slice(x.indexOf(':f-')+3)).sort()});
  const btn=scan.locator('.hybridCheck button').nth(gi);
  await btn.click();await p.waitForTimeout(600);assert.deepEqual(await flags(),[],'blank hybrid check earns nothing');
  for(const f of fields.slice(0,2))await scan.locator('[data-field-id="'+f.id+'"]').fill(f.answer);
  for(const f of fields.slice(2))await scan.locator('[data-field-id="'+f.id+'"]').fill('zzzz');
  await btn.click();await p.waitForTimeout(600);
  assert.deepEqual(await flags(),fields.slice(0,2).map(f=>f.id).sort(),'only the two right fields earn');
  await btn.click();await p.waitForTimeout(600);
  assert.equal((await flags()).length,2,'repeat check adds nothing');
  for(const f of fields)await scan.locator('[data-field-id="'+f.id+'"]').fill(f.answer);
  await btn.click();await p.waitForTimeout(600);
  assert.equal((await flags()).length,fields.length,'all right: one flag per field');
  console.log('PASS hybrid partial credit',meta.book,meta.page,groups[gi].id,fields.length);done=true;break;
 }
 assert.ok(done,'found a hybrid text group to test');
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);process.exit(1)});
