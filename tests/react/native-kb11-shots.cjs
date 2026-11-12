// usage: node tests/react/native-kb11-shots.cjs file page[,page...] [width]
const{chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((q,r)=>{let f=path.join(root,'dist',decodeURIComponent(q.url.split('?')[0]));try{r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.json':'application/json'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{await new Promise(r=>server.listen(5199,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const file=process.argv[2],pages=process.argv[3].split(','),width=+(process.argv[4]||390);
for(const pg of pages){const p=await b.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto(`http://localhost:5199/${file}.html#${pg}`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',null,{timeout:15000}).catch(()=>console.log('notready'));await p.waitForTimeout(600);await p.evaluate(()=>{document.querySelectorAll('body *').forEach(e=>{if(e.closest('.nkb'))return;const c=getComputedStyle(e).position;if(c==='sticky'||c==='fixed')e.style.display='none'})});
await p.locator(`[data-native-page="${pg}"] .nkbCanvas`).screenshot({path:`/tmp/shots/native-${pg}-${width}.png`});await p.close()}
await b.close();server.close()})();
