const { chromium } = require('playwright');
const http = require('http'); const fs = require('fs'); const path = require('path');
const root = path.resolve('dist');
const server = http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]); if(p==='/')p='/ab1.html';
  const f = path.join(root,p);
  if(fs.existsSync(f)&&fs.statSync(f).isFile()){
    const ext=path.extname(f); const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.mp3':'audio/mpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'}[ext]||'application/octet-stream';
    res.writeHead(200,{'Content-Type':mime}); fs.createReadStream(f).pipe(res);
  } else { res.writeHead(404); res.end('nf'); }
});
(async()=>{
  await new Promise(r=>server.listen(5193,r));
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport:{width:390,height:844}});
  await page.addInitScript(()=>localStorage.setItem('menschen-site-theme', JSON.stringify({id:'light',mode:'light',palette:'1'})));
  await page.goto('http://localhost:5193/ab1.html'); await page.waitForTimeout(1500);
  const out = await page.evaluate(()=>{
    const r={};
    const grab=(k,el)=>{
      if(!el){r[k]=null;return;}
      const b=el.getBoundingClientRect(); const cs=getComputedStyle(el);
      r[k]={x:+b.x.toFixed(2),y:+b.y.toFixed(2),w:+b.width.toFixed(2),h:+b.height.toFixed(2),fs:cs.fontSize,lh:cs.lineHeight,p:cs.padding,m:cs.margin,fw:cs.fontWeight,disp:cs.display,pos:cs.position};
    };
    grab('pill',document.querySelector('.lnv-pill'));
    grab('pillText',document.querySelector('.lnv-pillText'));
    grab('chev',document.querySelector('.lnv-pill .lnv-chev'));
    grab('pagePill',document.querySelector('.lnv-pagePill'));
    // bottom bar: element under point near bottom center
    let el=document.elementFromPoint(195,820);
    while(el && getComputedStyle(el).position!=='fixed') el=el.parentElement;
    grab('bottomBar',el);
    // header bar
    let h=document.elementFromPoint(195,25);
    while(h && getComputedStyle(h).position!=='fixed' && getComputedStyle(h).position!=='sticky') h=h.parentElement;
    grab('headerBar',h);
    grab('prev',document.querySelector('#prev'));
    grab('next',document.querySelector('#next'));
    grab('soundToggle',document.querySelector('.soundToggle'));
    return r;
  });
  console.log(JSON.stringify(out));
  await browser.close(); server.close();
})();
