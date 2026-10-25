/* Full replay owns both facts and scores. Local storage failure stays playable. */
(function(root){
  'use strict';
  const E=typeof module!=='undefined'?require('./engine.js'):root.TileSlideV07.engine;
  class GameSession{
    constructor(levels,storage,{preview=false,debug=false,demo=false,random=Math.random}={}){this.levels=levels;this.storage=storage;this.debug=debug;this.demo=demo;this.random=random;this.prefix='tile-explorer.slide.v07.'+(demo?'demo.':preview?'preview.':'');this.memory={};this.failed=false;this.epoch=0;this.history=[];
      const best=this.read('best'),settings=this.read('settings');
      this.best=best&&typeof best==='object'&&!Array.isArray(best)?best:{};
      // A content update resets incompatible runs/scores, never earned access.
      const savedProgress=this.read('progress');this.unlockedThrough=Number.isInteger(savedProgress?.unlockedThrough)?Math.max(0,Math.min(levels.length-1,savedProgress.unlockedThrough)):0;
      for(let i=0;i<levels.length;i++){const b=this.best[levels[i].id];if(b&&Number.isInteger(b.stars)&&b.stars>=1&&b.stars<=3&&Number.isFinite(b.score))this.unlockedThrough=Math.max(this.unlockedThrough,Math.min(levels.length-1,i+1));}
      this.write('progress',{unlockedThrough:this.unlockedThrough});
      const choices=this.read('variants');this.choices=choices&&typeof choices==='object'&&!Array.isArray(choices)?choices:{};
      this.settings=settings&&typeof settings==='object'&&!Array.isArray(settings)?settings:{soundEnabled:true,reducedMotion:false};
      try{if(!this.read('settings')){const old=JSON.parse(storage?.getItem('tile-explorer.slide.v06.'+(preview?'preview.':'')+'settings.v1')||'null');
        if(old)for(const k of ['soundEnabled','reducedMotion'])if(typeof old[k]==='boolean')this.settings[k]=old[k];}}catch(_){}
      if(typeof this.settings.soundEnabled!=='boolean')this.settings.soundEnabled=true;
      if(typeof this.settings.reducedMotion!=='boolean')this.settings.reducedMotion=false;
      this.restore();
    }
    read(k){if(Object.hasOwn(this.memory,k))return this.memory[k];try{const raw=this.storage?.getItem(this.prefix+k+'.v1');return raw&&raw.length<2*1024*1024?JSON.parse(raw):null;}catch(_){this.failed=true;return null;}}
    write(k,v){this.memory[k]=E.clone(v);try{if(!this.storage)throw Error('unavailable');this.storage.setItem(this.prefix+k+'.v1',JSON.stringify(v));}catch(_){this.failed=true;}}
    choice(l,create=false){const variants=l.variants||[{id:'default'}],old=this.choices[l.id];if(variants.some(v=>v.id===old))return old;
      if(!create)return variants[0].id;const id=variants[Math.min(variants.length-1,Math.max(0,Math.floor(this.random()*variants.length)))].id;this.choices[l.id]=id;this.write('variants',this.choices);return id;}
    isUnlocked(l){const i=this.levels.findIndex(x=>x.id===l.id);return i>=0&&(this.debug||this.demo||i<=this.unlockedThrough);}
    restore(){const saved=this.read('session');let l=this.levels.find(l=>l.id===saved?.levelId)||this.levels[0];if(!this.isUnlocked(l))l=this.levels[0];this.restoreNotice=null;this.start(l,false);
      if(saved&&(saved.hash!==this.state.definitionHash||saved.variantId!==this.state.variantId))this.restoreNotice='updated';
      if(saved?.hash===this.state.definitionHash&&saved.variantId===this.state.variantId&&Array.isArray(saved.actions)&&saved.actions.length<=21){try{const replay=E.replay(this.level,saved.actions);this.state=replay.state;this.history=replay.transactions;}catch(_){this.start(l,false);this.restoreNotice='invalid';}}
      else if(saved&&!this.restoreNotice)this.restoreNotice='invalid';
      this.save();
    }
    start(l,save=true){const source=this.levels.find(x=>x.id===l.id);if(!source||!this.isUnlocked(source))return false;this.level=E.resolveLevel(source,this.choice(source,true));this.state=E.createState(this.level);this.history=[];this.epoch++;if(save)this.save();return true;}
    apply(a){const r=E.applyAction(this.state,a);if(r.ok){this.state=r.state;this.history.push(r.transaction);this.epoch++;this.save();}return r;}
    undo(){if(!this.history.length||this.history.at(-1).action.type==='place-obstacle')return false;this.state=this.history.pop().before;this.epoch++;this.save();return true;}
    restart(){this.start(this.level);}
    record(){if(this.state.status!=='won')return;const r=E.result(this.state,this.level),id=this.level.id,hash=E.definitionHash(this.level),old=this.best[id]?.hash===hash?this.best[id]:{};
      this.best[id]={hash,score:Math.max(old.score||0,r.score),stars:Math.max(old.stars||0,r.stars),moves:Math.min(old.moves||Infinity,this.state.successfulMoves)};this.write('best',this.best);
      this.unlockedThrough=Math.max(this.unlockedThrough,Math.min(this.levels.length-1,this.levels.findIndex(l=>l.id===id)+1));this.write('progress',{unlockedThrough:this.unlockedThrough});}
    save(){this.write('session',{levelId:this.level.id,hash:this.state.definitionHash,variantId:this.state.variantId,actions:this.history.map(t=>t.action)});if(this.state.status==='won')this.record();}
    bestFor(l){const resolved=E.resolveLevel(l,this.choice(l)),b=this.best[l.id];return b?.hash===E.definitionHash(resolved)&&Number.isFinite(b.score)&&Number.isInteger(b.stars)&&b.stars>=1&&b.stars<=3?b:{score:0,stars:0};}
  }
  root.TileSlideV07={...(root.TileSlideV07||{}),GameSession};if(typeof module!=='undefined')module.exports=GameSession;
})(globalThis);
