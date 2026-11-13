const {spawn}=require('child_process');const{chromium}=require('playwright');
(async()=>{const v=spawn('npx',['vite','--port','5219','--strictPort'],{cwd:'/tmp/ab11-repo',stdio:'pipe'});
await new Promise(r=>{v.stdout.on('data',d=>{if(String(d).includes('Local:'))r()})});
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1301,height:1700}});
await p.goto('http://127.0.0.1:5219/ab-l10-12.html#84');
await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const info=await p.evaluate(()=>{
  const cv=document.querySelector('[data-native-ab11-page="84"] .mCanvas').getBoundingClientRect();
  const probe=(x,y)=>{const el=document.elementFromPoint(cv.x+x,cv.y+y);if(!el)return null;const r=el.getBoundingClientRect();const cs=getComputedStyle(el);return {cls:el.className.slice(0,60),x:+(r.x-cv.x).toFixed(1),y:+(r.y-cv.y).toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1),bg:cs.backgroundColor,color:cs.color}};
  return {at50_1220:probe(50,1220), at40_1215:probe(40,1215), tab:[...document.querySelectorAll('[data-native-ab11-page="84"] .mFooterTab')].map(t=>{const r=t.getBoundingClientRect();return {x:+(r.x-cv.x).toFixed(1),y:+(r.y-cv.y).toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1),text:t.textContent}})};
});
console.log(JSON.stringify(info,null,1));
await b.close();v.kill();process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
