/* Real input QA for v0.4; works on local rules server, static preview and public release. */
'use strict';
const assert=require('node:assert/strict'), fs=require('node:fs'), path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.V04_URL||'http://127.0.0.1:8768/merge-v03.html';
const output=path.resolve(process.env.V04_QA_OUTPUT||'.qa/v04');fs.mkdirSync(output,{recursive:true});
const errors=[],requests=[],checks={};
async function main(){
  const browser=await chromium.launch({headless:true,channel:'msedge'});
  function observe(context){
    context.on('page',p=>p.on('pageerror',e=>errors.push(e.stack||e.message)));
    context.on('request',r=>requests.push(r.url()));
    context.on('requestfailed',r=>errors.push(r.url()+': '+r.failure()?.errorText));
    context.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
  }
  const ready=p=>p.waitForFunction(()=>window.mergeV04&&!window.mergeV04.busy,{},{timeout:10000});
  const state=p=>p.evaluate(()=>window.mergeV04.state);
  const box=(p,id)=>p.locator(id==='__parking__'?'.parking-target':'[data-tile-id="'+id+'"]').boundingBox();
  const shot=async(p,name)=>{await p.waitForFunction(()=>!window.mergeV04.animating&&!document.querySelector('.drag-ghost'));await p.screenshot({path:path.join(output,name+'.png'),fullPage:true})};
  async function drag(p,source,target,{touch=false,offset=0,releaseOnly=false}={}){
    const a=await box(p,source),b=typeof target==='string'?await box(p,target):target;
    assert.ok(a&&b,'Source and target exist');
    const start={x:a.x+a.width/2,y:a.y+a.height/2},end={x:b.x+(b.width||0)/2+offset,y:b.y+(b.height||0)/2};
    if(touch){
      const cdp=await p.context().newCDPSession(p),point=(x,y)=>[{x,y,id:1,radiusX:4,radiusY:4,force:1}];
      await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:point(start.x,start.y)});
      for(let i=1;i<=8;i++){
        await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:point(start.x+(end.x-start.x)*i/8,start.y+(end.y-start.y)*i/8)});
        await p.waitForTimeout(16);
      }
      await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      // Native CDP touch suppression also reproduces on unrelated plain buttons.
      await p.waitForTimeout(1000);await cdp.detach();
    }else{
      await p.mouse.move(start.x,start.y);await p.mouse.down();
      if(releaseOnly){
        await p.mouse.move(start.x-60,start.y-60);
        const cdp=await p.context().newCDPSession(p);
        await cdp.send('Input.dispatchMouseEvent',{type:'mouseReleased',x:end.x,y:end.y,button:'left',clickCount:1});await cdp.detach();
      }else{await p.mouse.move(end.x,end.y,{steps:8});await p.mouse.up()}
    }
    await ready(p);
  }
  async function choose(p,index){
    await p.locator('#levels-button').click();await p.locator('#levels-dialog').waitFor({state:'visible'});
    await p.locator('#level-list button').nth(index).click();
    await p.waitForFunction(id=>window.mergeV04.state.levelId===id&&document.querySelector('#levels-dialog').open===false,'merge-0'+(index+1));await ready(p);
  }
  try{
    const context=await browser.newContext({viewport:{width:1280,height:900}});observe(context);
    const page=await context.newPage();await page.goto(base);await ready(page);
    assert.equal(await page.title(),'叠出新花样 · v0.4');
    await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
    // Opening an ordinary dialog must not permanently suspend first-time teaching.
    await page.locator('#settings-button').click();await page.locator('#close-settings').click();
    await page.locator('.v04-guide').waitFor({state:'attached',timeout:5000});
    checks.tutorialResumesAfterDialog=true;
    await shot(page,'01-guide');
    const initial=await state(page);
    await page.locator('[data-tile-id="u1"]').click();
    assert.equal((await state(page)).successfulMoves,0);
    assert.ok((await page.locator('#message').innerText()).includes('按住'));
    assert.notEqual(await page.evaluate(()=>window.mergeV04.onboarding?.capabilities?.mergePair),true);
    const board=await page.locator('#merge-board').boundingBox();
    await drag(page,'u1',{x:board.x+5,y:board.y+5});
    assert.deepEqual(await state(page),initial);
    await drag(page,'u1','l1',{releaseOnly:true});
    assert.equal((await state(page)).status,'won');checks.releasePointResampled=true;
    assert.equal(await page.evaluate(()=>window.mergeV04.onboarding.capabilities.mergePair),true);
    await page.locator('#undo-button').click();await ready(page);assert.deepEqual(await state(page),initial);
    assert.equal(await page.evaluate(()=>window.mergeV04.onboarding.capabilities.mergePair),true);
    await drag(page,'u1','l1');await page.locator('#next-button').click();await ready(page);
    assert.equal((await state(page)).levelId,'merge-02');
    await page.locator('.v04-guide').waitFor({state:'attached',timeout:5000});await shot(page,'02-start');
    const secondInitial=await state(page);
    await page.evaluate(()=>{window.qaStable={goal:document.querySelector('[data-result-id="sports-car"]'),tile:document.querySelector('[data-tile-id="l0"]'),parking:document.querySelector('.parking-target')}});
    // Reverse the reference route; the guide must follow the actual parked car.
    await drag(page,'u2','__parking__');assert.equal((await state(page)).parkingId,'u2');
    await drag(page,'u1','l0');assert.equal((await state(page)).successfulMoves,1);
    assert.ok((await page.locator('#message').innerText()).includes('相同'));
    await drag(page,'u1','__parking__');assert.equal((await state(page)).successfulMoves,1);
    assert.ok((await page.locator('#message').innerText()).includes('满'));
    await page.evaluate(()=>{document.addEventListener('pointerdown',()=>{window.qaContinued=window.mergeV04.animating},{capture:true,once:true})});
    await drag(page,'u1','l1');
    await page.evaluate(()=>{document.addEventListener('pointerdown',()=>{window.qaContinued=window.mergeV04.animating},{capture:true,once:true})});
    await drag(page,'u2','l0');assert.equal((await state(page)).status,'won');
    checks.continuedDuringFX=await page.evaluate(()=>window.qaContinued===true);assert.equal(checks.continuedDuringFX,true);
    checks.goalNodesStable=await page.evaluate(()=>window.qaStable.goal===document.querySelector('[data-result-id="sports-car"]')&&window.qaStable.parking===document.querySelector('.parking-target'));
    assert.equal(checks.goalNodesStable,true);
    assert.deepEqual((await state(page)).delivered,{'strawberry-large':1,'sports-car':1});
    assert.equal(await page.evaluate(()=>window.mergeV04.onboarding.capabilities.retrieveTile),true);
    await shot(page,'02-completed');
    for(let i=0;i<3;i++){await page.locator('#undo-button').click();await ready(page)}
    assert.deepEqual(await state(page),secondInitial);checks.fullUndo=true;
    await page.locator('#help-button').click();const history=await page.evaluate(()=>window.mergeV04.historyLength);
    await page.keyboard.press('Control+z');assert.equal(await page.evaluate(()=>window.mergeV04.historyLength),history);
    await page.locator('#hint-button').click();await page.locator('.v04-guide').waitFor({state:'attached'});
    assert.deepEqual(await state(page),secondInitial);checks.helpReadOnly=true;
    await choose(page,2);await shot(page,'03-desktop');
    await drag(page,'u4','l0');await drag(page,'u1','l1');await drag(page,'u2','__parking__');
    const parked=await state(page);await page.reload();await ready(page);assert.deepEqual(await state(page),parked);
    assert.equal(await page.evaluate(()=>window.mergeV04.historyLength),3);
    await shot(page,'03-parked');
    await page.locator('#undo-button').click();await ready(page);
    await drag(page,'u3','__parking__');await drag(page,'u2','l2');await drag(page,'u3','l3');
    assert.equal((await state(page)).status,'won');assert.deepEqual((await state(page)).delivered,{'strawberry-large':2,'sports-car':1,'tree-grown':1});
    await shot(page,'03-completed');checks.mixedRestoration=true;
    await choose(page,2);
    for(const [width,height] of [[320,568],[375,667],[390,844],[768,1024],[1280,900]]){
      await page.setViewportSize({width,height});await ready(page);
      const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,
        tiles:[...document.querySelectorAll('.merge-tile')].map(n=>n.getBoundingClientRect().width),
        tools:document.querySelector('.tools').getBoundingClientRect().bottom,inner:innerHeight}));
      assert.equal(metrics.overflow,false,JSON.stringify(metrics));assert.ok(Math.min(...metrics.tiles)>=44,JSON.stringify(metrics));assert.ok(metrics.tools<=height+1,JSON.stringify(metrics));
      await shot(page,'03-'+width);
    }
    await page.setViewportSize({width:390,height:844});await ready(page);
    await page.locator('#settings-button').click();await page.locator('#reduce-motion').check();
    await page.locator('#sound-button').click();await page.locator('#close-settings').click();await ready(page);
    assert.equal(await page.evaluate(()=>window.mergeV04.reducedMotion),true);
    await page.reload();await ready(page);assert.equal(await page.evaluate(()=>window.mergeV04.reducedMotion),true);
    await page.locator('#settings-button').click();assert.equal(await page.locator('#sound-button').getAttribute('aria-pressed'),'false');await page.locator('#close-settings').click();
    checks.settingsPersist=true;

    const mobileContext=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2,reducedMotion:'reduce'});observe(mobileContext);
    const mobile=await mobileContext.newPage();await mobile.goto(base);await ready(mobile);
    await drag(mobile,'u1','l1',{touch:true,offset:18});assert.equal((await state(mobile)).status,'won');
    await mobile.locator('#next-button').click();await ready(mobile);
    await drag(mobile,'u1','__parking__',{touch:true});await drag(mobile,'u2','l0',{touch:true});await drag(mobile,'u1','l1',{touch:true});
    assert.equal((await state(mobile)).status,'won');await mobile.locator('#next-button').click();await ready(mobile);await shot(mobile,'03-touch');
    await drag(mobile,'u4','l0',{touch:true});await drag(mobile,'u1','l1',{touch:true});await drag(mobile,'u2','__parking__',{touch:true});await drag(mobile,'u3','l3',{touch:true});await drag(mobile,'u2','l2',{touch:true});
    assert.equal((await state(mobile)).status,'won');checks.touchAllThree=true;

    const fallbackContext=await browser.newContext({viewport:{width:390,height:844}});observe(fallbackContext);
    await fallbackContext.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw Error('denied')}});window.AudioContext=undefined;window.webkitAudioContext=undefined});
    const fallback=await fallbackContext.newPage();await fallback.goto(base);await ready(fallback);
    await fallback.locator('[data-tile-id="u1"]').focus();await fallback.keyboard.press('Enter');
    await fallback.locator('[data-tile-id="l1"]').focus();await fallback.keyboard.press('Enter');await ready(fallback);
    assert.equal((await state(fallback)).status,'won');assert.equal(await fallback.locator('#save-note').isVisible(),true);
    await fallback.locator('#next-button').click();await ready(fallback);
    await fallback.locator('[data-tile-id="u1"]').focus();await fallback.keyboard.press('Enter');await fallback.locator('#parking-pad').focus();await fallback.keyboard.press('Enter');await ready(fallback);
    assert.equal(await fallback.evaluate(()=>document.activeElement.dataset.tileId),'u2');checks.fallbackKeyboard=true;
    const legacyContext=await browser.newContext();observe(legacyContext);
    await legacyContext.addInitScript(()=>{if(!location.protocol.startsWith('http'))return;localStorage.setItem('tile-explorer.merge.v03.session.v1','{"levelId":"merge-03","ruleset":"merge-v03-2","moves":[]}');localStorage.setItem('tile-explorer.merge.v03.settings.v1','{"soundEnabled":false}')});
    const legacy=await legacyContext.newPage();await legacy.goto(base);await ready(legacy);
    assert.equal((await state(legacy)).levelId,'merge-01');
    assert.equal(await legacy.evaluate(()=>JSON.parse(localStorage.getItem('tile-explorer.merge.v03.session.v1')).levelId),'merge-03');checks.legacyIsolated=true;
    assert.equal(await legacy.locator('#sound-button').getAttribute('aria-pressed'),'false');
    if(process.env.V04_STATIC!=='1'){await page.goto(new URL('/',base).href);await page.locator('.tile:not(.blocked)').first().click();await page.waitForFunction(()=>document.querySelectorAll('.tray-actor:not(.tray-ghost)').length===1);checks.classic=true}
    assert.equal(errors.length,0,errors.join('\n'));assert.ok(requests.every(url=>new URL(url).origin===new URL(base).origin));
    if(process.env.V04_STATIC==='1')assert.ok(!requests.some(url=>url.includes('/api/')));
    const report={date:'2026-10-22',base,version:'0.4.0',ruleset:'merge-v04-1',browser:await browser.version(),
      viewports:['320x568','375x667','390x844','768x1024','1280x900'],checks,errors,requests:[...new Set(requests)]};
    fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
  }catch(error){
    for(const [i,context] of browser.contexts().entries())for(const [j,p]of context.pages().entries()){
      await p.screenshot({path:path.join(output,'failure-'+i+'-'+j+'.png'),fullPage:true}).catch(()=>{});
    }
    if(errors.length)console.error(errors);throw error;
  }finally{await browser.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
