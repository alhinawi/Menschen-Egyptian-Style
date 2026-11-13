const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root='/home/sandbox/Menschen-Egyptian-Style';
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'};
const server=http.createServer((req,res)=>{
 const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);
 try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}
});
(async()=>{
 await new Promise(r=>server.listen(5198,'127.0.0.1',r));
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1150,height:1600}});
 await p.goto('http://127.0.0.1:5198/ab-a12-l17-20.html?native=43',{waitUntil:'networkidle'});
 await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(800);
 const out=await p.evaluate(()=>{
  const res=[];
  document.querySelectorAll("[data-native-ab12='43'] .naCanvas div").forEach(d=>{
   const t=d.textContent.trim();
   if(['head','arm','finger','leg','eye','knee','hand','Kopf','Bein','Auge','Englisch','Deutsch'].includes(t)&&d.children.length<=2){
    const cs=getComputedStyle(d);
    const sp=d.querySelector('span');
    const scs=sp?getComputedStyle(sp):null;
    res.push({t,ff:cs.fontFamily.slice(0,50),fw:cs.fontWeight,fs:cs.fontSize,spanff:scs?scs.fontFamily.slice(0,50):null,spanfw:scs?scs.fontWeight:null});
   }
  });
  return res;
 });
 console.log(JSON.stringify(out));
 await b.close(); server.close();
})();
