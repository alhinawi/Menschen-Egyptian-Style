const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve('/home/sandbox/Menschen-Egyptian-Style');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 await new Promise(r=>server.listen(5291,'127.0.0.1',r));
 const b=await chromium.launch({args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:390,height:900},isMobile:true,hasTouch:true});
 await p.goto('http://127.0.0.1:5291/ab-l10-12.html#88');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.locator('[data-native-ab11-page="88"]').first().waitFor({timeout:15000});
 await p.waitForTimeout(700);
 const info=await p.evaluate(()=>{
  const host=document.querySelector('[data-native-ab11-page="88"]');
  const canvas=host.querySelector('.nabCanvas');
  const match=host.querySelector('[data-matching="ab88-1"]');
  const items=[...match.querySelectorAll('.sharedMatchItem')].map(el=>{const r=el.getBoundingClientRect();return {t:el.textContent,x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}});
  const titles=[...host.querySelectorAll('.mNumber')].map(el=>{const r=el.getBoundingClientRect();return {t:el.textContent,y:Math.round(r.y)}});
  const hr=host.getBoundingClientRect(), cr=canvas.getBoundingClientRect();
  return {host:{y:Math.round(hr.y),h:Math.round(hr.height)},canvas:{y:Math.round(cr.y),h:Math.round(cr.height),transform:getComputedStyle(canvas).transform},items,titles};
 });
 console.log(JSON.stringify(info,null,1));
 await b.close();server.close();
})().catch(e=>{console.error(e);process.exitCode=1});
