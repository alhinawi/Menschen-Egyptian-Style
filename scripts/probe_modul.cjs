const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 await new Promise(r=>server.listen(5198,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await p.goto('http://127.0.0.1:5198/ab-a12-l17-20.html#44');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(800);
 const r=await p.evaluate(()=>{
   const el=document.querySelector("[data-native-ab12='44'] .naModul");
   const cv=document.querySelector("[data-native-ab12='44'] .naCanvas").getBoundingClientRect();
   const k=cv.width/1072;
   // measure actual text ink width via a canvas trick: use range
   const range=document.createRange();range.selectNodeContents(el);
   const rb=range.getBoundingClientRect();
   return {
     checkCond: document.fonts.check("400 12.5px FiraSansCond"),
     checkFira: document.fonts.check("400 12.5px FiraSans"),
     textWidth: rb.width/k,
     scrollWidth: el.scrollWidth/k,
     font: getComputedStyle(el).font
   };
 });
 console.log(JSON.stringify(r));
 await browser.close();process.exit(0);
})();
