'use strict';
const test=require('node:test'), assert=require('node:assert/strict');
const C=require('../web/merge-v03/content.js');
const clone=()=>JSON.parse(JSON.stringify(C));
test('three families have unambiguous local base-to-final recipes',()=>{
  assert.equal(C.validate().ok,true);
  for(const family of Object.keys(C.families)){
    const tile={family,stage:'base'}, item=C.getItemForTile(tile), recipe=C.recipeFor(tile);
    assert.equal(item.stage,'base');assert.equal(recipe.inputCount,2);assert.equal(C.items[recipe.resultId].stage,'final');
    assert.ok(C.assetUrl(item.assetId).startsWith('./assets/merge-v04/'));
  }
  assert.equal(C.recipeFor({family:'unknown',stage:'base'}),null);
});
test('ambiguous recipes, unknown result types and unsafe asset paths fail content validation',()=>{
  const duplicate=clone();duplicate.recipes.duplicate={...duplicate.recipes['car-upgrade']};assert.equal(C.validate(duplicate).ok,false);
  const badResult=clone();badResult.recipes['car-upgrade'].resultId='unknown';assert.equal(C.validate(badResult).ok,false);
  for(const path of ['https://example.com/car.svg','../secret','assets/../car.svg','assets/car.svg?key=x']){
    const data=clone();data.assetPaths['car-small']=path;assert.equal(C.validate(data).ok,false,path);
  }
  const badRegion=clone();badRegion.items['car-small'].identityRegion.width=120;assert.equal(C.validate(badRegion).ok,false);
});
