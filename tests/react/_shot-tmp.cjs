const{chromium}=require('playwright'),fs=require('fs'),http=require('http'),path=require('path');
const root='/downloads/menschen';
const server=http.createServer((q,r)=>{try{const f=path.join(root,'dist',q.url.split('?')[0]==='/'?'/index.html':q.url.split('?')[0]);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{
 const [pageNo,vw,vh]=[process.argv[2]||'66',+(process.argv[3]||807),+(process.argv[4]||1132)];
 await new Promise(r=>server.listen(5421,r));
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:vw,height:vh}});
 await p.goto('http://localhost:5421/ab-a12-l21-24.html#'+pageNo);
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.evaluate(no=>window.bookPage([...document.querySelectorAll('.page')].findIndex(e=>e.dataset.page===no)),pageNo);
 await p.waitForTimeout(600);
 const c=p.locator('.page[data-page="'+pageNo+'"] .naCanvas');
 await c.waitFor();
 await c.screenshot({path:`/downloads/gen/shots/render-p${pageNo}-${vw}.png`});
 const info=await c.evaluate(e=>({t:e.style.transform,w:e.clientWidth,h:e.clientHeight}));
 console.log(pageNo,'canvas',info);
 await b.close();server.close();
})().catch(e=>{console.error(e);process.exit(1)});
