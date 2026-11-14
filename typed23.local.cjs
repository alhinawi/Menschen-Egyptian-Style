const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
for(const [vp,tag] of [[{width:1440,height:900},'desktop'],[{width:390,height:844},'mobile']]){
 const p=await b.newPage({viewport:vp});
 await p.goto(process.argv[2],{waitUntil:'networkidle',timeout:90000});
 try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){}
 await p.waitForTimeout(1500);
 await p.evaluate(payload=>{
  for(const [id,val] of Object.entries(payload.inputs)){const i=document.querySelector(`[data-native-field="${id}"]`);if(i){Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set.call(i,val);i.dispatchEvent(new Event('input',{bubbles:true}));}}
  for(const [id,val] of Object.entries(payload.texts)){const i=document.querySelector(`[data-native-field="${id}"]`);if(i){Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'value').set.call(i,val);i.dispatchEvent(new Event('input',{bubbles:true}));}}
 },{inputs:{'23-1-l1':'مكتبة','23-1-r1':'Mensch'},texts:{'23-2-text':'der Bahnhof\ndie Apotheke'}});
 await p.waitForTimeout(300);
 await p.evaluate(()=>{document.querySelector('.naCheck[data-check="23-save"] button')?.click();document.querySelector('.naCheck[data-check="23-n-save"] button')?.click();});
 await p.waitForTimeout(300);
 if(tag==='desktop'){
  console.log('STATE:',await p.evaluate(()=>{const o={};document.querySelectorAll('.naCheck[data-check^="23-"]').forEach(el=>o[el.dataset.check]={text:el.querySelector('output')?.textContent,placed:el.dataset.checkPlaced});return JSON.stringify(o);}));
 }
 await p.reload({waitUntil:'networkidle'});
 try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){}
 await p.waitForTimeout(1500);
 if(tag==='desktop'){
  console.log('AFTER RELOAD:',await p.evaluate(()=>JSON.stringify({l1:document.querySelector('[data-native-field="23-1-l1"]')?.value,n1:document.querySelector('[data-native-field="23-2-text"]')?.value})));
 }
 await p.evaluate(()=>{for(const el of document.querySelectorAll('body *')){const cs=getComputedStyle(el);if((cs.position==='fixed'||cs.position==='sticky')&&!el.closest('.naCanvas')&&!el.contains(document.querySelector('.naCanvas')))el.style.visibility='hidden';}});
 await p.waitForTimeout(200);
 await p.screenshot({path:`/downloads/p23-typed-${tag}.png`,fullPage:true});
 await p.close();
}
await b.close();process.exit(0);})().catch(e=>{console.error(e.message);process.exit(1)});
