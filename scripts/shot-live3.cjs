// Live shot: page, html, out, viewportWidth, DPR.
const {chromium}=require('playwright');
(async()=>{
 const page=process.argv[2]; const html=process.argv[3]; const out=process.argv[4];
 const vw=+(process.argv[5]||390); const dpr=+(process.argv[6]||2);
 const sel=`[data-native-ab12="${page}"] .naCanvas`;
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 try{
  const ctx=await browser.newContext({viewport:{width:vw,height:844},isMobile:vw<600,hasTouch:vw<600,deviceScaleFactor:dpr,bypassCSP:true});
  await ctx.route('**/*',r=>r.continue({headers:{...r.request().headers(),'cache-control':'no-cache'}}));
  const p=await ctx.newPage();
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(`https://germani.pages.dev/${html}?cb=${Date.now()}#${page}`,{waitUntil:'networkidle',timeout:60000});
  await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000});
  const el=p.locator(sel).first();await el.waitFor({timeout:20000});
  await el.scrollIntoViewIfNeeded();
  await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(1200);
  const fonts=await p.evaluate(()=>['400 19.5px DroidSerif','700 19.5px DroidSerif','600 21px FiraSans','400 18.6px FiraSans'].map(f=>[f,document.fonts.check(f)]));
  console.log('FONTS',JSON.stringify(fonts));
  await el.screenshot({path:out+'.png'});
  if(errors.length)console.log('PAGEERRORS',errors.slice(0,5));
  await p.close();
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
