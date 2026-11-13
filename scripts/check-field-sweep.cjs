// Reusable empty-state field audit. Run after npm run build:
// node scripts/check-field-sweep.cjs [output-prefix] [optional-inventory.tsv]
// Counts visible enabled input/select/textarea fields after every check on a fresh 390px page.
// Also records button-based keyed fields separately (not part of the legacy field count).
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const {serve}=require('../tests/react/helpers/static-server.cjs');
const prefix=process.argv[2]||'/tmp/check-field-sweep';
const root=path.resolve(__dirname,'..');
const inventory=new Map();
if(process.argv[3])for(const line of fs.readFileSync(process.argv[3],'utf8').trim().split('\n')){const [route,p]=line.split('\t');inventory.set(route+'#'+p.slice(1),[route,p.slice(1)])}
else for(const route of fs.readdirSync(path.join(root,'src/lessons')).filter(x=>x.endsWith('.json'))){
 const walk=x=>{if(!Array.isArray(x))return;const attrs=x[1];if(attrs&&typeof attrs==='object'&&attrs['data-page']&&String(attrs.class||'').split(' ').includes('page')){const n=String(attrs['data-page']);if(/^\d+$/.test(n))inventory.set(route.replace('.json','.html')+'#'+n,[route.replace('.json','.html'),n])}for(const child of x)if(Array.isArray(child))walk(child)};
 walk(JSON.parse(fs.readFileSync(path.join(root,'src/lessons',route))));
}
if(process.env.LIST){console.log(JSON.stringify([...inventory.values()]));process.exit(0)}
function sourceKeys(route,no){const book=(route.startsWith('ab')?'ab':'kb')+'-'+(route.includes('a12')||route.startsWith('l21-24')?'a12':'a11');let out=[];for(const dir of ['scan-data','native-data']){const f=path.join(root,'src',dir,book,'p'+no+'.json');if(fs.existsSync(f))out.push(...(JSON.parse(fs.readFileSync(f)).fields||[]))}return out}
(async()=>{const server=await serve(5297),browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox','--disable-background-timer-throttling','--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows']});const records=[];let cursor=0;const pairs=[...inventory.values()].slice(Number(process.env.START||0),Number(process.env.START||0)+Number(process.env.LIMIT||10000));
 try{await Promise.all(Array.from({length:4},async()=>{while(cursor<pairs.length){const [route,no]=pairs[cursor++];const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await context.newPage();p.setDefaultTimeout(10000);try{
 await p.addInitScript(()=>{window.__fieldCheckCount=0;document.addEventListener('check-feedback',()=>window.__fieldCheckCount++)});await p.goto('http://127.0.0.1:5297/'+route+'#'+no);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.evaluate(no=>{const i=[...document.querySelectorAll('.page')].findIndex(e=>e.dataset.page===no);if(i>=0)window.bookPage(i)},no);
 const pg=p.locator('.page[data-page="'+no+'"]').first();await pg.waitFor();await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
 const buttons=pg.locator('.compactCheckButton');const count=await buttons.count();if(!count)continue;
 for(let i=0;i<count;i++){const before=await p.evaluate(()=>window.__fieldCheckCount);await buttons.nth(i).evaluate(e=>e.click());await p.waitForFunction(before=>window.__fieldCheckCount>before,before,{timeout:1500}).catch(()=>{});}await p.waitForTimeout(50);
 const row=await pg.evaluate((pg,keys)=>{const visible=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'&&getComputedStyle(e).display!=='none'};
 const fields=[...pg.querySelectorAll('input:not([type=hidden]),select,textarea')].filter(e=>visible(e)&&!e.disabled);
 const mark=e=>e.dataset.checkMark||(/(?:^|\s)(?:(?:hybrid|answer|np|na|nkb)?(?:Wrong|Correct)|bad|ok|wrong|correct|good)(?:\s|$)/.test(e.className)?e.className:null)||((e.closest('label,td')?.className||'').match(/answer(?:Wrong|Correct)/)?.[0]||null);
 const info=e=>{const id=e.dataset.nativeField||e.dataset.nativeRadio||e.dataset.fieldId||e.name||e.id||e.getAttribute('aria-label')||'';const label=e.getAttribute('aria-label')||'';const related=keys.filter(k=>k.id===id||k.name&&(e.name===k.name||e.name.endsWith('-'+k.name)));let category,reason;
 if(mark(e)){category='marked';reason=mark(e)}
 else if(e.dataset.confidence!==undefined||/confidence|Selbsteinschätzung/.test(id+' '+label)){category='ungraded';reason='self-assessment'}
 else if(e.readOnly){category='ungraded';reason='read-only example'}
 else if(/eigene|eigen-|persön|partner|notiz|stat-|mail-|hobby-|herkunft|wohnort|sprache/i.test(id+' '+label)&&!related.some(k=>k.answer!==undefined)){category='ungraded';reason='personal/open response, no source key'}
 else if(related.some(k=>k.answer!==undefined)){category='bug';reason='source key exists but no field mark'}
 else{category='review';reason='no matching source key; inspect native grading or open-response intent'}
 return {id,label,tag:e.tagName,type:e.type,value:e.value,mark:mark(e),category,reason}}
 return {buttons:pg.querySelectorAll('.compactCheckButton').length,fields:fields.length,marked:fields.filter(e=>mark(e)).length,unmarked:fields.filter(e=>!mark(e)).map(info),extraKeyed:[...pg.querySelectorAll('[data-native-field]')].filter(e=>!fields.includes(e)&&visible(e)).map(info),placement:[...pg.querySelectorAll('.compactCheckButton')].map(e=>e.parentElement.dataset.checkPlaced||'na')}
 },sourceKeys(route,no));records.push({route,page:no,...row});fs.writeFileSync(prefix+'.partial.json',JSON.stringify(records,null,2));console.log(route,no,row.fields,row.marked,row.unmarked.length);
 }catch(e){records.push({route,page:no,error:e.message});console.error(route,no,e.message)}finally{await context.close()}}}));
 records.sort((a,b)=>a.route.localeCompare(b.route)||Number(a.page)-Number(b.page));fs.writeFileSync(prefix+'.json',JSON.stringify(records,null,2));fs.writeFileSync(prefix+'.tsv',records.map(r=>r.error?[r.route,'p'+r.page,'ERROR',r.error].join('\t'):[r.route,'p'+r.page,'btns='+r.buttons,'fields='+r.fields,'marked='+r.marked,'unmarked='+r.unmarked.length,'placed='+r.placement.join(','),'ungraded='+r.unmarked.filter(x=>x.category==='ungraded').length,'bug='+r.unmarked.filter(x=>x.category==='bug').length,'review='+r.unmarked.filter(x=>x.category==='review').length].join('\t')).join('\n')+'\n');
 console.log('DONE',records.length,'pages',prefix);
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
