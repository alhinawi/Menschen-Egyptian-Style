const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http');
const root='/home/sandbox/menschen';
const server=http.createServer((q,r)=>{let f=path.join(root,'dist',q.url.split('?')[0]);try{const ext=path.extname(f);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json'})[ext]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{
 const [page,route]=[process.argv[2],process.argv[3]];
 await new Promise(r=>server.listen(5235,r));
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1400,height:1700}});
 await p.goto(`http://127.0.0.1:5235/${route}#${page}`);
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.locator(`[data-native-ab12="${page}"]`).waitFor({timeout:10000});
 await p.addStyleTag({content:'.nativeAB12{width:1071px!important;height:1490px!important}.stf__parent,.stf__wrapper,.stf__item,section.page{width:1071px!important;height:1490px!important;min-width:1071px!important;overflow:visible!important}'});
 await p.waitForTimeout(500);
 const out=await p.evaluate(()=>{
  const cv=document.querySelector('.naCanvas');const cr=cv.getBoundingClientRect();
  const s=cr.width/1071;
  const els=[...cv.querySelectorAll('.naText,.naDot,.naField,.naCheck,.naTitle,.naHead')];
  const R=els.map(e=>{const r=e.getBoundingClientRect();return {cls:e.className,txt:(e.textContent||'').slice(0,28),x:(r.left-cr.left)/s,y:(r.top-cr.top)/s,w:r.width/s,h:r.height/s,sw:e.scrollWidth/s}});
  const texts=R.filter(e=>e.cls.includes('naText')),marks=R.filter(e=>e.cls.includes('naDot')||e.cls.includes('naField'));
  const coll=[];
  for(const m of marks)for(const t of texts){
    if(m.x<t.x+t.sw-2&&m.x+m.w>t.x+2&&m.y<t.y+t.h-3&&m.y+m.h>t.y+3)coll.push({mark:m.cls.slice(0,12),mtxt:m.txt,at:[Math.round(m.x),Math.round(m.y)],text:t.txt,tx:Math.round(t.x),tw:Math.round(t.sw)});
  }
  const keep=R.filter(e=>/Clemens|dem Tisch|^Die$|Schreiben|In Giesing haben|BASISTR|Schmecken$|Kartoffeln|die Schl|Übungen/.test(e.txt)).map(e=>({t:e.txt,x:Math.round(e.x),w:Math.round(e.w),sw:Math.round(e.sw)}));
  const head=R.find(e=>e.txt==='BASISTRAINING');
  return {coll,keep,n:R.length,sample:R.slice(0,6),head:head?{w:Math.round(head.sw)}:null};
 });
 console.log(JSON.stringify(out,null,1));
 await b.close();server.close();
})().catch(e=>{console.error(e);process.exit(1)});
