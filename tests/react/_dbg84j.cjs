const {spawn}=require('child_process');const{chromium}=require('playwright');
(async()=>{const v=spawn('npx',['vite','--port','5219','--strictPort'],{cwd:__dirname+'/../..',stdio:'pipe'});
await new Promise(r=>{v.stdout.on('data',d=>{if(String(d).includes('Local:'))r()})});
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1301,height:1700}});
await p.goto('http://127.0.0.1:5219/ab-l10-12.html#84');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const info=await p.evaluate(()=>{
  const cv=document.querySelector('[data-native-ab11-page="84"] .mCanvas');
  const r=cv.getBoundingClientRect(); const sx=r.width/1075, sy=r.height/1521;
  // canvas (87+530, 1155) .. (87+800, 1168) region
  const hits=[];
  cv.querySelectorAll('*').forEach(e=>{const q=e.getBoundingClientRect();
    const x0=r.left+(87+500)*sx, x1=r.left+(87+820)*sx, y0=r.top+1150*sy, y1=r.top+1172*sy;
    if(q.width&&q.left<x1&&q.right>x0&&q.top<y1&&q.bottom>y0){
      const cs=getComputedStyle(e);
      hits.push({cls:String(e.className).slice(0,45),rect:[Math.round((q.left-r.left)/sx-87),Math.round((q.top-r.top)/sy),Math.round(q.width/sx),Math.round(q.height/sy)],bb:cs.borderBottom.slice(0,40),td:cs.textDecoration.slice(0,30)})}});
  return hits.slice(0,14);
});
console.log(JSON.stringify(info,null,0));
await b.close();v.kill();process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
