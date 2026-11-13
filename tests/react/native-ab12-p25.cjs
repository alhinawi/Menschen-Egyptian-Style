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
   // Page 25: preposition/article fields, possessives, names, pronouns, grading, saved answers.
   const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
   const errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto('http://127.0.0.1:5299/ab-a12-l13-16.html#25');
   await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   const h=p.locator('[data-native-ab12="25"]');await h.waitFor();
   await h.locator('[data-native-field="p25-1a"]').fill('auf');
   await h.locator('[data-check="g1"] button').click();
   assert.equal(await h.locator('[data-check="g1"] output').textContent(),'Noch einmal','25: wrong preposition not flagged');
   const g1={'p25-1a':'unter','p25-1b':'über','p25-1c1':'Neben','p25-1c2':'em','p25-1c3':'am','p25-1d1':'Vor','p25-1d2':'em','p25-1d3':'Im','p25-1e1':'auf','p25-1e2':'em'};
   for(const [id,v] of Object.entries(g1))await h.locator('[data-native-field="'+id+'"]').fill(v);
   const g2={'p25-2b':'Seine','p25-2c1':'Ihr','p25-2c2':'ihre','p25-2c3':'ihren','p25-2d1':'Ihre','p25-2d2':'Ihre'};
   for(const [id,v] of Object.entries(g2))await h.locator('[data-native-field="'+id+'"]').fill(v);
   const g3={'p25-3b':'Others','p25-3c':'Sophies','p25-3d1':'Pauls','p25-3d2':'Sophies','p25-3e':'Kerners'};
   for(const [id,v] of Object.entries(g3))await h.locator('[data-native-field="'+id+'"]').fill(v);
   const g4={'p25-4b1':'euch','p25-4b2':'uns','p25-4c1':'Ihnen','p25-4c2':'mir','p25-4d1':'dir','p25-4d2':'mir'};
   for(const [id,v] of Object.entries(g4))await h.locator('[data-native-field="'+id+'"]').fill(v);
   for(const b of await h.locator('.naCheck button').all()){await b.scrollIntoViewIfNeeded();await b.click();}
   for(const t of await h.locator('.naCheck output').allTextContents())assert.equal(t,'✓ Richtig!','25: grading failed');
   await p.reload();await p.waitForFunction(()=>document.documentElement.bookReady==='true'||document.documentElement.dataset.bookReady==='true');
   assert.equal(await h.locator('[data-native-field="p25-1e2"]').inputValue(),'em','25: ex1 answer not saved');
   assert.equal(await h.locator('[data-native-field="p25-4d2"]').inputValue(),'mir','25: pronoun answer not saved');
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'25: horizontal overflow');
   assert.deepEqual(errors,[],'25: page errors');
   await p.close();console.log('p25',width,'PASS');
  }
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1)});
