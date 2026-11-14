const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 for(const [vp,size] of [['desktop',{width:1280,height:900}],['mobile',{width:390,height:844}]]){
  const p=await (await b.newContext({viewport:size})).newPage();
  await p.goto('http://127.0.0.1:4173/ab-a12-l17-20.html#52');
  await p.waitForSelector("[data-native-ab12='52'] [data-check='52-t1']",{timeout:15000});
  await p.evaluate(async()=>{
   const scope="[data-native-ab12='52']";
   const q=s=>document.querySelector(scope+" "+s);
   const set=(id,v)=>{const el=q("[data-native-field='"+id+"']");const setter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;setter.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));};
   set('52-t1-a1','Im August mache ich eine Reise nach Ägypten.');
   set('52-t2-b1','Ich kaufe ein Haus und reise um die Welt.');
   set('52-t4-d1','Sport, Musik und gute Freunde');
   await new Promise(r=>setTimeout(r,200));
   for(const id of ['52-t1','52-t2','52-t4']) q("[data-check='"+id+"'] button").click();
   await new Promise(r=>setTimeout(r,300));
  });
  const rects=await p.evaluate(()=>{
   const scope="[data-native-ab12='52']";
   const out={};
   for(const id of ['52-t1','52-t2','52-t4']){
    const el=document.querySelector(scope+" [data-check='"+id+"']");
    const r=el.getBoundingClientRect();
    out[id]={x:r.x,y:r.y,w:r.width,h:r.height,text:el.querySelector('output').textContent};
   }
   return out;
  });
  console.log(vp,JSON.stringify(rects));
  await p.screenshot({path:`/downloads/p52after-${vp}-p52.png`,fullPage:true});
 }
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
