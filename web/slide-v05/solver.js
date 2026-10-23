/* Search the real kernel. Cycles are graph edges, never proof of a dead end. */
(function (root) {
  'use strict';
  const E = typeof module !== 'undefined' ? require('./engine.js') : root.TileSlideV05.engine;
  const now = () => root.performance?.now ? root.performance.now() : Date.now();
  const hintCache = new Map();
  function yieldTask() {
    if (typeof root.scheduler?.yield === 'function') return root.scheduler.yield();
    if (typeof root.MessageChannel === 'function') return new Promise(resolve => {
      const channel = new root.MessageChannel();
      channel.port1.onmessage = () => { channel.port1.close(); channel.port2.close(); resolve(); };
      channel.port2.postMessage(null);
    });
    return new Promise(resolve => setTimeout(resolve, 0));
  }
  function limits(options = {}) {
    return {maxStates: options.maxStates ?? 100000, maxMs: options.maxMs ?? 30000};
  }
  function makeSearch(initial, options = {}) {
    const budget = limits(options), start = now(), key = E.canonicalKey(initial);
    return {budget, start, nodes: [{state: E.clone(initial), parent: -1, action: null}],
      keys: new Map([[key, 0]]), head: 0, actionEdges: 0, reverse: [[]], winners: [],
      status: 'searching', error: null};
  }
  function expand(search, stopAtWinner) {
    if (now() - search.start >= search.budget.maxMs) { search.status = 'unverified'; return; }
    if (search.head >= search.nodes.length) { search.status = 'complete'; return; }
    const index = search.head++, node = search.nodes[index];
    if (node.state.status === 'won') {
      search.winners.push(index);
      if (stopAtWinner) search.status = 'solved';
      return;
    }
    for (const action of E.listLegalActions(node.state)) {
      if (now() - search.start >= search.budget.maxMs) { search.status = 'unverified'; return; }
      const result = E.applyAction(node.state, action);
      if (!result.ok) throw new Error('Kernel listed an illegal action');
      const key = E.canonicalKey(result.state);
      let target = search.keys.get(key);
      if (target === undefined) {
        if (search.nodes.length >= search.budget.maxStates) { search.status = 'unverified'; return; }
        target = search.nodes.length;
        search.keys.set(key, target);
        search.nodes.push({state: result.state, parent: index, action});
        search.reverse.push([]);
      }
      search.actionEdges++;
      search.reverse[target].push(index);
    }
  }
  function pathTo(search, index) {
    const path = [];
    while (search.nodes[index].parent !== -1) {
      path.push(search.nodes[index].action);
      index = search.nodes[index].parent;
    }
    return path.reverse();
  }
  function solutionResult(search) {
    const elapsedMs = Math.round((now() - search.start) * 100) / 100;
    if (search.status === 'solved') {
      const solution = pathTo(search, search.winners[0]);
      return {status: 'solved', complete: true, action: solution[0] || null, solution,
        visited: search.nodes.length, elapsedMs};
    }
    return {status: search.status === 'complete' ? 'unsolvable' : search.status,
      complete: search.status === 'complete', action: null, solution: null, visited: search.nodes.length, elapsedMs};
  }
  function findSolution(state, options = {}) {
    const search = makeSearch(state, options);
    while (search.status === 'searching') expand(search, true);
    return solutionResult(search);
  }
  function validateLevel(level, options = {}) {
    const valid = E.validateDefinition(level);
    const identity = {levelId: level.id, ruleset: E.RULESET,
      definitionHash: valid.ok ? E.definitionHash(level) : null, proof: 'actual-kernel-state-graph'};
    if (!valid.ok) return {...identity, ok: false, status: 'invalid', complete: false, errors: valid.errors};
    const search = makeSearch(E.createState(level), options);
    while (search.status === 'searching') expand(search, false);
    const common = {...identity, complete: search.status === 'complete', reachableStates: search.nodes.length,
      actionEdges: search.actionEdges, elapsedMs: Math.round((now() - search.start) * 100) / 100,
      canonicalState: 'rule and definition identity; row-major itemId; full goals and delivered; identical entities interchangeable'};
    if (search.status !== 'complete') return {...common, ok: false, status: 'unverified',
      initialSolvable: null, allReachableSolvable: null, shortestMoves: null, unwinnableStates: null,
      errors: ['search-budget-exhausted']};
    const distances = Array(search.nodes.length).fill(-1), queue = [...search.winners];
    for (const winner of queue) distances[winner] = 0;
    for (let head = 0; head < queue.length; head++) {
      const current = queue[head];
      for (const predecessor of search.reverse[current]) if (distances[predecessor] === -1) {
        distances[predecessor] = distances[current] + 1;
        queue.push(predecessor);
      }
    }
    const bad = distances.reduce((sum, distance) => sum + (distance < 0 ? 1 : 0), 0);
    const firstBad = distances.indexOf(-1), initialSolvable = distances[0] >= 0;
    return {...common, ok: initialSolvable && bad === 0, status: 'verified', winningStates: search.winners.length,
      initialSolvable, allReachableSolvable: bad === 0, shortestMoves: initialSolvable ? distances[0] : null,
      unwinnableStates: bad, counterexample: firstBad < 0 ? null :
        {actions: pathTo(search, firstBad), state: E.clone(search.nodes[firstBad].state)}, errors: []};
  }
  const describe = (state, action) => {
    const tile = state.tiles.find(value => value.id === action.tileId);
    return {row: tile.row, col: tile.col, itemId: tile.itemId, direction: action.direction};
  };
  function remember(state, solution) {
    let current = state;
    const descriptors = [];
    for (const action of solution) {
      descriptors.push(describe(current, action));
      current = E.applyAction(current, action).state;
    }
    if (hintCache.size >= 128) hintCache.delete(hintCache.keys().next().value);
    hintCache.set(E.canonicalKey(state), descriptors);
  }
  function cachedSolution(state) {
    const descriptors = hintCache.get(E.canonicalKey(state));
    if (!descriptors) return null;
    let current = state;
    const solution = [];
    for (const descriptor of descriptors) {
      const tile = current.tiles.find(value => value.row === descriptor.row && value.col === descriptor.col &&
        value.itemId === descriptor.itemId);
      if (!tile) return null;
      const action = {type: 'slide', tileId: tile.id, direction: descriptor.direction};
      const result = E.applyAction(current, action);
      if (!result.ok) return null;
      current = result.state;
      solution.push(action);
    }
    return {status: 'solved', complete: true, action: solution[0] || null, solution, visited: 0, elapsedMs: 0, cached: true};
  }
  async function findHint(state, options = {}) {
    const cancelled = () => Boolean(options.signal?.aborted || options.isCancelled?.());
    if (cancelled()) return {status: 'cancelled', complete: false, action: null, solution: null, visited: 0};
    const cached = cachedSolution(state);
    if (cached) return cached;
    const search = makeSearch(state, {...options, maxMs: options.maxMs ?? 1000});
    const sliceMs = Math.max(1, options.sliceMs ?? 4);
    while (search.status === 'searching') {
      const sliceStart = now();
      while (search.status === 'searching' && now() - sliceStart < sliceMs) {
        if (cancelled()) { search.status = 'cancelled'; break; }
        expand(search, true);
      }
      if (search.status === 'searching') await yieldTask();
    }
    if (cancelled()) search.status = 'cancelled';
    const result = solutionResult(search);
    if (result.status === 'solved') remember(state, result.solution);
    return result;
  }
  const solver = {validateLevel, findSolution, findHint, clearHintCache: () => hintCache.clear()};
  root.TileSlideV05 = Object.assign(root.TileSlideV05 || {}, {solver});
  if (typeof module !== 'undefined') module.exports = solver;
})(globalThis);
