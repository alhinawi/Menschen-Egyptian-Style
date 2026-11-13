const { chromium } = require('playwright');
(async()=>{
 const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const page = await browser.newPage({viewport:{width:1400,height:1200}});
 await page.goto('http://127.0.0.1:5210/ab-a12-l21-24.html#88');
 await page.waitForTimeout(1500);
 const info = await page.evaluate(()=>{
   const line=[...document.querySelectorAll('.naBk88')].find(e=>e.textContent.startsWith('Hallo'));
   const cv=line.closest('.naCanvas'); const cr=cv.getBoundingClientRect();
   return {x:cr.left,y:cr.top,w:cr.width,h:cr.height};
 });
 console.log('canvas rect', JSON.stringify(info));
 await page.screenshot({path:'/tmp/live88.png', clip:{x:info.x,y:info.y,width:info.w,height:Math.min(info.h,1250)}});
 await browser.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
