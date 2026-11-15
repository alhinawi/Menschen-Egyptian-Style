// Tap the Köp and fe art overlays, verify Köpfe found state, shoot first-row crops.
const { chromium } = require('playwright');
(async()=>{
 const b = await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 for (const [vp, size] of [['desktop',{width:1280,height:900}],['mobile',{width:390,height:844}]]){
  const p = await (await b.newContext({viewport:size})).newPage();
  await p.goto('http://127.0.0.1:4173/ab-a12-l17-20.html#43');
  await p.waitForSelector("[data-native-ab12='43'] [data-soup-frag='kop']", {timeout:15000});
  const scope = "[data-native-ab12='43'] ";
  await p.click(scope+"span[data-soup-frag='kop']");
  await p.click(scope+"span[data-soup-frag='fe']");
  await p.waitForTimeout(300);
  const state = await p.evaluate(()=>{
   const q = s=>document.querySelector("[data-native-ab12='43'] "+s);
   return {
    stored: JSON.parse(localStorage.getItem('native-ab12-43')||'{}'),
    kopFound: q("span[data-soup-frag='kop']").className,
    feFound: q("span[data-soup-frag='fe']").className,
    textFragFound: q("button[data-soup-frag='kop']").className
   };
  });
  console.log(vp, JSON.stringify(state));
  const row = await p.$(scope+"span[data-soup-frag='kop']");
  const box = await row.boundingBox();
  const clip = {x:Math.max(0,box.x-90), y:Math.max(0,box.y-14), width:560, height:64};
  await p.screenshot({path:`/downloads/p43kopfe-${vp}.png`, clip});
 }
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
