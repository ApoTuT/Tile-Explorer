'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const E = require('../web/merge-v03/engine.js');
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
    TileMergeV03: {engine: E, geometry: G, config: {snapMs: 2, growMs: 3, deliverMs: 4, parkMs: 5}}
  });
  vm.runInContext(source('view'), context);
  vm.runInContext(source('presentation'), context);
  const board = new Element('div'), goals = new Element('div');
  const view = new context.TileMergeV03.View(board, goals);
  return {context, view, board, goals, calls, created, document};
}

test('a move reuses unaffected tile, nest and goal nodes and keeps their focus', () => {
  const {view, document} = fixture();
  view.setLevel(levels[2]);
  const initial = E.createState(levels[2]);
  view.render(initial);
  const survivor = view.tiles.get('u4'), nest = view.nest, pad = view.pad;
  const goal = view.goalSlots[0].node, goalImage = goal.children[0];
  survivor.focus();
  const next = E.applyMove(initial, {sourceId: 'u2', targetId: 'l0'}).state;
  view.render(next);
  assert.equal(view.tiles.get('u4'), survivor);
  assert.equal(document.activeElement, survivor);
  assert.equal(view.nest, nest); assert.equal(view.pad, pad);
  assert.equal(view.goalSlots[0].node, goal);
  assert.equal(goal.children[0], goalImage);
  assert.equal(view.tiles.has('u2'), false); assert.equal(view.tiles.has('l0'), false);
  assert.equal(goal.classList.contains('filled'), true);
});

test('parking and undo move the same actor between its board and nest parents', () => {
  const {view, document, board} = fixture();
  view.setLevel(levels[1]);
  const initial = E.createState(levels[1]);
  view.render(initial);
  const puppy = view.tiles.get('u1');
  puppy.focus();
  const parked = E.applyMove(initial, {type: 'park', sourceId: 'u1'});
  view.render(parked.state);
  assert.equal(view.tiles.get('u1'), puppy);
  assert.equal(puppy.parentNode, view.nest);
  assert.equal(document.activeElement, puppy);
  assert.equal(puppy.style.left, '-2px');
  assert.equal(view.pad.hidden, true);
  view.render(E.undo(parked.state, parked.transaction));
  assert.equal(view.tiles.get('u1'), puppy);
  assert.equal(puppy.parentNode, board);
  assert.equal(view.pad.hidden, false);
});

test('layout and repeated target feedback do not create nodes or restart target classes', () => {
  const {view, board, created} = fixture();
  view.setLevel(levels[2]);
  view.render(E.createState(levels[2]));
  const actor = view.tiles.get('u1'), count = created.length;
  const oldLeft = actor.style.left;
  board.box = {...board.box, width: 320};
  view.layout();
  assert.equal(view.tiles.get('u1'), actor);
  assert.notEqual(actor.style.left, oldLeft);
  assert.equal(created.length, count);
  view.markTargets('l0', {ok: true});
  const highlight = view.highlight;
  view.markTargets('l0', {ok: true});
  assert.equal(view.highlight, highlight);
  view.markTargets('__nest__', {ok: false});
  assert.equal(view.tiles.get('l0').classList.contains('can-drop'), false);
  assert.equal(view.nest.classList.contains('cannot-drop'), true);
  view.clearTargets();
  assert.equal(view.nest.classList.contains('cannot-drop'), false);
});

test('dragging across blank space clears feedback and tolerates repeated empty targets', () => {
  const {view} = fixture();
  view.setLevel(levels[0]);
  view.render(E.createState(levels[0]));
  assert.doesNotThrow(() => view.markTargets(undefined, undefined));
  view.markTargets('l1', {ok: true});
  assert.equal(view.tiles.get('l1').classList.contains('can-drop'), true);
  view.markTargets(undefined, undefined);
  assert.equal(view.highlight, null);
  assert.equal(view.tiles.get('l1').classList.contains('can-drop'), false);
  assert.doesNotThrow(() => view.markTargets(undefined, undefined));
});

test('keyboard parking removes the introductory arrow from the old source position', () => {
  const {view} = fixture();
  view.setLevel(levels[0]);
  const initial = E.createState(levels[0]);
  view.render(initial);
  assert.ok(view.guide);
  view.render(E.applyMove(initial, {type: 'park', sourceId: 'u1'}).state);
  assert.equal(view.guide, null);
});

test('delivery animates only compositor properties and lands at the goal center', async () => {
  const {context, calls} = fixture();
  const fx = new context.TileMergeV03.Presentation();
  const target = {left: 100, top: 200, width: 80, height: 80};
  const goal = {left: 20, top: 30, width: 40, height: 40};
  assert.equal(await fx.play({type: 'merge-deliver'}, {...target, left: 70}, target, goal), true);
  assert.equal(calls.length, 3);
  assert.deepEqual(calls.map(call => call.options.duration), [2, 3, 4]);
  for (const call of calls) for (const frame of call.frames) {
    assert.ok(Object.keys(frame).every(key => ['transform', 'opacity'].includes(key)));
  }
  assert.equal(calls[2].frames[1].transform, 'translate3d(0px,10px,0) scale(0.5) rotate(0deg)');
  assert.equal(fx.actors.size, 0);
  assert.equal(fx.animations.size, 0);
});

test('new gestures can cancel multiple in-flight actors without stale completions', async () => {
  const {context, calls, document} = fixture({animations: 'manual'});
  const fx = new context.TileMergeV03.Presentation();
  const target = {left: 100, top: 100, width: 80, height: 80};
  const first = fx.play({type: 'park'}, null, target, null);
  const second = fx.play({type: 'merge-deliver'}, null, target, target);
  assert.equal(fx.actors.size, 2); assert.equal(calls.length, 2);
  fx.cancel();
  assert.deepEqual(await Promise.all([first, second]), [false, false]);
  assert.equal(document.body.children.length, 0);
  assert.equal(fx.actors.size, 0); assert.equal(fx.animations.size, 0);
});

test('missing animation APIs and reduced motion still complete and release every actor', async () => {
  for (const options of [{animations: 'missing'}, {reduced: true}]) {
    const {context, calls, document} = fixture(options);
    const fx = new context.TileMergeV03.Presentation();
    const target = {left: 5, top: 10, width: 70, height: 70};
    assert.equal(await fx.play({type: 'park'}, null, target, null), true);
    assert.equal(await fx.play({type: 'merge-deliver'}, null, target, target), true);
    assert.equal(calls.length, 0);
    assert.equal(document.body.children.length, 0);
  }
});
