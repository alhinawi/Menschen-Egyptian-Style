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
 // page 68: text-field grading (incl. alternate answers), persistence, reset
 p=await openPage(b,width,'68');
 const pg68=p.locator('.page[data-page="68"]');
 assert.equal(await pg68.locator('.nativeAB12[data-native-ab12="68"]').count(),1,'native p68 rendered');
 for(const id of['p68-8b1','p68-8b2','p68-8c1','p68-8c2','p68-8d','p68-8e1','p68-8e2','p68-9a','p68-9b','p68-9c'])assert.equal(await pg68.locator('[data-native-field="'+id+'"]').count(),1,'field '+id);
 // g1: wrong then right
 await pg68.locator('[data-native-field="p68-8b1"]').fill('falsch');
 await pg68.locator('[data-check="g1"] button').click();
 assert.match((await pg68.locator('[data-check="g1"] output').textContent())||'',/Noch einmal/,'g1 wrong graded');
 await pg68.locator('[data-native-field="p68-8b1"]').fill('kann');
 await pg68.locator('[data-native-field="p68-8b2"]').fill('können');
 await pg68.locator('[data-native-field="p68-8c1"]').fill('will');
 await pg68.locator('[data-native-field="p68-8c2"]').fill('darf');
 await pg68.locator('[data-native-field="p68-8d"]').fill('musst');
 await pg68.locator('[data-native-field="p68-8e1"]').fill('soll');
 await pg68.locator('[data-native-field="p68-8e2"]').fill('will');
 await pg68.locator('[data-check="g1"] button').click();
 assert.match((await pg68.locator('[data-check="g1"] output').textContent())||'',/Richtig/,'g1 correct graded');
 // g2: long answers, one via the no-period alternate
 await pg68.locator('[data-native-field="p68-9a"]').fill('Ich finde das in Ordnung');
 await pg68.locator('[data-native-field="p68-9b"]').fill('Das ist doch gefährlich, oder?');
 await pg68.locator('[data-native-field="p68-9c"]').fill('Das weiß ich nicht.');
 await pg68.locator('[data-check="g2"] button').click();
 assert.match((await pg68.locator('[data-check="g2"] output').textContent())||'',/Richtig/,'g2 correct graded (with alternate)');
 // saved-reload
 await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.evaluate(()=>window.bookPage([...document.querySelectorAll('.page')].findIndex(e=>e.dataset.page==='68')));await p.waitForTimeout(350);
 assert.equal(await p.locator('.page[data-page="68"] [data-native-field="p68-8b1"]').inputValue(),'kann','saved field reloaded');
 assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('native-ab12-68')||'{}')['p68-8b1']),'kann','localStorage key native-ab12-68');
 // reset clears
 await p.locator('.pageResetTrigger').click();await p.getByRole('button',{name:'Reset',exact:true}).click();
 assert.equal(await p.locator('.page[data-page="68"] [data-native-field="p68-8b1"]').inputValue(),'','reset clears field');
 assert.equal(await p.evaluate(()=>localStorage.getItem('native-ab12-68')),null,'reset clears storage');
 console.log(width,'p68 interaction/grade/persist/reset PASS');
 await p.close();
 // page 69: single-letter gap fields, radio group grading, persistence, reset
 p=await openPage(b,width,'69');
 const pg69=p.locator('.page[data-page="69"]');
 assert.equal(await pg69.locator('.nativeAB12[data-native-ab12="69"]').count(),1,'native p69 rendered');
 for(const id of['p69-a1a1','p69-a1a2','p69-a1a3','p69-a1a4','p69-a1b1','p69-a1b2','p69-a1b3','p69-a1b4','p69-igel1','p69-igel2','p69-igel3'])assert.equal(await pg69.locator('[data-native-field="'+id+'"]').count(),1,'field '+id);
 assert.equal(await pg69.locator('input.naDot').count(),3,'three a2 radios');
 // g1: wrong then right
 await pg69.locator('[data-native-field="p69-a1a1"]').fill('x');
 await pg69.locator('[data-check="g1"] button').click();
 assert.match((await pg69.locator('[data-check="g1"] output').textContent())||'',/Noch einmal/,'g1 wrong graded');
 await pg69.locator('[data-native-field="p69-a1a1"]').fill('ä');
 await pg69.locator('[data-native-field="p69-a1a2"]').fill('e');
 await pg69.locator('[data-native-field="p69-a1a3"]').fill('e');
 await pg69.locator('[data-native-field="p69-a1a4"]').fill('ä');
 await pg69.locator('[data-native-field="p69-a1b1"]').fill('ä');
 await pg69.locator('[data-native-field="p69-a1b2"]').fill('e');
 await pg69.locator('[data-native-field="p69-a1b3"]').fill('ä');
 await pg69.locator('[data-native-field="p69-a1b4"]').fill('e');
 await pg69.locator('[data-check="g1"] button').click();
 assert.match((await pg69.locator('[data-check="g1"] output').textContent())||'',/Richtig/,'g1 correct graded');
 // a2 radios: wrong then right
 await pg69.locator('input.naDot[aria-label="Aussprache 2: sind lang."]').check();
 await pg69.locator('[data-check="confidence-p69-a2"] button').click();
 assert.match((await pg69.locator('[data-check="confidence-p69-a2"] output').textContent())||'',/Noch einmal/,'a2 wrong graded');
 await pg69.locator('input.naDot[aria-label="Aussprache 2: koennen lang oder kurz sein."]').check();
 await pg69.locator('[data-check="confidence-p69-a2"] button').click();
 assert.match((await pg69.locator('[data-check="confidence-p69-a2"] output').textContent())||'',/Richtig/,'a2 correct graded');
 // saved-reload
 await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.evaluate(()=>window.bookPage([...document.querySelectorAll('.page')].findIndex(e=>e.dataset.page==='69')));await p.waitForTimeout(350);
 assert.equal(await p.locator('.page[data-page="69"] [data-native-field="p69-a1a1"]').inputValue(),'ä','saved field reloaded');
 assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('native-ab12-69')||'{}')['a2']),'langOderKurz','saved radio reloaded');
 // reset clears
 await p.locator('.pageResetTrigger').click();await p.getByRole('button',{name:'Reset',exact:true}).click();
 assert.equal(await p.locator('.page[data-page="69"] [data-native-field="p69-a1a1"]').inputValue(),'','reset clears field');
 assert.equal(await p.evaluate(()=>localStorage.getItem('native-ab12-69')),null,'reset clears storage');
 console.log(width,'p69 interaction/grade/persist/reset PASS');
 await p.close();
 // page 70: TEST page - word-tile fields, radio matrix, dialog fields, grading, persistence, reset
 p=await openPage(b,width,'70');
 const pg70=p.locator('.page[data-page="70"]');
 assert.equal(await pg70.locator('.nativeAB12[data-native-ab12="70"]').count(),1,'native p70 rendered');
 for(const id of['p70-1a','p70-1b','p70-1c1','p70-1c2','p70-1c3','p70-1d','p70-3b','p70-3c','p70-3d','p70-3e','p70-4a','p70-4b','p70-4c','p70-4d'])assert.equal(await pg70.locator('[data-native-field="'+id+'"]').count(),1,'field '+id);
 assert.equal(await pg70.locator('input.naDot').count(),10,'ten ex2 radios');
 // g1: wrong then right
 await pg70.locator('[data-native-field="p70-1a"]').fill('x');
 await pg70.locator('[data-check="g1"] button').click();
 assert.match((await pg70.locator('[data-check="g1"] output').textContent())||'',/Noch einmal/,'g1 wrong graded');
 await pg70.locator('[data-native-field="p70-1a"]').fill('grillen');
 await pg70.locator('[data-native-field="p70-1b"]').fill('tragen');
 await pg70.locator('[data-native-field="p70-1c1"]').fill('schieben');
 await pg70.locator('[data-native-field="p70-1c2"]').fill('achten');
 await pg70.locator('[data-native-field="p70-1c3"]').fill('nehmen');
 await pg70.locator('[data-native-field="p70-1d"]').fill('hupen');
 await pg70.locator('[data-check="g1"] button').click();
 assert.match((await pg70.locator('[data-check="g1"] output').textContent())||'',/Richtig/,'g1 correct graded');
 // g2 radios: wrong then right
 await pg70.locator('input.naDot[aria-label="2 b wollen"]').check();
 await pg70.locator('input.naDot[aria-label="2 c wollen"]').check();
 await pg70.locator('input.naDot[aria-label="2 d dürfen"]').check();
 await pg70.locator('input.naDot[aria-label="2 e müssen"]').check();
 await pg70.locator('input.naDot[aria-label="2 f müssen"]').check();
 await pg70.locator('[data-check="g2"] button').click();
 assert.match((await pg70.locator('[data-check="g2"] output').textContent())||'',/Noch einmal/,'g2 wrong graded');
 await pg70.locator('input.naDot[aria-label="2 b dürfen"]').check();
 await pg70.locator('input.naDot[aria-label="2 c können"]').check();
 await pg70.locator('input.naDot[aria-label="2 d müssen"]').check();
 await pg70.locator('input.naDot[aria-label="2 e können"]').check();
 await pg70.locator('input.naDot[aria-label="2 f dürfen"]').check();
 await pg70.locator('[data-check="g2"] button').click();
 assert.match((await pg70.locator('[data-check="g2"] output').textContent())||'',/Richtig/,'g2 correct graded');
 // g3 + g4: correct
 await pg70.locator('[data-native-field="p70-3b"]').fill('müsst');
 await pg70.locator('[data-native-field="p70-3c"]').fill('muss');
 await pg70.locator('[data-native-field="p70-3d"]').fill('Dürfen');
 await pg70.locator('[data-native-field="p70-3e"]').fill('müssen');
 await pg70.locator('[data-check="g3"] button').click();
 assert.match((await pg70.locator('[data-check="g3"] output').textContent())||'',/Richtig/,'g3 correct graded');
 await pg70.locator('[data-native-field="p70-4a"]').fill('Das ist falsch.');
 await pg70.locator('[data-native-field="p70-4b"]').fill('Das ist ja wirklich sehr gefährlich, oder?');
 await pg70.locator('[data-native-field="p70-4c"]').fill('Das finde ich gar nicht gut.');
 await pg70.locator('[data-native-field="p70-4d"]').fill('Diese Regel ist in Ordnung.');
 await pg70.locator('[data-check="g4"] button').click();
 assert.match((await pg70.locator('[data-check="g4"] output').textContent())||'',/Richtig/,'g4 correct graded');
 // saved-reload
 await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.evaluate(()=>window.bookPage([...document.querySelectorAll('.page')].findIndex(e=>e.dataset.page==='70')));await p.waitForTimeout(350);
 assert.equal(await p.locator('.page[data-page="70"] [data-native-field="p70-1a"]').inputValue(),'grillen','saved field reloaded');
 assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('native-ab12-70')||'{}')['r2b']),'dürfen','saved radio reloaded');
 // reset clears
 await p.locator('.pageResetTrigger').click();await p.getByRole('button',{name:'Reset',exact:true}).click();
 assert.equal(await p.locator('.page[data-page="70"] [data-native-field="p70-1a"]').inputValue(),'','reset clears field');
 assert.equal(await p.evaluate(()=>localStorage.getItem('native-ab12-70')),null,'reset clears storage');
 console.log(width,'p70 interaction/grade/persist/reset PASS');
 await p.close();
 // page 71: Lernwortschatz - ungraded writing-line fields, persistence, reset
 p=await openPage(b,width,'71');
 const pg71=p.locator('.page[data-page="71"]');
 assert.equal(await pg71.locator('.nativeAB12[data-native-ab12="71"]').count(),1,'native p71 rendered');
 assert.equal(await pg71.locator('[data-native-field]').count(),38,'38 writing fields');
 for(const id of['p71-1-l1','p71-1-l19','p71-1-r1','p71-1-r18','p71-2-1'])assert.equal(await pg71.locator('[data-native-field="'+id+'"]').count(),1,'field '+id);
 await pg71.locator('[data-native-field="p71-1-l1"]').fill('Fahrer');
 await pg71.locator('[data-native-field="p71-2-1"]').fill('Notiz');
 await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.evaluate(()=>window.bookPage([...document.querySelectorAll('.page')].findIndex(e=>e.dataset.page==='71')));await p.waitForTimeout(350);
 assert.equal(await p.locator('.page[data-page="71"] [data-native-field="p71-1-l1"]').inputValue(),'Fahrer','saved field reloaded');
 assert.equal(await p.locator('.page[data-page="71"] [data-native-field="p71-2-1"]').inputValue(),'Notiz','saved ex2 field reloaded');
 await p.locator('.pageResetTrigger').click();await p.getByRole('button',{name:'Reset',exact:true}).click();
 assert.equal(await p.locator('.page[data-page="71"] [data-native-field="p71-1-l1"]').inputValue(),'','reset clears field');
 assert.equal(await p.evaluate(()=>localStorage.getItem('native-ab12-71')),null,'reset clears storage');
 console.log(width,'p71 interaction/persist/reset PASS');
 await p.close();
 // page 72: Wiederholungsstation Wortschatz - vowel gaps, sort table, strike rows, text gaps; grading, persistence, reset
 p=await openPage(b,width,'72');
 const pg72=p.locator('.page[data-page="72"]');
 assert.equal(await pg72.locator('.nativeAB12[data-native-ab12="72"]').count(),1,'native p72 rendered');
 assert.equal(await pg72.locator('[data-native-field]').count(),24,'24 fields (11 vowels + 7 table cells + 6 text gaps)');
 for(const id of['p72-1-w1i','p72-1-w8ue','p72-1-a1','p72-1-c4','p72-3_0','p72-3_5'])assert.equal(await pg72.locator('[data-native-field="'+id+'"]').count(),1,'field '+id);
 // g1 wrong then right (vowels + sort table with alternatives)
 await pg72.locator('[data-native-field="p72-1-w1i"]').fill('x');
 await pg72.locator('[data-check="g1"] button').click();
 assert.match((await pg72.locator('[data-check="g1"] output').textContent())||'',/Noch einmal/,'g1 wrong graded');
 for(const[id,v]of[['p72-1-w1i','i'],['p72-1-w2a','a'],['p72-1-w3o','o'],['p72-1-w4au','au'],['p72-1-w4i','i'],['p72-1-w5o','o'],['p72-1-w5i','i'],['p72-1-w6i','i'],['p72-1-w7eu','eu'],['p72-1-w7i','i'],['p72-1-w8ue','ü'],['p72-1-a1','schlank'],['p72-1-a2','blond'],['p72-1-a3','dick'],['p72-1-a4','hübsch'],['p72-1-c2','traurig'],['p72-1-c3','komisch'],['p72-1-c4','freundlich']])await pg72.locator('[data-native-field="'+id+'"]').fill(v);
 await pg72.locator('[data-check="g1"] button').click();
 assert.match((await pg72.locator('[data-check="g1"] output').textContent())||'',/Richtig/,'g1 correct graded');
 // g2 strike rows: wrong then right
 await pg72.getByRole('button',{name:'s-b streichen aufräumen'}).click();await p.keyboard.press('Escape');
 await pg72.locator('[data-check="g2"] button').click();
 assert.match((await pg72.locator('[data-check="g2"] output').textContent())||'',/Noch einmal/,'g2 wrong graded');
 await pg72.getByRole('button',{name:'s-b streichen rausbringen'}).click();await p.keyboard.press('Escape');
 await pg72.getByRole('button',{name:'s-c streichen spülen'}).click();await p.keyboard.press('Escape');
 await pg72.getByRole('button',{name:'s-d streichen wischen'}).click();await p.keyboard.press('Escape');
 await pg72.getByRole('button',{name:'s-e streichen kochen'}).click();await p.keyboard.press('Escape');
 await pg72.getByRole('button',{name:'s-f streichen backen'}).click();await p.keyboard.press('Escape');
 await pg72.locator('[data-check="g2"] button').click();
 assert.match((await pg72.locator('[data-check="g2"] output').textContent())||'',/Richtig/,'g2 correct graded');
 // g3 text gaps: wrong then right
 await pg72.locator('[data-native-field="p72-3_0"]').fill('x');
 await pg72.locator('[data-check="g3"] button').click();
 assert.match((await pg72.locator('[data-check="g3"] output').textContent())||'',/Noch einmal/,'g3 wrong graded');
 for(const[id,v]of[['p72-3_0','stehen bleiben'],['p72-3_1','dürfen'],['p72-3_2','Fahrradfahrer'],['p72-3_3','achten'],['p72-3_4','schiebt'],['p72-3_5','trägt']])await pg72.locator('[data-native-field="'+id+'"]').fill(v);
 await pg72.locator('[data-check="g3"] button').click();
 assert.match((await pg72.locator('[data-check="g3"] output').textContent())||'',/Richtig/,'g3 correct graded');
 // saved-reload
 await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.evaluate(()=>window.bookPage([...document.querySelectorAll('.page')].findIndex(e=>e.dataset.page==='72')));await p.waitForTimeout(350);
 assert.equal(await p.locator('.page[data-page="72"] [data-native-field="p72-1-w1i"]').inputValue(),'i','saved vowel field reloaded');
 assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('native-ab12-72')||'{}')['s-b']),'rausbringen','saved strike reloaded');
 // reset clears
 await p.locator('.pageResetTrigger').click();await p.getByRole('button',{name:'Reset',exact:true}).click();
 assert.equal(await p.locator('.page[data-page="72"] [data-native-field="p72-1-w1i"]').inputValue(),'','reset clears field');
 assert.equal(await p.evaluate(()=>localStorage.getItem('native-ab12-72')),null,'reset clears storage');
 console.log(width,'p72 interaction/grade/persist/reset PASS');
 await p.close();
}
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
