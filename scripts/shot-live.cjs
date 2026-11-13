// Screenshot one live page at 390px (and optional full) from the deployed site.
// usage: node scripts/shot-live.cjs <page> <htmlfile> [outprefix]
const {chromium}=require('playwright');
(async()=>{
 const page=process.argv[2];
 const html=process.argv[3];
 const out=process.argv[4]||`/tmp/live-p${page}`;
 const sel=`[data-native-ab12="${page}"] .naCanvas`;
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
 try{
  const p=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(`https://germani.pages.dev/${html}#${page}`,{waitUntil:'networkidle',timeout:60000});
  await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true',{timeout:30000});
  const el=p.locator(sel).first();await el.waitFor({timeout:20000});
  await el.scrollIntoViewIfNeeded();await p.waitForTimeout(600);
  await el.screenshot({path:out+'-390.png'});
  if(errors.length)console.log('PAGEERRORS',errors.slice(0,5));
  await p.close();
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
