// Screenshot a native AB A1.2 range page: full 1072 canvas + 390 mobile.
// usage: node scripts/n56/shot2.cjs <page> <outprefix>
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((q,r)=>{let f=path.join(root,'dist',decodeURIComponent(q.url.split('?')[0]));try{const ext=path.extname(f);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.mp3':'audio/mpeg','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json'})[ext]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
(async()=>{
 const [page,out]=[process.argv[2],process.argv[3]||`/tmp/native-${process.argv[2]}`];
 await new Promise(r=>server.listen(5234,r));
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const errors=[];
 try{
  let p=await b.newPage({viewport:{width:1150,height:1701}});
  p.on('pageerror',e=>errors.push(e.message));
  await p.goto(`http://127.0.0.1:5234/ab-a12-l17-20.html#${page}`);
  await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000});
  const h=p.locator(`[data-native-ab12="${page}"]`);
  await h.waitFor({timeout:15000});
  const spec=JSON.parse(fs.readFileSync(path.join(root,'src/native-ab12/range/p60.json'),'utf8'));
  for(const it of spec.items.filter(it=>it.k==='f')) await h.locator(`[data-native-field="${it.id}"]`).fill(String(it.a).split('|')[0]);
  await h.locator('.naCheck button').first().click();
  const first=await h.locator('.naCheck output').first().innerText();
  await p.reload();await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await h.waitFor();
  const count=await h.locator('[data-native-field]').count();const value=await h.locator('[data-native-field]').first().inputValue();
  console.log(JSON.stringify({fields:count,firstGrade:first,persistedFirst:value,player:await h.locator('audio.naPlayer').count()}));
  await p.close();
  p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  p.on('pageerror',e=>errors.push(e.message));
  await p.goto(`http://127.0.0.1:5234/ab-a12-l17-20.html#${page}`);
  await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000});
  const h2=p.locator(`[data-native-ab12="${page}"]`);await h2.waitFor({timeout:15000});
  await h2.scrollIntoViewIfNeeded();await p.waitForTimeout(700);
  await h2.locator('.naCanvas').screenshot({path:out+'-390.png'});
  await p.close();
 }finally{await b.close();server.close()}
 if(errors.length)console.log('PAGEERRORS',JSON.stringify(errors.slice(0,5)));
 console.log('shots written',out);
})().catch(e=>{console.error(e);process.exit(1)});
