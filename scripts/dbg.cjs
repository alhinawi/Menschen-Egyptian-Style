const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http');
const root='/home/sandbox/menschen';
const server=http.createServer((q,r)=>{let f=path.join(root,'dist',q.url.split('?')[0]);try{r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{
 await new Promise(r=>server.listen(5235,r));
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1400,height:1700}});
 await p.goto('http://127.0.0.1:5235/ab-a12-l13-16.html#18');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.addStyleTag({content:'.nativeAB12{width:1071px!important;height:1490px!important}html,body,.page,main,#viewport,#root,[class*=reader]{max-width:none!important}'});
 await p.waitForTimeout(700);
 const info=await p.evaluate(()=>{
  const c=document.querySelector('.naCanvas');const r=c.getBoundingClientRect();
  const chain=[];let el=c;
  while(el){const cs=getComputedStyle(el);if(cs.overflow!=='visible'||cs.overflowX!=='visible'||cs.overflowY!=='visible')chain.push({tag:el.tagName,cls:el.className,ov:cs.overflow,ovx:cs.overflowX,w:el.getBoundingClientRect().width});el=el.parentElement}
  const txt=[...document.querySelectorAll('.naText')].find(e=>e.textContent.includes('Meine Sprache'));
  return {canvasRect:{x:r.x,y:r.y,w:r.width,h:r.height},transform:getComputedStyle(c).transform,chain,txtRect:txt.getBoundingClientRect(),txtStyle:getComputedStyle(txt).fontSize};
 });
 console.log(JSON.stringify(info,null,1));
 await b.close();server.close();
})().catch(e=>{console.error(e);process.exit(1)});
