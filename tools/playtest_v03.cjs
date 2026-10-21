/* Optional real-browser QA. PLAYWRIGHT_MODULE may point to an existing installation. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.V03_URL || 'http://127.0.0.1:8766/merge-v03.html';
const output = path.resolve(process.env.V03_QA_OUTPUT || '.qa/v03');
fs.mkdirSync(output, {recursive: true});
const errors = [], requests = [];
const interaction = {releaseToReadyMs: [], continuedDuringFX: false, stableNodes: false,
  releasePointResampled: false, mobileSnapOffsetCss: 0, returnPreview: false};
async function main() {
  const browser = await chromium.launch({headless: true, channel: 'msedge'});
  try {
    const observeRequests = context => {
      context.on('requestfailed', request => errors.push(request.url() + ': ' + request.failure()?.errorText));
      context.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
      context.on('request', request => requests.push(request.url()));
    };
    const context = await browser.newContext({viewport: {width: 1280, height: 1000}});
    observeRequests(context);
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    const ready = p => p.waitForFunction(() => window.mergeV03 && !window.mergeV03.busy);
    const state = p => p.evaluate(() => window.mergeV03.state);
    const shot = async (p, name) => {
      await p.waitForFunction(() => !window.mergeV03?.animating && !document.querySelector('.drag-ghost'));
      return p.screenshot({path: path.join(output, name + '.png'), fullPage: true});
    };
    const box = (p, id) => p.locator(id === '__nest__' ? '.nest-target' : '[data-tile-id="' + id + '"]').boundingBox();
    async function drag(p, source, target, touch, wait = true) {
      const a = await box(p, source), b = typeof target === 'string' ? await box(p, target) : target;
      assert.ok(a && b, 'drag tiles exist');
      const start = {x: a.x + a.width / 2, y: a.y + a.height / 2};
      const end = {x: b.x + (b.width || 0) / 2, y: b.y + (b.height || 0) / 2};
      if (touch) {
        const cdp = await p.context().newCDPSession(p);
        const point = (x, y) => [{x, y, id: 1, radiusX: 4, radiusY: 4, force: 1}];
        await cdp.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: point(start.x, start.y)});
        for (let i = 1; i <= 10; i++) {
          await cdp.send('Input.dispatchTouchEvent', {type: 'touchMove',
            touchPoints: point(start.x + (end.x - start.x) * i / 10, start.y + (end.y - start.y) * i / 10)});
          await p.waitForTimeout(16);
        }
        await cdp.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
        // Raw CDP touchEnd is acknowledged before Chromium ends gesture-click
        // suppression. Also reproduced on a plain two-button page.
        await p.waitForTimeout(1000);
        await cdp.detach();
      } else {
        await p.mouse.move(start.x, start.y); await p.mouse.down();
        await p.mouse.move(end.x, end.y, {steps: 12}); await p.mouse.up();
      }
      if (wait) await ready(p);
    }
    await ready(page);
    await page.locator('.animal-tile img').first().waitFor();
    assert.equal(await page.evaluate(() => [...document.images].every(i => i.complete && i.naturalWidth > 0)), true);
    await shot(page, '01-desktop');
    // Click and a free drop cannot unlock the lower cards.
    await page.locator('[data-tile-id="u1"]').click();
    assert.equal((await state(page)).successfulMoves, 0);
    const board = await page.locator('#merge-board').boundingBox();
    await page.evaluate(() => {
      document.addEventListener('pointerup', () => {
        window.qaReturnGhost = document.querySelector('.drag-ghost');
        window.qaReturnWasAnimating = Boolean(window.qaReturnGhost?.getAnimations().some(animation =>
          animation.playState === 'running' || animation.pending));
      }, {once: true});
    });
    await drag(page, 'u1', {x: board.x + 8, y: board.y + 8});
    assert.equal((await state(page)).successfulMoves, 0);
    assert.equal(await page.evaluate(() => window.qaReturnWasAnimating), true, 'Invalid drop animates home');
    interaction.returnPreview = true;
    // The next gesture interrupts the return immediately. Its release point may
    // differ from the last pointermove sample (native mouseReleased coordinates).
    const releaseSource = await box(page, 'u1'), releaseTarget = await box(page, 'l1');
    await page.mouse.move(releaseSource.x + releaseSource.width / 2, releaseSource.y + releaseSource.height / 2);
    await page.mouse.down();
    assert.equal(await page.evaluate(() => !window.qaReturnGhost.isConnected), true);
    await page.mouse.move(board.x + 15, board.y + 15, {steps: 3});
    const releaseSession = await page.context().newCDPSession(page);
    await releaseSession.send('Input.dispatchMouseEvent', {type: 'mouseReleased', button: 'left', buttons: 0,
      x: releaseTarget.x + releaseTarget.width / 2, y: releaseTarget.y + releaseTarget.height / 2, clickCount: 1});
    await releaseSession.detach();
    // Reset Playwright's mouse bookkeeping after the deliberately raw release.
    // This duplicate physical end must not submit a second action.
    await page.mouse.up();
    await ready(page);
    assert.equal((await state(page)).status, 'won', 'Release coordinates determine the submitted endpoint');
    interaction.releasePointResampled = true;
    await page.locator('#undo-button').click();
    assert.equal((await state(page)).successfulMoves, 0);
    await drag(page, 'u1', {x: board.x + 8, y: board.y + 8}, false, false);
    await page.setViewportSize({width: 1279, height: 1000});
    await page.waitForFunction(() => !document.querySelector('.drag-ghost'));
    assert.equal((await state(page)).successfulMoves, 0);
    await page.setViewportSize({width: 1280, height: 1000});
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    // Undo and restart remain usable while the presentation is in flight.
    await drag(page, 'u1', 'l1', false, false);
    assert.equal((await state(page)).delivered.golden, 1);
    await page.locator('#undo-button').click();
    assert.equal((await state(page)).successfulMoves, 0);
    await drag(page, 'u1', 'l1', false, false);
    await page.locator('#restart-button').click();
    assert.equal((await state(page)).successfulMoves, 0);
    assert.equal(await page.locator('.delivery-actor').count(), 0);
    // Resizing mid-drag cancels the preview without committing a move.
    const startBox = await box(page, 'u1');
    await page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2);
    await page.mouse.down(); await page.mouse.move(startBox.x + 90, startBox.y + 75);
    await page.setViewportSize({width: 1100, height: 1000});
    await page.waitForFunction(() => !document.querySelector('.drag-ghost'));
    assert.equal(await page.locator('[data-tile-id="u1"]').evaluate(node => node.classList.contains('lifted')), false);
    await page.mouse.up();
    assert.equal((await state(page)).successfulMoves, 0);
    await page.setViewportSize({width: 1280, height: 1000});
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await drag(page, 'u1', 'l1');
    assert.equal((await state(page)).status, 'won');
    await page.reload(); await ready(page);
    assert.equal((await state(page)).status, 'won');
    await page.locator('#undo-button').click();
    assert.equal((await state(page)).tiles.length, 2);
    await drag(page, 'u1', 'l1');
    await page.locator('#next-button').click();
    await ready(page);
    const secondInitial = await state(page);
    // An intervening upper tile blocks the drop.
    await drag(page, 'u1', 'l1');
    assert.equal((await state(page)).successfulMoves, 0);
    await page.waitForFunction(() => !document.querySelector('.drag-ghost'));
    // A normal transaction reuses actors, and the next input is accepted as
    // soon as the committed layout is ready, while the old FX is still active.
    await page.evaluate(() => {
      window.qaStable = {
        source: document.querySelector('[data-tile-id="u1"]'),
        next: document.querySelector('[data-tile-id="u2"]'),
        lower: document.querySelector('[data-tile-id="l1"]'),
        goal: document.querySelector('[data-slot="0"]'),
        nest: document.querySelector('.nest-target')
      };
      window.qaReadyMeasure = null;
      document.addEventListener('pointerup', () => {
        const released = performance.now();
        const poll = () => {
          if (window.mergeV03.busy) requestAnimationFrame(poll);
          else window.qaReadyMeasure = {ms: performance.now() - released, animating: mergeV03.animating};
        };
        requestAnimationFrame(poll);
      }, {once: true});
    });
    await drag(page, 'u1', '__nest__');
    await page.waitForFunction(() => window.qaReadyMeasure);
    const measured = await page.evaluate(() => window.qaReadyMeasure);
    interaction.releaseToReadyMs.push(Number(measured.ms.toFixed(2)));
    assert.equal(measured.animating, true, 'Input unlocks before the presentation ends');
    assert.equal(await page.evaluate(() =>
      qaStable.source === document.querySelector('[data-tile-id="u1"]') &&
      qaStable.next === document.querySelector('[data-tile-id="u2"]') &&
      qaStable.lower === document.querySelector('[data-tile-id="l1"]') &&
      qaStable.goal === document.querySelector('[data-slot="0"]') &&
      qaStable.nest === document.querySelector('.nest-target')), true, 'Move reconciles existing DOM nodes');
    interaction.stableNodes = true;
    await page.evaluate(() => {
      document.addEventListener('pointerdown', () => {
        window.qaNextStartedDuringFX = mergeV03.animating && !mergeV03.busy;
      }, {capture: true, once: true});
    });
    const nextSource = await box(page, 'u2'), nextTarget = await box(page, 'l0');
    await page.mouse.move(nextSource.x + nextSource.width / 2, nextSource.y + nextSource.height / 2);
    await page.mouse.down();
    assert.equal(await page.evaluate(() => window.qaNextStartedDuringFX), true);
    await page.mouse.move(nextTarget.x + nextTarget.width / 2, nextTarget.y + nextTarget.height / 2, {steps: 3});
    // Old presentation promises must not render over this newer held gesture.
    await page.waitForTimeout(420);
    assert.equal(await page.evaluate(() => Boolean(document.querySelector('.drag-ghost')) &&
      qaStable.next === document.querySelector('[data-tile-id="u2"]') &&
      qaStable.next.classList.contains('lifted')), true);
    await page.mouse.up(); await ready(page);
    assert.equal((await state(page)).successfulMoves, 2, 'Fast next gesture was not swallowed');
    assert.equal((await state(page)).delivered.golden, 1);
    interaction.continuedDuringFX = true;
    await drag(page, 'u1', 'l1');
    assert.equal((await state(page)).status, 'won');
    await page.locator('#restart-button').click(); await ready(page);
    await drag(page, 'u1', '__nest__');
    assert.equal((await state(page)).nestId, 'u1');
    await page.locator('#undo-button').click();
    assert.equal((await state(page)).nestId, null);
    await drag(page, 'u1', '__nest__');
    const afterFirst = await state(page);
    await page.reload(); await ready(page);
    assert.deepEqual(await state(page), afterFirst);
    await drag(page, 'u2', '__nest__');
    assert.equal((await state(page)).successfulMoves, 1, 'Full nest refuses a second puppy');
    await drag(page, 'u2', 'l0');
    await drag(page, 'u1', 'l1');
    assert.equal((await state(page)).status, 'won');
    for (let i = 0; i < 3; i++) { await page.locator('#undo-button').click(); await ready(page); }
    assert.deepEqual(await state(page), secondInitial, 'The full parked-puppy sequence undoes to its initial state');
    await drag(page, 'u1', '__nest__'); await drag(page, 'u2', 'l0'); await drag(page, 'u1', 'l1');
    assert.equal((await state(page)).status, 'won');
    await page.locator('#next-button').click(); await ready(page);
    await shot(page, '03-desktop');
    await drag(page, 'u1', 'l0'); await drag(page, 'u4', 'l1');
    assert.equal((await state(page)).status, 'playing');
    assert.equal(await page.evaluate(() => TileMergeV03.engine.listMergeMoves(mergeV03.state).length), 0);
    assert.ok((await page.locator('#message').textContent()).includes('临时窝'));
    await shot(page, '03-loop');
    await drag(page, 'u2', '__nest__');
    assert.equal((await state(page)).nestId, 'u2');
    await shot(page, '03-borrow');
    await drag(page, 'u3', 'l2');
    await drag(page, 'u2', 'l3');
    assert.equal((await state(page)).status, 'won');
    assert.equal((await state(page)).successfulMoves, 5, 'Loop resolves without undo/restart');
    await shot(page, '03-recovered');
    await page.locator('#restart-button').click(); await ready(page);
    for (const [source, target] of [['u2', 'l0'], ['u3', 'l2'], ['u1', 'l3'], ['u4', 'l1']])
      await drag(page, source, target);
    assert.equal((await state(page)).status, 'won'); await shot(page, '03-completed');
    // Resize and narrow-layout measurements are taken with actual initial lesson 3.
    for (const [width, height] of [[320, 568], [360, 780], [390, 844], [768, 1024]]) {
      await page.setViewportSize({width, height}); await page.locator('#restart-button').click(); await ready(page);
      const layout = await page.evaluate(() => ({width: innerWidth, scroll: document.documentElement.scrollWidth,
        tile: document.querySelector('.animal-tile').getBoundingClientRect().width,
        goal: document.querySelector('.goal-tray').getBoundingClientRect().bottom,
        board: document.querySelector('#merge-board').getBoundingClientRect().bottom}));
      assert.ok(layout.scroll <= width, JSON.stringify(layout)); assert.ok(layout.tile >= 56, JSON.stringify(layout));
      assert.ok(layout.goal < height && layout.board < height, JSON.stringify(layout));
      if (width === 320) {
        const near = await box(page, 'l0');
        await drag(page, 'u2', {x: near.x + near.width / 2 - 18, y: near.y + near.height / 2});
        const snapped = await state(page);
        assert.equal(snapped.delivered.golden, 1);
        assert.equal(snapped.tiles.some(tile => tile.id === 'l0'), false);
        assert.equal(snapped.tiles.some(tile => tile.id === 'l1'), true, 'Nearby neighbor was not chosen');
        interaction.mobileSnapOffsetCss = 18;
        await page.locator('#restart-button').click(); await ready(page);
      }
      await shot(page, '03-' + width);
    }
    // Real touch events in a Chromium mobile emulation, with reduced motion and muted audio.
    const mobile = await browser.newContext({viewport: {width: 390, height: 844}, hasTouch: true, isMobile: true,
      deviceScaleFactor: 2, reducedMotion: 'reduce'});
    observeRequests(mobile);
    const phone = await mobile.newPage(); phone.on('pageerror', e => errors.push(e.message));
    await phone.goto(base); await ready(phone); await phone.locator('#sound-button').tap();
    await phone.waitForFunction(() => document.querySelector('#sound-button').getAttribute('aria-pressed') === 'false');
    await drag(phone, 'u1', 'l1', true); assert.equal((await state(phone)).status, 'won');
    await shot(phone, '01-touch-won');
    await phone.locator('#next-button').tap();
    await phone.waitForFunction(() => mergeV03.state.levelId === 'merge-02');
    await ready(phone);
    await shot(phone, '02-touch-start');
    assert.equal((await state(phone)).levelId, 'merge-02');
    await drag(phone, 'u1', '__nest__', true);
    await drag(phone, 'u2', 'l0', true); await drag(phone, 'u1', 'l1', true);
    assert.equal((await state(phone)).status, 'won');
    await shot(phone, '02-touch-won');
    await phone.locator('#next-button').tap();
    await phone.waitForFunction(() => mergeV03.state.levelId === 'merge-03');
    await ready(phone);
    await shot(phone, '03-touch');
    for (const [s, t] of [['u1', 'l0'], ['u4', 'l1'], ['u2', '__nest__'], ['u3', 'l2'], ['u2', 'l3']])
      await drag(phone, s, t, true);
    assert.equal((await state(phone)).status, 'won');
    const legacyContext = await browser.newContext({viewport: {width: 390, height: 844}});
    observeRequests(legacyContext);
    await legacyContext.addInitScript(() => {
      const key = 'tile-explorer.merge.v03.session.v1';
      if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({
        levelId: 'merge-03', ruleset: 'merge-v03-1', definitionHash: '2578f2fc',
        moves: [{sourceId: 'u1', targetId: 'l0'}, {sourceId: 'u4', targetId: 'l1'}]
      }));
    });
    const migrated = await legacyContext.newPage(); migrated.on('pageerror', e => errors.push(e.message));
    await migrated.goto(base); await ready(migrated);
    assert.equal((await state(migrated)).tiles.length, 4);
    assert.equal((await state(migrated)).delivered.golden, 2);
    assert.equal((await state(migrated)).nestId, null);
    await shot(migrated, '03-migrated-loop');
    await drag(migrated, 'u2', '__nest__');
    await migrated.reload(); await ready(migrated);
    assert.equal((await state(migrated)).nestId, 'u2');
    await drag(migrated, 'u3', 'l2'); await drag(migrated, 'u2', 'l3');
    assert.equal((await state(migrated)).status, 'won');
    // Storage denial and unavailable audio must not block a keyboard completion.
    const fallbackContext = await browser.newContext({viewport: {width: 390, height: 844}});
    observeRequests(fallbackContext);
    await fallbackContext.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {get() { throw new Error('Storage denied'); }});
      window.AudioContext = undefined; window.webkitAudioContext = undefined;
    });
    const fallback = await fallbackContext.newPage();
    fallback.on('pageerror', e => errors.push(e.message));
    await fallback.goto(base); await ready(fallback);
    await fallback.locator('[data-tile-id="u1"]').focus(); await fallback.keyboard.press('Enter');
    await fallback.locator('#nest-pad').focus(); await fallback.keyboard.press('Enter');
    await ready(fallback);
    assert.equal((await state(fallback)).nestId, 'u1');
    assert.equal(await fallback.locator('.drag-guide').count(), 0);
    assert.equal(await fallback.evaluate(() => document.activeElement.dataset.tileId), 'u1');
    await fallback.locator('[data-tile-id="u1"]').focus(); await fallback.keyboard.press('Enter');
    await fallback.locator('[data-tile-id="l1"]').focus(); await fallback.keyboard.press('Enter');
    await ready(fallback); assert.equal((await state(fallback)).status, 'won');
    assert.equal(await fallback.evaluate(() => document.activeElement.id), 'next-button');
    assert.equal(await fallback.locator('#save-note').isVisible(), true);
    await fallback.keyboard.press('Enter'); await ready(fallback);
    assert.equal((await state(fallback)).levelId, 'merge-02');
    await fallback.locator('[data-tile-id="u1"]').focus(); await fallback.keyboard.press('Enter');
    await fallback.locator('#nest-pad').focus(); await fallback.keyboard.press('Enter');
    await ready(fallback);
    assert.equal(await fallback.evaluate(() => document.activeElement.dataset.tileId), 'u2',
      'After parking, keyboard focus follows the next legal source');
    // Original mode still boots and accepts a regular tile pick.
    if (!process.env.V03_STATIC) {
      await page.setViewportSize({width: 390, height: 844});
      await page.goto(new URL('/', base).href);
      await page.locator('.tile:not(.blocked)').first().waitFor();
      await page.locator('.tile:not(.blocked)').first().click();
      await page.waitForFunction(() => document.querySelectorAll('.tray-actor:not(.tray-ghost)').length === 1);
      assert.equal(await page.locator('a[href="./merge-v03.html"]').count(), 1);
      assert.equal(await page.locator('a[href="./merge-v03.html"]').isVisible(), true);
    }
    assert.equal(errors.length, 0, errors.join('\n'));
    assert.ok(requests.every(url => new URL(url).origin === new URL(base).origin), 'No remote requests');
    if (process.env.V03_STATIC) assert.ok(!requests.some(url => url.includes('/api/')), 'No backend requests');
    const report = {base, ruleset: 'merge-v03-2', browser: await browser.version(),
      desktop: '3 lessons, screenshot loop recovered on board without undo, single-nest capacity',
      viewports: ['320x568', '360x780', '390x844', '768x1024', '1280x1000'],
      touch: 'Chromium emulation, all 3 lessons; reduced motion + mute',
      lifecycle: 'undo/restart during FX, resize during drag, restored parked-puppy history',
      migration: 'old third-level four-card loop retained and solved after reload',
      fallback: 'localStorage denied + AudioContext unavailable + keyboard completion',
      interaction,
      errors, requests: [...new Set(requests)]};
    fs.writeFileSync(path.join(output, process.env.V03_STATIC ? 'static-report.json' : 'browser-report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } catch (error) {
    if (errors.length) console.error('Browser errors:', errors);
    for (const [index, context] of browser.contexts().entries()) for (const [pageIndex, p] of context.pages().entries()) {
      await p.screenshot({path: path.join(output, 'failure-' + index + '-' + pageIndex + '.png'), fullPage: true}).catch(() => {});
      console.error(await p.evaluate(() => ({url: location.href, level: window.mergeV03?.state.levelId,
        status: window.mergeV03?.state.status,
        returnGhost: Boolean(window.qaReturnGhost), returnMotion: window.qaReturnWasAnimating,
        reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
        message: document.querySelector('#message')?.textContent})).catch(() => ({})));
    }
    throw error;
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
