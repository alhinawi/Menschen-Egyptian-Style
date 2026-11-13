const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((req,res)=>{
 const url=req.url.split('?')[0];const f=path.join(root,'dist',url);
 try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}
 catch{res.writeHead(404);res.end('not found')}
});
(async()=>{
 await new Promise(r=>server.listen(5298,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 try{
  for(const width of [320,390]){
   // Page 21: e/i radio pairs, small fill fields, grading, saved answers.
   {
    const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
    const errors=[];p.on('pageerror',e=>errors.push(e.message));
    await p.goto('http://127.0.0.1:5298/ab-a12-l13-16.html#21');
    await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    const h=p.locator('[data-native-ab12="21"]');await h.waitFor();
    assert.equal(await h.locator('.naAudio').count(),3,'21: audio buttons');
    await h.getByRole('radio',{name:'Zeile 1 i',exact:true}).click();
    await h.locator('[data-check="g1"] button').click();
    assert.equal(await h.locator('[data-check="g1"] output').textContent(),'Noch einmal','21: wrong radio not flagged');
    const ok={1:'e',2:'e',3:'i',4:'i',5:'i',6:'e',7:'i',8:'i',9:'i'};
    for(const [n,v] of Object.entries(ok))await h.getByRole('radio',{name:'Zeile '+n+' '+v,exact:true}).click();
    const fills={'p21-g1':'ie','p21-g2':'ih','p21-g3':'ie','p21-g4':'ie','p21-g5':'ie','p21-g6':'i','p21-g7':'i','p21-g8':'ie','p21-g9':'ie'};
    for(const [id,v] of Object.entries(fills))await h.locator('[data-native-field="'+id+'"]').fill(v);
    for(const b of await h.locator('.naCheck button').all()){await b.scrollIntoViewIfNeeded();await b.click();}
    for(const t of await h.locator('.naCheck output').allTextContents())assert.equal(t,'✓ Richtig!','21: grading failed');
    await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    assert(await h.getByRole('radio',{name:'Zeile 6 e',exact:true}).isChecked(),'21: radio not saved');
    assert.equal(await h.locator('[data-native-field="p21-g9"]').inputValue(),'ie','21: field answer not saved');
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'21: horizontal overflow');
    assert.deepEqual(errors,[],'21: page errors');
    await p.close();console.log('p21',width,'PASS');
   }
   // Page 22: noun fields, pronoun radios, email fields, grading, saved answers.
   {
    const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
    const errors=[];p.on('pageerror',e=>errors.push(e.message));
    await p.goto('http://127.0.0.1:5298/ab-a12-l13-16.html#22');
    await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    const h=p.locator('[data-native-ab12="22"]');await h.waitFor();
    await h.locator('[data-native-field="p22-1b"]').fill('Kindergarten');
    await h.locator('[data-check="g1"] button').click();
    assert.equal(await h.locator('[data-check="g1"] output').textContent(),'Noch einmal','22: partial answers not flagged');
    const nouns={'p22-1c':'Jugendherberge','p22-1d':'Turm','p22-1e':'Bibliothek','p22-1f':'Park'};
    for(const [id,v] of Object.entries(nouns))await h.locator('[data-native-field="'+id+'"]').fill(v);
    for(const name of ['b dir','c Ihnen','d euch','e ihm','f mir'])await h.getByRole('radio',{name,exact:true}).click();
    const mail={'p22-3a':'Hier ist','p22-3b':'gefällt mir gut','p22-3c':'das ist schon okay','p22-3d':'das ist nicht so toll','p22-3e':'Hier gibt es viele'};
    for(const [id,v] of Object.entries(mail))await h.locator('[data-native-field="'+id+'"]').fill(v);
    for(const b of await h.locator('.naCheck button').all()){await b.scrollIntoViewIfNeeded();await b.click();}
    for(const t of await h.locator('.naCheck output').allTextContents())assert.equal(t,'✓ Richtig!','22: grading failed');
    await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    assert(await h.getByRole('radio',{name:'f mir',exact:true}).isChecked(),'22: radio not saved');
    assert.equal(await h.locator('[data-native-field="p22-3e"]').inputValue(),'Hier gibt es viele','22: field answer not saved');
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'22: horizontal overflow');
    assert.deepEqual(errors,[],'22: page errors');
    await p.close();console.log('p22',width,'PASS');
   }
  }
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1;server.close()});
