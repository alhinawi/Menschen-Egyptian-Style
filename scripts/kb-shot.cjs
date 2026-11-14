// Screenshot one KB page (kb11 or kb12) at full source width and 390px.
// usage: node scripts/kb-shot.cjs <html> <page> <outprefix> [kind]
const{chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(req.url.split('?')[0]);const f=path.join(root,'dist',url==='/'?'index.html':url);
try{res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}catch{res.writeHead(404);res.end('nf')}});
(async()=>{
 const[html,pg,out]=process.argv.slice(2);
 const kind=process.argv[5]||(+pg>=6&&html.startsWith('l')||html.startsWith('index')?'kb11':'kb12');
 const sel=kind==='kb12'?`[data-native-kb12="${pg}"]`:`[data-native-page="${pg}"]`;
 await new Promise(r=>server.listen(5197,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 try{
  let p=await browser.newPage({viewport:{width:1150,height:1600}});
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(`http://127.0.0.1:5197/${html}#${pg}`);
  await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  const el=p.locator(sel).first();await el.waitFor({timeout:15000});
  await el.scrollIntoViewIfNeeded();try{await p.evaluate(()=>document.fonts.ready.then(()=>1))}catch(e){}await p.waitForTimeout(600);
  await el.screenshot({path:out+'-full.png'});
  await p.close();
  p=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  p.on('pageerror',e=>errors.push(e.message));
  await p.goto(`http://127.0.0.1:5197/${html}#${pg}`);
  await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  const el2=p.locator(sel).first();await el2.waitFor({timeout:15000});await el2.scrollIntoViewIfNeeded();try{await p.evaluate(()=>document.fonts.ready.then(()=>1))}catch(e){}await p.waitForTimeout(600);
  await el2.screenshot({path:out+'-390.png'});
  if(errors.length)console.log('PAGEERRORS',errors.slice(0,5));
  await p.close();
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
