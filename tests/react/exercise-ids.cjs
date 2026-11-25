// Ids are book|page:exercise (book from the page's data-native-book, not the URL).
// Stability guard for exercise-completion flags. Every check button on every lesson page must
// map to a flag id, and the full list of ids must match the committed golden file. Reordering
// or adding checks on a page changes the list and fails here, so the change has to be reviewed
// (give the new check a data-exercise-id, or regenerate the golden knowingly) before it can
// award one exercise twice. Run with --update to rewrite the golden file.
const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
const root=path.resolve(__dirname,'../..'),golden=path.join(__dirname,'exercise-ids.golden.json');
const server=http.createServer((q,r)=>{try{const f=path.join(root,'dist',q.url.split('?')[0]);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.json':'application/json'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
const routes=fs.readdirSync(path.join(root,'dist')).filter(f=>f.endsWith('.html')&&!/viewer|teacher|404/.test(f)).sort();
(async()=>{await new Promise(r=>server.listen(5301,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const result={},problems=[];
try{const ctx=await b.newContext({viewport:{width:390,height:1000}});await ctx.route('**/menscheny-api*/**',r=>r.fulfill({status:503,body:'{}'}));
 for(const route of routes){const p=await ctx.newPage();
  try{await p.goto('http://localhost:5301/'+route);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',null,{timeout:10000});await p.waitForTimeout(1200)}catch(e){await p.close();continue}
  const r=await p.evaluate(()=>{const fs='output,.feedback,[data-task-feedback],[role="status"]';
   const scopeless=[];const bs=[...document.querySelectorAll('button.compactCheckButton')];
   bs.forEach((x,i)=>{let s=x.parentElement,ok=false;while(s&&!s.classList.contains('page')){if(s.querySelector(fs)){ok=true;break}s=s.parentElement}if(!ok&&!x.closest('form')&&!x.classList.contains('check'))scopeless.push(x.closest('.page')?.dataset.page+'#'+i)});
   localStorage.clear();bs.forEach(x=>x.dispatchEvent(new CustomEvent('check-feedback',{bubbles:true,detail:{correct:true}})));
   const flags=[];for(const k of Object.keys(localStorage))if(k.startsWith('native-done-'))flags.push(...Object.keys(JSON.parse(localStorage[k])).map(f=>k.slice(12)+'|'+f));
   const counted=bs.filter(x=>!x.closest('form')&&!x.classList.contains('check')).length;
   return {counted,flags:flags.sort(),scopeless}});
  if(r.flags.length!==new Set(r.flags).size)problems.push(route+': duplicate ids');
  if(r.counted!==r.flags.length)problems.push(route+': '+(r.counted-r.flags.length)+' check button(s) without an id');
  if(r.scopeless.length)problems.push(route+': check buttons with no feedback scope (no success event): '+r.scopeless.join(','));
  result[route]=r.flags;await p.close()}
}finally{await b.close();server.close()}
if(process.argv.includes('--update')){fs.writeFileSync(golden,JSON.stringify(result,null,1)+'\n');console.log('golden updated:',Object.keys(result).length,'lessons',Object.values(result).flat().length,'ids')}
else{assert.deepEqual(result,JSON.parse(fs.readFileSync(golden,'utf8')),'exercise ids changed: review, then rerun with --update');console.log('PASS exercise ids match golden',Object.values(result).flat().length)}
if(problems.length){console.log('PROBLEMS\n'+problems.join('\n'));process.exitCode=1}else console.log('no problems')
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
