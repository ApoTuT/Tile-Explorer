'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {dragPosition, snapRadius, nearestTarget, bindInput} = require('../web/merge-v03/input.js');
const E = require('../web/merge-v03/engine.js');
const levels = require('../web/merge-v03/levels.js');

const fixtures = [];
test.afterEach(() => { for (const fixture of fixtures.splice(0)) fixture.input.destroy(); });

test('grab offsets and CSS transforms preserve the same world-space endpoint', () => {
  for (const scale of [.56, .84, 1.6]) {
    const point = {x: 30 + (105 + 20) * scale, y: 70 + (80 + 60) * scale};
    const result = dragPosition(point, {x: 20, y: 60}, {left: 30, top: 70, scale});
    assert.ok(Math.abs(result.x - 105) < 1e-9 && Math.abs(result.y - 80) < 1e-9);
  }
});

test('snap tolerance keeps a usable small-screen margin without reaching neighboring cards', () => {
  assert.equal(snapRadius(.5), 40);
  assert.equal(snapRadius(.3), 42);
  assert.equal(snapRadius(1), 28);
  assert.equal(snapRadius(2), 28);
  const target = {id: 'target', x: 100, y: 100}, neighbor = {id: 'neighbor', x: 206, y: 100};
  assert.equal(nearestTarget({x: 128, y: 100}, [target]), target);
  assert.equal(nearestTarget({x: 128.01, y: 100}, [target]), null);
  assert.equal(nearestTarget({x: 153, y: 100}, [target, neighbor], 42), null);
  assert.equal(nearestTarget({x: 165, y: 100}, [target, neighbor], 42), neighbor);
});

function classes() {
  const values = new Set();
  return {add: value => values.add(value), remove: value => values.delete(value), contains: value => values.has(value)};
}

function eventSurface() {
  const handlers = new Map();
  return {handlers, classList: classes(),
    addEventListener(name, listener) { if (!handlers.has(name)) handlers.set(name, new Set()); handlers.get(name).add(listener); },
    removeEventListener(name, listener) { handlers.get(name)?.delete(listener); },
    dispatch(name, event) { for (const listener of [...(handlers.get(name) || [])]) listener(event); },
    count() { return [...handlers.values()].reduce((sum, listeners) => sum + listeners.size, 0); }
  };
}

function setup({initial = E.createState(levels[0]), sourceId = 'u1', withNest = false,
  scale = 1, reduced = false, animatedReturn = true, onGestureStart} = {}) {
  const board = eventSurface(), doc = eventSurface();
  const commits = [], messages = [], marks = [], rejections = [], frames = new Map(), ghosts = [], animations = [];
  let state = initial, frameId = 0, transformReads = 0, captured = false, removed = 0, gestureStarts = 0;
  const sourcePosition = () => state.nestId === sourceId ? state.nestSlot : state.tiles.find(tile => tile.id === sourceId);
  const sourceBox = () => ({left: sourcePosition().x * scale, top: sourcePosition().y * scale, width: 100 * scale, height: 100 * scale});
  const node = {dataset: {tileId: sourceId}, classList: classes(), closest() { return this; },
    getBoundingClientRect: sourceBox, setPointerCapture() { captured = true; }, hasPointerCapture: () => captured,
    releasePointerCapture() { captured = false; }, cloneNode() {
      const ghost = {style: {}, removeAttribute() {}, setAttribute() {}, removed: false,
        remove() { if (!this.removed) { this.removed = true; removed++; } }};
      if (animatedReturn) ghost.animate = (keyframes, options) => {
        let finish, reject;
        const animation = {keyframes, options, cancelled: false,
          finished: new Promise((resolve, fail) => { finish = resolve; reject = fail; }),
          finish() { finish(); }, cancel() { this.cancelled = true; reject(new Error('cancelled')); }};
        animations.push(animation); return animation;
      };
      ghosts.push(ghost); return ghost;
    }};
  doc.body = {append() {}}; board.ownerDocument = doc;
  global.requestAnimationFrame = callback => { const id = ++frameId; frames.set(id, callback); return id; };
  global.cancelAnimationFrame = id => frames.delete(id);
  global.matchMedia = () => ({matches: reduced});
  const view = {transform() { transformReads++; return {left: 0, top: 0, scale}; }, clearTargets() {},
    markTargets: (id, check) => marks.push({id, check}), reject: (id, blockers) => rejections.push({id, blockers})};
  if (withNest) view.dropTargets = current => [...current.tiles.filter(tile => tile.z === 0),
    {id: '__nest__', type: 'park', ...current.nestSlot}];
  const before = E.clone(state);
  const input = bindInput({board, view, getState: () => state, commit: (move, from) => commits.push({move, from}),
    message: text => messages.push(text), unlock() {}, isBusy: () => false,
    onGestureStart() { gestureStarts++; onGestureStart?.({captured}); }});
  let pointer = {clientX: sourceBox().left + 20 * scale, clientY: sourceBox().top + 20 * scale};
  function fire(name, extra = {}) {
    const event = {type: name, pointerId: 1, isPrimary: true, button: 0, target: node, ...pointer, ...extra};
    if (name.startsWith('pointer') && event.pointerId === 1) pointer = {clientX: event.clientX, clientY: event.clientY};
    board.dispatch(name, event);
  }
  function frame() { const pending = [...frames.values()]; frames.clear(); for (const callback of pending) callback(); }
  const fixture = {fire, frame, input, board, doc, node, frames, ghosts, animations, commits, messages, marks, rejections,
    before, get state() { return state; }, setState(next) { state = next; },
    transformReads: () => transformReads, removed: () => removed, gestureStarts: () => gestureStarts,
    moveTo(tile) { fire('pointermove', {clientX: (tile.x + 20) * scale, clientY: (tile.y + 20) * scale}); }};
  fixtures.push(fixture); return fixture;
}

const moves = fixture => fixture.commits.map(item => item.move);

test('tap and sub-threshold hand jitter never submit or create a ghost', () => {
  const f = setup(); f.fire('pointerdown'); f.fire('pointermove', {clientX: 64}); f.fire('pointerup');
  assert.equal(f.commits.length, 0); assert.equal(f.ghosts.length, 0); assert.deepEqual(f.state, f.before);
});

test('eligible gesture start interrupts presentation before capture; lower cards do not trigger it', () => {
  const starts = [], f = setup({onGestureStart: info => starts.push(info)});
  f.fire('pointerdown');
  assert.deepEqual(starts, [{captured: false}]);
  assert.equal(f.gestureStarts(), 1);
  const lower = setup({sourceId: 'l1'});
  lower.fire('pointerdown'); lower.fire('pointerup');
  assert.equal(lower.gestureStarts(), 0); assert.equal(lower.commits.length, 0);
});

test('many pointer updates share one animation frame and use compositor transforms', () => {
  const f = setup(); f.fire('pointerdown');
  for (let i = 0; i < 30; i++) f.fire('pointermove', {clientX: 120 + i / 10, clientY: 100});
  assert.equal(f.frames.size, 1); assert.equal(f.marks.length, 0); assert.equal(f.transformReads(), 1);
  f.frame();
  assert.equal(f.ghosts[0].style.left, '0px'); assert.equal(f.ghosts[0].style.top, '0px');
  assert.match(f.ghosts[0].style.transform, /^translate3d\(/);
  assert.equal(f.marks.length, 1);
  f.fire('pointermove', {clientX: 125, clientY: 100}); f.frame();
  assert.equal(f.marks.length, 1, 'same eligible target is not repeatedly reset');
  assert.deepEqual(f.state, f.before);
});

test('release before a queued frame commits once using the release position', () => {
  const f = setup(); f.fire('pointerdown'); f.fire('pointermove', {clientX: 300, clientY: 300});
  f.fire('pointerup', {clientX: 125, clientY: 100}); f.fire('pointerup');
  assert.deepEqual(moves(f), [{sourceId: 'u1', targetId: 'l1', revision: 0}]);
  assert.deepEqual(f.commits[0].from, {left: 105, top: 80, width: 100, height: 100});
  assert.equal(f.frames.size, 1, 'only the handoff cleanup remains queued');
  assert.equal(f.node.classList.contains('lifted'), true);
  f.frame();
  assert.equal(f.removed(), 1); assert.equal(f.node.classList.contains('lifted'), false);
});

test('release away from the last highlighted target returns rather than merging', async () => {
  const f = setup(); f.fire('pointerdown'); f.moveTo({x: 105, y: 80}); f.frame();
  assert.equal(f.marks.at(-1).id, 'l1');
  f.fire('pointerup', {clientX: 300, clientY: 300});
  assert.equal(f.commits.length, 0); assert.equal(f.animations.length, 1);
  assert.equal(f.animations[0].options.duration, 150); assert.equal(f.node.classList.contains('lifted'), true);
  f.animations[0].finish(); await Promise.resolve();
  assert.equal(f.removed(), 1); assert.equal(f.node.classList.contains('lifted'), false);
  assert.deepEqual(f.state, f.before);
});

test('a quick release without a delivered pointermove still respects drag threshold and the endpoint', () => {
  const f = setup(); f.fire('pointerdown'); f.fire('pointerup', {clientX: 125, clientY: 100});
  assert.deepEqual(moves(f), [{sourceId: 'u1', targetId: 'l1', revision: 0}]);
});

test('small-screen edge drops get a CSS-sized tolerance while unrelated blank space stays invalid', () => {
  const f = setup({scale: .5}); f.fire('pointerdown');
  f.fire('pointerup', {clientX: (105 + 20 + 36) * .5, clientY: (80 + 20) * .5});
  assert.equal(f.commits.length, 1, '18px margin is still within the 20px small-screen allowance');
  const outside = setup({scale: .5}); outside.fire('pointerdown');
  outside.fire('pointerup', {clientX: (105 + 20 + 43) * .5, clientY: (80 + 20) * .5});
  assert.equal(outside.commits.length, 0);
});

test('new gestures interrupt a return preview immediately instead of blocking input', () => {
  const f = setup(); f.fire('pointerdown'); f.fire('pointerup', {clientX: 300, clientY: 300});
  assert.equal(f.animations.length, 1);
  f.fire('pointerdown', {clientX: 60, clientY: 60});
  assert.equal(f.animations[0].cancelled, true); assert.equal(f.removed(), 1);
  f.fire('pointerup', {clientX: 125, clientY: 100});
  assert.equal(f.commits.length, 1);
});

test('reduced motion and missing animation APIs return immediately without changing material', () => {
  for (const options of [{reduced: true}, {animatedReturn: false}]) {
    const f = setup(options); f.fire('pointerdown'); f.fire('pointerup', {clientX: 300, clientY: 300});
    assert.equal(f.commits.length, 0); assert.equal(f.animations.length, 0); assert.equal(f.removed(), 1);
    assert.deepEqual(f.state, f.before);
  }
});

test('cancel, lost capture, second touch and external cancellation remove queued previews immediately', () => {
  for (const action of ['pointercancel', 'lostpointercapture', 'second', 'external']) {
    const f = setup(); f.fire('pointerdown'); f.moveTo({x: 105, y: 80});
    if (action === 'second') f.doc.dispatch('pointerdown', {pointerId: 2});
    else if (action === 'external') f.input.cancel();
    else f.fire(action);
    f.fire('pointerup'); f.frame();
    assert.equal(f.commits.length, 0); assert.equal(f.frames.size, 0); assert.equal(f.removed(), 1);
    assert.equal(f.animations.length, 0); assert.deepEqual(f.state, f.before);
  }
});

test('unrelated pointer cancellation and an old capture target cannot clear the active gesture', () => {
  const f = setup(); f.fire('pointerdown'); f.moveTo({x: 105, y: 80});
  f.fire('pointercancel', {pointerId: 2});
  f.fire('lostpointercapture', {target: {closest() {}}, pointerId: 1});
  f.fire('pointerup');
  assert.equal(f.commits.length, 1);
});

test('destroy removes every board and document listener and cancels frames and return animations', () => {
  const f = setup(); f.fire('pointerdown'); f.fire('pointerup', {clientX: 300, clientY: 300});
  assert.ok(f.board.count() > 0); assert.equal(f.doc.count(), 1);
  f.input.destroy(); f.input.destroy();
  assert.equal(f.board.count(), 0); assert.equal(f.doc.count(), 0); assert.equal(f.frames.size, 0);
  assert.equal(f.animations[0].cancelled, true); assert.equal(f.removed(), 1);
  f.fire('pointerdown', {clientX: 60, clientY: 60}); f.fire('pointerup', {clientX: 125, clientY: 100});
  assert.equal(f.commits.length, 0);
});

test('a physical nest drop previews without changing blockers and commits exactly once', () => {
  const f = setup({withNest: true}), nest = f.state.nestSlot;
  f.fire('pointerdown'); f.moveTo(nest); f.frame();
  assert.deepEqual(f.state, f.before); assert.equal(f.commits.length, 0);
  assert.equal(f.marks.at(-1).id, '__nest__'); assert.equal(f.marks.at(-1).check.ok, true);
  f.fire('pointerup'); f.fire('pointerup');
  assert.deepEqual(moves(f), [{type: 'park', sourceId: 'u1', revision: 0}]);
});

test('an occupied nest returns a second puppy without changing material or submitting input', () => {
  const parked = E.applyMove(E.createState(levels[1]), {type: 'park', sourceId: 'u1'}).state;
  const f = setup({initial: parked, sourceId: 'u2', withNest: true});
  f.fire('pointerdown'); f.moveTo(parked.nestSlot); f.frame(); f.fire('pointerup');
  assert.equal(f.marks.at(-1).check.ok, false); assert.equal(f.commits.length, 0);
  assert.ok(f.messages.at(-1).includes('只能放一张')); assert.equal(f.rejections.at(-1).id, '__nest__');
  assert.equal(f.animations.length, 1); assert.deepEqual(f.state, f.before);
});

test('a puppy dragged from its physical nest position reaches the correct lower target', () => {
  const parked = E.applyMove(E.createState(levels[1]), {type: 'park', sourceId: 'u1'}).state;
  const state = E.applyMove(parked, {sourceId: 'u2', targetId: 'l0'}).state;
  const target = state.tiles.find(tile => tile.id === 'l1'), f = setup({initial: state, sourceId: 'u1', withNest: true});
  f.fire('pointerdown'); f.moveTo(target); f.fire('pointerup');
  assert.deepEqual(moves(f), [{sourceId: 'u1', targetId: 'l1', revision: state.revision}]);
  assert.equal(f.commits[0].from.left, target.x); assert.equal(f.commits[0].from.top, target.y);
  assert.deepEqual(f.state, f.before);
});

test('nest eligibility and revision are rechecked at release rather than trusting the highlight', () => {
  const initial = E.createState(levels[2]), f = setup({initial, sourceId: 'u1', withNest: true});
  f.fire('pointerdown'); f.moveTo(initial.nestSlot); f.frame();
  assert.equal(f.marks.at(-1).check.ok, true);
  const occupied = E.applyMove(initial, {type: 'park', sourceId: 'u2'}).state;
  f.setState(occupied); f.fire('pointerup');
  assert.equal(f.commits.length, 0); assert.deepEqual(f.state, occupied);
  assert.ok(f.messages.at(-1).includes('只能放一张'));
});

test('a still-valid endpoint cannot submit a stale gesture after another transaction', () => {
  const state = E.createState(levels[2]), f = setup({initial: state, sourceId: 'u1'});
  const target = state.tiles.find(tile => tile.id === 'l0');
  f.fire('pointerdown'); f.moveTo(target); f.frame();
  f.setState({...E.clone(state), revision: 1}); f.fire('pointerup');
  assert.equal(f.commits.length, 0); assert.ok(f.messages.at(-1).includes('更新'));
});
