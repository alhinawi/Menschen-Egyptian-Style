// Leaderboard outage state: when the API is unreachable the panel shows a
// calm Egyptian note in the neutral empty style (no red authError), fires
// exactly one request, and a 5-minute cooldown stops reopen-hammering.
const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../..');const server=http.createServer((req,res)=>{let url=req.url.split('?')[0];let f=path.join(root,'dist',url==='/'?'index.html':url);try{const mime={'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'};res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('not found')}});
const CALM='المتصدرين في بريك صغير دلوقتي. هيرجعوا عن قريب.';
(async()=>{
  await new Promise(r=>server.listen(5190,'127.0.0.1',r));
  const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
  try{
    const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    let apiCalls=0;
    await p.route('**/api/leaderboard',route=>{apiCalls++;route.abort()});
    await p.addInitScript(()=>{try{localStorage.setItem('menschen-ui-language','ar')}catch{}});
    await p.goto('http://127.0.0.1:5190/');
    await p.waitForFunction(()=>window.menschenBook&&window.initMeanings,{},{timeout:15000});
    await p.evaluate(()=>bookPage(menschenPages.findIndex(pg=>pg.dataset.page==='9')));
    await p.waitForTimeout(400);
    await p.locator('.profileTrigger').click();
    await p.getByRole('button',{name:'المتصدرين'}).click();
    await p.waitForTimeout(700);
    assert.equal(await p.locator('.leaderboardPanel .authError').count(),0,'no red error');
    assert.equal((await p.locator('.leaderboardPanel .lbEmpty').textContent()).trim(),CALM,'calm Egyptian note');
    assert.equal(apiCalls,1,'one request on first open');
    await p.screenshot({path:'/downloads/lb-calm-outage.png'});
    await p.getByRole('button',{name:'رجوع'}).click();
    await p.getByRole('button',{name:'المتصدرين'}).click();
    await p.waitForTimeout(300);
    assert.equal(apiCalls,1,'no repeated request while the outage note is up');
    assert.equal((await p.locator('.leaderboardPanel .lbEmpty').textContent()).trim(),CALM,'calm note on reopen');
    assert.equal(await p.locator('.leaderboardPanel .authError').count(),0,'still no red error');
    console.log('PASS: calm outage note, no red error, no repeated requests (apiCalls='+apiCalls+')');
    await p.close();
  }finally{await b.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
