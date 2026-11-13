const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const ctx=await browser.newContext({viewport:{width:390,height:844}});
 const p=await ctx.newPage();
 await p.goto(`https://germani.pages.dev/ab-a12-l17-20.html?cb=${Date.now()}#45`,{waitUntil:'networkidle',timeout:60000});
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000});
 const el=p.locator(`[data-native-ab12="45"] .naCanvas`).first();
 await el.waitFor({timeout:20000});
 await el.scrollIntoViewIfNeeded();
 await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(1500);
 const info=await p.evaluate(()=>{
   const c=document.querySelector("[data-native-ab12='45'] .naCanvas");
   if(!c) return 'no canvas';
   const t=c.querySelector('.naSansT45');
   const r={titleFound:!!t};
   if(t){const cs=getComputedStyle(t);r.font=cs.fontFamily;r.size=cs.fontSize;r.weight=cs.fontWeight;r.text=t.textContent}
   r.audioChips=[...c.querySelectorAll('.naAudio')].map(a=>{const b=a.getBoundingClientRect();const cb=c.getBoundingClientRect();const k=1072/cb.width;return{x:Math.round((b.left-cb.left)*k),y:Math.round((b.top-cb.top)*k),w:Math.round(b.width*k),txt:a.textContent.trim().slice(0,30)}});
   return r;
 });
 console.log(JSON.stringify(info,null,1));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
