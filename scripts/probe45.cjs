const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve('/home/sandbox/Menschen-Egyptian-Style');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);
 try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 await new Promise(r=>server.listen(5199,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await p.goto('http://127.0.0.1:5199/ab-a12-l17-20.html#45');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.evaluate(()=>document.fonts.ready.then(()=>1));await p.waitForTimeout(400);
 const out=await p.evaluate(()=>{
  const cv=document.querySelector("[data-native-ab12='45'] .naCanvas");
  const rows=[];
  cv.querySelectorAll('.naText,.naTitle').forEach(el=>{
   const cs=getComputedStyle(el);const r=el.getBoundingClientRect();const cr=cv.getBoundingClientRect();
   const k=cr.width/1072;
   rows.push({t:(el.textContent||'').slice(0,28),cls:el.className.replace('naText ','').slice(0,30),fs:cs.fontSize,fam:cs.fontFamily.slice(0,22),ls:cs.letterSpacing,x:+( (r.left-cr.left)/k).toFixed(1),y:+((r.top-cr.top)/k).toFixed(1),w:+(r.width/k).toFixed(1)});
  });
  return rows;
 });
 for(const r of out)console.log(JSON.stringify(r));
 await browser.close();server.close();
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
