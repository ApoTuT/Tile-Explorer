/* Complete spatial graph proofs. Move budgets are checked separately by replay. */
'use strict';
const fs=require('node:fs'),E=require('../web/slide-v06/engine.js'),C=require('../web/slide-v06/content.js');

/** Enumerate every spatial state with the shipped transition kernel, then follow
 * edges backwards from completion. Score, tile identity and elapsed moves do not
 * affect spatial reachability. Material mass uniquely determines deliveries.
 * Ignore the move budget here: budget exhaustion is not a broken board layout. */
function proveSpatialSafety(level,{maxStates=600000,onProgress=()=>{},recommendStart=false}={}){
  const valid=E.validateDefinition(level);if(!valid.ok)throw Error(level.id+': '+valid.errors.join(','));
  const initial=E.createState(level),itemIds=Object.keys(C.items),itemCode=new Map(itemIds.map((id,i)=>[id,i+1]));
  const size=level.rows*level.cols,chainIds=Object.keys(level.chainGoals),directions=Object.keys(E.directions);
  const keyOf=s=>{const board=Array(size).fill(0);for(const t of s.tiles)board[t.row*level.cols+t.col]=itemCode.get(t.itemId);return String.fromCharCode(...board);};
  function stateOf(key){
    const tiles=[],mass=Object.fromEntries(chainIds.map(id=>[id,0]));
    for(let p=0;p<size;p++){const code=key.charCodeAt(p);if(!code)continue;const item=C.items[itemIds[code-1]];
      tiles.push({id:'cell-'+p,itemId:item.id,row:Math.floor(p/level.cols),col:p%level.cols});mass[item.chainId]+=2**item.tier;}
    const delivered={};for(const id of chainIds){const g=level.chainGoals[id];delivered[id]=g.count-mass[id]/2**g.targetTier;
      if(!Number.isInteger(delivered[id])||delivered[id]<0||delivered[id]>g.count)throw Error('Material invariant '+level.id);}
    return {...initial,tiles,delivered,status:tiles.length?'playing':'won'};
  }
  const first=keyOf(initial),nodes=[first],indices=new Map([[first,0]]),reverse=[[]],parent=[-1],via=[-1],depth=[0],winners=[];
  let checkedKernelTransitions=0,spatialEdges=0,shortestMoves=null;
  for(let i=0;i<nodes.length;i++){
    if(nodes.length>maxStates)throw Error('Spatial graph exceeds '+maxStates+' states: '+level.id+' (proof incomplete)');
    const state=stateOf(nodes[i]);
    if(E.isWon(state)){winners.push(i);if(shortestMoves===null)shortestMoves=depth[i];continue;}
    const distinct=new Set();
    for(const tile of state.tiles)for(let d=0;d<directions.length;d++){
      const action={type:'slide',tileId:tile.id,direction:directions[d]};
      const applied=E.applyAction(state,action,{ignoreMoveLimit:true,recordTransaction:false});if(!applied.ok)continue;
      checkedKernelTransitions++;
      if(applied.state.status==='lost')throw Error('Move budget leaked into spatial proof: '+level.id);
      const key=keyOf(applied.state);let j=indices.get(key);
      if(j===undefined){j=nodes.length;indices.set(key,j);nodes.push(key);reverse.push([]);parent.push(i);via.push((tile.row*level.cols+tile.col)*4+d);depth.push(depth[i]+1);}
      if(!distinct.has(j)){distinct.add(j);reverse[j].push(i);spatialEdges++;}
    }
    if(i%10000===0)onProgress({visited:i,discovered:nodes.length});
  }
  const remaining=new Int32Array(nodes.length).fill(-1),queue=[...winners];for(const win of winners)remaining[win]=0;
  let worstRemainingMoves=0;for(let n=0;n<queue.length;n++)for(const prev of reverse[queue[n]])if(remaining[prev]===-1){
    remaining[prev]=remaining[queue[n]]+1;worstRemainingMoves=Math.max(worstRemainingMoves,remaining[prev]);queue.push(prev);}
  const encoded=[];if(winners.length){let n=winners[0];while(parent[n]!==-1){encoded.push(via[n]);n=parent[n];}encoded.reverse();}
  let replay=initial;const shortestSolution=[];for(const move of encoded){const pos=Math.floor(move/4),tile=replay.tiles.find(t=>t.row===Math.floor(pos/level.cols)&&t.col===pos%level.cols);
    if(!tile)throw Error('Shortest witness tile missing: '+level.id);const action={type:'slide',tileId:tile.id,direction:directions[move%4]};
    const applied=E.applyAction(replay,action,{ignoreMoveLimit:true,recordTransaction:false});if(!applied.ok)throw Error('Shortest witness rejected: '+level.id);shortestSolution.push(action);replay=applied.state;}
  if(winners.length&&(!E.isWon(replay)||shortestSolution.length!==shortestMoves))throw Error('Shortest witness failed: '+level.id);
  const recommendation={};
  if(recommendStart){
    // The opening materials remain exact: this changes placement, never the
    // number of required upgrades or the resource balance of any chain.
    const materialKey=key=>[...key].sort().join(''),wanted=materialKey(first);let best=0;
    for(let i=0;i<nodes.length;i++)if(remaining[i]>remaining[best]&&materialKey(nodes[i])===wanted)best=i;
    const ids=new Map();for(const tile of initial.tiles){if(!ids.has(tile.itemId))ids.set(tile.itemId,[]);ids.get(tile.itemId).push(tile.id);}
    const recommendedTiles=stateOf(nodes[best]).tiles.map(tile=>({...tile,id:ids.get(tile.itemId).shift()}));
    let playing={...initial,tiles:recommendedTiles.map(tile=>({...tile}))},at=best;const recommendedSolution=[];
    while(remaining[at]>0){
      let selected;
      for(const tile of playing.tiles){
        for(const direction of directions){const action={type:'slide',tileId:tile.id,direction},applied=E.applyAction(playing,action,{ignoreMoveLimit:true,recordTransaction:false});
          if(!applied.ok)continue;const next=indices.get(keyOf(applied.state));
          if(next!==undefined&&remaining[next]===remaining[at]-1){selected={action,state:applied.state,next};break;}}
        if(selected)break;
      }
      if(!selected)throw Error('Recommended shortest witness missing: '+level.id);
      recommendedSolution.push(selected.action);playing=selected.state;at=selected.next;
    }
    if(!E.isWon(playing)||recommendedSolution.length!==remaining[best])throw Error('Recommended shortest witness failed: '+level.id);
    Object.assign(recommendation,{recommendedTiles,recommendedSolution,recommendedShortestMoves:remaining[best]});
  }
  return {initialSolvable:winners.length>0,allReachableSolvable:queue.length===nodes.length,unwinnableStates:nodes.length-queue.length,
    reachableStates:nodes.length,states:nodes.length,spatialEdges,checkedKernelTransitions,shortestMoves,shortest:shortestMoves,
    worstRemainingMoves:queue.length?worstRemainingMoves:null,shortestSolution,spatialMoveLimitIgnored:true,kernel:E.RULESET,...recommendation};
}

function verifyLevel(level,options={}){
  const graph=proveSpatialSafety(level,options);
  if(!graph.initialSolvable||!graph.allReachableSolvable)throw Error('Reachable dead ends: '+level.id+' '+graph.unwinnableStates+'/'+graph.states);
  const reference=E.replay(level,level.referenceSolution),result=E.result(reference.state,level);
  if(reference.state.status!=='won'||result.stars!==3)throw Error('Invalid three-star reference: '+level.id);
  if(reference.state.successfulMoves>level.moveLimit)throw Error('Reference exceeds move limit: '+level.id);
  const goals=Object.values(level.chainGoals).reduce((n,g)=>n+g.count,0),merges=reference.transactions.filter(t=>t.after.tiles.length<t.before.tiles.length).length;
  if(merges!==level.tiles.length-goals)throw Error('Merge count: '+level.id);
  const scoreProofs=level.scoreProofs.map(proof=>{
    const played=E.replay(level,proof.actions),actual=E.result(played.state,level);
    if(played.state.status!=='won'||actual.score!==proof.score||actual.stars!==proof.stars||played.state.successfulMoves>level.moveLimit)throw Error('Score proof: '+level.id);
    return {moves:played.state.successfulMoves,score:actual.score,stars:actual.stars};
  });
  if(!scoreProofs.some(p=>p.stars===3))throw Error('Missing three-star score proof: '+level.id);
  const {shortestSolution,...summary}=graph;
  return {id:level.id,title:level.title,definitionHash:E.definitionHash(level),...summary,moveLimit:level.moveLimit,
    referenceMoves:reference.state.successfulMoves,referenceWithinMoveLimit:true,mergeCount:merges,score:result.score,
    scoreThresholdReachable:true,scoreProofs,bestChain:reference.state.bestChain};
}

function main(){
  const levels=require('../web/slide-v06/levels.js'),report={ruleset:E.RULESET,scoringVersion:E.SCORING,
    method:'Complete reachable spatial graphs for all ten levels. Every legal edge uses shipped engine.applyAction with only the move budget ignored; reverse breadth-first search proves all reachable states can complete. Normal kernel replays independently verify move limits and scoring witnesses.',levels:[]};
  for(const level of levels){
    process.stderr.write('Proving '+level.id+' ('+level.title+')\n');
    report.levels.push(verifyLevel(level));
  }
  report.ok=report.levels.length===10&&report.levels.every(l=>l.allReachableSolvable&&l.unwinnableStates===0&&l.referenceWithinMoveLimit);
  if(!report.ok)throw Error('Expected ten fully verified levels');
  if(process.argv.includes('--write'))fs.writeFileSync('docs/technical/v0.6-level-report.json',JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));return report;
}
module.exports={proveSpatialSafety,verifyLevel};
if(require.main===module)main();
