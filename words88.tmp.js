const { chromium } = require('playwright');
(async()=>{
 const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const page = await browser.newPage({viewport:{width:1400,height:1200}});
 await page.goto('http://127.0.0.1:5210/ab-a12-l21-24.html#88');
 await page.waitForTimeout(1500);
 const out = await page.evaluate(()=>{
   const line=[...document.querySelectorAll('.naBk88')].find(e=>e.textContent.startsWith('Hallo'));
   const r=line.getBoundingClientRect();
   const cs=getComputedStyle(line);
   const words=[...line.querySelectorAll('.tapWord')].map(w=>{const wr=w.getBoundingClientRect();return {t:w.textContent,x:+wr.left.toFixed(1),x1:+wr.right.toFixed(1)}});
   return {left:+r.left.toFixed(1),right:+r.right.toFixed(1),fs:cs.fontSize,ls:cs.letterSpacing,ff:cs.fontFamily,words};
 });
 console.log(JSON.stringify(out));
 await browser.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
