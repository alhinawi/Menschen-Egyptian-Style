const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve('/home/sandbox/Menschen-Egyptian-Style');
const server=http.createServer((q,r)=>{let f=path.join(root,'dist',decodeURIComponent(q.url.split('?')[0]));try{const ext=path.extname(f);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'})[ext]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{
 await new Promise(r=>server.listen(5235,r));
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1150,height:1700}});
 await p.goto('http://127.0.0.1:5235/ab-a12-l17-20.html#57');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000});
 const info=await p.evaluate(()=>{
   const out={imgs:[],texts:0,radios:0};
   document.querySelectorAll('img').forEach(i=>{if(i.src.includes('p57')||i.src.includes('ab-a12-p'))out.imgs.push(i.src.split('/').slice(-2).join('/')+' @'+i.getBoundingClientRect().y)});
   out.canvases=document.querySelectorAll('[data-native-ab12="57"]').length;
   out.texts=document.querySelectorAll('[data-native-ab12="57"] .naText').length;
   out.radios=document.querySelectorAll('[data-native-ab12="57"] input.naRDot').length;
   const cs=getComputedStyle(document.querySelector('[data-native-ab12="57"] input.naRDot'));
   out.radioW=cs.width;
   return out;
 });
 console.log(JSON.stringify(info,null,1));
 await b.close(); server.close();
})();
