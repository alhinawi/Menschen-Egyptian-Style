const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 await new Promise(r=>server.listen(5197,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await p.goto('http://127.0.0.1:5197/ab-a12-l17-20.html#43');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 const el=p.locator("[data-native-ab12='43'] .naCanvas").first();await el.waitFor({timeout:15000});
 await el.scrollIntoViewIfNeeded();await p.waitForTimeout(2500);
 await el.screenshot({path:'/tmp/w43-full.png'});
 await browser.close();server.close();
})().catch(e=>{console.error(e);process.exitCode=1});
