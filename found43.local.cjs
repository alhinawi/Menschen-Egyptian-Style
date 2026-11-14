const {chromium}=require('playwright');
const MARK=`(async()=>{const scope="[data-native-ab12='43']";
await new Promise(r=>setTimeout(r,2000));
const q=f=>document.querySelector(scope+" [data-soup-frag='"+f+"']");
const pairs=[['kop','fe'],['hael','se'],['fin','ger'],['rue','cken'],['bau','che'],['bei','nea'],['fue','sse'],['oh','ren'],['au','gen'],['ar','me'],['haen','de'],['zaeh','neb']];
q('knie').click();await new Promise(r=>setTimeout(r,150));
for(const [a,b] of pairs){q(a).click();await new Promise(r=>setTimeout(r,120));q(b).click();await new Promise(r=>setTimeout(r,120));}
return 'found';})()`;
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 for(const [vp,ctx] of [['desktop',{viewport:{width:1440,height:900}}],['mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true}]]){
  const p=await b.newPage(ctx);
  await p.goto('http://127.0.0.1:4173/ab-a12-l17-20.html#43',{waitUntil:'networkidle',timeout:90000});
  try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){console.log('NOT_READY')}
  await p.waitForTimeout(1200);
  console.log(await p.evaluate(MARK));
  await p.waitForTimeout(400);
  await p.screenshot({path:`/downloads/p43found-${vp}-p43.png`,fullPage:true});
  console.log('shot',vp);
  await p.close();
 }
 await b.close();process.exit(0);
})().catch(e=>{console.error(e.message);process.exit(1)});
