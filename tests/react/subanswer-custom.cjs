// Custom graders publish one flag per correct sub-answer: partial credit, wrong and blank earn nothing.
const{chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((q,r)=>{try{let u=q.url.split('?')[0];if(!path.extname(u)&&!fs.existsSync(path.join(root,'dist',u)))u='/index.html';const f=path.join(root,'dist',u);r.setHeader('content-type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'})[path.extname(f)]||'application/octet-stream');r.end(fs.readFileSync(f))}catch{r.writeHead(404);r.end()}});
const cases=[
 {route:'ab1.html',store:'native-ab11-8',seed:{'11-b':'ist','11-c':'kommt','11-d':'kommt'},sel:'[data-native-task="11"] button',done:'native-done-ab1',want:['done-8:t-11:f-11-b','done-8:t-11:f-11-d']},
 {route:'ab-a12-l17-20.html',store:'native-ab12-43',seed:{'p43-soup-Köpfe':'1','p43-soup-Füße':'1'},sel:'[data-check="43-5"] button',done:'native-done-ab-a12-l17-20',want:null,prefix:'done-43:'},
];
(async()=>{await new Promise(r=>server.listen(5296,r));
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
try{for(const c of cases){
 const ctx=await b.newContext({viewport:{width:390,height:1000}});await ctx.route('**/api/**',r=>r.fulfill({status:503,body:'{}'}));
 const p=await ctx.newPage();await p.goto('http://localhost:5296/'+c.route);
 await p.evaluate(([k,s])=>localStorage.setItem(k,JSON.stringify(s)),[c.store,c.seed]);await p.reload();
 await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(1200);
 await p.evaluate(sel=>{const el=document.querySelector(sel);el.scrollIntoView();el.click()},c.sel);await p.waitForTimeout(800);
 let fl=await p.evaluate(k=>Object.keys(JSON.parse(localStorage.getItem(k)||'{}')).sort(),c.done);
 if(c.prefix)fl=fl.filter(f=>f.startsWith(c.prefix));
 if(c.want)assert.deepEqual(fl,c.want,c.route+' partial credit');else assert.equal(fl.filter(f=>f.includes(':f-')).length,2,c.route+' two sub flags '+JSON.stringify(fl));
 await p.evaluate(sel=>document.querySelector(sel).click(),c.sel);await p.waitForTimeout(500);
 const again=await p.evaluate(k=>Object.keys(JSON.parse(localStorage.getItem(k)||'{}')).length,c.done);
 assert.equal(again,(await p.evaluate(k=>Object.keys(JSON.parse(localStorage.getItem(k)||'{}')).length,c.done)),'repeat adds nothing');
 console.log('PASS custom grader',c.route,fl);await ctx.close()}
}finally{await b.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
