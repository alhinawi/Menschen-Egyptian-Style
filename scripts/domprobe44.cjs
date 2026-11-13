const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 await new Promise(r=>server.listen(5197,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await p.goto('http://127.0.0.1:5197/ab-a12-l17-20.html#44');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(800);
 const info=await p.evaluate(()=>{
  const cv=document.querySelector("[data-native-ab12='44'] .naCanvas");
  const cr=cv.getBoundingClientRect();
  const tr=cv.style.transform;
  const out={canvas:{l:cr.left,t:cr.top,w:cr.width,tr}};
  document.querySelectorAll("[data-native-ab12='44'] .naText").forEach((el,i)=>{
    const r=el.getBoundingClientRect();
    if(r.top>cr.top+600&&r.top<cr.top+930&&r.left<cr.left+700)
      out['t'+i]={txt:el.textContent.slice(0,22),x:Math.round(r.left-cr.left),y:Math.round(r.top-cr.top),w:Math.round(r.width),h:Math.round(r.height),fs:getComputedStyle(el).fontSize};
  });
  return out;
 });
 console.log(JSON.stringify(info,null,1));
 await browser.close();server.close();
})().catch(e=>{console.error(e);process.exitCode=1});
