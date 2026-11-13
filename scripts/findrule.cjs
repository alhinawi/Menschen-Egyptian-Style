const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve('.');
const server=http.createServer((req,res)=>{const f=path.join(root,'dist',req.url.split('?')[0]);
 try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.mp3':'audio/mpeg','.woff2':'font/woff2','.ttf':'font/ttf'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end()}});
(async()=>{
 await new Promise(r=>server.listen(5313,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1100,height:1500}});
 await p.goto('http://127.0.0.1:5313/ab-a12-l13-16.html#21');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.locator('[data-native-ab12="21"]').waitFor();
 const m=await p.evaluate(()=>{
  const out=[];
  for(const sh of document.styleSheets){let rules;try{rules=sh.cssRules}catch{continue}
   for(const r of rules){if(r.style&&(r.style.letterSpacing.includes('-0.65')||r.style.fontFamily.includes('DroidSerif')||(r.selectorText&&r.selectorText.includes('.naText')&&r.style.fontSize==='20px')))out.push((sh.href||'inline').split('/').pop()+' :: '+r.selectorText+' :: '+r.style.cssText.slice(0,120))}}
  return out;
 });
 m.forEach(x=>console.log(x));
 await browser.close();server.close();
})();
