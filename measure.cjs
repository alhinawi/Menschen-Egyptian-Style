const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox','--allow-file-access-from-files']});
const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('file://'+require('node:path').join('/downloads/repo','ab-a12-l13-16.html'));await p.waitForTimeout(200);
for(let i=0;i<30;i++){await p.evaluate(i=>bookPage(i),i);await p.waitForTimeout(15);
const [s,c]=await p.evaluate(i=>[menschenPages[i].scrollHeight,menschenPages[i].clientHeight],i);
if(s>c+2)console.log('page',i+6,'overflow',s-c);}
await b.close()})();
