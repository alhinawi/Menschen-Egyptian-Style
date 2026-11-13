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
   const p=await browser.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});
   const errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto('http://127.0.0.1:5298/ab-a12-l13-16.html#28');
   await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   const h=p.locator('[data-native-ab12="28"]');await h.waitFor();
   // grid radios selectable
   await h.locator('[data-native-field="ga"][value="T"]').check();
   await h.locator('[data-native-field="gb"][value="C"]').check();
   await h.locator('[data-check="grid"] button').click();
   assert.equal(await h.locator('[data-check="grid"] output').textContent(),'Noch einmal','28: wrong grid not flagged');
   const ans={ga:'C',gb:'T',gc:'T',gd:'C',ge:'C'};
   for(const [id,v] of Object.entries(ans))await h.locator('[data-native-field="'+id+'"][value="'+v+'"]').check();
   await h.locator('[data-check="grid"] button').click();
   assert.equal(await h.locator('[data-check="grid"] output').textContent(),'✓ Richtig!','28: correct grid graded');
   // table + note fields accept input
   await h.locator('[data-native-field="tB1"]').fill('1 Zimmer');
   await h.locator('[data-native-field="n1"]').fill('Die Lage');
   // saved answers across reload
   await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   const h2=p.locator('[data-native-ab12="28"]');await h2.waitFor();
   assert.equal(await h2.locator('[data-native-field="tB1"]').inputValue(),'1 Zimmer','28: table answer persists');
   assert.equal(await h2.locator('[data-native-field="ga"][value="C"]').isChecked(),true,'28: grid radio persists');
   assert.deepEqual(errors,[],'28: no page errors');
   await p.close();
   console.log(width+'px p28: table fields, grid grading, note fields, saved answers passed');
  }
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1)});
