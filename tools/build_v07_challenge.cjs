'use strict';
const fs=require('node:fs'),E=require('../web/slide-v07/engine.js'),C=require('../web/slide-v07/content.js'),{analyze}=require('./v07_difficulty.cjs');
const seeds=require('./fixtures/v07-challenge-seeds.json');
const names=['借位起手','回字小径','交错四角','双线借道','最后的停靠点','竖向拥堵','横车让路','大块留白','双线换位','三路争先','车道回旋','花园暗线','交换次序','序章终局','封锁三庭','五苹果迷局','爆破车站','回廊深处','十字封园','转向庭院','双弯花园','宽车入弯','墙后花台','封锁回廊','跨区花园','出口调度','双车道接应','异地引爆','回路接力','终局花园'];
const copy=['先留好停靠点，再让材料碰面。','一条回字路，几次必要的让位。','相同的材料，也有不同的合成次序。','两条升级链争用同一条路。','提前收走伙伴，可能失去最后的停靠点。','长块需要完整的通道。','先为横向跑车留出转场空间。','大块占地多，空位要提前安排。','两条路线交织，先合哪个会改变后续位置。','三种材料互相挡路，也互相帮助停靠。','合成的位置，决定下一趟能走多远。','纵向通道里，需要连续准备才能会合。','眼前的合成，不一定是正确的下一步。','把两条升级链的顺序一起考虑。','两处庭院共享步数；爆破需要落在正确的墙边。','前庭的五颗苹果分居两侧，其余庭院也在等待调度。','炸出车道，再用可挪动障碍安排会合。','先拆封锁，再整理留下的通道。','十字封锁与双链调度，分别找到突破口。','前庭安排合成，后庭借花台穿过缺口。','双弯连接两侧，另一处庭院考验合成顺序。','宽花台只接宽车；为另一条升级链留下空间。','在墙边的正确位置完成转向和爆破。','先打开封锁，再借花台进入深处。','传送两端需要接应，双链庭院也要安排顺序。','门口调度与障碍停靠，共用有限的步数。','宽门连接车道，庭院里另有两条升级链。','把爆破送到异地，打开最后一片封锁。','穿门后的方向很重要，回廊里的次序也一样。','两处庭院、三种机关；先看清路线，再完成接力。'];
function resolved(source){const l=E.clone(E.resolveLevel(source));delete l.variantId;l.variants=[{id:'default',bombTileIds:[]}];if(l.obstacle){const a=l.referenceSolution.find(a=>a.type==='place-obstacle');l.obstacle.placementCells=[{row:a.row,col:a.col}];}return l;}
function normalize(parts){const targets={},shapes={};for(const l of parts)for(const [c,g] of Object.entries(l.chainGoals)){targets[c]=Math.max(targets[c]||0,g.targetTier);const f=l.footprintByChain?.[c]||{width:1,height:1};if(shapes[c]&&JSON.stringify(shapes[c])!==JSON.stringify(f))throw Error('Incompatible footprint '+c);shapes[c]=f;}
  for(const l of parts){for(const t of l.tiles){const it=C.items[t.itemId];t.itemId=C.item(it.chainId,it.tier+targets[it.chainId]-l.chainGoals[it.chainId].targetTier).id;}for(const [c,g] of Object.entries(l.chainGoals))g.targetTier=targets[c];}return shapes;}
function compose(n,sources){
  const parts=sources.map(resolved),shapes=normalize(parts),wide=parts.length===3,wideFirst=wide&&parts[0].cols>4,cols=wide?(wideFirst?Math.max(parts[0].cols,parts[1].cols+parts[2].cols+1):Math.max(parts[0].cols+parts[1].cols+1,parts[2].cols)):Math.max(...parts.map(p=>p.cols)),top=wide?(wideFirst?parts[0].rows:Math.max(parts[0].rows,parts[1].rows)):0,rows=wide?top+1+(wideFirst?Math.max(parts[1].rows,parts[2].rows):parts[2].rows):parts.reduce((s,p)=>s+p.rows,0)+parts.length-1;
  const l={id:'slide07-'+String(n).padStart(2,'0'),title:names[n-1],subtitle:copy[n-1],chapter:Math.ceil(n/5),rows,cols,mask:Array.from({length:rows},()=>Array(cols).fill('.')),rocks:[],tiles:[],chainGoals:{},footprintByChain:shapes,features:{crates:[],brakes:[],portals:[]},variants:[{id:'default',bombTileIds:[]}],moveLimit:200,parMoves:1,twoStarScore:1,threeStarScore:2,ruleset:E.RULESET,regions:[],requiredMechanics:[]};
  let row=0,route=[],par=0,planning={setupMoves:0,decisionPoints:0,greedyTraps:0,maxSetupRun:0};
  for(const [i,p] of parts.entries()){
    if(wide)row=wideFirst?(i===0?0:top+1):i===2?top+1:0;const col=wide?(wideFirst?(i===0?Math.floor((cols-p.cols)/2):i===1?0:parts[1].cols+1):(i===0?0:i===1?parts[0].cols+1:Math.floor((cols-p.cols)/2))):i%2?cols-p.cols:0,prefix='r'+i+'-',shift=q=>({...q,row:q.row+row,col:q.col+col}),entity=q=>({...shift(q),id:prefix+q.id});
    const proof=analyze(p,{maxStates:300000,maxMs:90000});if(proof.status!=='solved'||!proof.exhaustive)throw Error('Unverified room '+n+'/'+i);
    const room={id:'r'+i,title:i===0?'前庭':wide&&i===1?'侧庭':'后庭',row,col,rows:p.rows,cols:p.cols,minimumMoves:proof.shortestMoves};l.regions.push(room);
    for(let r=0;r<p.rows;r++)for(let c=0;c<p.cols;c++)l.mask[row+r][col+c]=p.mask[r][c];
    l.rocks.push(...p.rocks.map(shift));l.tiles.push(...p.tiles.map(entity));l.features.crates.push(...p.features.crates.map(entity));l.features.brakes.push(...p.features.brakes.map(entity));l.features.portals.push(...p.features.portals.map(g=>({...g,id:prefix+g.id,a:shift(g.a),b:shift(g.b)})));
    for(const [c,g] of Object.entries(p.chainGoals)){l.chainGoals[c]??={targetTier:g.targetTier,count:0};l.chainGoals[c].count+=g.count;}
    if(p.obstacle){if(l.obstacle)throw Error('Only one obstacle room allowed');const a=proof.witness.actions.find(a=>a.type==='place-obstacle');l.obstacle={...p.obstacle,placementCells:[shift(a)]};}
    route.push(...proof.witness.actions.map(a=>a.type==='slide'?{...a,tileId:prefix+a.tileId}:a.type==='place-obstacle'?shift(a):a));par+=proof.shortestMoves;
    for(const k of ['setupMoves','decisionPoints','greedyTraps'])planning[k]+=proof.witness[k];planning.maxSetupRun=Math.max(planning.maxSetupRun,proof.witness.maxSetupRun);
    l.requiredMechanics.push(...(p.requiredMechanics||[]));row+=p.rows;
    if(!wide&&i<parts.length-1){for(let c=0;c<cols;c++){l.mask[row][c]='#';l.rocks.push({row,col:c});}row++;}
  }
  if(wide){for(let c=0;c<cols;c++){l.mask[top][c]='#';l.rocks.push({row:top,col:c});}for(let r=wideFirst?top+1:0;r<(wideFirst?rows:top);r++){const c=parts[wideFirst?1:0].cols;l.mask[r][c]='#';l.rocks.push({row:r,col:c});}}
  l.mask=l.mask.map(r=>r.join(''));l.pattern=l.mask;l.requiredMechanics=[...new Set(l.requiredMechanics)];
  // Placement belongs to the whole board's initial phase, even when its room is played second.
  l.referenceSolution=[...route.filter(a=>a.type==='place-obstacle'),...route.filter(a=>a.type!=='place-obstacle')];l.parMoves=par;l.moveLimit=par+(n<20?6:7);
  const r=E.replay(l,l.referenceSolution),score=E.result(r.state,l);if(r.state.status!=='won')throw Error('Composition failed '+n);l.threeStarScore=score.score;l.twoStarScore=Math.max(1,score.score-300);l.scoreProofs=[{actions:l.referenceSolution,score:score.score,stars:3}];
  l.difficulty={edition:'gardens-1',proof:'sealed-region-sum',minimumMoves:par,optimalMoves:par,...planning};return l;
}
function main(){
  const rooms=require('./fixtures/v07-planning-rooms.json'),sides=require('./fixtures/v07-side-rooms.json'),old=Object.fromEntries(seeds.mechanics.map(l=>[Number(l.id.slice(-2)),l])),hard=seeds.hard;
  const pairs={15:[hard[15],hard[1]],16:[hard[16],hard[3]],17:[hard[17],old[12]],18:[hard[18],hard[4]],19:[rooms[19],old[19]],20:[rooms[20],old[20]],21:[rooms[21],old[21]],22:[rooms[22],old[22]],23:[rooms[23],old[23]],24:[rooms[24],old[24]],25:[hard[25],hard[9]],26:[hard[26],old[7]],27:[rooms[27],old[27]],28:[rooms[28],old[28]],29:[rooms[29],old[29]],30:[rooms[30],old[30]]};
  const levels=[];for(let n=1;n<=30;n++){process.stderr.write('Build '+n+'\n');let l;if(n<15){l=E.clone(n===14?rooms[14]:hard[n]);Object.assign(l,{id:'slide07-'+String(n).padStart(2,'0'),title:names[n-1],subtitle:copy[n-1],chapter:Math.ceil(n/5)});}else {const aux=sides[n];l=compose(n,[pairs[n][0],aux,pairs[n][1]]);l.subtitle=l.subtitle.replaceAll('两处','三处').replaceAll('双庭','三庭');}levels.push(l);}
  fs.writeFileSync('web/slide-v07/levels.js','/* Thirty challenge gardens; exact room distances and checked separations. */\n(function(root){const levels='+JSON.stringify(levels,null,2)+';root.TileSlideV07={...(root.TileSlideV07||{}),levels};if(typeof module!=="undefined")module.exports=levels;})(globalThis);\n');
}
module.exports={compose,main};if(require.main===module)main();
