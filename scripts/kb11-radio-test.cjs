const{chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);
try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 await new Promise(r=>server.listen(5193,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await p.goto('http://127.0.0.1:5193/l10-12.html#82');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.waitForTimeout(500);
 const t=await p.evaluate(()=>{
  const el=document.querySelector('[data-native-field="a14f"]')||[...document.querySelectorAll('input[type=radio]')].find(r=>r.getAttribute('aria-label')==='Sie arbeiten bei VW.'&&r.dataset.value==='falsch');
  if(!el)return{err:'not found'};
  const r=el.getBoundingClientRect();
  const top=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
  return{found:true,x:r.left+r.width/2,y:r.top+r.height/2,coveredBy:top===el?null:(top?top.tagName+'.'+String(top.className).slice(0,30):'none')};
 });
 console.log(JSON.stringify(t));
 if(t.found&&!t.coveredBy){
  await p.mouse.click(t.x,t.y);await p.waitForTimeout(300);
  const sel=await p.evaluate(()=>{
   const el=document.querySelector('[data-native-field="a14f"]');
   return el?el.checked:'gone';
  });
  console.log('a14f checked after real click:',sel);
 }
 await browser.close();server.close();
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
