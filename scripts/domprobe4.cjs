const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 await new Promise(r=>server.listen(5194,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await p.goto('http://127.0.0.1:5194/ab-a12-l17-20.html#43');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 const info=await p.evaluate(async()=>{
  const out={};
  out.styles=[...document.querySelectorAll('style')].map(s=>s.textContent.slice(0,80));
  out.faceCount=[...document.fonts].map(f=>f.family+':'+f.status);
  try{out.ttf=await fetch('assets/fonts/droid-serif-400.ttf').then(r=>r.status)}catch(e){out.ttf='ERR '+e.message}
  try{await document.fonts.load("19.5px DroidSerif");out.droidAfterLoad=document.fonts.check("19.5px DroidSerif")}catch(e){out.droidAfterLoad='ERR '+e.message}
  try{await document.fonts.load("700 21px FiraSans");out.firaAfterLoad=document.fonts.check("700 21px FiraSans")}catch(e){out.firaAfterLoad='ERR '+e.message}
  return out;
 });
 console.log(JSON.stringify(info,null,1));
 await browser.close();server.close();
})().catch(e=>{console.error(e);process.exitCode=1});
