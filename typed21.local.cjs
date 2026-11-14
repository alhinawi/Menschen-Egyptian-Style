const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const vals={'p21-f3w':'Bibliothek','p21-f3a':'X','p21-f3b':'مكتبة','p21-f3c':'X','p21-f4w':'Café','p21-f4a':'مقهى','p21-f4b':'X','p21-f4c':'nein'};
for(const [vp,out] of [[{width:1440,height:900},'typed-desktop'],[{width:390,height:844},'typed-mobile']]){
 const p=await b.newPage({viewport:vp});
 await p.goto(process.argv[2],{waitUntil:'networkidle',timeout:90000});
 try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){}
 await p.waitForTimeout(1500);
 await p.evaluate(v=>{for(const [id,val] of Object.entries(v)){const i=document.querySelector(`[data-native-field="${id}"]`);if(i){Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set.call(i,val);i.dispatchEvent(new Event('input',{bubbles:true}));}}},vals);
 await p.waitForTimeout(300);
 await p.evaluate(()=>{for(const el of document.querySelectorAll('body *')){const cs=getComputedStyle(el);if((cs.position==='fixed'||cs.position==='sticky')&&!el.closest('.naCanvas')&&!el.contains(document.querySelector('.naCanvas')))el.style.visibility='hidden';}});
 await p.waitForTimeout(200);
 // geometry: field boxes vs printed rules
 if(vp.width===1440){
  const geo=await p.evaluate(()=>{const c=document.querySelector('.naCanvas').getBoundingClientRect();const sc=c.width/1071;const f=id=>{const el=document.querySelector(`[data-native-field="${id}"]`);const b=el.getBoundingClientRect();return [Math.round((b.top-c.top)/sc),Math.round((b.bottom-c.top)/sc)];};return JSON.stringify({f3w:f('p21-f3w'),f3c:f('p21-f3c'),f4w:f('p21-f4w'),f4c:f('p21-f4c')});});
  console.log('GEO (top,bottom; rules at 705/735/764):',geo);
 }
 await p.screenshot({path:`/downloads/p21-${out}.png`});
 await p.close();
}
await b.close();process.exit(0);})().catch(e=>{console.error(e.message);process.exit(1)});
