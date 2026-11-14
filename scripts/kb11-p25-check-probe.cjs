// usage: node scripts/kb11-p25-check-probe.cjs <distdir> <port> <outprefix>
// Seeds the correct reachable matching state (incl. the fixed example 1), clicks the t2 check, reports the verdict.
const{chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json'};
(async()=>{
 const[distdir,port,outprefix,vp]=process.argv.slice(2);
 const dir=path.resolve(root,distdir);
 const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(dir,url==='/'?'index.html':url);
 try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
 await new Promise(r=>server.listen(+port,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage(vp==='390'?{viewport:{width:390,height:844},isMobile:true,hasTouch:true}:{viewport:{width:1150,height:1600}});
 await p.addInitScript(()=>{localStorage.setItem('native-kb11-25',JSON.stringify({'t2a-0':'0','t2a-1':'0,1','t2b-0':'0,1,2,4','t2b-1':'3'}))});
 await p.goto(`http://127.0.0.1:${port}/l4-6.html#25`);
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.waitForTimeout(1800);
 const state=await p.evaluate(()=>JSON.parse(localStorage.getItem('native-kb11-25')));
 console.log('seeded:',JSON.stringify(state));
 const btn=await p.evaluate(()=>{
  const els=[...document.querySelectorAll('[data-native-page="25"] .nkbCheckLm button, [data-native-page="25"] .nkbCheck button')].filter(e=>e.getBoundingClientRect().width>0);
  return els.map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}});
 });
 console.log('check buttons:',JSON.stringify(btn));
 // the t2 check is the one near left 19.5% top 90.3%
 const target=btn[btn.length-1];
 await p.mouse.click(target.x+target.w/2,target.y+target.h/2);
 await p.waitForTimeout(600);
 const out=await p.evaluate(()=>{
  const els=[...document.querySelectorAll('[data-native-page="25"] output')].filter(e=>e.getBoundingClientRect().width>0);
  return els.map(e=>e.textContent);
 });
 console.log('outputs after click:',JSON.stringify(out));
 await p.screenshot({path:outprefix+'-checked.png'});
 await browser.close();server.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
