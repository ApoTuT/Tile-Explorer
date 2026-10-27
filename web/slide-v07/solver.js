/* Bounded, cancellable search. Exhaustion and budget exhaustion are distinct. */
(function(root){
  'use strict';
  const E=typeof module!=='undefined'?require('./engine.js'):root.TileSlideV07.engine;
  const C=typeof module!=='undefined'?require('./content.js'):root.TileSlideV07.content;
  function* search(initial,{maxStates=18000,maxMs=1500,respectMoveLimit=true}={}){
    const started=Date.now(),best=new Map(),heap=[];let visited=0;
    const priority=n=>n.path.length+2*(n.state.tiles.length-Object.entries(n.state.chainGoals).reduce((sum,[id,g])=>sum+g.count-n.state.delivered[id],0));
    function push(n){n.priority=priority(n);let i=heap.length;heap.push(n);while(i){const p=(i-1)>>1;if(heap[p].priority<=n.priority)break;heap[i]=heap[p];i=p;}heap[i]=n;}
    function pop(){const n=heap[0],last=heap.pop();if(heap.length){let i=0;while(2*i+1<heap.length){let c=2*i+1;if(c+1<heap.length&&heap[c+1].priority<heap[c].priority)c++;if(heap[c].priority>=last.priority)break;heap[i]=heap[c];i=c;}heap[i]=last;}return n;}
    push({state:initial,path:[]});best.set(E.canonicalKey(initial),0);
    while(heap.length){
      if(visited>=maxStates||Date.now()-started>maxMs)return {status:'unverified',visited};
      const node=pop(),key=E.canonicalKey(node.state);if(node.path.length>best.get(key))continue;visited++;
      if(node.state.status==='won')return {status:'solved',solution:node.path,visited};
      if(node.state.status==='lost')continue;
      const next=E.candidateActions(node.state).map(action=>{const check=E.inspectAction(node.state,action);return {action,check};}).filter(n=>n.check.ok);
      // Favor upgrades, but reopen a board reached in fewer moves: budget matters.
      next.sort((a,b)=>(a.check.resultTier?10+a.check.resultTier:0)-(b.check.resultTier?10+b.check.resultTier:0));
      for(const {action} of next){const state=E.applyAction(node.state,action,{ignoreMoveLimit:!respectMoveLimit,recordTransaction:false}).state,nextKey=E.canonicalKey(state),depth=node.path.length+1;
        if(state.status==='lost')continue;
        if(depth<(best.get(nextKey)??Infinity)){best.set(nextKey,depth);push({state,path:[...node.path,action]});}}
      if(visited%24===0)yield visited;
    }
    return {status:respectMoveLimit?'out-of-moves':'unsolvable',visited};
  }
  // Published regions are geometrically certified offline. Search their product
  // independently, then replay the assembled answer on the real whole board.
  function* regionSearch(initial,{regions,maxStates=18000,maxMs=1500}={}){
    const started=Date.now(),solution=[];let visited=0;
    for(const region of regions){const inside=p=>p.row>=region.row&&p.row<region.row+region.rows&&p.col>=region.col&&p.col<region.col+region.cols;
      const tiles=initial.tiles.filter(inside);if(!tiles.length)continue;
      const chainGoals={};for(const t of tiles){const it=C.items[t.itemId],tier=initial.chainGoals[it.chainId].targetTier;chainGoals[it.chainId]??={targetTier:tier,count:0};chainGoals[it.chainId].count+=2**it.tier/2**tier;}
      if(Object.values(chainGoals).some(g=>!Number.isInteger(g.count)))return {status:'unverified',visited};
      const local={...initial,mask:initial.mask.map((row,r)=>[...row].map((c,col)=>inside({row:r,col})?c:'.').join('')),tiles,chainGoals,delivered:Object.fromEntries(Object.keys(chainGoals).map(k=>[k,0])),successfulMoves:0,
        rocks:initial.rocks.filter(inside),obstacle:initial.obstacle?.position&&inside(initial.obstacle.position)?initial.obstacle:null,
        features:{crates:initial.features.crates.filter(inside),brakes:initial.features.brakes.filter(inside),portals:initial.features.portals.filter(p=>inside(p.a)&&inside(p.b))}};
      const result=yield* search(local,{maxStates:maxStates-visited,maxMs:Math.max(0,maxMs-(Date.now()-started)),respectMoveLimit:false});visited+=result.visited;
      if(result.status!=='solved')return {status:result.status,visited};solution.push(...result.solution);
    }
    if(solution.length>initial.moveLimit-initial.successfulMoves)return {status:'unverified',visited};
    let state=initial;for(const a of solution){const r=E.applyAction(state,a,{recordTransaction:false});if(!r.ok)return {status:'unverified',visited};state=r.state;}
    return state.status==='won'?{status:'solved',solution,visited}:{status:'unverified',visited};
  }
  const searchFor=(s,options)=>options?.regions?.length&&s.status==='playing'?regionSearch(s,options):search(s,options);
  function findSolution(s,options){const it=searchFor(s,options);let r;do{r=it.next();}while(!r.done);return r.value;}
  async function findHint(s,{isCancelled=()=>false,...options}={}){const it=searchFor(s,options);let r;
    do{if(isCancelled())return {status:'cancelled'};r=it.next();if(!r.done)await new Promise(resolve=>setTimeout(resolve,0));}while(!r.done);return r.value;}
  function workerHint(s,{isCancelled=()=>false,maxStates=18000,maxMs=1500,regions}={}){
    if(typeof Worker==='undefined')return findHint(s,{isCancelled,maxStates,maxMs,regions});
    return new Promise(resolve=>{let worker,finished=false;const finish=r=>{if(finished)return;finished=true;clearInterval(cancelTimer);clearTimeout(timeout);worker?.terminate();resolve(r);};
      const cancelTimer=setInterval(()=>{if(isCancelled())finish({status:'cancelled'});},40),timeout=setTimeout(()=>finish({status:'unverified'}),maxMs+600);
      try{worker=new Worker(new URL('slide-v07/solver-worker.js',location.href));worker.onmessage=e=>finish(isCancelled()?{status:'cancelled'}:e.data);worker.onerror=()=>finish({status:'unverified'});worker.postMessage({state:s,maxStates,maxMs,regions});}catch(_){finish({status:'unverified'});}
    });
  }
  const api={findSolution,findHint,workerHint};root.TileSlideV07={...(root.TileSlideV07||{}),solver:api};if(typeof module!=='undefined')module.exports=api;
})(globalThis);
