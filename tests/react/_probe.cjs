const {chromium}=require('/usr/share/code/resources/app/node_modules/playwright-core');const fs=require('fs'),http=require('http'),path=require('path');const root='/tmp/repo';
const server=http.createServer((q,r)=>{try{let u=q.url.split('?')[0];if(!path.extname(u)&&!fs.existsSync(path.join(root,'dist',u)))u='/index.html';const f=path.join(root,'dist',u);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
const L=fs.readFileSync('/tmp/graded-unmapped.txt','utf8').trim().split('\n').map(l=>l.split(' '));
(async()=>{await new Promise(r=>server.listen(5298,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const ctx=await b.newContext({viewport:{width:390,height:1000}});await ctx.route('**/api/**',r=>r.fulfill({status:503,body:'{}'}));
const out=[];const routes=[...new Set(L.map(l=>l[0]))];
for(const route of routes){const p=await ctx.newPage();await p.goto('http://localhost:5298/'+route);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',null,{timeout:20000});await p.waitForTimeout(1500);
 for(const [r,,pg,id] of L.filter(l=>l[0]===route)){
  const o=await p.evaluate(({pg,id})=>{const pages=[...document.querySelectorAll('.page')].filter(x=>x.dataset.page===pg);const pgEl=pages[0];if(!pgEl)return {err:'nopage'};
   const hs=[...pgEl.querySelectorAll('[data-exercise-id],[data-native-task],[data-native-check]')].filter(h=>(h.dataset.exerciseId||h.dataset.nativeTask||h.dataset.nativeCheck)===id||id==='?');
   const h=hs[0];const q=s=>pgEl.querySelectorAll(s).length;
   return {holder:h?h.outerHTML.slice(0,140):null,cls:h?.className,fields:q('[data-native-field]'),arrows:q('[data-native-arrow]'),radios:q('input[type=radio]'),checks:q('input[type=checkbox]'),sel:q('select'),txt:q('input[type=text],textarea'),btnP:q('button[aria-pressed]'),svg:q('svg'),dv:q('[data-value]'),checkBtns:q('button.compactCheckButton'),hs:hs.length,names:[...new Set([...pgEl.querySelectorAll('[data-native-field]')].map(e=>e.dataset.nativeField))].slice(0,12)}},{pg,id});
  out.push([route,pg,id,o]);}
 await p.close()}
for(const o of out)console.log(o[0],o[1],o[2],JSON.stringify(o[3]));await b.close();server.close()})();
