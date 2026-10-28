/* Complete spatial graph, explicit terrain/ability/delivery state, real kernel edges. */
'use strict';
const fs=require('node:fs'),E=require('../web/slide-v07/engine.js'),C=require('../web/slide-v07/content.js');
function proveSpatialSafety(level,{maxStates=900000,variantId,recommendStart=false,minMoves=1,maxMoves=17,requireFeatures=false}={}){
  const initial=E.createState(level,variantId),size=level.rows*level.cols,items=Object.keys(C.items),chains=Object.keys(level.chainGoals),dirs=Object.keys(E.directions);
  const features=initial.features,code=Object.fromEntries(items.map((id,i)=>[id,i+1]));
  const mask=(all,current)=>all.reduce((n,x,i)=>n+(current.some(y=>y.id===x.id)?2**i:0),0);
  function keyOf(s){const board=Array(size).fill(0);for(const t of s.tiles)board[t.row*level.cols+t.col]=code[t.itemId]+(t.effect==='bomb'?32:0);
    board.push(s.obstacle?.position?s.obstacle.position.row*level.cols+s.obstacle.position.col+1:0,s.obstacle?s.obstacle.moveLimit-s.obstacle.movesUsed:0,...chains.map(c=>s.delivered[c]),mask(features.crates,s.features.crates),...s.features.brakes.map(b=>b.charges),...s.features.portals.map(p=>p.charges));return String.fromCharCode(...board);}
  function stateOf(key){const tiles=[];for(let p=0;p<size;p++){const c=key.charCodeAt(p);if(c)tiles.push({id:'cell-'+p,itemId:items[(c&31)-1],row:Math.floor(p/level.cols),col:p%level.cols,...(c>32?{effect:'bomb'}:{})});}
    let n=size;const pos=key.charCodeAt(n++)-1,left=key.charCodeAt(n++),delivered={};for(const c of chains)delivered[c]=key.charCodeAt(n++);const crates=key.charCodeAt(n++);
    const f={crates:features.crates.filter((_,i)=>crates&(2**i)),brakes:features.brakes.map(b=>({...b,charges:key.charCodeAt(n++)})),portals:features.portals.map(p=>({...p,charges:key.charCodeAt(n++)}))};
    const obstacle=initial.obstacle?{...initial.obstacle,position:{row:Math.floor(pos/level.cols),col:pos%level.cols},movesUsed:initial.obstacle.moveLimit-left}:null;
    return {...initial,tiles,delivered,features:f,obstacle,status:tiles.length?'playing':'won'};
  }
  const roots=initial.status==='placing'?E.listLegalActions(initial).map(action=>({state:E.applyAction(initial,action,{recordTransaction:false}).state,action})):[{state:initial,action:null}];
  const nodes=roots.map(r=>keyOf(r.state)),indices=new Map(nodes.map((k,i)=>[k,i])),reverse=nodes.map(()=>[]),parent=nodes.map(()=>-1),via=nodes.map(()=>-1),depth=nodes.map(()=>0),wins=[],featureWins=[];
  const completeFeatures=s=>(!features.crates.length||s.features.crates.length<features.crates.length)&&s.features.brakes.every(b=>!b.charges)&&s.features.portals.every(p=>!p.charges);
  const encode=(s,a)=>a.type==='move-obstacle'?size*4+dirs.indexOf(a.direction):(s.tiles.find(t=>t.id===a.tileId).row*level.cols+s.tiles.find(t=>t.id===a.tileId).col)*4+dirs.indexOf(a.direction);
  const decode=(s,a)=>a>=size*4?{type:'move-obstacle',direction:dirs[a-size*4]}:{type:'slide',tileId:s.tiles.find(t=>t.row*level.cols+t.col===Math.floor(a/4)).id,direction:dirs[a%4]};
  let edges=0;
  for(let i=0;i<nodes.length;i++){
    if(nodes.length>maxStates)throw Error('unverified: graph exceeds '+maxStates+' states');const s=stateOf(nodes[i]);
    if(E.isWon(s)){wins.push(i);if(completeFeatures(s))featureWins.push(i);continue;}
    const distinct=new Set();for(const a of E.candidateActions(s)){const applied=E.applyAction(s,a,{ignoreMoveLimit:true,recordTransaction:false});if(!applied.ok)continue;
      const key=keyOf(applied.state);let j=indices.get(key);if(j===undefined){j=nodes.length;indices.set(key,j);nodes.push(key);reverse.push([]);parent.push(i);via.push(encode(s,a));depth.push(depth[i]+1);}
      if(!distinct.has(j)){distinct.add(j);reverse[j].push(i);edges++;}
    }
  }
  function distances(winners){const left=new Int32Array(nodes.length).fill(-1),queue=[...winners];for(const i of winners)left[i]=0;
    for(let n=0;n<queue.length;n++)for(const prev of reverse[queue[n]])if(left[prev]<0){left[prev]=left[queue[n]]+1;queue.push(prev);}return {left,count:queue.length};}
  const safety=distances(wins),target=distances(requireFeatures?featureWins:wins);
  function route(at,playing){const actions=[];while(target.left[at]>0){let chosen;for(const a of E.candidateActions(playing)){const r=E.applyAction(playing,a,{ignoreMoveLimit:true,recordTransaction:false});if(!r.ok)continue;const j=indices.get(keyOf(r.state));if(j!==undefined&&target.left[j]===target.left[at]-1){chosen={a,s:r.state,j};break;}}if(!chosen)throw Error('Missing witness');actions.push(chosen.a);playing=chosen.s;at=chosen.j;}return actions;}
  const placements=roots.map((r,i)=>({placement:r.action?{row:r.action.row,col:r.action.col}:null,shortestMoves:safety.left[i],withinBudget:safety.left[i]>=0&&safety.left[i]<=20,referenceSolution:target.left[i]>=0?[...(r.action?[r.action]:[]),...route(i,r.state)]:[]}));
  let recommendation=null;
  if(recommendStart&&safety.count===nodes.length){const materialKey=k=>[...k.slice(0,size)].sort().join(''),wanted=materialKey(nodes[0]),suffix=nodes[0].slice(size);let best=-1;
    for(let i=0;i<nodes.length;i++)if(nodes[i].slice(size)===suffix&&materialKey(nodes[i])===wanted&&target.left[i]>=minMoves&&target.left[i]<=maxMoves&&(best<0||target.left[i]>target.left[best]))best=i;
    if(best>=0){const pool=new Map();for(const t of initial.tiles){const k=t.itemId+(t.effect||'');if(!pool.has(k))pool.set(k,[]);pool.get(k).push(t.id);}const tiles=stateOf(nodes[best]).tiles.map(t=>({...t,id:pool.get(t.itemId+(t.effect||'')).shift()}));
      let s={...initial,tiles};const actions=[];if(initial.obstacle){const a={type:'place-obstacle',...roots[0].action};s=E.applyAction(s,a,{recordTransaction:false}).state;actions.push(a);}actions.push(...route(best,s));recommendation={tiles,referenceSolution:actions,referenceMoves:target.left[best]};}
  }
  return {ruleset:E.RULESET,variantId:initial.variantId,definitionHash:initial.definitionHash,states:nodes.length,edges,allReachableSolvable:safety.count===nodes.length,unwinnableStates:nodes.length-safety.count,shortestMoves:placements[0].shortestMoves,placements,recommendation};
}
function verifyLevel(level,options={}){
  if(level.difficulty?.edition==='gardens-1')return verifyGardenLevel(level,options);
  if(level.difficulty?.edition==='challenge-1')return verifyChallengeLevel(level,options);
  if(level.requiredMechanics)return verifyMechanicLevel(level);
  const variants=level.variants||[{id:'default'}],proofs=[];
  for(const v of variants){const resolved=E.resolveLevel(level,v.id),proof=proveSpatialSafety(resolved,{...options,variantId:v.id});
    if(!proof.allReachableSolvable||!proof.placements.every(p=>p.withinBudget))throw Error(level.id+'/'+v.id+': unsafe or exceeds budget');
    for(const p of proof.placements){const replay=E.replay(resolved,p.referenceSolution);if(replay.state.status!=='won'||replay.state.successfulMoves>20)throw Error('Placement witness '+level.id);}
    const played=E.replay(resolved,resolved.referenceSolution),r=E.result(played.state,resolved);if(played.state.status!=='won'||r.stars!==3)throw Error('Reference/stars '+level.id+'/'+v.id);
    const merges=played.events.filter(e=>['tile-upgraded','merged-and-delivered'].includes(e.type)).length,goals=Object.values(level.chainGoals).reduce((n,g)=>n+g.count,0);if(merges!==level.tiles.length-goals)throw Error('Merge invariant');
    for(const p of resolved.scoreProofs||[]){const a=E.replay(resolved,p.actions),score=E.result(a.state,resolved);if(a.state.status!=='won'||score.score!==p.score||score.stars!==p.stars)throw Error('Score replay');}
    const used={bomb:played.events.some(e=>e.type==='blast-resolved'&&e.removedIds.length),brake:played.events.some(e=>e.type==='brake-consumed'),portal:played.events.some(e=>e.type==='portal-used')};
    if(level.features?.crates?.length&&!used.bomb||level.features?.brakes?.length&&!used.brake||level.features?.portals?.length&&!used.portal)throw Error('Unused mechanism '+level.id);
    const {recommendation,...summary}=proof;proofs.push({...summary,referenceMoves:played.state.successfulMoves,score:r.score,stars:r.stars,merges,used});
  }return {id:level.id,title:level.title,variants:proofs};
}
function verifyChallengeLevel(level,options={}){
  const {analyze}=require('./v07_difficulty.cjs'),{disable}=require('./redesign_v07_levels.cjs'),S=require('../web/slide-v07/solver.js');
  const proof=analyze(level,{maxStates:300000,maxMs:90000,...options});if(proof.status!=='solved'||!proof.exhaustive)throw Error('Unverified challenge '+level.id);
  const d=level.difficulty;if(proof.shortestMoves!==d.optimalMoves||proof.shortestMoves<d.minimumMoves)throw Error('Shortcut/difficulty regression '+level.id);
  if(proof.shortestMoves>level.moveLimit||proof.witness.setupMoves<Math.floor(d.minimumMoves*.55)||proof.witness.decisionPoints<Math.min(7,Math.floor(Number(level.id.slice(-2))/4)+2))throw Error('Missing planning depth '+level.id);
  const played=E.replay(level,level.referenceSolution),score=E.result(played.state,level);if(played.state.status!=='won'||played.state.successfulMoves!==proof.shortestMoves||score.stars!==3)throw Error('Challenge reference '+level.id);
  for(const p of level.scoreProofs||[]){const r=E.replay(level,p.actions),s=E.result(r.state,level);if(r.state.status!=='won'||s.score!==p.score||s.stars!==p.stars)throw Error('Challenge score '+level.id);}
  const ablations={};for(const m of level.requiredMechanics){const without=disable(level,m);if(level.mechanicRequirements?.[m]?.kind==='budget'){const r=analyze(without,{maxStates:300000,maxMs:90000});if(!r.exhaustive||r.status!=='solved'||r.shortestMoves<proof.shortestMoves+6||r.shortestMoves<=level.moveLimit)throw Error('Mechanic not necessary within budget '+level.id);ablations[m]={status:'exceeds-budget',exhaustive:true,withoutMoves:r.shortestMoves,extraMoves:r.shortestMoves-proof.shortestMoves,states:r.states};}else{const r=S.findSolution(E.createState(without),{maxStates:300000,maxMs:30000,respectMoveLimit:false});if(r.status!=='unsolvable')throw Error('Optional/unverified mechanic '+level.id+' '+m+' '+r.status);ablations[m]={status:r.status,exhaustive:true,visited:r.visited};}}
  const {actions,steps,...planning}=proof.witness;return {id:level.id,title:level.title,variants:[{ruleset:E.RULESET,variantId:'default',definitionHash:E.definitionHash(E.resolveLevel(level)),exhaustive:true,states:proof.states,edges:proof.edges,shortestMoves:proof.shortestMoves,referenceMoves:played.state.successfulMoves,moveLimit:level.moveLimit,score:score.score,stars:score.stars,planning,ablations,unwinnableStates:proof.unwinnableStates,decisionSteps:steps}]};
}
function verifyMechanicLevel(level){
  const {disable,search}=require('./redesign_v07_levels.cjs'),variants=[];
  for(const v of level.variants){const resolved=E.resolveLevel(level,v.id),played=E.replay(resolved,resolved.referenceSolution),r=E.result(played.state,resolved);
    if(played.state.status!=='won'||played.state.successfulMoves>20||r.stars!==3)throw Error('Invalid witness '+level.id+'/'+v.id);
    for(const p of resolved.scoreProofs||[]){const done=E.replay(resolved,p.actions),score=E.result(done.state,resolved);if(done.state.status!=='won'||score.score!==p.score||score.stars!==p.stars)throw Error('Score proof '+level.id);}
    const used={bomb:played.events.some(e=>e.type==='blast-resolved'&&e.removedIds.length),turn:played.events.some(e=>e.type==='flower-turned'),portal:played.events.some(e=>e.type==='portal-used')},ablations={};
    for(const mechanic of level.requiredMechanics){if(!used[mechanic])throw Error('Unused '+mechanic+' '+level.id);const counterfactual=search(disable(level,mechanic),v.id);
      if(counterfactual.status!=='unsolvable')throw Error('Mechanic optional or unverified: '+level.id+' '+mechanic+' '+counterfactual.status);
      ablations[mechanic]={status:'unsolvable',exhaustive:true,moveBudgetIgnored:true,visited:counterfactual.visited};}
    variants.push({ruleset:E.RULESET,variantId:v.id,definitionHash:E.definitionHash(resolved),initialSolvable:true,referenceMoves:played.state.successfulMoves,score:r.score,stars:r.stars,used,ablations,
      blastCrates:played.events.filter(e=>e.type==='blast-resolved').map(e=>e.removedIds.length),turns:played.events.filter(e=>e.type==='flower-turned').length,transfers:played.events.filter(e=>e.type==='portal-used').length});
  }return {id:level.id,title:level.title,variants};
}
function verifyGardenLevel(level,options={}){
  const {split}=require('./v07_regions.cjs'),{analyze}=require('./v07_difficulty.cjs'),{disable}=require('./redesign_v07_levels.cjs');
  const rooms=split(level),proofs=rooms.map(({room,level:l})=>{const p=analyze(l,{maxStates:300000,maxMs:90000,...options});if(p.status!=='solved'||!p.exhaustive||p.shortestMoves!==room.minimumMoves)throw Error('Unverified room '+l.id);return {id:room.id,title:room.title,level:l,proof:p};});
  const minimum=proofs.reduce((sum,p)=>sum+p.proof.shortestMoves,0);if(minimum!==level.difficulty.optimalMoves||minimum!==level.parMoves||minimum>level.moveLimit)throw Error('Incorrect sum '+level.id);
  const played=E.replay(level,level.referenceSolution),score=E.result(played.state,level);if(played.state.status!=='won'||played.state.successfulMoves!==minimum||score.stars!==3)throw Error('Garden reference '+level.id);
  const ablations={};for(const m of level.requiredMechanics){let witness;for(const {level:l} of proofs){if(m==='bomb'&&!l.tiles.some(t=>t.effect==='bomb')||m==='turn'&&!l.features.brakes.length||m==='portal'&&!l.features.portals.length)continue;const p=analyze(disable(l,m),{maxStates:300000,maxMs:90000,...options});if(p.status==='unsolvable'&&p.exhaustive){witness={room:l.id,status:'unsolvable',exhaustive:true,states:p.states};break;}}if(!witness)throw Error('Optional/unverified mechanic '+level.id+' '+m);ablations[m]=witness;}
  for(const p of level.scoreProofs){const r=E.replay(level,p.actions),s=E.result(r.state,level);if(s.score!==p.score||s.stars!==p.stars)throw Error('Garden score '+level.id);}
  return {id:level.id,title:level.title,variants:[{ruleset:E.RULESET,variantId:'default',definitionHash:E.definitionHash(E.resolveLevel(level)),proof:'sealed-region-sum',shortestMoves:minimum,referenceMoves:played.state.successfulMoves,moveLimit:level.moveLimit,score:score.score,stars:score.stars,ablations,regions:proofs.map(({id,title,proof:p})=>({id,title,exhaustive:p.exhaustive,states:p.states,edges:p.edges,shortestMoves:p.shortestMoves,unwinnableStates:p.unwinnableStates,planning:{setupMoves:p.witness.setupMoves,decisionPoints:p.witness.decisionPoints,greedyTraps:p.witness.greedyTraps,maxSetupRun:p.witness.maxSetupRun}}))}]};
}
function main(){const levels=require('../web/slide-v07/levels.js'),report={ruleset:E.RULESET,scoring:E.SCORING,method:'Exact reverse BFS on each complete spatial graph, using the shipped engine. For sealed multi-room gardens, verify all geometric and portal separations, prove every room, and sum exact distances. Replay the whole-board witness and scoring. Disabling each advertised mechanic must make at least one sealed room exhaustively unsolvable even without the move budget. Timeout means unverified, never proof. Undo permits recovery from wrong choices.',levels:[]};
  for(const l of levels){process.stderr.write('Proving '+l.id+' '+l.title+'\n');report.levels.push(verifyLevel(l));}
  report.ok=report.levels.length===30;if(!report.ok)throw Error('Expected 30 levels');if(process.argv.includes('--write'))fs.writeFileSync('docs/technical/v0.7-challenge-level-report.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));return report;
}
module.exports={proveSpatialSafety,verifyLevel};if(require.main===module)main();
