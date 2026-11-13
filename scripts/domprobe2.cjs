const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 await new Promise(r=>server.listen(5196,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await p.goto('http://127.0.0.1:5196/ab-a12-l17-20.html#43');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.waitForTimeout(2500);try{await p.evaluate(()=>document.fonts.load("19px FiraSansCond"))}catch(e){}
 const info=await p.evaluate(()=>{
  const q=s=>document.querySelector("[data-native-ab12='43'] "+s);
  const soup=q('.naSoup43');
  const bub=q('.naBubL43');
  const out={};
  if(soup){const cs=getComputedStyle(soup);out.soup={ff:cs.fontFamily,fs:cs.fontSize,ls:cs.letterSpacing}}
  if(bub){const cs=getComputedStyle(bub);out.bub={ff:cs.fontFamily,fs:cs.fontSize}}
  out.condLoaded=document.fonts.check("19px FiraSansCond");
  return out;
 });
 console.log(JSON.stringify(info,null,1));
 await browser.close();server.close();
})().catch(e=>{console.error(e);process.exitCode=1});
