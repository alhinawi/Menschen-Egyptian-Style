// Screenshot native pages: node shot.cjs <file.html> <page> <outbase> [width] [height]
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=process.cwd();
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
 await p.locator('.profileTrigger').first().click();await p.locator('.profilePanel').waitFor();await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);await p.locator('.profileTranslationChoice').nth(2).click();if(await p.locator('.profileTranslationChoice').nth(2).getAttribute('aria-pressed')!=='true')throw Error('Translation choice');await p.locator('.profileTranslationChoice').nth(0).click();if(await p.locator('.profileTranslationChoice').count()!==3)throw Error('Three translation choices');const metrics=await p.locator('.profilePanel').evaluate(e=>({scroll:e.scrollHeight,client:e.clientHeight,top:e.getBoundingClientRect().top}));console.log(metrics);if(metrics.scroll>metrics.client+1||metrics.top<55)throw Error('Panel must fit without scrolling');const centered=await p.evaluate(()=>{const b=document.querySelector('.profileTrigger').getBoundingClientRect(),i=document.querySelector('.profileAvatarImg').getBoundingClientRect();const a=document.querySelector('.authUserAvatarBtn').getBoundingClientRect(),panel=document.querySelector('.profilePanel').getBoundingClientRect();return {buttonX:Math.abs(b.x+b.width/2-i.x-i.width/2),buttonY:Math.abs(b.y+b.height/2-i.y-i.height/2),headerX:Math.abs(a.x+a.width/2-panel.x-panel.width/2)}});console.log(centered);if(Object.values(centered).some(x=>x>1))throw Error('Avatar not centered');for(const selector of ['.authUserText b','.authUserText small']){const m=await p.locator(selector).evaluate(e=>({sw:e.scrollWidth,cw:e.clientWidth}));if(m.sw>m.cw+1)throw Error('Text clipping')}await p.screenshot({path:out+'.png'});console.log(await p.locator('.profilePanel').evaluate(e=>({box:e.getBoundingClientRect().toJSON(),padding:getComputedStyle(e).paddingBottom})));console.log('buttons',await p.locator('.profileTranslationOptions button').count());
 await browser.close();server.close();
})().catch(e=>{console.error(e.message);server.close();process.exit(1)});
