const {chromium}=require('playwright');
const {spawn}=require('child_process');
const fs=require('fs');
const assert=require('assert');
(async()=>{
 fs.mkdirSync('test-results/reader-arrows',{recursive:true});
 const server=spawn('node',['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5188'],{stdio:'ignore'});
 let browser;
 try {
  for(let i=0;i<100;i++){try{await fetch('http://127.0.0.1:5188');break}catch{await new Promise(r=>setTimeout(r,100))}}
  browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:390,height:844}});
  for(const lang of ['ar','en']){
   await page.goto('http://127.0.0.1:5188/#11');
   await page.locator('html[data-book-ready="true"]').waitFor();
   await page.locator('.profileTrigger').click();
   await page.getByRole('button',{name:lang==='ar'?'العربية':'English',exact:true}).click();
   await page.locator('.profileTrigger').click();
   await page.waitForTimeout(600);
   const positions=await page.evaluate(()=>{
    const prev=document.querySelector('#prev'),next=document.querySelector('#next'),pill=document.querySelector('.lnv-pagePill');
    const r=pill.getBoundingClientRect();const range=document.createRange();range.selectNodeContents(pill.querySelector('.lnv-pageLabel'));const nr=range.getBoundingClientRect();
    return {prev:prev.getBoundingClientRect().x,next:next.getBoundingClientRect().x,prevText:prev.textContent.trim(),nextText:next.textContent.trim(),pillCenter:r.x+r.width/2,numberCenter:nr.x+nr.width/2,bodyWidth:innerWidth,chevron:getComputedStyle(pill.querySelector('.lnv-chev')).display};
   });
   assert(positions.prev<195&&positions.next>195);assert.equal(positions.prevText,'←');assert.equal(positions.nextText,'→');assert.equal(positions.chevron,'none');assert(Math.abs(positions.pillCenter-195)<0.6);assert(Math.abs(positions.numberCenter-195)<0.6);
   await page.screenshot({path:`test-results/reader-arrows/${lang}-390.png`});
   await page.locator('#next').click();await page.waitForTimeout(700);assert.equal(await page.locator('.lnv-pagePill').innerText(),'12');
   await page.locator('#prev').click();await page.waitForTimeout(700);assert.equal(await page.locator('.lnv-pagePill').innerText(),'11');
   await page.goto('http://127.0.0.1:5188/#howto');await page.locator('html[data-book-ready="true"]').waitFor();await page.waitForTimeout(1700);
   assert.equal(await page.locator('.lnv-pageLabel').innerText(),lang==='ar'?'الدليل':'Guide');
   assert.equal(await page.locator('.howtoEyebrow').innerText(),'MENSCHEN');
   assert(await page.locator('.lnv-pageLabel').evaluate(e=>e.scrollWidth<=e.clientWidth));
   await page.screenshot({path:`test-results/reader-arrows/${lang}-guide-390.png`});
   console.log(lang,positions,'PASS: next 11→12, previous 12→11');
  }
 }finally{await browser?.close();server.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
