const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.ttf':'font/ttf','.webp':'image/webp'};
const server=http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');const f=path.join(root,'dist',url.pathname==='/'?'index.html':url.pathname);try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));}catch{res.writeHead(404);res.end('not found');}});
(async()=>{await new Promise(r=>server.listen(5192,'127.0.0.1',r));const browser=await chromium.launch({args:['--no-sandbox']});try{
 const routes=[['index.html','cover','Kursbuch','A1.1'],['kb-a12-l13-16.html','cover','Kursbuch','A1.2'],['ab1.html','abcover','Arbeitsbuch','A1.1'],['ab-a12-l13-16.html','abcover','Arbeitsbuch','A1.2']];
 for(const width of [1280,390])for(const [route,token,book,level] of routes){
 const page=await browser.newPage({viewport:{width,height:width===390?844:900},isMobile:width===390,hasTouch:width===390});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:5192/${route}#${token}`);
 await page.waitForFunction(()=>window.menschenBook&&document.querySelector('.fullscreenCover .coverArtwork')?.naturalWidth>0);
 await page.evaluate(()=>document.fonts.ready);
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('.coverArtwork')).opacity==='1');
 assert.equal(await page.locator('.premiumCoverEdition').innerText(),`${book}\n◆\nInteractive Edition`);
 assert.equal(await page.locator('.premiumCoverLevel').innerText(),level);
 assert.equal(await page.locator('.coverSocials a').count(),4);
 assert.equal(await page.locator('.coverOwner').innerText(),'نسخة تفاعلية مع\nهناوي');
 assert(await page.locator('.coverOwner').evaluate(el=>el.querySelector('.coverSmall').getBoundingClientRect().left>el.querySelector('h1').getBoundingClientRect().right),'RTL attribution prefix must be right of the name');
 const fit=await page.evaluate(()=>{const frame=document.querySelector('.premiumCover').getBoundingClientRect(),copy=document.querySelector('.coverCopy').getBoundingClientRect();const button=document.querySelector('.fullscreenCover .coverOpen').getBoundingClientRect(),art=document.querySelector('.premiumCoverArt').getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth+1,footer:frame.bottom-copy.bottom,buttonBottom:button.bottom,height:innerHeight,artRight:art.right,width:innerWidth};});
 assert(!fit.overflow);assert(fit.buttonBottom<=fit.height);assert(fit.artRight<=fit.width);assert(fit.footer>=6,`Footer clips: ${JSON.stringify(fit)}`);
 await page.screenshot({path:`/downloads/covers-fullscreen-${book.toLowerCase()}-${level}-${width}.png`,fullPage:false});
 await page.locator('.coverLibrary').click();await page.getByRole('dialog',{name:'Library',exact:true}).waitFor();await page.getByRole('button',{name:'Close menu',exact:true}).click();
 const before=await page.evaluate(()=>location.hash);await page.locator('.fullscreenCover .coverOpen').click();await page.waitForFunction(token=>location.hash!==`#${token}`,token);assert.notEqual(await page.evaluate(()=>location.hash),before);
 await page.locator('.fullscreenCover').waitFor({state:'detached'});assert.equal(await page.locator('.premiumCover').count(),0);
 // The separate account/settings panel must still open over the reader.
 const account=page.getByRole('button',{name:'الحساب والإعدادات'});
 if(await account.count()){await account.click();await page.getByRole('dialog').waitFor();assert((await page.getByRole('dialog').innerText()).length>20);}
 else console.log(`${route}: no account button in existing lesson markup`);
 assert.deepEqual(errors,[]);console.log(`${book} ${level} @${width}: artwork, footer, links, open book PASS`);await page.close();
 }
}finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
