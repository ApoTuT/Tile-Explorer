'use strict';
const fs=require('node:fs'),E=require('../web/slide-v07/engine.js'),S=require('../web/slide-v07/solver.js'),{analyze}=require('./v07_difficulty.cjs');
const {disable}=require('./redesign_v07_levels.cjs');
let seed;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/2**32),shuffle=a=>a.map(v=>[random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]);
const specs=[
  ['借位起手',4,4,{fruit:[0,0,1,2]},4,7,10],
  ['回字小径',4,4,{fruit:[0,0,1,2]},5,8,11],
  ['交错四角',4,4,{fruit:[1,1,1,1]},4,9,12],
  ['双线借道',4,4,{fruit:[1,1,2],plant:[1,1]},4,10,13],
  ['最后的停靠点',4,4,{fruit:[0,0,1,2,3]},4,11,14],
  ['竖向拥堵',4,5,{plant:[0,0,1,2]},5,12,15,{plant:{width:1,height:2}}],
  ['横车让路',4,5,{fruit:[1,1,2],car:[0,0]},6,13,16,{car:{width:2,height:1}}],
  ['大块留白',4,5,{fruit:[2,2],plant:[0,0,1]},3,13,16,{fruit:{width:2,height:2}}],
  ['双线换位',4,4,{fruit:[0,0,1,2],plant:[1,1]},4,14,17],
  ['三路争先',4,4,{fruit:[1,1],plant:[0,0,1],car:[0,0]},4,15,18],
  ['车道回旋',4,5,{fruit:[1,1,2],car:[0,0,1]},5,16,19,{car:{width:2,height:1}}],
  ['花园暗线',5,4,{fruit:[2,2],plant:[0,0,1,2]},4,16,20,{plant:{width:1,height:2}}],
  ['交换次序',4,4,{fruit:[1,1,2],plant:[0,0,1]},4,17,20],
  ['连锁之前',4,5,{fruit:[0,0,1,2,3],plant:[1,1]},7,18,21],
  ['隔墙爆点',4,6,{fruit:[0,0,1,2,3]},6,14,18,null,'bomb'],
  ['五苹果迷局',5,5,{fruit:[2,2,2,2,2,1,1]},8,18,22,null,'bomb'],
  ['爆破车道',4,6,{fruit:[1,1,2],car:[0,0,1]},5,19,23,{car:{width:2,height:1}},'bomb'],
  ['分段爆破',5,5,{fruit:[0,0,1,2,3]},8,20,24,null,'bomb'],
  ['交叉封锁',5,6,{fruit:[1,1,2,3],plant:[0,0,1]},11,21,25,null,'bomb'],
  ['转向迷廊',4,5,{fruit:[0,0,1,2]},7,16,20,null,'turn'],
  ['双弯换位',5,5,{fruit:[0,0,1,2,3]},11,20,24,null,'turn'],
  ['横车入弯',4,6,{car:[0,0,1],fruit:[1,1]},7,21,25,{car:{width:2,height:1}},'turn'],
  ['墙边转向',5,6,{fruit:[0,0,1,2,3]},11,22,26,null,'bomb-turn'],
  ['双链破局',5,6,{fruit:[1,1,2,3],plant:[1,1]},10,23,27,null,'bomb-turn'],
  ['跨区接应',4,6,{fruit:[0,0,1,2,3]},6,18,22,null,'portal'],
  ['出口调度',5,6,{fruit:[0,0,1,2,3],plant:[1,1]},11,23,27,null,'portal'],
  ['宽门窄路',5,7,{car:[0,0,1],fruit:[0,0,1,2]},11,24,28,{car:{width:2,height:1}},'portal'],
  ['异地引爆',5,7,{fruit:[0,0,1,2,3]},14,24,28,null,'bomb-portal'],
  ['回路接力',5,6,{fruit:[0,0,1,2,3]},10,25,29,null,'turn-portal'],
  ['终局调度',6,7,{fruit:[0,0,1,2,3]},17,26,30,null,'bomb-turn-portal']
].map(([title,rows,cols,inventory,rockCount,min,max,shapes,mechanics],i)=>({n:i+1,title,rows,cols,inventory,rockCount,min,max,shapes:shapes||{},mechanics:mechanics?.split('-')||[]}));
function make(spec,attempt){const {n,rows,cols}=spec;seed=20261025+n*100003+attempt*977;const positions=[];for(let row=0;row<rows;row++)for(let col=0;col<cols;col++)positions.push({row,col});
  const l={id:'slide07-'+String(n).padStart(2,'0'),title:spec.title,subtitle:'观察每次合成留下的空间，找到属于你的解法。',chapter:Math.ceil(n/5),rows,cols,mask:Array(rows).fill('#'.repeat(cols)),rocks:[],tiles:[],chainGoals:{},footprintByChain:spec.shapes,features:{crates:[],brakes:[],portals:[]},variants:[{id:'default',bombTileIds:[]}],moveLimit:40,parMoves:1,twoStarScore:1,threeStarScore:2,ruleset:E.RULESET,requiredMechanics:spec.mechanics};
  const used=new Set(),key=p=>p.row+','+p.col,addRock=p=>{l.rocks.push(p);used.add(key(p));},addCrate=p=>{l.features.crates.push({id:'crate-'+l.features.crates.length,...p,powder:true});used.add(key(p));};
  const split=spec.mechanics.includes('portal')&&spec.mechanics.includes('bomb')?2:Math.floor(cols/2);
  if(spec.mechanics.includes('bomb')&&!spec.mechanics.includes('portal'))for(let r=0;r<rows;r++)addCrate({row:r,col:split});
  if(spec.mechanics.includes('portal'))for(let r=0;r<rows;r++)addRock({row:r,col:split});
  if(spec.mechanics.includes('bomb')&&spec.mechanics.includes('portal'))for(let r=0;r<rows;r++)addCrate({row:r,col:cols-2});
  const available=shuffle(positions.filter(p=>!used.has(key(p))));for(const p of available.slice(0,spec.rockCount))addRock(p);
  const free=positions.filter(p=>!used.has(key(p)));if(free.length<5)return null;
  // Keep ordinary boards physically connected; portal/boom boards intentionally split.
  if(!spec.mechanics.includes('portal')&&!spec.mechanics.includes('bomb')){const seen=new Set(),q=[free[0]];for(let i=0;i<q.length;i++){const p=q[i];if(seen.has(key(p)))continue;seen.add(key(p));for(const d of Object.values(E.directions)){const next={row:p.row+d.row,col:p.col+d.col};if(E.walkable(l,next.row,next.col)&&!used.has(key(next))&&!seen.has(key(next)))q.push(next);}}if(seen.size!==free.length)return null;}
  let id=0;for(const [chain,tiers] of Object.entries(spec.inventory)){const mass=tiers.reduce((s,t)=>s+2**t,0),targetTier=Math.min(Math.log2(mass),chain==='fruit'?4:chain==='plant'?3:2);l.chainGoals[chain]={targetTier:Math.floor(targetTier),count:mass/2**Math.floor(targetTier)};
    // Five apples + two oranges intentionally deliver three peaches.
    if(n===16)l.chainGoals[chain]={targetTier:3,count:3};
    for(const tier of tiers){const t={id:'t'+(++id),itemId:chain+'-'+tier};const candidates=shuffle(free).filter(p=>E.cells(l,t,p).every(q=>E.walkable(l,q.row,q.col)&&!used.has(key(q))&&!E.tileAt(l,q.row,q.col)));if(!candidates.length)return null;l.tiles.push({...t,...candidates[0]});}}
  const terrainFree=(p,w,h)=>E.rectangle(p,{width:w,height:h}).every(q=>E.walkable(l,q.row,q.col)&&!used.has(key(q)));
  if(spec.mechanics.includes('turn')){const wide=n===22?{width:2,height:1}:{width:1,height:1};for(let i=0;i<(n>=21?2:1);i++){const p=shuffle(free).find(p=>terrainFree(p,wide.width,wide.height));if(!p)return null;l.features.brakes.push({id:'turn-'+i,...p,...wide,charges:1,direction:shuffle(Object.keys(E.directions))[0]});for(const q of E.rectangle(p,wide))used.add(key(q));}}
  if(spec.mechanics.includes('portal')){const wide=n===27?{width:2,height:1}:{width:1,height:1};const a=shuffle(free).find(p=>p.col<split&&terrainFree(p,wide.width,wide.height));if(!a)return null;for(const q of E.rectangle(a,wide))used.add(key(q));const b=shuffle(free).find(p=>p.col>split&&terrainFree(p,wide.width,wide.height));if(!b)return null;l.features.portals.push({id:'relay',...wide,a,b,charges:1,reusable:true});}
  if(spec.mechanics.includes('bomb')){const fruit=l.tiles.filter(t=>t.itemId.startsWith('fruit-'));l.variants[0].bombTileIds=[shuffle(fruit)[0].id];}
  if([19,24,27].includes(n)){const p=shuffle(free).find(p=>!used.has(key(p))&&!E.tileAt(l,p.row,p.col)&&!l.features.portals.some(g=>[g.a,g.b].some(e=>E.rectangle(e,g).some(q=>key(q)===key(p)))));if(!p)return null;l.obstacle={enabled:true,moveLimit:n===19?1:2,placementCells:[p]};}
  l.pattern=l.mask;return E.validateDefinition(l).ok?l:null;
}
function finish(l,rec,proof,spec,attempt){l.tiles=rec.tiles.map(t=>{const v={...t};delete v.effect;return v;});l.referenceSolution=rec.actions;l.parMoves=rec.shortestMoves;l.moveLimit=l.parMoves+(spec.n<15?5:4);
  const r=E.replay(l,l.referenceSolution),score=E.result(r.state,l);if(r.state.status!=='won')throw Error('Invalid recommendation');l.threeStarScore=score.score;l.twoStarScore=Math.max(1,score.score-250);l.scoreProofs=[{actions:l.referenceSolution,score:score.score,stars:3}];
  l.difficulty={edition:'challenge-1',minimumMoves:spec.min,optimalMoves:rec.shortestMoves,setupMoves:rec.setupMoves,decisionPoints:rec.decisionPoints,greedyTraps:rec.greedyTraps,maxSetupRun:rec.maxSetupRun,openingChoices:rec.openingChoices,openingOptimal:rec.openingOptimal,authorAttempt:attempt};return l;
}
function main(){fs.mkdirSync('.qa',{recursive:true});const file=process.env.V07_PROGRESS||'.qa/v07-challenge-authored.json',saved=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)):[];
  const from=Number(process.env.V07_FROM)||1,to=Number(process.env.V07_TO)||30;
  for(const spec of specs.filter(s=>s.n>=from&&s.n<=to)){if(saved[spec.n-1])continue;let best=0,accepted=null;
    for(let attempt=0;attempt<1200;attempt++){
      const l=make(spec,attempt);if(!l)continue;const fast=S.findSolution(E.createState(l),{maxStates:10000,maxMs:150,respectMoveLimit:false});if(fast.status!=='solved')continue;
      const proof=analyze(l,{recommend:true,minMoves:spec.min,maxMoves:spec.max,minChoices:Math.min(7,Math.floor(spec.n/4)+2),minSetup:Math.floor(spec.min*.55),maxStates:140000,maxMs:7000});
      if(proof.status==='unverified')continue;const rec=proof.recommendation;if(proof.shortestMoves>best){best=proof.shortestMoves;console.log('Level '+spec.n+' attempt '+attempt+' initial '+best+' states '+proof.states);}
      if(!rec)continue;if(l.obstacle&&!rec.actions.some(a=>a.type==='move-obstacle'))continue;const candidate=finish(l,rec,proof,spec,attempt);let meaningful=true;
      candidate.mechanicRequirements={};
      for(const m of spec.mechanics){const without=disable(candidate,m),test=S.findSolution(E.createState(without),{maxStates:120000,maxMs:2000,respectMoveLimit:false});
        if(test.status==='unsolvable'){candidate.mechanicRequirements[m]={kind:'spatial'};continue;}
        if(m==='turn'&&test.status==='solved'&&test.solution.filter(a=>a.type!=='place-obstacle').length>=candidate.parMoves+6){const exact=analyze(without,{maxStates:180000,maxMs:9000});if(exact.status==='solved'&&exact.shortestMoves>=candidate.parMoves+6){candidate.mechanicRequirements[m]={kind:'budget',withoutMoves:exact.shortestMoves,extraMoves:exact.shortestMoves-candidate.parMoves};continue;}}
        meaningful=false;break;}
      if(!meaningful)continue;accepted=candidate;console.log('ACCEPT '+spec.n+' '+JSON.stringify(candidate.difficulty)+' states '+proof.states);break;
    }
    if(!accepted)throw Error('No candidate '+spec.n+'; best initial '+best);saved[spec.n-1]=accepted;fs.writeFileSync(file,JSON.stringify(saved,null,2));
  }
  if(saved.length===30&&saved.every(Boolean))console.log('All 30 authored. Validate before publishing.');
}
module.exports={specs,make,finish};if(require.main===module)main();
