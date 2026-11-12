const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
const root=path.resolve(__dirname,'../..');
const cases=[['l4-6',27],['l7-9',41],['l7-9',43],['l7-9',46],['index',9],['l2-3',17],['kb-a12-l13-16',9],['kb-a12-l13-16',11],['ab1',8],['ab3',21],['ab2',15],['ab-a12-l13-16',33]];
const server=http.createServer((q,r)=>{try{const f=path.join(root,'dist',q.url.split('?')[0]);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{await new Promise(r=>server.listen(5192,r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});try{
for(const width of [320,390])for(const theme of ['light','dark','paper','sand','forest','burgundy','ocean','midnight','slate','plum']){
 const p=await b.newPage({viewport:{width,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 await p.addInitScript(theme=>localStorage.setItem('menschen-site-theme',JSON.stringify({id:theme,mode:['light','paper','sand'].includes(theme)?'light':'dark',palette:'1'})),theme);
 await p.goto('http://localhost:5192/l4-6.html#27');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(350);
 const markers=p.locator('[data-large-audio]');assert(await markers.count()>0);
 for(let i=0;i<await markers.count();i++){
 const styles=await markers.nth(i).evaluate(e=>{let face=e.querySelector('.largeAudioFace'),s=getComputedStyle(e);return{background:s.backgroundColor,border:s.borderTopWidth,shadow:s.boxShadow,ink:getComputedStyle(face).color,icon:getComputedStyle(face.querySelector('svg')).color,outer:e.getBoundingClientRect().width,inner:face.getBoundingClientRect().width}});
 assert.deepEqual(styles,{background:'rgba(0, 0, 0, 0)',border:'0px',shadow:'none',ink:['light','paper','sand'].includes(theme)?'rgb(49, 90, 74)':'rgb(249, 251, 255)',icon:['light','paper','sand'].includes(theme)?'rgb(49, 90, 74)':'rgb(249, 251, 255)',outer:44,inner:24});
 }
 const mode=p.locator('.meaningModeToggle'),selection=p.locator('.selectionModeToggle');
 for(let state=0;state<2;state++){
 const a=await mode.boundingBox(),c=await selection.boundingBox();assert.equal(a.y,c.y);assert(a.height>=44&&c.height>=44&&a.width>=44&&c.width>=44);assert(a.x>=0&&c.x+c.width<=width);
 if(!state){await mode.click();await selection.click()}
 }
 await mode.click();await selection.click();
 assert(await p.locator('[data-audio-proxied]').count()>0);assert(await p.locator('[data-audio-proxied]').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='0'&&e.tabIndex===-1)));
 const top=p.locator('.readerPageNavigation');const topBox=await top.boundingBox();
 for(const selector of ['#prev','#next','.readerPageNavigation .lnv-pageSlot button']){const c=await p.locator(selector).boundingBox();assert(c.width>=44&&c.height>=44);assert(c.y>=topBox.y&&c.y+c.height<=topBox.y+topBox.height);}
 const tools=await p.locator('.controls button').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}}));
 assert(tools.every(r=>r.w>=44&&r.h>=44&&r.x>=0&&r.x+r.w<=width), 'bottom controls stay within viewport');
 if(width===390&&['light','burgundy','forest'].includes(theme))await p.screenshot({path:`/tmp/fidelity/audio-theme-${theme}-390.png`});
 await p.keyboard.press('Tab');await markers.first().focus();assert.equal(await markers.first().evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
 console.log(width,theme,'transparent wrapper / 24px face / readable icon PASS');await p.close();
}
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
