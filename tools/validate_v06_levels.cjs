'use strict';
const fs=require('node:fs'),E=require('../web/slide-v06/engine.js'),levels=require('../web/slide-v06/levels.js');
const report={ruleset:E.RULESET,scoringVersion:E.SCORING,method:'Real-kernel forward replay of authored reverse routes and score witnesses. Full state graphs for levels 1–3 only.',levels:[]};
for(const l of levels){
  const valid=E.validateDefinition(l);if(!valid.ok)throw Error(l.id+': '+valid.errors);
  const r=E.replay(l,l.referenceSolution),result=E.result(r.state,l);
  if(r.state.status!=='won'||result.stars!==3)throw Error('Invalid reference '+l.id);
  const goals=Object.values(l.chainGoals).reduce((n,g)=>n+g.count,0),merges=r.transactions.filter(t=>t.after.tiles.length<t.before.tiles.length).length;
  if(merges!==l.tiles.length-goals)throw Error('Merge count '+l.id);
  for(const proof of l.scoreProofs){const played=E.replay(l,proof.actions),actual=E.result(played.state,l);if(actual.score!==proof.score||actual.stars!==proof.stars)throw Error('Score proof '+l.id);}
  let allReachableSolvable=null,reachableStates=null,shortestMoves=null;
  if(report.levels.length<3){
    const initial=E.createState(l),nodes=[initial],dist=[0],keys=new Map([[E.canonicalKey(initial),0]]),reverse=[[]],winners=[];
    for(let i=0;i<nodes.length;i++){
      if(nodes.length>100000)throw Error('Tutorial graph too large');
      if(nodes[i].status==='won'){winners.push(i);if(shortestMoves===null)shortestMoves=dist[i];continue;}
      for(const a of E.listLegalActions(nodes[i])){const next=E.applyAction(nodes[i],a).state,key=E.canonicalKey(next);let j=keys.get(key);
        if(j===undefined){j=nodes.length;keys.set(key,j);nodes.push(next);dist.push(dist[i]+1);reverse.push([]);}reverse[j].push(i);}
    }
    const good=new Set(winners),queue=[...winners];for(let i=0;i<queue.length;i++)for(const prev of reverse[queue[i]])if(!good.has(prev)){good.add(prev);queue.push(prev);}
    allReachableSolvable=good.size===nodes.length;reachableStates=nodes.length;
    // All states safe is a design goal; evidence is reported without disguising failures.
    if(!allReachableSolvable)throw Error('Tutorial contains dead ends: '+l.id+' '+(nodes.length-good.size));
  }
  report.levels.push({id:l.id,title:l.title,definitionHash:E.definitionHash(l),initialSolvable:true,allReachableSolvable,reachableStates,shortestMoves,
    referenceMoves:r.state.successfulMoves,mergeCount:merges,score:result.score,scoreThresholdReachable:true,bestChain:r.state.bestChain});
}
report.ok=report.levels.length===10;
if(process.argv.includes('--write'))fs.writeFileSync('docs/technical/v0.6-level-report.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
