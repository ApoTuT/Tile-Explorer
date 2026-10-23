/* Reverse-author levels: every split and travel is checked by the real forward kernel. */
'use strict';
const fs=require('node:fs'),E=require('../web/slide-v06/engine.js'),C=require('../web/slide-v06/content.js');
const patterns=[['###','###'],['###','###','###'],['####','####','####','####'],['.#.#.','#####','#####','.###.','..#..'],['.###.','#####','#####','#####','.###.'],['##...##','###.###','.#####.','###.###','##...##'],['...#...','..###..','#######','.#####.','..###..','...#...'],['...#...','..###..','#######','.#####.','..###..','.##.##.','.#...#.'],['.#...#.','###.###','#######','#######','.#####.','..#.#..'],['...#...','..###..','#######','.#####.','..###..','.##.##.','##...##']];
const square=['###','###','###'];
const specs=[
  ['初次碰面','20步内，让两颗荔枝碰个面。',['###','###'],[],{fruit:{targetTier:1,count:1}},{fruit:[0,0]}],
  ['苹果接力','20步内，安排两次升级。',square,[],{fruit:{targetTier:2,count:1}},{fruit:[0,0,1]}],
  ['三步成长','20步内，选好新图案留下的位置。',square,[],{fruit:{targetTier:3,count:1}},{fruit:[0,0,1,2]}],
  ['爱心相遇','20步内，完成两段苹果接力。',square,[],{fruit:{targetTier:2,count:2}},{fruit:[0,0,1,0,0,1]}],
  ['花园绕一绕','20步内，水果和汽车互相让路。',square,[],{fruit:{targetTier:2,count:1},car:{targetTier:2,count:1}},{fruit:[0,0,1],car:[0,0,1]}],
  ['蝴蝶借道','20步内，让嫩芽长成大树。',square,[],{fruit:{targetTier:2,count:1},plant:{targetTier:3,count:1}},{fruit:[0,0,1],plant:[0,0,1,2]}],
  ['小鸟展翅','20步内，把荔枝逐层合成桃子。',square,[],{fruit:{targetTier:3,count:1}},{fruit:[0,0,0,0,0,0,1]}],
  ['星光接力','20步内，安排三条升级路线。',square,[],{fruit:{targetTier:2,count:1},plant:{targetTier:2,count:1},car:{targetTier:1,count:1}},{fruit:[0,0,1],plant:[0,0,1],car:[0,0]}],
  ['双心相连','20步内，让两颗桃子合成西瓜。',square,[],{fruit:{targetTier:4,count:1}},{fruit:[0,0,1,2,3]}],
  ['凤凰归巢','20步内，完成四级成长与跨链接力。',square,[],{fruit:{targetTier:4,count:1},plant:{targetTier:2,count:1}},{fruit:[0,0,1,2,3],plant:[0,0,1]}]
];
let seed=60623;function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;}
const shuffle=a=>a.map(v=>[random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]);
function generate(spec,index){
  const [title,subtitle,mask,rocks,chainGoals,desired]=spec;
  const l={id:'slide06-'+String(index+1).padStart(2,'0'),title,subtitle,rows:mask.length,cols:mask[0].length,mask,rocks,chainGoals,
    tiles:[],pattern:patterns[index],moveLimit:20,parMoves:1,twoStarScore:1,threeStarScore:2,ruleset:E.RULESET};
  const floor=[];for(let r=0;r<l.rows;r++)for(let c=0;c<l.cols;c++)if(E.walkable(l,r,c)&&!E.rockAt(l,r,c))floor.push({row:r,col:c});
  for(let attempt=0;attempt<600;attempt++){
    const s={...l,tiles:[],status:'playing'},solution=[];let id=0,failed=false;
    const fresh=()=> 't'+(++id);
    function pair(target,tier,chain,delivery){
      for(const source of shuffle(floor)){
        if(E.tileAt(s,source.row,source.col)||source.row!==target.row&&source.col!==target.col)continue;
        const direction=source.row===target.row?(source.col<target.col?'right':'left'):(source.row<target.row?'down':'up');
        const inputId=chain+'-'+tier,src={id:fresh(),itemId:inputId,...source};
        const previous=target.itemId;target.itemId=inputId;s.tiles.push(src);
        const action={type:'slide',tileId:src.id,direction},check=E.inspectAction(s,action);
        if(check.ok&&check.targetId===target.id&&check.kind===(delivery?'deliver':'upgrade')){solution.unshift(action);return true;}
        s.tiles.pop();target.itemId=previous;
      }return false;
    }
    function reverseTravel(){
      for(const t of shuffle(s.tiles)){
        const end={row:t.row,col:t.col};
        for(const from of shuffle(floor)){
          if(E.tileAt(s,from.row,from.col)||from.row!==end.row&&from.col!==end.col)continue;
          Object.assign(t,from);
          const direction=from.row===end.row?(from.col<end.col?'right':'left'):(from.row<end.row?'down':'up');
          const action={type:'slide',tileId:t.id,direction},check=E.inspectAction(s,action);
          if(check.ok&&check.kind==='move'&&check.to.row===end.row&&check.to.col===end.col){solution.unshift(action);return true;}
          Object.assign(t,end);
        }
      }return false;
    }
    for(const [chain,g] of shuffle(Object.entries(chainGoals))){
      for(let n=0;n<g.count;n++){
        let placed=false;
        for(const pos of shuffle(floor)){
          if(E.tileAt(s,pos.row,pos.col))continue;
          const target={id:fresh(),itemId:chain+'-'+g.targetTier,...pos};s.tiles.push(target);
          if(pair(target,g.targetTier-1,chain,true)){placed=true;break;}s.tiles.pop();
        }
        if(!placed){failed=true;break;}
      }
      if(failed)break;
    }
    if(failed)continue;
    for(let steps=0;steps<30;steps++){
      const split=shuffle(s.tiles.filter(t=>{const it=C.items[t.itemId];return it.tier>0&&s.tiles.filter(x=>x.itemId===t.itemId).length>desired[it.chainId].filter(x=>x===it.tier).length;}));
      if(!split.length)break;
      let done=false;
      for(const target of split){const it=C.items[target.itemId];if(pair(target,it.tier-1,it.chainId,false)){done=true;break;}}
      if(!done){if(!reverseTravel()){failed=true;break;}continue;}
      if(index>0)reverseTravel();
    }
    if(failed)continue;
    if(Object.entries(desired).some(([chain,tiers])=>JSON.stringify(s.tiles.filter(t=>C.items[t.itemId].chainId===chain).map(t=>C.items[t.itemId].tier).sort())!==JSON.stringify([...tiers].sort())))continue;
    for(let n=0;n<(index?Math.min(index,5):0);n++)reverseTravel();
    if(solution.length>l.moveLimit)continue;
    l.tiles=E.clone(s.tiles);l.parMoves=solution.length;
    if(!E.validateDefinition(l).ok)throw Error(E.validateDefinition(l).errors);
    const played=E.replay(l,solution).state;if(played.status!=='won')throw Error('Reverse proof failed');
    if(index>0&&solution.length<desired[Object.keys(desired)[0]].length)continue;
    const score=E.result(played,l).score;
    l.threeStarScore=score;l.twoStarScore=Math.max(1,score-150);l.referenceSolution=solution;
    // The route remains valid when thresholds become part of the definition identity.
    l.scoreProofs=[{actions:solution,score,stars:3}];
    return l;
  }throw Error('Unable to author '+title);
}
const levels=specs.map(generate);
// Choose challenging starts from the fully proved spatial graph instead of
// padding a route with travel. Every recommended route is actually shortest.
const {proveSpatialSafety}=require('./validate_v06_levels.cjs');
for(const [index,level] of levels.entries())if(index>=2){
  const proof=proveSpatialSafety(level,{recommendStart:true});
  if(!proof.allReachableSolvable)throw Error('Unsafe authored layout '+level.id);
  level.tiles=proof.recommendedTiles;level.referenceSolution=proof.recommendedSolution;level.parMoves=proof.recommendedShortestMoves;
  const played=E.replay(level,level.referenceSolution).state,score=E.result(played,level).score;
  level.threeStarScore=score;level.twoStarScore=Math.max(1,score-150);level.scoreProofs=[{actions:level.referenceSolution,score,stars:3}];
}
const text='/* Authored by reverse moves, verified by forward replay. */\n(function(root){\n  const levels='+JSON.stringify(levels,null,2)+';\n  root.TileSlideV06={...(root.TileSlideV06||{}),levels};\n  if(typeof module!=="undefined")module.exports=levels;\n})(globalThis);\n';
fs.writeFileSync('web/slide-v06/levels.js',text);
console.log(levels.map(l=>({title:l.title,tiles:l.tiles.length,moves:l.parMoves,threeStar:l.threeStarScore})));
