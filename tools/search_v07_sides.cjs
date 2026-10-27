/* Distinct secondary planning rooms, so no campaign puzzle is repeated verbatim. */
'use strict';
const fs=require('node:fs'),{make,finish}=require('./author_v07_challenge.cjs'),{analyze}=require('./v07_difficulty.cjs'),S=require('../web/slide-v07/solver.js'),E=require('../web/slide-v07/engine.js');
const from=Number(process.env.V07_SIDE_FROM)||15,to=Number(process.env.V07_SIDE_TO)||30,file='.qa/v07-sides-'+from+'.json',saved=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)):{};
for(let n=from;n<=to;n++){
  if(saved[n])continue;const min=n<20?10:n<25?12:15,spec={n:n+200,title:'独立侧庭',rows:4,cols:4,inventory:n===17?{fruit:[0,0,1,2,3]}:{fruit:[1,1,2],plant:[0,0,1]},rockCount:4,min,max:min+3,shapes:{},mechanics:[]};let accepted;
  for(let attempt=0;attempt<800;attempt++){
    if(attempt%50===0)console.log('SEARCH '+n+' '+attempt);
    const l=make(spec,attempt);if(!l)continue;const fast=S.findSolution(E.createState(l),{maxStates:10000,maxMs:200,respectMoveLimit:false});if(fast.status!=='solved')continue;
    const p=analyze(l,{recommend:true,minMoves:min,maxMoves:min+3,minSetup:Math.floor(min*.6),minChoices:7,maxStates:160000,maxMs:12000});if(!p.recommendation)continue;
    accepted=finish(l,p.recommendation,p,spec,attempt);accepted.id='side-'+n;break;
  }
  if(!accepted)throw Error('No side '+n);saved[n]=accepted;fs.writeFileSync(file,JSON.stringify(saved,null,2));console.log('ACCEPT '+n+' '+accepted.parMoves);
}
