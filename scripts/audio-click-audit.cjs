// Click every .listen marker on every reader page; verify audio src set + URL 200 + no element error.
const { chromium } = require('playwright');
const http = require('http'); const fs = require('fs'); const path = require('path');
const root = path.resolve('dist');
const server = http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]); if(p==='/')p='/index.html';
  const f = path.join(root,p);
  if(fs.existsSync(f)&&fs.statSync(f).isFile()){
    const ext=path.extname(f); const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.mp3':'audio/mpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'}[ext]||'application/octet-stream';
    res.writeHead(200,{'Content-Type':mime}); fs.createReadStream(f).pipe(res);
  } else { res.writeHead(404); res.end('nf'); }
});
const PAGES = fs.readdirSync('.').filter(f=>f.endsWith('.html') && !f.includes('viewer') && f!=='original-l21-24.html');
(async()=>{
  await new Promise(r=>server.listen(5194,r));
  const browser = await chromium.launch();
  const results = [];
  for(const pg of PAGES){
    const page = await browser.newPage({viewport:{width:390,height:844}});
    const failed = [];
    try{
      await page.goto('http://localhost:5194/'+pg, {waitUntil:'load'}); await page.waitForTimeout(1200);
      const markers = await page.evaluate(()=>Array.from(document.querySelectorAll('.listen')).map((b,i)=>({i, track:b.dataset.track||null, text:(b.textContent||'').trim().slice(0,30), page:(b.closest('[data-page]')||{}).dataset?.page||null})));
      for(const m of markers){
        const r = await page.evaluate(async(idx)=>{
          const b=document.querySelectorAll('.listen')[idx];
          b.click();
          await new Promise(r=>setTimeout(r,400));
          const a=document.querySelector('#audio');
          if(!a||!a.src) return {ok:false,why:'no src'};
          const src=a.getAttribute('src');
          const resp=await fetch(src,{method:'GET',headers:{Range:'bytes=0-0'}}).catch(e=>null);
          if(!resp) return {ok:false,why:'fetch failed',src};
          if(resp.status!==200&&resp.status!==206) return {ok:false,why:'HTTP '+resp.status,src};
          const len=resp.headers.get('content-range')||resp.headers.get('content-length');
          if(a.error) return {ok:false,why:'audio error '+a.error.code,src};
          return {ok:true,src,len};
        }, m.i);
        if(!r.ok) failed.push({...m, ...r});
      }
      results.push({pg, count:markers.length, failed});
      console.log(pg, 'markers:', markers.length, 'failed:', failed.length);
      for(const f of failed) console.log('   FAIL', JSON.stringify(f));
    }catch(e){ results.push({pg, error:String(e)}); console.log(pg, 'ERROR', String(e).slice(0,120)); }
    await page.close();
  }
  fs.writeFileSync('/tmp/audio-audit.json', JSON.stringify(results,null,1));
  const tot=results.reduce((a,r)=>a+(r.count||0),0), bad=results.reduce((a,r)=>a+(r.failed?r.failed.length:0),0);
  console.log('TOTAL markers clicked:', tot, 'failures:', bad);
  await browser.close(); server.close();
})();
