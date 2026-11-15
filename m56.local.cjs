const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
 await p.goto('http://127.0.0.1:4173/ab-a12-l17-20.html#56');
 await p.waitForSelector("[data-native-ab12='56'] .naHand56",{timeout:15000,state:'attached'});
 await p.waitForTimeout(500);
 const r=await p.evaluate(()=>{const e=document.querySelector("[data-native-ab12='56'] .naHand56");const b=e.getBoundingClientRect();return {x:b.x,y:b.y,w:b.width,h:b.height}});
 console.log(JSON.stringify(r));
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
