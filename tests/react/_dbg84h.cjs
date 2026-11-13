const {spawn}=require('child_process');const{chromium}=require('playwright');
(async()=>{const v=spawn('npx',['vite','--port','5219','--strictPort'],{cwd:__dirname+'/../..',stdio:'pipe'});
await new Promise(r=>{v.stdout.on('data',d=>{if(String(d).includes('Local:'))r()})});
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:1301,height:1700}});
await p.goto('http://127.0.0.1:5219/ab-l10-12.html#84');await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
const info=await p.evaluate(()=>{
  const out={canvases:[],tabChain:[]};
  document.querySelectorAll('.mCanvas').forEach((c,i)=>{const r=c.getBoundingClientRect();out.canvases.push({i,cls:String(c.className).slice(0,60),rect:[Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)],bg:getComputedStyle(c).background.slice(0,40),parentCls:String(c.parentElement.className).slice(0,80),childCount:c.children.length})});
  const tab=[...document.querySelectorAll('.mFooterTab')][0];
  if(tab){let e=tab;while(e&&out.tabChain.length<8){const r=e.getBoundingClientRect();const cs=getComputedStyle(e);out.tabChain.push({tag:e.tagName,cls:String(e.className).slice(0,55),rect:[Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)],ov:cs.overflow,bg:cs.background.slice(0,35),tf:cs.transform.slice(0,45)});e=e.parentElement;}}
  return out;
});
console.log(JSON.stringify(info,null,1));
await b.close();v.kill();process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
