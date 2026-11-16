// One-off verification for the select->LineMatching conversions (ab-a12 p24/p32, kb-a12 p38).
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((req,res)=>{
 const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url);
 try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}
 catch{res.writeHead(404);res.end('not found')}
});
const pages=[
 {name:'ab-a12-p24',url:'ab-a12-l13-16.html#24',holder:'[data-native-ab12="24"]',mid:'p24-2',gone:['p24-2-couch','p24-2-bett'],leftN:7,pairs:[[0,4],[1,2],[2,1],[3,6],[5,0],[6,3]],wrong:[0,0],check:'g4'},
 {name:'ab-a12-p32',url:'ab-a12-l13-16.html#32',holder:'[data-native-ab12="32"]',mid:'p32-10',gone:['p32-10-0','p32-10-5'],leftN:6,pairs:[[1,0],[2,1],[3,4],[4,5],[5,2]],wrong:[1,4],check:'32-2'},
 {name:'kb-a12-p38',url:'kb-a12-l17-20.html#38',holder:'[data-native-kb12="38"]',mid:'38-3',gone:['3-1','3-6'],leftN:7,pairs:[[1,1],[2,4],[3,2],[4,6],[5,3],[6,0]],wrong:[1,0],check:'3'},
];
(async()=>{
 await new Promise(r=>server.listen(5297,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 try{
  for(const width of [390]){
   for(const cfg of pages){
    const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
    const errors=[];p.on('pageerror',e=>errors.push(e.message));
    await p.goto('http://127.0.0.1:5297/'+cfg.url);
    await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    const h=p.locator(cfg.holder);await h.waitFor();
    // Old selects are gone.
    for(const id of cfg.gone)assert.equal(await h.locator('[data-native-field="'+id+'"]').count(),0,cfg.name+': stale select '+id);
    const m=h.locator('[data-matching="'+cfg.mid+'"]');await m.waitFor();
    // Example line is pre-drawn.
    assert(await m.locator('path[data-line-result="correct"]').count()>=1,cfg.name+': example line missing');
    // No line over text: dots sit in the gap (left dots right of left text, right dots left of right text).
    // Draw one wrong line first, check -> red + Noch einmal.
    await m.locator('button').nth(cfg.wrong[0]).click();await m.locator('button').nth(cfg.leftN+cfg.wrong[1]).click();
    await h.locator('[data-check="'+cfg.check+'"] button').click();
    assert.equal(await h.locator('[data-check="'+cfg.check+'"] output').textContent(),'Noch einmal',cfg.name+': wrong line accepted');
    assert(await m.locator('path[data-line-result="wrong"]').count()>=1,cfg.name+': wrong line not red');
    await p.screenshot({path:'/tmp/verify-'+cfg.name+'-wrong-'+width+'.png',fullPage:true});
    // Redraw: undo wrong line by tapping the same right target again is not supported for single match;
    // reset the page, then draw all correct lines.
    await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    await h.waitFor();
    for(const [l,r] of cfg.pairs){await m.locator('button').nth(l).click();await m.locator('button').nth(cfg.leftN+r).click();}
    await h.locator('[data-check="'+cfg.check+'"] button').click();
    assert.equal(await h.locator('[data-check="'+cfg.check+'"] output').textContent(),'✓ Richtig!',cfg.name+': correct lines rejected');
    assert.equal(await m.locator('path[data-line-result="wrong"]').count(),0,cfg.name+': unexpected red line');
    await h.screenshot({path:'/tmp/verify-'+cfg.name+'-'+width+'.png'});
    // Lines survive reload.
    await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    await h.waitFor();
    assert.equal(await m.locator('path').count(),cfg.pairs.length+1,cfg.name+': lines not restored after reload');
    assert.deepEqual(errors,[],cfg.name+': page errors');
    console.log(cfg.name,width,'PASS');
    await p.close();
   }
  }
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1)});
