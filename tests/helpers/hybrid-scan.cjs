const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

async function turnTo(page, index) {
  await page.evaluate(i => window.bookPage(i), index);
  await page.waitForFunction(i => window.menschenBook.getCurrentPageIndex() === i, index);
  await page.waitForTimeout(400);
}

async function gradeHybridScans(page) {
  let groups = 0;
  for (const scan of await page.locator('.hybridScan').all()) {
    const index = await scan.evaluate(el => window.menschenPages.findIndex(p => p.contains(el)));
    await turnTo(page, index);
    const book = await scan.getAttribute('data-scan-book');
    const number = await scan.getAttribute('data-scan-page');
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../src/scan-data', book, `p${number}.json`), 'utf8'));
    for (const field of data.fields.filter(f => f.answer !== undefined)) {
      const control = scan.locator(`[data-field-id=${JSON.stringify(field.id)}]`);
      const answer = field.answer.split('|')[0];
      if (field.kind === 'radio') {
        if (field.answer.split('|').includes('true')) await control.evaluate(el => el.click());
      } else if (field.kind === 'checkbox') {
        await control.evaluate((el, checked) => { if (el.checked !== checked) el.click(); }, answer === 'true');
      } else if (field.kind === 'select') {
        await control.selectOption(answer);
      } else {
        await control.fill(answer);
      }
    }
    for (const button of await scan.locator('.hybridCheck button').all()) await button.evaluate(el => el.click());
    const results = await scan.locator('.hybridCheck output').allTextContents();
    assert(results.every(text => text.includes('Richtig')), `${book} p${number}: ${results.join(', ')}`);
    groups += results.length;
  }
  return groups;
}
module.exports = {turnTo, gradeHybridScans};
