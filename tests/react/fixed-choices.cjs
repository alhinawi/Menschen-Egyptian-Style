// Closed banks are explicit, page-scoped, and independent of the answer key.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),rules=require('../../src/exercises/fixed-choices.json');
const book=file=>file.startsWith('ab-a12')?'ab-a12':file.startsWith('ab')?'ab-a11':['kb-a12-l13-16.html','kb-a12-l17-20.html','l21-24.html'].includes(file)?'kb-a12':'kb-a11';
const server=http.createServer((q,r)=>{const f=path.join(root,'dist',q.url.split('?')[0]);try{r.setHeader('content-type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end('Not found')}});
(async()=>{await new Promise(r=>server.listen(5196,'127.0.0.1',r));const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome-stable',args:['--no-sandbox']});try{const page=await browser.newPage({viewport:{width:390,height:1000}}),seen=new Set();let count=0;const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [file,c] of Object.entries(require('../../src/lessons/manifest.json')).filter(([f,c])=>c.reader&&!f.includes('viewer'))){await page.goto('http://127.0.0.1:5196/'+file);await page.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');const b=book(file);for(const [key,rs] of Object.entries(rules).filter(([key])=>key.startsWith(b+':'))){const n=key.split(':')[1],holder=page.locator('.page[data-page="'+n+'"]');if(!await holder.count())continue;seen.add(key);for(const rule of rs){assert.equal(rule.options.length,new Set(rule.options).size,key+' duplicate option');for(const id of rule.ids){const el=holder.locator('[data-native-field="'+id+'"],[data-field-id="'+id+'"]');assert.equal(await el.count(),1,key+' '+id+' resolves once');assert.equal(await el.evaluate(e=>e.tagName),'SELECT',key+' '+id+' is a select');assert.deepEqual(await el.locator('option').evaluateAll(os=>os.map(o=>o.value)),['',...rule.options],key+' '+id+' exact bank');count++}}}}
assert.equal(seen.size,Object.keys(rules).length,'Every audited page resolves');assert(count>800,'Cross-book coverage');
// Existing checker remains authoritative. Empty/wrong choices must fail, and good picks persist.
for(const sample of [
 {file:'l4-6.html',n:'26',id:'t3c-a',good:'2',bad:'3',check:'.nkbCheck',key:'native-kb11-26'},
 {file:'kb-a12-l13-16.html',n:'14',check:'.nkCheck[data-check="3"]',id:'3-W',good:'G',bad:'F',key:'native-kb12-14'},
 {file:'ab2.html',n:'12',check:'.nabCheck[data-native-task="u1a"]',id:'u1a-2',good:'Lehrer',bad:'Verkäufer',key:'native-ab11-12'},
 {file:'ab-a12-l13-16.html',n:'24',check:'.naCheck[data-check="g3"]',id:'p24-4a',good:'Urlaub',bad:'Wetter',key:'native-ab12-24'}]){
 console.log('Sample',sample.id);await page.goto('http://127.0.0.1:5196/'+sample.file+'#'+sample.n);await page.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');const holder=page.locator('.page[data-page="'+sample.n+'"]');const el=holder.locator('[data-native-field="'+sample.id+'"],[data-field-id="'+sample.id+'"]');
 // Select any correct option named in this sample only after confirming the live field bank.
 if(!await el.count())throw Error('Missing sample '+sample.id);
 const checkAll=async()=>{await holder.locator((sample.check||'')+' button[aria-label="Prüfen"]').evaluateAll(bs=>bs.forEach(b=>b.click()));await page.waitForTimeout(80)};
 const marked=()=>el.evaluate(e=>e.dataset.checkMark||(e.classList.contains('ok')?'ok':e.classList.contains('bad')?'bad':''));
 await el.selectOption('');await checkAll();assert.equal(await marked(),'bad','Empty choice rejected');
 await el.selectOption(sample.bad);await checkAll();assert.equal(await marked(),'bad','Wrong choice rejected');assert.equal(await el.inputValue(),sample.bad);await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');assert.equal(await el.inputValue(),sample.bad,'Saved choice survives reload');
 await el.selectOption(sample.good);await checkAll();assert.equal(await marked(),'ok','Correct choice accepted');
 await el.selectOption('');assert.equal(await el.inputValue(),'');
 // A pre-conversion saved entry outside the bank remains visible, never silently erased.
 await page.evaluate(({key,id})=>{for(const k of Object.keys(localStorage))if(k.startsWith('menschen-book-'))localStorage.removeItem(k);localStorage.setItem(key,JSON.stringify({[id]:'legacy saved answer'}))},{key:sample.key,id:sample.id});await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');assert.equal(await el.inputValue(),'legacy saved answer');assert(await el.locator('option:checked').isDisabled());
}
assert.deepEqual(errors,[]);console.log(count+' audited choices on '+seen.size+' pages: exact options, preserved IDs and persistent selections PASS');
}finally{await browser.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
