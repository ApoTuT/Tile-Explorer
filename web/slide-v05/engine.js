/* Pure single-tile slide rules. Effects, storage and teaching cannot change facts. */
(function (root) {
  'use strict';
  const G = typeof module !== 'undefined' ? require('./grid.js') : root.TileSlideV05.grid;
  const C = typeof module !== 'undefined' ? require('../shared/merge-content.js') : root.TileMergeContent;
  const RULESET = 'slide-v05-1';
  const clone = value => JSON.parse(JSON.stringify(value));
  const record = value => value && typeof value === 'object' && !Array.isArray(value);
  const canonical = value => Array.isArray(value) ? value.map(canonical) : record(value) ?
    Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
  function recipeFor(itemId) {
    const item = C.items[itemId];
    if (!item || item.stage !== 'base') return null;
    const entry = Object.entries(C.recipes).find(([, recipe]) =>
      recipe.family === item.family && recipe.inputStage === item.stage && recipe.inputCount === 2);
    return entry ? {id: entry[0], ...entry[1]} : null;
  }
  function definitionHash(level) {
    const itemIds = [...new Set(level.tiles.map(tile => tile.itemId))].sort();
    const recipes = itemIds.map(itemId => {
      const recipe = recipeFor(itemId);
      return recipe ? [itemId, recipe.id, recipe.family, recipe.inputStage, recipe.inputCount, recipe.resultId] : [itemId, null];
    });
    const text = JSON.stringify(canonical({id: level.id, ruleset: level.ruleset, rows: level.rows, cols: level.cols,
      tiles: level.tiles.map(tile => [tile.id, tile.itemId, tile.row, tile.col]).sort((a, b) => a[0].localeCompare(b[0])),
      goals: level.goals, recipes}));
    let hash = 2166136261;
    for (let n = 0; n < text.length; n++) hash = Math.imul(hash ^ text.charCodeAt(n), 16777619);
    return (hash >>> 0).toString(16).padStart(8, '0');
  }
  function basicErrors(level) {
    if (!record(level) || typeof level.id !== 'string' || !level.id || level.ruleset !== RULESET ||
        !Number.isInteger(level.rows) || level.rows < 1 || !Number.isInteger(level.cols) || level.cols < 1 ||
        !Array.isArray(level.tiles) || !level.tiles.length || !record(level.goals) || !Object.keys(level.goals).length)
      return ['invalid-definition'];
    const errors = [], ids = new Set(), cells = new Set(), materials = {};
    if (level.tiles.length >= level.rows * level.cols) errors.push('no-empty-cell');
    for (const [id, count] of Object.entries(level.goals)) {
      if (C.items[id]?.stage !== 'final' || !Number.isInteger(count) || count < 1 ||
          !Object.values(C.recipes).some(recipe => recipe.resultId === id)) errors.push('invalid-goal:' + id);
    }
    if (!Array.isArray(level.goalOrder) || level.goalOrder.length !== Object.keys(level.goals).length ||
        new Set(level.goalOrder).size !== level.goalOrder.length ||
        level.goalOrder.some(id => !Object.hasOwn(level.goals, id))) errors.push('invalid-goal-order');
    for (const tile of level.tiles) {
      if (!record(tile) || typeof tile.id !== 'string' || !tile.id || ids.has(tile.id)) {
        errors.push('invalid-tile-id'); continue;
      }
      ids.add(tile.id);
      if (!G.inBounds(level, tile.row, tile.col)) errors.push('out-of-bounds:' + tile.id);
      const cell = tile.row + ',' + tile.col;
      if (cells.has(cell)) errors.push('occupied-cell:' + tile.id);
      cells.add(cell);
      const recipe = recipeFor(tile.itemId);
      if (!recipe) errors.push('invalid-base-item:' + tile.id);
      else materials[recipe.resultId] = (materials[recipe.resultId] || 0) + 1;
    }
    for (const id of new Set([...Object.keys(level.goals), ...Object.keys(materials)]))
      if (materials[id] !== level.goals[id] * 2) errors.push('materials:' + id);
    return errors;
  }
  function createState(level) {
    const errors = basicErrors(level);
    if (errors.length) throw new Error('Invalid slide level: ' + errors.join(', '));
    return {levelId: level.id, ruleset: RULESET, definitionHash: definitionHash(level), rows: level.rows, cols: level.cols,
      tiles: level.tiles.map(tile => ({id: tile.id, itemId: tile.itemId, row: tile.row, col: tile.col})),
      goals: clone(level.goals), goalOrder: [...level.goalOrder],
      delivered: Object.fromEntries(Object.keys(level.goals).map(id => [id, 0])),
      successfulMoves: 0, revision: 0, status: 'playing'};
  }
  const rejected = (reason, extra) => ({ok: false, kind: 'blocked', reason, ...extra});
  function inspectAction(state, action) {
    if (!record(action) || action.type !== 'slide' || typeof action.tileId !== 'string' ||
        !Object.hasOwn(G.directions, action.direction)) return rejected('action');
    if ((action.revision !== undefined && action.revision !== state.revision) ||
        (action.expectedRevision !== undefined && action.expectedRevision !== state.revision)) return rejected('stale');
    if (state.status !== 'playing') return rejected('finished');
    const source = state.tiles.find(tile => tile.id === action.tileId);
    if (!source) return rejected('missing');
    const from = {row: source.row, col: source.col}, to = G.neighbor(state, source, action.direction);
    const detail = {sourceId: source.id, sourceItemId: source.itemId, from, to};
    if (!to) return rejected('edge', detail);
    const target = G.tileAt(state, to.row, to.col);
    if (!target) return {ok: true, kind: 'move', ...detail};
    if (target.itemId !== source.itemId) return rejected('different', {...detail, targetId: target.id});
    const recipe = recipeFor(source.itemId);
    if (!recipe) return rejected('recipe', detail);
    if (!Object.hasOwn(state.goals, recipe.resultId) || !Number.isInteger(state.delivered[recipe.resultId]) ||
        state.delivered[recipe.resultId] >= state.goals[recipe.resultId]) return rejected('goal-full', detail);
    return {ok: true, kind: 'merge', ...detail, targetId: target.id, recipeId: recipe.id, resultId: recipe.resultId};
  }
  function isWon(state) {
    return !state.tiles.length && Object.keys(state.goals).every(id => state.delivered[id] === state.goals[id]) &&
      Object.keys(state.delivered).every(id => Object.hasOwn(state.goals, id));
  }
  function listLegalActions(state) {
    if (state.status !== 'playing') return [];
    const actions = [];
    for (const tile of state.tiles) for (const direction of Object.keys(G.directions)) {
      const action = {type: 'slide', tileId: tile.id, direction};
      if (inspectAction(state, action).ok) actions.push(action);
    }
    return actions;
  }
  function applyAction(input, intent) {
    const check = inspectAction(input, intent);
    if (!check.ok) return {...check, state: input, events: []};
    const action = {type: 'slide', tileId: intent.tileId, direction: intent.direction};
    const state = clone(input), events = [];
    state.successfulMoves++;
    state.revision++;
    if (check.kind === 'move') {
      const source = state.tiles.find(tile => tile.id === action.tileId);
      Object.assign(source, check.to);
      events.push({type: 'tile-moved', ...check, revision: state.revision});
    } else {
      state.tiles = state.tiles.filter(tile => tile.id !== check.sourceId && tile.id !== check.targetId);
      state.delivered[check.resultId]++;
      events.push({type: 'merged-and-delivered', ...check, ordinalWithinResult: state.delivered[check.resultId], revision: state.revision});
    }
    state.status = isWon(state) ? 'won' : 'playing';
    if (state.status === 'won') events.push({type: 'level-completed', levelId: state.levelId, revision: state.revision});
    const transaction = {action, before: clone(input), after: clone(state), events: clone(events)};
    return {ok: true, state, events, transaction};
  }
  function replay(level, actions) {
    if (!Array.isArray(actions)) throw new Error('Invalid replay actions');
    let state = createState(level);
    const history = [], events = [];
    for (let index = 0; index < actions.length; index++) {
      const result = applyAction(state, actions[index]);
      if (!result.ok) throw new Error('Invalid replay at ' + index + ': ' + result.reason);
      state = result.state;
      history.push(result.transaction);
      events.push(...result.events);
    }
    return {state, history, transactions: history, events};
  }
  function canonicalKey(state) {
    const cells = Array(state.rows * state.cols).fill('');
    for (const tile of state.tiles) cells[G.index(state, tile.row, tile.col)] = tile.itemId;
    return JSON.stringify([state.ruleset, state.definitionHash, state.rows, state.cols, cells,
      Object.keys(state.goals).sort().map(id => [id, state.goals[id]]),
      Object.keys(state.delivered).sort().map(id => [id, state.delivered[id]])]);
  }
  function validateDefinition(level) {
    const errors = basicErrors(level);
    if (!errors.length && level.referenceSolution !== undefined) {
      try {
        if (replay(level, level.referenceSolution).state.status !== 'won') errors.push('reference-incomplete');
      } catch (error) { errors.push('reference-invalid:' + error.message); }
    }
    return {ok: errors.length === 0, errors};
  }
  const engine = {RULESET, clone, definitionHash, recipeFor, createState, inspectAction, applyAction,
    listLegalActions, replay, canonicalKey, validateDefinition, isWon,
    totalGoals: value => Object.values(value.goals || value).reduce((sum, count) => sum + count, 0)};
  root.TileSlideV05 = Object.assign(root.TileSlideV05 || {}, {engine});
  if (typeof module !== 'undefined') module.exports = engine;
})(globalThis);
