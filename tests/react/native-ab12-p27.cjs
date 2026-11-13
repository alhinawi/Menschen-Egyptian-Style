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
 await new Promise(r=>server.listen(5297,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 try{
  for(const width of [320,390]){
   const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
   const errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto('http://127.0.0.1:5297/ab-a12-l13-16.html#27');
   await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   const h=p.locator('[data-native-ab12="27"]');await h.waitFor();
   await h.locator('[data-native-field="p27-2c"]').fill('oben');
   await h.locator('[data-check="g2"] button').click();
   assert.equal(await h.locator('[data-check="g2"] output').textContent(),'Noch einmal','27: wrong preposition not flagged');
   const g2={'p27-2a':'neben','p27-2b':'dem','p27-2c':'zwischen','p27-2d':'den'};
   const g3={'p27-3a':'seine','p27-3b':'Ihr','p27-3c':'ihr'};
   const g4={'p27-4a1':'gefällt','p27-4a2':'mir','p27-4b1':'gehört','p27-4b2':'dir','p27-4c1':'danken','p27-4c2':'dir','p27-4d1':'helfen','p27-4d2':'ihnen'};
   for(const grp of [g2,g3,g4])for(const [id,v] of Object.entries(grp))await h.locator('[data-native-field="'+id+'"]').fill(v);
   await h.locator('[data-native-field="p27-1a"]').fill('Balkon');
   await h.locator('[data-native-field="p27-5a"]').fill('Präpositionen');
   for(const g of ['g2','g3','g4']){
    await h.locator('[data-check="'+g+'"] button').click();
    assert.equal(await h.locator('[data-check="'+g+'"] output').textContent(),'✓ Richtig!','27: '+g+' correct answers graded');
   }
   // confidence radios
   await h.locator('[data-native-field="s1"][value="0"]').check();
   assert.equal(await h.locator('[data-native-field="s1"][value="0"]').isChecked(),true,'27: confidence radio selectable');
   // saved answers across reload
   await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   const h2=p.locator('[data-native-ab12="27"]');await h2.waitFor();
   assert.equal(await h2.locator('[data-native-field="p27-2c"]').inputValue(),'zwischen','27: answers persist');
   assert.equal(await h2.locator('[data-native-field="s1"][value="0"]').isChecked(),true,'27: confidence persists');
   assert.deepEqual(errors,[],'27: no page errors');
   await p.close();
   console.log(width+'px p27: fill-in groups, grading, confidence radios, saved answers passed');
  }
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1)});
