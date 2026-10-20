'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
require('../web/tray-content.js');
require('../web/tray-director.js');
require('../web/audio-manager.js');
const {profiles,scripts,motions,Director,selectInteraction} = globalThis.TileTheater;
const audioManifest = require('../web/assets/audio/v02/manifest.json');
const symbols = Object.keys(profiles).map(code => ({code}));
const tile = (id,code) => ({id,kind:symbols.findIndex(symbol => symbol.code === code)});
const stateOf = tray => ({symbols,capacity:7,tray,tiles:[]});
function enterFor(tray,id) {
  const index = tray.findIndex(item => item.id === id);
  return {schema_version:1,events:[{type:'tray_enter',tile:{...tray[index]},insert_index:index,
    tray_after_insert:tray.map(item => ({...item}))}]};
}
function clearFor(tray,id) {
  const presentation = enterFor(tray,id), kind = tray.find(item => item.id === id).kind;
  presentation.events.push({type:'triple_clear',kind,tile_ids:tray.filter(item => item.kind === kind).map(item => item.id)});
  return presentation;
}
class FakeClock {
  constructor() { this.time = 0; this.nextId = 1; this.tasks = new Map(); }
  now = () => this.time;
  setTimeout = (callback,delay) => {const id=this.nextId++;this.tasks.set(id,{callback,at:this.time+delay});return id;};
  clearTimeout = id => this.tasks.delete(id);
  tick(ms) {
    const end=this.time+ms;
    for (;;) {
      const next=[...this.tasks].filter(([,task])=>task.at<=end).sort((a,b)=>a[1].at-b[1].at||a[0]-b[0])[0];
      if(!next)break;
      this.tasks.delete(next[0]);this.time=Math.max(this.time,next[1].at);next[1].callback();
    }
    this.time=end;
  }
  jump(ms) { this.time+=ms; }
}
function setup(extra={}) {
  const clock=new FakeClock(), calls=[], life={visible:true,reduced:false};
  const audio={play:(...args)=>calls.push(['play',...args]),stopAll:()=>calls.push(['stopAll'])};
  const view=Object.fromEntries(['enter','motion','reaction','clear','cancel'].map(method=>[method,(...args)=>calls.push([method,...args])]));
  const director=new Director({audio,view,now:clock.now,visible:()=>life.visible,reducedMotion:()=>life.reduced,
    setTimeout:clock.setTimeout,clearTimeout:clock.clearTimeout,...extra});
  return {clock,calls,life,director,audio,view};
}
const events = (calls,name) => calls.filter(call=>call[0]===name);

test('the content supplies 18 own voices, 8 bounded scripts and controlled motion presets',()=>{
  assert.equal(Object.keys(profiles).length,18);
  for(const [code,profile] of Object.entries(profiles)) {
    assert.equal(profile.code,code);assert.equal(profile.enter_sound,code);assert.equal(profile.clear_sound,code);
    assert.ok(profile.personality);assert.ok(motions[profile.enter_motion]);
    assert.ok(motions[profile.enter_motion].duration>=120 && motions[profile.enter_motion].duration<=180);
    assert.equal(profile.idle_motion,null);
    assert.equal(profile.sound_duration_seconds,audioManifest.assets.find(asset=>asset.id===code).duration_seconds);
  }
  assert.equal(scripts.length,8);assert.equal(scripts.filter(rule=>rule.codes.length===2).length,6);
  assert.equal(scripts.filter(rule=>rule.codes.length===3).length,2);
  for(const rule of scripts) {
    assert.equal(rule.cooldown_ms,6000);assert.ok(rule.duration_ms<=600);
    for(const cue of rule.cues) {
      assert.ok(rule.codes.includes(cue.actor));assert.ok(!cue.motion || motions[cue.motion]);
      assert.ok(cue.at+(motions[cue.motion]?.duration || 180)<=rule.duration_ms);
    }
  }
  assert.ok(Object.isFrozen(profiles.apple));assert.ok(Object.isFrozen(scripts[0].cues));
});

// Exercise the real AudioManager's priority, duration and two-source budget.
function realAudioFixture(clock) {
  const sources=[],active=new Set(),attempts=[];
  let maximumActive=0;
  const context={
    state:'running',get currentTime(){return clock.now()/1000;},
    createGain() {
      return {gain:{value:1,setValueAtTime(){},linearRampToValueAtTime(){},cancelScheduledValues(){}},
        connect(){},disconnect(){}};
    },
    createBufferSource() {
      let startTimer=null,endTimer=null,stopTimer=null;
      const source={buffer:null,onended:null,ended:false,startedAt:null,endedAt:null,
        connect(){},disconnect(){},
        finish() {
          if(this.ended)return;this.ended=true;this.endedAt=clock.now()/1000;active.delete(this);
          for(const timer of [startTimer,endTimer,stopTimer])if(timer!==null)clock.clearTimeout(timer);
          this.onended?.();
        },
        start(at,offset=0,duration=Infinity) {
          this.startedAt=at;
          const begin=()=>{if(this.ended)return;active.add(this);maximumActive=Math.max(maximumActive,active.size);};
          if(at>context.currentTime)startTimer=clock.setTimeout(begin,(at-context.currentTime)*1000);
          else begin();
          const length=Math.min(this.buffer.duration-offset,duration);
          endTimer=clock.setTimeout(()=>this.finish(),Math.max(0,(at+length-context.currentTime)*1000));
        },
        stop(at) {
          if(stopTimer!==null)clock.clearTimeout(stopTimer);
          if(Number.isFinite(at)&&at>context.currentTime) {
            stopTimer=clock.setTimeout(()=>this.finish(),(at-context.currentTime)*1000);
          } else this.finish();
        }
      };
      sources.push(source);return source;
    }
  };
  const audio=new globalThis.TileTheater.AudioManager();
  audio.context=context;audio.master={};audio._unlocked=true;
  for(const asset of audioManifest.assets)audio.buffers.set(asset.id,{duration:asset.duration_seconds,code:asset.id});
  const play=audio.play.bind(audio);
  audio.play=(code,options)=>{const accepted=play(code,options);attempts.push({code,options,accepted,at:clock.now()});return accepted;};
  return {audio,sources,attempts,get maximumActive(){return maximumActive;},get activeCount(){return active.size;}};
}

test('real audio accepts every script peer and entrant order within its scene and two voices',()=>{
  for(const rule of scripts)for(const enteringCode of rule.codes) {
    const clock=new FakeClock(),fixture=realAudioFixture(clock);
    const tray=rule.codes.filter(code=>code!==enteringCode).concat(enteringCode).map((code,index)=>tile(index+1,code));
    const director=new Director({audio:fixture.audio,view:{},now:clock.now,visible:()=>true,reducedMotion:()=>false,
      setTimeout:clock.setTimeout,clearTimeout:clock.clearTimeout});
    assert.equal(director.consume(enterFor(tray,tray.length),stateOf(tray),{epoch:1,seq:1}).scriptId,rule.id);
    clock.tick(1000);
    assert.equal(fixture.attempts.length,rule.codes.length,enteringCode);
    assert.ok(fixture.attempts.every(attempt=>attempt.accepted),`${enteringCode}: no peer voice may be dropped`);
    assert.deepEqual(new Set(fixture.sources.map(source=>source.buffer.code)),new Set(rule.codes));
    assert.ok(fixture.maximumActive<=2,`${enteringCode}: voice budget`);
    assert.equal(fixture.activeCount,0);assert.equal(fixture.audio.voices.size,0);
    assert.ok(fixture.sources.every(source=>source.endedAt<=rule.duration_ms/1000+1e-6),`${enteringCode}: audio outlives scene`);
    assert.equal(fixture.attempts[0].options.priority,2);
    assert.ok(fixture.attempts[0].options.duration<=.18);
    assert.ok(fixture.attempts.slice(1).every(attempt=>attempt.options.priority===3));
  }
});

test('every script matches its roles without requiring adjacent slots',()=>{
  for(const rule of scripts) {
    const tray=rule.codes.map((code,index)=>tile(index,code));
    const result=selectInteraction({tray,enteredTileId:tray.at(-1).id,symbols,scripts:[rule]});
    assert.equal(result.script.id,rule.id);
    assert.equal(new Set(Object.values(result.actors)).size,rule.codes.length);
  }
  const tray=[tile(1,'apple'),tile(2,'bear'),tile(3,'cat')];
  assert.equal(selectInteraction({tray,enteredTileId:3,symbols}).script.id,'cat_inspects_apple');
});

test('three different roles outrank eligible pairs, including a pair with higher priority',()=>{
  const tray=[tile(1,'apple'),tile(2,'car'),tile(3,'cat')];
  const pair={...scripts.find(rule=>rule.id==='car_startles_cat'),priority:999};
  const result=selectInteraction({tray,enteredTileId:3,symbols,scripts:[pair,scripts.find(rule=>rule.id==='first_trip')]});
  assert.equal(result.script.id,'first_trip');
});

test('same-cardinality selection uses numeric priority and then stable rule ID',()=>{
  const tray=[tile(1,'apple'),tile(2,'cat')], base=scripts[0];
  const rules=[{...base,id:'z',priority:4},{...base,id:'b',priority:5},{...base,id:'a',priority:5}];
  assert.equal(selectInteraction({tray,enteredTileId:2,symbols,scripts:rules}).script.id,'a');
});

test('the entrant is bound even when its type already appears, and peers use distance then slot index',()=>{
  let tray=[tile(1,'cat'),tile(2,'apple'),tile(3,'cat'),tile(4,'apple')];
  let result=selectInteraction({tray,enteredTileId:3,symbols});
  assert.deepEqual({...result.actors},{apple:2,cat:3});
  tray=[tile(1,'apple'),tile(2,'apple'),tile(3,'cat')];
  result=selectInteraction({tray,enteredTileId:3,symbols});
  assert.equal(result.actors.apple,2);
});

test('a pre-existing combination cannot trigger from an unrelated entrant',()=>{
  const tray=[tile(1,'apple'),tile(2,'cat'),tile(3,'bear')];
  assert.equal(selectInteraction({tray,enteredTileId:3,symbols}),null);
  assert.equal(selectInteraction({tray:[tile(1,'apple'),tile(1,'cat')],enteredTileId:1,symbols}),null);
});

test('global and per-rule cooldowns are independent and have exact start boundaries',()=>{
  const tray=[tile(1,'apple'),tile(2,'cat')], args={tray,enteredTileId:2,symbols};
  assert.equal(selectInteraction({...args,now:999,lastStartedAt:0}),null);
  assert.equal(selectInteraction({...args,now:1000,lastStartedAt:0}).script.id,'cat_inspects_apple');
  const ruleStartedAt=new Map([['cat_inspects_apple',0]]);
  assert.equal(selectInteraction({...args,now:5999,ruleStartedAt}),null);
  assert.equal(selectInteraction({...args,now:6000,ruleStartedAt}).script.id,'cat_inspects_apple');
});

test('an insertion immediately has its own action and voice with kind mapped through server symbols',()=>{
  const h=setup(), alternate=[{code:'cat'},{code:'apple'}], tray=[{id:8,kind:1}];
  const result=h.director.consume(enterFor(tray,8),{...stateOf(tray),symbols:alternate},{epoch:1,seq:1});
  assert.equal(result.kind,'enter');assert.equal(events(h.calls,'enter')[0][2].code,'apple');
  assert.equal(events(h.calls,'play')[0][1],'apple');assert.equal(h.clock.tasks.size,0);
});

test('an interaction has one own entering sound and binds only the selected instances',()=>{
  const h=setup(),tray=[tile(1,'apple'),tile(2,'apple'),tile(3,'cat')];
  const result=h.director.consume(enterFor(tray,3),stateOf(tray),{epoch:1,seq:1});
  assert.equal(result.scriptId,'cat_inspects_apple');assert.equal(result.actors.apple,2);
  h.clock.tick(600);
  assert.equal(events(h.calls,'play').filter(call=>call[1]==='cat').length,1);
  assert.equal(events(h.calls,'play').filter(call=>call[1]==='apple').length,1);
  assert.ok(events(h.calls,'motion').some(call=>call[1]===2));
  assert.ok(!events(h.calls,'motion').some(call=>call[1]===1));
});

test('triple clear outranks all combinations and preserves the entering snapshot',()=>{
  const h=setup(),tray=[tile(1,'apple'),tile(2,'apple'),tile(3,'apple'),tile(4,'car'),tile(5,'cat')];
  const presentation=clearFor(tray,3), state=stateOf(tray.slice(3));
  const result=h.director.consume(presentation,state,{epoch:1,seq:1});
  assert.equal(result.kind,'clear');assert.equal(events(h.calls,'enter').length,1);
  assert.equal(events(h.calls,'clear').length,1);
  assert.deepEqual(events(h.calls,'clear')[0][2].tray_after_insert,tray);
  assert.deepEqual(events(h.calls,'play').map(call=>call[1]),['apple']);
  assert.equal(h.clock.tasks.size,0);
});

test('a seventh-slot triple is accepted using the post-insert, pre-clear snapshot',()=>{
  const h=setup(),tray=[tile(1,'apple'),tile(2,'apple'),tile(3,'apple'),tile(4,'cat'),tile(5,'cat'),tile(6,'car'),tile(7,'car')];
  assert.equal(h.director.consume(clearFor(tray,3),stateOf(tray.slice(3)),{epoch:1,seq:1}).kind,'clear');
});

test('malformed, inconsistent or missing event data quietly degrades without feedback',()=>{
  const tray=[tile(1,'apple')],good=enterFor(tray,1);
  const cases=[undefined,{}, {...good,schema_version:2},
    {schema_version:1,events:[...good.events,...good.events]},
    {schema_version:1,events:[{...good.events[0],insert_index:3}]},
    {schema_version:1,events:[{...good.events[0],tray_after_insert:[...tray,...tray]}]},
    {schema_version:1,events:[{...good.events[0],tile:{id:1,kind:99}}]}];
  for(const presentation of cases) {
    const h=setup();assert.equal(h.director.consume(presentation,stateOf(tray),{epoch:1,seq:1}).kind,'skipped');
    assert.equal(events(h.calls,'enter').length,0);assert.equal(events(h.calls,'play').length,0);
  }
  const h=setup();assert.equal(h.director.consume(good,stateOf([]),{epoch:1,seq:1}).reason,'invalid');
  assert.equal(h.director.consume(good,stateOf(tray),{epoch:1,seq:1}).reason,'stale');
});

test('an invalid clear cannot replay a group, omit the entrant or reuse an ID',()=>{
  const tray=[tile(1,'apple'),tile(2,'apple'),tile(3,'apple')];
  for(const ids of [[1,1,3],[1,2,9],[1,2]]) {
    const h=setup(),presentation=clearFor(tray,3);presentation.events[1].tile_ids=ids;
    assert.equal(h.director.consume(presentation,stateOf([]),{epoch:1,seq:1}).reason,'invalid');
    assert.equal(events(h.calls,'clear').length,0);
  }
});

test('duplicate and out-of-order batches do not replay or interrupt the current batch',()=>{
  const h=setup(),tray=[tile(1,'apple'),tile(2,'cat')],p=enterFor(tray,2);
  h.director.consume(p,stateOf(tray),{epoch:1,seq:3});
  const before=h.calls.length;
  assert.equal(h.director.consume(p,stateOf(tray),{epoch:1,seq:3}).reason,'stale');
  assert.equal(h.director.consume(p,stateOf(tray),{epoch:1,seq:2}).reason,'stale');
  assert.equal(h.director.consume(p,stateOf(tray),{epoch:0,seq:9}).reason,'stale');
  assert.equal(h.calls.length,before);h.clock.tick(600);
  assert.ok(events(h.calls,'reaction').length>0);
});

test('new input cancels old timers and still provides feedback during global cooldown',()=>{
  const h=setup(),first=[tile(1,'apple'),tile(2,'cat')];
  h.director.consume(enterFor(first,2),stateOf(first),{epoch:1,seq:1});
  h.clock.tick(40);
  const second=[...first,tile(3,'car')];
  const result=h.director.consume(enterFor(second,3),stateOf(second),{epoch:1,seq:2});
  assert.equal(result.kind,'enter');assert.equal(h.clock.tasks.size,0);
  const plays=events(h.calls,'play').length;h.clock.tick(2000);
  assert.equal(events(h.calls,'play').length,plays);assert.equal(events(h.calls,'enter').length,2);
});

test('cancel stops audio, view and timers while reset additionally clears cooldown and consumption',()=>{
  const h=setup(),tray=[tile(1,'apple'),tile(2,'cat')],p=enterFor(tray,2);
  h.director.consume(p,stateOf(tray),{epoch:1,seq:1});
  h.director.cancel();assert.equal(h.clock.tasks.size,0);
  assert.ok(events(h.calls,'stopAll').length>0);assert.ok(events(h.calls,'cancel').length>0);
  h.clock.tick(1100);
  assert.equal(h.director.consume(p,stateOf(tray),{epoch:1,seq:2}).kind,'enter');
  h.director.cancel({reset:true});
  assert.equal(h.director.consume(p,stateOf(tray),{epoch:1,seq:1}).kind,'interaction');
});

test('rule cooldown prevents repeated jokes but allows a different joke after the global gap',()=>{
  const h=setup(),a=[tile(1,'apple'),tile(2,'cat')];
  h.director.consume(enterFor(a,2),stateOf(a),{epoch:1,seq:1});h.clock.tick(1100);
  const b=[tile(3,'car'),tile(4,'cat')];
  assert.equal(h.director.consume(enterFor(b,4),stateOf(b),{epoch:1,seq:2}).scriptId,'car_startles_cat');
  h.clock.tick(1100);
  assert.equal(h.director.consume(enterFor(a,2),stateOf(a),{epoch:1,seq:3}).kind,'enter');
  h.clock.tick(3800);
  assert.equal(h.director.consume(enterFor(a,2),stateOf(a),{epoch:1,seq:4}).scriptId,'cat_inspects_apple');
});

test('a delivery received in the background is consumed and never replayed',()=>{
  const h=setup(),tray=[tile(1,'apple'),tile(2,'cat')],p=enterFor(tray,2);h.life.visible=false;
  assert.equal(h.director.consume(p,stateOf(tray),{epoch:1,seq:1}).reason,'hidden');
  h.life.visible=true;
  assert.equal(h.director.consume(p,stateOf(tray),{epoch:1,seq:1}).reason,'stale');
  assert.equal(events(h.calls,'play').length,0);assert.equal(h.clock.tasks.size,0);
  assert.equal(h.director.consume(p,stateOf(tray),{epoch:1,seq:2}).kind,'interaction');
});

test('becoming hidden before a cue cancels the entire scene and drops pending audio',()=>{
  const h=setup(),tray=[tile(1,'apple'),tile(2,'car'),tile(3,'cat')];
  h.director.consume(enterFor(tray,3),stateOf(tray),{epoch:1,seq:1});
  const plays=events(h.calls,'play').length;h.life.visible=false;h.clock.tick(200);
  h.life.visible=true;h.clock.tick(1000);
  assert.equal(events(h.calls,'play').length,plays);assert.equal(h.clock.tasks.size,0);
});

test('leaving the scene or losing an actor invalidates scheduled callbacks',()=>{
  const h=setup(),tray=[tile(1,'apple'),tile(2,'car'),tile(3,'cat')],state=stateOf(tray);
  h.director.consume(enterFor(tray,3),state,{epoch:1,seq:1});
  state.tray=tray.filter(item=>item.id!==1);const before=h.calls.length;h.clock.tick(600);
  assert.equal(events(h.calls.slice(before),'motion').length,0);assert.equal(h.clock.tasks.size,0);
  const next=[tile(7,'bear')];
  h.director.consume(enterFor(next,7),stateOf(next),{epoch:2,seq:2});
  assert.equal(h.director.consume(enterFor(tray,3),stateOf(tray),{epoch:1,seq:99}).reason,'stale');
});

test('a browser timer waking much too late does not play an expired cue',()=>{
  const h=setup(),tray=[tile(1,'apple'),tile(2,'cat')];
  h.director.consume(enterFor(tray,2),stateOf(tray),{epoch:1,seq:1});
  const plays=events(h.calls,'play').length;h.clock.jump(900);h.clock.tick(0);
  assert.equal(events(h.calls,'play').length,plays);assert.equal(h.clock.tasks.size,0);
});

test('a callback already handed to the event loop stays harmless after cancellation or a scene change',()=>{
  const h=setup(),tray=[tile(1,'apple'),tile(2,'cat')];
  h.director.consume(enterFor(tray,2),stateOf(tray),{epoch:1,seq:1});
  const queued=[...h.clock.tasks.values()].map(task=>task.callback);
  h.director.cancel({reset:true});
  const next=[tile(3,'bear')];h.director.consume(enterFor(next,3),stateOf(next),{epoch:2,seq:2});
  const before=h.calls.length;
  for(const callback of queued)callback();
  assert.equal(h.calls.length,before);
});

test('reduced motion substitutes opacity presets and keeps static reactions and own voice',()=>{
  const h=setup(),tray=[tile(1,'apple'),tile(2,'cat')];h.life.reduced=true;
  h.director.consume(enterFor(tray,2),stateOf(tray),{epoch:1,seq:1});h.clock.tick(600);
  assert.equal(events(h.calls,'enter')[0][2].enter_motion,'still');
  assert.ok(events(h.calls,'motion').every(call=>call[2]==='still'));
  assert.ok(events(h.calls,'reaction').length>0);assert.ok(events(h.calls,'play').length>0);
  const all=[tile(3,'apple'),tile(4,'apple'),tile(5,'apple')];
  h.director.consume(clearFor(all,5),stateOf([]),{epoch:1,seq:2});
  assert.equal(events(h.calls,'clear').at(-1)[1].reduced_motion,true);
});

test('unknown types and broken audio or views degrade without throwing',()=>{
  const h=setup(),unknown=[{id:1,kind:0}],state={...stateOf(unknown),symbols:[{code:'future_symbol'}]};
  assert.equal(h.director.consume(enterFor(unknown,1),state,{epoch:1,seq:1}).kind,'enter');
  assert.equal(events(h.calls,'play')[0][1],'apple');
  const broken=setup({audio:{play(){throw new Error('unavailable');},stopAll(){}},view:{enter(){throw new Error('missing node');},cancel(){}}});
  assert.doesNotThrow(()=>broken.director.consume(enterFor(unknown,1),state,{epoch:1,seq:1}));
});

test('view cleanup callbacks are released on cancellation',()=>{
  let cleaned=0;
  const h=setup({view:{enter:()=>()=>{cleaned+=1;},cancel(){}}}),tray=[tile(1,'apple')];
  h.director.consume(enterFor(tray,1),stateOf(tray),{epoch:1,seq:1});h.director.cancel();h.director.cancel();
  assert.equal(cleaned,1);
});
