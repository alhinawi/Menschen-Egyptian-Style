const {chromium} = require('playwright');
(async()=>{
 const b = await chromium.launch(); const pg = await b.newPage({viewport:{width:900,height:1400}});
 await pg.goto('http://localhost:4173/#/book/ab-a12/68'); await pg.waitForTimeout(1500);
 const rows = await pg.$$eval('.naCanvas .naW', els => els.filter(e=>{const t=parseFloat(e.style.top);return t>900&&t<1010}).map(e=>({t:e.textContent, fs:e.style.fontSize||getComputedStyle(e).fontSize, cs:getComputedStyle(e).fontSize, left:e.style.left, top:e.style.top, col:getComputedStyle(e).color})));
 console.log(JSON.stringify(rows,null,1));
 await b.close();
})();
