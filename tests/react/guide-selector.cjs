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
 const [file,page,out,width=1000,height=1400]=process.argv.slice(2);
 await new Promise(r=>server.listen(5197,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox','--force-device-scale-factor=1']});
 const p=await browser.newPage({viewport:{width:+width,height:+height}});
 p.on('pageerror',e=>console.error('PAGEERROR',e.message));
 await p.addInitScript(()=>{localStorage.setItem('menschen-translation-language','ar');localStorage.setItem('menscheny-token','local-test')});await p.route('**/api/me',r=>r.fulfill({json:{user:{id:1,name:'Mohamed Abdelrahman Alhinawi',email:'mohamed.alhinawi.long.address@example.com',email_verified:true,avatar:'http://127.0.0.1:5197/avatar.svg'}}}));await p.route('**/avatar.svg',r=>r.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#713c46"/><circle cx="40" cy="30" r="15" fill="#fff"/><path d="M10 80a30 30 0 0 1 60 0" fill="#fff"/></svg>'}));await p.route('**/api/progress**',r=>r.fulfill({json:{progress:{}}}));await p.route('**/api/auth/config',r=>r.fulfill({json:{google:true,email_verification:false}})); p.setDefaultTimeout(4000);await p.goto(`http://127.0.0.1:5197/${file}#${page}`);
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 await p.evaluate(pg=>{const w=window;const i=w.menschenPages?.findIndex?.(el=>el?.dataset?.page===pg)||-1;if(i>=0)w.menschenBook?.turnToPage?.(i)},page);
 await p.waitForTimeout(400);
 for(const lang of ['ar','en','de']){await p.locator('.profileTrigger').first().click();await p.locator('.profileLanguageChoice[lang='+lang+']').click();await p.locator('.profileTrigger').first().click();await p.waitForTimeout(100);console.log('FIT',lang,await p.evaluate(()=>{const label=document.querySelector('.lnv-pageLabel'),btn=label.parentElement;const r=btn.getBoundingClientRect();if(label.scrollWidth>label.clientWidth)throw Error('truncated '+label.textContent+' '+label.scrollWidth+'/'+label.clientWidth);if(Math.abs((r.left+r.right)/2-innerWidth/2)>1)throw Error('off centre');if(document.documentElement.scrollWidth>innerWidth)throw Error('page overflow');if(btn.querySelector('.lnv-chev').textContent!=='▴')throw Error('wrong arrow');return {text:label.textContent,labelWidth:label.clientWidth,textWidth:label.scrollWidth,button:r.width,buttons:[...document.querySelectorAll('.controls button')].map(e=>Math.round(e.getBoundingClientRect().width))}}));await p.screenshot({path:out+'-'+lang+'.png'});console.log(lang,await p.locator('.howtoList li').count(),await p.locator('.howtoList li').last().innerText())}
 await browser.close();server.close();
})().catch(e=>{console.error(e.message);server.close();process.exit(1)});
