const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1440,height:1760}});
 await p.goto('http://127.0.0.1:4173/ab-l10-12.html#89',{waitUntil:'networkidle',timeout:90000});
 try{await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000})}catch(e){console.log('NOT_READY')}
 await p.waitForTimeout(1200);
 await p.addStyleTag({content:'.hybridField{outline:2px solid red!important;background:rgba(255,0,0,.08)!important}.hybridWord{outline:1px solid rgba(0,80,255,.8)!important;background:rgba(0,80,255,.06)!important}.readerToolRow{display:none!important}'});
 await p.waitForTimeout(300);
 await p.screenshot({path:'/downloads/dbg1-p89-outlines.png',fullPage:true});
 await p.evaluate(()=>{const pg=document.querySelector('.page[data-page="89"]');const set=(id,v)=>{const f=pg.querySelector(`[data-field-id="${id}"]`);const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;s.call(f,v);f.dispatchEvent(new Event('input',{bubbles:true}))};set('ueb-l1','die Arbeit');set('ueb-r1','das Baby');set('notieren-1','der Urlaub');});
 await p.waitForTimeout(300);
 await p.screenshot({path:'/downloads/dbg2-p89-typed.png',fullPage:true});
 await b.close();process.exit(0);
})().catch(e=>{console.error(e.message);process.exit(1)});
