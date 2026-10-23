/* Full replay owns both facts and scores. Local storage failure stays playable. */
(function(root){
  'use strict';
  const E=typeof module!=='undefined'?require('./engine.js'):root.TileSlideV06.engine;
  class GameSession{
    constructor(levels,storage,{preview=false}={}){this.levels=levels;this.storage=storage;this.prefix='tile-explorer.slide.v06.'+(preview?'preview.':'');this.memory={};this.failed=false;this.epoch=0;this.history=[];
      const best=this.read('best'),settings=this.read('settings');
      this.best=best&&typeof best==='object'&&!Array.isArray(best)?best:{};
      this.settings=settings&&typeof settings==='object'&&!Array.isArray(settings)?settings:{soundEnabled:true,reducedMotion:false};
      try{if(!this.read('settings')){const old=JSON.parse(storage?.getItem('tile-explorer.slide.v05.'+(preview?'preview.':'')+'settings.v1')||'null');
        if(old)for(const k of ['soundEnabled','reducedMotion'])if(typeof old[k]==='boolean')this.settings[k]=old[k];}}catch(_){}
      if(typeof this.settings.soundEnabled!=='boolean')this.settings.soundEnabled=true;
      if(typeof this.settings.reducedMotion!=='boolean')this.settings.reducedMotion=false;
      this.restore();
    }
    read(k){if(Object.hasOwn(this.memory,k))return this.memory[k];try{const raw=this.storage?.getItem(this.prefix+k+'.v1');return raw&&raw.length<2*1024*1024?JSON.parse(raw):null;}catch(_){this.failed=true;return null;}}
    write(k,v){this.memory[k]=E.clone(v);try{if(!this.storage)throw Error('unavailable');this.storage.setItem(this.prefix+k+'.v1',JSON.stringify(v));}catch(_){this.failed=true;}}
    restore(){const saved=this.read('session');const l=this.levels.find(l=>l.id===saved?.levelId)||this.levels[0];this.restoreNotice=null;this.start(l,false);
      if(saved&&saved.hash!==E.definitionHash(l))this.restoreNotice='updated';
      if(saved?.hash===E.definitionHash(l)&&Array.isArray(saved.actions)&&saved.actions.length<=50000){try{const replay=E.replay(l,saved.actions);this.state=replay.state;this.history=replay.transactions;}catch(_){this.start(l,false);this.restoreNotice='invalid';}}
      this.save();
    }
    start(l,save=true){this.level=l;this.state=E.createState(l);this.history=[];this.epoch++;if(save)this.save();}
    apply(a){const r=E.applyAction(this.state,a);if(r.ok){this.state=r.state;this.history.push(r.transaction);this.epoch++;this.save();}return r;}
    undo(){if(!this.history.length)return false;this.state=this.history.pop().before;this.epoch++;this.save();return true;}
    restart(){this.start(this.level);}
    record(){if(this.state.status!=='won')return;const r=E.result(this.state,this.level),id=this.level.id,hash=E.definitionHash(this.level),old=this.best[id]?.hash===hash?this.best[id]:{};
      this.best[id]={hash,score:Math.max(old.score||0,r.score),stars:Math.max(old.stars||0,r.stars),moves:Math.min(old.moves||Infinity,this.state.successfulMoves)};this.write('best',this.best);}
    save(){this.write('session',{levelId:this.level.id,hash:E.definitionHash(this.level),actions:this.history.map(t=>t.action)});if(this.state.status==='won')this.record();}
    bestFor(l){const b=this.best[l.id];return b?.hash===E.definitionHash(l)&&Number.isFinite(b.score)&&Number.isInteger(b.stars)&&b.stars>=1&&b.stars<=3?b:{score:0,stars:0};}
  }
  root.TileSlideV06={...(root.TileSlideV06||{}),GameSession};if(typeof module!=='undefined')module.exports=GameSession;
})(globalThis);
