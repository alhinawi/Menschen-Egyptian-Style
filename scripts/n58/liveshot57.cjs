const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:390,height:844}});
 await p.goto('https://germani.pages.dev/ab-a12-l17-20.html#57',{waitUntil:'networkidle',timeout:60000});
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000});
 const h=p.locator('[data-native-ab12="57"]');
 await h.waitFor({timeout:15000});
 await p.evaluate(()=>new Promise(r=>setTimeout(r,1500)));
 await h.screenshot({path:'/downloads/live57-390.png'});
 await b.close(); console.log('ok');
})().catch(e=>{console.error(e.message);process.exit(1)});
