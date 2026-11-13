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
}
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
