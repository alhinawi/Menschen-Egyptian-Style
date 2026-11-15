const{chromium}=require('playwright');const{spawn}=require('child_process');const assert=require('assert');
(async()=>{const server=spawn('node',['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5195'],{stdio:'ignore'});let browser;try{
for(let i=0;i<100;i++){try{await fetch('http://127.0.0.1:5195');break}catch{await new Promise(r=>setTimeout(r,100))}}
browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
for(const width of [390,360])for(const lang of ['en','ar','de']){
const p=await browser.newPage({viewport:{width,height:844}});await p.addInitScript(lang=>{localStorage.setItem('menschen-ui-language',lang);localStorage.setItem('menschen-translation-language','en')},lang);await p.goto('http://127.0.0.1:5195/ab4-6.html#33');await p.locator('html[data-book-ready="true"]').waitFor();await p.locator('.profileTrigger').click();await p.locator('.profileTranslationOptions').scrollIntoViewIfNeeded();await p.evaluate(()=>document.fonts.ready);
for(const selector of ['.profileLanguageOptions:not(.profileTranslationOptions)','.profileTranslationOptions']){
const box=await p.locator(selector).boundingBox();const buttons=await p.locator(selector+' button').all();let y;
for(const button of buttons){const b=await button.boundingBox();assert(b.width>=44&&b.height>=44,JSON.stringify(b));assert(b.x>=0&&b.x+b.width<=width);assert(b.x>=box.x&&b.x+b.width<=box.x+box.width+1);if(y!==undefined)assert(Math.abs(b.y-y)<1);y=b.y;assert(await button.evaluate(e=>e.scrollWidth<=e.clientWidth));}}
assert.equal(await p.locator('.profilePanel').getAttribute('dir'),lang==='ar'?'rtl':'ltr');await p.locator('.profileTranslationChoice').first().click();assert.equal(await p.evaluate(()=>localStorage.getItem('menschen-translation-language')),'auto');await p.screenshot({path:`/downloads/compact-language-${lang}-${width}.png`});await p.close();
}console.log('PASS compact language groups EN/AR/DE 390+360px: same row, >=44px targets, no overflow, RTL/LTR and persisted translation choice.');
}finally{await browser?.close();server.kill()}})().catch(e=>{console.error(e);process.exitCode=1});
