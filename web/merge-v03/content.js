/* Content identifiers are shared by the pure rules, UI, export and presentation. */
(function (root) {
  'use strict';
  const identityRegion = () => ({x: 35, y: 35, width: 30, height: 30});
  const content = {
    version: '0.4.0',
    assetPaths: {
      'strawberry-small': 'assets/merge-v04/strawberry-small.svg',
      'strawberry-large': 'assets/merge-v04/strawberry-large.svg',
      'car-small': 'assets/merge-v04/car-small.svg',
      'sports-car': 'assets/merge-v04/sports-car.svg',
      'tree-small': 'assets/merge-v04/tree-small.svg',
      'tree-grown': 'assets/merge-v04/tree-grown.svg'
    },
    families: {
      strawberry: {category: 'fruit', baseItemId: 'strawberry-small', recipeId: 'strawberry-grow'},
      car: {category: 'transport', baseItemId: 'car-small', recipeId: 'car-upgrade'},
      tree: {category: 'plant', baseItemId: 'tree-small', recipeId: 'tree-grow'}
    },
    items: {
      'strawberry-small': {name: '小草莓', family: 'strawberry', stage: 'base', assetId: 'strawberry-small', identityRegion: identityRegion()},
      'strawberry-large': {name: '大草莓', family: 'strawberry', stage: 'final', assetId: 'strawberry-large'},
      'car-small': {name: '普通小车', family: 'car', stage: 'base', assetId: 'car-small', identityRegion: identityRegion()},
      'sports-car': {name: '跑车', family: 'car', stage: 'final', assetId: 'sports-car'},
      'tree-small': {name: '小树苗', family: 'tree', stage: 'base', assetId: 'tree-small', identityRegion: identityRegion()},
      'tree-grown': {name: '大树', family: 'tree', stage: 'final', assetId: 'tree-grown'}
    },
    recipes: {
      'strawberry-grow': {family: 'strawberry', inputStage: 'base', inputCount: 2, resultId: 'strawberry-large', feedbackId: 'inflate'},
      'car-upgrade': {family: 'car', inputStage: 'base', inputCount: 2, resultId: 'sports-car', feedbackId: 'upgrade'},
      'tree-grow': {family: 'tree', inputStage: 'base', inputCount: 2, resultId: 'tree-grown', feedbackId: 'sprout'}
    },
    feedbacks: {
      inflate: {preset: 'inflate'},
      upgrade: {preset: 'upgrade'},
      sprout: {preset: 'sprout'}
    }
  };
  content.getItemForTile = tile => {
    if (!tile || !content.families[tile.family]) return null;
    const entry = Object.entries(content.items).find(([, item]) =>
      item.family === tile.family && item.stage === tile.stage);
    return entry ? {id: entry[0], ...entry[1]} : null;
  };
  content.recipeFor = tile => {
    if (!tile) return null;
    const entry = Object.entries(content.recipes).find(([, recipe]) =>
      recipe.family === tile.family && recipe.inputStage === tile.stage);
    return entry ? {id: entry[0], ...entry[1]} : null;
  };
  content.assetUrl = assetId => content.assetPaths[assetId] ? './' + content.assetPaths[assetId] : null;
  content.validate = (registry = content) => {
    const errors = [];
    const record = value => value && typeof value === 'object' && !Array.isArray(value);
    if (!record(registry) || typeof registry.version !== 'string' ||
        !['assetPaths', 'families', 'items', 'recipes', 'feedbacks'].every(key => record(registry[key])))
      return {ok: false, errors: ['invalid-content']};
    const paths = new Set(), pairs = new Set(), itemPairs = new Set();
    for (const [id, path] of Object.entries(registry.assetPaths)) {
      if (!id || typeof path !== 'string' || !/^[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_.-]+)+$/.test(path) ||
          path.split('/').some(part => part === '..' || part === '.') || paths.has(path.toLowerCase()))
        errors.push('invalid-asset:' + id);
      if (typeof path === 'string') paths.add(path.toLowerCase());
    }
    for (const [id, item] of Object.entries(registry.items)) {
      if (!record(item) || !registry.families[item.family] || !['base', 'final'].includes(item.stage) ||
          typeof item.name !== 'string' || !item.name || !registry.assetPaths[item.assetId]) {
        errors.push('invalid-item:' + id); continue;
      }
      const pair = item.family + ':' + item.stage;
      if (itemPairs.has(pair)) errors.push('ambiguous-item:' + pair);
      itemPairs.add(pair);
      if (item.stage === 'base') {
        const r = item.identityRegion;
        if (!r || ![r.x, r.y, r.width, r.height].every(Number.isFinite) ||
            r.x < 0 || r.y < 0 || r.width <= 0 || r.height <= 0 ||
            r.x + r.width > 100 || r.y + r.height > 100) errors.push('invalid-identity:' + id);
      }
    }
    for (const [id, recipe] of Object.entries(registry.recipes)) {
      if (!record(recipe) || !registry.families[recipe.family] || recipe.inputStage !== 'base' ||
          recipe.inputCount !== 2 || registry.items[recipe.resultId]?.stage !== 'final' ||
          registry.items[recipe.resultId]?.family !== recipe.family || !registry.feedbacks[recipe.feedbackId]) {
        errors.push('invalid-recipe:' + id); continue;
      }
      const pair = recipe.family + ':' + recipe.inputStage;
      if (pairs.has(pair)) errors.push('ambiguous-recipe:' + pair);
      pairs.add(pair);
    }
    for (const [id, family] of Object.entries(registry.families)) {
      if (!record(family) || typeof family.category !== 'string' ||
          registry.items[family.baseItemId]?.family !== id || registry.items[family.baseItemId]?.stage !== 'base' ||
          registry.recipes[family.recipeId]?.family !== id) errors.push('invalid-family:' + id);
    }
    return {ok: errors.length === 0, errors};
  };
  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {content});
  if (typeof module !== 'undefined') module.exports = content;
})(globalThis);
