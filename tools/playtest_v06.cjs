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
async function main(){const browser=await chromium.launch({channel:'msedge',headless:true});
  try{const context=await browser.newContext({viewport:{width:1280,height:900}});context.on('page',p=>{p.on('pageerror',e=>errors.push(e.stack));p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});});
    const p=await context.newPage();await p.goto(url);await ready(p);assert.match(await p.title(),/v0.6/);
    await p.locator('#settings-button').click();await p.locator('#motion-toggle').check();await p.locator('#sound-toggle').uncheck();await p.locator('#settings-dialog [data-close]').click();
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
