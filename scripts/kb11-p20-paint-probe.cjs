// usage: node scripts/kb11-p20-paint-probe.cjs <distdir> <port> <outprefix>
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
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 const open=async()=>{await p.goto(`http://127.0.0.1:${port}/l2-3.html#20`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  await p.waitForFunction(()=>{const els=[...document.querySelectorAll('canvas.nkbPaint')];const el=els.find(e=>e.getBoundingClientRect().width>0);if(!el)return false;const a=el.getBoundingClientRect().top+'/'+el.getBoundingClientRect().left;return new Promise(res=>setTimeout(()=>res(el.getBoundingClientRect().top+'/'+el.getBoundingClientRect().left===a),400))},{polling:200,timeout:15000});
  await p.waitForTimeout(600);};
 await open();
 await p.screenshot({path:outprefix+'-full.png'});
 // paint two strokes on the live canvas
 const rect=await p.evaluate(()=>{const els=[...document.querySelectorAll('canvas.nkbPaint')];const el=els.find(e=>e.getBoundingClientRect().width>0);const r=el.getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height}});
 await p.mouse.move(rect.x+rect.w*0.3,rect.y+rect.h*0.3);await p.mouse.down();await p.mouse.move(rect.x+rect.w*0.5,rect.y+rect.h*0.45,{steps:12});await p.mouse.up();
 await p.mouse.move(rect.x+rect.w*0.6,rect.y+rect.h*0.6);await p.mouse.down();await p.mouse.move(rect.x+rect.w*0.75,rect.y+rect.h*0.75,{steps:12});await p.mouse.up();
 await p.waitForTimeout(300);
 const saved=await p.evaluate(()=>{const s=localStorage.getItem('native-kb11-20')||'';return s.length});
 console.log('SAVED_STATE_LEN',saved);
 await p.screenshot({path:outprefix+'-painted.png'});
 // reload: stroke must persist
 await open();
 await p.screenshot({path:outprefix+'-persist.png'});
 const stillThere=await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('native-kb11-20')||'{}');return (s.mapPaint||'').length>100});
 console.log('PERSISTED',stillThere);
 // clear
 await p.evaluate(()=>{const els=[...document.querySelectorAll('.nkbPaintTools button')];const el=els.find(e=>e.getBoundingClientRect().width>0&&e.textContent==='Löschen');el.click()});
 await p.waitForTimeout(300);
 const cleared=await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('native-kb11-20')||'{}');return !s.mapPaint});
 console.log('CLEARED',cleared);
 // 390 shot
 const p2=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await p2.goto(`http://127.0.0.1:${port}/l2-3.html#20`);
 await p2.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p2.waitForTimeout(1500);
 await p2.screenshot({path:outprefix+'-390.png'});
 await browser.close();server.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
