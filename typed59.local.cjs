const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 for(const [vp,size] of [['desktop',{width:1280,height:900}],['mobile',{width:390,height:844}]]){
  const p=await (await b.newContext({viewport:size})).newPage();
  await p.goto('http://127.0.0.1:4173/ab-a12-l17-20.html#59');
  await p.waitForSelector("[data-native-ab12='59'] [data-native-field='p59-1-l1']",{state:'attached',timeout:15000});
  await p.evaluate(async()=>{
   const scope="[data-native-ab12='59']";
   const q=s=>document.querySelector(scope+" "+s);
   const proto=q("[data-native-field='p59-2-text']").tagName==='TEXTAREA'?window.HTMLTextAreaElement:window.HTMLInputElement;
   const set=(id,v)=>{const el=q("[data-native-field='"+id+"']");const C=el.tagName==='TEXTAREA'?window.HTMLTextAreaElement:window.HTMLInputElement;const setter=Object.getOwnPropertyDescriptor(C.prototype,'value').set;setter.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));};
   set('p59-1-l1','der Bart');
   set('p59-1-l3','ashgar');
   set('p59-1-l16','hazin');
   set('p59-1-r1','el-makhbaza');
   set('p59-1-r6','yansa');
   set('p59-2-text','klima - das Wetter\nmumtaz - ausgezeichnet');
   await new Promise(r=>setTimeout(r,300));
  });
  await p.screenshot({path:`/downloads/p59after-${vp}-p59.png`,fullPage:true});
  // persistence across reload
  await p.reload();
  await p.waitForSelector("[data-native-ab12='59'] [data-native-field='p59-1-l1']",{state:'attached',timeout:15000});
  await p.waitForTimeout(400);
  const st=await p.evaluate(()=>{
   const q=s=>document.querySelector("[data-native-ab12='59'] "+s);
   return {l1:q("[data-native-field='p59-1-l1']").value, r6:q("[data-native-field='p59-1-r6']").value,
    fa:q("[data-native-field='p59-2-text']").value, n:document.querySelectorAll("[data-native-ab12='59'] [data-native-field]").length};
  });
  console.log(vp, JSON.stringify(st));
 }
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
