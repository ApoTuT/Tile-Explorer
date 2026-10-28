/* Offline search for compact planning rooms; no unverified candidate is published. */
'use strict';
const fs=require('node:fs'),{make,finish}=require('./author_v07_challenge.cjs'),{analyze}=require('./v07_difficulty.cjs'),S=require('../web/slide-v07/solver.js'),E=require('../web/slide-v07/engine.js');
const file=process.env.V07_ROOM_FILE||'.qa/v07-challenge-rooms.json',saved=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)):{};
for(const n of [14,19,20,21,22,23,24,27,28,29,30].filter(n=>n>=(Number(process.env.V07_ROOM_FROM)||1)&&n<=(Number(process.env.V07_ROOM_TO)||30))){
  if(saved[n])continue;
  const min=n<20?18:n<25?20:22;
  const spec={n:n+100,title:'规划庭院',rows:4,cols:4,inventory:{fruit:[1,1,2],plant:[0,0,1]},rockCount:4,min,max:min+5,shapes:{},mechanics:[]};
  let accepted;
  for(let attempt=0;attempt<1600;attempt++){
    if(attempt%50===0)console.log('SEARCH '+n+' attempt '+attempt);
    const l=make(spec,attempt);if(!l)continue;
    const fast=S.findSolution(E.createState(l),{maxStates:9000,maxMs:180,respectMoveLimit:false});if(fast.status!=='solved')continue;
    const p=analyze(l,{recommend:true,minMoves:min,maxMoves:min+5,minSetup:Math.floor(min*.6),minChoices:10,maxStates:160000,maxMs:12000});
    if(!p.recommendation)continue;
    accepted=finish(l,p.recommendation,p,spec,attempt);accepted.id='room-'+n;console.log('ACCEPT '+n+' '+JSON.stringify(accepted.difficulty));break;
  }
  if(!accepted)throw Error('No room '+n);saved[n]=accepted;fs.writeFileSync(file,JSON.stringify(saved,null,2));
}
