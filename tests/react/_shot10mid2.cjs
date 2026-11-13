const {spawn}=require('child_process');const{chromium}=require('playwright');
const WIDTHS=(process.env.WIDTHS||'901').split(',').map(Number);const PAGES=(process.env.PAGES||'79,80,81').split(',');
(async()=>{const v=spawn('npx',['vite','--port','5219','--strictPort'],{cwd:__dirname+'/../..',stdio:'pipe'});
await new Promise(r=>{v.stdout.on('data',d=>{if(String(d).includes('Local:'))r()})});
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
for(const width of WIDTHS)for(const n of PAGES){
 const vw=width>=900?width+400:width; const p=await b.newPage({viewport:{width:vw,height:1700}});
 await p.goto(`http://127.0.0.1:5219/ab-l10-12.html#${n}`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
 const h=p.locator(`[data-native-ab11-page="${n}"] .mCanvas`);await h.waitFor();
 await p.evaluate(()=>{document.querySelectorAll('*').forEach(el=>{if(getComputedStyle(el).position==='fixed')el.style.display='none'})});
 await h.screenshot({path:`/downloads/raw10-${n}-${width}.png`});await p.close();}
await b.close();v.kill();process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
