const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 await new Promise(r=>server.listen(5291,'127.0.0.1',r));
 const b=await chromium.launch({args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1100,height:1500}});
 await p.goto('http://127.0.0.1:5291/ab-l7-9.html#58');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 const info=await p.evaluate(()=>[...document.querySelectorAll('[data-native-ab11-page="58"] img.mHelp')].map(i=>{const r=i.getBoundingClientRect();return {alt:i.alt,left:i.style.left,top:i.style.top,w:i.style.width,h:i.style.height,nw:i.naturalWidth,nh:i.naturalHeight,rect:[r.left,r.top,r.width,r.height]}}));
 console.log(JSON.stringify(info,null,1));
 await b.close();server.close();process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
