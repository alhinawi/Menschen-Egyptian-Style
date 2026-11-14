const{chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);
try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 const[html,pg]=process.argv.slice(2);
 await new Promise(r=>server.listen(5194,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await p.goto(`http://127.0.0.1:5194/${html}#${pg}`);
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.waitForTimeout(500);
 const out=await p.evaluate(async(pg)=>{
  const rootEl=document.querySelector(`[data-native-kb12="${pg}"]`);
  const saves=[...rootEl.querySelectorAll('.nkSave')];
  const res=[];
  for(const s of saves){
   const btn=s.querySelector('button');
   btn.click();
   await new Promise(r=>setTimeout(r,50));
   res.push({id:s.dataset.check,text:s.querySelector('output').textContent});
  }
  return res;
 },pg);
 console.log(JSON.stringify(out));
 await browser.close();server.close();
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
