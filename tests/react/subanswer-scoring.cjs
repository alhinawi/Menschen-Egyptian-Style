// One point per correct sub-answer: a check writes a sticky 'done-<exercise>:f-<field>' flag for
// every sub-answer it graded right (partial credit), wrong or blank ones earn nothing, repeats
// and later wrong checks never remove or duplicate, and the leaderboard walker counts the
// sub-flags instead of the exercise's group flag (so a fully correct exercise is not counted twice).
const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((q,r)=>{try{let u=q.url.split('?')[0];if(!path.extname(u)&&!fs.existsSync(path.join(root,'dist',u)))u='/index.html';const f=path.join(root,'dist',u);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.json':'application/json'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
const pointsOf=data=>{let n=0;const walk=v=>{if(typeof v==='string'){try{const i=JSON.parse(v);if(i&&typeof i==='object')walk(i)}catch{}return}if(!v||typeof v!=='object')return;const ent=Object.entries(v),done=ent.filter(([k,x])=>k.startsWith('done-')&&x===true).map(([k])=>k),par=new Set(done.filter(k=>k.includes(':f-')).map(k=>k.slice(0,k.indexOf(':f-'))));n+=done.filter(k=>!par.has(k)).length;for(const[k,x]of ent){if(!(k.startsWith('done-')&&x===true))walk(x)}};walk(JSON.parse(data));return n};
// pure rule
assert.equal(pointsOf(JSON.stringify({a:JSON.stringify({'done-1:t-x':true,'done-1:t-x:f-a':true,'done-1:t-x:f-b':true,'done-2:t-y':true,'done-3:t-z':false})})),3,'two sub-flags + one plain group flag; group flag with subs ignored; false flags ignored');
assert.equal(pointsOf(JSON.stringify({a:JSON.stringify({'done-1:t-x':true})})),1,'group flag alone still counts one');
const collect=p=>p.evaluate(()=>{const b={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/^(native-|menschen-book-)/.test(k))b[k]=localStorage.getItem(k)}return b});
const subs=async p=>{const o=await p.evaluate(()=>JSON.parse(localStorage.getItem('native-done-kb-a11')||'{}'));return Object.keys(o).filter(k=>k.includes(':f-')).map(k=>k.slice(k.indexOf(':f-')+3)).sort()};
const boot=async(b,url,seed)=>{const p=await b.newPage({viewport:{width:390,height:1000}});await p.route('**/menscheny-api*/**',r=>r.fulfill({status:503,body:'{}'}));
 if(seed)await p.addInitScript(s=>{for(const[k,v]of Object.entries(s))localStorage.setItem(k,JSON.stringify(v))},seed);
 await p.goto('http://localhost:5297/'+url);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(800);return p};
const click=async(p,page,ex)=>{await p.locator('.page[data-page="'+page+'"] [data-exercise-id="'+ex+'"] button.compactCheckButton').first().click();await p.waitForTimeout(700)};
(async()=>{await new Promise(r=>server.listen(5297,r));
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
try{
 // Typed fields (page 15 numbers): 3 right of 7 = 3 points, not 0.
 let p=await boot(b,'l2-3.html#15');
 const nums=require(path.join(root,'src/native-kb11/p15.json')).fields.filter(f=>f.group==='task4a');
 const pg=p.locator('.page[data-page="15"]');
 await click(p,'15','task4a');assert.deepEqual(await subs(p),[],'blank check earns nothing');
 nums.forEach(()=>0);
 for(const f of nums.slice(0,3))await pg.locator('[data-native-field="'+f.id+'"]').fill(f.answer.split('|')[0]);
 for(const f of nums.slice(3))await pg.locator('[data-native-field="'+f.id+'"]').fill('zzz');
 await click(p,'15','task4a');
 assert.deepEqual(await subs(p),nums.slice(0,3).map(f=>f.id).sort(),'only the 3 right numbers earn');
 assert.equal(pointsOf(JSON.stringify(await collect(p))),3);
 await click(p,'15','task4a');assert.equal(pointsOf(JSON.stringify(await collect(p))),3,'repeat check: no extra');
 for(const f of nums)await pg.locator('[data-native-field="'+f.id+'"]').fill(f.answer.split('|')[0]);
 await click(p,'15','task4a');
 assert.equal(pointsOf(JSON.stringify(await collect(p))),nums.length,'all right: one point per number, group flag not counted again');
 await pg.locator('[data-native-field="'+nums[0].id+'"]').fill('zzz');await click(p,'15','task4a');
 assert.equal(pointsOf(JSON.stringify(await collect(p))),nums.length,'later wrong check keeps earned points');
 console.log('PASS page 15 partial credit',nums.length);
 await p.close();
 // Custom graders, answers seeded in the page state: p11 task7 (2 lines, only Nicole right).
 p=await boot(b,'index.html#11',{'native-kb11-11':{'task7-0':'0,5','task7-1':'2'}});
 await click(p,'11','task7');assert.deepEqual(await subs(p),['task7-0'],'p11 task7 partial: one line right');
 await p.close();
 // p22 task3: 12 lines, three right.
 p=await boot(b,'l2-3.html#22',{'native-kb11-22':{'task3-0':'0','task3-1':'0','task3-2':'2','task3-3':'0','task3-4':'0'}});
 await click(p,'22','task3');assert.deepEqual(await subs(p),['task3-0','task3-1','task3-2'],'p22 task3: per-line credit (key 0,0,2,2,1,...)');
 await p.close();
 // p10 task3a: Paco right, Nicole wrong.
 p=await boot(b,'index.html#10',{'native-kb11-10':{'task3a-0':'1,2,3','task3a-1':'4'}});
 await click(p,'10','task3a');assert.deepEqual(await subs(p),['task3a-0'],'p10 task3a: Paco line only');
 await p.close();
 console.log('PASS custom graders credit each right line');
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
