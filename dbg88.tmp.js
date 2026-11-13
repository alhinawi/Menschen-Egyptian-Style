const { chromium } = require('playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 const p=await b.newPage();
 await p.goto('http://127.0.0.1:5210/ab-a12-l21-24.html#88');
 await p.waitForTimeout(1200);
 const r=await p.evaluate(()=>{
   const t='ich arbeite am Wochenende | der Schnee ist traumhaft | ich backe gern | deine Partys sind immer';
   const cv=document.createElement('canvas').getContext('2d');
   const out={check400:document.fonts.check('14px FiraSans'),check500:document.fonts.check('500 14px FiraSans')};
   for(const f of ['14px FiraSans','500 14px FiraSans','14px "Trebuchet MS"']){cv.font=f;out[f]=cv.measureText(t).width.toFixed(1)}
   const el=[...document.querySelectorAll('.naBank88b')][0];
   const range=document.createRange();range.selectNodeContents(el);
   out.elWidth=(range.getBoundingClientRect().width/1.115).toFixed(1);
   out.elFont=getComputedStyle(el).fontFamily; out.elWeight=getComputedStyle(el).fontWeight;
   return out;
 });
 console.log(JSON.stringify(r,null,1));
 await b.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
