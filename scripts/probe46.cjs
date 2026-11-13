const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve('/home/sandbox/Menschen-Egyptian-Style');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);
 try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 await new Promise(r=>server.listen(5199,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await p.goto('http://127.0.0.1:5199/ab-a12-l17-20.html#46');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.evaluate(()=>document.fonts.ready.then(()=>1));await p.waitForTimeout(700);
 const out=await p.evaluate(()=>{
  const cv=document.querySelector("[data-native-ab12='46'] .naCanvas");
  const cr=cv.getBoundingClientRect();const k=cr.width/1072;
  const res=[];
  cv.querySelectorAll('.naText,.naTitle,.naSide,.naHand,.naRed46,.naTipB46,.naPkt46,.naFooter46').forEach(el=>{
   const spans=el.querySelectorAll('.tapWord');
   const box=spans.length?spans[0]:el;
   const all=spans.length?spans:[el];
   const f=all[0].getBoundingClientRect(),l=all[all.length-1].getBoundingClientRect();
   res.push({t:(el.textContent||'').slice(0,30),c:el.className.replace('naText','').replace('naTitle','T').trim().slice(0,30),
     fs:getComputedStyle(el).fontSize,divY:+el.style.top.replace('px',''),divX:+el.style.left.replace('px',''),
     x0:+((f.left-cr.left)/k).toFixed(1),x1:+((l.right-cr.left)/k).toFixed(1),
     y0:+((f.top-cr.top)/k).toFixed(1),y1:+((f.bottom-cr.top)/k).toFixed(1)});
  });
  return res;
 });
 for(const r of out)console.log(JSON.stringify(r));
 await browser.close();server.close();
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
