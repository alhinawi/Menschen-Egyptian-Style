const{chromium}=require('playwright');const{spawn}=require('child_process');(async()=>{const s=spawn('node',['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5189'],{stdio:'ignore'});let b;try{for(let i=0;i<100;i++){try{await fetch('http://127.0.0.1:5189');break}catch{await new Promise(r=>setTimeout(r,100))}}b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:390,height:844}});const fs=require('fs'),assert=require('assert');fs.mkdirSync('test-results/select-indicators',{recursive:true});
for(const [route,token] of [['ab2.html','12'],['ab1.html','10'],['l2-3.html','14']]){
 await p.goto(`http://127.0.0.1:5189/${route}#${token}`);await p.locator('html[data-book-ready="true"]').waitFor();await p.waitForTimeout(800);
 const fields=p.locator(`.page[data-page="${token}"] select:not([multiple]):not([size])`);const count=await fields.count();assert(count>0,route);
 const results=await fields.evaluateAll(es=>es.map(e=>({width:e.offsetWidth,height:e.offsetHeight,arrow:getComputedStyle(e).backgroundImage,pad:getComputedStyle(e).paddingRight,dir:getComputedStyle(e).direction})));
 assert(results.every(e=>e.arrow.includes('data:image/svg+xml')&&e.pad==='14px'&&e.dir==='ltr'));
 const first=fields.first();const options=await first.locator('option').evaluateAll(es=>es.map(e=>e.value).filter(Boolean));if(options.length){await first.selectOption(options[0]);assert.equal(await first.inputValue(),options[0]);}
 await p.screenshot({path:`test-results/select-indicators/${route}-${token}-390.png`});console.log(route,token,count,'dropdown indicators verified',Math.min(...results.map(e=>e.width)),'px minimum width');
}
for(const width of [390,360]){for(const lang of ['ar','en']){
 await p.setViewportSize({width,height:844});await p.goto('http://127.0.0.1:5189/ab2.html#12');await p.locator('html[data-book-ready="true"]').waitFor();await p.waitForTimeout(700);
 await p.locator('.profileTrigger').click();await p.getByRole('button',{name:lang==='ar'?'العربية':'English',exact:true}).click();await p.waitForTimeout(200);
 const rect=await p.locator('.profilePanel').boundingBox();assert(rect.x>=0&&rect.x+rect.width<=width,`${lang} at ${width}: ${JSON.stringify(rect)}`);
 await p.screenshot({path:`test-results/select-indicators/settings-${lang}-${width}.png`});console.log('PASS settings',lang,width,rect);
 await p.locator('.profileTrigger').click();
}}
}finally{await b?.close();s.kill()}})()
