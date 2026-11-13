const{chromium}=require('playwright'),fs=require('fs'),http=require('http'),path=require('path');
const root='/downloads/menschen';
const server=http.createServer((q,r)=>{try{const f=path.join(root,'dist',q.url.split('?')[0]==='/'?'/index.html':q.url.split('?')[0]);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{
 await new Promise(r=>server.listen(5421,r));
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:810,height:1132}});
 p.on('console',m=>console.log('CONSOLE',m.text().slice(0,200)));
 p.on('pageerror',e=>console.log('ERR',String(e).slice(0,300)));
 await p.goto('http://localhost:5421/ab-a12-l21-24.html#67');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 console.log(await p.evaluate(()=>[...document.querySelectorAll('.page')].map(e=>e.dataset.page).join(',')));
 await p.evaluate(()=>window.bookPage([...document.querySelectorAll('.page')].findIndex(e=>e.dataset.page==='67')));
 await p.waitForTimeout(800);
 console.log(await p.evaluate(()=>{const c=document.querySelector('.naCanvas');const pg=[...document.querySelectorAll('.page')].find(e=>e.dataset.page==='67');return {na:!!c, vis:c?getComputedStyle(c).visibility:null, disp:c?getComputedStyle(c).display:null, pageDisp:pg?getComputedStyle(pg).display:'none?', pgCls:pg?pg.className:null};}));
 await b.close();server.close();
})().catch(e=>{console.error(e);process.exit(1)});
