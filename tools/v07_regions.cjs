/* Prove product boards by their sealed rooms. Geometry is checked, never assumed. */
'use strict';
const assert=require('node:assert/strict'),E=require('../web/slide-v07/engine.js'),C=require('../web/slide-v07/content.js');
const contains=(r,p)=>p.row>=r.row&&p.row<r.row+r.rows&&p.col>=r.col&&p.col<r.col+r.cols;
function split(level){
  const l=E.resolveLevel(level),rooms=l.regions;
  assert.ok(rooms?.length>=2,'Expected partition');
  const owner=p=>rooms.filter(r=>contains(r,p));
  const solid=p=>!E.walkable(l,p.row,p.col)||l.rocks.some(q=>q.row===p.row&&q.col===p.col);
  for(let row=0;row<l.rows;row++)for(let col=0;col<l.cols;col++){
    const p={row,col},o=owner(p);assert.ok(o.length<=1,'Overlapping rooms');
    if(solid(p))continue;assert.equal(o.length,1,'Unowned open floor');
    for(const d of Object.values(E.directions)){const q={row:row+d.row,col:col+d.col};if(!solid(q))assert.equal(owner(q)[0]?.id,o[0].id,'Open inter-room crossing');}
  }
  for(const t of l.tiles){const o=owner(t)[0];assert.ok(o);assert.ok(E.cells(l,t).every(p=>contains(o,p)),'Tile crosses rooms');}
  for(const p of l.features.portals){const o=owner(p.a)[0];assert.ok(o&&contains(o,p.b),'Portal crosses rooms');for(const end of [p.a,p.b])assert.ok(E.rectangle(end,p).every(q=>contains(o,q)));}
  for(const b of l.features.brakes){const o=owner(b)[0];assert.ok(o&&E.rectangle(b).every(q=>contains(o,q)));}
  if(l.obstacle)assert.ok(l.obstacle.placementCells.every(p=>contains(owner(l.obstacle.placementCells[0])[0],p)));
  return rooms.map(room=>{
    const shift=p=>({...p,row:p.row-room.row,col:p.col-room.col}),tiles=l.tiles.filter(t=>contains(room,t)).map(shift),chainGoals={};assert.ok(tiles.length,'Empty puzzle room');
    for(const t of tiles){const c=C.items[t.itemId].chainId;chainGoals[c]??={targetTier:l.chainGoals[c].targetTier,count:0};chainGoals[c].count+=2**C.items[t.itemId].tier/2**chainGoals[c].targetTier;}
    const f=l.features,local={...E.clone(l),id:l.id+'/'+room.id,rows:room.rows,cols:room.cols,mask:l.mask.slice(room.row,room.row+room.rows).map(r=>r.slice(room.col,room.col+room.cols)),rocks:l.rocks.filter(p=>contains(room,p)).map(shift),tiles,chainGoals,
      features:{crates:f.crates.filter(p=>contains(room,p)).map(shift),brakes:f.brakes.filter(p=>contains(room,p)).map(shift),portals:f.portals.filter(p=>contains(room,p.a)).map(p=>({...p,a:shift(p.a),b:shift(p.b)}))},variants:[{id:'default',bombTileIds:[]}],variantId:'default'};
    delete local.regions;delete local.difficulty;
    if(l.obstacle?.placementCells.some(p=>contains(room,p)))local.obstacle={...l.obstacle,placementCells:l.obstacle.placementCells.map(shift)};else delete local.obstacle;
    assert.ok(E.validateDefinition(local).ok,E.validateDefinition(local).errors.join(','));return {room,level:local};
  });
}
module.exports={split,contains};
