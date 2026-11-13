const{chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((q,r)=>{let f=path.join(root,'dist',decodeURIComponent(q.url.split('?')[0]));try{r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.json':'application/json'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
const ALL={'index':[9,10,11,12],'l2-3':[13,14,15,16,17,18,19,20,21,22,23,24],'l7-9':[54],'l4-6':[25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],'l10-12':Array.from({length:40},(_,i)=>57+i)};const SEL=(process.env.PAGES||'').split(',').filter(Boolean).map(Number);const map=Object.fromEntries(Object.entries(ALL).map(([k,v])=>[k,SEL.length?v.filter(n=>SEL.includes(n)):v]));
(async()=>{await new Promise(r=>server.listen(+(process.env.PORT||5197),r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const stat={pages:0,graded:0,audio:0};
try{for(const width of(process.env.W?[+process.env.W]:[390]))for(const[file,pages]of Object.entries(map).filter(([k])=>!process.env.F||process.env.F.split(',').includes(k)))for(const pg of pages.filter(n=>n>=+(process.env.A||0)&&n<=+(process.env.B||999))){
 const data=JSON.parse(fs.readFileSync(path.join(root,'src/native-kb11/p'+pg+'.json'),'utf8'));
 const p=await b.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('requestfailed',r=>!/\.mp3(\?|$)/.test(r.url())&&errors.push('reqfail '+r.url()));
 await p.goto('http://localhost:'+(process.env.PORT||5197)+'/'+file+'.html#'+pg);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',null,{timeout:15000});
 const h=p.locator(`[data-native-page="${pg}"]`);await h.waitFor({state:'attached'});
 assert.equal(await h.locator('.nkbWord,.tapWord').count()>0||data.blocks.length===0,true,'text '+pg);
 assert.equal(await h.locator('img.nkbArt').count(),data.art.length);
 // word dialog
 await h.locator('.tapWord').first().evaluate(e=>e.click());await p.waitForFunction(()=>document.querySelector('.meaningPopup')?.open,null,{timeout:4000});await p.locator('.meaningPopup').evaluate(e=>e.close());
 // graded radios: real touch tap on a wrong option, Prüfen marks it red, tapping the right option turns it green
 {const rad=data.fields.filter(f=>f.kind==='radio'&&f.answer!==undefined);const w=rad.find(f=>f.answer==='false');const c=w&&rad.find(f=>f.name===w.name&&f.answer==='true');
  if(w&&c){const tap=async f=>{const el=h.locator(`[data-native-field="${f.id}"]`);await el.evaluate(e=>e.scrollIntoView({block:'center'}));await p.waitForTimeout(300);const bb=await el.boundingBox();await p.touchscreen.tap(bb.x+bb.width/2,bb.y+bb.height/2)};
   await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
   await h.locator('.nkbCheck:not(.nkbCheckLm) button').evaluateAll(bs=>bs.forEach(b=>b.click()));assert.equal(await h.locator(`[data-native-field="${c.id}"].bad`).count(),1,pg+' empty row not red');
   await tap(w);assert.equal(await h.locator(`[data-native-field="${w.id}"]`).isChecked(),true,pg+' wrong tap');
   await h.locator('.nkbCheck:not(.nkbCheckLm) button').evaluateAll(bs=>bs.forEach(b=>b.click()));assert.equal(await h.locator(`[data-native-field="${w.id}"].bad`).count(),1,pg+' wrong not red');
   await tap(c);await h.locator('.nkbCheck:not(.nkbCheckLm) button').evaluateAll(bs=>bs.forEach(b=>b.click()));assert.equal(await h.locator(`[data-native-field="${c.id}"].ok`).count(),1,pg+' right not green');stat.radioTap=(stat.radioTap||0)+1}}
 // fill correct answers
 const ans=data.fields.filter(f=>f.answer!==undefined);
 for(const f of data.fields){const el=h.locator(`[data-native-field="${f.id}"]`);if(f.answer===undefined)continue;
  if(f.kind==='radio'){if(f.answer==='true')await el.evaluate(e=>e.click())}
  else if(f.kind==='checkbox'){if(f.answer==='true')await el.evaluate(e=>e.click())}
  else if(f.kind==='select')await el.selectOption(f.answer.split('|')[0]);
  else await el.fill(f.answer.split('|')[0])}
 // every ungraded radio/checkbox/digit box must be a real tappable control, saved through reload
 const un=data.fields.filter(f=>f.answer===undefined&&(f.kind==='radio'||f.kind==='checkbox'));
 for(const f of un.slice(0,40)){const el=h.locator(`[data-native-field="${f.id}"]`);await el.scrollIntoViewIfNeeded();const bb=await el.boundingBox();assert(bb&&bb.width>=10&&bb.height>=7,pg+" tiny "+f.id+" "+JSON.stringify(bb));await p.touchscreen.tap(bb.x+bb.width/2,bb.y+bb.height/2);assert.equal(await el.isChecked(),true,pg+' tap '+f.id);stat.tapped=(stat.tapped||0)+1}
 for(const f of data.fields.filter(f=>f.maxlen===1&&f.answer===undefined)){const el=h.locator(`[data-native-field="${f.id}"]`);await el.fill('3');assert.equal(await el.inputValue(),'3')}
 if(un.length){await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');assert.equal(await h.locator(`[data-native-field="${un.slice(0,40).filter(x=>x.kind==='checkbox'||x.name===un[0].name).pop().id}"]`).isChecked(),true,pg+' persist radio')}
 const groups=[...new Set(ans.map(f=>f.group))];
 if(groups.length){const btns=h.locator('.nkbCheck:not(.nkbCheckLm) button');assert.equal(await btns.count(),groups.length);for(const x of await btns.all())await x.evaluate(e=>e.click());const outs=await h.locator('.nkbCheck:not(.nkbCheckLm) output').allTextContents();assert(outs.every(o=>o==='✓ Richtig!'),pg+' '+JSON.stringify(outs));stat.graded+=groups.length;
  const tf=ans.find(f=>f.kind==='text');if(tf){await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');assert.equal(await h.locator(`[data-native-field="${tf.id}"]`).inputValue(),tf.answer.split('|')[0],'persist '+pg)}}
 if(data.audio.length){await h.locator('.nkbListen').first().evaluate(e=>e.click());await p.waitForFunction(()=>[...document.querySelectorAll('.nkb audio')].some(a=>!a.paused||a.readyState>0),null,{timeout:5000});stat.audio+=data.audio.length}
 const geo=await h.evaluate(e=>({sw:e.closest('.page').scrollWidth,cw:e.closest('.page').clientWidth}));assert(geo.sw<=geo.cw+2,pg+JSON.stringify(geo));
 assert.deepEqual(errors,[],pg);stat.pages++;await p.close()}}
finally{console.log(JSON.stringify(stat));await b.close();server.close()}})().catch(e=>{console.error(e.message);process.exitCode=1});
