/* Bounded, cancellable search. Exhaustion and budget exhaustion are distinct. */
(function(root){
  'use strict';
  const E=typeof module!=='undefined'?require('./engine.js'):root.TileSlideV06.engine;
  function* search(initial,{maxStates=18000,maxMs=1500}={}){
    const started=Date.now(),seen=new Set(),stack=[{state:initial,path:[]}];let visited=0;
    while(stack.length){
      if(visited>=maxStates||Date.now()-started>maxMs)return {status:'unverified',visited};
      const node=stack.pop(),key=E.canonicalKey(node.state);if(seen.has(key))continue;seen.add(key);visited++;
      if(node.state.status==='won')return {status:'solved',solution:node.path,visited};
      const next=E.listLegalActions(node.state).map(action=>{const check=E.inspectAction(node.state,action);return {action,check};});
      // Visit upgrades before empty travel. Deterministic, not an optimality claim.
      next.sort((a,b)=>(a.check.kind==='move'?0:10+a.check.resultTier)-(b.check.kind==='move'?0:10+b.check.resultTier));
      for(const {action} of next){const state=E.applyAction(node.state,action).state;if(!seen.has(E.canonicalKey(state)))stack.push({state,path:[...node.path,action]});}
      if(visited%24===0)yield visited;
    }
    return {status:'unsolvable',visited};
  }
  function findSolution(s,options){const it=search(s,options);let r;do{r=it.next();}while(!r.done);return r.value;}
  async function findHint(s,{isCancelled=()=>false,...options}={}){const it=search(s,options);let r;
    do{if(isCancelled())return {status:'cancelled'};r=it.next();if(!r.done)await new Promise(resolve=>setTimeout(resolve,0));}while(!r.done);return r.value;}
  const api={findSolution,findHint};root.TileSlideV06={...(root.TileSlideV06||{}),solver:api};if(typeof module!=='undefined')module.exports=api;
})(globalThis);
