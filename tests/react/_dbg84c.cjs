const {spawn}=require('child_process');const{chromium}=require('playwright');
(async()=>{const v=spawn('npx',['vite','--port','5219','--strictPort'],{cwd:'/tmp/ab11-repo',stdio:'pipe'});
await new Promise(r=>{v.stdout.on('data',d=>{if(String(d).includes('Local:'))r()})});
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1301,height:1700}});
await p.goto('http://127.0.0.1:5219/ab-l10-12.html#84');
await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const info=await p.evaluate(()=>{
  const cv=document.querySelector('[data-native-ab11-page="84"] .mCanvas').getBoundingClientRect();
  const out=[];
  const words=['Das','was','wo','jetzt'];
  document.querySelectorAll('[data-native-ab11-page="84"] .tapWord').forEach(w=>{
    if(words.includes(w.textContent)){const r=w.getBoundingClientRect();out.push({w:w.textContent,x:+(r.x-cv.x).toFixed(1),y:+(r.y-cv.y).toFixed(1),r:+(r.x-cv.x+r.width).toFixed(1),b:+(r.y-cv.y+r.height).toFixed(1)});}
  });
  document.querySelectorAll('[data-native-ab11-page="84"] .mField').forEach(f=>{
    const id=f.getAttribute('data-native-field')||'';
    if(['u4-c','u4-e','u4-f','u4-g'].includes(id)){const r=f.getBoundingClientRect();out.push({f:id,x:+(r.x-cv.x).toFixed(1),y:+(r.y-cv.y).toFixed(1),r:+(r.x-cv.x+r.width).toFixed(1),b:+(r.y-cv.y+r.height).toFixed(1)});}
  });
  return out;
});
console.log(JSON.stringify(info));
await b.close();v.kill();process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
