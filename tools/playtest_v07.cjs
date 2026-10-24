/* Browser QA: all gameplay goes through native pointer, keyboard or touch input. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const url=process.env.V07_URL||'http://127.0.0.1:8777/slide-v07.html',out=process.env.V07_QA_OUTPUT||'.qa/v07-browser';
const checks={},errors=[];fs.mkdirSync(out,{recursive:true});
const state=p=>p.evaluate(()=>window.slideV07.state),ready=p=>p.waitForFunction(()=>window.slideV07?.state);
async function close(p){for(const d of await p.locator('dialog[open]').all())await d.locator('[data-close]').click();}
async function choose(p,index){await close(p);await p.locator('#level-button').click();await p.locator('#level-list .level-card').nth(index).click();}
async function shot(p,name,fullPage=true){await p.screenshot({path:path.join(out,name+'.png'),fullPage});}
async function move(p,a,mode='mouse',previewName){const before=await state(p);
  if(a.type==='place-obstacle'){await p.locator(`[data-place-row="${a.row}"][data-place-col="${a.col}"]`).click();await p.locator('#placement-confirm').click();assert.equal((await state(p)).successfulMoves,0);return;}
  const n=p.locator(`[data-tile-id="${a.type==='move-obstacle'?'obstacle':a.tileId}"]`);await n.scrollIntoViewIfNeeded();
  if(mode==='keyboard'){await n.focus();await p.keyboard.press('Arrow'+a.direction[0].toUpperCase()+a.direction.slice(1));}
  else{const b=await n.boundingBox(),x=b.x+b.width/2,y=b.y+b.height/2,[dx,dy]={right:[1,0],left:[-1,0],up:[0,-1],down:[0,1]}[a.direction];
    if(mode==='touch'){const cdp=await p.context().newCDPSession(p),point=(x,y)=>[{x,y,id:1,radiusX:4,radiusY:4,force:1}];await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:point(x,y)});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:point(x+dx*36,y+dy*36)});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await cdp.detach();}
    else{await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(x+dx*36,y+dy*36,{steps:3});if(previewName){await p.locator('.preview-end').waitFor();await shot(p,previewName,false);}await p.mouse.up();}}
  try{await p.waitForFunction(n=>window.slideV07.state.successfulMoves===n,before.successfulMoves+1);}catch(e){console.error(JSON.stringify({level:before.levelId,action:a,state:await state(p)}));await shot(p,'failure');throw e;}
}
async function main(){const browser=await chromium.launch({channel:'msedge',headless:true});
  try{const context=await browser.newContext({viewport:{width:390,height:844}}),p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('console',e=>{if(e.type()==='error')errors.push(e.text());});
    await p.goto(url);await ready(p);const resolvedUrl=p.url();await p.locator('#level-button').click();assert.equal(await p.locator('#level-list .level-card').count(),30);assert.equal(await p.locator('#level-list .level-card:disabled').count(),29);await p.locator('#level-dialog [data-close]').click();checks.progressInitiallyLocked=true;
    for(let i=0;i<30;i++){const l=await p.evaluate(()=>window.slideV07.level);assert.equal(l.id,'slide07-'+String(i+1).padStart(2,'0'));const before=await state(p);let saved=false;
      for(const a of l.referenceSolution){const check=await p.evaluate(a=>TileSlideV07.engine.inspectAction(window.slideV07.state,a),a);let preview;
        if(!saved&&(check.bomb||check.brakeId||check.portalId)){preview='level-'+(i+1)+'-preview';saved=true;}
        await move(p,a,preview?'mouse':i%3===0?'mouse':'keyboard',preview);
      }
      assert.equal((await state(p)).status,'won');assert.equal((await p.evaluate(()=>window.slideV07.result)).stars,3);await p.locator('#win-dialog').waitFor({state:'visible'});checks['level'+(i+1)]={variant:l.variantId,moves:(await state(p)).successfulMoves};console.log('Passed level '+(i+1));
      if([14,19,24,29].includes(i))await shot(p,'level-'+(i+1)+'-win');
      if(i<29)await p.locator('#next').click();else{await p.locator('#next').click();assert.match(await p.locator('#collection').textContent(),/90 \/ 90/);assert.equal(await p.locator('#level-list .level-card:disabled').count(),0);}
      assert.ok(before.successfulMoves===0);
    }checks.allThirtyNativeInput=true;checks.ninetyStars=true;await shot(p,'all-thirty');
    // Restore/undo after a terrain effect, including the fixed random assignment.
    for(const index of [15,19,24,29]){await choose(p,index);const before=await state(p),route=await p.evaluate(()=>window.slideV07.level.referenceSolution);let used=0;
      for(const a of route){await move(p,a,'keyboard');used++;const s=await state(p);if(s.features.crates.length<before.features.crates.length||s.features.brakes.some(b=>!b.charges)||s.features.portals.some(b=>!b.charges))break;}
      const after=await state(p);await p.reload();await ready(p);assert.deepEqual(await state(p),after);await close(p);for(let n=0;n<used;n++)await p.locator('#undo').click();assert.deepEqual(await state(p),before);await p.locator('#restart').click();assert.deepEqual(await state(p),before);
    }checks.terrainUndoRefreshAndFrozenVariants=true;
    await choose(p,0);const initial=await state(p);for(let n=0;n<20;n++){const a=await p.evaluate(()=>{const E=TileSlideV07.engine,s=window.slideV07.state;return E.listLegalActions(s).find(a=>E.inspectAction(s,a).kind==='move');});await move(p,a,'keyboard');}
    assert.equal((await state(p)).status,'lost');await p.locator('#loss-dialog').waitFor({state:'visible'});await p.locator('#loss-undo').click();assert.equal((await state(p)).successfulMoves,19);await p.locator('#restart').click();assert.deepEqual(await state(p),initial);checks.budgetLossAndUndo=true;
    await p.locator('#hint').click();await p.locator('#solve-hint').click();await p.locator('.preview-end').waitFor();assert.match(await p.locator('#notice').textContent(),/向/);checks.referenceHint=true;
    // Exercise a non-reference hint via the actual Worker, and cancel by closing.
    const a=await p.evaluate(()=>{const E=TileSlideV07.engine,s=window.slideV07.state;return E.listLegalActions(s).find(a=>E.inspectAction(s,a).kind==='move');});await move(p,a,'keyboard');await p.locator('#hint').click();await p.locator('#solve-hint').click();await p.waitForFunction(()=>!document.getElementById('solve-hint').disabled);checks.workerHintResponsive=true;
    for(const [width,height] of [[320,568],[375,667],[390,844],[768,1024],[1280,900]]){await p.setViewportSize({width,height});await choose(p,29);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.ok(await p.locator('.tile').first().evaluate(n=>n.getBoundingClientRect().width>=35));assert.ok(await p.locator('#recipe-path').evaluate(n=>n.scrollWidth<=n.clientWidth));await shot(p,'size-'+width);checks['size'+width]=true;}
    await context.close();
    const touch=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true}),tp=await touch.newPage();tp.on('pageerror',e=>errors.push(e.message));const debugUrl=new URL(resolvedUrl);debugUrl.searchParams.set('debug','1');await tp.goto(debugUrl.href);await ready(tp);
    for(const index of [14,19,24,29]){await choose(tp,index);for(const a of await tp.evaluate(()=>window.slideV07.level.referenceSolution))await move(tp,a,'touch');assert.equal((await state(tp)).status,'won');}
    checks.nativeTouchSimulation=true;await shot(tp,'final-touch');await touch.close();assert.deepEqual(errors,[]);
    const report={url,checks,errors,limitations:['Android/iOS hardware and unfamiliar-player tests not performed']};fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
  }finally{await browser.close();}}
main().catch(e=>{console.error(e.stack);process.exitCode=1;});
