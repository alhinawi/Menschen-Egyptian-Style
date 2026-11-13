const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((q,r)=>{let f=path.join(root,'dist',decodeURIComponent(q.url.split('?')[0]));try{const ext=path.extname(f);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.ttf':'font/ttf','.json':'application/json'})[ext]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{
 await new Promise(r=>server.listen(5236,r));
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1150,height:1700}});
 await p.goto('http://127.0.0.1:5236/ab-a12-l17-20.html#56');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000});
 const h=p.locator('[data-native-ab12="56"]'); await h.waitFor({timeout:15000});
 await p.addStyleTag({content:'.nativeAB12{width:1072px!important;height:1500px!important}.stf__parent,.stf__wrapper,.stf__item,section.page{width:1072px!important;height:1500px!important;min-width:1072px!important;overflow:visible!important}'}).catch(()=>{});
 await p.waitForTimeout(900);
 const info=await p.evaluate(()=>{
   const c=document.querySelector('[data-native-ab12="56"] .naCanvas').getBoundingClientRect();
   const els=document.elementsFromPoint(c.x+300,c.y+1045);
   return els.map(e=>({cls:e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className, ts:getComputedStyle(e).textShadow, stroke:getComputedStyle(e).webkitTextStrokeWidth, html:e.tagName==='DIV'?e.outerHTML.slice(0,200):''}));
 });
 console.log(JSON.stringify(info,null,1));
 await b.close(); server.close();
})().catch(e=>{console.error(e);process.exit(1)});
