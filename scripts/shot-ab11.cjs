// Screenshot one AB A1.1 native page at 390px (and optional full width).
// usage: node scripts/shot-ab11.cjs <page> [out] [full]
const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp'};
const server=http.createServer((req,res)=>{
 const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);
 try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}
});
(async()=>{
 const page=process.argv[2];
 const out=process.argv[3]||`/tmp/ab11-p${page}`;
 const full=process.argv[4]==='full';
 const html=+page>=78?'ab-l10-12.html':'ab-l7-9.html';
 await new Promise(r=>server.listen(5290,'127.0.0.1',r));
 const browser=await chromium.launch({args:['--no-sandbox']});
 try{
  const mk=async(width)=>{
   const p=await browser.newPage({viewport:{width,height:900},isMobile:width<500,hasTouch:width<500});
   const errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto(`http://127.0.0.1:5290/${html}#${page}`);
   await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.addStyleTag({content:'.controls{display:none!important}html[data-bookcss]>header{display:none!important}'});
   const el=p.locator(`[data-native-ab11-page="${page}"]`).first();await el.waitFor({timeout:15000});
   await el.scrollIntoViewIfNeeded();
   try{await p.evaluate(()=>document.fonts.ready.then(()=>1))}catch(e){}
   await p.waitForTimeout(700);
   await el.screenshot({path:out});
   if(errors.length)console.log('PAGEERRORS',errors.slice(0,5));
   await p.close();
  };
  await mk(390);
  if(full)await mk(1100);
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
