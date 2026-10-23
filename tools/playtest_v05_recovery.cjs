/* Recovery/lifecycle supplement: game actions use real keyboard and pointer events. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE ||
  'C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.V05_URL || 'http://127.0.0.1:8775/slide-v05.html';
const output = path.resolve('.qa/v05-recovery');
fs.mkdirSync(output, {recursive: true});
const checks = {}, timingsMs = {}, errors = [], limitations = [];
const ready = page => page.waitForFunction(() => window.slideV05?.state && !window.slideV05.busy, null, {timeout: 15000});
const state = page => page.evaluate(() => window.slideV05.state);
const tile = (page, id) => page.locator('[data-tile-id="' + id + '"]');
const sleepFrame = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
async function key(page, id, direction) {
  await tile(page, id).focus();
  await page.keyboard.press('Arrow' + direction[0].toUpperCase() + direction.slice(1));
  await ready(page);
}
async function choose(page, index) {
  await page.locator('#level-button').click();
  await page.locator('#level-list button').nth(index).click();
  await page.waitForFunction(id => window.slideV05.state.levelId === id && !document.querySelector('#level-dialog').open,
    'slide-0' + (index + 1));
  await ready(page);
}
const storageKeys = (page, prefix) => page.evaluate(prefix => Object.fromEntries(
  Object.keys(localStorage).filter(key => key.startsWith(prefix)).sort().map(key => [key, localStorage.getItem(key)])), prefix);
async function main() {
  const browser = await chromium.launch({channel: 'msedge', headless: true});
  function observe(context) {
    context.on('page', page => page.on('pageerror', error => errors.push(error.stack || error.message)));
    context.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
  }
  try {
    const context = await browser.newContext({viewport: {width: 390, height: 844}});
    observe(context);
    const page = await context.newPage();
    await page.goto(base); await ready(page);
    const initial = await state(page);
    const cycleStart = Date.now();
    for (let index = 0; index < 300; index++) await key(page, 's1', index % 2 ? 'up' : 'down');
    timingsMs.threeHundredKeyboardMoves = Date.now() - cycleStart;
    const cycled = await state(page);
    assert.equal(cycled.successfulMoves, 300);
    assert.deepEqual(cycled.tiles, initial.tiles);
    assert.deepEqual(cycled.delivered, initial.delivered);
    assert.equal(await page.evaluate(() => window.slideV05.historyLength), 300);
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('tile-explorer.slide.v05.session.v1')).actions.length), 300);
    const restoreStart = Date.now();
    await page.reload(); await ready(page);
    timingsMs.restoreThreeHundredMoves = Date.now() - restoreStart;
    assert.deepEqual(await state(page), cycled);
    assert.equal(await page.evaluate(() => window.slideV05.historyLength), 300);
    checks.threeHundredCyclicMovesAndExactRestore = true;

    await key(page, 's1', 'right');
    await key(page, 's1', 'right');
    assert.equal((await state(page)).status, 'won');
    assert.equal((await state(page)).successfulMoves, 302);
    // Undo while the result is still travelling; its visuals cannot outlive the transaction.
    await page.keyboard.press('Control+z'); await ready(page);
    assert.equal((await state(page)).status, 'playing');
    assert.equal((await state(page)).successfulMoves, 301);
    assert.equal(await page.locator('.merge-result').count(), 0);
    assert.equal(await page.locator('.collecting').count(), 0);
    checks.undoCancelsCollectingAnimation = true;
    await key(page, 's1', 'right');
    const won = await state(page);
    await page.reload(); await ready(page);
    assert.deepEqual(await state(page), won);
    assert.equal(await page.evaluate(() => window.slideV05.historyLength), 302);
    const undoStart = Date.now();
    for (let index = 0; index < 302; index++) {
      await page.keyboard.press('Control+z'); await ready(page);
    }
    timingsMs.threeHundredTwoKeyboardUndos = Date.now() - undoStart;
    assert.deepEqual(await state(page), initial);
    assert.equal(await page.evaluate(() => window.slideV05.historyLength), 0);
    checks.winningSaveRestoresAllThreeHundredTwoUndos = true;

    // A pointer still held over the old board must not commit when a level changes.
    const oldBox = await tile(page, 's1').boundingBox();
    await page.mouse.move(oldBox.x + oldBox.width / 2, oldBox.y + oldBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(oldBox.x + oldBox.width / 2, oldBox.y + oldBox.height / 2 + 35);
    await page.locator('#level-button').focus(); await page.keyboard.press('Enter');
    await page.locator('#level-list button').nth(2).focus(); await page.keyboard.press('Enter');
    await page.waitForFunction(() => window.slideV05.state.levelId === 'slide-03');
    await ready(page);
    const third = await state(page);
    assert.equal(third.levelId, 'slide-03');
    await page.mouse.up(); await sleepFrame(page);
    assert.deepEqual(await state(page), third);
    assert.equal(await page.locator('.is-preview').count(), 0);
    await page.waitForTimeout(1900);
    assert.equal(await page.locator('.guide-ghost').count(), 0);
    checks.switchingLevelCancelsHeldPointerAndOldGuide = true;

    // Explicit help starts read-only async search. Switching away cancels that result.
    await page.locator('#help-button').click();
    await page.locator('#hint-button').click(); await ready(page);
    assert.deepEqual(await state(page), third);
    await choose(page, 0);
    await choose(page, 2);
    await page.waitForTimeout(1800);
    assert.equal(await page.locator('.guide-ghost').count(), 0);
    assert.equal((await state(page)).successfulMoves, 0);
    checks.asyncHintCannotLeakAcrossLevels = true;

    // A native background tab transition tests the actual document.hidden branch.
    const background = await context.newPage(); await background.goto('about:blank');
    await page.bringToFront();
    await key(page, 't1', 'down'); await key(page, 't2', 'right');
    const beforeBackground = await state(page);
    await background.bringToFront();
    let hidden = await page.evaluate(() => document.hidden);
    if (!hidden) {
      // Chromium's native lifecycle command is still a real browser transition.
      const cdp = await context.newCDPSession(page);
      await cdp.send('Page.setWebLifecycleState', {state: 'frozen'});
      await cdp.send('Page.setWebLifecycleState', {state: 'active'});
      await cdp.detach();
      hidden = await page.evaluate(() => document.hidden);
    }
    let restoreWindow = null;
    if (!hidden) {
      const cdp = await context.newCDPSession(page);
      try {
        const {windowId} = await cdp.send('Browser.getWindowForTarget');
        await cdp.send('Browser.setWindowBounds', {windowId, bounds: {windowState: 'minimized'}});
        await page.waitForTimeout(50);
        hidden = await page.evaluate(() => document.hidden);
        restoreWindow = async () => {
          await cdp.send('Browser.setWindowBounds', {windowId, bounds: {windowState: 'normal'}});
          await cdp.detach();
        };
      } catch (_) { await cdp.detach(); }
    }
    if (hidden) {
      assert.equal(await page.locator('.merge-result').count(), 0);
      assert.equal(await page.locator('.guide-ghost').count(), 0);
      checks.nativePageHiddenCancelsEffects = true;
    } else {
      limitations.push('Headless Edge kept document.hidden=false after tab/lifecycle changes; native hidden branch is not confirmed.');
      checks.nativePageHiddenCancelsEffects = 'unverified';
    }
    await restoreWindow?.();
    await page.bringToFront(); await ready(page);
    assert.deepEqual(await state(page), beforeBackground);
    await key(page, 'c1', 'down');
    assert.equal((await state(page)).successfulMoves, beforeBackground.successfulMoves + 1);
    checks.continuesAfterTabLifecycle = true;

    const isolated = await browser.newContext({viewport: {width: 390, height: 844}}); observe(isolated);
    const isolationPage = await isolated.newPage();
    await isolationPage.goto(new URL('merge-v03.html', base).href);
    await isolationPage.waitForFunction(() => window.mergeV04?.state);
    const oldState = await isolationPage.evaluate(() => window.mergeV04.state);
    const oldKeys = await storageKeys(isolationPage, 'tile-explorer.merge.v04.');
    assert.ok(Object.keys(oldKeys).length > 0);
    await isolationPage.goto(base); await ready(isolationPage);
    await key(isolationPage, 's1', 'right');
    const production = await state(isolationPage);
    const productionKeys = await storageKeys(isolationPage, 'tile-explorer.slide.v05.');
    assert.deepEqual(await storageKeys(isolationPage, 'tile-explorer.merge.v04.'), oldKeys);

    // Serve the same build through a preview pathname without changing the app or its state.
    const previewPrefix = '/v05-preview';
    await isolated.route('**/v05-preview/**', async route => {
      const source = new URL(route.request().url());
      source.pathname = source.pathname.slice(previewPrefix.length);
      const response = await route.fetch({url: source.href});
      await route.fulfill({response});
    });
    const previewURL = new URL(base); previewURL.pathname = previewPrefix + previewURL.pathname;
    await isolationPage.goto(previewURL.href); await ready(isolationPage);
    assert.equal(await isolationPage.evaluate(() => window.slideV05.storagePrefix), 'tile-explorer.slide.v05.preview.');
    assert.equal((await state(isolationPage)).successfulMoves, 0);
    await key(isolationPage, 's1', 'down');
    const preview = await state(isolationPage);
    assert.equal(preview.successfulMoves, 1);
    for (const [name, value] of Object.entries(productionKeys))
      assert.equal(await isolationPage.evaluate(name => localStorage.getItem(name), name), value);
    await isolationPage.reload(); await ready(isolationPage); assert.deepEqual(await state(isolationPage), preview);
    await isolationPage.goto(base); await ready(isolationPage); assert.deepEqual(await state(isolationPage), production);
    await isolationPage.goto(new URL('merge-v03.html', base).href);
    await isolationPage.waitForFunction(() => window.mergeV04?.state);
    assert.deepEqual(await isolationPage.evaluate(() => window.mergeV04.state), oldState);
    checks.oldProductionAndPreviewSessionIsolation = true;

    assert.equal(errors.length, 0, errors.join('\n'));
    await page.screenshot({path: path.join(output, 'recovered-third.png'), fullPage: true});
    const report = {date: new Date().toISOString(), base, version: '0.5.0', browser: await browser.version(),
      input: 'real keyboard/pointer; read-only inspection; no session.apply or state mutation',
      checks, timingsMs, errors, limitations};
    fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report, null, 2));
  } catch (error) {
    for (const [i, context] of browser.contexts().entries())
      for (const [j, page] of context.pages().entries())
        await page.screenshot({path: path.join(output, 'failure-' + i + '-' + j + '.png'), fullPage: true}).catch(() => {});
    throw error;
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
