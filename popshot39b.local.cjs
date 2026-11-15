const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1440,height:900}});
 // 1) popup on an untouched page (p36) for the blank-button comparison
 await p.goto('http://127.0.0.1:4173/ab-a12-l17-20.html#36',{waitUntil:'networkidle',timeout:90000});
 try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){}
 await p.waitForTimeout(2500);
 await p.evaluate(()=>{const w=document.querySelector("[data-native-ab12='36'] .tapWord");w.click()});
 await p.waitForTimeout(900);
 await p.screenshot({path:'/downloads/p36-popup-cmp.png'});
 await p.evaluate(()=>{const d=document.querySelector('dialog.meaningPopup');if(d){const c=d.querySelector('.meaningClose');c&&c.click()}});
 await p.waitForTimeout(400);
 // 2) vowel tap on p39 -> dot, no popup
 await p.goto('http://127.0.0.1:4173/ab-a12-l17-20.html#39',{waitUntil:'networkidle',timeout:90000});
 try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){}
 await p.waitForTimeout(2500);
 await p.evaluate(()=>{const w=document.querySelector("[data-native-ab12='39'] [data-native-field='p39-a1-musik']");w.querySelectorAll('.naStressHit')[1].click()});
 await p.waitForTimeout(500);
 const st=await p.evaluate(()=>({dlg:!!document.querySelector('dialog.meaningPopup[open]'),val:document.querySelector("[data-native-ab12='39'] [data-native-field='p39-a1-musik']").getAttribute('data-value')}));
 console.log(JSON.stringify(st));
 await p.screenshot({path:'/downloads/p39-vowel-tap.png',fullPage:true});
 await b.close();process.exit(0);
})().catch(e=>{console.error(e.message);process.exit(1)});
