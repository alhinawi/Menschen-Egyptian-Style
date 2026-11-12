const {chromium}=require('playwright'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5190'],{stdio:'inherit'});
(async()=>{let b;try{for(let i=0;i<60;i++){try{if((await fetch('http://127.0.0.1:5190')).ok)break}catch{}await new Promise(r=>setTimeout(r,200))}b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 for(const width of [320,390]){
  const p=await b.newPage({viewport:{width,height:900},isMobile:true,hasTouch:true}); p.setDefaultTimeout(5000);const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://127.0.0.1:5190/ab1.html#6');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');const h=p.locator('[data-native-ab11-page="6"]');
  assert.equal(await h.locator('img').count(),3);assert.equal(await h.locator('.nabCheck').count(),5);assert.equal(await h.locator('select').count(),0);
  for(const [id,val] of Object.entries({'1-wer':'wer','1-du':'du','1-hallo':'Hallo','1-ich':'ich','1-wie':'wie','1-heisst':'heißt','1-heisse':'heiße'}))await h.locator(`[data-native-field="${id}"]`).fill(val);
  const check=h.locator('[data-native-task="1"]');await check.locator('button').click();assert.equal(await check.locator('output').textContent(),'✓ Richtig!');
  await h.locator('[data-native-field="1-du"]').fill('Sie');await check.locator('button').click();assert.equal(await check.locator('output').textContent(),'Noch einmal');
  await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');assert.equal(await h.locator('[data-native-field="1-du"]').inputValue(),'Sie');
  await h.locator('[aria-label="3 links b Ich heiße"]').click();await h.locator('[aria-label="3 rechts Sandra."]').click();assert.equal(await h.locator('.nabLines path').count(),2);
  await h.locator('.tapWord[data-word="Hallo"]').first().click();await p.waitForFunction(()=>document.querySelector('.meaningPopup')?.open);assert((await p.locator('.meaningPopup').textContent()).includes('Hallo'));
  await p.keyboard.press('Escape');await p.screenshot({path:`/downloads/ab11-p6-filled-${width}.png`});
  await p.goto('http://127.0.0.1:5190/ab1.html#7');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');const h7=p.locator('[data-native-ab11-page="7"]');
  for(const [group,val] of Object.entries({'7-b':'du','7-c':'du','7-d':'Sie','7-e':'du'}))await h7.locator(`input[name="native-ab11-7-${group}"][aria-label$="${val}"]`).check();
  await h7.locator('[data-native-task="7"] button').click();assert.equal(await h7.locator('[data-native-task="7"] output').textContent(),'✓ Richtig!');
  await h7.locator('[data-native-field="9"]').fill('Das ist Martina Hingis. Sie kommt aus der Schweiz.');await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');assert((await h7.locator('[data-native-field="9"]').inputValue()).includes('Martina'));
  const outside=await h7.locator('.nabCanvas').evaluate(el=>[...el.querySelectorAll('input,textarea,.nabText,.nabArt,.nabCheck')].filter(n=>n.offsetTop+n.offsetHeight>1521).map(n=>n.outerHTML.slice(0,90)));assert.deepEqual(outside,[]);
  assert.deepEqual(errors,[]);console.log(width,'normal clicks, grading, persistence, matching, translation and page boundaries passed');await p.close();
 }
 for(const page of [6,7]){const p=await b.newPage({viewport:{width:390,height:900},isMobile:true,hasTouch:true});await p.goto(`http://127.0.0.1:5190/ab1.html#${page}`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.locator(`[data-native-ab11-page="${page}"]`).screenshot({path:`/downloads/ab11-native-${page}-390.png`});await p.close()}
 }finally{if(b)await b.close();server.kill('SIGTERM')}})().catch(e=>{console.error(e);process.exitCode=1});
