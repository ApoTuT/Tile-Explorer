'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const copy = require('../web/merge-v03/copy.js');
const clone = value => JSON.parse(JSON.stringify(value));

function setup(levelId = 'merge-01', saved = null) {
  let now = 0, next = 0, token = 1;
  const timers = new Map(), cancelled = [], shown = [], messages = [], written = [];
  const state = {levelId, status: 'playing', revision: 0, parkingId: null,
    tiles: [{id: 'a', z: 1, family: 'strawberry'}, {id: 'b', z: 1, family: 'car'},
      {id: 'x', z: 0, family: 'strawberry'}, {id: 'y', z: 0, family: 'car'}]};
  const engine = {
    listMergeMoves(s) {
      if (s.status !== 'playing') return [];
      if (s.levelId === 'merge-02' && s.tiles.length === 4 && !s.parkingId) return [];
      const pairs = [{sourceId: 'a', targetId: 'x'}, {sourceId: 'b', targetId: 'y'}];
      return pairs.filter(move => s.tiles.some(t => t.id === move.sourceId) && s.tiles.some(t => t.id === move.targetId) &&
        !(s.levelId === 'merge-02' && s.tiles.length === 4 && move.sourceId === s.parkingId));
    },
    listLegalMoves(s) {
      return [...this.listMergeMoves(s), ...(!s.parkingId ? s.tiles.filter(t => t.z === 1).map(t => ({type: 'park', sourceId: t.id})) : [])];
    },
    applyMove(s, move) {
      const valid = this.listLegalMoves(s).some(m => JSON.stringify(m) === JSON.stringify(move));
      if (!valid) return {ok: false, state: s};
      const after = clone(s), events = [];
      after.revision++;
      if (move.type === 'park') {
        after.parkingId = move.sourceId;
        events.push({type: 'park', sourceId: move.sourceId});
      } else {
        after.tiles = after.tiles.filter(t => t.id !== move.sourceId && t.id !== move.targetId);
        if (after.parkingId === move.sourceId) after.parkingId = null;
        events.push({type: 'merge-deliver', ...move});
      }
      if (!after.tiles.length) after.status = 'won';
      return {ok: true, state: after, events};
    },
    solve() { return {status: 'solved'}; }
  };
  const guide = {hidden: 0, destroyed: false, show(options) { shown.push(clone(options)); },
    hide() { this.hidden++; }, destroy() { this.destroyed = true; }};
  const storage = {value: saved, read() { return this.value; }, write(key, value) {
    assert.equal(key, 'onboarding'); this.value = clone(value); written.push(clone(value)); }};
  const context = vm.createContext({setTimeout(fn, delay) { const id = ++next; timers.set(id, {fn, at: now + delay}); return id; },
    clearTimeout(id) { if (timers.has(id)) cancelled.push(timers.get(id).fn); timers.delete(id); },
    Date: class extends Date { static now() { return now; } }, TileMergeV03: {copy,
      content: {getItemForTile(t) { return {name: t.family === 'car' ? '普通小车' : '小草莓'}; }}}});
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../web/merge-v03/tutorial.js'), 'utf8'), context);
  const tutorial = new context.TileMergeV03.TutorialController({engine, store: storage, guide,
    getState: () => state, getRunToken: () => token, message: text => messages.push(text)});
  const level = {id: levelId};
  function advance(ms) {
    const end = now + ms;
    for (;;) {
      const earliest = [...timers].sort((a, b) => a[1].at - b[1].at || a[0] - b[0])[0];
      if (!earliest || earliest[1].at > end) break;
      now = earliest[1].at; timers.delete(earliest[0]); earliest[1].fn();
    }
    now = end;
  }
  function commit(move) {
    const before = clone(state), result = engine.applyMove(state, move);
    assert.equal(result.ok, true);
    Object.assign(state, result.state);
    tutorial.onCommitted({before, move, result});
    return before;
  }
  return {tutorial, state, engine, guide, shown, messages, written, storage, timers, cancelled, advance, commit, level,
    newRun() { token++; }, start() { tutorial.start(level); }};
}

test('first lesson demonstrates one legal pair, immediately yields to input and learns only a committed merge', () => {
  const t = setup(); t.start(); t.advance(550);
  assert.equal(t.shown.length, 1);
  assert.deepEqual(t.shown[0].move, {sourceId: 'a', targetId: 'x'});
  assert.equal(t.state.revision, 0);
  t.tutorial.onInput({type: 'gesture-start', sourceId: 'a'});
  assert.equal(t.timers.size, 0);
  t.advance(30000); assert.equal(t.shown.length, 1);
  assert.deepEqual({...t.tutorial.capabilities}, {});
  t.commit({sourceId: 'a', targetId: 'x'});
  assert.equal(t.tutorial.capabilities.mergePair, true);
  assert.equal(t.written.length, 1);
  t.advance(30000); assert.equal(t.shown.length, 1);
});

test('the second lesson follows either actual parking choice and later retrieves that same tile', () => {
  for (const parked of ['a', 'b']) {
    const t = setup('merge-02'); t.start(); t.advance(550);
    assert.equal(t.shown[0].move.type, 'park');
    t.commit({type: 'park', sourceId: parked});
    assert.equal(t.tutorial.capabilities.parkTile, true);
    assert.equal(t.tutorial.capabilities.retrieveTile, undefined);
    t.advance(1500);
    const remaining = parked === 'a' ? {sourceId: 'b', targetId: 'y'} : {sourceId: 'a', targetId: 'x'};
    assert.deepEqual(t.shown.at(-1).move, remaining);
    t.commit(remaining); t.advance(1500);
    const retrieval = parked === 'a' ? {sourceId: 'a', targetId: 'x'} : {sourceId: 'b', targetId: 'y'};
    assert.deepEqual(t.shown.at(-1).move, retrieval);
    t.commit(retrieval);
    assert.equal(t.tutorial.capabilities.retrieveTile, true);
    assert.equal(t.state.status, 'won');
  }
});

test('automatic rounds stay capped through taps, rejected drops and repeated refreshes in one stage', () => {
  const t = setup(); t.start(); t.advance(550 + 1200 + 4200);
  assert.equal(t.shown.length, 2);
  t.tutorial.onInput({type: 'tap-without-drag'});
  t.tutorial.refresh({reason: 'resize'});
  t.tutorial.onInput({type: 'drop-rejected', reason: 'different-family'});
  t.advance(30000);
  assert.equal(t.shown.length, 2);
  assert.equal(t.timers.size, 0);
  assert.equal(t.tutorial.help(), true);
  assert.equal(t.shown.length, 3); // Explicit one-step help is still available.
  t.advance(30000); assert.equal(t.shown.length, 3);
});

test('third lesson never reveals an idle solution; two similar recent failures request only one current step', () => {
  const t = setup('merge-03'); t.start(); t.advance(60000);
  assert.equal(t.shown.length, 0);
  t.tutorial.onInput({type: 'drop-rejected', reason: 'target-blocked'});
  t.advance(1000);
  t.tutorial.onInput({type: 'drop-rejected', reason: 'different-family'});
  t.advance(500);
  assert.equal(t.shown.length, 0);
  t.tutorial.onInput({type: 'drop-rejected', reason: 'different-family'});
  t.advance(350);
  assert.equal(t.shown.length, 1);
  assert.equal(t.shown[0].move.type, undefined);
  t.advance(60000); assert.equal(t.shown.length, 1);
});

test('a cancelled timer cannot revive after undo, a same-revision restart or a new active timer', () => {
  const t = setup(); t.start();
  t.tutorial.cancel();
  const old = t.cancelled[0];
  t.newRun(); t.start();
  const liveTimer = t.tutorial.timer;
  old();
  assert.equal(t.tutorial.timer, liveTimer);
  assert.equal(t.shown.length, 0);
  t.advance(550); assert.equal(t.shown.length, 1);
  t.tutorial.cancel(); t.advance(10000);
  assert.equal(t.timers.size, 0);
  assert.equal(t.shown.length, 1);
});

test('run token and revision protect timers even if the caller has not yet refreshed the guide', () => {
  const a = setup(); a.start(); a.newRun(); a.advance(1000); assert.equal(a.shown.length, 0);
  const b = setup(); b.start(); b.state.revision++; b.advance(1000); assert.equal(b.shown.length, 0);
  const c = setup(); c.start(); c.state.levelId = 'merge-03'; c.advance(1000); assert.equal(c.shown.length, 0);
});

test('undo does not remove learned capabilities and old-rule onboarding is isolated', () => {
  const t = setup(); t.start();
  const before = t.commit({sourceId: 'a', targetId: 'x'});
  Object.assign(t.state, before); t.newRun(); t.tutorial.refresh({reason: 'undo'}); t.advance(30000);
  assert.equal(t.tutorial.capabilities.mergePair, true);
  assert.equal(t.shown.length, 0);
  const reload = setup('merge-01', t.storage.value); reload.start(); reload.advance(30000);
  assert.equal(reload.shown.length, 0);
  const old = setup('merge-01', {ruleset: 'merge-v03-2', capabilities: {mergePair: true}});
  old.start(); old.advance(550); assert.equal(old.shown.length, 1);
});

test('unsolved and budget-limited suggestions fall back to general help without inventing a move', () => {
  for (const status of ['unsolvable', 'unverified']) {
    const t = setup('merge-03'); t.engine.solve = () => ({status}); t.start();
    assert.equal(t.tutorial.help(), false);
    assert.equal(t.shown.length, 0);
    assert.match(t.messages.at(-1), /找同类/);
    assert.equal(t.state.revision, 0);
  }
});

test('help skips an unsafe attractive merge and picks a proven recoverable action', () => {
  const t = setup('merge-03');
  t.engine.solve = s => ({status: s.tiles.some(tile => tile.id === 'a') ? 'solved' : 'unsolvable'});
  t.start(); assert.equal(t.tutorial.help(), true);
  assert.deepEqual(t.shown[0].move, {sourceId: 'b', targetId: 'y'});
});

test('tap reminders persist by input mode; rejection and animation events never imply learned abilities', () => {
  const t = setup('merge-03'); t.start();
  t.tutorial.onInput({type: 'tap-without-drag', inputMode: 'pointer'});
  t.tutorial.onInput({type: 'tap-without-drag', inputMode: 'pointer'});
  t.tutorial.onInput({type: 'tap-without-drag', inputMode: 'keyboard'});
  assert.equal(t.messages.length, 2);
  t.tutorial.onCommitted({before: clone(t.state), move: {sourceId: 'a', targetId: 'x'},
    result: {ok: false, events: [{type: 'merge-deliver', sourceId: 'a', targetId: 'x'}]}});
  assert.deepEqual({...t.tutorial.capabilities}, {});
  t.tutorial.destroy();
  assert.equal(t.guide.destroyed, true);
  t.advance(60000);
  assert.equal(t.shown.length, 0);
  assert.equal(t.timers.size, 0);
});

function guideSetup({reduced = false, withAnimation = true} = {}) {
  const nodes = [], animations = [];
  const element = tag => {
    const node = {tag, children: [], style: {}, attributes: {}, setAttribute(k, v) { this.attributes[k] = v; },
      append(...children) { this.children.push(...children); }, remove() { this.removed = true; }};
    if (withAnimation) node.animate = (frames, options) => {
      const animation = {frames, options, cancelled: false, finished: new Promise(() => {}), cancel() { this.cancelled = true; }};
      animations.push(animation); return animation;
    };
    nodes.push(node); return node;
  };
  const board = element('board'); board.getBoundingClientRect = () => ({left: 30, top: 50, width: 400, height: 500});
  const state = {tiles: [{id: 'a', family: 'strawberry'}, {id: 'x'}]};
  const source = {left: 70, top: 100, width: 90, height: 90};
  const target = {left: 130, top: 150, width: 90, height: 90};
  const view = {state, tileBox: tile => tile.id === 'a' ? source : target,
    parkingBox: () => ({left: 300, top: 200, width: 90, height: 90})};
  const context = vm.createContext({document: {createElement: element, createElementNS: (_, tag) => element(tag)},
    TileMergeV03: {content: {getItemForTile: () => ({assetId: 'fruit'}), assetUrl: id => './assets/' + id + '.svg'}}});
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../web/merge-v03/guide-view.js'), 'utf8'), context);
  const guide = new context.TileMergeV03.GuideView({board, view, isReducedMotion: () => reduced});
  return {guide, board, state, nodes, animations};
}

test('guide uses a real content image, vector path and non-interactive local overlay without moving real tiles', () => {
  const t = guideSetup();
  const before = clone(t.state);
  assert.equal(t.guide.show({move: {sourceId: 'a', targetId: 'x'}, text: '拖过去'}), true);
  assert.deepEqual(t.state, before);
  assert.equal(t.guide.overlay.style.pointerEvents, 'none');
  assert.equal(t.guide.overlay.attributes['aria-hidden'], 'true');
  const actor = t.nodes.find(node => node.className === 'v04-guide-shadow');
  assert.equal(actor.style.left, '40px');
  assert.equal(actor.style.top, '50px');
  assert.equal(t.nodes.find(node => node.tag === 'img').src, './assets/fruit.svg');
  assert.equal(t.animations[0].options.duration, 1200);
  assert.match(t.animations[0].frames[2].transform, /60px,50px/);
  const overlay = t.guide.overlay;
  t.guide.hide();
  assert.equal(overlay.removed, true);
  assert.equal(t.animations[0].cancelled, true);
  assert.equal(t.guide.animations.size, 0);
});

test('reduced motion and missing animation APIs keep the static direction and parking endpoint', () => {
  for (const options of [{reduced: true}, {withAnimation: false}]) {
    const t = guideSetup(options);
    assert.equal(t.guide.show({move: {type: 'park', sourceId: 'a'}}), true);
    assert.equal(t.animations.length, 0);
    assert.equal(t.guide.overlay.attributes['data-guide-target'], '__parking__');
    assert.ok(t.nodes.some(node => node.tag === 'path' && node.attributes.d.includes('315')));
    const old = t.guide.overlay;
    t.guide.show({move: {sourceId: 'a', targetId: 'x'}});
    assert.equal(old.removed, true);
    t.guide.destroy();
    assert.equal(t.guide.show({move: {sourceId: 'a', targetId: 'x'}}), false);
  }
});
