/* v0.5 browser QA: only real mouse, native touch and keyboard commit game actions. */
'use strict';
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.V05_URL || 'http://127.0.0.1:8775/slide-v05.html';
const output = path.resolve(process.env.V05_QA_OUTPUT || '.qa/v05');
fs.mkdirSync(output, {recursive: true});
const checks = {}, errors = [], requests = new Set();
const ready = page => page.waitForFunction(() => window.slideV05?.state && !window.slideV05.busy, null, {timeout: 15000});
const state = page => page.evaluate(() => window.slideV05.state);
const node = (page, id) => page.locator('[data-tile-id="' + id + '"]');
const delta = {right: [1,0], left: [-1,0], up: [0,-1], down: [0,1]};
async function swipe(page, id, direction, {touch = false, distance = 65, releaseOnly = false, reverse = false} = {}) {
  await node(page,id).scrollIntoViewIfNeeded();
  const box = await node(page,id).boundingBox(); assert.ok(box, id);
  const from = {x:box.x+box.width/2, y:box.y+box.height/2};
  const [dx,dy] = delta[direction], to = {x:from.x+dx*distance, y:from.y+dy*distance};
  if (touch) {
    const cdp = await page.context().newCDPSession(page);
    const points = p => [{x:p.x,y:p.y,id:1,radiusX:4,radiusY:4,force:1}];
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points(from)});
    for(let i=1;i<=5;i++) await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:points({x:from.x+(to.x-from.x)*i/5,y:from.y+(to.y-from.y)*i/5})});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    await cdp.detach();
  } else {
    await page.mouse.move(from.x,from.y); await page.mouse.down();
    if (releaseOnly) {
      const cdp=await page.context().newCDPSession(page);
      await cdp.send('Input.dispatchMouseEvent',{type:'mouseReleased',x:to.x,y:to.y,button:'left',clickCount:1});
      await cdp.detach();
    } else {
      await page.mouse.move(to.x,to.y,{steps:5});
      if (reverse) await page.mouse.move(from.x,from.y,{steps:4});
      await page.mouse.up();
    }
  }
  await ready(page);
}
async function choose(page,index) {
  await page.locator('#level-button').click();
  await page.locator('#level-list button').nth(index).click();
  await page.waitForFunction(id=>window.slideV05?.state?.levelId===id&&!document.querySelector('#level-dialog').open,'slide-0'+(index+1));
  await ready(page);
}
async function keyboard(page,id,direction) {
  await node(page,id).focus();
  await page.keyboard.press('Arrow'+direction[0].toUpperCase()+direction.slice(1)); await ready(page);
}
async function shot(page,name) { await page.waitForTimeout(450); await page.screenshot({path:path.join(output,name+'.png'),fullPage:true}); }
async function route(page,moves,options) { for(const [id,direction] of moves) await swipe(page,id,direction,options); }
async function main() {
  const browser=await chromium.launch({channel:'msedge',headless:true});
  function observe(context) {
    context.on('page',page=>page.on('pageerror',e=>errors.push(e.stack||e.message)));
    context.on('request',request=>requests.add(request.url()));
    context.on('response',response=>{if(response.status()>=400)errors.push(response.status()+' '+response.url());});
  }
  try {
    const context=await browser.newContext({viewport:{width:1440,height:900}}); observe(context);
    const page=await context.newPage(); await page.goto(base); await ready(page);
    assert.match(await page.title(),/滑出新花样/);
    await page.waitForFunction(()=>[...document.images].every(image=>image.complete&&image.naturalWidth>0));
    await page.locator('#settings-button').click();await page.locator('#motion-toggle').check();
    await page.waitForTimeout(4400);assert.equal(await page.locator('.guide-ghost').count(),0);
    await page.locator('#motion-toggle').uncheck();await page.locator('#settings-dialog [data-close-dialog]').click();await ready(page);
    await page.locator('.guide-ghost').waitFor({state:'visible',timeout:6000});await shot(page,'01-guide');checks.dialogPausesAndResumesGuide=true;
    await shot(page,'01-desktop');
    const initial=await state(page);
    await swipe(page,'s1','right',{reverse:true}); assert.deepEqual(await state(page),initial); checks.reverseCancels=true;
    const firstBox=await node(page,'s1').boundingBox();
    await page.mouse.move(firstBox.x+firstBox.width/2,firstBox.y+firstBox.height/2);await page.mouse.down();
    await page.mouse.move(firstBox.x+firstBox.width/2+45,firstBox.y+firstBox.height/2,{steps:4});
    await page.waitForFunction(()=>document.querySelectorAll('.preview-route').length===2);
    await shot(page,'01-full-path');await page.mouse.move(firstBox.x+firstBox.width/2,firstBox.y+firstBox.height/2);await page.mouse.up();
    assert.deepEqual(await state(page),initial);checks.fullPathAndEndpointPreview=true;
    await swipe(page,'s1','right',{distance:30,releaseOnly:true});
    const short=await state(page);assert.equal(short.status,'won');assert.equal(short.successfulMoves,1);
    assert.equal(await page.evaluate(()=>window.slideV05.lastEvents[0].distance),2);checks.shortSwipeGlidesAcrossGap=true;checks.releaseResampled=true;
    await page.locator('#undo-button').click();await ready(page);assert.deepEqual(await state(page),initial);checks.undoWholeTransaction=true;
    await swipe(page,'s1','right',{distance:220});assert.deepEqual(await state(page),short);checks.shortAndLongShareEndpoint=true;
    await page.locator('#next-button').click();await ready(page);
    const second=await state(page);
    await swipe(page,'s1','right');assert.deepEqual(await state(page),second); checks.otherItemBlocks=true;
    await swipe(page,'s1','left');assert.deepEqual(await state(page),second); checks.boundaryBlocks=true;
    await page.evaluate(()=>{window.qaGoal=document.querySelector('[data-result-id="sports-car"]');window.qaTile=document.querySelector('[data-tile-id="c2"]');});
    await swipe(page,'c1','down');
    assert.equal((await state(page)).tiles.length,4);checks.adjacencyDoesNotMerge=true;
    assert.equal(await page.evaluate(()=>window.qaGoal===document.querySelector('[data-result-id="sports-car"]')&&window.qaTile===document.querySelector('[data-tile-id="c2"]')),true);checks.stableNodes=true;
    const partial=await state(page);await page.reload();await ready(page);assert.deepEqual(await state(page),partial);checks.refreshRestores=true;
    await route(page,[['c2','right'],['s1','right']]);assert.equal((await state(page)).status,'won');checks.alternativeSecondRoute=true;
    await choose(page,2);await shot(page,'03-desktop');
    await swipe(page,'t1','right');await swipe(page,'c2','right');
    const thirdPartial=await state(page);await page.reload();await ready(page);assert.deepEqual(await state(page),thirdPartial);
    await route(page,[['c1','down'],['s1','right'],['t1','down'],['t1','left']]);
    assert.equal((await state(page)).status,'won');assert.equal((await state(page)).successfulMoves,6);checks.sixGlideAlternative=true;
    for(let i=0;i<6;i++){await page.locator('#undo-button').click();await ready(page);}assert.equal((await state(page)).successfulMoves,0);checks.fullThirdUndo=true;
    await page.locator('#help-button').click();const helpState=await state(page);await page.locator('#hint-button').click();await ready(page);await page.locator('.guide-ghost').waitFor({state:'visible',timeout:5000});assert.deepEqual(await state(page),helpState);checks.hintReadOnly=true;
    for(const [width,height] of [[320,568],[375,667],[390,844],[768,1024],[1440,900]]) {
      await page.setViewportSize({width,height});await ready(page);await shot(page,'03-'+width);
      const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,
        tiles:[...document.querySelectorAll('[data-tile-id]')].map(n=>n.getBoundingClientRect().width),
        board:(()=>{const b=document.querySelector('#board').getBoundingClientRect();return {x:b.x,right:b.right}})()}));
      assert.equal(metrics.overflow,false,JSON.stringify(metrics));assert.ok(Math.min(...metrics.tiles)>=56,JSON.stringify(metrics));assert.ok(metrics.board.x>=0&&metrics.board.right<=width,JSON.stringify(metrics));
    } checks.fiveViewports=true;
    await page.locator('#settings-button').click();await page.locator('#sound-toggle').uncheck();await page.locator('#motion-toggle').check();await page.locator('#settings-dialog [data-close-dialog]').click();await ready(page);
    await page.reload();await ready(page);assert.equal(await page.evaluate(()=>window.slideV05.reducedMotion),true);
    await page.locator('#settings-button').click();assert.equal(await page.locator('#sound-toggle').isChecked(),false);await page.locator('#settings-dialog [data-close-dialog]').click();checks.settingsPersist=true;
    const mobileContext=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:2});observe(mobileContext);
    const mobile=await mobileContext.newPage();await mobile.goto(base);await ready(mobile);await shot(mobile,'01-mobile');
    await route(mobile,[['s1','right']],{touch:true,distance:30});assert.equal((await state(mobile)).status,'won');
    await mobile.waitForTimeout(350);await mobile.locator('#next-button').click();await ready(mobile);
    await route(mobile,[['c1','down'],['s1','right'],['c2','right']],{touch:true});assert.equal((await state(mobile)).status,'won');
    await mobile.waitForTimeout(350);await mobile.locator('#next-button').click();await ready(mobile);
    await shot(mobile,'03-mobile');
    await route(mobile,[['t1','down'],['c1','down'],['s1','right'],['c1','left'],['t1','left']],{touch:true});assert.equal((await state(mobile)).status,'won');checks.nativeTouchAllThree=true;
    const fallbackContext=await browser.newContext({viewport:{width:390,height:844}});observe(fallbackContext);
    await fallbackContext.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw Error('denied');}});window.AudioContext=undefined;window.webkitAudioContext=undefined;});
    const fallback=await fallbackContext.newPage();await fallback.goto(base);await ready(fallback);
    await keyboard(fallback,'s1','right');assert.equal((await state(fallback)).status,'won');assert.equal(await fallback.locator('#save-note').isVisible(),true);checks.storageAudioFallbackKeyboard=true;
    const legacyContext=await browser.newContext();observe(legacyContext);
    await legacyContext.addInitScript(()=>{if(!location.protocol.startsWith('http'))return;localStorage.setItem('tile-explorer.merge.v04.session.v1','{"levelId":"merge-03"}');const scope=location.pathname.includes('preview')?'preview.':'';localStorage.setItem('tile-explorer.merge.v04.'+scope+'settings.v1','{"soundEnabled":false,"reduceMotion":true}');});
    const legacy=await legacyContext.newPage();await legacy.goto(base);await ready(legacy);
    assert.equal((await state(legacy)).levelId,'slide-01');assert.equal(await legacy.evaluate(()=>window.slideV05.reducedMotion),true);
    assert.equal(await legacy.evaluate(()=>JSON.parse(localStorage.getItem('tile-explorer.merge.v04.session.v1')).levelId),'merge-03');checks.legacyIsolated=true;
    const priorContext=await browser.newContext();observe(priorContext);
    await priorContext.addInitScript(()=>{if(!location.protocol.startsWith('http'))return;const prefix='tile-explorer.slide.v05.'+(location.pathname.includes('preview')?'preview.':'');localStorage.setItem(prefix+'settings.v1',JSON.stringify({soundEnabled:false,reducedMotion:true}));localStorage.setItem(prefix+'session.v1',JSON.stringify({schemaVersion:1,ruleset:'slide-v05-1',definitionHash:'da845a3b',levelId:'slide-01',actions:[{type:'slide',tileId:'s1',direction:'right'}]}));});
    const prior=await priorContext.newPage();await prior.goto(base);await ready(prior);
    assert.equal((await state(prior)).successfulMoves,0);assert.equal(await prior.evaluate(()=>window.slideV05.ruleset),'slide-v05-2');
    assert.equal(await prior.evaluate(()=>window.slideV05.historyLength),0);assert.equal(await prior.evaluate(()=>window.slideV05.reducedMotion),true);
    await keyboard(prior,'s1','right');assert.equal((await state(prior)).status,'won');checks.oneCellSaveRestartsWithPreferences=true;
    if(process.env.V05_STATIC!=='1') {
      await page.goto(new URL('merge-v03.html',base).href);await page.waitForFunction(()=>window.mergeV04?.state);
      assert.equal((await page.evaluate(()=>window.mergeV04.state)).levelId,'merge-01');checks.oldMergeLoads=true;
      await page.goto(new URL('/',base).href);await page.locator('.tile:not(.blocked)').first().click();await page.waitForFunction(()=>document.querySelectorAll('.tray-actor:not(.tray-ghost)').length===1);checks.classicLoads=true;
    }
    assert.equal(errors.length,0,errors.join('\n'));
    assert.ok([...requests].every(url=>new URL(url).origin===new URL(base).origin));
    if(process.env.V05_STATIC==='1')assert.ok(![...requests].some(url=>url.includes('/api/')));
    const report={date:new Date().toISOString(),base,version:'0.5.0',ruleset:'slide-v05-2',browser:await browser.version(),
      viewports:['320x568','375x667','390x844','768x1024','1440x900'],checks,errors,requests:[...requests]};
    fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
  } catch(error) {
    for(const [i,context] of browser.contexts().entries())for(const [j,page]of context.pages().entries())await page.screenshot({path:path.join(output,'failure-'+i+'-'+j+'.png'),fullPage:true}).catch(()=>{});
    throw error;
  } finally {await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
