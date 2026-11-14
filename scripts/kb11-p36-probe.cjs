// usage: node scripts/kb11-p36-probe.cjs <distdir> <port> <outprefix> [interact]
const{chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json'};
(async()=>{
 const[distdir,port,outprefix,interact]=process.argv.slice(2);
 const dir=path.resolve(root,distdir);
 const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(dir,url==='/'?'index.html':url);
 try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
 await new Promise(r=>server.listen(+port,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await p.goto(`http://127.0.0.1:${port}/l4-6.html#36`);
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.waitForTimeout(1600);
 await p.screenshot({path:outprefix+'-full.png'});
 if(interact){
  const cells=await p.evaluate(()=>[...document.querySelectorAll('select.nkb36Cell')].filter(e=>e.getBoundingClientRect().width>0).map(e=>({id:e.getAttribute('aria-label'),opts:[...e.options].map(o=>o.value)})));
  console.log('cells:',JSON.stringify(cells.map(c=>({id:c.id,n:c.opts.length}))));
  const ans={'t9a-a1':'Brenner IT-Consulting.','t9a-a2':'Schmidt.','t9a-a3':'Christian Schmidt.','t9a-b1':'Guten Tag, hier ist Marlene Neumann.','t9a-b2':'Hallo, hier ist Marlene.','t9a-v1':'Tschüs.','t9a-v2':'Auf Wiederhören.'};
  // seed wrong first to see Noch einmal
  for(const[id,val]of Object.entries(ans))await p.selectOption(`select[aria-label="${id}"]`,id==='t9a-a2'?'Christian Schmidt.':val);
  await p.evaluate(()=>{const b=[...document.querySelectorAll('.nkbCheck button')].find(e=>e.getBoundingClientRect().width>0);b.click()});
  await p.waitForTimeout(300);
  console.log('verdict wrong:',await p.evaluate(()=>[...document.querySelectorAll('.nkbCheck output')].map(o=>o.textContent).join('|')));
  await p.selectOption('select[aria-label="t9a-a2"]','Schmidt.');
  await p.evaluate(()=>{const b=[...document.querySelectorAll('.nkbCheck button')].find(e=>e.getBoundingClientRect().width>0);b.click()});
  await p.waitForTimeout(300);
  console.log('verdict right:',await p.evaluate(()=>[...document.querySelectorAll('.nkbCheck output')].map(o=>o.textContent).join('|')));
  await p.screenshot({path:outprefix+'-filled.png'});
  await p.goto(`http://127.0.0.1:${port}/l4-6.html#36`);
  await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  await p.waitForTimeout(1600);
  const kept=await p.evaluate(()=>[...document.querySelectorAll('select.nkb36Cell')].filter(e=>e.value).length);
  console.log('persisted selects:',kept);
  await p.screenshot({path:outprefix+'-persist.png'});
 }
 const p2=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await p2.goto(`http://127.0.0.1:${port}/l4-6.html#36`);
 await p2.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p2.waitForTimeout(1500);
 await p2.screenshot({path:outprefix+'-390.png'});
 await browser.close();server.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
