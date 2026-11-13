// Screenshot native AB12 pages vs original scans, side by side.
// usage: node compare.mjs <page> [page...] [--width=1400|390]
import {chromium} from 'playwright';
import {execFileSync} from 'node:child_process';
const pages=process.argv.slice(2).filter(a=>!a.startsWith('--'));
const widthArg=(process.argv.slice(2).find(a=>a.startsWith('--width='))||'--width=1400').split('=')[1];
const vw=parseInt(widthArg);
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
for(const page of pages){
  const p=await browser.newPage({viewport:{width:vw,height:1250}});
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(`http://127.0.0.1:5210/ab-a12-l21-24.html#${page}`);
  await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(400);
  await p.evaluate(()=>document.querySelectorAll('.controls,.readerPageNavigation,header').forEach(e=>e.style.display='none'));
  const el=p.locator(`section[data-page="${page}"] .naCanvas`);
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(200);
  await el.screenshot({path:`/tmp/render-${page}-${vw}.png`});
  console.log(`page ${page}: shot ok, errors=${JSON.stringify(errors)}`);
  await p.close();
}
await browser.close();
// composite via PIL
for(const page of pages){
  execFileSync('python3',['/tmp/sidebyside.py',page,String(vw)]);
}
