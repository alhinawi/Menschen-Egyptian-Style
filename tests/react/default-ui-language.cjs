// Screenshot native pages: node shot.cjs <file.html> <page> <outbase> [width] [height]
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((req,res)=>{
 const url=req.url.split('?')[0].split('#')[0];const f=path.join(root,'dist',url==='/'?'index.html':url);
 try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.mp3':'audio/mpeg','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}
 catch{res.writeHead(404);res.end('not found')}
});
(async()=>{
await new Promise(r=>server.listen(5197,'127.0.0.1',r));
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await browser.newPage({viewport:{width:390,height:650}});await p.route('**/api/**',r=>r.fulfill({json:{}}));
await p.goto('http://127.0.0.1:5197/index.html#howto');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const check=async lang=>{await p.waitForFunction(lang=>document.documentElement.dataset.uiLanguage===lang,lang);const saved=await p.evaluate(()=>localStorage.getItem('menschen-ui-language'));if(saved!==lang)throw Error('not persisted '+saved);console.log('PASS',lang,await p.locator('.howtoPage h1').textContent())};
await check('en');await p.screenshot({path:'/downloads/default-english.png'});
for(const lang of ['ar','de','en']){await p.locator('.profileTrigger').first().click();await p.locator('.profileLanguageChoice[lang='+lang+']').click();await p.locator('.profileTrigger').first().click();await check(lang);await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await check(lang)}
await p.evaluate(()=>localStorage.setItem('menschen-ui-language','invalid'));await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await check('en');
const blocked=await browser.newPage();await blocked.addInitScript(()=>{Object.defineProperty(Storage.prototype,'getItem',{value(){throw new Error('unavailable')}});Object.defineProperty(Storage.prototype,'setItem',{value(){throw new Error('unavailable')}})});await blocked.route('**/api/**',r=>r.fulfill({json:{}}));await blocked.goto('http://127.0.0.1:5197/index.html#howto');await blocked.waitForFunction(()=>document.documentElement.dataset.uiLanguage==='en');console.log('PASS unavailable storage defaults English');
await browser.close();server.close();
})().catch(e=>{console.error(e);server.close();process.exit(1)});
