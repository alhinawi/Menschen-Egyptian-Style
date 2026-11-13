const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');const root=path.resolve(__dirname,'../..');
// Interaction + saved-reload tests for the native AB A1.2 pages 66-82 (slugs ab-a12-l21-24).
const server=http.createServer((q,r)=>{try{const f=path.join(root,'dist',q.url.split('?')[0]);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
async function openPage(b,width,no){const p=await b.newPage({viewport:{width,height:844},deviceScaleFactor:2});await p.goto('http://localhost:5297/ab-a12-l21-24.html#'+no);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.evaluate(no=>window.bookPage([...document.querySelectorAll('.page')].findIndex(e=>e.dataset.page===no)),no);await p.waitForTimeout(350);return p}
(async()=>{await new Promise(r=>server.listen(5297,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});try{
for(const width of[320,390]){
 // page 66: fields, grading, persistence, reset
 let p=await openPage(b,width,'66');
 const page=p.locator('.page[data-page="66"]');
 assert.equal(await page.locator('.nativeAB12[data-native-ab12="66"]').count(),1,'native p66 rendered');
 for(const id of['p66-1b','p66-1c','p66-1d','p66-3b','p66-3g'])assert.equal(await page.locator('[data-native-field="'+id+'"]').count(),1,'field '+id);
 // wrong answers grade false
 await page.locator('[data-native-field="p66-1b"]').fill('falsch');
 await page.locator('[data-native-field="p66-1c"]').fill('einen Helm tragen');
 await page.locator('[data-native-field="p66-1d"]').fill('Hunde nicht mitkommen');
 await page.locator('[data-check="g1"] button').click();
 assert.match((await page.locator('[data-check="g1"] output').textContent())||'',/Noch einmal/,'g1 wrong graded');
 // correct answers grade true
 await page.locator('[data-native-field="p66-1b"]').fill('zu Fuß gehen');
 await page.locator('[data-check="g1"] button').click();
 assert.match((await page.locator('[data-check="g1"] output').textContent())||'',/Richtig/,'g1 correct graded');
 // table blank + sentence blank grade via g2/ex3 groups exist as fields
 await page.locator('[data-native-field="p66-2d2"]').fill('darfst');
 assert(await page.locator('[data-check="g2"] button').count()===1,'g2 button present');
 // saved-reload: value survives reload
 await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.evaluate(()=>window.bookPage([...document.querySelectorAll('.page')].findIndex(e=>e.dataset.page==='66')));await p.waitForTimeout(350);
 assert.equal(await p.locator('.page[data-page="66"] [data-native-field="p66-2d2"]').inputValue(),'darfst','saved value reloaded');
 assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('native-ab12-66')||'{}')['p66-2d2']),'darfst','localStorage key native-ab12-66');
 // reset clears values, grades and storage
 await p.locator('.pageResetTrigger').click();await p.getByRole('button',{name:'Reset',exact:true}).click();
 assert.equal(await p.locator('.page[data-page="66"] [data-native-field="p66-2d2"]').inputValue(),'','reset clears field');
 assert.equal(await p.evaluate(()=>localStorage.getItem('native-ab12-66')),null,'reset clears storage');
 console.log(width,'p66 interaction/grade/persist/reset PASS');
 await p.close();
 // page 67: fields, radio grading, persistence, reset
 p=await openPage(b,width,'67');
 const pg67=p.locator('.page[data-page="67"]');
 assert.equal(await pg67.locator('.nativeAB12[data-native-ab12="67"]').count(),1,'native p67 rendered');
 for(const id of['p67-5b1','p67-5b2','p67-5c','p67-5d1','p67-5d2','p67-5e','p67-5f','p67-4bd','p67-4am'])assert.equal(await pg67.locator('[data-native-field="'+id+'"]').count(),1,'field '+id);
 assert.equal(await pg67.locator('.naDot').count(),14,'14 radios');
 // wrong radio set grades false
 await pg67.getByRole('radio',{name:'7a muss',exact:true}).check();
 await pg67.getByRole('radio',{name:'7b1 Willst',exact:true}).check();
 await pg67.getByRole('radio',{name:'7b2 muss',exact:true}).check();
 await pg67.getByRole('radio',{name:'7c sollst',exact:true}).check();
 await pg67.getByRole('radio',{name:'7d Darf',exact:true}).check();
 await pg67.getByRole('radio',{name:'7e1 muss',exact:true}).check();
 await pg67.getByRole('radio',{name:'7e2 Kannst',exact:true}).check();
 await pg67.locator('[data-check="g2"] button').click();
 assert.match((await pg67.locator('[data-check="g2"] output').textContent())||'',/Noch einmal/,'g2 wrong graded');
 // correct radio set grades true
 await pg67.getByRole('radio',{name:'7a darf',exact:true}).check();
 await pg67.locator('[data-check="g2"] button').click();
 assert.match((await pg67.locator('[data-check="g2"] output').textContent())||'',/Richtig/,'g2 correct graded');
 // text fields grade via g1
 await pg67.locator('[data-native-field="p67-5b1"]').fill('darf');
 await pg67.locator('[data-native-field="p67-5b2"]').fill('nicht');
 await pg67.locator('[data-native-field="p67-5c"]').fill('falsch');
 await pg67.locator('[data-check="g1"] button').click();
 assert.match((await pg67.locator('[data-check="g1"] output').textContent())||'',/Noch einmal/,'g1 partial graded wrong');
 await pg67.locator('[data-native-field="p67-5c"]').fill('darfst');
 await pg67.locator('[data-native-field="p67-5d1"]').fill('dürft');
 await pg67.locator('[data-native-field="p67-5d2"]').fill('nicht');
 await pg67.locator('[data-native-field="p67-5e"]').fill('dürfen');
 await pg67.locator('[data-native-field="p67-5f"]').fill('müssen');
 await pg67.locator('[data-check="g1"] button').click();
 assert.match((await pg67.locator('[data-check="g1"] output').textContent())||'',/Richtig/,'g1 correct graded');
 // saved-reload: field + radio survive reload
 await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.evaluate(()=>window.bookPage([...document.querySelectorAll('.page')].findIndex(e=>e.dataset.page==='67')));await p.waitForTimeout(350);
 assert.equal(await p.locator('.page[data-page="67"] [data-native-field="p67-5b1"]').inputValue(),'darf','saved field reloaded');
 assert.equal(await p.locator('.page[data-page="67"] ').getByRole('radio',{name:'7a darf',exact:true}).isChecked(),true,'saved radio reloaded');
 assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('native-ab12-67')||'{}')['7a']),'darf','localStorage key native-ab12-67');
 // reset clears values, grades and storage
 await p.locator('.pageResetTrigger').click();await p.getByRole('button',{name:'Reset',exact:true}).click();
 assert.equal(await p.locator('.page[data-page="67"] [data-native-field="p67-5b1"]').inputValue(),'','reset clears field');
 assert.equal(await p.locator('.page[data-page="67"] ').getByRole('radio',{name:'7a darf',exact:true}).isChecked(),false,'reset clears radio');
 assert.equal(await p.evaluate(()=>localStorage.getItem('native-ab12-67')),null,'reset clears storage');
 console.log(width,'p67 interaction/grade/persist/reset PASS');
 await p.close();
}
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
