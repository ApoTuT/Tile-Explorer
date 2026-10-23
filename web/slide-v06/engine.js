/* Stable facts only: terrain, upgrades, delivery and scoring share one transaction. */
(function(root){
  'use strict';
  const C=typeof module!=='undefined'?require('./content.js'):root.TileSlideV06.content;
  const RULESET='slide-v06-2',SCORING='score-v06-1';
  const directions={up:{row:-1,col:0},down:{row:1,col:0},left:{row:0,col:-1},right:{row:0,col:1}};
  const clone=v=>JSON.parse(JSON.stringify(v));
  const walkable=(s,r,c)=>Number.isInteger(r)&&Number.isInteger(c)&&r>=0&&c>=0&&r<s.rows&&c<s.cols&&s.mask[r][c]==='#';
  const rockAt=(s,r,c)=>s.rocks.some(p=>p.row===r&&p.col===c);
  const tileAt=(s,r,c)=>s.tiles.find(t=>t.row===r&&t.col===c);
  function definitionHash(l){
    const value=JSON.stringify([RULESET,SCORING,l.id,l.mask,l.rocks,l.tiles,l.chainGoals,l.moveLimit,l.parMoves,l.twoStarScore,l.threeStarScore,C.items]);
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
      const k=t.row+','+t.col,item=C.items[t.itemId],goal=item&&l.chainGoals[item.chainId];
      if(typeof t.id!=='string'||ids.has(t.id)||!walkable(l,t.row,t.col)||cells.has(k)||!item||!goal||item.tier>=goal.targetTier)errors.push('tile:'+t.id);
      ids.add(t.id);cells.add(k);if(item)mass[item.chainId]=(mass[item.chainId]||0)+2**item.tier;
    }
    for(const [chain,g] of Object.entries(l.chainGoals))if(!C.item(chain,g.targetTier)||g.targetTier<1||!Number.isInteger(g.count)||g.count<1||mass[chain]!==g.count*2**g.targetTier)errors.push('materials:'+chain);
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
      tiles:clone(l.tiles),chainGoals:clone(l.chainGoals),delivered:Object.fromEntries(Object.keys(l.chainGoals).map(k=>[k,0])),
      moveLimit:l.moveLimit,successfulMoves:0,revision:0,status:'playing',mergeScore:0,chainCount:0,setupMovesSinceMerge:0,bestChain:0};
  }
  function inspectAction(s,a){
    const bad=reason=>({ok:false,kind:'blocked',reason});
    if(!a||a.type!=='slide'||!Object.hasOwn(directions,a.direction))return bad('action');
    if(a.revision!==undefined&&a.revision!==s.revision)return bad('stale');
    if(s.status!=='playing')return bad('finished');
    const t=s.tiles.find(t=>t.id===a.tileId);if(!t)return bad('missing');
    const d=directions[a.direction],path=[],from={row:t.row,col:t.col};let p=from;
    while(true){
      const next={row:p.row+d.row,col:p.col+d.col};
      const target=tileAt(s,next.row,next.col);
      const stopped=!walkable(s,next.row,next.col)?'edge':rockAt(s,next.row,next.col)?'rock':target&&target.itemId!==t.itemId?'tile':null;
      if(stopped)return path.length?{ok:true,kind:'move',sourceId:t.id,from,to:p,path,distance:path.length,stoppedBy:stopped}:{...bad(stopped),targetId:target?.id};
      path.push(next);
      if(target){const item=C.items[t.itemId],result=C.items[item.nextItemId],goal=s.chainGoals[item.chainId];
        if(!result||result.tier>goal.targetTier)return bad('recipe');
        return {ok:true,kind:result.tier===goal.targetTier?'deliver':'upgrade',sourceId:t.id,targetId:target.id,
          from,to:next,path,distance:path.length,resultId:result.id,resultTier:result.tier,chainId:item.chainId};}
      p=next;
    }
  }
  const isWon=s=>!s.tiles.length&&Object.entries(s.chainGoals).every(([k,g])=>s.delivered[k]===g.count);
  function applyAction(input,a,{ignoreMoveLimit=false,recordTransaction=true}={}){
    const check=inspectAction(input,a);if(!check.ok)return {...check,state:input,events:[]};
    const s={...input,tiles:input.tiles.map(t=>({...t})),delivered:{...input.delivered}};s.successfulMoves++;s.revision++;
    let points=0;
    if(check.kind==='move'){
      Object.assign(s.tiles.find(t=>t.id===check.sourceId),check.to);
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
    const events=[{type:check.kind==='move'?'tile-moved':check.kind==='upgrade'?'tile-upgraded':'merged-and-delivered',...check,points,chainCount:s.chainCount}];
    if(s.status==='won')events.push({type:'level-completed'});
    if(s.status==='lost')events.push({type:'moves-exhausted'});
    return {ok:true,state:s,events,transaction:recordTransaction?{action:{type:'slide',tileId:a.tileId,direction:a.direction},before:clone(input),after:clone(s)}:null};
  }
  function replay(l,actions){let state=createState(l);const transactions=[];
    for(const a of actions){const r=applyAction(state,a);if(!r.ok)throw Error('Invalid replay: '+r.reason);state=r.state;transactions.push(r.transaction);}return {state,transactions};}
  const listLegalActions=s=>s.tiles.flatMap(t=>Object.keys(directions).map(direction=>({type:'slide',tileId:t.id,direction}))).filter(a=>inspectAction(s,a).ok);
  const canonicalKey=s=>JSON.stringify([s.definitionHash,s.tiles.map(t=>[t.row,t.col,t.itemId]).sort(),s.delivered]);
  function result(s,l){const efficiency=s.status==='won'?50*Math.max(0,Math.min(4,l.parMoves+4-s.successfulMoves)):0,score=s.mergeScore+efficiency;
    return {score,efficiency,stars:s.status!=='won'?0:score>=l.threeStarScore?3:score>=l.twoStarScore?2:1};}
  const api={RULESET,SCORING,clone,directions,walkable,rockAt,tileAt,definitionHash,validateDefinition,createState,inspectAction,applyAction,replay,isWon,listLegalActions,canonicalKey,result};
  root.TileSlideV06={...(root.TileSlideV06||{}),engine:api};if(typeof module!=='undefined')module.exports=api;
})(globalThis);
