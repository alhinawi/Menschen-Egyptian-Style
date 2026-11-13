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
 await new Promise(r=>server.listen(5299,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 try{
  for(const width of [320,390]){
   // Page 24: Stadt noun fields, Loesungswort, dialogue word-bank fields, grading, saved answers.
   const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
   const errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto('http://127.0.0.1:5299/ab-a12-l13-16.html#24');
   await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   const h=p.locator('[data-native-ab12="24"]');await h.waitFor();
   await h.locator('[data-native-field="p24-1b"]').fill('Schloss');
   await h.locator('[data-check="g1"] button').click();
   assert.equal(await h.locator('[data-check="g1"] output').textContent(),'Noch einmal','24: wrong noun not flagged');
   const nouns={'p24-1b':'eine Kirche','p24-1c':'ein Schloss','p24-1d':'ein Turm','p24-1e':'ein Hafen','p24-1f':'eine Bibliothek','p24-1g':'eine Post','p24-1h':'ein Spielplatz'};
   for(const [id,v] of Object.entries(nouns))await h.locator('[data-native-field="'+id+'"]').fill(v);
   await h.locator('[data-native-field="p24-3l"]').fill('Zürich');
   const dlg={'p24-4a':'Urlaub','p24-4b':'Bergen','p24-4c':'Wetter','p24-4d':'Meer','p24-4e':'Dom','p24-4f':'Wochen','p24-4g':'Hause'};
   for(const [id,v] of Object.entries(dlg))await h.locator('[data-native-field="'+id+'"]').fill(v);
   for(const b of await h.locator('.naCheck button').all()){await b.scrollIntoViewIfNeeded();await b.click();}
   for(const t of await h.locator('.naCheck output').allTextContents())assert.equal(t,'✓ Richtig!','24: grading failed');
   await p.reload();await p.waitForFunction(()=>document.documentElement.bookReady==='true'||document.documentElement.dataset.bookReady==='true');
   assert.equal(await h.locator('[data-native-field="p24-1h"]').inputValue(),'ein Spielplatz','24: noun answer not saved');
   assert.equal(await h.locator('[data-native-field="p24-4g"]').inputValue(),'Hause','24: dialogue answer not saved');
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'24: horizontal overflow');
   assert.deepEqual(errors,[],'24: page errors');
   await p.close();console.log('p24',width,'PASS');
  }
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1)});
