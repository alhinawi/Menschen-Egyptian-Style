const {chromium}=require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 await new Promise(r=>server.listen(5198,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1150,height:1600}});
 await p.goto('http://127.0.0.1:5198/ab-a12-l17-20.html#43');
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 const el=p.locator("[data-native-ab12='43'] .naCanvas").first();await el.waitFor({timeout:15000});
 await el.scrollIntoViewIfNeeded();await p.waitForTimeout(400);
 const info=await p.evaluate(()=>{
  const out={canvases:[],imgs:[]};
  document.querySelectorAll("[data-native-ab12='43']").forEach((n,i)=>{
    const r=n.getBoundingClientRect();
    out.canvases.push({i,x:r.x,y:r.y,w:r.width,h:r.height,display:getComputedStyle(n).display,vis:getComputedStyle(n).visibility,op:getComputedStyle(n).opacity,parentChain:(()=>{let c=[],e=n;while(e&&c.length<6){c.push(e.tagName+'.'+(e.className||'').toString().slice(0,40)+'|'+getComputedStyle(e).display+'|'+(e.getBoundingClientRect().width|0));e=e.parentElement}return c})()});
  });
  document.querySelectorAll("[data-native-ab12='43'] img").forEach(im=>{
    const r=im.getBoundingClientRect();
    if(r.top>400&&r.top<700) out.imgs.push({src:im.src.split('/').pop(),x:r.x|0,y:r.y|0,w:r.width|0,h:r.height|0,op:getComputedStyle(im).opacity});
  });
  return out;
 });
 console.log(JSON.stringify(info,null,1));
 await browser.close();server.close();
})().catch(e=>{console.error(e);process.exitCode=1});
