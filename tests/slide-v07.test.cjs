'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../web/slide-v07/engine.js'),Session=require('../web/slide-v07/session.js'),S=require('../web/slide-v07/solver.js');
const tile=(id,tier,row,col,effect)=>({id,itemId:'fruit-'+tier,row,col,...(effect?{effect}:{})});
const fixture=(tiles,extra={})=>({id:'test',rows:3,cols:4,mask:['####','####','####'],rocks:[],tiles,chainGoals:{fruit:{targetTier:3,count:1}},moveLimit:20,parMoves:6,twoStarScore:100,threeStarScore:200,...extra});
const memory=()=>{const m={};return {getItem:k=>m[k]??null,setItem:(k,v)=>{m[k]=v;}};};
const slide=(s,id,direction)=>E.applyAction(s,{type:'slide',tileId:id,direction});
test('bomb on either participant destroys only orthogonal crates, final delivery still explodes',()=>{
  for(const bomb of ['a','b']){const l=fixture([tile('a',2,0,0,bomb==='a'?'bomb':null),tile('b',2,0,2,bomb==='b'?'bomb':null)],{features:{crates:[{id:'near',row:1,col:2},{id:'diagonal',row:1,col:1}]}}),s=E.createState(l),before=E.clone(s),preview=E.inspectAction(s,{type:'slide',tileId:'a',direction:'right'}),r=slide(s,'a','right');
    assert.deepEqual(s,before);assert.deepEqual(preview.removedCrateIds,['near']);assert.equal(r.state.status,'won');assert.equal(r.state.successfulMoves,1);assert.deepEqual(r.state.features.crates.map(c=>c.id),['diagonal']);assert.equal(r.events.filter(e=>e.type==='blast-resolved').length,1);assert.equal(r.state.mergeScore,200);}
});
test('intermediate bomb is consumed, nearby ordinary material survives, movement does not explode',()=>{
  const l=fixture([tile('a',1,0,0,'bomb'),tile('b',1,0,2),tile('c',2,1,2)],{features:{crates:[{id:'wood',row:0,col:3}]}}),s=E.createState(l);
  const moved=slide(s,'a','down');assert.equal(moved.state.tiles.find(t=>t.id==='a').effect,'bomb');assert.equal(moved.events.some(e=>e.type==='blast-resolved'),false);
  const r=slide(s,'a','right');assert.equal(r.state.tiles.find(t=>t.id==='b').effect,undefined);assert.ok(r.state.tiles.some(t=>t.id==='c'));assert.equal(r.state.features.crates.length,0);
  const final=slide(r.state,'b','down');assert.equal(final.state.status,'won');assert.equal(final.events.some(e=>e.type==='blast-resolved'),false);
});
test('two bombs produce one blast and whole 2x2 perimeter excludes corners',()=>{
  const l=fixture([tile('a',2,0,0,'bomb'),tile('b',2,2,2,'bomb')],{rows:4,cols:4,mask:Array(4).fill('####'),footprintByChain:{fruit:{width:2,height:2}}}),s=E.createState(l);
  const area=E.blastArea(s,s.tiles[0],{row:1,col:1});assert.equal(area.length,8);assert.equal(area.some(p=>p.row===0&&p.col===0),false);
  let r=slide(s,'a','right');r=slide(r.state,'a','down');assert.equal(r.state.status,'won');assert.equal(r.events.filter(e=>e.type==='blast-resolved').length,1);
});
test('one-use brake stops in an empty aligned footprint, then allows ordinary passage',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,2,3)],{features:{brakes:[{id:'b1',row:0,col:1,width:1,height:1,charges:1}]}}),s=E.createState(l),r=slide(s,'a','right');
  assert.deepEqual(r.events[0].to,{row:0,col:1});assert.equal(r.state.features.brakes[0].charges,0);assert.equal(r.state.successfulMoves,1);assert.deepEqual(slide(r.state,'a','right').events[0].to,{row:0,col:3});assert.equal(s.features.brakes[0].charges,1);
});
test('brake ignores mismatched size and start occupancy, collision has priority over braking',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,0,2)],{features:{brakes:[{id:'b1',row:0,col:2,width:1,height:1,charges:1}]}}),r=slide(E.createState(l),'a','right');assert.equal(r.state.status,'won');assert.equal(r.state.features.brakes[0].charges,1);
  const mismatch=fixture([tile('a',2,0,0),tile('b',2,2,3)],{features:{brakes:[{id:'b1',row:0,col:1,width:2,height:1,charges:1}]}});assert.deepEqual(slide(E.createState(mismatch),'a','right').events[0].to,{row:0,col:3});
  const start=fixture([tile('a',2,0,0),tile('b',2,2,3)],{features:{brakes:[{id:'b1',row:0,col:0,width:1,height:1,charges:1}]}});assert.equal(slide(E.createState(start),'a','right').state.features.brakes[0].charges,1);
});
const portal=(a={row:0,col:1},b={row:2,col:1},extra={})=>({id:'p',width:1,height:1,charges:1,a,b,...extra});
test('portal teleports once and ends the turn without remote merging; both ends share charge',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,2,3)],{features:{portals:[portal()]}}),s=E.createState(l),r=slide(s,'a','right');
  assert.deepEqual(r.events[0].entry,{row:0,col:1});assert.deepEqual(r.events[0].to,{row:2,col:1});assert.equal(r.state.tiles.length,2);assert.equal(r.state.successfulMoves,1);assert.equal(r.state.features.portals[0].charges,0);assert.equal(slide(r.state,'a','right').state.status,'won');assert.equal(s.features.portals[0].charges,1);
  const reverse=fixture([tile('a',2,2,0),tile('b',2,0,3)],{features:{portals:[portal()]}});assert.deepEqual(slide(E.createState(reverse),'a','right').events[0].to,{row:0,col:1});
});
test('occupied portal exit acts as ordinary floor and does not spend charge',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,2,1)],{features:{portals:[portal()]}}),r=slide(E.createState(l),'a','right');assert.deepEqual(r.events[0].to,{row:0,col:3});assert.equal(r.state.features.portals[0].charges,1);
});
test('portal checks all cells for wide material, ignores departing source, never rotates',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,2,2)],{footprintByChain:{fruit:{width:2,height:1}},features:{portals:[portal({row:0,col:1},{row:2,col:1},{width:2})]}}),s=E.createState(l),r=slide(s,'a','right');assert.equal(r.events[0].portalId,undefined);assert.equal(r.state.features.portals[0].charges,1);
  const swap=fixture([tile('a',2,0,0),tile('b',2,2,3)],{features:{portals:[portal({row:0,col:1},{row:0,col:0})]}});assert.deepEqual(slide(E.createState(swap),'a','right').events[0].to,{row:0,col:0});
});
test('canonical state and definition hashes include abilities, terrain and variants',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,2,3)],{features:{brakes:[{id:'b1',row:0,col:1,width:1,height:1,charges:1}]}}),s=E.createState(l),changed=E.clone(s);changed.tiles[0].effect='bomb';assert.notEqual(E.canonicalKey(s),E.canonicalKey(changed));
  changed.tiles[0].effect=undefined;changed.features.brakes[0].charges=0;assert.notEqual(E.canonicalKey(s),E.canonicalKey(changed));assert.notEqual(E.definitionHash(l),E.definitionHash({...l,features:{}}));
});
test('reject invalid terrain, duplicate IDs, overlapping feature regions and unknown variants',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,2,3)]);assert.equal(E.validateDefinition({...l,features:{crates:[{id:'a',row:1,col:1}]}}).ok,false);assert.equal(E.validateDefinition({...l,features:{brakes:[{id:'b1',row:1,col:3,width:2,height:1,charges:1}]}}).ok,false);
  assert.equal(E.validateDefinition({...l,features:{portals:[portal({row:0,col:1},{row:0,col:1})]}}).ok,false);assert.throws(()=>E.createState({...l,variants:[{id:'v1',bombTileIds:[]}]},'absent'));
});
test('session atomically restores bomb/crate/score/budget on undo and refresh',()=>{
  const l=fixture([tile('a',2,0,0,'bomb'),tile('b',2,0,2)],{features:{crates:[{id:'wood',row:1,col:2}]}}),store=memory(),game=new Session([l],store),before=E.clone(game.state);
  game.apply({type:'slide',tileId:'a',direction:'right'});const restored=new Session([l],store);assert.deepEqual(restored.state,game.state);assert.equal(restored.state.features.crates.length,0);restored.undo();assert.deepEqual(restored.state,before);
});
test('session keeps assigned variant across restart, refresh and re-entry, migrates only settings',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,2,3)],{variants:[{id:'v1',bombTileIds:['a']},{id:'v2',bombTileIds:['b']}]}),store=memory();store.setItem('tile-explorer.slide.v06.settings.v1',JSON.stringify({soundEnabled:false,reducedMotion:true}));let draws=0;
  const game=new Session([l],store,{random:()=>{draws++;return .9;}});assert.equal(game.state.variantId,'v2');game.restart();assert.equal(draws,1);const restored=new Session([l],store,{random:()=>0});assert.deepEqual(restored.state,game.state);assert.equal(restored.settings.soundEnabled,false);assert.equal(restored.settings.reducedMotion,true);
  store.setItem('tile-explorer.slide.v07.session.v1',JSON.stringify({levelId:l.id,hash:'old',variantId:'v2',actions:[]}));const updated=new Session([l],store);assert.equal(updated.restoreNotice,'updated');assert.equal(updated.state.variantId,'v2');
});
test('normal progression locks later levels, failure gives zero stars, last allowed move can win',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,0,2)],{moveLimit:1}),next={...l,id:'next'},g=new Session([l,next],memory());assert.equal(g.isUnlocked(next),false);assert.equal(g.start(next),false);g.apply({type:'slide',tileId:'a',direction:'right'});assert.equal(g.state.status,'won');assert.equal(g.isUnlocked(next),true);assert.ok(g.bestFor(l).stars);
  g.start(next);g.apply({type:'slide',tileId:'a',direction:'down'});assert.equal(g.state.status,'lost');assert.equal(g.bestFor(next).stars,0);assert.ok(g.undo());assert.equal(g.state.successfulMoves,0);
});
test('hint returns unknown on resource limit and never mutates the queried state',()=>{
  const s=E.createState(fixture([tile('a',2,0,0),tile('b',2,2,3)])),before=E.clone(s);assert.equal(S.findSolution(s,{maxStates:0}).status,'unverified');assert.deepEqual(s,before);const route=S.findSolution(s);assert.equal(route.status,'solved');
});
test('thirty published layouts and every variant reference actually win within budget and reach 3 stars',()=>{
  const levels=require('../web/slide-v07/levels.js');assert.equal(levels.length,30);assert.equal(new Set(levels.map(l=>l.id)).size,30);
  for(const [i,l] of levels.entries()){assert.equal(l.id,'slide07-'+String(i+1).padStart(2,'0'));for(const v of l.variants){const r=E.resolveLevel(l,v.id),played=E.replay(r,r.referenceSolution);assert.equal(played.state.status,'won');assert.ok(played.state.successfulMoves<=20);assert.equal(E.result(played.state,r).stars,3);}
    if(i<14)assert.equal(l.features.crates.length+l.features.brakes.length+l.features.portals.length,0);if(i<19)assert.equal(l.features.brakes.length,0);if(i<24)assert.equal(l.features.portals.length,0);}
});

test('powder chains open a whole wall, but cannot jump diagonals or relay through plain crates',()=>{
  const l=fixture([tile('a',2,0,0,'bomb'),tile('b',2,0,1)],{rows:4,mask:Array(4).fill('####'),features:{crates:[{id:'first',row:0,col:2,powder:true},{id:'relay',row:1,col:2,powder:true},{id:'last',row:2,col:2,powder:true},{id:'diagonal',row:3,col:3,powder:true}]}}),s=E.createState(l),r=slide(s,'a','right');
  assert.deepEqual(r.events[0].removedCrateIds,['first','relay','last']);assert.deepEqual(r.state.features.crates.map(c=>c.id),['diagonal']);assert.equal(s.features.crates.length,4);
  s.features.crates[1].powder=false;assert.deepEqual(E.chainCrates(s,[{row:0,col:2}]),['first']);
});

test('turning uses the current position for merge alignment and keeps the garden reusable',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,2,2)],{features:{brakes:[{id:'turn',row:0,col:2,width:1,height:1,charges:1,direction:'down'}]}}),s=E.createState(l),check=E.inspectAction(s,{type:'slide',tileId:'a',direction:'right'}),r=slide(s,'a','right');
  assert.equal(check.kind,'deliver');assert.equal(r.state.status,'won');assert.equal(r.state.successfulMoves,1);assert.equal(r.state.features.brakes[0].charges,1);assert.equal(r.events.filter(e=>e.type==='flower-turned').length,1);assert.deepEqual(check.to,{row:2,col:2});
});

test('each garden and gate fires at most once per gesture, bounding cyclic trajectories',()=>{
  const brakes=[[0,1,'down'],[1,1,'left'],[1,0,'up'],[0,0,'right']].map(([row,col,direction],i)=>({id:'turn'+i,row,col,width:1,height:1,charges:1,direction}));
  const l=fixture([tile('a',2,0,0),tile('b',2,2,3)],{features:{brakes}}),r=slide(E.createState(l),'a','right');
  assert.equal(r.events[0].turns.length,4);assert.ok(r.events[0].path.length<15);assert.deepEqual(r.events[0].to,{row:0,col:3});
});

test('reusable relay preserves direction, can merge remotely, and spends one move',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,2,3)],{moveLimit:1,features:{portals:[portal(undefined,undefined,{reusable:true})]}}),r=slide(E.createState(l),'a','right');
  assert.equal(r.state.status,'won');assert.equal(r.state.successfulMoves,1);assert.equal(r.state.features.portals[0].charges,1);assert.equal(r.events.filter(e=>e.type==='portal-used').length,1);assert.equal(r.events[0].kind,'deliver');
});

test('relay works in both directions on successive gestures without a charge reset',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,1,0),tile('peach',3,1,3)],{chainGoals:{fruit:{targetTier:4,count:1}},features:{portals:[portal(undefined,undefined,{reusable:true})]}});
  const first=slide(E.createState(l),'a','right'),back=slide(first.state,'a','left');assert.deepEqual(first.events[0].to,{row:2,col:3});assert.deepEqual(back.events[0].to,{row:0,col:0});assert.equal(back.state.features.portals[0].charges,1);
});

test('relay then garden then blast can resolve in one action, and undo restores the full transaction',()=>{
  const l=fixture([tile('a',2,0,0,'bomb'),tile('b',2,2,2),tile('peach',3,2,0)],{rows:4,mask:Array(4).fill('####'),chainGoals:{fruit:{targetTier:4,count:1}},features:{portals:[portal({row:0,col:1},{row:1,col:1},{reusable:true})],brakes:[{id:'turn',row:1,col:2,width:1,height:1,direction:'down',charges:1}],crates:[{id:'c',row:3,col:2,powder:true}]}}),game=new Session([l],memory()),before=E.clone(game.state),r=game.apply({type:'slide',tileId:'a',direction:'right'});
  assert.equal(r.events[0].kind,'upgrade');assert.equal(r.state.features.crates.length,0);for(const type of ['flower-turned','portal-used','blast-resolved'])assert.ok(r.events.some(e=>e.type===type));assert.equal(r.state.successfulMoves,1);game.undo();assert.deepEqual(game.state,before);
});

test('every redesigned variant needs each advertised mechanic, not merely a reference-route cameo',()=>{
  const {verifyLevel}=require('../tools/validate_v07_levels.cjs');for(const l of require('../web/slide-v07/levels.js').slice(14)){const r=verifyLevel(l);for(const v of r.variants)for(const m of l.requiredMechanics){assert.equal(v.ablations[m].status,'unsolvable');assert.equal(v.ablations[m].exhaustive,true);}}
});

test('content upgrade preserves earned level access while incompatible scores and runs reset',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,0,2)]),next={...l,id:'next'},store=memory();store.setItem('tile-explorer.slide.v07.best.v1',JSON.stringify({test:{hash:'old-layout',stars:3,score:500}}));store.setItem('tile-explorer.slide.v07.session.v1',JSON.stringify({levelId:'next',hash:'old-layout',variantId:'default',actions:[]}));
  const g=new Session([l,next],store);assert.equal(g.state.levelId,'next');assert.equal(g.restoreNotice,'updated');assert.equal(g.bestFor(l).stars,0);assert.equal(g.isUnlocked(next),true);assert.equal(new Session([l,next],store).state.levelId,'next');
});

test('mechanic demo has isolated progress and does not unlock the main campaign',()=>{
  const l=fixture([tile('a',2,0,0),tile('b',2,0,2)]),next={...l,id:'next'},store=memory(),demo=new Session([l,next],store,{demo:true});assert.equal(demo.start(next),true);demo.apply({type:'slide',tileId:'a',direction:'right'});const main=new Session([l,next],store);assert.equal(main.isUnlocked(next),false);assert.equal(main.bestFor(next).stars,0);
});

test('final showcase has a single gesture that relays, turns twice, merges and chain-blasts three crates',()=>{
  const l=require('../web/slide-v07/levels.js').at(-1);let s=E.createState(l),found=false;
  for(const a of l.referenceSolution){const r=E.applyAction(s,a);s=r.state;const e=r.events[0];if(e.bomb&&e.turns?.length===2&&e.transfers?.length===1&&e.removedCrateIds.length===3)found=true;}assert.equal(found,true);assert.equal(s.status,'won');
});
