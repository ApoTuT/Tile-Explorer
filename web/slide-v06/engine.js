/* Stable facts only: terrain, upgrades, delivery and scoring share one transaction. */
(function(root){
  'use strict';
  const C=typeof module!=='undefined'?require('./content.js'):root.TileSlideV06.content;
  const RULESET='slide-v06-3',SCORING='score-v06-1';
  const directions={up:{row:-1,col:0},down:{row:1,col:0},left:{row:0,col:-1},right:{row:0,col:1}};
  const clone=v=>JSON.parse(JSON.stringify(v));
  const walkable=(s,r,c)=>Number.isInteger(r)&&Number.isInteger(c)&&r>=0&&c>=0&&r<s.rows&&c<s.cols&&s.mask[r][c]==='#';
  const footprint=(s,t)=>s.footprintByChain?.[C.items[t.itemId]?.chainId]||{width:1,height:1};
  const cells=(s,t,p=t)=>{const f=footprint(s,t),out=[];for(let r=0;r<f.height;r++)for(let c=0;c<f.width;c++)out.push({row:p.row+r,col:p.col+c});return out;};
  const rockAt=(s,r,c)=>s.rocks.some(p=>p.row===r&&p.col===c)||(s.obstacle?.position?.row===r&&s.obstacle.position.col===c);
  const tileAt=(s,r,c)=>s.tiles.find(t=>{const f=footprint(s,t);return r>=t.row&&r<t.row+f.height&&c>=t.col&&c<t.col+f.width;});
  function definitionHash(l){
    const value=JSON.stringify([RULESET,SCORING,l.id,l.mask,l.rocks,l.tiles,l.chainGoals,l.footprintByChain,l.obstacle,l.moveLimit,l.parMoves,l.twoStarScore,l.threeStarScore,C.items]);
    let h=2166136261;for(let i=0;i<value.length;i++)h=Math.imul(h^value.charCodeAt(i),16777619);
    return(h>>>0).toString(16).padStart(8,'0');
  }
  function validateDefinition(l){
    const errors=[],cells=new Set(),ids=new Set(),mass={};
    if(!l||!l.id||!Number.isInteger(l.rows)||!Number.isInteger(l.cols)||!Array.isArray(l.mask)||l.mask.length!==l.rows||
      l.mask.some(r=>typeof r!=='string'||r.length!==l.cols||/[^.#]/.test(r))||!Array.isArray(l.rocks)||!Array.isArray(l.tiles)||!l.tiles.length||!l.chainGoals)
      return {ok:false,errors:['definition']};
    for(const p of l.rocks){const k=p.row+','+p.col;if(!walkable(l,p.row,p.col)||cells.has(k))errors.push('rock');cells.add(k);}
    for(const t of l.tiles){
      const item=C.items[t.itemId],goal=item&&l.chainGoals[item.chainId],f=footprint(l,t);
      if(typeof t.id!=='string'||t.id==='obstacle'||ids.has(t.id)||!item||!goal||item.tier>=goal.targetTier||![1,2].includes(f.width)||![1,2].includes(f.height))errors.push('tile:'+t.id);
      else for(let r=0;r<f.height;r++)for(let c=0;c<f.width;c++){const row=t.row+r,col=t.col+c,k=row+','+col;if(!walkable(l,row,col)||cells.has(k))errors.push('overlap:'+t.id);cells.add(k);}
      ids.add(t.id);if(item)mass[item.chainId]=(mass[item.chainId]||0)+2**item.tier;
    }
    for(const [chain,g] of Object.entries(l.chainGoals))if(!C.item(chain,g.targetTier)||g.targetTier<1||!Number.isInteger(g.count)||g.count<1||mass[chain]!==g.count*2**g.targetTier)errors.push('materials:'+chain);
    if(l.obstacle?.enabled){const o=l.obstacle,limit=o.moveLimit??0;if(!Number.isInteger(limit)||limit<0||limit>20||!Array.isArray(o.placementCells)||!o.placementCells.length)errors.push('obstacle');
      else {const seen=new Set();for(const p of o.placementCells){const k=p.row+','+p.col;if(!walkable(l,p.row,p.col)||cells.has(k)||seen.has(k))errors.push('placement');seen.add(k);}}}
    const floor=[];for(let r=0;r<l.rows;r++)for(let c=0;c<l.cols;c++)if(walkable(l,r,c))floor.push([r,c]);
    const seen=new Set(),queue=floor.length?[floor[0]]:[];
    for(let n=0;n<queue.length;n++){const [r,c]=queue[n],key=r+','+c;if(seen.has(key))continue;seen.add(key);
      for(const d of Object.values(directions))if(walkable(l,r+d.row,c+d.col)&&!seen.has((r+d.row)+','+(c+d.col)))queue.push([r+d.row,c+d.col]);}
    if(seen.size!==floor.length)errors.push('disconnected-mask');
    if(!Number.isInteger(l.parMoves)||l.parMoves<1||!(l.twoStarScore>0&&l.threeStarScore>l.twoStarScore))errors.push('scoring');
    if(!Number.isInteger(l.moveLimit)||l.moveLimit<1)errors.push('move-limit');
    return {ok:!errors.length,errors};
  }
  function createState(l){
    const valid=validateDefinition(l);if(!valid.ok)throw Error(valid.errors.join(','));
    return {levelId:l.id,ruleset:RULESET,definitionHash:definitionHash(l),rows:l.rows,cols:l.cols,mask:clone(l.mask),rocks:clone(l.rocks),
      tiles:clone(l.tiles),chainGoals:clone(l.chainGoals),footprintByChain:clone(l.footprintByChain||{}),obstacle:l.obstacle?.enabled?{...clone(l.obstacle),moveLimit:l.obstacle.moveLimit??0,position:null,movesUsed:0}:null,delivered:Object.fromEntries(Object.keys(l.chainGoals).map(k=>[k,0])),
      moveLimit:l.moveLimit,successfulMoves:0,revision:0,status:l.obstacle?.enabled?'placing':'playing',mergeScore:0,chainCount:0,setupMovesSinceMerge:0,bestChain:0};
  }
  function inspectAction(s,a){
    const bad=reason=>({ok:false,kind:'blocked',reason});
    if(!a)return bad('action');
    if(a.revision!==undefined&&a.revision!==s.revision)return bad('stale');
    if(a.type==='place-obstacle')return s.status==='placing'&&s.obstacle.placementCells.some(p=>p.row===a.row&&p.col===a.col)?{ok:true,kind:'place',to:{row:a.row,col:a.col},path:[],distance:0}:bad('placement');
    if(!['slide','move-obstacle'].includes(a.type)||!Object.hasOwn(directions,a.direction))return bad('action');
    if(s.status!=='playing')return bad('finished');
    if(a.type==='move-obstacle'){const o=s.obstacle;if(!o?.position||o.movesUsed>=o.moveLimit)return bad('obstacle-limit');const d=directions[a.direction],to={row:o.position.row+d.row,col:o.position.col+d.col};
      return !walkable(s,to.row,to.col)||s.rocks.some(p=>p.row===to.row&&p.col===to.col)||tileAt(s,to.row,to.col)?bad('occupied'):{ok:true,kind:'obstacle',sourceId:'obstacle',from:o.position,to,path:[to],distance:1};}
    const t=s.tiles.find(t=>t.id===a.tileId);if(!t)return bad('missing');
    const d=directions[a.direction],path=[],from={row:t.row,col:t.col};let p=from;
    while(true){
      const next={row:p.row+d.row,col:p.col+d.col};
      const covered=cells(s,t,next),targets=new Map();let stopped=null;
      for(const q of covered){if(!walkable(s,q.row,q.col))stopped='edge';else if(rockAt(s,q.row,q.col))stopped='rock';const hit=tileAt(s,q.row,q.col);if(hit&&hit.id!==t.id)targets.set(hit.id,hit);}
      const target=targets.size===1?[...targets.values()][0]:null;
      const aligned=target&&(d.col?t.row===target.row:t.col===target.col);
      if(targets.size&&(!target||target.itemId!==t.itemId||!aligned))stopped=stopped||'tile';
      if(stopped)return path.length?{ok:true,kind:'move',sourceId:t.id,from,to:p,path,distance:path.length,stoppedBy:stopped}:{...bad(stopped),targetId:target?.id};
      path.push(next);
      if(target){const item=C.items[t.itemId],result=C.items[item.nextItemId],goal=s.chainGoals[item.chainId];
        if(!result||result.tier>goal.targetTier)return bad('recipe');
        return {ok:true,kind:result.tier===goal.targetTier?'deliver':'upgrade',sourceId:t.id,targetId:target.id,
          from,to:{row:target.row,col:target.col},path,distance:path.length,resultId:result.id,resultTier:result.tier,chainId:item.chainId};}
      p=next;
    }
  }
  const isWon=s=>!s.tiles.length&&Object.entries(s.chainGoals).every(([k,g])=>s.delivered[k]===g.count);
  function applyAction(input,a,{ignoreMoveLimit=false,recordTransaction=true}={}){
    const check=inspectAction(input,a);if(!check.ok)return {...check,state:input,events:[]};
    const s={...input,tiles:input.tiles.map(t=>({...t})),delivered:{...input.delivered},obstacle:input.obstacle?{...input.obstacle}:null};s.revision++;
    const normalized=a.type==='place-obstacle'?{type:a.type,row:a.row,col:a.col}:a.type==='move-obstacle'?{type:a.type,direction:a.direction}:{type:'slide',tileId:a.tileId,direction:a.direction};
    if(check.kind==='place'){s.obstacle.position={...check.to};s.status='playing';return {ok:true,state:s,events:[{type:'obstacle-placed',...check}],transaction:recordTransaction?{action:normalized,before:clone(input),after:clone(s)}:null};}
    s.successfulMoves++;
    let points=0;
    if(check.kind==='move'||check.kind==='obstacle'){
      if(check.kind==='obstacle'){s.obstacle.position={...check.to};s.obstacle.movesUsed++;}else Object.assign(s.tiles.find(t=>t.id===check.sourceId),check.to);
      if(s.chainCount){s.setupMovesSinceMerge++;if(s.setupMovesSinceMerge>1)s.chainCount=0;}
    }else{
      s.chainCount++;s.setupMovesSinceMerge=0;s.bestChain=Math.max(s.bestChain,s.chainCount);
      points=100+50*Math.min(s.chainCount-1,3)+50*(check.resultTier-1);s.mergeScore+=points;
      s.tiles=s.tiles.filter(t=>t.id!==check.sourceId&&(check.kind!=='deliver'||t.id!==check.targetId));
      if(check.kind==='upgrade')s.tiles.find(t=>t.id===check.targetId).itemId=check.resultId;
      else s.delivered[check.chainId]++;
    }
    // Completion on the last available move wins. Offline spatial proofs may ignore
    // only the budget; collision and upgrade rules remain exactly the same.
    s.status=isWon(s)?'won':!ignoreMoveLimit&&s.successfulMoves>=s.moveLimit?'lost':'playing';
    const events=[{type:check.kind==='obstacle'?'obstacle-moved':check.kind==='move'?'tile-moved':check.kind==='upgrade'?'tile-upgraded':'merged-and-delivered',...check,points,chainCount:s.chainCount}];
    if(s.status==='won')events.push({type:'level-completed'});
    if(s.status==='lost')events.push({type:'moves-exhausted'});
    return {ok:true,state:s,events,transaction:recordTransaction?{action:normalized,before:clone(input),after:clone(s)}:null};
  }
  function replay(l,actions){let state=createState(l);const transactions=[];
    for(const a of actions){const r=applyAction(state,a);if(!r.ok)throw Error('Invalid replay: '+r.reason);state=r.state;transactions.push(r.transaction);}return {state,transactions};}
  const candidateActions=s=>s.status==='placing'?s.obstacle.placementCells.map(p=>({type:'place-obstacle',...p})):[...s.tiles.flatMap(t=>Object.keys(directions).map(direction=>({type:'slide',tileId:t.id,direction}))),...(s.obstacle?.position&&s.obstacle.movesUsed<s.obstacle.moveLimit?Object.keys(directions).map(direction=>({type:'move-obstacle',direction})):[])];
  const listLegalActions=s=>candidateActions(s).filter(a=>inspectAction(s,a).ok);
  const canonicalKey=s=>JSON.stringify([s.definitionHash,s.tiles.map(t=>[t.row,t.col,t.itemId]).sort(),s.delivered,s.obstacle?.position,s.obstacle?s.obstacle.moveLimit-s.obstacle.movesUsed:0]);
  function result(s,l){const efficiency=s.status==='won'?50*Math.max(0,Math.min(4,l.parMoves+4-s.successfulMoves)):0,score=s.mergeScore+efficiency;
    return {score,efficiency,stars:s.status!=='won'?0:score>=l.threeStarScore?3:score>=l.twoStarScore?2:1};}
  const api={RULESET,SCORING,clone,directions,walkable,rockAt,tileAt,footprint,cells,definitionHash,validateDefinition,createState,inspectAction,applyAction,replay,isWon,candidateActions,listLegalActions,canonicalKey,result};
  root.TileSlideV06={...(root.TileSlideV06||{}),engine:api};if(typeof module!=='undefined')module.exports=api;
})(globalThis);
