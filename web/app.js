(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  let state = null, busy = false, magicArmed = false, boardBounds = null, boardKey = '', sceneKey = '', toastTimer, resizeFrame, previousSaveWarning = '';
  const theater = globalThis.TileTheater || {};
  const audio = theater.AudioManager ? new theater.AudioManager() : null;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let sceneEpoch = 0, actionSeq = 0, presentationEpoch = 0, trayView, director;
  const cities = [
    {id:'paris',city:'巴黎',country:'法国',english:'PARIS',title:'你好，巴黎！',subtitle:'沿着塞纳河，收集一小份浪漫。',accent:'#e88c74',deep:'#ba6c59',tint:'#fff0e3'},
    {id:'kyoto',city:'京都',country:'日本',english:'KYOTO',title:'花见，京都！',subtitle:'穿过鸟居，遇见樱花与古都。',accent:'#b998b4',deep:'#926989',tint:'#f6ecf0'},
    {id:'newyork',city:'纽约',country:'美国',english:'NEW YORK',title:'早安，纽约！',subtitle:'带着好奇心，走进摩天楼之间。',accent:'#8bacc9',deep:'#6485aa',tint:'#eaf1f8'}
  ];
  const symbolDefs = [
    ['apple','苹果','#e67569'],['banana','香蕉','#e7be55'],['cherry','樱桃','#d85d7b'],['grape','葡萄','#a18ac4'],['orange','橙子','#eea25a'],['strawberry','草莓','#e7798b'],
    ['car','小汽车','#7cb2cf'],['taxi','出租车','#e7bd55'],['bus','巴士','#89b5a4'],['train','火车','#a191c6'],['bicycle','自行车','#dc8f81'],['scooter','小摩托','#86b7b0'],
    ['cat','猫咪','#e2b47c'],['dog','小狗','#b68d6d'],['rabbit','兔子','#dfa5b4'],['panda','熊猫','#737986'],['fox','狐狸','#de9b63'],['bear','小熊','#ae8a70']
  ];
  const faces = '<circle cx="18" cy="27" r="1.6" fill="#555366"/><circle cx="30" cy="27" r="1.6" fill="#555366"/><path d="m22 33 2 2 2-2" fill="none" stroke="#786470" stroke-width="1.6" stroke-linecap="round"/>';
  const wheels = '<circle cx="14" cy="36" r="4.5" fill="#686777"/><circle cx="35" cy="36" r="4.5" fill="#686777"/><circle cx="14" cy="36" r="2" fill="#e4dfd3"/><circle cx="35" cy="36" r="2" fill="#e4dfd3"/>';
  const shapes = {
    apple:'<path d="M24 16C12 7 4 19 9 31c5 13 13 12 15 10 3 2 12 2 16-10 4-12-4-24-16-15Z" fill="currentColor"/><path d="M24 16c-1-7 1-10 4-12" fill="none" stroke="#8e8565" stroke-width="3" stroke-linecap="round"/><path d="M27 11c1-6 7-7 11-5-2 6-6 8-11 5Z" fill="#94b77e"/><path d="M14 22c-2 4-1 7 0 9" stroke="#ffdfcd" stroke-width="3" stroke-linecap="round" fill="none"/>',
    banana:'<path d="M11 8c1 23 11 31 28 18-7 17-24 22-32 9-5-9-3-17 1-26Z" fill="currentColor"/><path d="M9 13c-1 17 10 27 24 20" fill="none" stroke="#f8db83" stroke-width="3" stroke-linecap="round"/><path d="m9 5 4 2-2 5-4-1ZM37 25l4-2 2 3-4 3Z" fill="#ad945b"/>',
    cherry:'<path d="M14 27c3-12 9-15 15-20 0 11 2 16 7 22" fill="none" stroke="#8da578" stroke-width="2.8" stroke-linecap="round"/><path d="M27 8c8-8 14-2 13 2-6 1-10 0-13-2Z" fill="#a3bb8b"/><circle cx="13" cy="32" r="10" fill="currentColor"/><circle cx="34" cy="33" r="10" fill="currentColor"/><path d="m8 29 3-3m18 4 3-3" stroke="#ffd8dc" stroke-width="3" stroke-linecap="round"/>',
    grape:'<path d="M24 12V5" stroke="#8a9b70" stroke-width="3" stroke-linecap="round"/><path d="M24 9c5-8 12-6 13-1-4 5-9 5-13 1Z" fill="#a6bb85"/><g fill="currentColor"><circle cx="16" cy="17" r="7"/><circle cx="30" cy="17" r="7"/><circle cx="10" cy="28" r="7"/><circle cx="24" cy="28" r="7"/><circle cx="38" cy="28" r="7"/><circle cx="18" cy="38" r="7"/><circle cx="31" cy="38" r="7"/></g><g fill="#d9c9ef"><circle cx="14" cy="15" r="2"/><circle cx="22" cy="26" r="2"/><circle cx="16" cy="36" r="2"/></g>',
    orange:'<circle cx="24" cy="28" r="17" fill="currentColor"/><path d="M24 12c5-10 11-9 15-5-4 7-9 9-15 5Z" fill="#9ab97d"/><path d="M24 13V7" stroke="#a99a65" stroke-width="2.5" stroke-linecap="round"/><path d="M13 23c-2 4-2 7 0 10" stroke="#ffd5a0" stroke-width="3" stroke-linecap="round" fill="none"/><g fill="#dc8d49"><circle cx="31" cy="33" r="1"/><circle cx="35" cy="27" r="1"/><circle cx="27" cy="37" r="1"/></g>',
    strawberry:'<path d="M9 13c-8 12 5 28 15 32 10-4 23-20 15-32-7-7-23-7-30 0Z" fill="currentColor"/><path d="m24 4 4 7 11-3-7 9-8-4-8 4-7-9 11 3 4-7Z" fill="#8cab7d"/><g fill="#ffdcac"><ellipse cx="15" cy="22" rx="1.3" ry="2"/><ellipse cx="25" cy="24" rx="1.3" ry="2"/><ellipse cx="34" cy="21" rx="1.3" ry="2"/><ellipse cx="19" cy="32" rx="1.3" ry="2"/><ellipse cx="29" cy="32" rx="1.3" ry="2"/><ellipse cx="24" cy="39" rx="1.1" ry="1.6"/></g>',
    car:`<path d="m11 22 6-12h16l7 12" fill="currentColor"/><path d="m17 21 3-8h10l5 8" fill="#dcebf0"/><rect x="4" y="20" width="40" height="15" rx="5" fill="currentColor"/><rect x="5" y="25" width="6" height="4" rx="1" fill="#fff3b7"/><rect x="37" y="25" width="6" height="4" rx="1" fill="#e9abb1"/>${wheels}`,
    taxi:`<path d="m11 22 6-12h16l7 12" fill="currentColor"/><path d="m17 21 3-8h10l5 8" fill="#dcebf0"/><rect x="20" y="6" width="9" height="5" rx="2" fill="#f5db95"/><rect x="4" y="20" width="40" height="15" rx="5" fill="currentColor"/><path d="M19 25h4v4h-4Zm4 4h4v4h-4Zm4-4h4v4h-4Z" fill="#8e8265"/><path d="M5 25h5v4H5m33-4h5v4h-5" fill="#fff5c2"/>${wheels}`,
    bus:`<rect x="5" y="8" width="38" height="27" rx="6" fill="currentColor"/><rect x="9" y="12" width="8" height="11" rx="2" fill="#e3f2ed"/><rect x="20" y="12" width="8" height="11" rx="2" fill="#e3f2ed"/><rect x="31" y="12" width="8" height="17" rx="2" fill="#e3f2ed"/><path d="M7 27h19" stroke="#e3d69e" stroke-width="3"/>${wheels}`,
    train:'<path d="m12 45 4-8m20 8-4-8" stroke="#8e8d9b" stroke-width="3" stroke-linecap="round"/><rect x="9" y="4" width="30" height="34" rx="9" fill="currentColor"/><rect x="14" y="10" width="20" height="14" rx="4" fill="#e9e9f3"/><path d="M24 10v14" stroke="#c0b5da" stroke-width="2"/><circle cx="16" cy="30" r="3" fill="#ffe0a4"/><circle cx="32" cy="30" r="3" fill="#ffe0a4"/><path d="M15 41h18" stroke="#acabb5" stroke-width="2.5"/><rect x="19" y="5" width="10" height="2" rx="1" fill="#e3d7f2"/>',
    bicycle:'<g fill="none" stroke="#92939d" stroke-width="2.7"><circle cx="11" cy="32" r="9"/><circle cx="37" cy="32" r="9"/></g><path d="m11 32 9-18 9 18H11l12-11h9l5 11m-8-22h6l-3 11" stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M16 12h9" stroke="#8f7a6f" stroke-width="3.5" stroke-linecap="round"/>',
    scooter:'<circle cx="12" cy="36" r="7" fill="#727684"/><circle cx="37" cy="36" r="7" fill="#727684"/><circle cx="12" cy="36" r="3" fill="#dfe1d9"/><circle cx="37" cy="36" r="3" fill="#dfe1d9"/><path d="M5 30c1-9 15-9 18 1h9V16l-4-9h7l5 24" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M9 23h12" stroke="#8c7b75" stroke-width="4" stroke-linecap="round"/><path d="m29 8-5-2" stroke="#8e8c8c" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="15" r="4" fill="#ffe5a8"/>',
    cat:`<path d="M7 22V7l13 7h8l13-7v15" fill="currentColor"/><path d="m10 12 8 6h-8m28-6-8 6h8" fill="#e8a7a2"/><ellipse cx="24" cy="28" rx="20" ry="16" fill="currentColor"/>${faces}<path d="m7 29 7 2m-7 4 7-1m27-5-7 2m7 4-7-1" stroke="#aa8a70" stroke-width="1.5" stroke-linecap="round"/>`,
    dog:`<path d="M13 12C1 4-2 29 7 33l9-12m19-9c12-8 15 17 6 21l-9-12" fill="#8f705a"/><ellipse cx="24" cy="26" rx="17" ry="18" fill="currentColor"/><ellipse cx="24" cy="34" rx="10" ry="8" fill="#f3dfbd"/>${faces}<path d="M20 31c0-4 8-4 8 0l-4 3-4-3Z" fill="#79685e"/>`,
    rabbit:`<ellipse cx="15" cy="14" rx="7" ry="13" transform="rotate(-12 15 14)" fill="currentColor"/><ellipse cx="33" cy="14" rx="7" ry="13" transform="rotate(12 33 14)" fill="currentColor"/><ellipse cx="15" cy="13" rx="3" ry="8" transform="rotate(-12 15 13)" fill="#f6d8dc"/><ellipse cx="33" cy="13" rx="3" ry="8" transform="rotate(12 33 13)" fill="#f6d8dc"/><ellipse cx="24" cy="29" rx="19" ry="16" fill="currentColor"/>${faces}<ellipse cx="12" cy="33" rx="4" ry="2" fill="#e991a3"/><ellipse cx="36" cy="33" rx="4" ry="2" fill="#e991a3"/>`,
    panda:`<circle cx="10" cy="12" r="8" fill="currentColor"/><circle cx="38" cy="12" r="8" fill="currentColor"/><ellipse cx="24" cy="27" rx="20" ry="18" fill="#f2f0e8"/><ellipse cx="15" cy="26" rx="7" ry="8" transform="rotate(20 15 26)" fill="currentColor"/><ellipse cx="33" cy="26" rx="7" ry="8" transform="rotate(-20 33 26)" fill="currentColor"/><circle cx="16" cy="25" r="2" fill="#fffdf4"/><circle cx="32" cy="25" r="2" fill="#fffdf4"/><path d="M21 34q3-4 6 0l-3 3Z" fill="#737986"/><path d="m21 39 3-2 3 2" fill="none" stroke="#8e8e97" stroke-width="1.5"/>`,
    fox:`<path d="M6 24 7 3l15 11h4L41 3l1 21-18 21Z" fill="currentColor"/><path d="m10 10 8 7-8 3m28-10-8 7 8 3" fill="#a67c67"/><path d="m5 24 19 11 19-11-6 15-13 6-13-6Z" fill="#fff0d8"/>${faces}<path d="m20 34 4-2 4 2-4 4Z" fill="#776969"/>`,
    bear:`<circle cx="10" cy="12" r="8" fill="currentColor"/><circle cx="38" cy="12" r="8" fill="currentColor"/><circle cx="10" cy="12" r="4" fill="#d8b798"/><circle cx="38" cy="12" r="4" fill="#d8b798"/><ellipse cx="24" cy="27" rx="20" ry="18" fill="currentColor"/><ellipse cx="24" cy="34" rx="10" ry="8" fill="#e3c5a2"/>${faces}<path d="M20 31q4-5 8 0l-4 4Z" fill="#826a5f"/>`
  };
  const iconPaths = {
    undo:'<path d="M4 9h9a7 7 0 1 1 0 14H9M4 9l5-5M4 9l5 5"/>',
    magic:'<path d="m5 23 12-12 5 5L10 28m6-16 5 5M22 3v4m-2-2h4M7 6v4M5 8h4m14 15v4m-2-2h4"/>',
    shuffle:'<path d="M3 7h4c5 0 7 14 12 14h5M3 21h4c2 0 3.5-2.2 5-5M16 11c1-2.5 2-4 4-4h4M20 3l4 4-4 4m0 6 4 4-4 4"/>',
    arrow:'<path d="M5 14h18m-6-6 6 6-6 6"/>',
    star:'<path d="m14 3 3.3 7 7.7 1-5.5 5.4 1.3 7.6-6.8-3.7-6.8 3.7 1.3-7.6L3 11l7.7-1L14 3Z" fill="currentColor" stroke="none"/>'
  };
  function icon(name, cls='') { return `<svg class="${cls}" viewBox="0 0 28 30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.star}</svg>`; }
  function symbolData(kind) { const fallback = symbolDefs[((Number(kind) || 0) % 18 + 18) % 18]; return state?.symbols?.[kind] || {code:fallback[0],name:fallback[1],color:fallback[2]}; }
  function symbolName(kind) { return symbolData(kind).name; }
  // Center each illustration using its alpha bounds inside the generated atlas.
  const atlasPositions = [[.57,8.61],[20.47,8.95],[40.51,8.61],[60.78,8.87],[80.17,9.38],[100.3,8.53],
    [.74,53.39],[20.81,52.88],[40.71,52.71],[60.41,52.54],[79.9,53.81],[100.37,52.8],
    [0,95.1],[20.51,95.95],[40.37,94.76],[60.27,95.86],[80.68,95.44],[100.2,95.78]];
  function symbolSvg(kind) {
    const s = symbolData(kind), color = /^#[a-f\d]{6}$/i.test(s.color || '') ? s.color : '#a18ac4';
    const index = Math.max(0, symbolDefs.findIndex(def => def[0] === s.code));
    return `<span class="tile-art" style="background-position:${atlasPositions[index][0]}% ${atlasPositions[index][1]}%" aria-hidden="true"><svg class="tile-symbol" viewBox="0 0 48 48" style="color:${color}">${shapes[s.code] || shapes.apple}</svg></span>`;
  }
  class TrayView {
    constructor(element) {
      this.element=element;this.actors=new Map();this.animations=new Set();this.timers=new Set();this.effects=new Set();this.items=[];
      this.slots=Array.from({length:7},()=>{const slot=document.createElement('div');slot.className='tray-slot empty';element.appendChild(slot);return slot;});
      this.actorLayer=document.createElement('div');this.actorLayer.className='tray-actors';element.appendChild(this.actorLayer);
      this.fx=document.createElement('div');this.fx.className='tray-fx';this.fx.setAttribute('aria-hidden','true');element.appendChild(this.fx);
    }
    card(tile,ghost=false) {
      const card=document.createElement('div');card.className=`tray-actor${ghost?' tray-ghost':''}`;card.dataset.id=String(tile.id);card.dataset.code=symbolData(tile.kind).code;card.setAttribute('aria-hidden','true');
      const motion=document.createElement('div');motion.className='tray-motion';motion.innerHTML=`<div class="tray-surface">${symbolSvg(tile.kind)}</div>`;card.appendChild(motion);return card;
    }
    sync(next) {
      this.items=next.tray;const alive=new Set(this.items.map(tile=>tile.id));
      for(const [id,card] of this.actors){if(!alive.has(id)){card.remove();this.actors.delete(id);}}
      for(const tile of this.items){let card=this.actors.get(tile.id);const code=symbolData(tile.kind).code;
        if(card&&card.dataset.code!==code){card.remove();this.actors.delete(tile.id);card=null;}
        if(!card){card=this.card(tile);this.actors.set(tile.id,card);this.actorLayer.appendChild(card);}
      }
      this.slots.forEach((slot,i)=>{const tile=this.items[i];slot.setAttribute('aria-label',tile?`${i+1} 号槽：${symbolName(tile.kind)}`:`${i+1} 号空槽`);});
      this.layout();
    }
    place(card,index,layer,animate=false) {
      const slot=this.slots[index];if(!slot)return;
      const rect=slot.getBoundingClientRect(),origin=layer.getBoundingClientRect();
      const target=`translate3d(${rect.left-origin.left}px,${rect.top-origin.top}px,0)`;
      const previous=card.style.transform;card.style.width=`${rect.width}px`;card.style.height=`${rect.height}px`;card.style.transform=target;
      if(animate&&previous&&previous!==target)this.animate(card,[{transform:previous},{transform:target}],120);
    }
    layout() {this.items.forEach((tile,i)=>{const card=this.actors.get(tile.id);if(card)this.place(card,i,this.actorLayer,true);});}
    animate(element,keyframes,duration,easing='cubic-bezier(.2,.8,.2,1)',done) {
      if(motionPreference.matches||!element.animate){if(done)this.after(Math.min(duration,120),done);return;}
      const animation=element.animate(keyframes,{duration,easing});this.animations.add(animation);
      const finish=()=>{this.animations.delete(animation);if(done)done();};animation.onfinish=finish;animation.oncancel=finish;
    }
    after(duration,callback) {const timer=setTimeout(()=>{this.timers.delete(timer);callback();},duration);this.timers.add(timer);return timer;}
    enter(id,profile) {
      this.motion(id,profile.enter_motion);
      const reaction={strawberry:'heart',fox:'sparkle',panda:'sleep'}[profile.code];if(reaction)this.reaction(id,reaction,300);
    }
    motion(id,name,duration) {
      const card=this.actors.get(id),preset=theater.motions?.[name];if(!card||!preset)return;
      this.animate(card.firstElementChild,preset.keyframes,duration||preset.duration,preset.easing);
    }
    reaction(id,name,duration=300) {
      const card=this.actors.get(id);if(!card)return;
      const glyph={exclamation:'!',sweat:'💧',heart:'♥',note:'♪',sleep:'zZ',sparkle:'✦'}[name];if(!glyph)return;
      const bubble=document.createElement('span');bubble.className=`actor-reaction reaction-${name}`;bubble.textContent=glyph;
      const rect=card.getBoundingClientRect(),origin=this.fx.getBoundingClientRect(),anchor=theater.profiles?.[card.dataset.code]?.reaction_anchor || {x:.72,y:.14};
      bubble.style.left=`${rect.left-origin.left+rect.width*anchor.x}px`;bubble.style.top=`${rect.top-origin.top+rect.height*anchor.y}px`;
      this.fx.appendChild(bubble);this.effects.add(bubble);
      this.after(duration,()=>{bubble.remove();this.effects.delete(bubble);});
    }
    clear(event,enterEvent) {
      if(!enterEvent?.tray_after_insert)return;
      const ids=new Set(event.tile_ids);
      enterEvent.tray_after_insert.forEach((tile,index)=>{if(!ids.has(tile.id))return;
        const ghost=this.card(tile,true);this.fx.appendChild(ghost);this.effects.add(ghost);this.place(ghost,index,this.fx);
        const incoming=tile.id===enterEvent.tile.id;
        const frames=incoming?[{transform:'scale(.76)',opacity:.4},{transform:'scale(1.08)',opacity:1,offset:.3},{transform:'translateY(-12px) scale(.55)',opacity:0}]:[{transform:'scale(1)',opacity:1},{transform:'scale(1.08)',opacity:1,offset:.3},{transform:'translateY(-12px) scale(.55)',opacity:0}];
        this.animate(ghost.firstElementChild,frames,240,undefined,()=>{ghost.remove();this.effects.delete(ghost);});
      });
    }
    cancel() {
      for(const timer of this.timers)clearTimeout(timer);this.timers.clear();
      for(const animation of [...this.animations])animation.cancel();this.animations.clear();
      for(const effect of this.effects)effect.remove();this.effects.clear();
    }
    reset() {this.cancel();for(const card of this.actors.values())card.remove();this.actors.clear();this.items=[];}
  }
  trayView=new TrayView($('tray'));
  if(theater.Director)director=new theater.Director({audio,view:trayView,visible:()=>!document.hidden,reducedMotion:()=>motionPreference.matches});
  function updateSoundUI() {
    const enabled=Boolean(audio?.enabled),button=$('sound-button');button.setAttribute('aria-pressed',String(enabled));button.classList.toggle('muted',!enabled);button.title=enabled?'关闭角色音效':'开启角色音效';
    button.innerHTML=`<span aria-hidden="true">${enabled?'♫':'♪'}</span><span>音效${enabled?'开':'关'}</span>`;
  }
  function unlockAudio() {if(audio?.enabled&&!document.hidden)Promise.resolve(audio.unlock()).catch(()=>{});}
  function cancelTheater(reset=false) {try{director?.cancel({reset});}catch{}if(reset)trayView.reset();else trayView.cancel();}
  function preloadAudio() {if(!audio||!state)return;const codes=[...new Set([...state.tiles,...state.tray].map(tile=>symbolData(tile.kind).code))];Promise.resolve(audio.preload(codes)).catch(()=>{});}
  function setText(id,value) { $(id).textContent = String(value); }
  function starsMarkup(stars) { return [0,1,2].map(i => icon('star',i < stars ? '' : 'no-star')).join(''); }
  function records() { return state?.progress?.completed || state?.progress?.classic || state?.progress?.[state?.mode] || {}; }
  function showToast(message) { clearTimeout(toastTimer); setText('toast',message); $('toast').hidden=false; toastTimer=setTimeout(() => {$('toast').hidden=true;},3400); }
  function openDialog(id) { if (!$(id).open) $(id).showModal(); }
  function closeDialog(id) { $(id).close(); }
  function sceneSvg(id) {
    const sky = id === 'paris' ? '#ffecd5' : id === 'kyoto' ? '#f4e7ee' : '#e5eef8';
    const ground = id === 'paris' ? '#c6d8b7' : id === 'kyoto' ? '#c5d1bc' : '#b9cbd7';
    const base = `<rect width="1000" height="640" fill="${sky}"/><circle cx="826" cy="94" r="53" fill="${id==='newyork'?'#f9dfb2':'#ffe4a5'}"/><g fill="#fff9"><rect x="61" y="90" width="120" height="23" rx="12"/><circle cx="98" cy="87" r="23"/><circle cx="132" cy="90" r="18"/><rect x="689" y="163" width="125" height="20" rx="10"/><circle cx="735" cy="156" r="24"/></g><path d="M0 466q146-65 285-13t283 13 432-13v187H0Z" fill="${ground}"/>`;
    let city;
    if (id === 'paris') city = `
      <g fill="#dec1a4"><path d="M0 380h67v106H0m76-83h75v83H76m79-16h76v83h-76M823 359h75v127h-75m86-78h91v78h-91"/><path d="m0 380 33-27 34 27m756-21 38-29 37 29m11 49 45-30 46 30" fill="#c2a991"/></g>
      <g fill="#f8e4c3"><path d="M14 398h10v17H14m24-17h10v17H38m-24 17h10v17H14m24-17h10v17H38m52-9h11v18H90m25-18h11v18h-11m722-35h13v20h-13m26-20h13v20h-13m-26 21h13v20h-13m26-20h13v20h-13m62-21h13v20h-13m26-20h13v20h-13"/></g>
      <g stroke="#b59677" fill="none" stroke-linejoin="round"><path d="M192 448c45-79 70-170 78-307h15c8 137 33 228 78 307M250 275h55M232 337h91M205 408h145" stroke-width="13"/><path d="m249 275 71 62m-14-62-74 62m4 0 112 71m-27-71-116 71m65-244 1-57h12l2 57" stroke-width="6"/><path d="M263 140h31m-35 29h40m-81 169h117m-143 110h171" stroke-width="7"/><path d="M231 448q48-64 95 0" stroke-width="11"/></g>
      <path d="M0 524q190-42 385 0t365 7 250-10v119H0Z" fill="#a7cbd2"/><path d="M0 545q190-42 385 0t365 7 250-10" stroke="#d7e8df" stroke-width="9" fill="none"/><path d="M559 536h228l-31 21H590Z" fill="#fff1d3"/><path d="M650 505h80l24 32h-126Z" fill="#e6ba98"/><path d="M684 502v-25" stroke="#ac9c87" stroke-width="4"/><g stroke="#d9e7de" stroke-width="5" stroke-linecap="round"><path d="M74 593h57m38-13h36m218 26h45m326-14h65m-480-26h32"/></g>
      <g fill="#a3bc92"><circle cx="68" cy="452" r="33"/><circle cx="128" cy="467" r="24"/><circle cx="887" cy="468" r="32"/><circle cx="946" cy="463" r="42"/></g><g stroke="#829d7d" stroke-width="5"><path d="M68 446v54m878-46v52m-60-46v47"/></g><g fill="#fff6e3"><path d="m701 97 7-4 7 4-7-1Z"/><path d="m735 76 8-4 8 4-8-1Z"/></g>`;
    else if (id === 'kyoto') city = `
      <path d="m0 402 187-196 148 182 152-118 191 164 155-183 167 151v84H0Z" fill="#ced2cd"/><path d="m88 309 99-103 84 104-80-39Z" fill="#f9f1e9"/>
      <g fill="#bca6a3"><rect x="148" y="328" width="142" height="139"/><rect x="166" y="267" width="106" height="65"/><rect x="180" y="211" width="78" height="58"/><rect x="190" y="161" width="58" height="52"/></g><g fill="#928d91"><path d="m104 405 114-25 116 25-16 15H120Zm19-68 95-22 98 22-13 13H137Zm28-68 67-19 69 19-13 12H164Zm18-58 49-16 51 16-12 11h-76Zm9-51 40-14 43 14-10 11h-62Z"/></g><path d="M218 148V97m-8 13h16m-14 10h14m-14 10h14" stroke="#b2a190" stroke-width="4"/><g fill="#e4d4bf"><path d="M180 355h15v25h-15m28-25h15v25h-15m28-25h15v25h-15m-41-62h13v22h-13m25-22h13v22h-13m-26-77h12v21h-12m19-21h12v21h-12"/></g>
      <g fill="#c77e73"><path d="M722 310h15v187h-15m100-187h15v187h-15M699 309h161v16H699m-9-45h181v16H690"/><path d="m680 275 100 12 102-12-7 19H687Z" fill="#b66e69"/><rect x="768" y="291" width="17" height="35"/></g><path d="M648 637q162-74 125-140h53q52 79 159 140Z" fill="#f1e0c5"/>
      <g stroke="#a48c84" stroke-width="13" stroke-linecap="round"><path d="m37 472 20-142 44-57m-51 99-36-42m879 144 27-142 57-45m-63 77-36-50"/></g><g fill="#e9b5c4"><circle cx="57" cy="290" r="57"/><circle cx="13" cy="316" r="43"/><circle cx="111" cy="284" r="43"/><circle cx="924" cy="292" r="65"/><circle cx="985" cy="308" r="49"/><circle cx="872" cy="314" r="38"/></g><g fill="#f5d4df"><circle cx="40" cy="278" r="29"/><circle cx="111" cy="270" r="24"/><circle cx="914" cy="278" r="34"/><circle cx="968" cy="288" r="30"/></g><g fill="#95ae8a"><ellipse cx="107" cy="522" rx="143" ry="39"/><ellipse cx="893" cy="543" rx="147" ry="39"/></g><path d="M0 578q166-33 300 3t302 1v58H0Z" fill="#acccd0"/><g fill="#edbccb"><ellipse cx="136" cy="433" rx="6" ry="3" transform="rotate(35 136 433)"/><ellipse cx="832" cy="408" rx="7" ry="3" transform="rotate(-30 832 408)"/><ellipse cx="155" cy="565" rx="7" ry="3"/><ellipse cx="601" cy="554" rx="6" ry="3" transform="rotate(30 601 554)"/></g>`;
    else city = `
      <g fill="#c0ccd9"><path d="M0 259h54v225H0m66-172h65v172H66m67-192h87v192h-87m91-235h50v235h-50m11-262h28v27h-28M700 283h58v201h-58m67-251h71v252h-71m92-209h70v209h-70m82-141h78v141h-78"/></g><g fill="#a4b9cd"><path d="M42 355h91v148H42m96-96h58v144h-58m574-159h57v187h-57m91-240h66v240h-66m19-274h28v34h-28m-81-10h3v-56h-3m120 146h72v160h-72"/></g><g fill="#e2e8eb"><path d="M15 280h12v15H15m0 13h12v15H15m155-6h12v18h-12m26-18h12v18h-12m-26 16h12v18h-12m26-18h12v18h-12m45-105h10v18h-10m0 16h10v18h-10m503 14h12v18h-12m0 17h12v18h-12m80-90h12v19h-12m24-19h12v19h-12m-24 16h12v19h-12m24-19h12v19h-12m76 0h12v19h-12"/></g>
      <path d="M0 527q166-45 350 0t650-12v125H0Z" fill="#9ebdcc"/><path d="M0 548q166-45 350 0t650-12" fill="none" stroke="#d7e5e5" stroke-width="8"/>
      <g fill="#8fb4a9"><path d="M190 492h72v35h-72m9-63h54v29h-54"/><path d="m203 463 14-108h24l14 108Z"/><path d="m218 355-20-48-20-25-13-74 16-4 19 70 24 30 18-38 15 6-11 57-3 34Z"/><circle cx="227" cy="274" r="17"/><path d="m209 268-11-15 17 3 1-19 11 16 12-16 1 19 17-3-12 16Z"/><path d="m178 224-18 1-4-30h24Z"/></g><path d="m163 193-7-13 11-24 12 20-3 17Z" fill="#efc983"/><path d="M207 389h11m4-7h13m-24 31h8m4-5h15m-27 25h25" stroke="#c1d7c6" stroke-width="3" stroke-linecap="round"/>
      <path d="M621 510h162l-20 17H644Z" fill="#f6ead2"/><path d="M664 485h78l21 25H651Z" fill="#dfb883"/><g stroke="#c9dde1" stroke-width="5" stroke-linecap="round"><path d="M59 597h71m166-20h49m191 35h80m214-40h59"/></g><g fill="#8eac9c"><circle cx="27" cy="492" r="25"/><circle cx="967" cy="491" r="36"/><circle cx="923" cy="500" r="21"/></g><path d="m565 116 10-5 10 5-10-2m27 22 8-4 8 4-8-2" fill="none" stroke="#b0bdc8" stroke-width="3" stroke-linecap="round"/>`;
    return `<svg viewBox="0 0 1000 640" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${base}${city}</svg>`;
  }
  function renderTheme() {
    const chapter = Math.floor((state.level-1)/3), fallback=cities[chapter] || cities[0], theme={...fallback,...state.theme}, info=state.level_info || {}, chapterLevel=info.chapter_level || (state.level-1)%3+1;
    document.documentElement.style.setProperty('--accent', theme.accent || fallback.accent);
    document.documentElement.style.setProperty('--accent-deep', fallback.deep);
    document.documentElement.style.setProperty('--tint', fallback.tint);
    document.body.dataset.city=theme.id;
    setText('hero-city',theme.city); setText('city-english',fallback.english); setText('city-title',theme.title || fallback.title); setText('city-subtitle',theme.subtitle || fallback.subtitle);
    setText('chapter-name',`${theme.country} · ${theme.city}`); setText('chapter-step',`${chapterLevel} / 3`); setText('fact-page',`${String(chapterLevel).padStart(2,'0')} / 03`);
    const fact=theme.facts?.[chapterLevel-1] || {title:'带着好奇心去旅行',text:'观察每一张牌，也别忘了看看这座城市的风景。'};
    setText('fact-title',fact.title); setText('fact-text',fact.text);
    const source=$('fact-source'); source.hidden=!fact.source_url;
    if (fact.source_url && /^https:\/\//i.test(fact.source_url)) {source.href=fact.source_url; source.textContent=`${fact.source_title || '阅读资料'} ↗`;}
    else source.removeAttribute('href');
    $('chapter-dots').replaceChildren();
    for (let i=0;i<3;i++) {const dot=document.createElement('span');dot.className=i===chapterLevel-1?'current':records()[String(chapter*3+i+1)]?.stars?'completed':'';dot.title=`本城第 ${i+1} 关`;$('chapter-dots').appendChild(dot);}
    [...$('city-route').children].forEach((li,i)=>{li.classList.toggle('current',i===chapter);li.classList.toggle('completed',[1,2,3].every(n=>records()[String(i*3+n)]?.stars));});
    if(sceneKey!==theme.id){sceneKey=theme.id;$('city-scene').innerHTML=sceneSvg(theme.id);}
  }
  async function perform(action, extras={}) {
    if(busy)return;busy=true;document.body.classList.add('busy');
    const reset=['level','next','restart','shuffle'].includes(action);if(reset)sceneEpoch++;
    cancelTheater(reset);const epoch=sceneEpoch,seq=++actionSeq,presentationToken=presentationEpoch;
    try {
      const response=await fetch('/api/action',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({action,...extras})});
      const data=await response.json();
      if(!response.ok){if(data.state){state=data.state;render();}const message=data.error || '这一步暂时无法完成。';showToast(message);setText('game-message',message);$('game-message').classList.add('error');return;}
      const {presentation,...nextState}=data;state=nextState;
      if(['level','next','restart','shuffle'].includes(action)){boardBounds=null;magicArmed=false;}
      if(action==='magic')magicArmed=false;
      render();
      if(epoch===sceneEpoch&&presentationToken===presentationEpoch){try{director?.consume(presentation,state,{epoch,seq});}catch{cancelTheater();}}
      preloadAudio();
    }catch(error){cancelTheater();showToast('连接暂时中断，请确认本地游戏仍在运行。');console.error('Game action failed:',error);
      try{const response=await fetch('/api/state',{credentials:'same-origin',headers:{Accept:'application/json'}});if(response.ok){state=await response.json();render();}}catch{}
    }
    finally{busy=false;document.body.classList.remove('busy');}
  }
  function selectTile(tile) {
    if(busy || state.status!=='playing')return;
    if(tile.blocked){
      if(magicArmed)perform('magic',{tile_id:tile.id});
      else {showToast(`这张${symbolName(tile.kind)}还被压着。先移走上层，或点亮魔法笔。`);setText('game-message','底牌图案可见，普通拾取需要先拿走上层牌。');}
    }else perform('pick',{tile_id:tile.id});
  }
  function renderBoard() {
    const cards=$('board-cards');cards.replaceChildren();
    const ordered=[...state.tiles].sort((a,b)=>a.z-b.z || a.y-b.y || a.x-b.x || a.id-b.id);
    for(const tile of ordered){
      const el=document.createElement('button');el.className=`tile${tile.blocked?' blocked':''}${magicArmed&&tile.blocked?' magic-ready':''}`;el.dataset.id=String(tile.id);el.style.zIndex=String(tile.z*100+1);
      const status=tile.blocked?(magicArmed?'被上层压住，点击用魔法笔拾取':'被上层压住，图案可见，须先移走上层'):'可直接拾取';
      el.setAttribute('aria-label',`${symbolName(tile.kind)}，第 ${tile.z+1} 层，${status}`);el.title=`${symbolName(tile.kind)} · 第 ${tile.z+1} 层 · ${tile.blocked?'被压住':'可拾取'}`;
      el.innerHTML=symbolSvg(tile.kind);
      el.addEventListener('click',()=>selectTile(tile));el.disabled=state.status!=='playing';cards.appendChild(el);
    }
    if(!ordered.length){const empty=document.createElement('div');empty.className='empty-board';empty.innerHTML=`${icon('star')}<span>把这座城市，装进回忆里。</span>`;cards.appendChild(empty);}
    $('board-loading').hidden=true;layoutBoard();
  }
  function layoutBoard() {
    if(!state?.tiles?.length)return;
    const board=$('board'), currentKey=`${state.level}`;
    if(currentKey!==boardKey){boardBounds=null;boardKey=currentKey;}
    if(!boardBounds)boardBounds=state.tiles.reduce((r,t)=>({minX:Math.min(r.minX,t.x),minY:Math.min(r.minY,t.y),maxX:Math.max(r.maxX,t.x+2),maxY:Math.max(r.maxY,t.y+2)}),{minX:Infinity,minY:Infinity,maxX:-Infinity,maxY:-Infinity});
    const b=boardBounds,padX=board.clientWidth<420?12:28,padY=23;
    const widthScale=Math.min((board.clientWidth-padX*2)/(b.maxX-b.minX),42);
    const fittedHeight=Math.ceil(Math.max(300,Math.min(board.clientWidth<500?600:620,(b.maxY-b.minY)*widthScale+padY*2+8)));
    if(board.style.height!==`${fittedHeight}px`)board.style.height=`${fittedHeight}px`;
    const scale=Math.min(widthScale,(board.clientHeight-padY*2)/(b.maxY-b.minY));
    const originX=(board.clientWidth-(b.maxX-b.minX)*scale)/2,originY=(board.clientHeight-(b.maxY-b.minY)*scale)/2-4;
    const elements=new Map([...$('board-cards').querySelectorAll('.tile')].map(el=>[Number(el.dataset.id),el]));
    for(const tile of state.tiles){const el=elements.get(tile.id);if(!el)continue;el.style.left=`${originX+(tile.x-b.minX)*scale}px`;el.style.top=`${originY+(tile.y-b.minY)*scale}px`;el.style.width=`${scale*2-1}px`;el.style.height=`${scale*2-1}px`;}
  }
  function renderTray() {
    const tray=$('tray'),capacity=state.capacity || 7;tray.classList.toggle('full',state.tray.length>=6);trayView.sync(state);
    $('tray-count').innerHTML=`${state.tray.length} <small>/ ${capacity}</small>`;$('tray-count').classList.toggle('danger',state.tray.length>=5);
    const removed=Math.max(0,state.total-state.remaining);$('progress-fill').style.width=`${state.total?Math.min(100,removed/state.total*100):0}%`;setText('progress-label',`已消除 ${removed} / ${state.total}`);
  }
  function renderResult() {
    const panel=$('result-panel');panel.replaceChildren();panel.hidden=state.status==='playing';panel.classList.toggle('lost',state.status==='lost');if(state.status==='playing')return;
    const copy=document.createElement('div'),eyebrow=document.createElement('p'),title=document.createElement('h3'),detail=document.createElement('p');eyebrow.className='result-eyebrow';eyebrow.textContent=state.status==='won'?'A MEMORY TO KEEP':'A LITTLE PAUSE';
    if(state.status==='won'){title.textContent=state.level===9?'九站旅行，全部抵达！':'这一站，收获旅行印章！';const stars=document.createElement('span');stars.className='result-stars';stars.innerHTML=starsMarkup(state.stars || records()[String(state.level)]?.stars || 1);title.appendChild(stars);detail.textContent=state.level===9?'三座城市都已留下足迹。还可以选关，再旅行一次。':`用 ${state.moves} 步收集完全部小牌，下一处风景在等你。`;}
    else{title.textContent='行李装满了，换个思路吧。';detail.textContent='用下方的撤回或整体重排继续，也可以在选关中重访本关。';}
    copy.append(eyebrow,title,detail);panel.appendChild(copy);
    if(state.status==='won'){const next=document.createElement('button');next.className='primary-button';next.innerHTML=`${state.level<9?(state.level%3===0?'出发，下一城':'下一关'):'重访旅程'}${icon('arrow')}`;next.addEventListener('click',()=>state.level<9?perform('next'):showLevels());const actions=document.createElement('div');actions.className='result-actions';actions.appendChild(next);panel.appendChild(actions);}
  }
  function updateMagicUI() {
    if(state?.status!=='playing')magicArmed=false;
    document.body.classList.toggle('magic-armed',magicArmed);$('magic-button').setAttribute('aria-pressed',String(magicArmed));setText('magic-label',magicArmed?'已点亮 · 点击底牌':'点一下，再选底牌');$('magic-banner').hidden=!magicArmed;
  }
  function render() {
    const info=state.level_info || {};renderTheme();setText('level-number',String(state.level).padStart(2,'0'));setText('level-title',info.title || '收集旅途中的小美好');setText('board-remaining',`${state.tiles.length} 张待收集`);setText('fact-kinds',info.kinds ?? '—');setText('fact-layers',info.layers ?? '—');setText('fact-total',state.total);setText('difficulty-label',info.difficulty || '探索');
    const completed=Object.entries(records()).filter(([n,v])=>Number(n)<=9&&v.stars>0).length;setText('journey-completed',completed);
    $('undo-button').disabled=!state.can_undo;$('magic-button').disabled=state.status!=='playing' || !state.tiles.some(t=>t.blocked);$('shuffle-button').disabled=state.status==='won';
    setText('game-message',state.message || '先观察露出的图案，试着凑成三张相同的小牌。');$('game-message').classList.remove('error');
    if(state.save_warning&&state.save_warning!==previousSaveWarning){previousSaveWarning=state.save_warning;showToast(state.save_warning);}
    $('rules-demo').innerHTML=[0,0,0].map(kind=>`<span>${symbolSvg(kind)}</span>`).join('');updateMagicUI();renderBoard();renderTray();renderResult();
  }
  function showLevels() {
    if(!state)return;const grid=$('levels-grid');grid.replaceChildren();
    for(let chapter=0;chapter<3;chapter++){const section=document.createElement('section');section.className='level-section';const heading=document.createElement('div');heading.className='level-section-heading';heading.innerHTML=`${cities[chapter].country} · ${cities[chapter].city}<span>${['浪漫初相遇','樱花与古都','都市大冒险'][chapter]}</span>`;const row=document.createElement('div');row.className='chapter-levels';
      for(let n=1;n<=3;n++){const level=chapter*3+n,stars=records()[String(level)]?.stars || 0,button=document.createElement('button');button.className=`level-option${level===state.level?' current':''}${stars?' completed':''}`;button.setAttribute('aria-label',`第 ${level} 关，${cities[chapter].city}第 ${n} 站${level===state.level?'，当前关卡，点击重新开始':''}${stars?`，已获 ${stars} 星`:''}`);button.innerHTML=`<span>${String(level).padStart(2,'0')}</span><span class="level-name">${['初遇','漫步','探索'][n-1]} · 第 ${n} 站</span><span class="level-stars">${starsMarkup(stars)}</span>`;button.addEventListener('click',()=>{closeDialog('levels-dialog');perform('level',{level});});row.appendChild(button);}
      section.append(heading,row);grid.appendChild(section);
    }openDialog('levels-dialog');
  }
  document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon);});
  document.addEventListener('click',unlockAudio,{capture:true});
  document.addEventListener('keydown',event=>{if(!event.repeat&&!event.ctrlKey&&!event.metaKey&&!event.altKey)unlockAudio();},{capture:true});
  $('sound-button').addEventListener('click',()=>{if(!audio)return;audio.setEnabled(!audio.enabled);updateSoundUI();if(audio.enabled){unlockAudio();preloadAudio();}});updateSoundUI();
  document.addEventListener('visibilitychange',()=>{if(document.hidden){presentationEpoch++;cancelTheater();Promise.resolve(audio?.suspend()).catch(()=>{});}});
  motionPreference.addEventListener?.('change',()=>cancelTheater());
  $('rules-button').addEventListener('click',()=>openDialog('rules-dialog'));$('level-button').addEventListener('click',showLevels);$('undo-button').addEventListener('click',()=>perform('undo'));$('shuffle-button').addEventListener('click',()=>perform('shuffle'));
  $('magic-button').addEventListener('click',()=>{if(!state || busy || state.status!=='playing')return;magicArmed=!magicArmed;updateMagicUI();renderBoard();if(magicArmed)setText('game-message','魔法笔已点亮：点击下层牌露出的部分，就能直接收入暂存槽。');else setText('game-message',state.message || '魔法笔已收起，继续收集露出的牌吧。');});
  document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>closeDialog(button.dataset.close)));
  document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}));
  document.addEventListener('keydown',event=>{if(event.ctrlKey||event.metaKey||event.altKey||event.repeat||document.querySelector('dialog[open]')||/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)||event.target.isContentEditable||!state||busy)return;if(event.key.toLowerCase()==='z'&&state.can_undo){event.preventDefault();perform('undo');}if(event.key==='Escape'&&magicArmed){magicArmed=false;updateMagicUI();renderBoard();}});
  let observedBoardSize=null;
  new ResizeObserver(entries=>{const rect=entries[0]?.contentRect || $('board').getBoundingClientRect();const changed=observedBoardSize&&(rect.width!==observedBoardSize.width||rect.height!==observedBoardSize.height);observedBoardSize={width:rect.width,height:rect.height};cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{if(changed)cancelTheater();layoutBoard();trayView.layout();});}).observe($('board'));
  async function init(){try{const response=await fetch('/api/state',{credentials:'same-origin',headers:{Accept:'application/json'}});if(!response.ok)throw new Error(`State returned ${response.status}`);state=await response.json();render();preloadAudio();}catch(error){$('board-loading').querySelector('p').textContent='点击这里，重新连接旅行。';$('board-loading').style.cursor='pointer';$('board-loading').onclick=init;setText('game-message','请保持本地游戏服务运行，然后点击棋盘重试连接。');console.error('Game initialization failed:',error);}}
  const tileAtlas = new Image();
  tileAtlas.onload = () => document.documentElement.classList.add('tile-art-ready');
  tileAtlas.src = '/assets/tile-atlas-v3.png';
  init();
})();
