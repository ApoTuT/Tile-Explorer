/* Exact spatial graph and shortest distances, using the shipped transition kernel.
 * Total move budget is ignored only while proving spatial distances. */
'use strict';
const E=require('../web/slide-v07/engine.js'),C=require('../web/slide-v07/content.js');
function analyze(level,{maxStates=180000,maxMs=20000,recommend=false,minMoves=1,maxMoves=40,minChoices=0,minSetup=0}={}){
  const started=Date.now();let initial=E.createState(level),placement=null;
  if(initial.status==='placing'){if(initial.obstacle.placementCells.length!==1)throw Error('Difficulty proof requires one explicit initial obstacle placement');placement={type:'place-obstacle',...initial.obstacle.placementCells[0]};initial=E.applyAction(initial,placement,{recordTransaction:false}).state;}
  const size=initial.rows*initial.cols,items=Object.keys(C.items),chains=Object.keys(initial.chainGoals),code=Object.fromEntries(items.map((k,i)=>[k,i+1])),dirs=Object.keys(E.directions),features=initial.features;
  const crateMask=s=>features.crates.reduce((n,c,i)=>n+(s.features.crates.some(x=>x.id===c.id)?2**i:0),0);
  function key(s){const a=Array(size).fill(0);for(const t of s.tiles)a[t.row*initial.cols+t.col]=code[t.itemId]+(t.effect==='bomb'?32:0);a.push(...chains.map(c=>s.delivered[c]),crateMask(s),...s.features.brakes.map(b=>b.charges),...s.features.portals.map(p=>p.charges));if(s.obstacle)a.push(s.obstacle.position.row*initial.cols+s.obstacle.position.col,s.obstacle.moveLimit-s.obstacle.movesUsed);return String.fromCharCode(...a);}
  function state(k){const tiles=[];for(let i=0;i<size;i++){const v=k.charCodeAt(i);if(v)tiles.push({id:'p'+i,itemId:items[(v&31)-1],row:Math.floor(i/initial.cols),col:i%initial.cols,...(v>32?{effect:'bomb'}:{})});}
    let i=size;const delivered=Object.fromEntries(chains.map(c=>[c,k.charCodeAt(i++)])),mask=k.charCodeAt(i++);
    const f={crates:features.crates.filter((_,n)=>mask&(2**n)),brakes:features.brakes.map(b=>({...b,charges:k.charCodeAt(i++)})),portals:features.portals.map(p=>({...p,charges:k.charCodeAt(i++)}))};let obstacle=null;
    if(initial.obstacle){const pos=k.charCodeAt(i++),left=k.charCodeAt(i++);obstacle={...initial.obstacle,position:{row:Math.floor(pos/initial.cols),col:pos%initial.cols},movesUsed:initial.obstacle.moveLimit-left};}
    return {...initial,tiles,delivered,obstacle,status:tiles.length?'playing':'won',features:f};
  }
  const keys=[key(initial)],ids=new Map([[keys[0],0]]),reverse=[[]],winners=[];let edges=0;
  for(let i=0;i<keys.length;i++){
    if(keys.length>maxStates||i%256===0&&Date.now()-started>maxMs)return {status:'unverified',states:keys.length,elapsedMs:Date.now()-started};
    const s=state(keys[i]);if(E.isWon(s)){winners.push(i);continue;}const distinct=new Set();
    for(const a of E.candidateActions(s)){const r=E.applyAction(s,a,{ignoreMoveLimit:true,recordTransaction:false});if(!r.ok)continue;const k=key(r.state);let j=ids.get(k);if(j===undefined){j=keys.length;keys.push(k);ids.set(k,j);reverse.push([]);}if(!distinct.has(j)){distinct.add(j);reverse[j].push(i);edges++;}}
  }
  const distance=new Int16Array(keys.length).fill(-1),queue=[...winners];for(const i of winners)distance[i]=0;
  for(let i=0;i<queue.length;i++)for(const prev of reverse[queue[i]])if(distance[prev]<0){distance[prev]=distance[queue[i]]+1;queue.push(prev);}
  const nexts=s=>{const distinct=new Map();for(const a of E.candidateActions(s)){const r=E.applyAction(s,a,{ignoreMoveLimit:true,recordTransaction:false});if(!r.ok)continue;const j=ids.get(key(r.state));if(j===undefined)throw Error('Graph missing transition');if(!distinct.has(j))distinct.set(j,{a,state:r.state,index:j,check:r.events[0],distance:distance[j]});}return [...distinct.values()];};
  function describe(at,playing){const actions=[],steps=[];let decisionPoints=0,greedyTraps=0,maxSetupRun=0,run=0,setupMoves=0,openingChoices=0,openingOptimal=0;
    while(distance[at]>0){const options=nexts(playing),optimal=options.filter(o=>o.distance===distance[at]-1);if(!actions.length){openingChoices=options.length;openingOptimal=optimal.length;}
      if(options.length>=3&&optimal.length<=Math.max(1,Math.floor(options.length*.4)))decisionPoints++;
      if(options.some(o=>o.check.resultId&&(o.distance<0||o.distance>=distance[at]))&&optimal.some(o=>!o.check.resultId))greedyTraps++;
      // Prefer a setup move on equal optimal routes, making planning evidence explicit.
      optimal.sort((a,b)=>Number(!!a.check.resultId)-Number(!!b.check.resultId));const chosen=optimal[0];if(!chosen)throw Error('No shortest witness');
      if(!chosen.check.resultId){setupMoves++;maxSetupRun=Math.max(maxSetupRun,++run);}else run=0;
      actions.push(chosen.a);steps.push({legalChoices:options.length,optimalChoices:optimal.length,remainingMoves:distance[at],kind:chosen.check.kind});playing=chosen.state;at=chosen.index;
    }return {actions,decisionPoints,greedyTraps,maxSetupRun,setupMoves,openingChoices,openingOptimal,steps};
  }
  const result={status:distance[0]<0?'unsolvable':'solved',exhaustive:true,states:keys.length,edges,unwinnableStates:keys.length-queue.length,shortestMoves:distance[0],elapsedMs:Date.now()-started};
  if(distance[0]>=0){result.witness=describe(0,initial);if(placement)result.witness.actions.unshift(placement);}
  if(recommend){const material=k=>[...k.slice(0,size)].sort().join(''),wanted=material(keys[0]),suffix=keys[0].slice(size),merges=initial.tiles.length-Object.values(initial.chainGoals).reduce((n,g)=>n+g.count,0),candidates=[];
    for(let i=0;i<keys.length;i++)if(distance[i]>=minMoves&&distance[i]<=maxMoves&&distance[i]-merges>=minSetup&&keys[i].slice(size)===suffix&&material(keys[i])===wanted)candidates.push(i);
    candidates.sort((a,b)=>distance[b]-distance[a]);let best=null;
    for(const at of candidates.slice(0,180)){const pool=new Map();for(const t of initial.tiles){const k=t.itemId+(t.effect||'');if(!pool.has(k))pool.set(k,[]);pool.get(k).push(t.id);}const tiles=state(keys[at]).tiles.map(t=>({...t,id:pool.get(t.itemId+(t.effect||'')).shift()})),s={...initial,tiles},detail=describe(at,s);
      if(detail.decisionPoints<minChoices)continue;const rank=distance[at]+detail.decisionPoints*.4+detail.greedyTraps*1.5+detail.maxSetupRun*.2;if(placement)detail.actions.unshift(placement);if(!best||rank>best.rank)best={rank,tiles,shortestMoves:distance[at],...detail};}
    result.recommendation=best;
  }return result;
}
module.exports={analyze};
