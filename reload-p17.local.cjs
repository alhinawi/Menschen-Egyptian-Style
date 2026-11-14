const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto(process.argv[2],{waitUntil:'networkidle',timeout:90000});
try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){}
await p.waitForTimeout(1500);
await p.evaluate(()=>{const set=(id,v)=>{const i=document.querySelector(`[data-field-id="${id}"]`);Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set.call(i,v);i.dispatchEvent(new Event('input',{bubbles:true}));};set('p17-a1','بيت');set('p17-c1','das Haus');set('p17-n1','der Garten');});
await p.waitForTimeout(400);
await p.reload({waitUntil:'networkidle'});
try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){}
await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const v=id=>{const el=document.querySelector(`[data-field-id="${id}"]`);return el?el.value:'MISSING';};return 'a1='+v('p17-a1')+' | c1='+v('p17-c1')+' | n1='+v('p17-n1');});
console.log('RELOAD-PERSIST:',r);
await b.close();process.exit(0);})().catch(e=>{console.error(e.message);process.exit(1)});
