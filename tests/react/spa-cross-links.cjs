const {chromium} = require('playwright');
const fs = require('fs'), path = require('path'), http = require('http');
const root = path.resolve(__dirname, '../..');
const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0].split('#')[0];
  if (url === '/') url = '/index.html';
  const f = path.join(root, 'dist', url);
  try {
    res.setHeader('content-type', ({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.png':'image/png','.webp':'image/webp','.mp3':'audio/mpeg','.svg':'image/svg+xml'})[path.extname(f)] || 'application/octet-stream');
    res.end(fs.readFileSync(f));
  } catch { res.writeHead(404); res.end('not found'); }
});
const shots = '/downloads/spa-proof';
fs.mkdirSync(shots, {recursive: true});

(async () => {
  await new Promise(r => server.listen(5198, '127.0.0.1', r));
  const b = await chromium.launch({executablePath: '/usr/bin/google-chrome-stable', args: ['--no-sandbox']});
  const results = [];
  const ok = (name, cond, extra='') => { results.push(`${cond ? 'PASS' : 'FAIL'} ${name}${extra ? ' - ' + extra : ''}`); if (!cond) process.exitCode = 1; };
  try {
    const p = await b.newPage({viewport: {width: 390, height: 844}});
    const marker = () => p.evaluate(() => window.__spaProof);
    const path = () => p.evaluate(() => location.pathname.split('/').pop() + location.search + location.hash);
    const ready = () => p.waitForFunction(() => document.documentElement.dataset.bookReady === 'true', null, {timeout: 15000});
    const pick = (value) => p.evaluate(v => { const s = document.querySelector('#lessonNav'); s.value = v; s.dispatchEvent(new Event('change', {bubbles: true})); }, value);

    // Chain of three switches, then back x3 and forward x2.
    await p.goto('http://127.0.0.1:5198/l7-9.html#45');
    await ready();
    await p.evaluate(() => { window.__spaProof = 'CHAIN'; });
    await pick('l10-12.html#57');
    await p.waitForFunction(() => location.pathname.endsWith('/l10-12.html') && document.documentElement.dataset.bookReady === 'true', null, {timeout: 15000});
    await pick('l21-24.html#49');
    await p.waitForFunction(() => location.pathname.endsWith('/l21-24.html') && document.documentElement.dataset.bookReady === 'true', null, {timeout: 15000});
    await pick('ab-a12-l21-24.html#66');
    await p.waitForFunction(() => location.pathname.endsWith('/ab-a12-l21-24.html') && document.documentElement.dataset.bookReady === 'true', null, {timeout: 15000});
    ok('chain of 3 switches: no reload', await marker() === 'CHAIN');

    await p.goBack(); await p.waitForFunction(() => document.documentElement.dataset.bookReady === 'true' && location.pathname.endsWith('/l21-24.html'), null, {timeout: 15000});
    ok('back 1: l21-24 restored, no reload', await marker() === 'CHAIN', await path());
    await p.goBack(); await p.waitForFunction(() => document.documentElement.dataset.bookReady === 'true' && location.pathname.endsWith('/l10-12.html'), null, {timeout: 15000});
    ok('back 2: l10-12 restored, no reload', await marker() === 'CHAIN', await path());
    await p.goBack(); await p.waitForFunction(() => document.documentElement.dataset.bookReady === 'true' && location.pathname.endsWith('/l7-9.html'), null, {timeout: 15000});
    ok('back 3: l7-9 restored, no reload', await marker() === 'CHAIN', await path());
    await p.goForward(); await p.waitForFunction(() => document.documentElement.dataset.bookReady === 'true' && location.pathname.endsWith('/l10-12.html'), null, {timeout: 15000});
    ok('forward 1: l10-12 restored, no reload', await marker() === 'CHAIN', await path());
    await p.goForward(); await p.waitForFunction(() => document.documentElement.dataset.bookReady === 'true' && location.pathname.endsWith('/l21-24.html'), null, {timeout: 15000});
    ok('forward 2: l21-24 restored, no reload', await marker() === 'CHAIN', await path());
    await p.screenshot({path: shots + '/7-chain-forward.png'});

    // Original viewer link from the reader toolbar: in-app swap, ?page= kept.
    await p.goto('http://127.0.0.1:5198/l7-9.html#41');
    await ready();
    await p.evaluate(() => { window.__spaProof = 'VIEWER'; });
    await p.click('a[href*="original-viewer.html?page="]');
    await p.waitForFunction(() => location.pathname.endsWith('/original-viewer.html'), null, {timeout: 15000});
    await p.waitForSelector('#canvas', {timeout: 15000});
    await p.waitForTimeout(400);
    ok('viewer link: no reload (marker survived)', await marker() === 'VIEWER');
    ok('viewer link: ?page=41 preserved in URL', (await path()).includes('original-viewer.html?page=41'), await path());
    ok('viewer link: viewer shows Seite 41', (await p.locator('#page').textContent())?.includes('41'), await p.locator('#page').textContent());
    await p.screenshot({path: shots + '/8-viewer-spa.png'});
    await p.goBack();
    await p.waitForFunction(() => document.documentElement.dataset.bookReady === 'true' && location.pathname.endsWith('/l7-9.html'), null, {timeout: 15000});
    ok('viewer -> back: l7-9 restored, no reload', await marker() === 'VIEWER', await path());

    // ab1: same-lesson pick from the header select (adapter used to reload).
    await p.goto('http://127.0.0.1:5198/ab1.html');
    await ready();
    await p.evaluate(() => { window.__spaProof = 'AB1'; });
    await pick('ab1.html#6');
    await p.waitForTimeout(800);
    ok('ab1 same-lesson pick: no reload', await marker() === 'AB1');
    ok('ab1 same-lesson pick: turned to Seite 6', await p.evaluate(() => window.menschenBook?.getCurrentPageIndex?.() === window.menschenPages?.findIndex?.(pg => pg?.dataset?.page === '6')), await path());
    // ab1: cross-lesson pick with no page token.
    await pick('ab2.html');
    await p.waitForFunction(() => location.pathname.endsWith('/ab2.html') && document.documentElement.dataset.bookReady === 'true', null, {timeout: 15000});
    ok('ab1 -> ab2 (no token): no reload', await marker() === 'AB1', await path());
    ok('ab1 -> ab2: lesson rendered', await p.locator('.page').count() > 0);

    // Cover home anchor from ab-a12-l17-20 (markup link to index.html).
    await p.goto('http://127.0.0.1:5198/ab-a12-l17-20.html');
    await ready();
    await p.evaluate(() => { window.__spaProof = 'HOME'; });
    const home = p.locator('a[href="index.html"]').first();
    if (await home.count()) {
      await home.click();
      await p.waitForFunction(() => location.pathname.endsWith('/index.html') && document.documentElement.dataset.bookReady === 'true', null, {timeout: 15000});
      ok('home anchor: no reload (marker survived)', await marker() === 'HOME', await path());
    } else ok('home anchor present', false);

    console.log(results.join('\n'));
  } finally { await b.close(); server.close(); }
})().catch(e => { console.error(e); server.close(); process.exitCode = 1; });
