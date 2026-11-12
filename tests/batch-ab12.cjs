const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox','--allow-file-access-from-files']});
for(const width of [320,390,430,1280]){const p=await b.newPage({viewport:{width,height:844},isMobile:width<800,hasTouch:true});
let errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('file://'+require('node:path').join(__dirname,'../ab-a12-l13-16.html'));await p.waitForTimeout(150);
assert.equal(errors.length,0,errors.join(';'));
assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'fit-width overflow');
assert.equal(await p.evaluate(()=>menschenPages.length),30,'30 pages');
for(let i=0;i<30;i++){await p.evaluate(i=>bookPage(i),i);await p.waitForTimeout(25);
 assert(await p.evaluate(i=>menschenPages[i].scrollHeight<=menschenPages[i].clientHeight+2,i),'page clipped '+(i+6));
 assert(await p.evaluate(()=>[...document.images].filter(e=>e.src.includes('/assets/')).every(e=>e.complete&&e.naturalWidth>0)),'missing image on page index '+i);}
if(width===390){let count=0;await p.evaluate(()=>bookZoom(1));
 for(let i=0;i<30;i++){await p.evaluate(i=>bookPage(i),i);
  for(const form of await p.locator('.p'+(i+6)+' .batchQuiz').all()){
   for(const f of await form.locator('[data-answer]').all()){
    const v=(await f.getAttribute('data-answer')).split('|')[0];
    if(await f.evaluate(e=>e.type==='radio'))await f.check();
    else if(await f.evaluate(e=>e.tagName==='SELECT'))await f.selectOption(v);
    else await f.fill(v);}
   await form.locator('.check').click();
   assert((await form.locator('.feedback').textContent()).includes('Richtig'),'answer check failed on page '+(i+6));count++;}}
 console.log('all',count,'answer groups passed');
 // wrong answer path
 await p.evaluate(()=>bookPage(0));const firstForm=p.locator('.p6 .batchQuiz').first();
 await firstForm.locator('input[data-answer]').first().fill('falsch');
 await firstForm.locator('.check').click();
 assert((await firstForm.locator('.feedback').textContent()).includes('Noch'),'wrong answer should retry');
 // markBank
 await p.evaluate(()=>bookPage(3));
 const bank=p.locator('.markBank');for(const w of ['Dom','Brücke','Ampel'])await bank.locator('.tapMark',{hasText:new RegExp('^'+w+'$')}).click();
 await p.locator('.p9 .markBank + .check').click();
 assert((await p.locator('.p9 .markBank ~ .feedback').textContent()).includes('Richtig'),'markBank check');
 // audio
 await p.locator('.p9 .listen').first().click();
 assert((await p.locator('#audio').getAttribute('src')).endsWith('ab-a12-cd2-track02.mp3'));
 await p.locator('#audioClose').click();
 // lesson nav + page jump
 await p.evaluate(()=>bookPage(24));await p.waitForTimeout(400);
 assert.equal(await p.evaluate(()=>menschenBook.getCurrentPageIndex()),24); /* header selects display:none since library pill nav */
 await p.evaluate(()=>bookPage(11));await p.waitForTimeout(400);
 assert.equal(await p.evaluate(()=>menschenBook.getCurrentPageIndex()),11);
 // screenshots
 await p.evaluate(()=>{bookPage(0);bookZoom(Math.min(1,390/900));scrollTo(0,0)});
 await p.screenshot({path:'/downloads/ab12-l13-16-p6.png',fullPage:false});
 await p.evaluate(()=>bookPage(9));await p.screenshot({path:'/downloads/ab12-l13-16-p15.png'});
 await p.evaluate(()=>bookPage(23));await p.screenshot({path:'/downloads/ab12-l13-16-p29.png'});
 await p.evaluate(()=>bookPage(29));await p.screenshot({path:'/downloads/ab12-l13-16-p35.png'});
 // original viewer
 for(const page of [6,20,35]){await p.goto('file://'+require('node:path').join(__dirname,'../ab-a12-original-viewer.html')+'?page='+page);
  assert(await p.locator('#paper').evaluate(e=>e.complete&&e.naturalWidth>0),'original '+page);
  assert((await p.locator('#page').textContent()).includes(String(page)));}
}
assert.equal(errors.length,0,errors.join(';'));console.log(width,'layout bounds, images, originals pass');await p.close();}
await b.close()})().catch(e=>{console.error(e);process.exit(1)});
