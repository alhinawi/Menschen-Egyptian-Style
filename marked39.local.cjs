const {chromium}=require('playwright');
const MARK=`(async()=>{const scope="[data-native-ab12='39']";
await new Promise(r=>setTimeout(r,2500));
const correct={'p39-a1-komponieren':2,'p39-a1-interessant':3,'p39-a1-musik':1,'p39-a1-elegant':2,'p39-a1-instrument':2,'p39-a1-technik':0,'p39-a1-studieren':1,'p39-a1-akademie':3,'p39-a1-familie':1,'p39-a1-politiker':0,'p39-a1-produktion':3};
for(const [id,vi] of Object.entries(correct)){const w=document.querySelector(scope+" [data-native-field='"+id+"']");const hits=w.querySelectorAll('.naStressHit');hits[vi].click();await new Promise(r=>setTimeout(r,150));}
return 'marked';})()`;
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 for(const [vp,ctx] of [['desktop',{viewport:{width:1440,height:900}}],['mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true}]]){
  const p=await b.newPage(ctx);
  await p.goto('http://127.0.0.1:4173/ab-a12-l17-20.html#39',{waitUntil:'networkidle',timeout:90000});
  try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){console.log('NOT_READY')}
  await p.waitForTimeout(1200);
  console.log(await p.evaluate(MARK));
  await p.waitForTimeout(400);
  await p.screenshot({path:`/downloads/p39marked-${vp}-p39.png`,fullPage:true});
  console.log('shot',vp);
  await p.close();
 }
 await b.close();process.exit(0);
})().catch(e=>{console.error(e.message);process.exit(1)});
