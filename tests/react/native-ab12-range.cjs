const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),{spawn}=require('node:child_process');
const PORT=5191;
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port',String(PORT)],{stdio:'inherit'});
const pages=fs.readdirSync('src/native-ab12/range').filter(f=>/^p\d+\.json$/.test(f)).map(f=>+f.slice(1,-5)).sort((a,b)=>a-b);
const specs=Object.fromEntries(pages.map(n=>[n,JSON.parse(fs.readFileSync(`src/native-ab12/range/p${n}.json`,'utf8'))]));
(async()=>{let b;try{
 for(let i=0;i<60;i++){try{if((await fetch(`http://127.0.0.1:${PORT}`)).ok)break}catch{}await new Promise(r=>setTimeout(r,200))}
 b=await chromium.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 for(const width of [320,390])for(const n of pages){
  const spec=specs[n];const p=await b.newPage({viewport:{width,height:900},isMobile:true,hasTouch:true});p.setDefaultTimeout(8000);
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  const html=n<=35?'ab-a12-l13-16.html':n<=65?'ab-a12-l17-20.html':'ab-a12-l21-24.html';
  await p.goto(`http://127.0.0.1:${PORT}/${html}#${n}`);
  await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',null,{timeout:30000});
  const h=p.locator(`[data-native-ab12="${n}"]`);await h.waitFor();
  assert.equal(await h.locator('select').count(),0);
  assert((await h.locator('img[src*="ab-a12-p'+n+'.png"]').count())===0,'full-page scan used as primary');
  const chks=spec.items.filter(i=>i.k==='chk');
  for(const [ci,c] of chks.entries()){
   const fields=spec.items.filter(i=>i.k==='f'&&i.g===c.g&&i.a);
   for(const f of fields)await h.locator(`[data-native-field="${f.id}"]`).fill(String(f.a).split('|')[0]);
   for(const d of spec.items.filter(i=>i.k==='d'&&i.g===c.g&&i.a===true))await h.locator(`input[aria-label="${d.l}"]`).check({force:true});
   for(const w of spec.items.filter(i=>i.k==='w'&&i.g===c.g&&i.a))await h.locator(`button[aria-label="${'Durchstreichen: '+w.l}"]`).click();
   for(const m of spec.items.filter(i=>i.k==='mk'&&i.g===c.g&&i.a)){const btn=h.locator(`button[aria-label="${'Markieren: '+m.l}"]`);await btn.click();if(m.a==='g')await btn.click()}
   const box=h.locator('.naCheck').nth(ci);await box.locator('button').click();
   assert.equal(await box.locator('output').textContent(),'✓ Richtig!',`${n}/${c.g}: correct answers`);
   if(fields.length){await h.locator(`[data-native-field="${fields[0].id}"]`).fill('falsch');await box.locator('button').click();assert.equal(await box.locator('output').textContent(),'Noch einmal',`${n}/${c.g}: wrong answer`)}
  }
  const dots=spec.items.filter(i=>i.k==='d');
  if(dots.length){const d=dots[0];const el=h.locator(`input[aria-label="${d.l}"]`);await el.check({force:true});assert(await el.isChecked());
   const d2=dots.find(x=>x.id===d.id&&x.v!==d.v);if(d2){await h.locator(`input[aria-label="${d2.l}"]`).check({force:true});assert(!(await el.isChecked()),'radio exclusive')}}
  const free=spec.items.find(i=>i.k==='f'&&!i.g);
  if(free){const f=h.locator(`[data-native-field="${free.id}"]`);await f.fill('Test');const exp='Test'.slice(0,free.max||99);await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',null,{timeout:30000});
   assert.equal(await h.locator(`[data-native-field="${free.id}"]`).inputValue(),exp,'saved value after reload')}
  assert.deepEqual(errors,[]);
  console.log(width,n,`${chks.length} checks, ${dots.length} marks: grading, wrong answers, radios, saved reload ok`);
  await p.close();
 }
}finally{if(b)await b.close();server.kill()}})().catch(e=>{console.error(e);process.exitCode=1});
