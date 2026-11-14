// usage: node scripts/kb11-p31-glasses-probe.cjs <distdir> <port> <outprefix> [interact]
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
 const open=async(p)=>{await p.goto(`http://127.0.0.1:${port}/l4-6.html#31`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(1600);};
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await open(p);
 await p.screenshot({path:outprefix+'-full.png'});
 if(interact){
  const r=await p.evaluate(()=>{const c=[...document.querySelectorAll('canvas.nkbPaint')].find(e=>e.getBoundingClientRect().width>0);if(!c)return null;const b=c.getBoundingClientRect();return{x:b.x,y:b.y,w:b.width,h:b.height}});
  console.log('paint canvas:',JSON.stringify(r));
  if(r){
   // draw a glasses shape: two circles and a bridge
   const drag=async(x1,y1,x2,y2)=>{await p.mouse.move(r.x+x1*r.w,r.y+y1*r.h);await p.mouse.down();for(let i=1;i<=8;i++)await p.mouse.move(r.x+(x1+(x2-x1)*i/8)*r.w,r.y+(y1+(y2-y1)*i/8)*r.h,{steps:2});await p.mouse.up();};
   await drag(.18,.30,.42,.55);await drag(.42,.55,.18,.62);await drag(.18,.62,.18,.30);
   await drag(.58,.30,.82,.55);await drag(.82,.55,.58,.62);await drag(.58,.62,.58,.30);
   await drag(.42,.42,.58,.42);
   await p.waitForTimeout(400);
   await p.screenshot({path:outprefix+'-drawn.png'});
   const state=await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('native-kb11-31')||'{}');return Object.keys(s).map(k=>k+':'+String(s[k]).length).join(',')});
   console.log('state:',state);
   await open(p);
   await p.screenshot({path:outprefix+'-persist.png'});
   const st2=await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('native-kb11-31')||'{}');return (s.glassesPaint||'').length});
   console.log('persist len:',st2);
  }
 }
 const p2=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await p2.goto(`http://127.0.0.1:${port}/l4-6.html#31`);
 await p2.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p2.waitForTimeout(1500);
 await p2.screenshot({path:outprefix+'-390.png'});
 await browser.close();server.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
