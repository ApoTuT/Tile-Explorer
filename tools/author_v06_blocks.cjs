/* Deterministic authoring: real transitions, complete spatial safety. */
'use strict';
const fs=require('node:fs'),E=require('../web/slide-v06/engine.js'),{proveSpatialSafety}=require('./validate_v06_levels.cjs');
const old=require('../web/slide-v06/levels.js');
let seed=6062401;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/2**32);
const shuffle=a=>a.map(x=>[random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
const specs=[
  {title:'爱心停车位',subtitle:'先放一块障碍，给两组水果安排停靠。',rows:3,cols:3,fruit:[0,0,1,0,0,1],goals:{fruit:{targetTier:2,count:2}},quota:0,min:7},
  {title:'横块先让路',subtitle:'横着的车占两格，先留好整条通路。',rows:3,cols:4,fruit:[0,0,1],car:[0,0,1],shapes:{car:{width:2,height:1}},goals:{fruit:{targetTier:2,count:1},car:{targetTier:2,count:1}},min:9},
  {title:'花园竖着长',subtitle:'竖块要整齐碰面，石块也能成为接应点。',rows:4,cols:3,fruit:[0,0,1],plant:[0,0,1],shapes:{plant:{width:1,height:2}},goals:{fruit:{targetTier:2,count:1},plant:{targetTier:2,count:1}},quota:0,min:9},
  {title:'小鸟换个停点',subtitle:'每次挪动一格，把障碍的机会留给苹果。',rows:3,cols:4,fruit:[0,0,0,0,0,0,0,0],goals:{fruit:{targetTier:3,count:1}},quota:1,min:8},
  {title:'大块的转身空间',subtitle:'四格大块不能挤过窄口，小块先腾出位置。',rows:4,cols:4,fruit:[0,0],plant:[0,0,1,2],shapes:{fruit:{width:2,height:2}},goals:{fruit:{targetTier:1,count:1},plant:{targetTier:3,count:1}},quota:2,min:8},
  {title:'双心倒着想',subtitle:'先想桃子在哪儿相遇，再安排横块让路。',rows:3,cols:4,fruit:[0,0,1,2,3],car:[0,0],shapes:{car:{width:2,height:1}},goals:{fruit:{targetTier:4,count:1},car:{targetTier:1,count:1}},min:12},
  {title:'凤凰归巢',subtitle:'先让种子成长腾出通路，再把两颗大桃子送到一起。',rows:4,cols:4,fruit:[3,3],plant:[0,0,0,0,2],shapes:{fruit:{width:2,height:2}},goals:{fruit:{targetTier:4,count:1},plant:{targetTier:3,count:1}},quota:3,min:10}
];
function make(spec,index){
  seed=6062401+index*10000;
  const level={id:'slide06-'+String(index+1).padStart(2,'0'),title:spec.title,subtitle:spec.subtitle,rows:spec.rows,cols:spec.cols,mask:Array(spec.rows).fill('#'.repeat(spec.cols)),rocks:[],tiles:[],chainGoals:spec.goals,footprintByChain:spec.shapes||{},pattern:old[index].pattern,moveLimit:20,parMoves:1,twoStarScore:1,threeStarScore:2,ruleset:E.RULESET};
  const positions=[];for(let row=0;row<level.rows;row++)for(let col=0;col<level.cols;col++)positions.push({row,col});
  let best=null;
  for(let attempt=0;attempt<10;attempt++){
    level.tiles=[];let serial=0;
    for(const chain of Object.keys(spec.goals))for(const tier of spec[chain]){
      const t={id:'t'+(++serial),itemId:chain+'-'+tier},p=shuffle(positions).find(p=>E.cells(level,t,p).every(q=>E.walkable(level,q.row,q.col)&&!E.tileAt(level,q.row,q.col)));
      if(!p)break;level.tiles.push({...t,...p});
    }
    const empty=positions.filter(p=>!E.tileAt(level,p.row,p.col));
    if(spec.quota!==undefined){if(!empty.length)continue;level.obstacle={enabled:true,moveLimit:spec.quota,placementCells:[shuffle(empty)[0]]};}
    if(!E.validateDefinition(level).ok)continue;
    let proof;try{proof=proveSpatialSafety(level,{recommendStart:true,maxStartMoves:Math.min(18,spec.min+4),maxStates:600000});}catch(err){process.stderr.write(index+1+': '+err.message+'\n');continue;}
    if(!proof.allReachableSolvable){process.stderr.write(index+1+': rejected '+proof.unwinnableStates+' dead ends\n');continue;}
    const candidate=E.clone(level);candidate.tiles=proof.recommendedTiles;candidate.parMoves=proof.recommendedShortestMoves;candidate.referenceSolution=proof.recommendedSolution;candidate.design={withoutObstacleMoves:proof.recommendedWithoutObstacleMoves};
    if(candidate.obstacle){const p=candidate.referenceSolution[0];candidate.obstacle.placementCells=[{row:p.row,col:p.col}];
      for(const q of positions){if(candidate.obstacle.placementCells.length>=3)break;if(E.tileAt(candidate,q.row,q.col)||candidate.obstacle.placementCells.some(x=>x.row===q.row&&x.col===q.col))continue;
        try{const checked=proveSpatialSafety({...candidate,obstacle:{...candidate.obstacle,placementCells:[q]}},{maxStates:600000});if(checked.allReachableSolvable&&checked.placementProofs.every(p=>p.withinBudget))candidate.obstacle.placementCells.push(q);}catch(_){}
      }
    }
    const played=E.replay(candidate,candidate.referenceSolution).state;if(played.status!=='won')throw Error('Reference failed');
    const score=E.result(played,candidate).score;candidate.threeStarScore=score;candidate.twoStarScore=Math.max(1,score-150);candidate.scoreProofs=[{actions:candidate.referenceSolution,score,stars:3}];
    if(!best||candidate.parMoves>best.parMoves)best=candidate;
    process.stderr.write('Candidate '+(index+1)+' '+candidate.parMoves+' steps, '+proof.states+' states\n');
    if(best.parMoves>=spec.min)break;
  }
  if(!best)throw Error('No safe candidate '+(index+1));return best;
}
const levels=old.slice(0,3).map(l=>({...l,ruleset:E.RULESET}));
const saved=process.env.AUTHOR_RESUME&&fs.existsSync('.qa/v06-authored-progress.json')?JSON.parse(fs.readFileSync('.qa/v06-authored-progress.json')):[];
for(const [i,spec] of specs.entries()){levels.push(saved[i+3]||make(spec,i+3));fs.writeFileSync('.qa/v06-authored-progress.json',JSON.stringify(levels));}
fs.writeFileSync('web/slide-v06/levels.js','/* Authored layouts; complete spatial proofs and scoring replays. */\n(function(root){const levels='+JSON.stringify(levels,null,2)+';root.TileSlideV06={...(root.TileSlideV06||{}),levels};if(typeof module!=="undefined")module.exports=levels;})(globalThis);\n');
console.log(levels.map(l=>({title:l.title,par:l.parMoves,obstacle:l.obstacle?.moveLimit,shapes:l.footprintByChain})));
