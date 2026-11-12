// Contrast audit: every themed route x every theme, WCAG AA check on rendered text.
// Run from repo root: node contrast-audit.cjs [--screenshots DIR] [--only route,theme]
const {chromium} = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const manifest = JSON.parse(fs.readFileSync('src/lessons/manifest.json', 'utf8'));
let routes = Object.entries(manifest).filter(([, v]) => v.themes).map(([k]) => k);
if (process.argv.includes('--routes')) routes = process.argv[process.argv.indexOf('--routes')+1].split(',');
const THEMES = ['light', 'dark', 'paper', 'sand', 'forest', 'burgundy', 'ocean', 'midnight', 'slate', 'plum'];
const shotDir = process.argv.includes('--screenshots') ? process.argv[process.argv.indexOf('--screenshots') + 1] : null;

const MIME = {'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf'};
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(DIST, p);
  if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('nf'); return; }
  res.writeHead(200, {'Content-Type': MIME[path.extname(file)] || 'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
});

const AUDIT_FN = `
window.__audit = function(){
  function parseRGB(str){
    const m = str.match(/rgba?\\(([^)]+)\\)/); if(!m) return null;
    const p = m[1].split(',').map(s=>parseFloat(s));
    return {r:p[0], g:p[1], b:p[2], a: p.length>3 ? p[3] : 1};
  }
  function over(fg, bg){ const a = fg.a + bg.a*(1-fg.a); if(a===0) return {r:0,g:0,b:0,a:0};
    return {r:(fg.r*fg.a + bg.r*bg.a*(1-fg.a))/a, g:(fg.g*fg.a + bg.g*bg.a*(1-fg.a))/a, b:(fg.b*fg.a + bg.b*bg.a*(1-fg.a))/a, a}; }
  function lum(c){ const f = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); };
    return 0.2126*f(c.r) + 0.7152*f(c.g) + 0.0722*f(c.b); }
  function ratio(a,b){ const l1=lum(a), l2=lum(b); return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05); }
  function gradientColors(str){ const cols=[]; const re=/#([0-9a-fA-F]{3,8})\\b|rgba?\\([^)]+\\)/g; let m;
    while((m=re.exec(str))){ if(m[1]){ let h=m[1]; if(h.length===3)h=h.split('').map(c=>c+c).join('');
      cols.push({r:parseInt(h.slice(0,2),16),g:parseInt(h.slice(2,4),16),b:parseInt(h.slice(4,6),16),a:h.length===8?parseInt(h.slice(6,8),16)/255:1}); }
      else { const c=parseRGB(m[0]); if(c) cols.push(c); } }
    return cols; }
  const out=[];
  const els = document.querySelectorAll('body *');
  for(const el of els){
    const tag = el.tagName;
    if(['SCRIPT','STYLE','SVG','PATH','NOSCRIPT','TEMPLATE','OPTION','SELECT','INPUT','TEXTAREA','CANVAS','IMG','AUDIO','VIDEO','BR','HR','META','LINK','HEAD'].includes(tag)) continue;
    let hasText = false;
    for(const n of el.childNodes){ if(n.nodeType===3 && n.textContent.trim()){ hasText=true; break; } }
    if(!hasText) continue;
    const cs = getComputedStyle(el);
    if(cs.display==='none' || cs.visibility==='hidden' || parseFloat(cs.opacity)===0) continue;
    const rect = el.getBoundingClientRect();
    if(rect.width<2 || rect.height<2) continue;
    const colorFill = cs.webkitTextFillColor && cs.webkitTextFillColor !== cs.color ? cs.webkitTextFillColor : cs.color;
    const fgC = parseRGB(colorFill); if(!fgC) continue;
    // effective background: walk up, compositing translucent colors; note gradients
    let bg = {r:255,g:255,b:255,a:0}, gradCols=null, bgFrom='(viewport white)';
    for(let n=el; n && n.nodeType===1; n=n.parentElement){
      const ncs = getComputedStyle(n);
      const c = parseRGB(ncs.backgroundColor);
      if(c && c.a>0){ const nb = over(c, bg.a>0?bg:{r:255,g:255,b:255,a:1}); if(nb.a>0.98){bg=nb; bgFrom=n.tagName+'.'+(n.className&&n.className.baseVal===undefined?String(n.className).split(' ')[0]:'');} else bg=nb; if(bg.a>0.98 && !gradCols) break; }
      if(!gradCols && ncs.backgroundImage && ncs.backgroundImage.includes('gradient')){
        const cols = gradientColors(ncs.backgroundImage);
        if(cols.length){ gradCols = cols.map(c=>over(c, bg.a>0?bg:{r:255,g:255,b:255,a:1})); }
      }
      if(bg.a>0.98 && (gradCols || !ncs.backgroundImage.includes('gradient'))) break;
    }
    if(bg.a<0.98) bg = over(bg, {r:255,g:255,b:255,a:1});
    const candidates = gradCols && gradCols.length ? gradCols : [bg];
    let worst = Infinity, worstBg = bg;
    for(const c of candidates){ const r = ratio(fgC, c); if(r<worst){worst=r; worstBg=c;} }
    const fs = parseFloat(cs.fontSize), fw = parseInt(cs.fontWeight)||400;
    const large = fs>=24 || (fs>=18.66 && fw>=700);
    const min = large ? 3.0 : 4.5;
    const sig = tag.toLowerCase() + (el.className && el.className.baseVal===undefined ? '.'+String(el.className).trim().split(/\\s+/).slice(0,3).join('.') : '');
    out.push({sig, text: el.textContent.trim().slice(0,60), ratio: Math.round(worst*100)/100, min, fg: colorFill, bg: 'rgb('+[worstBg.r,worstBg.g,worstBg.b].map(Math.round).join(',')+')', bgFrom, fs, fw, grad: !!(gradCols&&gradCols.length)});
  }
  return out;
};`;

(async () => {
  await new Promise(r => server.listen(4891, r));
  const browser = await chromium.launch();
  const failures = [];
  const audits = [];
  for (const route of routes) {
    for (const theme of THEMES) {
      const ctx = await browser.newContext({viewport: {width: 390, height: 844}});
      await ctx.addInitScript(t => { try { localStorage.setItem('menschen-site-theme', JSON.stringify({id: t, mode: ['dark','forest','burgundy','ocean','midnight','slate','plum'].includes(t)?'dark':'light', palette: '1'})); localStorage.setItem('menschen-audio-hint-seen-v1','1'); } catch {} }, theme);
      const page = await ctx.newPage();
      try {
        await page.goto('http://127.0.0.1:4891/' + route, {waitUntil: 'load', timeout: 30000});
        await page.waitForSelector('html[data-book-ready="true"]', {timeout: 15000}).catch(() => {});
        await page.waitForTimeout(400);
        await page.evaluate(AUDIT_FN);
        let rows = await page.evaluate('window.__audit()');
        // audit the themes dialog too
        const hasTrigger = await page.$('.themesTrigger');
        if (hasTrigger) {
          await page.click('.themesTrigger').catch(()=>{});
          await page.waitForTimeout(200);
          const drows = await page.evaluate('window.__audit()');
          const base = new Set(rows.map(r => r.sig + '|' + r.text));
          rows = rows.concat(drows.filter(r => !base.has(r.sig + '|' + r.text)).map(r => ({...r, sig: 'dialog>' + r.sig})));
          await page.keyboard.press('Escape').catch(()=>{});
        }
        // audit the translation popup too (once is enough: popup styles are global)
        if (route === 'index.html') {
          await page.evaluate("document.querySelector('.tapWord')?.click()").catch(()=>{});
          await page.waitForTimeout(300);
          const prows = await page.evaluate('window.__audit()');
          const base2 = new Set(rows.map(r => r.sig + '|' + r.text));
          rows = rows.concat(prows.filter(r => !base2.has(r.sig + '|' + r.text)).map(r => ({...r, sig: 'popup>' + r.sig})));
          await page.keyboard.press('Escape').catch(()=>{});
        }
        for (const r of rows) if (r.ratio < r.min) failures.push({route, theme, ...r});
        audits.push({route, theme, elements: rows.length, failures: rows.filter(r => r.ratio < r.min).length});
        if (shotDir) {
          fs.mkdirSync(shotDir, {recursive: true});
          await page.screenshot({path: path.join(shotDir, route.replace('.html','') + '--' + theme + '.png')});
        }
      } catch (e) {
        failures.push({route, theme, sig: 'PAGE-ERROR', text: String(e).slice(0, 120), ratio: 0, min: 4.5});
      }
      await ctx.close();
    }
  }
  await browser.close();
  server.close();
  // group failures
  const groups = {};
  for (const f of failures) {
    const key = [f.theme, f.sig, f.fg, f.bg].join(' | ');
    groups[key] = groups[key] || {count: 0, routes: new Set(), sample: f.text, ratio: f.ratio, min: f.min, bgFrom: f.bgFrom, grad: f.grad};
    groups[key].count++; groups[key].routes.add(f.route);
  }
  const sorted = Object.entries(groups).sort((a, b) => b[1].count - a[1].count);
  console.log('AUDITS RUN:', audits.length, ' TOTAL FAILURE ROWS:', failures.length, ' GROUPS:', sorted.length);
  for (const [key, g] of sorted) {
    console.log('\\n[' + g.count + 'x, worst ratio ' + g.ratio + ' < ' + g.min + (g.grad ? ', gradient' : '') + '] ' + key);
    console.log('   bgFrom: ' + g.bgFrom + ' | routes: ' + [...g.routes].join(','));
    console.log('   text: "' + g.sample + '"');
  }
  const errs = failures.filter(f => f.sig === 'PAGE-ERROR');
  if (errs.length) console.log('\\nPAGE ERRORS:', JSON.stringify(errs, null, 1));
})();
