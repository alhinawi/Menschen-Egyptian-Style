const {spawn}=require('child_process');const{chromium}=require('playwright');
(async()=>{const v=spawn('npx',['vite','--port','5219','--strictPort'],{cwd:__dirname+'/../..',stdio:'pipe'});
await new Promise(r=>{v.stdout.on('data',d=>{if(String(d).includes('Local:'))r()})});
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1301,height:1700}});
await p.goto('http://127.0.0.1:5219/ab-l10-12.html#84');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const info=await p.evaluate(()=>{
  const cv=document.querySelector('[data-native-ab11-page="84"] .mCanvas');
  const r=cv.getBoundingClientRect();
  // probe a point inside the footer tab: tab at canvas (30..90, 1210..1228) -> page coords
  const sx=r.width/1075, sy=r.height/1521;
  const cx=r.left+(30+30)*sx, cy=r.top+(1215)*sy;
  const stack=document.elementsFromPoint(cx,cy).map(e=>({tag:e.tagName,cls:e.className&&String(e.className).slice(0,60),id:e.id,pos:getComputedStyle(e).position,z:getComputedStyle(e).zIndex,bg:getComputedStyle(e).background.slice(0,80)}));
  // also canvas own background and children near bottom-left
  const cs=getComputedStyle(cv);
  return {canvasRect:{x:r.x,y:r.y,w:r.width,h:r.height},canvasBg:cs.background.slice(0,200),stack};
});
console.log(JSON.stringify(info,null,1));
await b.close();v.kill();process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
