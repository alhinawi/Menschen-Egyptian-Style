const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((req,res)=>{let f=path.join(root,'dist',decodeURIComponent(req.url.split('?')[0]));if(req.url.split('?')[0]==='/')f=path.join(root,'dist/index.html');try{res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.webp':'image/webp','.png':'image/png'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));}catch{res.writeHead(404);res.end('not found');}});
const viewers=[['original-viewer',17,9,96],['ab-original-viewer',31,30,53],['ab-l7-9-viewer',55,54,77],['original-viewer-ab',79,78,101],['kb-a12-original-viewer',10,9,79],['original-viewer-a12',30,29,48],['original-l21-24',50,49,95],['ab-a12-original-viewer',7,6,35]];
const before=process.env.VIEWER_BEFORE==='1';
const out=process.env.VIEWER_SCREENSHOTS;
(async()=>{await new Promise(r=>server.listen(5193,'127.0.0.1',r));const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 async function ready(){await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true'&&document.querySelector('#paper')?.naturalWidth>0);await p.evaluate(async()=>{await document.querySelector('#paper').decode();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});}
 async function shot(name){if(out)await p.screenshot({path:path.join(out,(before?'before-':'after-')+name+'-390.png')});}
 async function zoom(value){await p.waitForFunction(value=>document.querySelector('#zoom').textContent===value,value);}
 for(const[route,start,first,last]of viewers){
  await p.goto(`http://127.0.0.1:5193/${route}.html?page=${start}`);await ready();
  assert.equal(await p.locator('#page').textContent(),'Seite '+start);
  if(!before)assert.match(await p.locator('#paper').getAttribute('src'),new RegExp('p'+start+'\\.png$'));
  if(route==='original-viewer')await shot('01-initial');
  if(!before){assert.equal(await p.locator('#actual').count(),0);assert.equal(await p.locator('#fit').textContent(),'Fit');}
  await p.locator('#plus').tap();await zoom('125%');
  if(route==='original-viewer')await shot('02-plus');
  await p.locator('#minus').tap();await zoom('100%');
  if(!before){await p.locator('#minus').tap();await zoom('75%');}
  if(route==='original-viewer')await shot('03-minus');
  await p.locator('#plus').tap();await p.locator('#fit').tap();await zoom('100%');
  if(route==='original-viewer')await shot('04-fit');
  await p.locator('#next').tap();await ready();assert.equal(await p.locator('#page').textContent(),'Seite '+(start+1));assert.match(await p.locator('#paper').getAttribute('src'),new RegExp('p'+(start+1)+'\\.png$'));
  if(!before)assert.equal(new URL(p.url()).searchParams.get('page'),String(start+1));
  if(route==='original-viewer')await shot('05-next');
  await p.locator('#prev').tap();await ready();assert.equal(await p.locator('#page').textContent(),'Seite '+start);
  if(route==='original-viewer')await shot('06-previous');
  // Reach both scroll axes with real touch dispatch, not synthetic DOM pointer events.
  await p.locator('#plus').tap();await p.locator('#plus').tap();await p.locator('#plus').tap();await p.locator('#plus').tap();
  const cdp=await p.context().newCDPSession(p);await p.evaluate(()=>document.querySelector('#canvas').scrollTo(0,0));
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:290,y:550}]});
  for(let n=1;n<=8;n++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:290-n*20,y:550-n*25}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  const pan=await p.locator('#canvas').evaluate(c=>({x:c.scrollLeft,y:c.scrollTop}));assert(pan.x>100&&pan.y>100,JSON.stringify(pan));
  if(route==='original-viewer')await shot('07-pan-down-right');
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:130,y:300}]});
  for(let n=1;n<=8;n++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:130+n*20,y:300+n*25}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  const back=await p.locator('#canvas').evaluate(c=>({x:c.scrollLeft,y:c.scrollTop}));assert(back.x<pan.x&&back.y<pan.y);
  if(route==='original-viewer')await shot('08-pan-up-left');
  await p.locator('#fit').tap();
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:145,y:350,id:0},{x:245,y:350,id:1}]});
  for(let n=1;n<=5;n++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:145-n*8,y:350,id:0},{x:245+n*8,y:350,id:1}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.notEqual(await p.locator('#zoom').textContent(),'100%');
  if(route==='original-viewer')await shot('09-pinch');
  await cdp.detach();await p.locator('#fit').tap();
  if(route==='original-viewer'){
   await p.locator('#full').tap();await p.waitForFunction(()=>!!document.fullscreenElement);await shot('10-fullscreen');
   await p.locator('#full').tap();await p.waitForFunction(()=>!document.fullscreenElement);await shot('11-exit-fullscreen');
  }
  for(const[page,id]of [[first,'prev'],[last,'next']]){await p.goto(`http://127.0.0.1:5193/${route}.html?page=${page}`);await ready();assert(await p.locator('#'+id).isDisabled());}
  if(!before){await p.goto(`http://127.0.0.1:5193/${route}.html?page=999`);await ready();assert.equal(await p.locator('#page').textContent(),'Seite '+first);}
  console.log(route+' controls, real touch pan/pinch and boundaries PASS');
 }
 // Fit is width-based, never a crop: check the complete image box in both books.
 for(const[route,pages]of [['original-viewer',[14,17,18]],['ab-original-viewer',[30,31,32]]])for(const page of pages){
  await p.goto(`http://127.0.0.1:5193/${route}.html?page=${page}`);await ready();
  await p.locator('#plus').tap();await p.locator('#fit').tap();await zoom('100%');
  const fit=await p.evaluate(()=>{const c=document.querySelector('#canvas'),i=document.querySelector('#paper'),cr=c.getBoundingClientRect(),ir=i.getBoundingClientRect();return {canvasWidth:c.clientWidth,imageWidth:ir.width,scrollLeft:c.scrollLeft,scrollWidth:c.scrollWidth,left:ir.left-cr.left,right:ir.right-cr.right,ratio:ir.width/ir.height,naturalRatio:i.naturalWidth/i.naturalHeight};});
  assert.equal(fit.canvasWidth,390);assert.equal(fit.imageWidth,390);assert.equal(fit.scrollLeft,0);assert.equal(fit.scrollWidth,390);assert(Math.abs(fit.left)<1&&Math.abs(fit.right)<1);assert(Math.abs(fit.ratio-fit.naturalRatio)<.001);
  await shot(`fit-${route}-p${page}`);
  console.log(route+' page '+page+' Fit whole image width, no horizontal clipping PASS');
 }
 // Exercise actual in-app navigation and close twice: no stale reader handlers.
 for(let n=0;n<2;n++){
  await p.goto('http://127.0.0.1:5193/l2-3.html#17');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  const entry=await p.locator('a[href*="original-viewer"]').first().getAttribute('href');assert(entry);
  await p.locator('a[href*="original-viewer"]').first().evaluate(a=>a.click());await ready();
  await p.locator('#plus').tap();await zoom('125%');await p.locator('#next').tap();await ready();
  await p.getByRole('button',{name:'Schließen',exact:true}).tap();await p.waitForFunction(()=>!document.querySelector('.originalViewer')&&document.documentElement.dataset.bookReady==='true');
  if(out&&!before)await p.screenshot({path:path.join(out,'after-12-close-390.png')});
 }
 for(const width of [320,430,1280]){await p.setViewportSize({width,height:844});await p.goto('http://127.0.0.1:5193/original-viewer.html?page=17');await ready();assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.locator('#plus').tap();await zoom('125%');await p.locator('#fit').tap();await zoom('100%');}
 assert.deepEqual(errors,[]);console.log('Original viewer SPA close/re-entry, fullscreen, 320/390/430/1280 layout PASS');
 }finally{await b.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
