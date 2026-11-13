const{chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');const root=path.resolve(__dirname,'../..');const server=http.createServer((q,r)=>{const f=path.join(root,'dist',q.url.split('?')[0]);try{r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{await new Promise(r=>server.listen(5195,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});try{for(const width of[320,390])for(const pg of[89,90,91,92,93,94,95]){const p=await b.newPage({viewport:{width,height:844},isMobile:true,hasTouch:true});const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://localhost:5195/l21-24.html#'+pg);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');const h=p.locator('[data-native-kb12="'+pg+'"]');await h.waitFor();
// native render: canvas, entries/credits and footer present
assert.equal(await h.locator('.nkCanvas').count(),1,pg+': canvas');
const words=await h.locator('.tapWord').count();assert(words>(pg<94?100:20),pg+': tapWord count '+words);
const footer=await h.locator('.nkwFooter').textContent();assert(/\d{2}/.test(footer),pg+': footer '+footer);
// no leftover interactive hybrid artifacts on the pure wordlist/credits pages
assert.equal(await h.locator('input,select,textarea').count(),0,pg+': no fields expected');
// tap-for-meaning interaction opens and closes the glossary dialog
await h.locator('.tapWord').first().click();assert(await p.locator('.meaningPopup').evaluate(e=>e.open),pg+': meaning popup opens');await p.locator('.meaningPopup').evaluate(e=>e.close());
// saved state survives a reload: re-render must come back clean and identical in shape
await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');const h2=p.locator('[data-native-kb12="'+pg+'"]');await h2.waitFor();assert.equal(await h2.locator('.tapWord').count(),words,pg+': tapWord count after reload');
assert.deepEqual(errors,[]);if(width===390)await h2.locator('.nkCanvas').screenshot({path:'/downloads/kb12-native-'+pg+'.png'});console.log(width,pg,'native wordlist/credits render + tap + reload PASS',words,'words');await p.close()}}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
