const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const {serve}=require('./helpers/static-server.cjs');
const out=process.env.SHOTS||'/tmp/source-key-shots';fs.mkdirSync(out,{recursive:true});
const cases=[['ab-a12-l13-16',20,'ab-a12'],['ab-a12-l13-16',21,'ab-a12'],['ab-a12-l13-16',22,'ab-a12'],['ab4-6',31,'ab-a11'],['ab4-6',32,'ab-a11'],['ab4-6',33,'ab-a11'],['ab4-6',37,'ab-a11']];
const esc=s=>JSON.stringify(s);
(async()=>{const server=await serve(5299),b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});try{
for(const width of [390,900]){
 for(const [route,no,book] of cases){const p=await b.newPage({viewport:{width,height:1500}});let errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(`http://127.0.0.1:5299/${route}.html#${no}`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');const pg=p.locator(`.page[data-page="${no}"]`);const fields=JSON.parse(fs.readFileSync(`src/scan-data/${book}/p${no}.json`)).fields.filter(f=>f.kind==='radio');const groups=new Map();
 for(const f of fields){let sel=`input[data-native-radio=${esc(f.id)}]`;if(!await pg.locator(sel).count())sel=`input[data-native-field=${esc((no===21?'p21-':no===22?'p22-':'')+f.name)}][data-value=${esc(f.value)}]`;if(await pg.locator(sel).count()){const g=groups.get(f.name)||[];g.push({f,sel});groups.set(f.name,g)}}
 assert(groups.size>0,`${route} ${no} target groups`);
 const clickChecks=async()=>{for(const btn of await pg.locator('.compactCheckButton').all())await btn.evaluate(e=>e.click());await p.waitForTimeout(90)};
 for(const g of groups.values()){const it=g.find(x=>x.f.answer==='false');if(it)await pg.locator(it.sel).evaluate(e=>e.click())}await clickChecks();
 for(const g of groups.values()){const it=g.find(x=>x.f.answer==='false');if(it)assert.equal(await pg.locator(it.sel).getAttribute('data-check-mark'),'bad',`${no} wrong ${it.f.id}`)}
 if(no===20)await p.waitForTimeout(2100);if(no===20)await pg.screenshot({path:`${out}/ab12-p20-wrong-${width}.png`});
 for(const g of groups.values()){const it=g.find(x=>x.f.answer==='true');assert(it);await pg.locator(it.sel).evaluate(e=>e.click())}await clickChecks();
 for(const g of groups.values()){const it=g.find(x=>x.f.answer==='true');assert.equal(await pg.locator(it.sel).getAttribute('data-check-mark'),'ok',`${no} correct ${it.f.id}`);for(const other of g.filter(x=>x!==it))assert.equal(await pg.locator(other.sel).getAttribute('data-check-mark'),null,`${no} alternative must neutral`)}
 if(no===20)await p.waitForTimeout(2100);if(no===20)await pg.screenshot({path:`${out}/ab12-p20-correct-${width}.png`});
 await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');for(const g of groups.values()){const it=g.find(x=>x.f.answer==='true');assert(await pg.locator(it.sel).isChecked())}assert.deepEqual(errors,[]);console.log('PASS',width,book,no,groups.size,'radio groups wrong/correct/neutral/reload');await p.close();
 }
 // Range pages keep per-option storage. A retry must clear the previous option in React state too.
 for(const no of [54]){const p=await b.newPage({viewport:{width,height:1500}});await p.goto(`http://127.0.0.1:5299/ab-a12-l17-20.html#${no}`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');const pg=p.locator(`.page[data-page="${no}"]`);const spec=JSON.parse(fs.readFileSync(`src/native-ab12/range/p${no}.json`));const ds=spec.items.filter(i=>i.k==='d'&&!i.cb);const groups=new Map();for(const it of ds){const a=groups.get(it.name||it.id)||[];a.push(it);groups.set(it.name||it.id,a)}
 const clickChecks=async()=>{for(const btn of await pg.locator('.compactCheckButton').all())await btn.evaluate(e=>e.click());await p.waitForTimeout(90)};
 for(const g of groups.values()){const bad=g.find(i=>i.a===false);if(bad)await pg.locator(`[data-native-field=${esc(bad.id)}][data-value=${esc(bad.id+'::'+bad.v)}]`).evaluate(e=>e.click())}await clickChecks();
 for(const g of groups.values()){const bad=g.find(i=>i.a===false);if(bad){assert.equal(await pg.locator(`[data-native-field=${esc(bad.id)}][data-value=${esc(bad.id+'::'+bad.v)}]`).getAttribute('data-check-mark'),'bad')}}
 if(no===54)await pg.screenshot({path:`${out}/ab12-p54-wrong-${width}.png`});
 for(const g of groups.values()){const good=g.find(i=>i.a===true);assert(good);await pg.locator(`[data-native-field=${esc(good.id)}][data-value=${esc(good.id+'::'+good.v)}]`).evaluate(e=>e.click())}await clickChecks();
 for(const g of groups.values()){const good=g.find(i=>i.a===true);assert.equal(await pg.locator(`[data-native-field=${esc(good.id)}][data-value=${esc(good.id+'::'+good.v)}]`).getAttribute('data-check-mark'),'ok');for(const bad of g.filter(i=>i!==good))assert.equal(await pg.locator(`[data-native-field=${esc(bad.id)}][data-value=${esc(bad.id+'::'+bad.v)}]`).getAttribute('data-check-mark'),null)}
 if(no===54){await p.waitForTimeout(2100);assert.equal(await pg.locator('.naCheck output').last().textContent(),'✓ Richtig!');await pg.screenshot({path:`${out}/ab12-p54-correct-${width}.png`})}
 await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');for(const g of groups.values()){assert.equal(await pg.locator(`input[name$=${esc('-'+(g[0].name||g[0].id))}]:checked`).count(),1)}console.log('PASS',width,'range',no,groups.size,'retry clears previous state');await p.close();
 }
 const p=await b.newPage({viewport:{width,height:1500}});await p.goto('http://127.0.0.1:5299/ab4-6.html#38');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');const pg=p.locator('.page[data-page="38"]'),data=JSON.parse(fs.readFileSync('src/scan-data/ab-a11/p38.json'));for(const f of data.fields.filter(f=>f.id.startsWith('u11b-')))await pg.locator(`[data-native-field=${esc(f.id)}]`).fill(f.answer);for(const btn of await pg.locator('.compactCheckButton').all())await btn.evaluate(e=>e.click());await p.waitForTimeout(90);assert.equal(await pg.locator('[data-native-field^="u11b-"][data-check-mark="ok"]').count(),3);assert.equal(await pg.locator('textarea[data-native-field^="u10-"][data-check-mark]').count(),0);console.log('PASS',width,'p38 explicit u11b map; open descriptions neutral');await p.close();
}
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);process.exitCode=1});
