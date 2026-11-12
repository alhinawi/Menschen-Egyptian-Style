const{chromium}=require('playwright'),http=require('http'),fs=require('fs'),path=require('path');
const [file,pg,x0,y0,x1,y1,out]=process.argv.slice(2);const root='/downloads/repo';
const s=http.createServer((q,r)=>{let f=path.join(root,'dist',decodeURIComponent(q.url.split('?')[0]));try{r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.statusCode=404;r.end()}}).listen(4830);
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:900,height:1300},deviceScaleFactor:2});
await p.goto(`http://localhost:4830/${file}.html#${pg}`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(800);
await p.evaluate(()=>{document.querySelectorAll('*').forEach(e=>{const c=getComputedStyle(e).position;if((c==='sticky'||c==='fixed')&&!e.closest('.nkbCanvas'))e.style.display='none'})});
const c=p.locator(`[data-native-page="${pg}"] .nkbCanvas`);await c.scrollIntoViewIfNeeded();const bb=await c.boundingBox();const k=bb.width/1071;
await p.screenshot({path:out,clip:{x:bb.x+x0*k,y:bb.y+y0*k,width:(x1-x0)*k,height:(y1-y0)*k}});await b.close();s.close()})();
