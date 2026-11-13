const {chromium} = require('playwright');
const fs = require('fs'), path = require('path'), http = require('http'), assert = require('assert/strict');
const root = require('path').resolve(__dirname,'../..');
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
  await new Promise(r => server.listen(5199, '127.0.0.1', r));
  const b = await chromium.launch({executablePath: '/usr/bin/google-chrome-stable', args: ['--no-sandbox']});
  const results = [];
  const ok = (name, cond, extra='') => { results.push(`${cond ? 'PASS' : 'FAIL'} ${name}${extra ? ' - ' + extra : ''}`); if (!cond) process.exitCode = 1; };
  try {
    const p = await b.newPage({viewport: {width: 390, height: 844}});
    await p.goto('http://127.0.0.1:5199/l7-9.html#45');
    await p.waitForFunction(() => document.documentElement.dataset.bookReady === 'true');
    await p.evaluate(() => { window.__spaProof = 'SURVIVES-NO-RELOAD'; });
    const navBefore = await p.evaluate(() => performance.getEntriesByType('navigation').length);
    await p.screenshot({path: shots + '/1-before-l7-9.png'});

    // scroll down, then switch lesson via the header select (cross-file target)
    await p.evaluate(() => scrollTo(0, 400));
    const toolbarSamples = [];
    const sampler = setInterval(async () => {
      try { toolbarSamples.push(await p.evaluate(() => ({controls: document.querySelectorAll('.controls').length, select: !!document.querySelector('.headerBrand select'), theme: !!document.querySelector('.themesTrigger')}))); } catch {}
    }, 40);
    await p.evaluate(() => { const s = document.querySelector('#lessonNav'); s.value = 'l10-12.html#57'; s.dispatchEvent(new Event('change', {bubbles: true})); });
    await p.waitForFunction(() => location.pathname.endsWith('/l10-12.html') && document.documentElement.dataset.bookReady === 'true', null, {timeout: 15000});
    // let the sampler catch the settled state too
    await p.waitForTimeout(300);
    clearInterval(sampler);
    await p.screenshot({path: shots + '/2-after-l10-12-select.png'});

    ok('header select switch: no reload (window marker survived)', await p.evaluate(() => window.__spaProof) === 'SURVIVES-NO-RELOAD');
    ok('header select switch: single navigation entry', await p.evaluate(() => performance.getEntriesByType('navigation').length) === navBefore, `nav entries ${navBefore}`);
    ok('URL updated to new lesson', await p.evaluate(() => location.pathname.endsWith('/l10-12.html') && location.hash === '#57'));
    ok('scroll reset to top after switch', await p.evaluate(() => scrollY) === 0);
    ok('new lesson rendered (flip pages present)', await p.locator('.page').count() > 0, `${await p.locator('.page').count()} pages`);
    const missing = toolbarSamples.filter(s => s.controls !== 1 || !s.select);
    ok('toolbar never disappeared during swap (390px)', missing.length === 0, `${toolbarSamples.length} samples, ${missing.length} bad`);
    ok('theme button present after swap', await p.locator('.themesTrigger').count() === 1);

    // LibraryNav lesson row switch
    await p.click('.lnv-pill');
    await p.waitForSelector('.lnv-overlay');
    await p.screenshot({path: shots + '/3-library-open.png'});
    await p.click('.lnv-row:has-text("Lektion 21–24"), .lnv-row:has-text("Lektion 21")');
    await p.waitForFunction(() => location.pathname.endsWith('/l21-24.html') && document.documentElement.dataset.bookReady === 'true', null, {timeout: 15000});
    await p.screenshot({path: shots + '/4-after-l21-24-library.png'});
    ok('library row switch: no reload (marker survived)', await p.evaluate(() => window.__spaProof) === 'SURVIVES-NO-RELOAD');
    ok('library row switch: URL updated', await p.evaluate(() => location.pathname.endsWith('/l21-24.html')));
    ok('library panel closed after switch', await p.locator('.lnv-overlay').count() === 0);

    // Book card switch (KB -> AB)
    await p.click('.lnv-pill');
    await p.waitForSelector('.lnv-overlay');
    await p.click('a.lnv-bookcard');
    await p.waitForFunction(() => /\/ab/.test(location.pathname) && document.documentElement.dataset.bookReady === 'true', null, {timeout: 15000});
    await p.screenshot({path: shots + '/5-after-bookcard-ab.png'});
    ok('book card KB->AB: no reload (marker survived)', await p.evaluate(() => window.__spaProof) === 'SURVIVES-NO-RELOAD');
    ok('book card KB->AB: URL on AB book', await p.evaluate(() => /\/ab/.test(location.pathname)), await p.evaluate(() => location.pathname));

    // Back button returns to previous lesson without reload
    await p.goBack();
    await p.waitForFunction(() => document.documentElement.dataset.bookReady === 'true', null, {timeout: 15000});
    ok('back button: no reload (marker survived)', await p.evaluate(() => window.__spaProof) === 'SURVIVES-NO-RELOAD');
    ok('back button: returned to previous lesson URL', await p.evaluate(() => location.pathname.endsWith('/l21-24.html')), await p.evaluate(() => location.pathname));
    await p.screenshot({path: shots + '/6-after-back.png'});

    // Refresh keeps current page
    await p.evaluate(() => history.replaceState({}, '', location.pathname + '#53'));
    await p.reload();
    await p.waitForFunction(() => document.documentElement.dataset.bookReady === 'true', null, {timeout: 15000});
    ok('refresh: stays on same lesson+page', await p.evaluate(() => location.pathname.endsWith('/l21-24.html') && location.hash === '#53'));

    // Cover inline onchange (BookMarkup path): index cover select
    await p.goto('http://127.0.0.1:5199/index.html');
    await p.waitForFunction(() => document.documentElement.dataset.bookReady === 'true');
    await p.evaluate(() => { window.__spaProof = 'SURVIVES-NO-RELOAD'; });
    const coverSelect = p.locator('select').first();
    if (await coverSelect.count()) {
      const vals = await coverSelect.locator('option').evaluateAll(os => os.map(o => o.value).filter(v => v && v.includes('.html') && !v.startsWith('index')));
      if (vals.length) {
        await p.evaluate(v => { const s = document.querySelector('select'); s.value = v; s.dispatchEvent(new Event('change', {bubbles: true})); }, vals[0]);
        await p.waitForTimeout(1500);
        ok('cover inline-onchange select: no reload (marker survived)', await p.evaluate(() => window.__spaProof) === 'SURVIVES-NO-RELOAD', vals[0]);
        ok('cover inline-onchange select: navigated in-app', await p.evaluate(() => location.pathname !== '/index.html'), await p.evaluate(() => location.pathname));
      } else ok('cover inline-onchange select: found a cross-lesson option', false, 'none');
    } else ok('cover select present', false);

    console.log(results.join('\n'));
  } finally { await b.close(); server.close(); }
})().catch(e => { console.error(e); server.close(); process.exitCode = 1; });
