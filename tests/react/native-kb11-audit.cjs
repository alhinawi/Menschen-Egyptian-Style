// Layout audit: collisions between text lines, extreme horizontal scaling, unerased (ghost) words, Prüfen overlap.
const{chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../..');const port=+(process.env.PORT||5270);
const server=http.createServer((q,r)=>{let f=path.join(root,'dist',decodeURIComponent(q.url.split('?')[0]));try{r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
const ALL={'index':[9,10,11,12],'l2-3':[13,14,15,16,17,18,19,20,21,22,23,24],'l4-6':[25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],'l10-12':Array.from({length:40},(_,i)=>57+i)};
(async()=>{await new Promise(r=>server.listen(port,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const sel=(process.env.PAGES||'').split(',').filter(Boolean).map(Number);const res={};
for(const[file,pages]of Object.entries(ALL)){const p=await b.newPage({viewport:{width:900,height:1400}});
 for(const pg of pages.filter(n=>!sel.length||sel.includes(n))){await p.goto(`http://localhost:${port}/${file}.html#${pg}`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',null,{timeout:15000}).catch(()=>{});await p.waitForTimeout(400);
  res[pg]=await p.evaluate((pg)=>{const c=document.querySelector(`[data-native-page="${pg}"] .nkbCanvas`);if(!c)return{missing:true};const cr=c.getBoundingClientRect();const L=[...c.querySelectorAll('.nkbLine')].map(e=>({r:e.getBoundingClientRect(),t:e.textContent,k:(()=>{const m=/scaleX\(([\d.]+)\)/.exec(e.style.transform||'');return m?+m[1]:1})()}));
   let overlaps=[],bad=[];
   for(let i=0;i<L.length;i++){const a=L[i].r;if(L[i].k<0.8||L[i].k>1.25)bad.push(L[i].t.slice(0,30)+' x'+L[i].k.toFixed(2));if(a.right>cr.right+2)bad.push('overflow '+L[i].t.slice(0,20));
    for(let j=i+1;j<L.length;j++){const b=L[j].r;const w=Math.min(a.right,b.right)-Math.max(a.left,b.left),h=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);if(w>2&&h>a.height*0.35)overlaps.push(L[i].t.slice(0,18)+' | '+L[j].t.slice(0,18))}}
   const checks=[...c.querySelectorAll('.nkbCheck button')].map(e=>e.getBoundingClientRect());let cov=0;for(const k of checks)for(const l of L){const w=Math.min(k.right,l.r.right)-Math.max(k.left,l.r.left),h=Math.min(k.bottom,l.r.bottom)-Math.max(k.top,l.r.top);if(w>2&&h>2)cov++}
   const ghost=[...c.querySelectorAll('.nkbGhost')].filter(e=>/[A-Za-zÄÖÜäöüß]/.test(e.textContent)).length;
   return{lines:L.length,overlaps,bad,checkOverlap:cov,ghost}},pg)}
 await p.close()}
await b.close();server.close();
const clean=[],flag={};for(const[k,v]of Object.entries(res)){const n=(v.overlaps||[]).length+(v.bad||[]).length+(v.checkOverlap||0)+(v.ghost>6?1:0);if(n===0)clean.push(+k);else flag[k]={o:v.overlaps.length,bad:v.bad.length,chk:v.checkOverlap,ghost:v.ghost}}
console.log('CLEAN',clean.join(','));console.log('FLAGGED',JSON.stringify(flag));if(process.env.V)console.log(JSON.stringify(res[process.env.V]||{}))})();
