const{chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http');const root=process.cwd();
const server=http.createServer((q,r)=>{const f=path.join(root,'dist',q.url.split('?')[0]);try{r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.mp3':'audio/mpeg'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{await new Promise(r=>server.listen(5315,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await p.goto('http://127.0.0.1:5315/ab-a12-l13-16.html#'+process.argv[2]);
await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const el=p.locator('[data-native-ab12="'+process.argv[2]+'"]');await el.waitFor();
await el.screenshot({path:process.argv[3]});
await b.close();server.close()})();
