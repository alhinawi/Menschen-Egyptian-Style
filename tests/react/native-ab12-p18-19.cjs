const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((req,res)=>{
 const url=req.url.split('?')[0];const f=path.join(root,'dist',url);
 try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}
 catch{res.writeHead(404);res.end('not found')}
});
(async()=>{
 await new Promise(r=>server.listen(5297,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 try{
  {
   const p=await browser.newPage();await p.goto('http://127.0.0.1:5297/ab-a12-l13-16.html#20');
   await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   await p.locator('.hybridScan[data-scan-page="20"]').waitFor();
   assert(await p.locator('.hybridScan[data-scan-page="20"] input').count()>0,'unconverted p20 must remain usable');
   await p.close();console.log('p20: unconverted page preserved as HybridScan');
  }
  for(const width of [320,390]){
   // Page 18: wrong-answer feedback, full grading, saved answers.
   {
    const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
    const errors=[];p.on('pageerror',e=>errors.push(e.message));
    await p.goto('http://127.0.0.1:5297/ab-a12-l13-16.html#18');
    await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    const h=p.locator('[data-native-ab12="18"]');await h.waitFor();
    await h.locator('[data-native-field="p18-3b"]').fill('falsch');
    await h.locator('[data-check="g4"] button').click();
    assert.equal(await h.locator('[data-check="g4"] output').textContent(),'Noch einmal','18: wrong answer not flagged');
    const answers={'p18-nKirche':'3','p18-nSpielplatz':'2','p18-nWald':'6','p18-nMeer':'5','p18-nCafé':'7','p18-nHafen':'4','p18-dCafé':'Café','p18-dHafen':'Hafen','p18-dFlughafen':'Flughafen','p18-dKirche':'Kirche','p18-dSpielplatz':'Spielplatz','p18-2b':'Rathaus','p18-2c':'Jugendherberge','p18-2d':'Kino','p18-2e':'Bäume','p18-2f':'Berge','p18-3b':'in einer Bibliothek.','p18-3c':'in einem Schloss.','p18-3d':'in einem Park.','p18-3e':'Markt','p18-3f':'auf einem Turm.','p18-3g':'in einem Fluss.'};
    for(const [id,v] of Object.entries(answers))await h.locator('[data-native-field="'+id+'"]').fill(v);
    for(const b of await h.locator('.naCheck button').all()){await b.scrollIntoViewIfNeeded();await b.click();}
    for(const t of await h.locator('.naCheck output').allTextContents())assert.equal(t,'✓ Richtig!','18: grading failed');
    await h.locator('.tapWord').first().evaluate(e=>e.click());
    assert(await p.locator('.meaningPopup').evaluate(d=>d.open),'18: meaning dialog did not open');
    await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    assert.equal(await h.locator('[data-native-field="p18-nKirche"]').inputValue(),'3','18: circle answer not saved');
    assert.equal(await h.locator('[data-native-field="p18-3b"]').inputValue(),'in einer Bibliothek.','18: field answer not saved');
    assert.deepEqual(errors,[],'18: page errors');
    console.log(`${width}px p18: grading, wrong-answer feedback, saved answers, translation passed`);
    await p.close();
   }
   // Page 19: radio marking, text fields, audio, saved answers.
   {
    const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
    const errors=[];p.on('pageerror',e=>errors.push(e.message));
    await p.goto('http://127.0.0.1:5297/ab-a12-l13-16.html#19');
    await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    const h=p.locator('[data-native-ab12="19"]');await h.waitFor();
    await h.getByRole('button',{name:'gefällt (6a)',exact:true}).click();
    await h.locator('[data-check="g6"] button').click();
    assert.equal(await h.locator('[data-check="g6"] output').textContent(),'Noch einmal','19: incomplete/wrong marking not flagged');
    const fields={'p19-5b':'nicht so teuer','p19-5c':'ein Theater','p19-5d':'in einem Bahnhof','p19-5e':'tanzen','p19-7a':'gehört','p19-7b':'hilft','p19-7c':'schmeckt','p19-7d':'gefallen','p19-7e':'gehören','p19-7f':'helfen','p19-7g':'schmecken','p19-8b':'danken','p19-8c':'helfen','p19-8d':'gefallen','p19-8e':'Gehört','p19-8f':'Schmeckt'};
    for(const [id,v] of Object.entries(fields))await h.locator('[data-native-field="'+id+'"]').fill(v);
    for(const name of ['gefallen (6a)','Gehören (6b)','gehört (6b)','hilft (6c)','helfen (6d)','Schmeckt (6e)','schmecken (6e)'])await h.getByRole('button',{name,exact:true}).click();
    for(const b of await h.locator('.naCheck button').all()){await b.scrollIntoViewIfNeeded();await b.click();}
    for(const t of await h.locator('.naCheck output').allTextContents())assert.equal(t,'✓ Richtig!','19: grading failed');
    await h.locator('.naAudio').first().click();
    await p.waitForFunction(()=>{const a=document.querySelector('[data-native-ab12="19"] .naPlayer')||document.querySelector('audio.naPlayer');return a&&!a.paused},null,{timeout:5000}).catch(()=>{throw new Error('19: audio did not play')});
    await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    assert.equal(await h.getByRole('button',{name:'gefallen (6a)',exact:true}).getAttribute('aria-pressed'),'true','19: mark not saved');
    assert.equal(await h.locator('[data-native-field="p19-8f"]').inputValue(),'Schmeckt','19: field answer not saved');
    assert.deepEqual(errors,[],'19: page errors');
    console.log(`${width}px p19: word marking, grading, wrong-answer feedback, audio, saved answers passed`);
    await p.close();
   }
  }
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1)});
