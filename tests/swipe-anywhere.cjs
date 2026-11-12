// Gesture regression: horizontal swipe turns pages from anywhere (mid-page,
// scrolled), vertical scroll stays native, zoomed pages pan instead of turn,
// and controls/inputs are never hijacked.
// Self-contained: builds must exist (npm run build), then `node tests/swipe-anywhere.cjs`.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');

const PORT=4621;
const server=spawn('npm',['run','preview','--','--port',String(PORT)],{cwd:require('node:path').join(__dirname,'..'),stdio:'ignore'});
const base=`http://127.0.0.1:${PORT}`;
const wait=ms=>new Promise(r=>setTimeout(r,ms));

async function ready(){for(let i=0;i<40;i++){try{const r=await fetch(base+'/index.html');if(r.ok)return}catch{}await wait(500)}throw new Error('preview server did not start')}

(async()=>{
await ready();
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});

async function newPage(width){
  const p=await (await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true})).newPage();
  const errors=[];p.on('pageerror',e=>errors.push(e.message));p._errors=errors;
  return p;
}
async function load(p,route){
  await p.goto(`${base}/${route}`);
  await p.waitForFunction(()=>window.menschenBook&&window.menschenPages,null,{timeout:30000});
  await p.waitForTimeout(1000);
}
async function swipe(p,x0,y0,x1,y1,steps=10){
  const c=await p.context().newCDPSession(p);
  const T=(type,pts)=>c.send('Input.dispatchTouchEvent',{type,touchPoints:pts});
  await T('touchStart',[{x:x0,y:y0}]);
  for(let i=1;i<=steps;i++)await T('touchMove',[{x:x0+(x1-x0)*i/steps,y:y0+(y1-y0)*i/steps}]);
  await T('touchEnd',[]);
  await p.waitForTimeout(900);
}
async function pinch(p,cx,cy,d0,d1){
  const c=await p.context().newCDPSession(p);
  const T=(type,pts)=>c.send('Input.dispatchTouchEvent',{type,touchPoints:pts});
  await T('touchStart',[{x:cx-d0/2,y:cy},{x:cx+d0/2,y:cy}]);
  for(let i=1;i<=6;i++){const d=d0+(d1-d0)*i/6;await T('touchMove',[{x:cx-d/2,y:cy},{x:cx+d/2,y:cy}]);}
  await T('touchEnd',[]);
  await p.waitForTimeout(600);
}
const idx=p=>p.evaluate(()=>menschenBook.getCurrentPageIndex());
const hLeft=(p,w)=>swipe(p,w*0.8,420,w*0.15,435);   // slight slope, clearly horizontal
const hRight=(p,w)=>swipe(p,w*0.15,420,w*0.8,405);

for(const width of [320,390,550]){
  const p=await newPage(width);
  await load(p,'index.html');

  // 1. mid-page swipe at fit turns forward and back
  await p.evaluate(()=>{bookPage(2);document.querySelector('#fit').click()});
  await p.waitForTimeout(400);
  assert.equal(await idx(p),2);
  await hLeft(p,width);
  assert.equal(await idx(p),3,`${width}: mid-page swipe forward at fit`);
  await hRight(p,width);
  assert.equal(await idx(p),2,`${width}: mid-page swipe back at fit`);

  // 1b. a small drag snaps back without turning
  await swipe(p,width*0.8,420,width*0.8-40,422);
  assert.equal(await idx(p),2,`${width}: small drag snaps back`);

  // 2. near-fit zoom (a few px of horizontal overflow) still turns
  await p.evaluate(w=>bookZoom((w+30)/900),width);
  await p.waitForTimeout(300);
  await hLeft(p,width);
  assert.equal(await idx(p),3,`${width}: near-fit zoom still turns`);
  await p.evaluate(()=>{bookPage(2);document.querySelector('#fit').click()});
  await p.waitForTimeout(300);

  // 3. really zoomed: horizontal swipe pans, page does not turn
  await p.evaluate(()=>bookZoom(0.85));
  await p.waitForTimeout(300);
  const left0=await p.evaluate(()=>document.querySelector('#viewport').scrollLeft);
  await hLeft(p,width);
  const left1=await p.evaluate(()=>document.querySelector('#viewport').scrollLeft);
  assert.ok(left1>left0+30,`${width}: zoomed pan (${left0} -> ${left1})`);
  assert.equal(await idx(p),2,`${width}: zoomed swipe must not turn`);

  // 4. vertical swipe scrolls natively, page does not turn
  const top0=await p.evaluate(()=>scrollY);
  await swipe(p,width/2,600,width/2,250);
  const top1=await p.evaluate(()=>scrollY);
  assert.ok(top1>top0+50,`${width}: vertical scroll (${top0} -> ${top1})`);
  assert.equal(await idx(p),2,`${width}: vertical swipe must not turn`);

  // 5. pinch zoom is not hijacked into a page turn
  await p.evaluate(()=>{document.querySelector('#fit').click();scrollTo(0,0)});
  await p.waitForTimeout(300);
  await pinch(p,width/2,420,80,220);
  assert.equal(await idx(p),2,`${width}: pinch must not turn`);

  assert.equal(p._errors.length,0,p._errors.join(';'));
  await p.close();
  console.log(width,'index (scan pages): mid-page turn, near-fit turn, zoomed pan, vertical scroll, pinch PASS');
}

// user's reported lesson: ab2 (AB A1.1 L2, rebuilt interactive pages)
// find a page point that is not a form control (ab2 pages are dense with inputs)
async function cleanPoint(p){
  return p.evaluate(()=>{
    const bad='input,select,textarea,button,a,audio,label:has(input),[contenteditable],canvas';
    for(let y=200;y<innerHeight-160;y+=40)for(let x=innerWidth-60;x>60;x-=40){
      const el=document.elementFromPoint(x,y);
      if(el&&!el.closest(bad)&&el.closest('section[data-page]'))return {x,y};
    }
    return null;});
}
{
  const p=await newPage(390);
  await load(p,'ab2.html');
  await p.evaluate(()=>{bookPage(2);document.querySelector('#fit').click()});
  await p.waitForTimeout(400);
  const pt=await cleanPoint(p);
  assert.ok(pt,'ab2: found a non-control page point');
  await swipe(p,pt.x,pt.y,Math.max(20,pt.x-220),pt.y+10);
  assert.equal(await idx(p),3,'ab2: mid-page swipe turns at fit');
  // user's exact case: 44% zoom, scrolled mid-page -> swipe must still turn
  await p.evaluate(()=>{bookPage(2);bookZoom(0.44);});
  await p.waitForTimeout(400);
  await p.evaluate(()=>scrollTo(0,300));
  await p.waitForTimeout(200);
  const pt2=await cleanPoint(p);
  assert.ok(pt2,'ab2: found a non-control point at 44% zoom');
  await swipe(p,pt2.x,pt2.y,Math.max(20,pt2.x-220),pt2.y+10);
  assert.equal(await idx(p),3,'ab2: swipe turns at 44% zoom while scrolled');
  // swipe starting on a form control must not turn
  await p.evaluate(()=>bookPage(2));
  await p.waitForTimeout(400);
  const box=await p.evaluate(()=>{
    const els=[...document.querySelectorAll('section[data-page] input,section[data-page] select,section[data-page] textarea')];
    for(const el of els){const r=el.getBoundingClientRect();
      if(r.width&&r.bottom>120&&r.top<innerHeight-150)return {x:r.x+r.width/2,y:r.y+r.height/2,tag:el.tagName};}
    return null;});
  assert.ok(box,'ab2: found a visible control to swipe from');
  await swipe(p,box.x,box.y,Math.max(20,box.x-160),box.y+8);
  assert.equal(await idx(p),2,`ab2: swipe from ${box.tag} must not turn`);
  assert.equal(p._errors.length,0,p._errors.join(';'));
  await p.close();
  console.log('ab2 mid-page swipe + control-guard PASS');
}

// hybrid scan page (l7-9, page 46): swipe from a word box turns; fields guarded
{
  const p=await newPage(390);
  await load(p,'l7-9.html');
  const target=await p.evaluate(()=>{
    const sel=document.querySelector('#pageJump');
    const opt=[...sel.options].find(o=>/Seite 46\b/.test(o.textContent));
    return opt?Number(opt.value):-1;});
  assert.ok(target>=0,'found Seite 46 in pageJump');
  await p.evaluate(i=>{bookPage(i);document.querySelector('#fit').click()},target);
  await p.waitForTimeout(600);
  const word=await p.evaluate(()=>{
    let best=null;
    for(const el of document.querySelectorAll('.hybridScan .tapWord')){
      const r=el.getBoundingClientRect();
      if(r.width&&r.bottom>100&&r.top<innerHeight-100&&(r.x+r.width/2)<innerWidth-10)
        if(!best||r.x>best.x)best={x:r.x+r.width/2,y:r.y+r.height/2};
    }
    return best;});
  assert.ok(word,'hybrid word box visible');
  const before=await idx(p);
  await swipe(p,word.x,word.y,Math.max(20,word.x-200),word.y+10);
  assert.equal(await idx(p),before+1,'hybrid scan: swipe from a word box turns');
  const field=await p.evaluate(()=>{
    const el=document.querySelector('.hybridScan input,.hybridScan textarea');
    if(!el)return null;const r=el.getBoundingClientRect();
    return (r.width&&r.bottom>100&&r.top<innerHeight-100)?{x:r.x+r.width/2,y:r.y+r.height/2}:null;});
  if(field){
    const cur=await idx(p);
    await swipe(p,field.x,field.y,Math.max(20,field.x-200),field.y+10);
    assert.equal(await idx(p),cur,'hybrid scan: swipe from a field must not turn');
  }
  assert.equal(p._errors.length,0,p._errors.join(';'));
  await p.close();
  console.log('hybrid scan swipe PASS');
}

await browser.close();
server.kill();
console.log('swipe-anywhere: ALL PASS');
process.exit(0);
})().catch(e=>{console.error(e);server.kill();process.exit(1)});
