const {chromium}=require('playwright');const{spawn}=require('child_process');
(async()=>{const v=spawn('npx',['vite','--port','5223','--strictPort'],{cwd:__dirname+'/../..',stdio:'pipe'});
await new Promise(r=>{v.stdout.on('data',d=>{if(String(d).includes('Local:'))r()})});
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:901,height:1300}});
await p.goto('http://127.0.0.1:5223/ab-l10-12.html#79');
await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const r=await p.evaluate(()=>{const el=document.querySelector('[data-native-field="u4-c1"]');const cs=getComputedStyle(el);return{border:cs.border,borderBottom:cs.borderBottomWidth+' '+cs.borderBottomStyle+' '+cs.borderBottomColor,bg:cs.backgroundColor,cls:el.className}});
console.log(JSON.stringify(r,null,1));
// compare with a passed page field if any on 76
await p.goto('http://127.0.0.1:5223/ab-l10-12.html#76');
await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const r2=await p.evaluate(()=>{const el=document.querySelector('.mField');if(!el)return null;const cs=getComputedStyle(el);return{border:cs.border,bg:cs.backgroundColor,cls:el.className}});
console.log('p76:',JSON.stringify(r2));
await b.close();v.kill();process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
