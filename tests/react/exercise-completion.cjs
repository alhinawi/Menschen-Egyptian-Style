// Native pages: a correct check records one sticky done flag in native-done-<lesson>,
// a wrong check records nothing, repeats and later wrong checks change nothing, page reset
// keeps it, legacy form pages are not double counted, and the leaderboard walker counts it.
const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((q,r)=>{try{let u=q.url.split('?')[0];if(!path.extname(u)&&!fs.existsSync(path.join(root,'dist',u)))u='/index.html';const f=path.join(root,'dist',u);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.json':'application/json'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
const pointsOf=data=>{let n=0;const walk=v=>{if(typeof v==='string'){try{const i=JSON.parse(v);if(i&&typeof i==='object')walk(i)}catch{}return}if(!v||typeof v!=='object')return;for(const[k,x]of Object.entries(v)){if(k.startsWith('done-')&&x===true)n++;else walk(x)}};walk(JSON.parse(data));return n};
const collect=p=>p.evaluate(()=>{const b={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/^(native-|menschen-book-)/.test(k))b[k]=localStorage.getItem(k)}return b});
(async()=>{await new Promise(r=>server.listen(5297,r));
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
try{
 const p=await b.newPage({viewport:{width:390,height:1000},deviceScaleFactor:2});
 await p.route('**/menscheny-api*/**',r=>r.fulfill({status:503,body:'{}'}));
 await p.goto('http://localhost:5297/l2-3.html#18');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 const pg=p.locator('.page[data-page="18"]'),btn=pg.locator('.nkbCheck button.compactCheckButton').first();
 const key='native-done-kb-a11';
 const done=()=>p.evaluate(k=>localStorage.getItem(k),key);
 await btn.click();await p.waitForFunction(()=>document.querySelector('.page[data-page="18"] .nkbCheck button').dataset.checkFeedback==='error');
 assert.equal(await done(),null,'empty check records nothing');
 for(const[id,v]of[['meine','xxx'],['deine','yyy']])await pg.locator('[data-native-field="'+id+'"]').fill(v);
 await btn.click();await p.waitForTimeout(600);
 assert.equal(await done(),null,'wrong check records nothing');
 for(const[id,v]of[['meine','meine'],['deine','deine']])await pg.locator('[data-native-field="'+id+'"]').fill(v);
 await btn.click();await p.waitForFunction(()=>document.querySelector('.page[data-page="18"] .nkbCheck button').dataset.checkFeedback==='success');
 const first=JSON.parse(await done());assert.equal(Object.keys(first).length,1);assert.equal(Object.values(first)[0],true);assert(Object.keys(first)[0].startsWith('done-18:'));
 await btn.click();await p.waitForTimeout(600);assert.deepEqual(JSON.parse(await done()),first,'repeat correct check: no second award');
 await pg.locator('[data-native-field="meine"]').fill('xxx');await btn.click();await p.waitForTimeout(600);
 assert.deepEqual(JSON.parse(await done()),first,'later wrong check keeps the flag');
 // The answers key keeps saving as before, and the flag sits in its own key.
 const blob=await collect(p);assert.equal(pointsOf(JSON.stringify(blob)),1,'leaderboard walker counts exactly one point');
 assert(blob['native-done-kb-a11']);
 // Reset page answers: flag stays, and re-solving does not add a second point.
 await p.evaluate(()=>document.dispatchEvent(new CustomEvent('menschen:reset-current-page',{detail:{page:'18'}})));await p.waitForTimeout(300);
 assert.deepEqual(JSON.parse(await done()),first,'page reset keeps the flag');
 for(const[id,v]of[['meine','meine'],['deine','deine']])await pg.locator('[data-native-field="'+id+'"]').fill(v);
 await btn.click();await p.waitForTimeout(600);assert.equal(pointsOf(JSON.stringify(await collect(p))),1,'re-solving after reset does not re-award');
 console.log('PASS native check -> sticky flag',JSON.stringify(first));
 // Original report: KB11 page 9 (Paco / Nicole radios), then the page 15 numbers exercise ("7 / 7 richtig").
 const r=await b.newPage({viewport:{width:390,height:1000}});
 await r.route('**/menscheny-api*/**',x=>x.fulfill({status:503,body:'{}'}));
 await r.goto('http://localhost:5297/index.html#9');await r.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 const p9=r.locator('.page[data-page="9"]'),c9=p9.locator('.nkbCheck button.compactCheckButton').first();
 const flags=()=>r.evaluate(()=>JSON.parse(localStorage.getItem('native-done-kb-a11')||'{}'));
 await p9.locator('[data-native-field="a1"]').click({force:true});await p9.locator('[data-native-field="b2"]').click({force:true});
 await c9.click();await r.waitForTimeout(600);assert.deepEqual(await flags(),{},'page 9 wrong radios: no flag');
 await p9.locator('[data-native-field="a2"]').click({force:true});await p9.locator('[data-native-field="b1"]').click({force:true});
 await c9.click();await r.waitForFunction(()=>document.querySelector('.page[data-page="9"] .nkbCheck button').dataset.checkFeedback==='success');
 assert.deepEqual(await flags(),{'done-9:t-task2a':true},'page 9 correct radios: one flag');
 await c9.click();await r.waitForTimeout(600);assert.deepEqual(await flags(),{'done-9:t-task2a':true},'page 9 repeat: still one');
 await r.goto('http://localhost:5297/l2-3.html#15');await r.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await r.waitForTimeout(800);
 const p15=r.locator('.page[data-page="15"]'),c15=p15.locator('.nkbNumberCheck button.compactCheckButton').first();
 const nums=require(path.join(root,'src/native-kb11/p15.json')).fields.filter(f=>f.group==='task4a');
 await c15.click();await r.waitForTimeout(600);assert.deepEqual(Object.keys(await flags()),['done-9:t-task2a'],'page 15 empty check: no flag');
 for(const f of nums)await p15.locator('[data-native-field="'+f.id+'"]').fill('x');
 await c15.click();await r.waitForTimeout(600);assert.equal(Object.keys(await flags()).length,1,'page 15 wrong numbers: no flag');
 for(const f of nums)await p15.locator('[data-native-field="'+f.id+'"]').fill(f.answer.split('|')[0]);
 await c15.click();await r.waitForFunction(()=>document.querySelector('.page[data-page="15"] .nkbNumberCheck button').dataset.checkFeedback==='success');
 assert.deepEqual(await flags(),{'done-9:t-task2a':true,'done-15:t-task4a':true},'page 15 all correct: one flag');
 await c15.click();await r.waitForTimeout(600);assert.equal(Object.keys(await flags()).length,2,'page 15 repeat: no extra');
 console.log('PASS page 9 and page 15 each count once');
 // Route aliases: the same page 9 reached as /l1 and /kb-a11-2-3 must not add a second flag.
 for(const alias of ['l1','kb-a11-2-3']){await r.goto('http://localhost:5297/'+alias+'#9');await r.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await r.waitForTimeout(800);
  const a9=r.locator('.page[data-page="9"]');await a9.locator('[data-native-field="a2"]').click({force:true});await a9.locator('[data-native-field="b1"]').click({force:true});
  await a9.locator('.nkbCheck button.compactCheckButton').first().click();await r.waitForTimeout(700);}
 const all=await r.evaluate(()=>Object.fromEntries(Object.keys(localStorage).filter(k=>k.startsWith('native-done-')).map(k=>[k,Object.keys(JSON.parse(localStorage[k]))])));
 assert.deepEqual(Object.keys(all),['native-done-kb-a11'],'aliases share one done entry');
 assert.equal(Object.values(all)[0].filter(x=>x==='done-9:t-task2a').length,1);
 console.log('PASS route aliases collapse to one flag',JSON.stringify(all));

 // Legacy form page: its own done flag only, no native-done key.
 const q=await b.newPage({viewport:{width:390,height:1000}});
 await q.route('**/menscheny-api*/**',r=>r.fulfill({status:503,body:'{}'}));
 await q.goto('http://localhost:5297/ab1.html#6');await q.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 const legacy=await q.evaluate(()=>[...document.querySelectorAll('.page[data-page="6"] button.compactCheckButton')].map(x=>!!x.closest('form')));
 console.log('legacy ab1#6 check buttons inside form:',JSON.stringify(legacy));
 await q.evaluate(()=>document.querySelectorAll('.page[data-page="6"] button.compactCheckButton').forEach(x=>x.click()));await q.waitForTimeout(500);
 assert.equal(await q.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('native-done-')).length),0,'legacy form pages write no native-done key');
 console.log('PASS legacy page not double counted');
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
