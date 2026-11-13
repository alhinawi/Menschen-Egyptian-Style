const {chromium}=require('playwright'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5195'],{stdio:'inherit'});
const P={'6':{h:1465,fields:{'6-b2':'auf','6-b3':'in','6-b4':'unter','6-b5':'zwischen','6-b7':'über','6-b9':'vor','6-r1':'Restaurant','6-r2':'Zentrum','6-r3':'Bahnhof','6-r4':'Bank','6-r5':'Post','6-r6':'Ampel','6-d2':'Zentrum','6-d3':'Bahnhof','6-d4':'Bank','6-d5':'Post','6-d6':'Ampel','6-d7':'Café'},checks:['6-2','6-3a','6-3b'],bad:'6-b2'},
 '7':{h:1447,fields:{'7-4b':'dem','7-4c1':'dem','7-4c2':'der','7-4d':'der','7-4e':'der','7-5b1':'zwischen der','7-5b2':'dem','7-5c':'hinter der','7-5d':'an der','7-5e':'auf der','7-5f':'im','7-5g':'vor der'},checks:['7-4','7-5'],bad:'7-4b'},
 '8':{h:1452,fields:{'8-8a':'bin nicht von hier','8-8b':'ist sehr nett','8-8c':'Trotzdem: Dankeschön','8-8d':'sehen Sie schon','8-8e1':'ist ganz in der Nähe','8-8e2':'Wenden Sie hier','8-9b':'helfen','8-9c':'das Hotel „Marienhof“','8-9d':'Frage','8-9e':'Moment'},checks:['8-8','8-9'],bad:'8-8b'},
 '9':{h:1447,fields:{'9-2a':'ei','9-2b':'äu','9-2c':'au','9-3a1':'ei','9-3a2':'ei','9-3a3':'ei','9-3a4':'ei','9-3b1':'ei','9-3b2':'au','9-3b3':'ei','9-3c1':'au','9-3c2':'eu','9-3c3':'au','9-3c4':'eu','9-3d1':'ei','9-3d2':'au','9-3d3':'eu','9-3d4':'ei','9-3d5':'ei','9-3d6':'au'},checks:['9-2','9-3'],bad:'9-2a',mark:'9-m-kino'},
 '10':{h:1452,fields:{'10-1b':'Post','10-1c':'Bahnhof','10-1d':'Stadtmitte','10-1e':'Bank','10-1f':'Stadtplan','10-2b':'biegen','10-2c':'links','10-2d':'Kilometer','10-2e':'rechts','10-2f':'Brücke','10-2g':'Ampel','10-3bt':'er','10-3ct':'em','10-3dt':'er','10-3et':'er','10-3ft':'er','10-4a':'önnen','10-4b':'elfen','10-4c':'uche','10-4d':'ahren','10-4e':'ehen','10-4f1':'ehr','10-4f2':'ett','10-4g':'ragen','10-4h1':'ut','10-4h2':'eid','10-4i':'rotzdem'},radios:['3b neben','3c vor','3d in','3e hinter','3f über'],checks:['10-1','10-2','10-3','10-4'],bad:'10-1b'},
 '11':{h:1447,fields:{},checks:[]},
 '12':{h:1452,fields:{'12-1a':'Baum','12-1b':'Garage','12-1c':'Garten','12-1d':'Haus','12-1e':'Fenster','12-1f':'Treppe','12-2b':'Kinderzimmer','12-2c':'Flur','12-2d':'Wohnzimmer','12-2e':'Schlafzimmer','12-3b':'Maximilians Haus','12-3c':'Maximilians Nachbar','12-3d':'Maximilians Nachbarin','12-5lb':'Seine Schlüssel','12-5lc':'Sein Handy','12-5ld':'Seine Brille','12-5le':'Seinen Stift','12-5rb':'Seine Schlüssel','12-5rc':'Sein Handy','12-5rd':'Seine Brille','12-5re':'Sein Stift'},checks:['12-2','12-3','12-5l','12-5r'],bad:'12-2b'}};
(async()=>{let b;try{for(let i=0;i<60;i++){try{if((await fetch('http://127.0.0.1:5195')).ok)break}catch{}await new Promise(r=>setTimeout(r,200))}b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 for(const width of [320,390]){for(const [page,cfg] of Object.entries(P)){
  const p=await b.newPage({viewport:{width,height:900},isMobile:true,hasTouch:true});p.setDefaultTimeout(8000);const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://127.0.0.1:5195/ab-a12-l13-16.html#'+page);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  const h=p.locator('[data-native-ab12="'+page+'"]');
  for(const [id,val] of Object.entries(cfg.fields))await h.locator(`[data-native-field="${id}"]`).fill(val);
  for(const rl of cfg.radios||[])await h.locator(`[aria-label="${rl}"]`).check();
  for(const cid of cfg.checks){const c=h.locator(`[data-check="${cid}"]`);await c.locator('button').click();assert.equal(await c.locator('output').textContent(),'✓ Richtig!',cid+' should grade correct')}
  if(cfg.bad){await h.locator(`[data-native-field="${cfg.bad}"]`).fill('falsch');
  const c=h.locator(`[data-check="${cfg.checks[0]}"]`);await c.locator('button').click();assert.equal(await c.locator('output').textContent(),'Noch einmal');}
  await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  if(cfg.bad)assert.equal(await h.locator(`[data-native-field="${cfg.bad}"]`).inputValue(),'falsch');
  if(cfg.mark){const m=h.locator(`[aria-label="Markieren: Kino"]`);await m.click();assert.ok(await m.getAttribute('class').then(c=>c.includes('on')),'mark toggles on')}
  const outside=await h.locator('.naCanvas').evaluate((el,H)=>[...el.querySelectorAll('input,button,div,img')].filter(n=>n.offsetTop+n.offsetHeight>H+2).map(n=>n.className+'@'+n.offsetTop).slice(0,5),cfg.h);assert.deepEqual(outside,[]);
  if(cfg.mark){assert.ok(await h.locator(`[aria-label="Markieren: Kino"]`).getAttribute('class').then(c=>c.includes('on')),'mark persists after reload')}
  await h.locator('.tapWord').first().click();await p.waitForFunction(()=>document.querySelector('.meaningPopup')?.open);await p.keyboard.press('Escape');
  await h.locator('.naCanvas').screenshot({path:`/downloads/ab-a12-p${page}-filled-${width}.png`});
  assert.deepEqual(errors,[]);console.log(width,'p'+page,'fills, grading, persistence, boundaries, translation passed');await p.close();
 }}
 }finally{if(b)await b.close();server.kill('SIGTERM')}})().catch(e=>{console.error(e);process.exitCode=1});
