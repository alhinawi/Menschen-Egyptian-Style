// Negative control for per-sub-answer scoring: an account with no answers (or only wrong ones)
// must earn nothing, however many checks it presses. Blank selects whose key is empty, static
// word/map cards and untouched radio rows must never count.
const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((q,r)=>{try{let u=q.url.split('?')[0];if(!path.extname(u)&&!fs.existsSync(path.join(root,'dist',u)))u='/index.html';const f=path.join(root,'dist',u);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.json':'application/json'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
const routes=(process.env.ROUTES||'abm1.html,ab-a12-l13-16.html,ab-a12-l17-20.html,ab4-6.html,ab-l7-9.html,l2-3.html').split(',');
(async()=>{await new Promise(r=>server.listen(5297,r));
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
try{
 const ctx=await b.newContext({viewport:{width:390,height:1000}});
 await ctx.route('**/menscheny-api*/**',r=>r.fulfill({status:503,body:'{}'}));
 // one saved WRONG answer (key for 11-d is "kommt"): still zero.
 await ctx.addInitScript(()=>{if(localStorage.getItem('native-ab11-8')===null)localStorage.setItem('native-ab11-8',JSON.stringify({'11-d':'kommst'}))});
 for(const route of routes){const p=await ctx.newPage();
  await p.goto('http://localhost:5297/'+route);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(1000);
  const n=await p.evaluate(()=>[...document.querySelectorAll('button.compactCheckButton')].filter(x=>!x.closest('form')&&!x.classList.contains('check')).length);
  for(let i=0;i<n;i++){await p.evaluate(i=>{const bs=[...document.querySelectorAll('button.compactCheckButton')].filter(x=>!x.closest('form')&&!x.classList.contains('check'));bs[i]&&bs[i].click()},i);await p.waitForTimeout(200)}
  console.log(route,n,'checks pressed');await p.close()}
 const p=await ctx.newPage();await p.goto('http://localhost:5297/index.html');
 const flags=await p.evaluate(()=>Object.fromEntries(Object.keys(localStorage).filter(k=>k.startsWith('native-done-')).map(k=>[k,Object.keys(JSON.parse(localStorage[k]))])));
 assert.deepEqual(flags,{},'blank and wrong answers earn no flags: '+JSON.stringify(flags).slice(0,400));
 console.log('PASS blank/wrong account earns zero');
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
