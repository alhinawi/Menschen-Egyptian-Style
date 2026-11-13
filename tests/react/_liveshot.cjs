const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
for(const n of (process.env.PAGES||'83').split(',')){
 const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await p.goto('https://germani.pages.dev/ab-l10-12.html#'+n,{waitUntil:'networkidle',timeout:60000});
 try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:20000})}catch(e){console.log(n,'NOT READY')}
 await p.waitForTimeout(1500);
 await p.screenshot({path:`/downloads/live83-390-p${n}.png`,fullPage:true});
 console.log(n,'shot');
 await p.close();}
await b.close();process.exit(0)})()
