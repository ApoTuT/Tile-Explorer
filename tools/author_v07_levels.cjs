/* Seeded content authoring. Candidates ship only after a complete spatial proof. */
'use strict';
const fs=require('node:fs'),E=require('../web/slide-v07/engine.js'),S=require('../web/slide-v07/solver.js'),{proveSpatialSafety}=require('./validate_v07_levels.cjs');
const old=require('../web/slide-v06/levels.js'),catalog=fs.readFileSync('docs/technical/v0.7-levels.md','utf8');
const names={荔枝:['fruit',0],橘子:['fruit',1],苹果:['fruit',2],桃子:['fruit',3],西瓜:['fruit',4],种子:['plant',0],嫩芽:['plant',1],小树:['plant',2],大树:['plant',3],小汽车:['car',0],跑车:['car',1],超跑:['car',2]};
const entries=catalog.split(/\r?\n/).filter(l=>/^\| \d{2} \|/.test(l)).map(l=>l.split('|').slice(1,-1).map(s=>s.trim()));
const configs={
  11:{car:[2,1],quota:1},12:{plant:[1,2],quota:1},13:{plant:[1,2],car:[2,1]},14:{plant:[1,2],quota:1},
  15:{crates:1},16:{crates:2,random:true},17:{car:[2,1],crates:2,quota:1},18:{plant:[1,2],crates:2,random:true},19:{crates:1},
  20:{brakes:[[1,1]]},21:{brakes:[[1,1]],quota:0},22:{car:[2,1],brakes:[[2,1]],quota:1},23:{crates:1,brakes:[[1,1]],random:true},24:{car:[2,1],crates:1,brakes:[[1,1],[2,1]],random:true},
  25:{portal:[1,1]},26:{portal:[1,1],quota:1},27:{car:[2,1],portal:[2,1]},28:{crates:2,portal:[1,1],random:true},29:{car:[2,1],portal:[2,1],brakes:[[1,1]],quota:1},30:{plant:[1,2],car:[2,1],crates:1,brakes:[[2,1]],portal:[1,2],random:true}
};
let seed=7072401;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/2**32),shuffle=a=>a.map(x=>[random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
const path='.qa/v07-authored.json';fs.mkdirSync('.qa',{recursive:true});
function inventory(s){return s.split('、').flatMap(x=>{const [name,n]=x.split('×'),[chain,tier]=names[name];return Array(+n).fill(chain+'-'+tier);});}
function goals(s){return Object.fromEntries(s.split('、').map(x=>{const [name,n]=x.split('×'),[chain,targetTier]=names[name];return [chain,{targetTier,count:+n}];}));}
function make(i){const row=[...entries[i-1]],spec=configs[i];if(i===19)row[3]='苹果×2、桃子×1、嫩芽×2、小树×1';if(i===30)row[3]='苹果×2、桃子×1、嫩芽×2、跑车×2';const compact={12:[4,3],13:[4,3],14:[4,3],16:[4,3],17:[4,4],18:[4,3],19:[4,3],21:[4,3],22:[4,3],23:[4,3],24:[4,3],26:[4,3],27:[4,3],28:[4,3],29:[4,4],30:[4,3]},[cols,rows]=compact[i]||row[2].split('×').map(Number),all=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)all.push({row:r,col:c});seed=7072401+i*10000;
  for(let attempt=0;attempt<50;attempt++){
    const l={id:'slide07-'+String(i).padStart(2,'0'),title:row[1],subtitle:row[1]+' · 20 步内完成收集',chapter:Math.ceil(i/5),rows,cols,mask:Array(rows).fill('#'.repeat(cols)),rocks:[],tiles:[],chainGoals:goals(row[4]),footprintByChain:{},features:{crates:[],brakes:[],portals:[]},moveLimit:20,parMoves:1,twoStarScore:1,threeStarScore:2,ruleset:E.RULESET};
    for(const chain of ['fruit','plant','car'])if(spec[chain])l.footprintByChain[chain]={width:spec[chain][0],height:spec[chain][1]};
    let serial=0;for(const itemId of inventory(row[3])){const t={id:'t'+(++serial),itemId},p=shuffle(all).find(p=>E.cells(l,t,p).every(q=>E.walkable(l,q.row,q.col)&&!E.tileAt(l,q.row,q.col)));if(!p)break;l.tiles.push({...t,...p});}
    if(l.tiles.length!==serial)continue;
    const terrain=new Set(),empty=p=>!E.tileAt(l,p.row,p.col)&&!terrain.has(p.row+','+p.col);
    for(let c=0;c<(spec.crates||0);c++){const p=shuffle(all).find(empty);if(p){l.features.crates.push({id:'crate-'+c,...p});terrain.add(p.row+','+p.col);}}
    for(const [n,[width,height]] of (spec.brakes||[]).entries()){const p=shuffle(all).find(p=>E.rectangle(p,{width,height}).every(q=>E.walkable(l,q.row,q.col)&&!terrain.has(q.row+','+q.col)));if(p){l.features.brakes.push({id:'brake-'+n,...p,width,height,charges:1});for(const q of E.rectangle(p,{width,height}))terrain.add(q.row+','+q.col);}}
    if(spec.portal){const [width,height]=spec.portal,ends=[];for(let n=0;n<2;n++){const p=shuffle(all).find(p=>E.rectangle(p,{width,height}).every(q=>E.walkable(l,q.row,q.col)&&!terrain.has(q.row+','+q.col)));if(p){ends.push(p);for(const q of E.rectangle(p,{width,height}))terrain.add(q.row+','+q.col);}}if(ends.length===2)l.features.portals.push({id:'portal-0',width,height,charges:1,a:ends[0],b:ends[1]});}
    if(l.features.crates.length!==(spec.crates||0)||l.features.brakes.length!==(spec.brakes||[]).length||l.features.portals.length!==Number(!!spec.portal))continue;
    if(spec.quota!==undefined){const p=shuffle(all).find(empty);if(!p)continue;l.obstacle={enabled:true,moveLimit:spec.quota,placementCells:[p]};}
    if(spec.crates){const apples=l.tiles.filter(t=>t.itemId==='fruit-2');l.variants=[{id:'v1',bombTileIds:[apples[0].id]}];}
    else l.variants=[{id:'default',bombTileIds:[]}];
    if(!E.validateDefinition(l).ok)continue;
    const quick=S.findSolution(E.createState(l),{maxStates:12000,maxMs:500});if(quick.status!=='solved')continue;
    process.stderr.write('Author '+i+' attempt '+attempt+' graph\n');
    let proof;try{proof=proveSpatialSafety(l,{recommendStart:true,minMoves:attempt<3?Math.max(1,parseInt(row[5],10)-2):1,maxMoves:17,requireFeatures:true,maxStates:Number(process.env.V07_MAX_STATES)||500000});}catch(e){process.stderr.write('  '+e.message+'\n');continue;}
    if(!proof.allReachableSolvable||!proof.recommendation){process.stderr.write('  rejected '+proof.unwinnableStates+'/'+proof.states+' states\n');continue;}
    l.tiles=proof.recommendation.tiles.map(t=>{const n={...t};delete n.effect;return n;});l.parMoves=proof.recommendation.referenceMoves;l.referenceSolution=proof.recommendation.referenceSolution;l.variants[0].referenceSolution=l.referenceSolution;
    // Try a second marked apple against the same layout. It must have its own proof.
    if(spec.random){for(const t of l.tiles.filter(t=>t.itemId==='fruit-2'&&!l.variants[0].bombTileIds.includes(t.id))){const v={id:'v2',bombTileIds:[t.id]};l.variants.push(v);
        let alt;try{alt=proveSpatialSafety(l,{variantId:v.id,requireFeatures:true,maxStates:Number(process.env.V07_MAX_STATES)||900000});}catch(_){l.variants.pop();continue;}
        const route=alt.placements[0].referenceSolution;if(alt.allReachableSolvable&&route.length&&route.filter(a=>a.type!=='place-obstacle').length<=20){v.referenceSolution=route;break;}l.variants.pop();}}
    let minimum=Infinity;for(const v of l.variants){const played=E.replay(l,v.referenceSolution,v.id),score=E.result(played.state,l).score;v.scoreProofs=[{actions:v.referenceSolution,score,stars:3}];minimum=Math.min(minimum,score);}
    l.threeStarScore=minimum;l.twoStarScore=Math.max(1,minimum-200);l.scoreProofs=l.variants[0].scoreProofs;l.pattern=l.mask;
    process.stderr.write('Accepted '+i+': '+l.parMoves+' moves, '+proof.states+' states, '+l.variants.length+' variants\n');return l;
  }throw Error('No fully safe layout for '+i);
}
function main(){const levels=fs.existsSync(path)?JSON.parse(fs.readFileSync(path)):old.map((l,i)=>({...E.clone(l),id:'slide07-'+String(i+1).padStart(2,'0'),chapter:Math.ceil((i+1)/5),ruleset:E.RULESET,features:{crates:[],brakes:[],portals:[]},variants:[{id:'default',bombTileIds:[]}]}));
  for(let i=levels.length+1;i<=30;i++){levels.push(make(i));fs.writeFileSync(path,JSON.stringify(levels));}
  fs.writeFileSync('web/slide-v07/levels.js','/* Thirty authored levels. See v0.7-level-report.json for actual kernel proofs. */\n(function(root){const levels='+JSON.stringify(levels,null,2)+';root.TileSlideV07={...(root.TileSlideV07||{}),levels};if(typeof module!=="undefined")module.exports=levels;})(globalThis);\n');
}
if(require.main===module)main();module.exports={make};
