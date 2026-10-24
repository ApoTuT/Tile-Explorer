/* Runs in a dedicated Worker; never mutates the UI or a live session. */
'use strict';
if(typeof importScripts==='function'){
  importScripts('content.js','engine.js','solver.js');
  self.onmessage=e=>{try{const {state,maxStates,maxMs}=e.data;self.postMessage(TileSlideV07.solver.findSolution(state,{maxStates,maxMs}));}catch(_){self.postMessage({status:'unverified'});}};
}
