'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../web/slide-v05/engine.js');
const G = require('../web/slide-v05/grid.js');
const C = require('../web/shared/merge-content.js');
const levels = require('../web/slide-v05/levels.js');
const slide = (tileId, direction) => ({type: 'slide', tileId, direction});

test('integer grid has no wraparound, diagonal or coordinate ambiguity', () => {
  const board = {rows: 2, cols: 3};
  assert.equal(G.index(board, 1, 2), 5);
  assert.deepEqual(G.position(board, 5), {row: 1, col: 2});
  assert.equal(G.index(board, 0.5, 1), -1);
  assert.equal(G.position(board, 6), null);
  assert.equal(G.neighbor(board, {row: 0, col: 2}, 'right'), null);
  assert.equal(G.neighbor(board, {row: 0, col: 2}, 'diagonal'), null);
  assert.deepEqual(G.neighbor(board, {row: 0, col: 2}, 'down'), {row: 1, col: 2});
});

test('one directional action travels across every empty cell to the edge and counts once', () => {
  const level = E.clone(levels[0]); level.rows = 3;
  const initial = E.createState(level), before = E.clone(initial);
  const result = E.applyAction(initial, slide('s1', 'down'));
  assert.equal(result.ok, true);
  assert.deepEqual(result.state.tiles.find(tile => tile.id === 's1'),
    {id: 's1', itemId: 'strawberry-small', row: 2, col: 0});
  assert.deepEqual(result.state.delivered, {'strawberry-large': 0});
  assert.equal(result.state.successfulMoves, 1);
  assert.equal(result.state.revision, 1);
  assert.equal(result.state.status, 'playing');
  assert.equal(result.events.length, 1);
  assert.equal(result.events[0].type, 'tile-moved');
  assert.deepEqual(result.events[0].from, {row: 0, col: 0});
  assert.deepEqual(result.events[0].to, {row: 2, col: 0});
  assert.deepEqual(result.events[0].path, [{row: 1, col: 0}, {row: 2, col: 0}]);
  assert.equal(result.events[0].distance, 2);
  assert.deepEqual(initial, before);
  assert.deepEqual(result.transaction.before, initial);
  assert.deepEqual(result.transaction.after, result.state);
  assert.deepEqual(result.transaction.action, slide('s1', 'down'));
});

test('adjacent matching tiles remain until a deliberate slide; the collision delivers exactly once', () => {
  const level = E.clone(levels[0]); level.tiles[1].col = 1;
  const adjacent = E.createState(level);
  assert.equal(adjacent.tiles.length, 2);
  assert.equal(adjacent.status, 'playing');
  const collision = E.applyAction(adjacent, {...slide('s1', 'right'), expectedRevision: 0});
  assert.equal(collision.state.status, 'won');
  assert.deepEqual(collision.state.tiles, []);
  assert.deepEqual(collision.state.delivered, {'strawberry-large': 1});
  assert.equal(collision.state.successfulMoves, 1);
  assert.deepEqual(collision.events.map(event => event.type), ['merged-and-delivered', 'level-completed']);
  const event = collision.events[0];
  assert.equal(event.sourceId, 's1');
  assert.equal(event.targetId, 's2');
  assert.equal(event.recipeId, 'strawberry-grow');
  assert.equal(event.resultId, 'strawberry-large');
  assert.equal(event.ordinalWithinResult, 1);
  assert.deepEqual(event.to, {row: 0, col: 1});
  assert.equal(E.applyAction(collision.state, slide('s1', 'right')).reason, 'finished');
  assert.deepEqual(collision.transaction.before, adjacent);
});

test('separate result counters and completion require every material to be consumed', () => {
  let state = E.createState(levels[2]);
  const events = [];
  for (const action of levels[2].referenceSolution) {
    const result = E.applyAction(state, action);
    assert.equal(result.ok, true);
    assert.equal(result.state.tiles.length, state.tiles.length - (result.events[0].type === 'merged-and-delivered' ? 2 : 0));
    assert.equal(new Set(result.state.tiles.map(tile => tile.row + ',' + tile.col)).size, result.state.tiles.length);
    state = result.state;
    events.push(...result.events);
  }
  assert.deepEqual(events.filter(event => event.type === 'merged-and-delivered').map(event => event.resultId),
    ['strawberry-large', 'sports-car', 'tree-grown']);
  assert.deepEqual(state.delivered, {'strawberry-large': 1, 'sports-car': 1, 'tree-grown': 1});
  assert.equal(E.totalGoals(state), 3);
  assert.equal(E.isWon(state), true);
  const extra = E.clone(state);
  extra.delivered['unrequested-result'] = 1;
  assert.equal(E.isWon(extra), false);
});

test('edge, different picture, malformed, missing and stale actions do not write history', () => {
  const state = E.createState(levels[1]), before = E.clone(state);
  for (const [action, reason] of [[slide('s1', 'up'), 'edge'], [slide('s1', 'right'), 'different'],
    [slide('missing', 'right'), 'missing'], [slide('s1', 'diagonal'), 'action'],
    [{type: 'swap', tileId: 's1', direction: 'right'}, 'action'], [null, 'action'],
    [{...slide('c1', 'down'), revision: 1}, 'stale'],
    [{...slide('c1', 'down'), expectedRevision: 1}, 'stale']]) {
    const result = E.applyAction(state, action);
    assert.equal(result.ok, false);
    assert.equal(result.reason, reason);
    assert.equal(result.state, state);
    assert.equal(result.transaction, undefined);
    assert.deepEqual(result.events, []);
  }
  assert.deepEqual(state, before);
});

test('full or missing goal rejects matching collision before consumption', () => {
  const state = E.createState(levels[0]);
  state.delivered['strawberry-large'] = 1;
  assert.equal(E.applyAction(state, slide('s1', 'right')).reason, 'goal-full');
  delete state.goals['strawberry-large'];
  assert.equal(E.inspectAction(state, slide('s1', 'right')).reason, 'goal-full');
  assert.equal(state.tiles.length, 2);
});

test('each listed action is legal and does not cross or push an occupied neighbor', () => {
  const state = E.createState(levels[2]);
  const legal = E.listLegalActions(state);
  assert.equal(legal.some(action => action.tileId === 's1' && action.direction === 'right'), false);
  assert.equal(legal.some(action => action.tileId === 't1' && action.direction === 'down'), true);
  assert.ok(legal.every(action => E.applyAction(state, action).ok));
});

test('three hundred legal back-and-forth actions replay without the old goal-based limit', () => {
  const actions = [];
  for (let n = 0; n < 150; n++) actions.push(slide('s1', 'down'), slide('s1', 'up'));
  const back = E.replay(levels[0], actions);
  assert.equal(back.state.successfulMoves, 300);
  assert.equal(back.history.length, 300);
  assert.equal(E.canonicalKey(back.state), E.canonicalKey(E.createState(levels[0])));
  const completed = E.replay(levels[0], [...actions, ...levels[0].referenceSolution]);
  assert.equal(completed.state.status, 'won');
  assert.equal(completed.state.successfulMoves, 301);
  assert.deepEqual(completed.history[300].before, back.state);
  assert.throws(() => E.replay(levels[0], [slide('s1', 'up')]), /Invalid replay at 0: edge/);
});

test('canonical states ignore interchangeable entity IDs, action count and revision, retaining rule counters', () => {
  const initial = E.createState(levels[0]), renamed = E.clone(initial);
  [renamed.tiles[0].id, renamed.tiles[1].id] = [renamed.tiles[1].id, renamed.tiles[0].id];
  renamed.successfulMoves = 500;
  renamed.revision = 900;
  assert.equal(E.canonicalKey(initial), E.canonicalKey(renamed));
  renamed.delivered['strawberry-large'] = 1;
  assert.notEqual(E.canonicalKey(initial), E.canonicalKey(renamed));
  renamed.delivered['strawberry-large'] = 0;
  renamed.goals['strawberry-large'] = 2;
  assert.notEqual(E.canonicalKey(initial), E.canonicalKey(renamed));
});

test('hash tracks exact material placement and registered recipes, excluding teaching and art', () => {
  const level = E.clone(levels[0]), hash = E.definitionHash(level);
  Object.assign(level, {title: 'another title', subtitle: 'different', tutorialId: 'changed', goalOrder: [...level.goalOrder].reverse()});
  level.referenceSolution = [...level.referenceSolution].reverse();
  assert.equal(E.definitionHash(level), hash);
  level.tiles[0].row = 1;
  assert.notEqual(E.definitionHash(level), hash);
  level.tiles[0].row = 0;
  const recipe = C.recipes['strawberry-grow'], original = recipe.resultId;
  try {
    recipe.resultId = 'tree-grown';
    assert.notEqual(E.definitionHash(level), hash);
  } finally { recipe.resultId = original; }
});

test('definition validation rejects duplicate IDs, cells, bounds, final and unknown items, and wrong amounts', () => {
  const mutations = [level => { level.tiles[1].id = 's1'; },
    level => { level.tiles[1].col = 0; }, level => { level.tiles[0].row = -1; },
    level => { level.tiles[0].row = 0.1; }, level => { level.tiles[0].itemId = 'strawberry-large'; },
    level => { level.tiles[0].itemId = 'unknown'; }, level => { level.goals['strawberry-large'] = 2; },
    level => { level.goals['strawberry-large'] = 0.5; }, level => { level.goalOrder = []; },
    level => { level.rows = 0; }, level => { level.ruleset = 'old'; },
    level => { level.rows = 1; level.cols = 2; level.tiles[1].col = 1; }];
  for (const mutate of mutations) {
    const level = E.clone(levels[0]);
    mutate(level);
    assert.equal(E.validateDefinition(level).ok, false);
    assert.throws(() => E.createState(level), /Invalid slide level/);
  }
});

test('reference routes must execute and finish through the production rules', () => {
  for (const level of levels) assert.deepEqual(E.validateDefinition(level), {ok: true, errors: []});
  const level = E.clone(levels[0]);
  level.referenceSolution = [slide('s1', 'up')];
  assert.equal(E.validateDefinition(level).ok, false);
  level.referenceSolution = [];
  assert.deepEqual(E.validateDefinition(level).errors, ['reference-incomplete']);
});

test('a same picture anywhere on the clear line is merged in one action with the full path', () => {
  const result = E.applyAction(E.createState(levels[0]), slide('s1', 'right'));
  assert.equal(result.state.status, 'won');
  assert.equal(result.state.successfulMoves, 1);
  assert.deepEqual(result.events[0].path, [{row: 0, col: 1}, {row: 0, col: 2}]);
  assert.equal(result.events[0].distance, 2);
});

test('different picture after empty cells stops the tile in front, without crossing or pushing', () => {
  const level = E.clone(levels[1]); level.rows = 3; level.cols = 5;
  Object.assign(level.tiles[0], {row: 0, col: 0}); Object.assign(level.tiles[1], {row: 0, col: 3});
  Object.assign(level.tiles[2], {row: 2, col: 4}); Object.assign(level.tiles[3], {row: 2, col: 3});
  const initial = E.createState(level), result = E.applyAction(initial, slide('s1', 'right'));
  assert.equal(result.ok, true);
  assert.deepEqual(result.events[0].to, {row: 0, col: 2});
  assert.equal(result.events[0].stoppedBy, 'tile'); assert.equal(result.events[0].blockerId, 'c1');
  assert.deepEqual(result.state.tiles.find(tile => tile.id === 'c1'), initial.tiles.find(tile => tile.id === 'c1'));
  assert.equal(E.applyAction(result.state, slide('s1', 'right')).reason, 'different');
});

test('a gesture merges only the first matching tile and never continues past the collision', () => {
  const level = E.clone(levels[0]); level.cols = 5; level.goals['strawberry-large'] = 2;
  level.tiles = [0,2,4,9].map((cell,index)=>({id:'s'+(index+1),itemId:'strawberry-small',row:Math.floor(cell/5),col:cell%5}));
  const result = E.applyAction(E.createState(level), slide('s1', 'right'));
  assert.equal(result.state.tiles.length, 2); assert.equal(result.state.delivered['strawberry-large'], 1);
  assert.deepEqual(result.state.tiles.map(tile=>tile.id), ['s3','s4']);
  assert.equal(result.events.length, 1); assert.equal(result.state.successfulMoves, 1);
});
