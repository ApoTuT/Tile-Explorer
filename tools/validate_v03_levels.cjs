'use strict';
const fs = require('node:fs');
const path = require('node:path');
const E = require('../web/merge-v03/engine.js');
const levels = require('../web/merge-v03/levels.js');
const report = {ruleset: E.RULESET, levels: levels.map(level => ({id: level.id, ...E.validateLevel(level)}))};
console.log(JSON.stringify(report, null, 2));
if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(__dirname, '../docs/technical/v0.3-level-report.json'),
    JSON.stringify(report, null, 2) + '\n');
}
if (report.levels.some(level => !level.ok)) process.exitCode = 1;
