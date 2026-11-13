const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve('/home/sandbox/Menschen-Egyptian-Style');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 await new Promise(r=>server.listen(5292,'127.0.0.1',r));
 const b=await chromium.launch({args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:390,height:900},isMobile:true,hasTouch:true});
 await p.goto('http://127.0.0.1:5292/ab-l10-12.html#88');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.locator('[data-native-ab11-page="88"]').first().waitFor({timeout:15000});
 await p.waitForTimeout(700);
 const info=await p.evaluate(()=>{
  const host=document.querySelector('[data-native-ab11-page="88"]');
  const canvas=host.querySelector('.nabCanvas');
  const nums=[...host.querySelectorAll('.mNumber')].map(el=>({t:el.textContent,top:el.style.top,left:el.style.left}));
  const g=[...host.querySelectorAll('.sharedMatchItem')].find(el=>el.textContent.includes('Zimmer'));
  const t2=[...host.querySelectorAll('.mTitle')].find(el=>el.textContent.includes('Perfekt'));
  const chain=[];let el=host;while(el&&chain.length<8){const cs=getComputedStyle(el);chain.push({cls:el.className&&String(el.className).slice(0,60),tag:el.tagName,w:el.clientWidth,h:el.clientHeight,pos:cs.position});el=el.parentElement}
  return {hostW:host.clientWidth,hostH:host.clientHeight,canvasW:canvas.offsetWidth,canvasH:canvas.offsetHeight,canvasStyle:canvas.getAttribute('style'),nums,gTop:g.style.top,gLeft:g.style.left,t2Top:t2.style.top,chain};
 });
 console.log(JSON.stringify(info,null,1));
 await b.close();server.close();
})().catch(e=>{console.error(e);process.exitCode=1});
