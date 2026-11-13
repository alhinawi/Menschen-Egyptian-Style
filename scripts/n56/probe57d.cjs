const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve('/home/sandbox/Menschen-Egyptian-Style');
const server=http.createServer((q,r)=>{let f=path.join(root,'dist',decodeURIComponent(q.url.split('?')[0]));try{const ext=path.extname(f);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'})[ext]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{
 await new Promise(r=>server.listen(5235,r));
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1150,height:1700},deviceScaleFactor:2});
 await p.goto('http://127.0.0.1:5235/ab-a12-l17-20.html#57');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000});
 const e=p.locator('[data-native-ab12="57"] .naText', {hasText:'Entschuldigen Sie!'}).first();
 await e.screenshot({path:'/downloads/dlg-el-dsf2.png'});
 const b2=await b.newPage({viewport:{width:1150,height:1700}});
 const p2=b2; // reuse
 await b.close(); server.close(); console.log('ok');
})();
