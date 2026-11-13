const { chromium } = require('playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1400,height:1200}});
 await p.goto('http://127.0.0.1:5210/ab-a12-l21-24.html#88');
 await p.waitForTimeout(1200);
 const r=await p.evaluate(()=>{
   const dots=[...document.querySelectorAll('.naPrd')];
   const d=dots[0];
   const cs=getComputedStyle(d);
   return {count:dots.length, color:cs.color, fs:cs.fontSize, cls:d.className};
 });
 console.log(JSON.stringify(r));
 await b.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
