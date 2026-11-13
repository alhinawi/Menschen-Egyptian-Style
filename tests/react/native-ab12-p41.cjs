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
 await new Promise(r=>server.listen(5299,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 try{
  for(const width of [320,390]){
   const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
   const errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto('http://127.0.0.1:5299/ab-a12-l17-20.html#41');
   await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   const h=p.locator('[data-native-ab12="41"]');await h.waitFor();
   assert.equal(await h.locator('.naField').count(),40,'41: expected 40 fields');
   await h.locator('[data-native-field="p41-1-l1"]').fill('تعليم');
   await h.locator('[data-native-field="p41-1-r13"]').fill('بدون');
   await h.locator('[data-native-field="p41-2-8"]').fill('Bahnhof');
   await p.reload();
   await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   const h2=p.locator('[data-native-ab12="41"]');await h2.waitFor();
   assert.equal(await h2.locator('[data-native-field="p41-1-l1"]').inputValue(),'تعليم','41: l1 not persisted');
   assert.equal(await h2.locator('[data-native-field="p41-1-r13"]').inputValue(),'بدون','41: r13 not persisted');
   assert.equal(await h2.locator('[data-native-field="p41-2-8"]').inputValue(),'Bahnhof','41: ex2-8 not persisted');
   assert.deepEqual(errors,[],'41: page errors');
   await p.close();
   console.log(width,'p41 fields persist PASS');
  }
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1;server.close()});
