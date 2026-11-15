const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');const root=path.resolve(__dirname,'../../dist');const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.ttf':'font/ttf','.json':'application/json'};
const server=http.createServer((req,res)=>{let f=path.join(root,new URL(req.url,'http://localhost').pathname);try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('missing')}});
const assert=require('node:assert/strict');
(async()=>{await new Promise(r=>server.listen(5193,r));const browser=await chromium.launch({args:['--no-sandbox']});try{
for(const [route,token,lesson] of [['index.html','cover','Lesson 2'],['kb-a12-l13-16.html','cover','Lesson 14'],['ab1.html','abcover','Lesson 2'],['ab-a12-l13-16.html','abcover','Lesson 14']]){
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>localStorage.setItem('menschen-ui-language','en'));
 await page.goto(`http://localhost:5193/${route}#${token}`);await page.waitForSelector('.fullscreenCover .isLoaded');await page.evaluate(()=>document.fonts.ready);
 await page.locator('.fullscreenCover .coverOpen').click();await page.waitForSelector('.bookOpeningScene.isOpening');
 assert.notEqual(await page.evaluate(()=>location.hash),'#'+token);
 await page.evaluate(()=>document.getAnimations().forEach(a=>{if(a.animationName==='coverSwingOpen'){a.pause();a.currentTime=220}}));
 await page.screenshot({path:`/downloads/motion-${route}-cover-mid.png`});
 await page.evaluate(()=>document.getAnimations().forEach(a=>a.finish()));await page.waitForSelector('.bookOpeningScene',{state:'detached'});
 await page.locator('.lnv-pill').click();await page.locator('.lnv-row').filter({has:page.getByText(lesson,{exact:true})}).first().click();
 await page.waitForFunction(()=>document.getAnimations().some(a=>a.animationName==='lessonDoorOpen'));
 await page.evaluate(()=>document.getAnimations().forEach(a=>{if(a.animationName?.startsWith('lessonDoor')){a.pause();a.currentTime=260}}));
 await page.screenshot({path:`/downloads/motion-${route}-door-mid.png`});
 await page.evaluate(()=>document.getAnimations().forEach(a=>a.finish()));await page.waitForFunction(()=>!document.documentElement.dataset.readerTransition);
 assert.deepEqual(errors,[]);console.log(route+': cover opening + lesson door PASS');
 // A subsequent gesture must skip motion without preventing its own action.
 await page.locator('.lnv-pill').click();await page.locator('.lnv-home').click();await page.waitForSelector('.fullscreenCover .coverOpen');await page.locator('.fullscreenCover .coverOpen').click();
 await page.mouse.click(380,70);assert.equal(await page.locator('.bookOpeningScene').count(),0);
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.lnv-pill').click();await page.locator('.lnv-home').click();await page.waitForSelector('.fullscreenCover .coverOpen');await page.locator('.fullscreenCover .coverOpen').click();assert.equal(await page.locator('.bookOpeningScene').count(),0);
 console.log(route+': fast skip + reduced motion PASS');
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.locator('.lnv-pill').click();assert.equal(await page.locator('.lnv-bookcard').count(),4);
 await page.evaluate(()=>document.getAnimations().forEach(a=>a.finish()));
 await page.waitForFunction(()=>Array.from(document.querySelectorAll('.lnv-bookcard img')).every(i=>i.complete&&i.naturalWidth>0));
 await page.screenshot({path:`/downloads/library-four-${route}.png`});
 for (const label of ['Kursbuch A1.1','Arbeitsbuch A1.1','Kursbuch A1.2','Arbeitsbuch A1.2']) {
   await page.locator('.lnv-bookcard').getByRole('img').count();
   await page.getByRole('link',{name:label,exact:true}).click();
   await page.waitForSelector('.fullscreenCover .isLoaded');
   await page.waitForFunction(()=>!document.documentElement.dataset.readerTransition);
   await page.locator('.fullscreenCover .coverLibrary').click();
 }
 await page.getByRole('button',{name:'Close menu'}).click();
 await page.locator('.fullscreenCover .coverOpen').click();await page.waitForSelector('.bookOpeningScene',{state:'detached'});
 // Same-module lesson boundary: AB A1.2 page 11 -> page 12.
 await page.evaluate(()=>{const i=Array.from(document.querySelectorAll('.page')).findIndex(p=>p.dataset.page==='11');window.menschenBook.turnToPage(i)});
 await page.locator('#next').click();await page.waitForFunction(()=>location.hash==='#12');
 assert(await page.evaluate(()=>document.documentElement.dataset.readerTransition==='door'));
 await page.waitForFunction(()=>!document.documentElement.dataset.readerTransition);
 console.log(route+': four cover destinations + boundary arrow PASS');await page.close();
}
}finally{await browser.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exit(1)});
