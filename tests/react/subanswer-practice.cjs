// Practice rows award the canonical native flags (same key and flag a native check writes), once.
const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((q,r)=>{try{let u=q.url.split('?')[0];if(!path.extname(u)&&!fs.existsSync(path.join(root,'dist',u)))u='/index.html';const f=path.join(root,'dist',u);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
const data=require('../../src/scan/practice-map.json');
(async()=>{await new Promise(r=>server.listen(5294,r));
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
try{
 const p=await b.newPage({viewport:{width:390,height:1000}});await p.route('**/api/**',r=>r.fulfill({status:503,body:'{}'}));
 await p.goto('http://localhost:5294/ab-a12-l17-20.html#36');await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(1500);
 assert.ok(data.ab12p36e1,'p36 ex 1 mapped');
 const flags=()=>p.evaluate(()=>Object.keys(JSON.parse(localStorage.getItem('native-done-ab-a12-l17-20')||'{}')).sort());
 // Practice: fill 2 rows right, the rest wrong
 await p.evaluate(()=>document.getElementById('practiceButton').click());await p.waitForTimeout(800);const res=await p.evaluate(()=>{const f=document.querySelector('form[data-id="ab12p36e1"]');const els=[...f.querySelectorAll('[data-field]')];els.forEach((e,i)=>{const set=(v)=>{const proto=e instanceof HTMLSelectElement?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(e,v);e.dispatchEvent(new Event('input',{bubbles:true}))};set(i<2?e.dataset.answer.split('|')[0]:'zzzz')});f.requestSubmit();return els.length});
 await p.waitForTimeout(800);
 const got=await flags();
 const expect=data.ab12p36e1.f.slice(0,2).map(id=>'done-36:n'+data.ab12p36e1.n+':f-'+id).sort();
 assert.deepEqual(got,expect,'only the two right Practice rows earn canonical flags');
 // Native check on the same exercise with the same two answers adds nothing new (same flags)
 console.log('PASS practice canonical flags',res,got);
 // A Practice row that fills two native blanks: 'Bring' alone earns one blank, not both; a later native
 // completion of the other blank adds exactly one more flag and never duplicates the first.
 await p.goto('http://localhost:5294/ab-a12-l17-20.html#60');await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(1500);
 await p.evaluate(()=>document.getElementById('practiceButton').click());await p.waitForTimeout(800);
 const fill=(vals)=>p.evaluate(v=>{const f=document.querySelector('form[data-id="ab12p60e2"]');const els=[...f.querySelectorAll('[data-field]')];els.forEach((e,i)=>{const proto=e instanceof HTMLSelectElement?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(e,v[i]||'');e.dispatchEvent(new Event('input',{bubbles:true}))});f.requestSubmit()},vals);
 await fill(['Bring']);await p.waitForTimeout(800);
 assert.deepEqual((await flags()).filter(k=>k.startsWith('done-60:')),['done-60:n1:f-p60-2t1'],'one correct blank of the row earns one flag');
 await fill(['Bring raus']);await p.waitForTimeout(800);
 assert.deepEqual((await flags()).filter(k=>k.startsWith('done-60:')),['done-60:n1:f-p60-2t1','done-60:n1:f-p60-2t2'],'full row earns both, the first is not duplicated');
 await fill(['Bring raus']);await p.waitForTimeout(800);
 assert.equal((await flags()).filter(k=>k.startsWith('done-60:')).length,2,'repeat adds nothing');
 // Independent rows (no native counterpart) earn their own flag, and blank rows nothing.
 await p.goto('http://localhost:5294/ab-a12-l17-20.html#37');await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(1500);
 await p.evaluate(()=>document.getElementById('practiceButton').click());await p.waitForTimeout(800);
 await p.evaluate(()=>{const f=document.querySelector('form[data-id="ab12p37e7"]');const els=[...f.querySelectorAll('[data-field]')];els.forEach((e,i)=>{const set=v=>{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,v);e.dispatchEvent(new Event('input',{bubbles:true}))};set(i===0?e.dataset.answer.split('|')[0]:'')});f.requestSubmit()});
 await p.waitForTimeout(800);
 assert.deepEqual((await flags()).filter(k=>k.startsWith('done-37:')),['done-37:t-pr-ab12p37e7:f-r0'],'independent row earns its own flag');
 console.log('PASS partial multi-blank row, no duplicate; independent row');
 // Cross-interface: rows that restate native content earn the native flags, not extra ones.
 for(const [pg,id,key] of [[57,'ab12p57eA2','done-57:'],[55,'ab12p55e6a','done-55:'],[61,'ab12p61e6','done-61:']]){
  await p.goto('http://localhost:5294/ab-a12-l17-20.html#'+pg);await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(1500);
  await p.evaluate(()=>document.getElementById('practiceButton').click());await p.waitForTimeout(800);
  await p.evaluate(i=>{const f=document.querySelector('form[data-id="'+i+'"]');[...f.querySelectorAll('[data-field]')].forEach(e=>{const proto=e instanceof HTMLSelectElement?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(e,e.dataset.answer.split('|')[0]);e.dispatchEvent(new Event('input',{bubbles:true}))});f.requestSubmit()},id);
  await p.waitForTimeout(800);
  const fl=(await flags()).filter(k=>k.startsWith(key));
  const m=data[id];const want=new Set(m.f.flat().map(x=>typeof x==='string'?x:'').filter(x=>x&&x!=='-').map(x=>x.split('/').pop().split('=')[0]));
  assert.ok(fl.length>0&&fl.every(k=>!k.includes('t-pr-')&&want.has(k.split(':f-')[1])),id+' only canonical native flags '+JSON.stringify(fl));
  console.log('PASS cross-interface',id,fl.length);
 }

}finally{await b.close();server.close()}})().catch(e=>{console.error(e);process.exit(1)});
