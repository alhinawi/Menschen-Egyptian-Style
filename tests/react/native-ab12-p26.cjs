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
   await p.goto('http://127.0.0.1:5298/ab-a12-l13-16.html#26');
   await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   const h=p.locator('[data-native-ab12="26"]');await h.waitFor();
   await h.locator('[data-native-field="p26-3a"]').fill('links');
   await h.locator('[data-check="g3"] button').click();
   assert.equal(await h.locator('[data-check="g3"] output').textContent(),'Noch einmal','26: wrong direction not flagged');
   const g1={'p26-1a':'Können','p26-1b':'Können Sie mir','p26-1c':'Kann ich Sie','p26-1d':'Haben Sie'};
   const g2={'p26-2a':'Sie den Weg','p26-2b':'ist der Bahnhof','p26-2c':'suche den Bahnhof'};
   const g3={'p26-3a':'geradeaus','p26-3b':'links','p26-3c':'rechts','p26-3d':'Wenden'};
   const g4={'p26-4a':'mir leid','p26-4b':'Ich bin','p26-4c':'hier','p26-4d':'Ich bin nicht'};
   const g5={'p26-5a':'groß','p26-5b':'Zimmer','p26-5c':'Erdgeschoss','p26-5d':'Stock'};
   const g6={'p26-6a':'finde','p26-6b':'sieht','p26-6c':'mag'};
   const g7={'p26-7a':'gefällt','p26-7b':'ist','p26-7c':'finde'};
   const g8={'p26-8a':'Gibt es','p26-8b':'es gibt'};
   for(const grp of [g1,g2,g3,g4,g5,g6,g7,g8])for(const [id,v] of Object.entries(grp))await h.locator('[data-native-field="'+id+'"]').fill(v);
   for(const g of ['g1','g2','g3','g4','g5','g6','g7','g8']){
    await h.locator('[data-check="'+g+'"] button').click();
    assert.equal(await h.locator('[data-check="'+g+'"] output').textContent(),'✓ Richtig!','26: '+g+' correct answers graded');
   }
   // confidence radios
   await h.locator('[data-native-field="s1"][value="0"]').check();
   assert.equal(await h.locator('[data-native-field="s1"][value="0"]').isChecked(),true,'26: confidence radio selectable');
   // saved answers across reload
   await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   const h2=p.locator('[data-native-ab12="26"]');await h2.waitFor();
   assert.equal(await h2.locator('[data-native-field="p26-3a"]').inputValue(),'geradeaus','26: answers persist');
   assert.equal(await h2.locator('[data-native-field="s1"][value="0"]').isChecked(),true,'26: confidence persists');
   assert.deepEqual(errors,[],'26: no page errors');
   await p.close();
   console.log(width+'px p26: fill-in groups, grading, confidence radios, saved answers passed');
  }
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1)});
