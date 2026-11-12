// Capture a screenshot matrix: every lesson page x every reader theme.
// Serves dist/ like the other suites; run `npm run build` first.
// Usage: node scripts/capture-matrix.cjs <outdir> [width]
require('../tests/react/playwright-hook.cjs');
const {chromium} = require('playwright');
const fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const root = path.resolve(__dirname, '..');
const outdir = process.argv[2] || '/tmp/tw-baseline';
const width = parseInt(process.argv[3] || '390', 10);
const pages = Object.keys(JSON.parse(fs.readFileSync(path.join(root, 'src/lessons/manifest.json'), 'utf8')));
const themes = ['light', 'dark', 'paper', 'sand', 'forest', 'burgundy', 'ocean', 'midnight', 'slate', 'plum'];
const modeOf = (t) => ['light', 'paper', 'sand'].includes(t) ? 'light' : 'dark';
const server = http.createServer((req, res) => {
  let f = path.join(root, 'dist', req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  try {
    const mime = {'.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.svg': 'image/svg+xml'};
    res.setHeader('Content-Type', mime[path.extname(f)] || 'application/octet-stream');
    res.end(fs.readFileSync(f));
  } catch { res.writeHead(404); res.end('not found'); }
});
(async () => {
  fs.mkdirSync(outdir, { recursive: true });
  await new Promise(r => server.listen(5190, '127.0.0.1', r));
  const b = await chromium.launch({executablePath: '/usr/bin/google-chrome-stable', args: ['--no-sandbox']});
  try {
    const p = await b.newPage({viewport: {width, height: 844}, isMobile: width < 800, hasTouch: true});
    p.on('pageerror', e => console.log('PAGEERROR', e.message));
    for (const page of pages) {
      for (const theme of themes) {
        await p.addInitScript(([t, m]) => {
          try { localStorage.setItem('menschen-site-theme', JSON.stringify({id: t, mode: m, palette: '1'})); } catch {}
        }, [theme, modeOf(theme)]);
        await p.goto('http://127.0.0.1:5190/' + page);
        await p.waitForTimeout(250);
        await p.screenshot({path: path.join(outdir, page.replace('.html', '') + '__' + theme + '.png')});
      }
      console.log('captured', page);
    }
  } finally { await b.close(); server.close(); }
})().catch(e => { console.error(e); server.close(); process.exitCode = 1; });
