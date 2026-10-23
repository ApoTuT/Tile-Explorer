'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const E = require('../web/slide-v05/engine.js');
const levels = require('../web/slide-v05/levels.js');
const clone = value => JSON.parse(JSON.stringify(value));
const flush = async () => { await Promise.resolve(); await Promise.resolve(); };

function setup(index = 0, saved = null) {
  let state = E.createState(levels[index]), token = 1, revision = 0, now = 0, next = 0;
  let hintProvider = async current => ({status: 'solved', action: E.listLegalActions(current)[0]});
  const timers = new Map(), shown = [], messages = [], writes = [];
  const store = {read: () => saved, write(key, value) { writes.push({key, value: clone(value)}); }};
  const context = vm.createContext({AbortController, TileSlideV05: {engine: E},
    setTimeout(callback, delay) { const id = ++next; timers.set(id, {callback, at: now + delay}); return id; },
    clearTimeout(id) { timers.delete(id); }});
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../web/slide-v05/tutorial.js'), 'utf8'), context);
  const tutorial = new context.TileSlideV05.TutorialController({store,
    getState: () => state, getLevel: () => levels[index],
    getStamp: () => ({levelId: state.levelId, definitionHash: state.definitionHash, revision, runToken: token}),
    show: guide => shown.push(clone(guide)), clear: () => {}, message: text => messages.push(text),
    findHint: (...args) => hintProvider(...args)});
  function advance(ms) {
    const end = now + ms;
    for (;;) {
      const entry = [...timers].sort((a, b) => a[1].at - b[1].at || a[0] - b[0])[0];
      if (!entry || entry[1].at > end) break;
      now = entry[1].at;
      timers.delete(entry[0]);
      entry[1].callback();
    }
    now = end;
  }
  function commit(action) {
    const result = E.applyAction(state, action);
    assert.equal(result.ok, true);
    state = result.state; revision++;
    tutorial.onAction(result);
    return result;
  }
  return {tutorial, shown, messages, writes, timers, advance, commit,
    state: () => state, start: () => tutorial.start(levels[index]),
    setHint(fn) { hintProvider = fn; }, newRun() { token++; }, changeRevision() { revision++; },
    undo(result) { state = clone(result.transaction.before); revision++; tutorial.resume(); }};
}

test('first lesson is read-only, yields to input, then learns only real committed moves and merges', async () => {
  const t = setup(); t.setHint(async () => ({status: 'solved', action: levels[0].referenceSolution[0]})); t.start();
  const initial = clone(t.state());
  t.advance(600); await flush();
  assert.equal(t.shown.length, 1);
  assert.equal(t.shown[0].kind, 'merge');
  assert.deepEqual(t.state(), initial);
  assert.deepEqual({...t.tutorial.capabilities}, {});
  t.tutorial.onInput({type: 'gesture-start'});
  t.advance(60000); await flush();
  assert.equal(t.shown.length, 1);
  t.commit(levels[0].referenceSolution[0]);
  assert.equal(t.tutorial.capabilities.slideToEnd, true);
  assert.equal(t.tutorial.capabilities.slideEmpty, undefined);
  assert.equal(t.tutorial.capabilities.mergePair, true);
  assert.equal(t.state().status, 'won');
  assert.equal(t.writes.length, 1);
  t.advance(60000); await flush();
  assert.equal(t.shown.length, 1);
});

test('second lesson records making room only after a real move is followed by a committed merge', () => {
  const t = setup(1); t.start();
  t.commit(levels[1].referenceSolution[0]);
  assert.equal(t.tutorial.capabilities.makeRoom, undefined);
  t.commit({type: 'slide', tileId: 'c2', direction: 'right'});
  assert.equal(t.tutorial.capabilities.makeRoom, true);
});

test('third level never provides automatic steps, including repeated failures, but explicit help works', async () => {
  const t = setup(2); t.start();
  t.advance(60000); await flush();
  t.tutorial.onInput({type: 'rejected'}); t.tutorial.onInput({type: 'rejected'});
  t.advance(60000); await flush();
  assert.equal(t.shown.length, 0);
  const before = clone(t.state());
  assert.equal(await t.tutorial.requestHint(), true);
  assert.equal(t.shown.length, 1);
  assert.deepEqual(t.state(), before);
  assert.deepEqual({...t.tutorial.capabilities}, {});
});

test('automatic guide rounds stay capped; explicit replay does not reset the board or learned abilities', async () => {
  const t = setup(); t.start();
  t.advance(600); await flush();
  t.advance(1200 + 4200); await flush();
  assert.equal(t.shown.length, 2);
  for (let index = 0; index < 5; index++) {
    t.tutorial.resume(); t.advance(10000); await flush();
  }
  assert.equal(t.shown.length, 2);
  const initial = clone(t.state());
  assert.equal(await t.tutorial.replay(), true);
  assert.equal(t.shown.length, 3);
  assert.deepEqual(t.state(), initial);
  assert.deepEqual({...t.tutorial.capabilities}, {});
});

test('late async solver results are discarded after input, undo revision, restart token, and suspend', async () => {
  for (const cancel of [t => t.tutorial.onInput({type: 'gesture-start'}), t => t.changeRevision(),
    t => t.newRun(), t => t.tutorial.suspend(), t => t.tutorial.destroy()]) {
    const t = setup(2); t.start();
    let finish, options;
    t.setHint((_, opts) => { options = opts; return new Promise(resolve => { finish = resolve; }); });
    const pending = t.tutorial.requestHint();
    cancel(t);
    assert.equal(options.isCancelled(), true);
    finish({status: 'solved', action: E.listLegalActions(t.state())[0]});
    assert.equal(await pending, false);
    assert.equal(t.shown.length, 0);
  }
});

test('a newer hint request aborts an earlier request and only the latest result is displayed', async () => {
  const t = setup(2); t.start();
  const pending = [];
  t.setHint((_, options) => new Promise(resolve => pending.push({resolve, options})));
  const first = t.tutorial.requestHint();
  const second = t.tutorial.requestHint();
  assert.equal(pending[0].options.signal.aborted, true);
  const result = {status: 'solved', action: E.listLegalActions(t.state())[0]};
  pending[0].resolve(result); pending[1].resolve(result);
  assert.equal(await first, false);
  assert.equal(await second, true);
  assert.equal(t.shown.length, 1);
});

test('closing a normal dialog resumes the current unfinished lesson', async () => {
  const t = setup(); t.start();
  t.tutorial.suspend(); t.advance(10000); await flush();
  assert.equal(t.shown.length, 0);
  t.tutorial.resume(); t.advance(4200); await flush();
  assert.equal(t.shown.length, 1);
});

test('undo preserves learned skills, invalid rule records do not grant them', () => {
  const t = setup(); t.start();
  const result = t.commit(levels[0].referenceSolution[0]);
  t.undo(result);
  assert.equal(t.tutorial.capabilities.slideToEnd, true);
  const valid = setup(0, {ruleset: E.RULESET, capabilities: {slideEmpty: true, mergePair: true, makeRoom: 'true'}});
  valid.start();
  assert.deepEqual({...valid.tutorial.capabilities}, {slideEmpty: true, mergePair: true});
  assert.equal(valid.tutorial.stage(), null);
  const old = setup(0, {ruleset: 'merge-v04-1', capabilities: {slideEmpty: true}});
  old.start(); assert.equal(old.tutorial.stage(), 'mergePair');
});

test('budget-limited, unsolvable, rejected and thrown hints never invent a move', async () => {
  for (const response of [{status: 'unverified'}, {status: 'unsolvable'},
    {status: 'solved', action: {type: 'slide', tileId: 's1', direction: 'up'}}]) {
    const t = setup(2); t.start(); t.setHint(async () => response);
    assert.equal(await t.tutorial.requestHint(), false);
    assert.equal(t.shown.length, 0);
  }
  const t = setup(2); t.start(); t.setHint(async () => { throw new Error('search failed'); });
  assert.equal(await t.tutorial.requestHint(), false);
  assert.equal(t.shown.length, 0);
  assert.match(t.messages.at(-1), /暂时没找到/);
});

test('reduced-motion preference reaches the guide, and fake rejected events cannot teach', async () => {
  const t = setup(); t.start();
  t.tutorial.isReducedMotion = () => true;
  assert.equal(await t.tutorial.requestHint(), true);
  assert.equal(t.shown[0].reducedMotion, true);
  t.tutorial.onAction({ok: false, events: [{type: 'tile-moved'}, {type: 'merged-and-delivered'}]});
  assert.deepEqual({...t.tutorial.capabilities}, {});
  t.tutorial.destroy();
  t.advance(60000); await flush();
  assert.equal(t.timers.size, 0);
});
