const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((q,r)=>{try{let u=q.url.split('?')[0];if(u==='/')u='/index.html';const f=path.join(root,'dist',u);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{await new Promise(r=>server.listen(5297,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});try{
 for(const [route,page,book] of [['l10-12','81','kb11'],['l21-24','70','kb12']]){
  const p=await b.newPage({viewport:{width:390,height:844}});const requests=[],errors=[];p.on('response',r=>{if(r.url().endsWith('.js'))requests.push(r.url())});p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://localhost:5297/'+route+'.html#'+page);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  await p.waitForFunction(()=>{const page=[...document.querySelectorAll('.page')].find(e=>e.dataset.page===location.hash.slice(1));return page&&[...page.querySelectorAll('img')].every(e=>e.complete&&e.naturalWidth)});
  assert(!requests.some(u=>u.includes(book==='kb11'?'NativeKB12-':'NativeKb11-')),'unrelated native book downloaded');
  assert(!requests.some(u=>u.includes('seekable-audio-')),'seek code downloaded before use');
  const main=requests.find(u=>/main-[^/]+\.js$/.test(u));assert(fs.statSync(path.join(root,'dist',new URL(main).pathname)).size<500000,'main bundle exceeds 500KB raw');
  await p.screenshot({path:'/tmp/bundle-after-'+page+'.png'});
  console.log(route,page,'route-only native/data chunks and deferred audio PASS',await p.evaluate(()=>performance.getEntriesByType('resource').filter(e=>e.name.endsWith('.js')).reduce((sum,e)=>sum+e.transferSize,0)),'JS bytes');
  assert.deepEqual(errors,[]);await p.close();
 }
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
