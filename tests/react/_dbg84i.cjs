const {spawn}=require('child_process');const{chromium}=require('playwright');
(async()=>{const v=spawn('npx',['vite','--port','5219','--strictPort'],{cwd:__dirname+'/../..',stdio:'pipe'});
await new Promise(r=>{v.stdout.on('data',d=>{if(String(d).includes('Local:'))r()})});
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1301,height:1700}});
await p.goto('http://127.0.0.1:5219/ab-l10-12.html#84');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const info=await p.evaluate(()=>{
  const pg=document.querySelector('[data-native-ab11-page="84"]');
  const out={chain:[]};
  let e=pg.querySelector('.mFooterTab');
  while(e&&out.chain.length<10){const r=e.getBoundingClientRect();const cs=getComputedStyle(e);out.chain.push({tag:e.tagName,cls:String(e.className).slice(0,50),rect:[Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)],ov:cs.overflow,tf:cs.transform.slice(0,42),pos:cs.position});e=e.parentElement;}
  return out;
});
console.log(JSON.stringify(info));
await b.close();v.kill();process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
