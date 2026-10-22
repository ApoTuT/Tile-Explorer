'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const E = require('../web/merge-v03/engine.js');
const C = require('../web/merge-v03/content.js');
const Copy = require('../web/merge-v03/copy.js');
const G = require('../web/merge-v03/geometry.js');
const levels = require('../web/merge-v03/levels.js');
const source = name => fs.readFileSync(path.join(__dirname, '../web/merge-v03/', name + '.js'), 'utf8');

function fixture({animations = 'automatic', reduced = false} = {}) {
  const calls = [], created = [];
  let document;
  class Element {
    constructor(tag) {
      this.tagName = tag;
      this.style = {setProperty(name, value) { this[name] = value; }};
      this.dataset = {};
      this.attributes = new Map();
      this.children = [];
      this.parentNode = null;
      this.hidden = false;
      this.classes = new Set();
      this.classList = {
        add: (...names) => names.forEach(name => this.classes.add(name)),
        remove: (...names) => names.forEach(name => this.classes.delete(name)),
        contains: name => this.classes.has(name),
        toggle: (name, value) => {
          const active = value === undefined ? !this.classes.has(name) : value;
          if (active) this.classes.add(name); else this.classes.delete(name);
          return active;
        }
      };
      this.box = {left: 20, top: 100, width: 420, height: 375};
      if (animations !== 'missing') {
        this.animate = (frames, options) => {
          let resolve, reject;
          const finished = new Promise((yes, no) => { resolve = yes; reject = no; });
          const animation = {finished, resolve, cancel() { reject(new Error('cancelled')); }};
          calls.push({frames, options, animation});
          if (animations === 'automatic') resolve();
          return animation;
        };
      }
      created.push(this);
    }
    set className(value) { this.classes = new Set(value.split(/\s+/).filter(Boolean)); }
    get className() { return [...this.classes].join(' '); }
    addEventListener() {}
    setAttribute(name, value) { this.attributes.set(name, value); }
    getAttribute(name) { return this.attributes.get(name); }
    append(...nodes) {
      for (const node of nodes) {
        node.remove();
        this.children.push(node);
        node.parentNode = this;
      }
    }
    remove() {
      if (!this.parentNode) return;
      const children = this.parentNode.children;
      children.splice(children.indexOf(this), 1);
      this.parentNode = null;
    }
    replaceChildren(...nodes) { for (const node of [...this.children]) node.remove(); this.append(...nodes); }
    getBoundingClientRect() { return this.box; }
    focus() { document.activeElement = this; }
  }
  document = {createElement: tag => new Element(tag), activeElement: null};
  document.body = new Element('body');
  const context = vm.createContext({
    document, matchMedia: () => ({matches: reduced}),
    TileMergeV03: {engine: E, geometry: G, content: C, copy: Copy, config: {snapMs: 2, growMs: 3, deliverMs: 4, parkMs: 5}}
  });
  vm.runInContext(source('view'), context);
  vm.runInContext(source('presentation'), context);
  const board = new Element('div'), goals = new Element('div');
  const view = new context.TileMergeV03.View(board, goals);
  return {context, view, board, goals, calls, created, document};
}

const mergeEvent = {type: 'merge-deliver', sourceItemId: 'car-small', resultId: 'sports-car', recipeId: 'car-upgrade'};
const parkEvent = {type: 'park', sourceItemId: 'strawberry-small'};

test('mixed goals, parking and unaffected tile nodes remain stable across an actual move', () => {
  const {view, document} = fixture();
  view.setLevel(levels[2]);
  const initial = E.createState(levels[2]); view.render(initial);
  const survivor = view.tiles.get('u2'), parking = view.parking, pad = view.pad;
  const goal = view.goalSlots.get('tree-grown'); survivor.focus();
  const next = E.applyMove(initial, {sourceId:'u4', targetId:'l0'}).state;
  view.render(next);
  assert.equal(view.tiles.get('u2'), survivor); assert.equal(document.activeElement, survivor);
  assert.equal(view.parking, parking); assert.equal(view.pad, pad);
  assert.equal(view.goalSlots.get('tree-grown'), goal);
  assert.equal(goal.node.classList.contains('filled'), true);
  assert.equal(view.goalSlots.get('strawberry-large').node.classList.contains('filled'), false);
  assert.equal(view.goalSlots.get('sports-car').node.classList.contains('filled'), false);
  assert.equal(view.tiles.has('u4'), false); assert.equal(view.tiles.has('l0'), false);
  assert.equal(goal.image.src, C.assetUrl('tree-grown'));
  assert.deepEqual(view.goalBox('tree-grown'), goal.image.getBoundingClientRect());
});

test('parking and undo reuse one actor and preserve its focus and physical position', () => {
  const {view, document, board} = fixture();
  view.setLevel(levels[1]); const initial = E.createState(levels[1]); view.render(initial);
  const source = view.tiles.get('u1'); source.focus();
  const parked = E.applyMove(initial, {type:'park', sourceId:'u1'}); view.render(parked.state);
  assert.equal(view.tiles.get('u1'), source); assert.equal(source.parentNode, view.parking);
  assert.equal(document.activeElement, source); assert.equal(source.style.left, '-2px');
  assert.equal(view.pad.hidden, true);
  view.render(E.undo(parked.state, parked.transaction));
  assert.equal(source.parentNode, board); assert.equal(view.pad.hidden, false);
});

test('layout, repeated feedback and empty drag targets neither rebuild nodes nor throw', () => {
  const {view, board, created} = fixture(); view.setLevel(levels[2]); view.render(E.createState(levels[2]));
  const actor = view.tiles.get('u1'), count = created.length, oldLeft = actor.style.left;
  board.box = {...board.box, width:320}; view.layout();
  assert.equal(view.tiles.get('u1'), actor); assert.notEqual(actor.style.left, oldLeft); assert.equal(created.length,count);
  assert.doesNotThrow(() => view.markTargets(undefined, null));
  view.markTargets('l0',{ok:true}); const highlight=view.highlight; view.markTargets('l0',{ok:true});
  assert.equal(view.highlight,highlight);
  view.markTargets('__parking__',{ok:false}); assert.equal(view.tiles.get('l0').classList.contains('can-drop'),false);
  assert.equal(view.parking.classList.contains('cannot-drop'),true); view.markTargets(undefined,null);
  assert.equal(view.highlight,null); assert.equal(view.parking.classList.contains('cannot-drop'),false);
  assert.doesNotThrow(() => view.markTargets(undefined,null));
});

test('each family displays its own picture and the first lesson can enlarge its cards', () => {
  const {view} = fixture(); view.setLevel(levels[2]); view.render(E.createState(levels[2]));
  assert.equal(view.tiles.get('u4').children[0].src,C.assetUrl('tree-small'));
  assert.equal(view.tiles.get('u3').children[0].src,C.assetUrl('car-small'));
  assert.equal(view.tiles.get('u1').children[0].src,C.assetUrl('strawberry-small'));
  view.setLevel(levels[0]); view.render(E.createState(levels[0])); assert.ok(view.transform().scale>.84);
});

test('multi-result delivery uses the registered product and compositor-only motion', async () => {
  const {context,calls,document} = fixture(); const fx=new context.TileMergeV03.Presentation();
  const target={left:100,top:200,width:80,height:80}, goal={left:20,top:30,width:40,height:40};
  assert.equal(await fx.play(mergeEvent,{...target,left:70},target,goal),true);
  assert.equal(calls.length,3); assert.deepEqual(calls.map(c=>c.options.duration),[2,3,4]);
  for(const call of calls)for(const frame of call.frames)assert.ok(Object.keys(frame).every(k=>['transform','opacity'].includes(k)));
  assert.equal(calls[2].frames[1].transform,'translate3d(0px,10px,0) scale(0.5) rotate(0deg)');
  assert.equal(document.body.children.length,0); assert.equal(fx.actors.size,0);
});

test('a new gesture cancels every in-flight actor without a stale visual completion', async () => {
  const {context,calls,document}=fixture({animations:'manual'}); const fx=new context.TileMergeV03.Presentation();
  const target={left:100,top:100,width:80,height:80};
  const first=fx.play(parkEvent,null,target,null), second=fx.play(mergeEvent,null,target,target);
  assert.equal(fx.actors.size,2); assert.equal(calls.length,2); fx.cancel();
  assert.deepEqual(await Promise.all([first,second]),[false,false]);
  assert.equal(document.body.children.length,0); assert.equal(fx.animations.size,0);
});

test('missing APIs and a shared reduced-motion preference safely settle all visuals', async () => {
  for(const options of [{animations:'missing'},{reduced:true},{sharedPreference:true}]){
    const {context,calls,document}=fixture(options);
    const fx=new context.TileMergeV03.Presentation(options.sharedPreference?{isReducedMotion:()=>true}:{});
    const target={left:5,top:10,width:70,height:70};
    assert.equal(await fx.play(parkEvent,null,target,null),true);
    assert.equal(await fx.play(mergeEvent,null,target,target),true);
    assert.equal(calls.length,0); assert.equal(document.body.children.length,0);
  }
});
