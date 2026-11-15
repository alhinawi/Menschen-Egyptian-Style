const {chromium}=require('playwright');const{spawn}=require('child_process');const assert=require('assert');const fs=require('fs');
(async()=>{fs.mkdirSync('test-results/english-ab-corpus',{recursive:true});const server=spawn('node',['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5194'],{stdio:'ignore'});let browser;try{
for(let i=0;i<100;i++){try{await fetch('http://127.0.0.1:5194');break}catch{await new Promise(r=>setTimeout(r,100))}}
browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await browser.newPage({viewport:{width:390,height:844}});await p.goto('http://127.0.0.1:5194/ab4-6.html#33');await p.locator('html[data-book-ready="true"]').waitFor();await p.waitForTimeout(800);
await p.locator('.profileTrigger').click();await p.getByRole('button',{name:'English',exact:true}).click();await p.locator('.profileTrigger').click();
for(const [de,en] of [['Ich habe wirklich nicht viel Geld.',"I really don't have much money."],['Maus','mouse'],['Ich brauche kein Büro.',"I don't need an office."]]){
 if(!en)continue;
 await p.evaluate(de=>window.openBookMeaning(de,de,'sentence'),de);await p.locator('.meaningPopup[open]').waitFor();assert.equal(await p.locator('.meaningTranslation').innerText(),en);assert.equal(await p.locator('.meaningTranslation').getAttribute('lang'),'en');await p.screenshot({path:'test-results/english-ab-corpus/'+(de.startsWith('Ich habe wirklich')?'negation':'sample-'+de.split(' ')[0])+'.png'});await p.locator('.meaningClose').click();
}
console.log('PASS English AB corpus: negation, office vocabulary, sentence. 390px rendering.');
}finally{await browser?.close();server.kill()}})().catch(e=>{console.error(e);process.exitCode=1});
