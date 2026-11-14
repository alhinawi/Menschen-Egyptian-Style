const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
for(const [vp,tag] of [[{width:1440,height:900},'desktop'],[{width:390,height:844},'mobile']]){
 const p=await b.newPage({viewport:vp});
 await p.goto(process.argv[2],{waitUntil:'networkidle',timeout:90000});
 try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){}
 await p.waitForTimeout(1500);
 await p.evaluate(async()=>{
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const setF=async(id,val)=>{const i=document.querySelector(`[data-native-ab12="24"] [data-native-field="${id}"]`);if(i){Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set.call(i,val);i.dispatchEvent(new Event('input',{bubbles:true}));}await sleep(90);};
  for(const [id,val] of [['p24-2-couch','Wohnzimmer'],['p24-2-toilette','Bad'],['p24-2-computer','Arbeitszimmer'],['p24-2-kuehlschrank','Küche'],['p24-2-auto','Garage'],['p24-2-bett','Schlafzimmer']]) await setF(id,val);
  const words={ 'p24-3w1':'ZENTRUM','p24-3w2':'KÜCHE','p24-3w3':'MIETE','p24-3w4':'STOCK','p24-3w5':'NACHBARIN'};
  for(const [id,word] of Object.entries(words)){for(let idx=0;idx<word.length;idx++){await setF(id+'-'+(idx+1),word[idx]);}}
 });
 await p.waitForTimeout(400);
 await p.evaluate(()=>{document.querySelector('[data-native-ab12="24"] .naCheck[data-check="g4"] button')?.click();document.querySelector('[data-native-ab12="24"] .naCheck[data-check="g5"] button')?.click();});
 await p.waitForTimeout(300);
 if(tag==='desktop'){
  console.log('STATE:',await p.evaluate(()=>{const o={};['g4','g5'].forEach(id=>{const el=document.querySelector(`[data-native-ab12="24"] .naCheck[data-check="${id}"]`);o[id]={text:el?.querySelector('output')?.textContent,placed:el?.dataset.checkPlaced||null};});return JSON.stringify(o);}));
  // cell alignment: char centers vs expected cell centers (art at 158,780; cells 32 wide from x=127+32k center 143+32k... w1 starts x=285)
  console.log('CELLS:',await p.evaluate(()=>{
   const f=document.querySelector('[data-native-field="p24-3w1-1"]');const b=f.getBoundingClientRect();
   const cv=f.closest('.naCanvas').getBoundingClientRect();const sc=cv.width/1071;
   return JSON.stringify({sc:+sc.toFixed(3),w:+(b.width/sc).toFixed(1),h:+(b.height/sc).toFixed(1),left:+((b.left-cv.left)/sc).toFixed(1),top:+((b.top-cv.top)/sc).toFixed(1)});
  }));
 }
 await p.reload({waitUntil:'networkidle'});
 try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){}
 await p.waitForTimeout(1500);
 if(tag==='desktop'){
  console.log('AFTER RELOAD:',await p.evaluate(()=>JSON.stringify({couch:document.querySelector('[data-native-ab12="24"] [data-native-field="p24-2-couch"]')?.value,w1:[1,2,3].map(i=>document.querySelector(`[data-native-ab12="24"] [data-native-field="p24-3w1-${i}"]`)?.value).join('')})));
 }
 await p.evaluate(()=>{for(const el of document.querySelectorAll('body *')){const cs=getComputedStyle(el);if((cs.position==='fixed'||cs.position==='sticky')&&!el.closest('.naCanvas')&&!el.contains(document.querySelector('.naCanvas')))el.style.visibility='hidden';}});
 await p.waitForTimeout(200);
 await p.screenshot({path:`/downloads/p24-typed-${tag}.png`,fullPage:true});
 await p.close();
}
await b.close();process.exit(0);})().catch(e=>{console.error(e.message);process.exit(1)});
