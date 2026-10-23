'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../web/slide-v06/engine.js'),levels=require('../web/slide-v06/levels.js'),Session=require('../web/slide-v06/session.js'),S=require('../web/slide-v06/solver.js');
const memory=()=>{const m={};return {getItem:k=>m[k]??null,setItem:(k,v)=>{m[k]=v;}};};
const fixture=(tiles,extra={})=>({id:'test',rows:3,cols:4,mask:['####','####','####'],rocks:[],tiles,chainGoals:{fruit:{targetTier:3,count:1}},moveLimit:20,parMoves:6,twoStarScore:300,threeStarScore:700,...extra});
const t=(id,tier,row,col)=>({id,itemId:'fruit-'+tier,row,col});
test('upgrade stays at collision, preserves target ID, delivers only at goal',()=>{
  const l=fixture([t('a',0,0,0),t('b',0,0,2),t('c',1,1,2),t('d',2,2,2)]);let s=E.createState(l);
  const first=E.applyAction(s,{type:'slide',tileId:'a',direction:'right'});s=first.state;
  assert.equal(first.events[0].kind,'upgrade');assert.equal(s.tiles.length,3);assert.deepEqual(s.tiles.find(t=>t.id==='b'),t('b',1,0,2));assert.equal(s.delivered.fruit,0);
  s=E.applyAction(s,{type:'slide',tileId:'b',direction:'down'}).state;assert.equal(s.tiles.find(t=>t.id==='c').itemId,'fruit-2');
  s=E.applyAction(s,{type:'slide',tileId:'c',direction:'down'}).state;assert.equal(s.status,'won');assert.equal(s.delivered.fruit,1);assert.equal(s.mergeScore,600);assert.equal(E.result(s,l).score,800);
});
test('different tiers block and stones and mask stop travel',()=>{
  const l=fixture([t('a',0,0,0),t('b',0,2,3),t('c',1,0,2),t('d',2,2,2)],{rocks:[{row:1,col:1}],mask:['###.','####','####']});let s=E.createState(l);
  let c=E.inspectAction(s,{type:'slide',tileId:'a',direction:'right'});assert.equal(c.kind,'move');assert.deepEqual(c.to,{row:0,col:1});
  s=E.applyAction(s,{type:'slide',tileId:'a',direction:'right'}).state;assert.equal(E.inspectAction(s,{type:'slide',tileId:'a',direction:'down'}).ok,false);
  assert.equal(E.inspectAction(s,{type:'slide',tileId:'c',direction:'right'}).ok,false);
});
test('one setup move preserves combo, second clears it, rejects do not score',()=>{
  const l=fixture([t('a',0,0,0),t('b',0,0,2),t('c',1,1,2),t('d',2,2,2)]);let s=E.applyAction(E.createState(l),{type:'slide',tileId:'a',direction:'right'}).state;
  s=E.applyAction(s,{type:'slide',tileId:'d',direction:'left'}).state;assert.equal(s.chainCount,1);
  s=E.applyAction(s,{type:'slide',tileId:'d',direction:'right'}).state;assert.equal(s.chainCount,0);assert.equal(s.mergeScore,100);
  const blocked=E.applyAction(s,{type:'slide',tileId:'d',direction:'right'});assert.equal(blocked.ok,false);assert.strictEqual(blocked.state,s);
});
test('all ten authored routes have correct material and achievable stars',()=>{
  assert.equal(levels.length,10);for(const l of levels){assert.equal(E.validateDefinition(l).ok,true);const {state}=E.replay(l,l.referenceSolution);assert.equal(state.status,'won');assert.equal(E.result(state,l).stars,3);assert.equal(E.result(state,l).score,l.scoreProofs[0].score);}
});
test('complete undo, refresh replay, non-additive best and preview isolation',()=>{
  const store=memory(),game=new Session(levels,store);game.start(levels[2]);const initial=E.clone(game.state);
  for(const a of levels[2].referenceSolution)assert.ok(game.apply(a).ok);
  const score=E.result(game.state,game.level).score;game.save();assert.equal(game.bestFor(game.level).score,score);
  const restored=new Session(levels,store);assert.deepEqual(restored.state,game.state);assert.equal(restored.history.length,levels[2].referenceSolution.length);
  while(restored.undo()){}assert.deepEqual(restored.state,initial);assert.equal(restored.bestFor(game.level).score,score);
  assert.equal(new Session(levels,store,{preview:true}).bestFor(game.level).score,0);
});
test('storage failure and invalid action log degrade safely',()=>{
  const denied={getItem(){throw Error('denied');},setItem(){throw Error('denied');}},game=new Session(levels,denied);assert.ok(game.failed);assert.ok(game.apply(levels[0].referenceSolution[0]).ok);
  const store=memory();store.setItem('tile-explorer.slide.v06.session.v1',JSON.stringify({levelId:levels[0].id,hash:E.definitionHash(levels[0]),actions:[{type:'slide',tileId:'missing',direction:'right'}]}));assert.equal(new Session(levels,store).state.successfulMoves,0);
});
test('bounded hints return unknown on budget, cancellation wins',async()=>{
  assert.equal(S.findSolution(E.createState(levels[2]),{maxStates:0}).status,'unverified');
  assert.equal((await S.findHint(E.createState(levels[2]),{isCancelled:()=>true})).status,'cancelled');
});
test('looping 300 times restores and undoes full history without free points',()=>{
  const store=memory(),game=new Session(levels,store),l=fixture([t('a',0,0,0),t('b',0,2,0),t('c',1,2,1),t('d',2,2,2)],{moveLimit:1000});game.levels=[l];game.start(l);
  for(let i=0;i<300;i++)assert.ok(game.apply({type:'slide',tileId:'a',direction:i%2?'left':'right'}).ok);
  assert.equal(game.state.mergeScore,0);const recovered=new Session([l],store);assert.equal(recovered.history.length,300);while(recovered.undo()){}assert.equal(recovered.state.successfulMoves,0);
});
test('20th move may win, exhausted non-winning move loses, rejects spend nothing',()=>{
  const l={...levels[0],moveLimit:1},initial=E.createState(l);
  const win=E.applyAction(initial,l.referenceSolution[0]);assert.equal(win.state.status,'won');
  const travel=E.listLegalActions(initial).find(a=>E.inspectAction(initial,a).kind==='move');
  const lose=E.applyAction(initial,travel);assert.equal(lose.state.status,'lost');assert.equal(lose.state.successfulMoves,1);assert.equal(E.result(lose.state,l).stars,0);
  assert.equal(E.applyAction(lose.state,l.referenceSolution[0]).ok,false);
  const blocked=E.listLegalActions(initial);assert.ok(blocked.length);assert.equal(initial.successfulMoves,0);
});
test('lost refresh, undo, retry and old rules cannot retain invalid moves or award best',()=>{
  const l={...levels[0],moveLimit:1},store=memory(),game=new Session([l],store),a=E.listLegalActions(game.state).find(a=>E.inspectAction(game.state,a).kind==='move');
  game.apply(a);assert.equal(game.state.status,'lost');assert.equal(game.bestFor(l).stars,0);
  const restored=new Session([l],store);assert.equal(restored.state.status,'lost');restored.undo();assert.equal(restored.state.status,'playing');assert.equal(restored.state.successfulMoves,0);
  restored.apply(a);restored.restart();assert.equal(restored.state.successfulMoves,0);
  store.setItem('tile-explorer.slide.v06.session.v1',JSON.stringify({levelId:l.id,hash:'old-rule-hash',actions:[a]}));
  const upgraded=new Session([l],store);assert.equal(upgraded.state.successfulMoves,0);assert.ok(upgraded.restoreNotice);
});
test('reported two-apple bird softlock is reproduced, redesigned grid can recover',()=>{
  const old=fixture([t('a',2,2,0),t('b',2,4,4)],{rows:6,cols:7,mask:['...#...','..###..','#######','.#####.','..###..','...#...']});
  assert.equal(S.findSolution(E.createState(old),{respectMoveLimit:false,maxStates:1000,maxMs:1000}).status,'unsolvable');
  const repaired=fixture([t('a',2,1,0),t('b',2,2,2)],{rows:3,cols:3,mask:['###','###','###']});
  const solved=S.findSolution(E.createState(repaired));assert.equal(solved.status,'solved');assert.equal(E.replay(repaired,solved.solution).state.status,'won');
});
test('budget-aware hint distinguishes spent budget from spatial impossibility',()=>{
  const l=fixture([t('a',2,0,0),t('b',2,2,2)],{rows:3,cols:3,mask:['###','###','###'],moveLimit:1});
  const budget=S.findSolution(E.createState(l));assert.equal(budget.status,'out-of-moves');
  const spatial=S.findSolution(E.createState(l),{respectMoveLimit:false});assert.equal(spatial.status,'solved');
});
