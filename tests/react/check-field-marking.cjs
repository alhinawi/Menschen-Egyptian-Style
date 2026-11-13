const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs');
const {serve}=require('./helpers/static-server.cjs');
const out=process.env.SHOTS||'/downloads/check-fields';fs.mkdirSync(out,{recursive:true});
(async()=>{const server=await serve(5298),b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
try{for(const [route,no] of [['ab2','13'],['ab2','15'],['ab3','21'],['ab-l7-9','55'],['ab-l7-9','57'],['ab-l7-9','69'],['ab-l7-9','74'],['ab-l10-12','80'],['ab-l10-12','81'],['l7-9','55']]){
 const context=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),p=await context.newPage();await p.goto(`http://127.0.0.1:5298/${route}.html#${no}`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');const pg=p.locator(`.page[data-page="${no}"]`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(950);await pg.screenshot({path:`${out}/${route}-p${no}-empty.png`});
 for(const check of await pg.locator('.compactCheckButton').all()){await check.evaluate(e=>e.click());await p.waitForTimeout(90)}await p.waitForTimeout(300);
 assert.equal(await pg.locator('input[type=radio].hybridCorrect,input[type=radio][data-check-mark="ok"],input[type=radio].npCorrect').count(),0,route+' '+no+' untouched radios must never be green');
 const counts=await pg.evaluate(e=>({bad:e.querySelectorAll('[data-check-mark="bad"],.hybridWrong').length,ok:e.querySelectorAll('[data-check-mark="ok"],.hybridCorrect').length,placed:[...e.querySelectorAll('.compactCheckButton')].map(b=>b.parentElement.dataset.checkPlaced)}));
 if(route==='ab3')assert.equal(await pg.locator('[data-native-field^="ap1-"][data-check-mark="bad"]').count(),4);
 if(no==='69')assert.equal(await pg.locator('.mSyllables[data-check-mark="bad"]').count(),12);
 if(no==='74')assert.equal(await pg.locator('input[data-confidence][data-check-mark]').count(),0);
 if(no==='57')assert.equal(await pg.locator('input[type=radio][data-check-mark="bad"]').count(),2);
 if(no==='81')assert.equal(await pg.locator('input[type=radio][data-check-mark="bad"]').count(),17);
 if(route==='l7-9')assert.equal(await pg.locator('input[type=radio][data-check-mark="bad"]').count(),6);
 await pg.screenshot({path:`${out}/${route}-p${no}-after.png`});
 // Mixed fields must be graded independently, with no stale red on untouched alternatives.
 if(route==='l7-9'){
  await pg.locator('input[name="native-pilot-kb11-55-a"][data-value="de"]').check();
  await pg.locator('input[name="native-pilot-kb11-55-b"][data-value="reste"]').check();
  await pg.locator('.compactCheckButton').first().click();await p.waitForTimeout(150);
  assert.equal(await pg.locator('input[data-value="de"]').getAttribute('data-check-mark'),'ok');
  assert.equal(await pg.locator('input[data-value="reste"]').getAttribute('data-check-mark'),'bad');
  assert.equal(await pg.locator('input[data-value="at"]').getAttribute('data-check-mark'),null);
  assert.equal(await pg.locator('input[data-value="at"]').evaluate(e=>/npWrong|npCorrect/.test(e.className)),false);
 }
 if(route==='ab-l7-9'&&no==='55'){
  await pg.locator('[data-field-id="r2"]').check();await pg.locator('.compactCheckButton').first().click();await p.waitForTimeout(150);
  assert(await pg.locator('[data-field-id="r2"]').evaluate(e=>e.classList.contains('hybridCorrect')));
  assert(await pg.locator('[data-field-id="r1"]').evaluate(e=>!e.classList.contains('hybridWrong')&&!e.classList.contains('hybridCorrect')));
 }
 if(no==='57'){
  await pg.locator('input[data-value="wichtige-info"]').check();await pg.locator('.compactCheckButton').first().click();await p.waitForTimeout(150);
  assert.equal(await pg.locator('input[data-value="wichtige-info"]').getAttribute('data-check-mark'),'ok');
 }
 if(no==='69'){
  const expected={1:[0,0,0],2:[0,0,0],3:[0,0,0],4:[1,0,1]};
  for(const [r,indices] of Object.entries(expected))for(let c=0;c<3;c++)await pg.locator(`[data-native-field="akzent-${r}-${c}"] button`).nth(indices[c]).click();
  await pg.locator('.compactCheckButton').click();await p.waitForTimeout(150);assert.equal(await pg.locator('.mSyllables[data-check-mark="ok"]').count(),12);
 }
 console.log('PASS',route,no,counts);await context.close();
}
}finally{await b.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
