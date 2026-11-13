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
   const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
   const errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto('http://127.0.0.1:5299/ab-a12-l13-16.html#29');
   await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   const h=p.locator('[data-native-ab12="29"]');await h.waitFor();
   // background artwork loaded
   const bg=h.locator('img.naBg');
   await bg.waitFor();
   const nat=await bg.evaluate(el=>el.naturalWidth);
   assert.equal(nat,1071,'29: background artwork loaded at full size');
   // story text present and tappable
   const words=await h.locator('.tapWord').count();
   assert.ok(words>150,'29: story words tappable, got '+words);
   const sample=await h.locator('.tapWord[data-word="Penzinger"]').count();
   assert.ok(sample>=3,'29: Penzinger words present');
   const heading=await h.locator('.naHead').textContent();
   assert.equal(heading,'Teil 1: Wo ist Pauls Wohnung?','29: heading text');
   assert.deepEqual(errors,[],'29: no page errors');
   await p.close();
   console.log(width+'px p29: background, story text, tappable words, no errors passed');
  }
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1)});
