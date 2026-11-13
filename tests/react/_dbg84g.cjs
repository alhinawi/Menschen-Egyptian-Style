const {spawn}=require('child_process');const{chromium}=require('playwright');
(async()=>{const v=spawn('npx',['vite','--port','5219','--strictPort'],{cwd:__dirname+'/../..',stdio:'pipe'});
await new Promise(r=>{v.stdout.on('data',d=>{if(String(d).includes('Local:'))r()})});
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1301,height:1700}});
await p.goto('http://127.0.0.1:5219/ab-l10-12.html#84');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const info=await p.evaluate(()=>{
  const cv=document.querySelector('[data-native-ab11-page="84"] .mCanvas');
  const r=cv.getBoundingClientRect();
  const sx=r.width/1075, sy=r.height/1521;
  const tx=r.left+30*sx, ty=r.top+1205*sy, tx2=r.left+95*sx, ty2=r.top+1235*sy;
  const hits=[];
  cv.querySelectorAll('*').forEach(e=>{const q=e.getBoundingClientRect();
    if(q.width&&q.height&&q.left<tx2&&q.right>tx&&q.top<ty2&&q.bottom>ty){
      const cs=getComputedStyle(e);
      hits.push({tag:e.tagName,cls:String(e.className).slice(0,50),rect:[Math.round(q.left),Math.round(q.top),Math.round(q.width),Math.round(q.height)],bg:cs.background.slice(0,60),z:cs.zIndex,pe:cs.pointerEvents})}});
  const bef=getComputedStyle(cv,'::before'), aft=getComputedStyle(cv,'::after');
  return {hits,canvasBefore:{content:bef.content,bg:bef.background.slice(0,80),z:bef.zIndex},canvasAfter:{content:aft.content,bg:aft.background.slice(0,80),z:aft.zIndex},canvasTransform:getComputedStyle(cv).transform,canvasPE:getComputedStyle(cv).pointerEvents};
});
console.log(JSON.stringify(info,null,1));
await b.close();v.kill();process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
