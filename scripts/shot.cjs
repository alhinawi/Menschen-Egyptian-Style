const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http');
const root='/home/sandbox/menschen';
const server=http.createServer((q,r)=>{let f=path.join(root,'dist',q.url.split('?')[0]);try{const ext=path.extname(f);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json'})[ext]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{
 const [page,route,widths]=[process.argv[2],process.argv[3],process.argv[4].split(',').map(Number)];
 await new Promise(r=>server.listen(5234,r));
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 for(const width of widths){
  const full=width>600;
  const p=await b.newPage({viewport:{width,height:full?1700:844},isMobile:!full,hasTouch:!full});
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(`http://127.0.0.1:5234/${route}#${page}`);
  await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  const h=p.locator(`[data-native-ab12="${page}"]`);
  await h.waitFor({timeout:10000});
  if(full)await p.addStyleTag({content:'.nativeAB12{width:1071px!important;height:1490px!important}html,body,.page,main,#viewport,#root,[class*=reader]{max-width:none!important}.stf__parent,.stf__wrapper,.stf__item,section.page{width:1071px!important;height:1490px!important;min-width:1071px!important;overflow:visible!important}'}).catch(()=>{});
  await p.evaluate(()=>document.fonts.ready).catch(()=>{});await p.waitForTimeout(700);
  await h.locator('.naCanvas').screenshot({path:`/tmp/native-${page}-${width}.png`});
  console.log(width,'shot ok, errors:',JSON.stringify(errors));
  await p.close();
 }
 await b.close();server.close();
})().catch(e=>{console.error(e);process.exit(1)});
