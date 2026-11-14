// usage: node scripts/kb11-p29-mark-probe.cjs <distdir> <port> <outprefix> [interact]
const{chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json'};
(async()=>{
 const[distdir,port,outprefix,interact]=process.argv.slice(2);
 const dir=path.resolve(root,distdir);
 const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(dir,url==='/'?'index.html':url);
 try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
 await new Promise(r=>server.listen(+port,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const open=async(p)=>{await p.goto(`http://127.0.0.1:${port}/l4-6.html#29`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(1600);};
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await open(p);
 await p.screenshot({path:outprefix+'-full.png'});
 if(interact){
  // tap two letters (first group's R and the 8 of "3 6 8")
  const btns=await p.evaluate(()=>[...document.querySelectorAll('.nkb29Mark')].filter(e=>e.getBoundingClientRect().width>0).map(e=>{const r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}}));
  console.log('mark buttons:',btns.length);
  await p.mouse.click(btns[2].x,btns[2].y);
  await p.mouse.click(btns[5].x,btns[5].y);
  await p.waitForTimeout(400);
  await p.screenshot({path:outprefix+'-marked.png'});
  const state=await p.evaluate(()=>JSON.parse(localStorage.getItem('native-kb11-29')||'{}'));
  console.log('state after marks:',JSON.stringify(state));
  await open(p);
  await p.screenshot({path:outprefix+'-persist.png'});
  const on=await p.evaluate(()=>[...document.querySelectorAll('.nkb29Mark.on')].filter(e=>e.getBoundingClientRect().width>0).length);
  console.log('marked after reload:',on);
 }
 const p2=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await p2.goto(`http://127.0.0.1:${port}/l4-6.html#29`);
 await p2.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p2.waitForTimeout(1500);
 await p2.screenshot({path:outprefix+'-390.png'});
 await browser.close();server.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
