'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {bindInput,chooseDirection,releaseThreshold,projection}=require('../web/slide-v05/input.js');
const fixtures=[];
test.afterEach(()=>{for(const fixture of fixtures.splice(0))fixture.input.destroy();});
function surface(){const listeners=new Map();return {addEventListener(name,fn){if(!listeners.has(name))listeners.set(name,new Set());listeners.get(name).add(fn);},removeEventListener(name,fn){listeners.get(name)?.delete(fn);},dispatch(name,event){for(const fn of listeners.get(name)||[])fn(event);},count(){return [...listeners.values()].reduce((n,s)=>n+s.size,0);}};}
function setup({cell=100}={}){
  const doc=surface(),board=surface();board.ownerDocument=doc;
  const node={dataset:{tileId:'s1'},closest(){return this;},focus(){},setPointerCapture(){},hasPointerCapture(){return false;}};
  let state={levelId:'slide-01',definitionHash:'one',revision:0,status:'playing',tiles:[{id:'s1'}]},nextFrame=0;
  const frames=new Map(),commits=[],rejects=[],previews=[],starts=[],ends=[];let settled=0,undos=0;
  global.requestAnimationFrame=fn=>{const id=++nextFrame;frames.set(id,fn);return id;};global.cancelAnimationFrame=id=>frames.delete(id);
  const engine={inspectAction(current,action){return current.blocked?{ok:false,kind:'blocked',reason:'occupied'}:{ok:true,kind:'move',to:{row:0,col:1},...action};}};
  const view={clearPreview(){},metrics(){return {cell,pitch:cell+7};},settle(){settled++;},preview(...args){previews.push(args);},reject(){}};
  const input=bindInput({board,view,engine,getState:()=>state,commit:(...args)=>commits.push(args),onStart:info=>starts.push(info),onEnd:info=>ends.push(info),onReject:check=>rejects.push(check),undo(){undos++;}});
  const f={input,board,doc,node,frames,commits,rejects,previews,starts,ends,setState(value){state={...state,...value};},state:()=>state,settled:()=>settled,undos:()=>undos,
    fire(name,extra={}){board.dispatch(name,{pointerId:1,isPrimary:true,button:0,target:node,clientX:50,clientY:50,preventDefault(){},...extra});},
    key(key,extra={}){doc.dispatch('keydown',{key,target:node,preventDefault(){},...extra});},frame(){const callbacks=[...frames.values()];frames.clear();for(const cb of callbacks)cb();}};
  fixtures.push(f);return f;
}
test('axis recognition requires clear direction and valid CSS-scaled distance',()=>{assert.equal(chooseDirection(7,0),null);assert.equal(chooseDirection(20,19),null);assert.equal(chooseDirection(-20,5),'left');assert.equal(chooseDirection(5,-20),'up');assert.equal(releaseThreshold(50),12);assert.equal(releaseThreshold(100),18);assert.equal(releaseThreshold(200),24);assert.equal(projection(-50,0,'right'),-50);});
test('tap and short jitter submit nothing, but finish tutorial lifecycle once',()=>{const f=setup();f.fire('pointerdown');f.fire('pointermove',{clientX:57});f.fire('pointerup',{clientX:57});assert.equal(f.commits.length,0);assert.equal(f.starts.length,1);assert.equal(f.ends.length,1);assert.equal(f.frames.size,0);});
test('release resamples endpoint without any pointermove and long swipes submit one action',()=>{const f=setup();f.fire('pointerdown');f.fire('pointerup',{clientX:350});f.fire('pointerup',{clientX:350});assert.deepEqual(f.commits,[[{type:'slide',tileId:'s1',direction:'right'},{expectedRevision:0,inputMode:'pointer'}]]);assert.equal(f.ends.length,1);assert.equal(f.settled(),1);});
test('many motion updates paint at most once per frame',()=>{const f=setup();f.fire('pointerdown');for(let i=0;i<30;i++)f.fire('pointermove',{clientX:80+i});assert.equal(f.frames.size,1);assert.equal(f.previews.length,0);f.frame();assert.equal(f.previews.length,1);assert.equal(f.commits.length,0);});
test('diagonal release has no guessed axis; locked direction reverses only by cancelling',()=>{const a=setup();a.fire('pointerdown');a.fire('pointerup',{clientX:100,clientY:100});assert.equal(a.commits.length,0);const b=setup();b.fire('pointerdown');b.fire('pointermove',{clientX:80});b.fire('pointerup',{clientX:10});assert.equal(b.commits.length,0);});
test('small-screen threshold accepts deliberate short swipe',()=>{const f=setup({cell:60});f.fire('pointerdown');f.fire('pointerup',{clientX:63});assert.equal(f.commits.length,1);});
test('second finger is ignored without cancelling the first gesture',()=>{const f=setup();f.fire('pointerdown');f.fire('pointerdown',{pointerId:2,isPrimary:false,clientX:100});f.fire('pointermove',{pointerId:2,clientX:200});f.fire('pointerup',{pointerId:2,clientX:200});f.fire('pointerup',{clientX:80});assert.equal(f.commits.length,1);assert.equal(f.starts.length,1);assert.equal(f.ends.length,1);});
test('cancel removes queued preview and prevents late release commit',()=>{for(const mode of ['pointercancel','external','lostpointercapture']){const f=setup();f.fire('pointerdown');f.fire('pointermove',{clientX:100});if(mode==='external')f.input.cancel();else f.fire(mode);f.fire('pointerup',{clientX:100});f.frame();assert.equal(f.commits.length,0);assert.equal(f.frames.size,0);assert.equal(f.ends.length,1);}});
test('revision and level identity change reject stale endpoint',()=>{for(const change of [{revision:1},{levelId:'slide-02'},{definitionHash:'other'}]){const f=setup();f.fire('pointerdown');f.setState(change);f.fire('pointerup',{clientX:100});assert.equal(f.commits.length,0);assert.equal(f.rejects[0].reason,'stale');}});
test('occupied destination sends local rejection, never commits',()=>{const f=setup();f.setState({blocked:true});f.fire('pointerdown');f.fire('pointerup',{clientX:100});assert.equal(f.commits.length,0);assert.equal(f.rejects[0].reason,'occupied');assert.equal(f.ends.length,1);});
test('keyboard arrows move directly, ignore held repeat and notify lifecycle',()=>{const f=setup();f.key('ArrowRight');f.key('ArrowRight',{repeat:true});assert.equal(f.commits.length,1);assert.equal(f.commits[0][1].inputMode,'keyboard');assert.equal(f.starts.length,1);assert.equal(f.ends.length,1);});
test('Ctrl or Meta Z undoes but editable controls retain native behavior',()=>{const f=setup();f.key('z',{ctrlKey:true});f.key('z',{metaKey:true});f.key('z',{ctrlKey:true,target:{tagName:'INPUT'}});assert.equal(f.undos(),2);});
test('destroy is idempotent and clears listeners and frames',()=>{const f=setup();f.fire('pointerdown');f.fire('pointermove',{clientX:100});f.input.destroy();f.input.destroy();assert.equal(f.board.count(),0);assert.equal(f.doc.count(),0);assert.equal(f.frames.size,0);assert.equal(f.ends.length,1);});
