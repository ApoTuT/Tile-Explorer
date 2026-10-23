/* Browser QA uses actual mouse, touch and keyboard input; no rule commits via evaluate. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const url=process.env.V06_URL||'http://127.0.0.1:8787/slide-v06.html',out=process.env.V06_QA_OUTPUT||'.qa/v06-browser';
fs.mkdirSync(out,{recursive:true});const checks={},errors=[];
const state=p=>p.evaluate(()=>window.slideV06.state);
async function ready(p){await p.waitForFunction(()=>window.slideV06?.state);}
async function choose(p,i){for(const d of await p.locator('dialog[open]').all())await d.locator('[data-close]').click();await p.locator('#level-button').click();await p.locator('#level-list button').nth(i).click();await ready(p);}
async function move(p,a,mode='mouse'){
  const before=await state(p),n=p.locator(`[data-tile-id="${a.tileId}"]`);await n.scrollIntoViewIfNeeded();
  if(mode==='keyboard'){await n.focus();await p.keyboard.press('Arrow'+a.direction[0].toUpperCase()+a.direction.slice(1));}
  else{const b=await n.boundingBox(),x=b.x+b.width/2,y=b.y+b.height/2,[dx,dy]={right:[1,0],left:[-1,0],up:[0,-1],down:[0,1]}[a.direction];
    if(mode==='touch'){const cdp=await p.context().newCDPSession(p),point=(x,y)=>[{x,y,id:1,radiusX:4,radiusY:4,force:1}];await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:point(x,y)});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:point(x+dx*36,y+dy*36)});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await cdp.detach();}
    else{await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(x+dx*36,y+dy*36,{steps:3});await p.mouse.up();}}
  await p.waitForFunction(n=>window.slideV06.state.successfulMoves===n,before.successfulMoves+1);
}
async function shot(p,name){await p.screenshot({path:path.join(out,name+'.png'),fullPage:true});}
async function budget(p,expected){
  assert.equal(await p.locator('#moves-left').textContent(),String(expected));
  assert.equal(await p.locator('#move-budget').isVisible(),true);
}
async function unmergedMove(p){
  const action=await p.evaluate(()=>{const E=TileSlideV06.engine,s=window.slideV06.state;
    return E.listLegalActions(s).find(a=>E.inspectAction(s,a).kind==='move');});
  assert.ok(action,'the introductory level must allow a non-merging move');
  await move(p,action,'keyboard');
}
async function blockedBackground(p,dialogId){
  const before=await state(p),dialog=await p.locator(dialogId).boundingBox(),boxes=await p.locator('[data-tile-id]').evaluateAll(nodes=>nodes.map(n=>{
    const b=n.getBoundingClientRect();return {x:b.x+b.width/2,y:b.y+b.height/2};}));
  const point=boxes.find(b=>b.x<dialog.x||b.x>dialog.x+dialog.width||b.y<dialog.y||b.y>dialog.y+dialog.height)||boxes[0];
  assert.ok(point,'a board tile must remain behind the modal');
  await p.mouse.move(point.x,point.y);await p.mouse.down();await p.mouse.move(point.x+36,point.y,{steps:3});await p.mouse.up();
  await p.keyboard.press('ArrowRight');await p.keyboard.press('ArrowDown');
  await p.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  assert.deepEqual(await state(p),before);
}
async function moveBudgetChecks(p){
  await choose(p,0);const initial=await state(p);assert.equal(initial.moveLimit,20);await budget(p,20);
  // An obsolete action log must restart safely instead of replaying under new rules.
  // Storage is the fixture boundary; every subsequent game action uses native input.
  await p.evaluate(()=>{const l=window.slideV06.level,prefix='tile-explorer.slide.v06.';
    localStorage.setItem(prefix+'session.v1',JSON.stringify({levelId:l.id,hash:'pre-budget-v06',actions:l.referenceSolution}));
    localStorage.setItem(prefix+'best.v1',JSON.stringify({[l.id]:{hash:'pre-budget-v06',score:99999,stars:3,moves:1}}));});
  await p.reload();await ready(p);assert.deepEqual(await state(p),initial);await budget(p,20);
  assert.match(await p.locator('#notice').textContent(),/关卡已升级.*重新开始/);
  await p.locator('#level-button').click();assert.match(await p.locator('#collection').textContent(),/0 \/ 30/);
  await p.locator('#level-dialog [data-close]').click();checks.obsoleteSaveSafelyRestarts=true;
  const oldBest=await p.evaluate(()=>localStorage.getItem('tile-explorer.slide.v06.best.v1'));
  await p.locator('#help-button').click();await blockedBackground(p,'#help-dialog');
  await p.locator('#help-dialog [data-close]').click();checks.playingModalBlocksBoardInput=true;
  // A swipe against an edge consumes no step.
  await p.locator('[data-tile-id="t1"]').focus();await p.keyboard.press('ArrowUp');
  assert.deepEqual(await state(p),initial);await budget(p,20);checks.blockedMoveCostsNoStep=true;
  for(let i=0;i<20;i++){
    await unmergedMove(p);await budget(p,19-i);
    if(i===16)assert.equal(await p.locator('#move-budget').evaluate(n=>n.classList.contains('low')),true);
  }
  await p.locator('#loss-dialog').waitFor({state:'visible'});const lost=await state(p);
  assert.equal(lost.status,'lost');assert.equal(lost.successfulMoves,20);
  assert.equal(await p.evaluate(()=>window.slideV06.result.stars),0);
  assert.equal(await p.evaluate(()=>localStorage.getItem('tile-explorer.slide.v06.best.v1')),oldBest);
  await blockedBackground(p,'#loss-dialog');checks.lossModalBlocksBoardInput=true;
  await shot(p,'budget-exhausted');
  await p.reload();await ready(p);await p.locator('#loss-dialog').waitFor({state:'visible'});
  assert.deepEqual(await state(p),lost);await budget(p,0);checks.exhaustedSaveRestoresModal=true;
  await p.locator('#loss-dialog [data-close]').click();
  await p.locator('[data-tile-id]').first().focus();await p.keyboard.press('ArrowRight');
  assert.deepEqual(await state(p),lost);assert.equal(await p.locator('#hint').isDisabled(),true);
  await p.locator('#continue').click();await p.locator('#loss-undo').click();
  const undone=await state(p);assert.equal(undone.status,'playing');assert.equal(undone.successfulMoves,19);await budget(p,1);
  assert.equal(await p.locator('#loss-dialog').isVisible(),false);checks.lossUndoRestoresOneMove=true;
  await unmergedMove(p);await p.locator('#loss-dialog').waitFor({state:'visible'});await p.locator('#loss-retry').click();
  assert.deepEqual(await state(p),initial);await budget(p,20);checks.lossRetryResetsBudget=true;
  checks.moveBudgetExhaustionAwardsNoStars=true;
  // The introductory level has only odd-length wins; level two also admits twenty.
  await choose(p,1);
  // Detached solver states only plan the route; all twenty commits are actual inputs.
  const exact=await p.evaluate(()=>{const E=TileSlideV06.engine,start=window.slideV06.state,failed=new Set();
    function search(s){if(s.status==='won')return s.successfulMoves===s.moveLimit?[]:null;if(s.status!=='playing')return null;
      const key=E.canonicalKey(s)+'/'+s.successfulMoves;if(failed.has(key))return null;
      for(const a of E.listLegalActions(s)){const rest=search(E.applyAction(s,a).state);if(rest)return [a,...rest];}
      failed.add(key);return null;}
    return search(start);});
  assert.ok(exact,'level two must admit a win on its final allowed move');assert.equal(exact.length,20);
  for(const a of exact)await move(p,a,'keyboard');await p.locator('#win-dialog').waitFor({state:'visible'});
  assert.equal((await state(p)).status,'won');await budget(p,0);assert.equal(await p.locator('#loss-dialog').isVisible(),false);
  checks.exactFinalMoveWins=true;await shot(p,'budget-final-move-win');
}
async function main(){const browser=await chromium.launch({channel:'msedge',headless:true});
  try{const context=await browser.newContext({viewport:{width:1280,height:900}});context.on('page',p=>{p.on('pageerror',e=>errors.push(e.stack));p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});});
    const p=await context.newPage();await p.goto(url);await ready(p);assert.match(await p.title(),/v0.6/);
    await p.locator('#settings-button').click();await p.locator('#motion-toggle').check();await p.locator('#sound-toggle').uncheck();await p.locator('#settings-dialog [data-close]').click();
    await moveBudgetChecks(p);
    await choose(p,0);
    await shot(p,'01-desktop');
    for(let i=0;i<10;i++){
      await choose(p,i);const route=await p.evaluate(()=>window.slideV06.level.referenceSolution);
      if(i===2){await p.locator('[data-tile-id]').first().click();assert.match(await p.locator('#recipe-copy').textContent(),/× 2/);await shot(p,'03-path');}
      if(i===6||i===9)await shot(p,String(i+1)+'-pattern');
      for(let j=0;j<route.length;j++){await move(p,route[j],i%3===0?'mouse':'keyboard');
        if(i===2&&j===2){const before=await state(p);await p.reload();await ready(p);assert.deepEqual(await state(p),before);checks.refreshMidUpgrade=true;}}
      await p.locator('#win-dialog').waitFor({state:'visible'});const s=await state(p);assert.equal(s.status,'won');const result=await p.evaluate(()=>window.slideV06.result);assert.equal(result.stars,3);
      checks['level'+(i+1)]={moves:s.successfulMoves,score:result.score,bestChain:s.bestChain};
      if(i===9)await shot(p,'10-win');
    }
    await p.locator('#next').click();assert.match(await p.locator('#collection').textContent(),/30 \/ 30/);checks.thirtyStars=true;await shot(p,'all-levels');
    await choose(p,2);const route=await p.evaluate(()=>window.slideV06.level.referenceSolution),initial=await state(p);
    for(const a of route.slice(0,4))await move(p,a,'mouse');for(let i=0;i<4;i++)await p.locator('#undo').click();assert.deepEqual(await state(p),initial);checks.undoRestoresScores=true;
    await p.locator('#hint').click();assert.match(await p.locator('#hint-copy').textContent(),/两个/);await p.locator('#solve-hint').click();assert.match(await p.locator('#notice').textContent(),/向/);assert.ok(await p.locator('.preview-end').count());checks.recipeAndMoveHint=true;
    for(const [width,height] of [[320,568],[375,667],[390,844],[768,1024],[1280,900]]){await p.setViewportSize({width,height});await choose(p,9);
      assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.ok(await p.locator('.tile').first().evaluate(n=>n.getBoundingClientRect().width>=35));
      assert.ok(await p.locator('#recipe-path').evaluate(n=>n.scrollWidth<=n.clientWidth));await shot(p,'size-'+width);checks['size'+width]=true;}
    await context.close();
    const touch=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const tp=await touch.newPage();tp.on('pageerror',e=>errors.push(e.message));await tp.goto(url);await ready(tp);await choose(tp,2);
    for(const a of await tp.evaluate(()=>window.slideV06.level.referenceSolution))await move(tp,a,'touch');assert.equal((await state(tp)).status,'won');checks.nativeTouchSimulation=true;await shot(tp,'03-touch-win');
    await touch.close();assert.deepEqual(errors,[]);
    fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({url,checks,errors,limitations:['Android/iOS hardware and unfamiliar-player tests not performed']},null,2));
    console.log(JSON.stringify({checks,errors},null,2));
  }finally{await browser.close();}}
main().catch(e=>{console.error(e.stack);process.exitCode=1;});
