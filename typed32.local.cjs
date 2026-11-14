const {chromium}=require('playwright');
const TYPE=`(async()=>{const scope="[data-native-ab12='32']";
const set=async(id,val)=>{const el=document.querySelector(scope+" [data-native-field='"+id+"']");const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;s.call(el,val);el.dispatchEvent(new Event('input',{bubbles:true}));await new Promise(r=>setTimeout(r,70));};
await set('p32-9b1','Kein Problem, wir verschieben den Termin natürlich.');
await set('p32-9b2','Ich habe am Mittwoch Zeit.');
await set('p32-9b3','Passt 15 Uhr?');
await set('p32-9b4','');
await set('p32-9b5','Grüße, Chris');
await set('p32-10-0','b');await set('p32-10-1','c');await set('p32-10-2','f');await set('p32-10-4','d');await set('p32-10-5','e');
return 'typed';})()`;
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 for(const [vp,ctx] of [['desktop',{viewport:{width:1440,height:900}}],['mobile',{viewport:{width:390,height:844},isMobile:true,hasTouch:true}]]){
  const p=await b.newPage(ctx);
  await p.goto('http://127.0.0.1:4173/ab-a12-l13-16.html#32',{waitUntil:'networkidle',timeout:90000});
  try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){console.log('NOT_READY')}
  await p.waitForTimeout(1200);
  console.log(await p.evaluate(TYPE));
  await p.waitForTimeout(400);
  await p.screenshot({path:`/downloads/p32typed-${vp}-p32.png`,fullPage:true});
  console.log('shot',vp);
  await p.close();
 }
 await b.close();process.exit(0);
})().catch(e=>{console.error(e.message);process.exit(1)});
