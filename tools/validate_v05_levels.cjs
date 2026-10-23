'use strict';
const fs = require('node:fs');
const path = require('node:path');
const S = require('../web/slide-v05/solver.js');
const levels = require('../web/slide-v05/levels.js');
const report = {status: 'actual-kernel-validation', ruleset: 'slide-v05-2',
  method: 'BFS over actual engine actions, then reverse reachability from all winning states; cycles retained',
  limits: {maxStates: 100000, maxMs: 30000},
  levels: levels.map(level => S.validateLevel(level, {maxStates: 100000, maxMs: 30000}))};
report.ok = report.levels.every(level => level.ok && level.complete);
if (process.argv.includes('--write')) {
  const destination = path.resolve(__dirname, '../docs/technical/v0.5-level-report.json');
  fs.writeFileSync(destination, JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exitCode = 1;
