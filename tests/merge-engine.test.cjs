'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../web/merge-v03/engine.js');
const C = require('../web/merge-v03/content.js');
const levels = require('../web/merge-v03/levels.js');

test('a real pair atomically consumes two materials and delivers its registered final item', () => {
  const initial = E.createState(levels[0]), frozen = JSON.stringify(initial);
  assert.deepEqual(initial.delivered, {'strawberry-large': 0});
  const result = E.applyMove(initial, levels[0].solution[0]);
  assert.equal(result.ok, true);
  assert.equal(result.state.status, 'won');
  assert.deepEqual(result.state.tiles, []);
  assert.deepEqual(result.state.delivered, {'strawberry-large': 1});
  assert.equal(result.state.successfulMoves, 1);
  assert.deepEqual(result.events, [{type: 'merge-deliver', sourceId: 'u1', targetId: 'l1',
    recipeId: 'strawberry-grow', sourceItemId: 'strawberry-small', resultId: 'strawberry-large',
    ordinalWithinResult: 1, x: 105, y: 80, revision: 1}]);
  assert.equal(JSON.stringify(initial), frozen);
  assert.deepEqual(E.undo(result.state, result.transaction), initial);
});

test('fully aligned pairs immediately settle and cannot ship as stable starting arrangements', () => {
  const level = E.clone(levels[0]);
  Object.assign(level.tiles[0], {x: level.tiles[1].x, y: level.tiles[1].y});
  assert.equal(E.createState(level).status, 'won');
  assert.ok(E.validateLevel(level).errors.includes('unstable-initial-state'));
});

test('stable settlement processes every aligned pair with separate result counters and events', () => {
  const state = E.createState(levels[1]);
  for (const [upper, lower] of [['u1', 'l1'], ['u2', 'l0']]) {
    const target = state.tiles.find(tile => tile.id === lower);
    Object.assign(state.tiles.find(tile => tile.id === upper), {x: target.x, y: target.y});
  }
  const settled = E.settle(state);
  assert.deepEqual(settled.state.delivered, {'strawberry-large': 1, 'sports-car': 1});
  assert.equal(settled.events.length, 2);
  assert.deepEqual(settled.events.map(event => event.resultId).sort(), ['sports-car', 'strawberry-large']);
  assert.ok(settled.events.every(event => event.ordinalWithinResult === 1));
  assert.equal(E.evaluate(settled.state), 'won');
  assert.equal(state.tiles.length, 4);
});

test('cross-kind blockers forbid pairing even when both matching pictures are recognizable', () => {
  const state = E.createState(levels[1]);
  assert.deepEqual(E.getBlockers(state, 'l1'), ['u1', 'u2']);
  assert.deepEqual(E.canMerge(state, 'u1', 'l1'), {ok: false, reason: 'target-blocked', blockers: ['u2']});
  assert.equal(E.applyMove(state, {sourceId: 'u1', targetId: 'l1'}).state, state);
  const parked = E.applyMove(state, {type: 'park', sourceId: 'u1'}).state;
  assert.equal(E.canMerge(parked, 'u2', 'l0').ok, true);
  assert.equal(E.canMerge(parked, 'u2', 'l1').reason, 'recipe');
});

test('wrong layers, family, stage, missing IDs and unknown actions never consume materials', () => {
  const state = E.createState(levels[1]);
  for (const move of [{sourceId: 'u1', targetId: 'u2'}, {sourceId: 'l0', targetId: 'l1'},
    {sourceId: 'u1', targetId: 'blank'}, {sourceId: 'u1', targetId: 'u1'},
    {type: 'swap', sourceId: 'u1'}, null]) assert.equal(E.applyMove(state, move).state, state);
  assert.equal(E.canMerge(state, 'u1', 'l0').reason, 'recipe');
  const changed = E.clone(state);
  changed.tiles.find(tile => tile.id === 'l1').stage = 'final';
  assert.equal(E.canMerge(changed, 'u1', 'l1').reason, 'recipe');
  const won = E.replay(levels[0], levels[0].solution).state;
  assert.equal(E.applyMove(won, levels[0].solution[0]).reason, 'finished');
});

test('a full or unrequested goal rejects excess delivery before any material changes', () => {
  const state = E.createState(levels[0]);
  state.delivered['strawberry-large'] = 1;
  const before = E.clone(state);
  assert.equal(E.applyMove(state, levels[0].solution[0]).reason, 'goal-full');
  assert.deepEqual(state, before);
  delete state.goals['strawberry-large'];
  assert.equal(E.canMerge(state, 'u1', 'l1').reason, 'goal-full');
});

test('per-result ordinals and total goal counts are independent of goal display order', () => {
  let state = E.createState(levels[2]);
  const events = [];
  for (const move of levels[2].solution) {
    const result = E.applyMove(state, move);
    assert.equal(result.ok, true);
    state = result.state;
    events.push(...result.events.filter(event => event.type === 'merge-deliver'));
  }
  assert.equal(E.totalGoals(state), 4);
  assert.equal(E.totalGoals(state.goals), 4);
  assert.equal(events[0].resultId, 'tree-grown');
  assert.deepEqual(events.filter(event => event.resultId === 'strawberry-large').map(event => event.ordinalWithinResult), [1, 2]);
  assert.deepEqual(state.delivered, {'strawberry-large': 2, 'sports-car': 1, 'tree-grown': 1});
  assert.equal(state.status, 'won');
});

test('revision and consumed-ID checks prevent duplicate transaction delivery', () => {
  const initial = E.createState(levels[1]), move = {...levels[1].solution[0], revision: 0};
  const parked = E.applyMove(initial, move).state;
  assert.equal(E.applyMove(parked, move).reason, 'stale');
  assert.equal(E.applyMove(parked, levels[1].solution[0]).ok, false);
  const merged = E.applyMove(parked, {sourceId: 'u2', targetId: 'l0'}).state;
  assert.equal(E.applyMove(merged, {sourceId: 'u2', targetId: 'l0'}).ok, false);
  assert.deepEqual(merged.delivered, {'strawberry-large': 0, 'sports-car': 1});
});

test('parking frees only the parked material blockers and fully preserves its identity and origin', () => {
  const initial = E.createState(levels[1]), result = E.applyMove(initial, {type: 'park', sourceId: 'u1'});
  assert.equal(result.ok, true);
  assert.equal(result.state.parkingId, 'u1');
  assert.deepEqual(result.state.tiles, initial.tiles);
  assert.deepEqual(result.state.delivered, initial.delivered);
  assert.equal(result.state.successfulMoves, 1);
  assert.deepEqual(result.events, [{type: 'park', sourceId: 'u1', sourceItemId: 'strawberry-small', x: 230, y: 160}]);
  assert.deepEqual(E.getBlockers(result.state, 'l1'), ['u2']);
  assert.deepEqual(E.getBlockers(result.state, 'u1'), []);
  assert.deepEqual(E.undo(result.state, result.transaction), initial);
});

test('a single parking slot rejects lower material, invalid IDs, repeat parking and another occupant', () => {
  const state = E.createState(levels[1]);
  for (const id of ['l0', 'l1', 'missing']) assert.equal(E.applyMove(state, {type: 'park', sourceId: id}).state, state);
  const parked = E.applyMove(state, {type: 'park', sourceId: 'u1'}).state;
  for (const id of ['u1', 'u2']) {
    assert.equal(E.canPark(parked, id).reason, 'parking-full');
    assert.equal(E.applyMove(parked, {type: 'park', sourceId: id}).state, parked);
  }
  assert.equal(E.listLegalMoves(parked).some(move => move.type === 'park'), false);
});

test('either lesson-two borrowing route can retrieve its original material and undo every transaction', () => {
  const routes = [levels[1].solution, [{type: 'park', sourceId: 'u2'},
    {sourceId: 'u1', targetId: 'l1'}, {sourceId: 'u2', targetId: 'l0'}]];
  for (const moves of routes) {
    const replay = E.replay(levels[1], moves);
    assert.equal(replay.state.status, 'won');
    assert.equal(replay.state.parkingId, null);
    let state = replay.state;
    for (const transaction of [...replay.transactions].reverse()) state = E.undo(state, transaction);
    assert.deepEqual(state, E.createState(levels[1]));
    assert.throws(() => E.undo(replay.state, replay.transactions[0]), /Stale/);
  }
});

test('the mixed four-card remainder can be cleared on the board without undo or restart', () => {
  let state = E.replay(levels[2], levels[2].solution.slice(0, 2)).state;
  assert.equal(E.listMergeMoves(state).length, 0);
  assert.equal(state.status, 'playing');
  assert.equal(E.solve(state).status, 'solved');
  for (const move of levels[2].solution.slice(2)) {
    const result = E.applyMove(state, move);
    assert.equal(result.ok, true);
    state = result.state;
  }
  assert.equal(state.status, 'won');
  assert.equal(state.successfulMoves, 5);
});

test('gameplay hash ignores editorial fields and order but follows recipe and legal geometry', () => {
  const original = E.definitionHash(levels[1]), edited = E.clone(levels[1]);
  edited.title = '另一个标题'; edited.subtitle = '另一种说明'; edited.solution = [];
  edited.goalOrder.reverse(); edited.tiles.reverse();
  edited.goals = {'sports-car': 1, 'strawberry-large': 1};
  assert.equal(E.definitionHash(edited), original);
  edited.tiles[0].x++;
  assert.notEqual(E.definitionHash(edited), original);
  const recipe = C.recipes['car-upgrade'];
  const oldId = recipe.resultId;
  try {
    recipe.resultId = 'other-final';
    assert.notEqual(E.definitionHash(levels[1]), original);
  } finally { recipe.resultId = oldId; }
  const oldAsset = C.assetPaths['car-small'];
  try {
    C.assetPaths['car-small'] = 'assets/new/car.svg';
    assert.equal(E.definitionHash(levels[1]), original);
  } finally { C.assetPaths['car-small'] = oldAsset; }
});

test('solver keys include the complete result mapping and parking identity', () => {
  const state = E.createState(levels[2]), changed = E.clone(state), ordered = E.clone(state);
  changed.delivered['sports-car'] = 1;
  assert.notEqual(E.stateKey(changed), E.stateKey(state));
  changed.delivered['sports-car'] = 0; changed.parkingId = 'u1';
  assert.notEqual(E.stateKey(changed), E.stateKey(state));
  ordered.tiles.reverse(); ordered.delivered = {'tree-grown': 0, 'sports-car': 0, 'strawberry-large': 0};
  assert.equal(E.stateKey(ordered), E.stateKey(state));
});

test('solver budget exhaustion is unverified and replay bounds use all requested results', () => {
  assert.equal(E.solve(E.createState(levels[2]), {maxStates: 1}).status, 'unverified');
  assert.equal(E.replay(levels[2], levels[2].solution).state.status, 'won');
  assert.throws(() => E.replay(levels[0], Array.from({length: 3}, () => ({type: 'park', sourceId: 'u1'}))), /length/);
});
