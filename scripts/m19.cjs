const{chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http');const root=process.cwd();
const server=http.createServer((q,r)=>{const f=path.join(root,'dist',q.url.split('?')[0]);try{r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.mp3':'audio/mpeg'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{await new Promise(r=>server.listen(5311,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1250,height:900},isMobile:false,hasTouch:false});
await p.goto('http://127.0.0.1:5311/ab-a12-l13-16.html#19');
await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const rows=await p.evaluate(()=>{const c=document.querySelector('[data-native-ab12="19"]');const scale=c.getBoundingClientRect().width/1071;const out=[];
for(const el of c.querySelectorAll('.naText,.naPick')){const y=parseFloat(el.style.top);if(y<520||y>800)continue;const r=el.getBoundingClientRect();const rng=document.createRange();rng.selectNodeContents(el);const tr=rng.getBoundingClientRect();out.push({t:(el.textContent||'').slice(0,44),x:Math.round(r.left/scale*10)/10-(c.getBoundingClientRect().left/scale),y,w:Math.round(tr.width/scale*10)/10})}
return out.sort((a,b)=>a.y-b.y||a.x-b.x)});
for(const r of rows)console.log(r.y, Math.round(r.x), Math.round(r.x+r.w), JSON.stringify(r.t));
await b.close();server.close()})();
