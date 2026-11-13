const {spawn}=require('child_process');const{chromium}=require('playwright');
(async()=>{const v=spawn('npx',['vite','--port','5219','--strictPort'],{cwd:'/tmp/ab11-repo',stdio:'pipe'});
await new Promise(r=>{v.stdout.on('data',d=>{if(String(d).includes('Local:'))r()})});
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:901,height:1300}});
await p.goto('http://127.0.0.1:5219/ab-l10-12.html#84');
await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const info=await p.evaluate(()=>{
  const q=s=>{const el=document.querySelector(s);if(!el)return null;const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}};
  return {canvas:q('[data-native-ab11-page="84"] .mCanvas'), pink:q('.mBannerPink'),
    art:q('[data-native-ab11-page="84"] .mCanvas img'), title:q('.mBannerTitle'),
    num1:[...document.querySelectorAll('[data-native-ab11-page="84"] .mNumber')].map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}}),
    zoom:getComputedStyle(document.querySelector('[data-native-ab11-page="84"] .mCanvas')).zoom,
    transform:getComputedStyle(document.querySelector('[data-native-ab11-page="84"] .mCanvas')).transform};
});
console.log(JSON.stringify(info,null,1));
await b.close();v.kill();process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
