// Visual dark-theme audit: every themed route x every dark theme, phone width.
// Flags: (1) form fields whose effective background is dark or invisible against the page,
// (2) images with transparent pixels sitting directly on the dark page (no light backing).
const { chromium } = require('playwright');
const manifest = require('../src/lessons/manifest.json');
const DARK = ['dark','forest','burgundy','ocean','midnight','slate','plum'];
const routes = Object.entries(manifest).filter(([, v]) => v.themes).map(([k]) => k);
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const flags = [];
  for (const route of routes) {
    for (const theme of DARK) {
      const p = await ctx.newPage();
      await p.addInitScript(t => { try { localStorage.setItem('menschen-site-theme', JSON.stringify({id: t, mode: 'dark', palette: '1'})); localStorage.setItem('menschen-audio-hint-seen-v1','1'); } catch {} }, theme);
      try {
        await p.goto('http://localhost:4173/' + route, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await p.waitForTimeout(500);
        const problems = await p.evaluate(() => {
          const out = [];
          const lum = rgb => { const m = rgb.match(/[\d.]+/g); if (!m) return 1; const [r,g,b2] = m.map(Number); return (0.2126*r + 0.7152*g + 0.0722*b2) / 255; };
          const pageBg = getComputedStyle(document.querySelector('.page') || document.body).backgroundColor;
          const pageL = lum(pageBg);
          document.querySelectorAll('.page input, .page textarea, .page select').forEach(el => {
            const cs = getComputedStyle(el);
            if (cs.display === 'none' || cs.visibility === 'hidden') return;
            const bgL = cs.backgroundColor === 'rgba(0, 0, 0, 0)' || cs.backgroundColor === 'transparent' ? pageL : lum(cs.backgroundColor);
            const borderVisible = ['borderTopStyle','borderBottomStyle'].some(k => cs[k] !== 'none' && cs[k] !== 'hidden') && lum(cs.borderColor) > 0.15;
            if (Math.abs(bgL - pageL) < 0.12 && !borderVisible) out.push('FIELD invisible: ' + (el.getAttribute('aria-label') || el.className || el.tagName) + ' bg=' + cs.backgroundColor);
            else if (bgL < 0.35 && pageL < 0.35) out.push('FIELD dark-on-dark: ' + (el.getAttribute('aria-label') || el.className || el.tagName) + ' bg=' + cs.backgroundColor);
          });
          document.querySelectorAll('.page img').forEach(img => {
            const cs = getComputedStyle(img);
            const hasBacking = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent' && lum(cs.backgroundColor) > 0.5;
            if (hasBacking) return;
            try {
              const c = document.createElement('canvas');
              const w = Math.min(img.naturalWidth, 60), h = Math.min(img.naturalHeight, 60);
              if (!w || !h) return;
              c.width = w; c.height = h;
              const g = c.getContext('2d');
              g.drawImage(img, 0, 0, w, h);
              const d = g.getImageData(0, 0, w, h).data;
              let transparent = 0, darkPx = 0;
              for (let i = 0; i < d.length; i += 4) { if (d[i+3] < 200) transparent++; else if (d[i] < 90 && d[i+1] < 90 && d[i+2] < 90) darkPx++; }
              const total = d.length / 4;
              if (transparent / total > 0.05 && darkPx / total > 0.02) out.push('IMG transparent w/ dark ink, no backing: ' + (img.getAttribute('alt') || img.src.split('/').pop()) + ' (' + Math.round(transparent/total*100) + '% transparent)');
            } catch (e) {}
          });
          return out;
        });
        problems.forEach(pr => flags.push(route + ' [' + theme + '] ' + pr));
      } catch (e) { flags.push(route + ' [' + theme + '] PAGE-ERROR ' + String(e).slice(0, 80)); }
      await p.close();
    }
    console.log('done ' + route);
  }
  await b.close();
  console.log('\nTOTAL FLAGS: ' + flags.length);
  flags.slice(0, 200).forEach(f => console.log(f));
})().catch(e => { console.error(e); process.exit(1); });
