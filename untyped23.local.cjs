const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
for(const [vp,tag] of [[{width:1440,height:900},'desktop'],[{width:390,height:844},'mobile']]){
 const p=await b.newPage({viewport:vp});
 await p.goto(process.argv[2],{waitUntil:'networkidle',timeout:90000});
 try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){}
 await p.waitForTimeout(1500);
 await p.evaluate(()=>{for(const el of document.querySelectorAll('body *')){const cs=getComputedStyle(el);if((cs.position==='fixed'||cs.position==='sticky')&&!el.closest('.naCanvas')&&!el.contains(document.querySelector('.naCanvas')))el.style.visibility='hidden';}});
 await p.waitForTimeout(200);
 await p.screenshot({path:`/downloads/p23-untyped-${tag}.png`,fullPage:true});
 await p.close();
}
await b.close();process.exit(0);})().catch(e=>{console.error(e.message);process.exit(1)});
