const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((req,res)=>{
 const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url);
 try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}
 catch{res.writeHead(404);res.end('not found')}
});
(async()=>{
 await new Promise(r=>server.listen(5298,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 try{
  for(const width of [320,390]){
   // Page 31: radio circles, two field groups, saved answers.
   {
    const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
    const errors=[];p.on('pageerror',e=>errors.push(e.message));
    await p.goto('http://127.0.0.1:5298/ab-a12-l13-16.html#31');
    await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    const h=p.locator('[data-native-ab12="31"]');await h.waitFor();
    await h.locator('[data-native-field="p31-7b"]').fill('falsch');
    await h.locator('[data-check="31-2"] button').click();
    assert.equal(await h.locator('[data-check="31-2"] output').textContent(),'Noch einmal','31: wrong answer not flagged');
    const radio=(id,n)=>h.locator('input[name="native-ab12-31-'+id+'"]').nth(n);
    for(const [id,n] of [['6a1',1],['6a2',1],['6b',1],['6c',1],['6d1',1],['6d2',0],['6e',0]]){await radio(id,n).scrollIntoViewIfNeeded();await radio(id,n).click();}
    const f7={'p31-7b':'em','p31-7c':'er','p31-7d':'er','p31-7e':'en','p31-7f':'em','p31-7g':'er','p31-7h':'em'};
    const f8={'p31-8b':'von','p31-8c':'bis','p31-8d':'nach','p31-8e':'am','p31-8f':'um','p31-8g':'vor','p31-8h':'um','p31-8i':'nach'};
    for(const [id,v] of Object.entries({...f7,...f8}))await h.locator('[data-native-field="'+id+'"]').fill(v);
    for(const b of await h.locator('.naCheck button').all()){await b.scrollIntoViewIfNeeded();await b.click();}
    for(const t of await h.locator('.naCheck output').allTextContents())assert.equal(t,'✓ Richtig!','31: grading failed');
    await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    assert.equal(await h.locator('[data-native-field="p31-8i"]').inputValue(),'nach','31: field answer not saved');
    assert(await h.locator('input[name="native-ab12-31-6e"]').nth(0).isChecked(),'31: circle answer not saved');
    assert.deepEqual(errors,[],'31: page errors');
    console.log(`${width}px p31: circle marking, grading, wrong-answer feedback, saved answers passed`);
    await p.close();
   }
   // Page 32: letter fields, audio chip, saved answers.
   {
    const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
    const errors=[];p.on('pageerror',e=>errors.push(e.message));
    await p.goto('http://127.0.0.1:5298/ab-a12-l13-16.html#32');
    await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    const h=p.locator('[data-native-ab12="32"]');await h.waitFor();
    await h.locator('[data-native-field="p32-9b"]').fill('falsch');
    await h.locator('[data-check="32-1"] button').click();
    assert.equal(await h.locator('[data-check="32-1"] output').textContent(),'Noch einmal','32: wrong answer not flagged');
    const fields={'p32-9a1':'kann ich heute um 16 Uhr nicht kommen','p32-9a2':'Können wir den Termin verschieben','p32-9a3':'Haben Sie am Mittwoch Zeit','p32-9a4':'Ab Freitag bin ich für eine Woche im Urlaub','p32-9b':'geehrter Herr Frei'};
    for(const [id,v] of Object.entries(fields))await h.locator('[data-native-field="'+id+'"]').fill(v);
    await h.locator('[data-check="32-1"] button').click();
    assert.equal(await h.locator('[data-check="32-1"] output').textContent(),'✓ Richtig!','32: grading failed');
    await h.locator('.naAudio').first().click();
    await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    assert.equal(await h.locator('[data-native-field="p32-9b"]').inputValue(),'geehrter Herr Frei','32: field answer not saved');
    assert.deepEqual(errors,[],'32: page errors');
    console.log(`${width}px p32: grading, wrong-answer feedback, audio, saved answers passed`);
    await p.close();
   }
   // Page 33: puzzle fields, audio chips, saved answers.
   {
    const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
    const errors=[];p.on('pageerror',e=>errors.push(e.message));
    await p.goto('http://127.0.0.1:5298/ab-a12-l13-16.html#33');
    await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    const h=p.locator('[data-native-ab12="33"]');await h.waitFor();
    await h.locator('[data-native-field="p33-a2_1"]').fill('x');
    await h.locator('[data-check="33-1"] button').click();
    assert.equal(await h.locator('[data-check="33-1"] output').textContent(),'Noch einmal','33: wrong answer not flagged');
    const answers=['o','o','u','u','u','u','o','u','o','u','o','u'];
    for(let i=0;i<12;i++)await h.locator('[data-native-field="p33-a2_'+(i+1)+'"]').fill(answers[i]);
    await h.locator('[data-check="33-1"] button').click();
    assert.equal(await h.locator('[data-check="33-1"] output').textContent(),'✓ Richtig!','33: grading failed');
    await h.locator('.naAudio').first().click();
    await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    assert.equal(await h.locator('[data-native-field="p33-a2_12"]').inputValue(),'u','33: field answer not saved');
    assert.deepEqual(errors,[],'33: page errors');
    console.log(`${width}px p33: grading, wrong-answer feedback, audio, saved answers passed`);
    await p.close();
   }
   // Page 34: five groups incl. radios with printed example pre-marked, saved answers.
   {
    const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
    const errors=[];p.on('pageerror',e=>errors.push(e.message));
    await p.goto('http://127.0.0.1:5298/ab-a12-l13-16.html#34');
    await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    const h=p.locator('[data-native-ab12="34"]');await h.waitFor();
    assert(await h.locator('input[name="native-ab12-34-r4a"]').nth(0).isChecked(),'34: printed example 4a not pre-marked');
    await h.locator('[data-native-field="p34-1b"]').fill('falsch');
    await h.locator('[data-check="34-1"] button').click();
    assert.equal(await h.locator('[data-check="34-1"] output').textContent(),'Noch einmal','34: wrong answer not flagged');
    const fields={'p34-1b':'Klimaanlage','p34-1c':'Internetverbindung','p34-1d':'Fernseher','p34-1e':'Dusche','p34-2b':'pünktlich','p34-2c':'lustig','p34-2d':'kalt','p34-3b':'nach','p34-3c':'für','p34-3d':'vor','p34-3e':'nach','p34-5-1':'Was kann','p34-5-2':'Es gibt','p34-5-3':'Das tut','p34-5-4':'Ich kümmere','p34-5-5':'Das ist'};
    for(const [id,v] of Object.entries(fields))await h.locator('[data-native-field="'+id+'"]').fill(v);
    const radio=(id,n)=>h.locator('input[name="native-ab12-34-'+id+'"]').nth(n);
    for(const [id,n] of [['r4b',2],['r4c',2],['r4d',1]]){await radio(id,n).scrollIntoViewIfNeeded();await radio(id,n).click();}
    for(const b of await h.locator('.naCheck button').all()){await b.scrollIntoViewIfNeeded();await b.click();}
    for(const t of await h.locator('.naCheck output').allTextContents())assert.equal(t,'✓ Richtig!','34: grading failed');
    await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
    assert.equal(await h.locator('[data-native-field="p34-5-4"]').inputValue(),'Ich kümmere','34: field answer not saved');
    assert(await h.locator('input[name="native-ab12-34-r4d"]').nth(1).isChecked(),'34: circle answer not saved');
    assert.deepEqual(errors,[],'34: page errors');
    console.log(`${width}px p34: five-group grading incl. radios, wrong-answer feedback, saved answers passed`);
    await p.close();
   }
  }
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exit(1)});
