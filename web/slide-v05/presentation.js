(function(root) {
  'use strict';
  const NS = root.TileSlideV05 || {}, config = typeof module !== 'undefined' ? require('./settings.js') : NS.config;
  function createPresentation({board, view, isReducedMotion = () => false}) {
    const actors = new Set(), animations = new Set(); let epoch = 0;
    function cancel() {
      epoch++; for (const animation of animations) animation.cancel(); animations.clear();
      for (const actor of actors) actor.remove(); actors.clear();
      for (const node of view.goalSlots?.values() || []) node.node.classList.remove('collecting');
    }
    function animate(actor, frames, options) {
      if (typeof actor.animate !== 'function') return Promise.resolve();
      const animation = actor.animate(frames, options); animations.add(animation);
      return Promise.resolve(animation.finished).catch(() => {}).finally(() => animations.delete(animation));
    }
    function makeActor(item, box, className = 'merge-result') {
      const actor = board.ownerDocument.createElement('div');
      actor.className = className; actor.setAttribute('aria-hidden', 'true');
      const img = board.ownerDocument.createElement('img'); img.src = root.TileMergeContent.assetUrl(item.assetId); img.alt = '';
      actor.append(img);
      Object.assign(actor.style, {left:box.left+'px',top:box.top+'px',width:box.width+'px',height:box.height+'px'});
      board.ownerDocument.body.append(actor); actors.add(actor); return actor;
    }
    function removeActor(actor) { actor?.remove(); actors.delete(actor); }
    function play(events, {before} = {}) {
      const token = epoch, C = root.TileMergeContent;
      for (const event of events || []) {
        if (event.type !== 'merged-and-delivered') continue;
        const collision = event.to || event.collision || event.position || before?.tiles.find(t => t.id === event.targetId);
        const result = C.items[event.resultId], goal = view.goalNode(event.resultId);
        if (!result || !collision) continue;
        const box = view.cellBox(collision.row, collision.col), destination = view.goalBox(event.resultId);
        if (!destination) continue;
        if (isReducedMotion()) {
          if (goal?.animate) animate(goal,[{outline:'3px solid #e4ca77'},{outline:'3px solid transparent'}],{duration:180});
          continue;
        }
        const from = view.cellBox(event.from.row, event.from.col);
        const source = makeActor(C.items[event.sourceItemId], from, 'merge-result glide-source');
        const target = makeActor(C.items[event.sourceItemId], box, 'merge-result glide-target');
        let actor = null;
        (async () => {
          await animate(source, [{transform:'translate(0,0)'},{transform:'translate('+(box.left-from.left)+'px,'+(box.top-from.top)+'px)'}],
            {duration:config.travelMs(event.distance || 1),easing:'cubic-bezier(.15,.75,.25,1)',fill:'forwards'});
          if (token !== epoch || !actors.has(source)) return;
          removeActor(source); removeActor(target);
          actor = makeActor(result, box);
          await animate(actor,[{transform:'scale(.65)',opacity:.2},{transform:'scale(1.08)',opacity:1},{transform:'scale(1)',opacity:1}],{duration:config.growMs,easing:'ease-out',fill:'forwards'});
          if (token !== epoch || !actors.has(actor)) return;
          const dx=destination.left+destination.width/2-box.left-box.width/2,dy=destination.top+destination.height/2-box.top-box.height/2;
          await animate(actor,[{transform:'translate(0,0) scale(1)',opacity:1},{transform:'translate('+dx+'px,'+dy+'px) scale(.34)',opacity:.85}],{duration:config.deliverMs,easing:'cubic-bezier(.3,.05,.45,1)',fill:'forwards'});
          if (token !== epoch || !actors.has(actor)) return;
          actor.remove(); actors.delete(actor);
          if (goal?.animate) animate(goal,[{transform:'scale(1)'},{transform:'scale(1.05)'},{transform:'scale(1)'}],{duration:180});
        })().catch(() => { removeActor(actor); removeActor(source); removeActor(target); });
      }
    }
    return {play,cancel,destroy:cancel};
  }
  const api={createPresentation}; root.TileSlideV05=Object.assign(root.TileSlideV05||{},{presentation:api});
  if(typeof module!=='undefined')module.exports=api;
})(globalThis);
