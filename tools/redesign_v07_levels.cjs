/* Hand-authored spatial problems. Ship only when removing EACH named mechanic
 * makes the same board unsolvable, even with an unlimited move budget. */
'use strict';
const fs=require('node:fs'),E=require('../web/slide-v07/engine.js'),S=require('../web/slide-v07/solver.js');
const tile=(id,itemId,row,col)=>({id,itemId,row,col});
const apples=(...positions)=>positions.map(([row,col],i)=>tile('a'+i,'fruit-2',row,col));
const fruit=(id,tier,row,col)=>tile(id,'fruit-'+tier,row,col);
const crate=(row,col,i)=>({id:'wall-'+i,row,col,powder:true});
const turn=(row,col,direction,width=1,height=1,id='turn')=>({id,row,col,direction,width,height,charges:1});
const portal=(a,b,width=1,height=1)=>({id:'gate',a:{row:a[0],col:a[1]},b:{row:b[0],col:b[1]},width,height,charges:1,reusable:true});
const wall=(rows,col)=>Array.from({length:rows},(_,r)=>crate(r,col,r));
const rocks=positions=>positions.map(([row,col])=>({row,col}));
const g=(targetTier,count=1)=>({targetTier,count});
function level(n,title,subtitle,rows,cols,tiles,chainGoals,extra={}){
  const l={id:'slide07-'+String(n).padStart(2,'0'),title,subtitle,chapter:Math.ceil(n/5),rows,cols,mask:Array(rows).fill('#'.repeat(cols)),rocks:[],tiles,chainGoals,footprintByChain:{},moveLimit:20,parMoves:1,twoStarScore:1,threeStarScore:2,ruleset:E.RULESET,variants:[{id:'default',bombTileIds:[]}],...extra};
  l.features={crates:[],brakes:[],portals:[],...extra.features};l.pattern=l.mask;
  l.requiredMechanics=Object.entries({bomb:l.features.crates.length,turn:l.features.brakes.length,portal:l.features.portals.length}).filter(([,n])=>n).map(([k])=>k);return l;
}
function disable(l,mechanic){const copy=E.clone(l);if(mechanic==='bomb'){for(const t of copy.tiles)delete t.effect;for(const v of copy.variants)v.bombTileIds=[];}
  if(mechanic==='turn')copy.features.brakes=[];if(mechanic==='portal')copy.features.portals=[];return copy;}
const specs=[
  level(15,'一炸开一条路','把爆破苹果合到墙边，一次炸穿整排火药箱。',3,5,[...apples([0,0],[2,1]),fruit('peach',3,1,4)],{fruit:g(4)},
    {features:{crates:wall(3,2)},variants:[{id:'default',bombTileIds:['a0']}]}),
  level(16,'五颗苹果的缺口','两边都缺一个伙伴；先用爆破打通中间。',3,5,[...apples([0,0],[2,1],[0,3],[1,4],[2,3]),fruit('o1',1,0,1),fruit('o2',1,2,0)],{fruit:g(3,3)},
    {features:{crates:wall(3,2)},variants:[{id:'v1',bombTileIds:['a0']},{id:'v2',bombTileIds:['a1']}]}),
  level(17,'给跑车开路','水果负责拆墙，横向跑车借新通道会合。',4,6,[...apples([0,0],[2,1]),tile('c1','car-1',3,0),tile('c2','car-1',0,4)],{fruit:g(3),car:g(2)},
    {footprintByChain:{car:{width:2,height:1}},features:{crates:wall(4,2)},variants:[{id:'default',bombTileIds:['a0']}]}),
  level(18,'隔墙接力','先在墙边完成带爆破的升级，再去找另一颗桃子。',4,4,[fruit('o1',1,0,0),fruit('o2',1,1,1),fruit('a',2,0,3),fruit('p',3,3,2)],{fruit:g(4)},
    {features:{crates:Array.from({length:4},(_,c)=>crate(2,c,c))},variants:[{id:'v1',bombTileIds:['o1']},{id:'v2',bombTileIds:['o2']}]}),
  level(19,'十字爆破','把合成移到十字墙旁，让四个小房间连起来。',5,5,[...apples([0,0],[1,1]),fruit('p',3,4,4),tile('s1','plant-1',0,4),tile('s2','plant-1',4,0)],{fruit:g(4),plant:g(2)},
    {features:{crates:[...wall(5,2),crate(2,0,5),crate(2,1,6),crate(2,3,7),crate(2,4,8)]},variants:[{id:'default',bombTileIds:['a0']}]}),
  level(20,'拐个弯就碰面','沿箭头拐进中央缺口；花台可以反复使用。',3,5,apples([0,0],[2,4]),{fruit:g(3)},
    {rocks:rocks([[0,2],[2,2]]),features:{brakes:[turn(1,0,'right')]}}),
  level(21,'双弯接力','两次转向连成一条路线，合成可以在同一步完成。',3,5,apples([0,0],[2,4]),{fruit:g(3)},
    {rocks:rocks([[0,2],[2,2]]),features:{brakes:[turn(1,0,'right',1,1,'turn-a'),turn(1,4,'down',1,1,'turn-b')]}}),
  level(22,'大块也会拐弯','横向花台只接横块：先对齐，再沿箭头入弯。',4,7,[tile('c1','car-1',0,1),tile('c2','car-1',3,5)],{car:g(2)},
    {footprintByChain:{car:{width:2,height:1}},rocks:rocks([[0,3],[2,3],[3,3]]),features:{brakes:[turn(1,0,'right',2,1)]}}),
  level(23,'拐弯引爆','用花台把爆破牌送到墙边的合成点。',3,7,[...apples([0,0],[2,4]),fruit('p',3,2,6)],{fruit:g(4)},
    {rocks:rocks([[0,2],[2,2]]),features:{crates:wall(3,5),brakes:[turn(1,0,'right')]},variants:[{id:'default',bombTileIds:['a0']}]}),
  level(24,'先开路再入弯','爆破开通通道，再借花台穿过中央缺口。',3,7,[...apples([0,0],[2,1]),fruit('p',3,2,6)],{fruit:g(4)},
    {rocks:rocks([[0,4],[2,4]]),features:{crates:wall(3,2),brakes:[turn(1,0,'right')]},variants:[{id:'v1',bombTileIds:['a0']},{id:'v2',bombTileIds:['a1']}]}),
  level(25,'隔墙穿门','穿门后沿原方向继续滑，一步跨区合成。',3,5,apples([0,0],[2,4]),{fruit:g(3)},
    {rocks:rocks([[0,2],[1,2],[2,2]]),features:{portals:[portal([0,1],[2,3])]}}),
  level(26,'先让开出口','门两边都能用；先让开出口，再组织跨区接力。',3,5,[...apples([0,0],[2,4]),fruit('o1',1,2,3),fruit('o2',1,1,4),fruit('a2',2,0,4)],{fruit:g(3,2)},
    {rocks:rocks([[0,2],[1,2],[2,2]]),features:{portals:[portal([0,1],[2,3])]}}),
  level(27,'横跨双车道','整块穿过宽门，落地继续加速。',4,6,[tile('c1','car-0',0,0),tile('c2','car-0',2,4),tile('r','car-1',3,0)],{car:g(2)},
    {footprintByChain:{car:{width:2,height:1}},rocks:rocks([[0,3],[1,3],[2,3],[3,3]]),features:{portals:[portal([0,1],[2,4],2,1)]}}),
  level(28,'把爆破送过去','先穿门，再在另一侧引爆通往目标的墙。',4,6,[...apples([0,0],[2,3]),fruit('p',3,3,5)],{fruit:g(4)},
    {rocks:rocks([[0,2],[1,2],[2,2],[3,2]]),features:{crates:wall(4,4),portals:[portal([0,1],[0,3])]},variants:[{id:'default',bombTileIds:['a0']}]}),
  level(29,'穿门再转弯','传送保留方向，花台负责转向，连成跨区路线。',4,6,apples([0,0],[3,5]),{fruit:g(3)},
    {rocks:rocks([[0,2],[1,2],[2,2],[3,2],[1,3],[1,5]]),features:{portals:[portal([0,1],[0,3])],brakes:[turn(0,4,'down')]}}),
  level(30,'一滑三连','先准备合成点，再让爆破苹果穿门、转向、炸开封锁。',6,6,[...apples([5,0]),fruit('o1',1,2,3),fruit('o2',1,2,5),fruit('p',3,4,4)],{fruit:g(4)},
    {rocks:rocks([[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[1,3],[1,5]]),features:{portals:[portal([0,1],[0,3])],brakes:[turn(0,4,'down',1,1,'turn-a'),turn(2,4,'left',1,1,'turn-b')],crates:[crate(3,3,0),crate(3,4,1),crate(3,5,2)]},variants:[{id:'default',bombTileIds:['a0']}]})
];
function search(l,variantId){return S.findSolution(E.createState(l,variantId),{maxStates:500000,maxMs:30000,respectMoveLimit:false});}
function main(){const levels=require('../web/slide-v07/levels.js').slice(0,14),report=[];
  for(const l of specs){const data={id:l.id,variants:[]};console.log('Author '+l.id);
    for(const v of l.variants){const found=search(l,v.id);if(found.status!=='solved'||found.solution.length>20)throw Error(l.id+' '+v.id+' '+JSON.stringify(found));
      v.referenceSolution=found.solution;l.parMoves=Math.max(l.parMoves,found.solution.length);const tests={};
      for(const m of l.requiredMechanics){const ablation=search(disable(l,m),v.id);tests[m]={status:ablation.status,visited:ablation.visited,moves:ablation.solution?.length};}
      data.variants.push({id:v.id,moves:found.solution.length,tests});console.log(JSON.stringify(data.variants.at(-1)));
    }
    l.referenceSolution=l.variants[0].referenceSolution;let min=Infinity;
    for(const v of l.variants){const played=E.replay(l,v.referenceSolution,v.id),score=E.result(played.state,l).score;v.scoreProofs=[{actions:v.referenceSolution,score,stars:3}];min=Math.min(min,score);}
    l.threeStarScore=min;l.twoStarScore=Math.max(1,min-200);l.scoreProofs=l.variants[0].scoreProofs;report.push(data);levels.push(l);
  }
  fs.writeFileSync('.qa/v07-redesign-candidates.json',JSON.stringify({levels,report},null,2));
  if(report.some(r=>r.variants.some(v=>Object.values(v.tests).some(t=>t.status!=='unsolvable'))))throw Error('Optional mechanic: inspect candidates before publishing');
  fs.writeFileSync('web/slide-v07/levels.js','/* Thirty authored levels, with counterfactual mechanic proofs. */\n(function(root){const levels='+JSON.stringify(levels,null,2)+';root.TileSlideV07={...(root.TileSlideV07||{}),levels};if(typeof module!=="undefined")module.exports=levels;})(globalThis);\n');
}
module.exports={specs,disable,search,main};if(require.main===module)main();
