const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage();
 const errs=[];
 p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
 await p.goto('http://127.0.0.1:4173/ab-l10-12.html#97',{waitUntil:'networkidle',timeout:60000}).catch(e=>errs.push('NAV: '+e.message));
 await p.waitForTimeout(4000);
 console.log(errs.slice(0,10).join('\n---\n')||'no errors captured');
 await b.close();process.exit(0);
})().catch(e=>{console.error(e.message);process.exit(1)});
