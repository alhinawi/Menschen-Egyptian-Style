const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1440,height:900}});
 await p.goto('http://127.0.0.1:4173/ab-a12-l17-20.html#39',{waitUntil:'networkidle',timeout:90000});
 try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){}
 await p.waitForTimeout(2500);
 await p.evaluate(()=>{document.querySelector("[data-native-ab12='39'] [data-native-field='p39-a1-musik']").click()});
 await p.waitForTimeout(900);
 await p.screenshot({path:'/downloads/p39-translate-popup.png'});
 await b.close();process.exit(0);
})().catch(e=>{console.error(e.message);process.exit(1)});
