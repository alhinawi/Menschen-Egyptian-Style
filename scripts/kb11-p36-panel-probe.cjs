// usage: node scripts/kb11-p36-panel-probe.cjs <distdir> <port> <outprefix>
const{chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json'};
(async()=>{
 const[distdir,port,outprefix]=process.argv.slice(2);
 const dir=path.resolve(root,distdir);
 const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(dir,url==='/'?'index.html':url);
 try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
 await new Promise(r=>server.listen(+port,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const open=async(p,vw)=>{await p.goto(`http://127.0.0.1:${port}/l4-6.html#36`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(1600);};
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await open(p);
 await p.screenshot({path:outprefix+'-full.png'});
 const btn=await p.evaluate(()=>{const b=[...document.querySelectorAll('.nkb36Open')].find(e=>e.getBoundingClientRect().width>0);if(!b)return null;const r=b.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}});
 console.log('open button:',JSON.stringify(btn));
 // open panel
 await p.mouse.click(btn.x+btn.w/2,btn.y+btn.h/2);
 await p.waitForTimeout(300);
 console.log('panel visible:',await p.evaluate(()=>{const e=[...document.querySelectorAll('.nkb36PanelF')].find(x=>x.getBoundingClientRect().width>0);return !!e}));
 await p.screenshot({path:outprefix+'-open.png'});
 // close via X
 await p.evaluate(()=>{[...document.querySelectorAll('.nkb36Close')].find(x=>x.getBoundingClientRect().width>0).click()});
 await p.waitForTimeout(200);
 console.log('closed via X:',await p.evaluate(()=>![...document.querySelectorAll('.nkb36PanelF')].some(x=>x.getBoundingClientRect().width>0)));
 // reopen, fill all correct but one, check, then fix, check
 await p.mouse.click(btn.x+btn.w/2,btn.y+btn.h/2);
 await p.waitForTimeout(200);
 const ans={'t9a-a1':'Brenner IT-Consulting.','t9a-a2':'Schmidt.','t9a-a3':'Christian Schmidt.','t9a-b1':'Guten Tag, hier ist Marlene Neumann.','t9a-b2':'Hallo, hier ist Marlene.','t9a-v1':'Tschüs.','t9a-v2':'Auf Wiederhören.'};
 for(const[id,val]of Object.entries(ans))await p.selectOption(`select[aria-label="${id}"]`,id==='t9a-a2'?'Christian Schmidt.':val);
 await p.evaluate(()=>{const b=[...document.querySelectorAll('.nkb36PanelF .nkbCheck button')].find(e=>e.getBoundingClientRect().width>0);b.click()});
 await p.waitForTimeout(200);
 console.log('verdict wrong:',await p.evaluate(()=>[...document.querySelectorAll('.nkb36PanelF .nkbCheck output')].map(o=>o.textContent).join('|')));
 await p.selectOption('select[aria-label="t9a-a2"]','Schmidt.');
 await p.evaluate(()=>{const b=[...document.querySelectorAll('.nkb36PanelF .nkbCheck button')].find(e=>e.getBoundingClientRect().width>0);b.click()});
 await p.waitForTimeout(200);
 console.log('verdict right:',await p.evaluate(()=>[...document.querySelectorAll('.nkb36PanelF .nkbCheck output')].map(o=>o.textContent).join('|')));
 await p.screenshot({path:outprefix+'-filled.png'});
 // close via outside tap (backdrop)
 await p.mouse.click(500,60);
 await p.waitForTimeout(200);
 console.log('closed via outside:',await p.evaluate(()=>![...document.querySelectorAll('.nkb36PanelF')].some(x=>x.getBoundingClientRect().width>0)));
 // persistence across reload
 await open(p);
 const kept=await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('native-kb11-36')||'{}');return Object.keys(s).filter(k=>k.startsWith('t9a-')).length});
 console.log('persisted keys:',kept);
 // 390px
 const p2=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await open(p2);
 await p2.screenshot({path:outprefix+'-390.png'});
 const b2=await p2.evaluate(()=>{const b=[...document.querySelectorAll('.nkb36Open')].find(e=>e.getBoundingClientRect().width>0);if(!b)return null;const r=b.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}});
 console.log('390 open button:',JSON.stringify(b2));
 await p2.touchscreen.tap(b2.x+b2.w/2,b2.y+b2.h/2);
 await p2.waitForTimeout(300);
 await p2.screenshot({path:outprefix+'-390-open.png'});
 const selH=await p2.evaluate(()=>{const s=[...document.querySelectorAll('.nkb36PanelF select')].find(e=>e.getBoundingClientRect().width>0);if(!s)return null;const r=s.getBoundingClientRect();return{w:r.width,h:r.height}});
 console.log('390 select size:',JSON.stringify(selH));
 await browser.close();server.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
