'use strict';
const test=require('node:test'), assert=require('node:assert/strict');
const E=require('../web/merge-v03/engine.js'), levels=require('../web/merge-v03/levels.js');
const SaveStore=require('../web/merge-v03/storage.js');
const fs=require('node:fs'), vm=require('node:vm');
const memory=()=>{const map=new Map();return {map,getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)}};

test('v0.4 keeps v0.3 sessions intact and migrates only a validated sound preference',()=>{
  const data=memory(); const oldKey='tile-explorer.merge.v03.session.v1';
  data.setItem(oldKey,JSON.stringify({levelId:'merge-03',ruleset:'merge-v03-2',moves:[{sourceId:'u1',targetId:'l0'}]}));
  data.setItem('tile-explorer.merge.v03.progress.v1','{"merge-03":"old"}');
  data.setItem('tile-explorer.merge.v03.settings.v1','{"soundEnabled":false,"unknown":"private"}');
  const before=data.getItem(oldKey), store=new SaveStore(data,levels);
  assert.equal(store.loadSession(),null); assert.deepEqual(store.progress(),{});
  assert.deepEqual(store.read('settings'),{soundEnabled:false}); assert.equal(data.getItem(oldKey),before);
  assert.equal(data.getItem('tile-explorer.merge.v03.progress.v1'),'{"merge-03":"old"}');
});
test('production and same-origin preview retain independent histories and tutorial records',()=>{
  const data=memory(), live=new SaveStore(data,levels), preview=new SaveStore(data,levels,{scope:'preview'});
  live.saveSession(levels[0],[]); live.write('onboarding',{capabilities:{mergePair:true}});
  preview.saveSession(levels[2],[]); preview.write('onboarding',{capabilities:{parkTile:true}});
  assert.equal(live.loadSession().level.id,'merge-01'); assert.equal(preview.loadSession().level.id,'merge-03');
  assert.deepEqual(live.read('onboarding'),{capabilities:{mergePair:true}});
  assert.deepEqual(preview.read('onboarding'),{capabilities:{parkTile:true}});
  assert.notEqual(live.key('settings'),preview.key('settings'));
});
test('mixed complete journals restore and undo all park/merge transactions',()=>{
  const store=new SaveStore(memory(),levels), level=levels[2], played=E.replay(level,level.solution);
  store.saveSession(level,played.transactions); const restored=store.loadSession();
  assert.deepEqual(restored.state,played.state); assert.equal(restored.transactions.length,5);
  let state=restored.state; for(const txn of [...restored.transactions].reverse())state=E.undo(state,txn);
  assert.deepEqual(state,E.createState(level));
});
test('tampered, obsolete and overlong journals reset without altering independent completion',()=>{
  const data=memory(), store=new SaveStore(data,levels); store.complete(levels[1]);
  for(const patch of [{ruleset:'old'},{definitionHash:'old'},{moves:[{sourceId:'none',targetId:'l1'}]},
    {moves:Array.from({length:3},()=>({type:'park',sourceId:'u1'}))}]){
    store.saveSession(levels[0],[]);const key=store.key('session');
    data.setItem(key,JSON.stringify({...JSON.parse(data.getItem(key)),...patch}));
    assert.equal(store.loadSession().reset,true); assert.deepEqual(store.loadSession().state,E.createState(levels[0]));
    assert.deepEqual(Object.keys(store.progress()),['merge-02']);
  }
  data.setItem(store.key('session'),'{'); assert.equal(store.loadSession(),null);
});
test('unavailable storage retains this session, completion and onboarding in memory',()=>{
  const store=new SaveStore({getItem(){throw Error('denied')},setItem(){throw Error('denied')}},levels);
  store.saveSession(levels[1],[]); store.complete(levels[0]); store.write('onboarding',{capabilities:{mergePair:true}});
  assert.equal(store.failed,true); assert.equal(store.loadSession().level.id,'merge-02');
  assert.deepEqual(Object.keys(store.progress()),['merge-01']);assert.equal(store.read('onboarding').capabilities.mergePair,true);
});
test('neutral sound profiles stay relative and audio toggles preserve motion preferences',()=>{
  const data=memory();data.setItem('new','{"reduceMotion":true}'); const context=vm.createContext({localStorage:data});
  vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../web/audio-manager.js'),'utf8'),context);
  const Manager=context.TileTheater.AudioManager;
  const old=new Manager(), fresh=new Manager({profiles:{'merge-soft':{audio:'./assets/audio/v02/strawberry.wav'}},settingsKey:'new'});
  assert.equal(old._url('dog'),'/assets/audio/v02/dog.wav');assert.equal(fresh._url('merge-soft'),'./assets/audio/v02/strawberry.wav');
  fresh.setEnabled(false);assert.deepEqual(JSON.parse(data.getItem('new')),{reduceMotion:true,soundEnabled:false});
});
