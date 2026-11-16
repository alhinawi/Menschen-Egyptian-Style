// Screenshot native pages: node shot.cjs <file.html> <page> <outbase> [width] [height]
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../..');
const server=http.createServer((req,res)=>{
 const url=req.url.split('?')[0].split('#')[0];const f=path.join(root,'dist',url==='/'?'index.html':url);
 try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.mp3':'audio/mpeg','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f))}
 catch{res.writeHead(404);res.end('not found')}
});
(async()=>{
await new Promise(r=>server.listen(5197,'127.0.0.1',r));
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome-stable',args:['--no-sandbox']});
const results=[];const slugs=['index','l2-3','l4-6','l7-9','l10-12','kb-a12-l13-16','kb-a12-l17-20','l21-24','ab1','ab2','ab3','abm1','ab4-6','ab-l7-9','ab-l10-12','ab-a12-l13-16','ab-a12-l17-20','ab-a12-l21-24'];
for(const width of [360,390]){
 const p=await browser.newPage({viewport:{width,height:780}});await p.route('**/api/**',r=>r.fulfill({json:{}}));
 for(const slug of slugs){
 await p.goto(`http://127.0.0.1:5197/${slug}.html`);await p.waitForFunction(()=>document.documentElement.dataset.bookReady==='true');await p.waitForTimeout(300);
 const count=await p.locator('.page').count();
 for(let i=0;i<count;i++){
 await p.evaluate(i=>window.menschenBook.turnToPage(i),i);await p.waitForTimeout(45);
 const row=await p.evaluate(()=>{const vp=document.querySelector('#viewport'),sp=document.querySelector('#spread'),st=document.querySelector('#pageStage');return {page:location.hash,doc:[document.documentElement.scrollWidth,document.documentElement.clientWidth],vp:[vp.scrollWidth,vp.clientWidth],spread:[sp.scrollWidth,sp.clientWidth],stage:[st.scrollWidth,st.clientWidth],zoom:sp.style.zoom,zoomed:document.body.dataset.bookZoomed}});results.push({width,slug,...row});
 }
 console.log(width,slug,count,'bad',results.filter(r=>r.width===width&&r.slug===slug&&(r.doc[0]>r.doc[1]+1||r.vp[0]>r.vp[1]+1)).length);
 }
 await p.close();
}
fs.writeFileSync(process.env.OUT||'/tmp/menschen-mobile-overflow.json',JSON.stringify(results,null,2));const bad=results.filter(r=>r.doc[0]>r.doc[1]+1||r.vp[0]>r.vp[1]+1);if(bad.length)throw Error(JSON.stringify(bad));console.log('PASS',results.length,'page/width combinations fit document and viewport');await browser.close();server.close();
})().catch(e=>{console.error(e);server.close();process.exit(1)});
