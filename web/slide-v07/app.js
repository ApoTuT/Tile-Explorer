(function(){
  'use strict';
  const G=globalThis.TileSlideV07,{content:C,engine:E,levels,solver:S}=G,$=id=>document.getElementById(id);
  let storage;try{storage=localStorage;}catch(_){}
  const params=new URLSearchParams(location.search),demo=Number(params.get('demo'));
  const session=new G.GameSession(levels,storage,{preview:location.pathname.includes('preview'),debug:params.get('debug')==='1',demo:[15,20,25,30].includes(demo)});
  if(session.demo&&session.read('demoTarget')!==demo){session.start(levels[demo-1]);session.write('demoTarget',demo);}
  const board=$('board'),dialogs=[...document.querySelectorAll('dialog')],cache=new Map(),taught=new Set();
  let selected=null,pendingPlacement=null,activeChain=Object.keys(session.level.chainGoals)[0],input,winTimer,feedbackTimer,idleTimer,hintEpoch=0,solving=false,cell=60,gap=6,audio;
  const animations=new Set();
  const reduced=()=>session.settings.reducedMotion||matchMedia('(prefers-reduced-motion: reduce)').matches;
  const busy=()=>dialogs.some(d=>d.open)||document.hidden;
  const image=(itemId,alt='')=>{const img=document.createElement('img');img.src='./'+C.items[itemId].asset;img.alt=alt;img.draggable=false;return img;};
  const stars=n=>'★'.repeat(n)+'☆'.repeat(3-n);
  function say(text){$('notice').textContent=text+(session.failed?'（本次进度暂存于内存）':'');}
  function cancel(){input?.cancel();hintEpoch++;solving=false;$('solve-hint').disabled=false;clearTimeout(winTimer);clearTimeout(feedbackTimer);$('feedback').className='';for(const a of animations)a.cancel();animations.clear();board.querySelectorAll('.travel-ghost,.effect-flash').forEach(n=>n.remove());}
  function open(id){cancel();$(id).showModal();}
  function closeAll(){for(const d of dialogs)if(d.open)d.close();}
  function pulse(points,count){const f=$('feedback');f.textContent=(count===1?'Good!':count===2?'Excellent!':'Perfect!')+' +'+points;f.className='';void f.offsetWidth;f.className='show';
    feedbackTimer=setTimeout(()=>f.className='',700);
    if(session.settings.soundEnabled)try{audio=audio||new (window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();
      const t=audio.currentTime,gain=audio.createGain();gain.connect(audio.destination);gain.gain.setValueAtTime(.06,t);gain.gain.exponentialRampToValueAtTime(.001,t+.2);
      const osc=audio.createOscillator();osc.type='sine';osc.frequency.value=[523.25,659.25,783.99,1046.5][Math.min(count-1,3)];osc.connect(gain);osc.start(t);osc.stop(t+.22);}catch(_){}
  }
  function renderPath(){
    if(!session.level.chainGoals[activeChain])activeChain=Object.keys(session.level.chainGoals)[0];
    const target=session.level.chainGoals[activeChain].targetTier,tile=session.state.tiles.find(t=>t.id===selected),current=tile?C.items[tile.itemId]:null,path=$('recipe-path');path.replaceChildren();
    for(let tier=0;tier<=target;tier++){
      if(tier){const arrow=document.createElement('span');arrow.className='path-arrow';arrow.textContent='→';path.append(arrow);}
      const it=C.item(activeChain,tier),n=document.createElement('div');n.className='path-node'+(tier===target?' crown':'')+(current?.chainId===activeChain&&current.tier===tier?' current':'');
      n.append(image(it.id));const name=document.createElement('span');name.textContent=it.name;n.append(name);path.append(n);
    }
    $('recipe-copy').textContent=current?.chainId===activeChain?`${current.name} × 2 → ${C.items[current.nextItemId]?.name||'目标'} · 每步都需两个同类`:'每步都需 2 个相同图案 · 皇冠是本关目标';
    board.querySelectorAll('.tile').forEach(n=>{const t=session.state.tiles.find(t=>t.id===n.dataset.tileId);n.classList.toggle('selected',n.dataset.tileId===selected);n.classList.toggle('partner',!!current&&t?.id!==selected&&t?.itemId===current.id);});
    $('goals').querySelectorAll('button').forEach(n=>n.classList.toggle('active',n.dataset.chain===activeChain));
  }
  function select(id){selected=id;const t=session.state.tiles.find(t=>t.id===id);if(t)activeChain=C.items[t.itemId].chainId;renderPath();if(id==='obstacle')say('障碍每次只挪一格，同时消耗一步和一次挪动机会。');}
  function setPos(node,p,entity=p){node.style.setProperty('--row',p.row);node.style.setProperty('--col',p.col);const f=entity.itemId?E.footprint(session.state,entity):{width:entity.width||1,height:entity.height||1};node.style.setProperty('--w',f.width);node.style.setProperty('--h',f.height);}
  const arrow={up:'↑',down:'↓',left:'←',right:'→'},directionName={up:'上',down:'下',left:'左',right:'右'};
  function featureCopy(){const f=session.state.features,out=[];if(session.level.features?.crates?.length)out.push(`✹ 连锁爆破 · 火药箱 ${f.crates.length} 个`);if(f.brakes.length)out.push('✿ 转向花台 · 沿箭头继续滑');if(f.portals.length)out.push('◎ 接力门 · 穿门不停步');return out.join('　');}
  function drawTerrain(){const s=session.state;for(const c of s.features.crates){const n=document.createElement('div');n.className='terrain crate powder';n.dataset.crateId=c.id;n.textContent='✹';n.setAttribute('aria-label','火药箱，四邻爆破引发相连箱子连锁爆炸');setPos(n,c);board.append(n);}
    for(const b of s.features.brakes){const n=document.createElement('div');n.className='terrain brake turntable';n.dataset.brakeId=b.id;n.textContent=arrow[b.direction]||'✿';n.setAttribute('aria-label',`${b.width}×${b.height}转向花台，向${directionName[b.direction]}继续滑，可反复使用`);setPos(n,b,b);board.append(n);}
    for(const p of s.features.portals)for(const [name,end,other] of [['A',p.a,p.b],['B',p.b,p.a]]){const blocked=E.rectangle(other,p).some(q=>E.rockAt(s,q.row,q.col)||E.tileAt(s,q.row,q.col)),n=document.createElement('div');n.className='terrain portal portal-'+name+(blocked?' occupied':'');n.dataset.portalId=p.id;n.dataset.end=name;n.textContent=name;n.setAttribute('aria-label',`${p.width}×${p.height}接力门 ${name}，${blocked?'另一端被占用':'沿原方向穿行，可重复使用'}`);const label=document.createElement('small');label.textContent=blocked?'出口占用':'↔ ∞';n.append(label);setPos(n,end,p);board.append(n);}}
  const view={
    metrics:()=>({cellSize:cell,pitch:cell+gap}),settle(){},reject(){},
    clearPreview(){board.querySelectorAll('.preview-route,.preview-end,.preview-blast,.preview-entry,.route-svg').forEach(n=>n.remove());board.querySelector('.preview-source')?.classList.remove('preview-source');$('route-readout').hidden=true;},
    preview(id,direction,check){this.clearPreview();if(!check.ok)return;
      const entity=session.state.tiles.find(t=>t.id===id)||{};
      for(const p of check.path){const n=document.createElement('i');n.className='preview-route';setPos(n,p,entity);board.append(n);}
      const end=document.createElement('div');end.className='preview-end';setPos(end,check.to,entity);
      if(check.resultId){end.append(image(check.resultId));if(check.kind==='deliver'){const crown=document.createElement('span');crown.textContent='♛';end.append(crown);}}
      board.append(end);board.querySelector(`[data-tile-id="${id}"]`)?.classList.add('preview-source');
      for(const p of check.blast||[]){const n=document.createElement('i');n.className='preview-blast';setPos(n,p);board.append(n);}
      for(const c of session.state.features.crates.filter(c=>check.removedCrateIds?.includes(c.id))){const n=document.createElement('i');n.className='preview-blast breaks';n.textContent='✹';setPos(n,c);board.append(n);}
      if(check.portalId){const n=document.createElement('div');n.className='preview-entry';n.textContent='传送 ↗';setPos(n,check.entry,entity);board.append(n);}
      if(check.turns?.length||check.transfers?.length)drawRoute(check,entity);
      const parts=[];if(check.transfers?.length)parts.push('穿门继续滑');if(check.turns?.length)parts.push(check.turns.map(t=>'向'+directionName[t.direction]+'转弯').join(' → '));if(check.resultId)parts.push('合成'+C.items[check.resultId].name);if(check.bomb)parts.push(check.removedCrateIds.length?'连锁炸开 '+check.removedCrateIds.length+' 箱':'未击中火药箱，爆破会消耗');
      if(parts.length){$('route-readout').hidden=false;$('route-readout').textContent=parts.join(' → ');$('route-readout').classList.toggle('warning',!!check.bomb&&!check.removedCrateIds.length);}
    }
  };
  function drawRoute(check,entity){const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.classList.add('route-svg');svg.setAttribute('aria-hidden','true');
    const f=entity.itemId?E.footprint(session.state,entity):{width:1,height:1},center=p=>({x:p.col*(cell+gap)+(f.width*(cell+gap)-gap)/2,y:p.row*(cell+gap)+(f.height*(cell+gap)-gap)/2});
    const points=[...check.waypoints,check.to];for(let i=1;i<points.length;i++){const a=center(points[i-1]),b=center(points[i]);if(a.x===b.x&&a.y===b.y)continue;const line=document.createElementNS(ns,'line');line.setAttribute('x1',a.x);line.setAttribute('y1',a.y);line.setAttribute('x2',b.x);line.setAttribute('y2',b.y);line.setAttribute('class',points[i].jump?'jump':'slide');svg.append(line);}
    for(const t of check.turns||[]){const p=center(t.at),dot=document.createElementNS(ns,'circle');dot.setAttribute('cx',p.x);dot.setAttribute('cy',p.y);dot.setAttribute('r',7);svg.append(dot);}board.append(svg);}
  function resize(){gap=session.state.cols>=8?3:6;cell=Math.min(68,Math.floor(($('board').parentElement.clientWidth-gap*(session.state.cols-1))/session.state.cols),session.level.regions?Math.max(28,Math.floor((innerHeight-310)/session.state.rows)-gap):68);
    board.style.setProperty('--gap',gap+'px');board.style.setProperty('--cell',cell+'px');board.style.setProperty('--pitch',(cell+gap)+'px');board.style.width=(session.state.cols*(cell+gap)-gap)+'px';board.style.height=(session.state.rows*(cell+gap)-gap)+'px';}
  function drawPattern(node,pattern){node.replaceChildren();node.style.gridTemplateColumns=`repeat(${pattern[0].length},1fr)`;node.style.gridTemplateRows=`repeat(${pattern.length},1fr)`;for(const row of pattern)for(const c of row){const n=document.createElement('i');if(c==='#')n.className='on';node.append(n);}}
  function renderGardens(){const nav=$('garden-progress'),regions=session.level.regions;nav.hidden=!regions;nav.replaceChildren();
    for(const [i,r] of (regions||[]).entries()){const left=session.state.tiles.filter(t=>t.row>=r.row&&t.row<r.row+r.rows&&t.col>=r.col&&t.col<r.col+r.cols).length,b=document.createElement('button');b.className='garden-chip garden-'+i+(left?'':' complete');b.textContent=r.title+' · '+(left?left+' 块材料':'已完成 ✓');b.onclick=()=>{cancel();window.scrollTo({top:Math.max(0,scrollY+board.getBoundingClientRect().top+r.row*(cell+gap)-96),behavior:reduced()?'instant':'smooth'});};nav.append(b);}}
  function render(){
    const s=session.state,l=session.level,index=levels.findIndex(x=>x.id===l.id),r=E.result(s,l),focus=document.activeElement?.dataset?.tileId;
    document.body.classList.toggle('dense-garden',!!l.regions);if($('path-details').dataset.level!==l.id){$('path-details').dataset.level=l.id;$('path-details').open=!l.regions;}
    renderGardens();document.body.classList.toggle('reduced',reduced());$('title').textContent=`${index+1}. ${l.title}`;$('subtitle').textContent=l.subtitle;drawPattern($('pattern-shape'),l.pattern||l.mask);
    $('score').textContent=r.score;$('chain').textContent=s.chainCount>1?`${s.chainCount} 连击${s.setupMovesSinceMerge===1?' · 再合一次接上':''}`:'';
    $('chapter').textContent=`第 ${l.chapter} / 6 章 · ${index+1} / 30 关`+(session.demo?' · 新玩法速玩':session.debug?' · 测试选关':'');$('feature-panel').hidden=!featureCopy();$('feature-panel').textContent=featureCopy();
    $('stars').textContent=stars(s.status==='won'?r.stars:s.status==='lost'?0:s.mergeScore>=l.threeStarScore?3:s.mergeScore>=l.twoStarScore?2:0);
    $('star-target').textContent=`二星 ${l.twoStarScore} · 三星 ${l.threeStarScore}`;
    const left=Math.max(0,s.moveLimit-s.successfulMoves);$('moves-left').textContent=left;$('move-budget').classList.toggle('low',left<=3);$('move-limit-copy').textContent=`限 ${s.moveLimit} 步 · 已用 ${s.successfulMoves} 步`;
    $('moves').textContent=s.successfulMoves+' 次操作';$('undo').disabled=!session.history.length||session.history.at(-1).action.type==='place-obstacle';$('continue').hidden=['playing','placing'].includes(s.status);$('continue').textContent=s.status==='lost'?'查看未通关结算 →':'查看结算 →';$('hint').disabled=!['playing','placing'].includes(s.status);
    $('obstacle-panel').hidden=!s.obstacle;$('placement-confirm').hidden=s.status!=='placing';$('placement-confirm').disabled=!pendingPlacement;
    $('obstacle-copy').textContent=s.status==='placing'?'选择虚线格放障碍，再点开始；布置不花步数。':s.obstacle?.moveLimit?`障碍还可挪 ${s.obstacle.moveLimit-s.obstacle.movesUsed} / ${s.obstacle.moveLimit} 次 · 每次一格，花一步`:'本关障碍固定 · 可以帮材料停靠';
    $('obstacle-arrows').hidden=s.status!=='playing'||!s.obstacle?.moveLimit;
    $('obstacle-arrows').querySelectorAll('button').forEach(b=>b.disabled=!E.inspectAction(s,{type:'move-obstacle',direction:b.dataset.direction}).ok);
    $('goals').replaceChildren();
    for(const [chain,g] of Object.entries(s.chainGoals)){const it=C.item(chain,g.targetTier),b=document.createElement('button');b.className='goal';b.dataset.chain=chain;
      b.setAttribute('aria-label',`${it.name} ${s.delivered[chain]}/${g.count}，查看合成路径`);b.append(image(it.id));const n=document.createElement('span');n.textContent=s.delivered[chain]+'/'+g.count;b.append(n);
      b.onclick=()=>{selected=null;activeChain=chain;renderPath();say(`每次用两个同级同类合成，最终收集${it.name}。`);};$('goals').append(b);}
    board.replaceChildren();for(let row=0;row<s.rows;row++)for(let col=0;col<s.cols;col++)if(E.walkable(s,row,col)){const n=document.createElement('div');n.className=s.rocks.some(p=>p.row===row&&p.col===col)?'rock':'floor';if(n.className==='rock'){n.textContent='◆';n.setAttribute('aria-label','固定石块');}const region=l.regions?.findIndex(r=>row>=r.row&&row<r.row+r.rows&&col>=r.col&&col<r.col+r.cols);if(region>=0)n.classList.add('garden-'+region);else if(l.regions)n.classList.add('garden-divider');setPos(n,{row,col});board.append(n);}
    drawTerrain();
    if(s.status==='placing')for(const p of s.obstacle.placementCells){const n=document.createElement('button');n.className='placement'+(pendingPlacement?.row===p.row&&pendingPlacement.col===p.col?' chosen':'');n.textContent=pendingPlacement?.row===p.row&&pendingPlacement.col===p.col?'◆':'+';n.dataset.placeRow=p.row;n.dataset.placeCol=p.col;n.setAttribute('aria-label',`在第${p.row+1}行第${p.col+1}列放障碍`);setPos(n,p);n.onclick=()=>{pendingPlacement={...p};render();};board.append(n);}
    if(s.obstacle?.position){const n=document.createElement('button');n.className='tile obstacle';n.dataset.tileId='obstacle';n.textContent='◆';n.setAttribute('aria-label',`障碍，还可挪动${s.obstacle.moveLimit-s.obstacle.movesUsed}次，每次一格`);setPos(n,s.obstacle.position);n.onfocus=()=>select('obstacle');n.onclick=()=>select('obstacle');board.append(n);}
    for(const t of s.tiles){const it=C.items[t.itemId],n=document.createElement('button');n.className='tile';n.dataset.tileId=t.id;setPos(n,t);n.setAttribute('aria-label',`${it.name}，等级 ${it.tier+1}，第${t.row+1}行第${t.col+1}列`);n.append(image(t.itemId));
      const f=E.footprint(s,t);n.setAttribute('aria-label',`${it.name}，等级 ${it.tier+1}，占${f.width}列${f.height}行，第${t.row+1}行第${t.col+1}列`);
      if(t.effect==='bomb'){n.classList.add('bomb-tile');const bomb=document.createElement('span');bomb.className='bomb-badge';bomb.textContent='✹';bomb.setAttribute('aria-hidden','true');n.append(bomb);n.setAttribute('aria-label',n.getAttribute('aria-label')+'，爆破卡，参与合成炸开四周木箱');}
      const covered=E.cells(s,t),onPortal=s.features.portals.some(p=>p.charges&&[p.a,p.b].some(end=>E.rectangle(end,p).some(q=>covered.some(c=>c.row===q.row&&c.col===q.col)))),onBrake=s.features.brakes.some(b=>b.charges&&E.rectangle(b).some(q=>covered.some(c=>c.row===q.row&&c.col===q.col)));
      if(onPortal||onBrake){const tag=document.createElement('span');tag.className='terrain-tag'+(onPortal?' portal-tag':'');tag.textContent=(onPortal?'A↔':'')+(onBrake?' ✿':'');n.append(tag);n.setAttribute('aria-label',n.getAttribute('aria-label')+(onPortal?'，下方有传送门':'')+(onBrake?'，下方有花台':''));}
      const badge=document.createElement('span');badge.className='tier';badge.textContent=it.tier+1;n.append(badge);if(f.width*f.height>1){const size=document.createElement('span');size.className='size-tag';size.textContent=f.width+'×'+f.height;n.append(size);}n.onfocus=()=>select(t.id);n.onclick=()=>select(t.id);board.append(n);}
    if(!s.tiles.some(t=>t.id===selected)&&selected!=='obstacle')selected=null;resize();renderPath();
    if(focus)board.querySelector(`[data-tile-id="${focus}"]`)?.focus({preventScroll:true});
    if(session.failed)say('存储暂不可用，你仍可以继续游戏。');
  }
  function scheduleResult(){if(['playing','placing'].includes(session.state.status)||busy())return;const epoch=session.epoch;winTimer=setTimeout(()=>{if(epoch===session.epoch&&!['playing','placing'].includes(session.state.status)&&!busy())showResult();},reduced()?0:700);}
  function showResult(){if(session.state.status==='won')showWin();else if(session.state.status==='lost')showLoss();}
  function showWin(){cancel();const s=session.state,l=session.level,r=E.result(s,l),last=l.id===levels.at(-1).id;$('win-title').textContent=last?'30 关，新花样，全部完成！':'本关完成！';$('win-stars').textContent=stars(r.stars);$('win-score').textContent=r.score+' 分';
    $('win-detail').textContent=`合成 ${s.mergeScore} + 巧解奖励 ${r.efficiency} · ${s.successfulMoves} 步（障碍 ${s.obstacle?.movesUsed||0} 次）· 最长 ${s.bestChain} 连击`;
    $('win-best').textContent=`本关最高 ${session.bestFor(l).score} 分 · 已收集 ${levels.reduce((sum,l)=>sum+session.bestFor(l).stars,0)} / 90 星`;
    $('win-goals').replaceChildren();for(const [chain,g] of Object.entries(l.chainGoals))for(let n=0;n<g.count;n++)$('win-goals').append(image(C.item(chain,g.targetTier).id,C.item(chain,g.targetTier).name));
    $('next').textContent=last?'查看三十关集星 →':'下一关 →';$('win-dialog').showModal();}
  function showLoss(){cancel();const s=session.state;$('loss-detail').textContent=`已用完 ${s.moveLimit} 步，本关目标尚未全部收集。`;$('loss-undo').disabled=!session.history.length;$('loss-dialog').showModal();}
  function idle(){clearTimeout(idleTimer);idleTimer=setTimeout(()=>{if(!busy()&&session.state.status==='playing')say('需要一点灵感？点“提示”查看升级路径和下一步。');},20000);}
  function animate(event,sourceItemId){if(reduced()||!board.animate)return;
    const ghost=document.createElement('div');ghost.className='tile travel-ghost'+(sourceItemId?'':' obstacle');ghost.style.pointerEvents='none';ghost.style.zIndex=5;setPos(ghost,event.from,sourceItemId?{itemId:sourceItemId}:{});if(sourceItemId)ghost.append(image(sourceItemId));else ghost.textContent='◆';board.append(ghost);
    const route=[...(event.waypoints||[event.from]),event.to],frames=[];
    for(let i=0;i<route.length;i++){const p=route[i],transform=`translate(${(p.col-event.from.col)*(cell+gap)}px,${(p.row-event.from.row)*(cell+gap)}px)`;if(p.jump){const prior=route[i-1],fromTransform=`translate(${(prior.col-event.from.col)*(cell+gap)}px,${(prior.row-event.from.row)*(cell+gap)}px)`;frames.push({transform:fromTransform,opacity:0,offset:(i-.55)/(route.length-1)},{transform,opacity:0,offset:(i-.5)/(route.length-1)});}frames.push({transform,opacity:i===route.length-1?.15:1,offset:i/(route.length-1)});}
    const ms=Math.min(850,180+event.distance*45+((event.turns?.length||0)+(event.transfers?.length||0))*120),animation=ghost.animate(frames,{duration:ms,easing:'linear'});
    animations.add(animation);animation.finished.then(()=>{animations.delete(animation);ghost.remove();}).catch(()=>ghost.remove());
    if(event.kind==='upgrade'){const target=board.querySelector(`[data-tile-id="${event.targetId}"] img`);if(target){const grow=target.animate([{transform:'scale(.78)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:220,delay:ms*.6});animations.add(grow);grow.finished.then(()=>animations.delete(grow)).catch(()=>{});}}
  }
  function commit(a){cancel();const before=session.state,sourceItemId=before.tiles.find(t=>t.id===a.tileId)?.itemId,r=session.apply(a);if(!r.ok)return;render();idle();
    const event=r.events[0];if(event.kind==='place'){pendingPlacement=null;say('障碍已放好。先观察伙伴与通路，再开始滑动。');return;}animate(event,sourceItemId);
    if(['upgrade','deliver'].includes(event.kind)){
      selected=event.kind==='upgrade'?event.targetId:null;activeChain=event.chainId;renderPath();pulse(event.points,event.chainCount);
      if(event.kind==='upgrade'){const it=C.items[event.resultId];say(`${it.name}留在这里，再找一${it.chainId==='car'?'辆':'个'}${it.name}继续合成。`);board.querySelector(`[data-tile-id="${selected}"]`)?.focus({preventScroll:true});}
      else say(`${C.items[event.resultId].name}收集成功！`);
    }else say(event.kind==='obstacle'?`障碍挪了一格，还可挪 ${session.state.obstacle.moveLimit-session.state.obstacle.movesUsed} 次。`:session.state.chainCount&&session.state.setupMovesSinceMerge===1?'接上一次合成，连击继续。':'先挪个位置，下一次就更顺手。');
    const blast=r.events.find(e=>e.type==='blast-resolved'),combo=[];
    if(event.transfers?.length)combo.push('穿门接力');if(event.turns?.length)combo.push(event.turns.length>1?'连续转向':'花台转向');
    if(blast){combo.push(blast.removedIds.length?'连锁爆破 ×'+blast.removedIds.length:'空爆');say(blast.removedIds.length?`连锁炸开 ${blast.removedIds.length} 个火药箱，新通道打开了！`:'没有炸到火药箱。可以撤销，把合成落点移到墙边。');
      if(!reduced())for(const [i,p] of before.features.crates.filter(c=>blast.removedIds.includes(c.id)).entries()){const n=document.createElement('i');n.className='effect-flash blast-shard';n.textContent='✹';setPos(n,p);board.append(n);const animation=n.animate([{opacity:0,transform:'scale(.7)'},{opacity:1,transform:'scale(1.2)',offset:.25},{opacity:0,transform:'scale(1.6) rotate(20deg)'}],{duration:540,delay:i*45});animations.add(animation);animation.finished.then(()=>{animations.delete(animation);n.remove();}).catch(()=>n.remove());}}
    for(const turn of event.turns||[])flashTerrain(`[data-brake-id="${turn.id}"]`);for(const transfer of event.transfers||[])flashTerrain(`[data-portal-id="${transfer.id}"]`);
    if(combo.length){$('feedback').textContent=combo.join(' · ');$('feedback').className='mechanic show';if(!blast)say(combo.join(' → ')+(event.resultId?' → '+C.items[event.resultId].name+'合成成功！':'，一划完成；还可以再次使用。'));}
    if(session.state.status==='lost')say(`本关 ${session.state.moveLimit} 步已用完。撤销上一步可恢复步数，或重新挑战。`);scheduleResult();
  }
  function flashTerrain(selector){if(reduced())return;for(const n of board.querySelectorAll(selector)){const a=n.animate([{filter:'brightness(1)',transform:'scale(1)'},{filter:'brightness(1.5)',transform:'scale(1.12)'},{filter:'brightness(1)',transform:'scale(1)'}],{duration:650});animations.add(a);a.finished.then(()=>animations.delete(a)).catch(()=>{});}}
  function undo(){cancel();closeAll();if(session.undo()){render();say(`退回上一步，棋盘、积分和步数一起恢复。还剩 ${session.state.moveLimit-session.state.successfulMoves} 步。`);}idle();}
  function start(l){if(!session.isUnlocked(l))return;cancel();closeAll();session.start(l);selected=null;pendingPlacement=null;activeChain=Object.keys(l.chainGoals)[0];render();idle();say(session.state.status==='placing'?'先选一个虚线格，放置障碍后开始挑战。':l.subtitle);
    if(!taught.has(l.id)){taught.add(l.id);if(l.regions)say('三处庭院可以自由选择顺序，共享步数；先看清停靠点，需要时免费撤销。');}}
  function levelList(){const total=levels.reduce((s,l)=>s+session.bestFor(l).stars,0);$('collection').textContent=`已收集 ${total} / 90 星 · 通关解锁下一关`;$('level-list').replaceChildren();
    for(const [i,l] of levels.entries()){if(i%5===0){const h=document.createElement('h3');h.className='chapter-heading';h.textContent='第 '+l.chapter+' 章 · '+['停靠与次序','大小块调度','布局进阶与三庭','封锁与转向','转向与跨区','综合花园挑战'][l.chapter-1];$('level-list').append(h);}const b=document.createElement('button');b.disabled=!session.isUnlocked(l);b.className='level-card'+(l.id===session.level.id?' current':'');const mini=document.createElement('span');mini.className='mini-board';mini.setAttribute('aria-hidden','true');drawPattern(mini,l.pattern||l.mask);b.append(mini);
      const title=document.createElement('span');title.textContent=(i+1)+'. '+l.title;b.append(title);const st=document.createElement('span');st.className='level-stars';st.textContent=stars(session.bestFor(l).stars);b.append(st);const score=document.createElement('small');score.textContent=session.bestFor(l).score+' 分 · 限 '+l.moveLimit+' 步';b.append(score);b.onclick=()=>start(l);$('level-list').append(b);}}
  function hintRecipe(){const s=session.state,chain=activeChain,g=s.chainGoals[chain],tiles=s.tiles.filter(t=>C.items[t.itemId].chainId===chain),chosen=s.tiles.find(t=>t.id===selected)||tiles.sort((a,b)=>C.items[a.itemId].tier-C.items[b.itemId].tier)[0];
    const it=chosen?C.items[chosen.itemId]:C.item(chain,g.targetTier-1);$('hint-path').replaceChildren();$('hint-path').append(image(it.id,it.name),document.createTextNode(' + '),image(it.id,it.name),document.createTextNode(' → '),image(it.nextItemId,C.items[it.nextItemId].name));
    const partners=tiles.filter(t=>t.itemId===it.id).length;
    $('hint-copy').textContent=`两个${it.name}合成一个${C.items[it.nextItemId].name}。`+(partners<2&&it.tier>0?`先用两个${C.item(chain,it.tier-1).name}生成另一个${it.name}。`:'中间产物会留在被撞的格子；选择合适的方向，再继续下一段。');}
  function cachedRoute(s){
    if(s.status==='placing')return session.level.referenceSolution[0];
    const key=E.canonicalKey(s),budget=s.moveLimit-s.successfulMoves;
    if(!cache.has(key)){let st=E.createState(session.level);for(const a of session.level.referenceSolution){const t=st.tiles.find(t=>t.id===a.tileId);cache.set(E.canonicalKey(st),{action:a,row:t?.row,col:t?.col,itemId:t?.itemId,remainingMoves:session.level.referenceSolution.filter(a=>a.type!=='place-obstacle').length-st.successfulMoves});st=E.applyAction(st,a).state;}}
    const d=cache.get(key);if(d&&d.remainingMoves<=budget){if(d.action.type!=='slide')return d.action;const t=s.tiles.find(t=>t.row===d.row&&t.col===d.col&&t.itemId===d.itemId);if(t)return {...d.action,tileId:t.id};}return null;
  }
  input=G.input.bindInput({board,view,getState:()=>session.state,engine:E,isBusy:busy,isReducedMotion:reduced,commit,undo,
    onStart:({tileId})=>{select(tileId);idle();},onReject:check=>{const t=session.state.tiles.find(t=>t.id===check.tileId),other=session.state.tiles.find(t=>t.id===check.targetId);
      if(t&&other&&C.items[t.itemId].chainId===C.items[other.itemId].chainId)say(`${C.items[t.itemId].name}只能和相同图案合成，看看上方升级路径。`);else say('这个方向暂时被挡住了，换个方向或先让路。');}});
  $('undo').onclick=undo;$('loss-undo').onclick=undo;$('restart').onclick=()=>start(session.level);$('replay').onclick=()=>start(session.level);$('loss-retry').onclick=()=>start(session.level);
  $('placement-confirm').onclick=()=>{if(pendingPlacement)commit({type:'place-obstacle',...pendingPlacement});};
  $('obstacle-arrows').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(!busy())commit({type:'move-obstacle',direction:b.dataset.direction});});
    $('next').onclick=()=>{if(session.level.id===levels.at(-1).id){closeAll();levelList();open('level-dialog');}else start(levels[levels.findIndex(l=>l.id===session.level.id)+1]);};
  $('continue').onclick=showResult;$('level-button').onclick=()=>{levelList();open('level-dialog');};
  $('settings-button').onclick=()=>{$('sound-toggle').checked=session.settings.soundEnabled;$('motion-toggle').checked=session.settings.reducedMotion;open('settings-dialog');};
  for(const [id,key] of [['sound-toggle','soundEnabled'],['motion-toggle','reducedMotion']])$(id).onchange=()=>{session.settings[key]=$(id).checked;session.write('settings',session.settings);document.body.classList.toggle('reduced',reduced());};
  $('help-button').onclick=()=>open('help-dialog');$('hint').onclick=()=>{hintRecipe();open('hint-dialog');};
  $('solve-hint').onclick=async()=>{if(solving||!['playing','placing'].includes(session.state.status))return;solving=true;$('solve-hint').disabled=true;const epoch=session.epoch,token=++hintEpoch,copy=E.clone(session.state);
    $('hint-copy').textContent=`正在寻找剩余 ${copy.moveLimit-copy.successfulMoves} 步内的通关路线…`;let action=cachedRoute(copy),status='solved';
    if(!action){const found=await S.workerHint(copy,{regions:session.level.regions,maxStates:18000,maxMs:1400,isCancelled:()=>token!==hintEpoch||epoch!==session.epoch});status=found.status;action=found.solution?.[0];}
    if(token!==hintEpoch||epoch!==session.epoch)return;solving=false;$('solve-hint').disabled=false;
    if(action?.type==='place-obstacle'){closeAll();pendingPlacement={row:action.row,col:action.col};render();say('这个位置有经过验证的通关路线，点“开始挑战”确认。');}
    else if(action?.type==='move-obstacle'){closeAll();select('obstacle');view.preview('obstacle',action.direction,E.inspectAction(session.state,action));say(`把障碍向${{up:'上',down:'下',left:'左',right:'右'}[action.direction]}挪一格，给后面的材料让路。`);}
    else if(action){const t=session.state.tiles.find(t=>t.id===action.tileId),it=C.items[t.itemId],check=E.inspectAction(session.state,action),dir={up:'上',down:'下',left:'左',right:'右'}[action.direction];
      closeAll();select(t.id);view.preview(t.id,action.direction,check);say(`把第${t.row+1}行第${t.col+1}列的${it.name}向${dir}滑。${check.kind==='upgrade'?'新产物留在终点。':check.kind==='deliver'?'这次可以收集目标。':'先为后面的合成安排位置。'}`);
    }else $('hint-copy').textContent=status==='out-of-moves'||status==='unsolvable'?`剩余 ${copy.moveLimit-copy.successfulMoves} 步内无法完成收集，试试撤销几步重新安排，或重试本关。`:'暂时没找到剩余步数内的路线，可以先查看升级路径，或撤销调整。';
  };
  for(const d of dialogs){d.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>d.close());d.addEventListener('close',()=>{hintEpoch++;solving=false;$('solve-hint').disabled=false;idle();});}
  window.addEventListener('resize',()=>{cancel();resize();});document.addEventListener('visibilitychange',()=>{cancel();if(!document.hidden)scheduleResult();});
  window.addEventListener('pagehide',cancel);
  // Read-only inspection surface for browser verification; input still commits all moves.
  window.slideV07={get state(){return E.clone(session.state);},get level(){return session.level;},get busy(){return busy();},get result(){return E.result(session.state,session.level);},get storageFailed(){return session.failed;}};
  $('demo-button').onclick=()=>{const link=new URL(location.href);link.search='?demo=15';location.href=link.href;};
  document.querySelectorAll('[data-demo]').forEach(b=>b.onclick=()=>{if(session.demo)start(levels[Number(b.dataset.demo)-1]);else{const link=new URL(location.href);link.search='?demo='+b.dataset.demo;location.href=link.href;}});
  $('demo-nav').hidden=!session.demo;$('demo-button').hidden=session.demo;
  $('exit-demo').onclick=()=>{const link=new URL(location.href);link.search='';location.href=link.href;};
  render();say(session.restoreNotice==='updated'?'30 关已重排为花园挑战，本关重新开始；已解锁关卡保留，新布局单独计星。':session.restoreNotice==='invalid'?'存档未能恢复，已从本关重新开始。':session.state.status==='lost'?`本关 ${session.state.moveLimit} 步已用完。可以撤销上一步或重新挑战。`:session.level.subtitle);idle();scheduleResult();
})();
