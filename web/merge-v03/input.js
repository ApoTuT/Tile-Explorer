(function (root) {
  'use strict';
  const config = typeof module !== 'undefined' ? require('./settings.js') : root.TileMergeV03.config;

  function dragPosition(pointer, grab, transform) {
    return {x: (pointer.x - transform.left) / transform.scale - grab.x,
      y: (pointer.y - transform.top) / transform.scale - grab.y};
  }

  function snapRadius(scale) {
    return Math.min(config.snapWorldMax, Math.max(config.snapWorldMin, config.snapScreenMin / scale));
  }

  function nearestTarget(position, targets, radius = config.snapWorldMin) {
    let nearest = null, distance = radius;
    for (const tile of targets) {
      const next = Math.hypot(position.x - tile.x, position.y - tile.y);
      if (next <= radius && (!nearest || next < distance)) { nearest = tile; distance = next; }
    }
    return nearest;
  }

  function dropTargets(view, state) {
    return view.dropTargets ? view.dropTargets(state) : state.tiles.filter(tile => tile.z === 0);
  }

  function checkDrop(engine, state, sourceId, target) {
    return target.type === 'park' ? engine.canPark(state, sourceId) : engine.canMerge(state, sourceId, target.id);
  }

  function screenBox(gesture) {
    const {position, transform} = gesture;
    return {left: transform.left + position.x * transform.scale,
      top: transform.top + position.y * transform.scale,
      width: 100 * transform.scale, height: 100 * transform.scale};
  }

  const translation = box => 'translate3d(' + box.left + 'px, ' + box.top + 'px, 0)';

  function bindInput({board, view, getState, commit, message, unlock, isBusy, onGestureStart = () => {}}) {
    const engine = root.TileMergeV03.engine, doc = board.ownerDocument || root.document;
    const transients = new Set(), listeners = [];
    let drag = null, destroyed = false;
    const requestFrame = root.requestAnimationFrame.bind(root);
    const cancelFrame = root.cancelAnimationFrame.bind(root);

    function listen(target, name, listener, options) {
      target.addEventListener(name, listener, options);
      listeners.push(() => target.removeEventListener(name, listener, options));
    }

    function stopFrame(gesture) {
      if (gesture.frame !== null) { cancelFrame(gesture.frame); gesture.frame = null; }
    }

    function removePreview(preview) {
      if (!transients.delete(preview)) return;
      if (preview.frame !== null) cancelFrame(preview.frame);
      preview.animation?.cancel();
      preview.gesture.ghost?.remove();
      preview.gesture.node.classList.remove('lifted');
    }

    function clearTransients() { for (const preview of [...transients]) removePreview(preview); }

    function release(gesture) {
      stopFrame(gesture);
      drag = null;
      view.clearTargets();
      if (gesture.node.hasPointerCapture(gesture.pointerId)) gesture.node.releasePointerCapture(gesture.pointerId);
    }

    function discard(gesture) {
      gesture.ghost?.remove();
      gesture.node.classList.remove('lifted');
    }

    function cancel() {
      if (drag) { const old = drag; release(old); discard(old); }
      clearTransients();
    }

    function showReturn(gesture) {
      if (!gesture.ghost) { discard(gesture); return; }
      const reduced = root.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (reduced || typeof gesture.ghost.animate !== 'function') { discard(gesture); return; }
      const preview = {gesture, frame: null, animation: null};
      transients.add(preview);
      try {
        preview.animation = gesture.ghost.animate([
          {transform: translation(screenBox(gesture))},
          {transform: translation(gesture.origin)}
        ], {duration: config.returnMs, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'forwards'});
        Promise.resolve(preview.animation.finished).then(() => removePreview(preview), () => removePreview(preview));
      } catch (_) { removePreview(preview); }
    }

    function handoff(gesture) {
      // The app commits immediately, then updates nodes on the next frame. Keep
      // the lifted source covered until that frame so it never flashes at home.
      const preview = {gesture, frame: null, animation: null};
      transients.add(preview);
      preview.frame = requestFrame(() => { preview.frame = null; removePreview(preview); });
    }

    function makeGhost(gesture) {
      const ghost = gesture.node.cloneNode(true);
      ghost.removeAttribute('id'); ghost.removeAttribute('data-tile-id');
      ghost.setAttribute('aria-hidden', 'true'); ghost.tabIndex = -1;
      ghost.className = 'animal-tile drag-ghost';
      const box = screenBox(gesture);
      Object.assign(ghost.style, {left: '0px', top: '0px', width: box.width + 'px',
        height: box.height + 'px', transform: translation(box), willChange: 'transform'});
      doc.body.append(ghost); gesture.ghost = ghost;
      gesture.node.classList.add('lifted'); board.classList.add('has-dragged');
    }

    function updatePoint(gesture, event) {
      const pointer = {x: event.clientX, y: event.clientY};
      gesture.position = dragPosition(pointer, gesture.grab, gesture.transform);
      if (!gesture.ghost && Math.hypot(pointer.x - gesture.start.x, pointer.y - gesture.start.y) >= config.dragThreshold)
        makeGhost(gesture);
    }

    function paint(gesture) {
      if (!gesture.ghost) return;
      gesture.ghost.style.transform = translation(screenBox(gesture));
      const state = getState();
      if (state.revision !== gesture.targetRevision) {
        gesture.targets = dropTargets(view, state); gesture.targetRevision = state.revision;
      }
      const target = nearestTarget(gesture.position, gesture.targets, snapRadius(gesture.transform.scale));
      const check = target ? checkDrop(engine, state, gesture.tile.id, target) : null;
      const key = JSON.stringify([target?.id, check?.ok, check?.reason, check?.blockers]);
      if (key !== gesture.highlight) { view.markTargets(target?.id, check); gesture.highlight = key; }
    }

    function queuePaint(gesture) {
      if (gesture.frame !== null) return;
      gesture.frame = requestFrame(() => {
        gesture.frame = null;
        if (drag === gesture) paint(gesture);
      });
    }

    function onDown(event) {
      if (destroyed) return;
      if (drag) { cancel(); return; }
      clearTransients();
      const node = event.target.closest('[data-tile-id]');
      if (!node || isBusy() || event.button !== 0 || !event.isPrimary) return;
      const state = getState(), tile = state.tiles.find(item => item.id === node.dataset.tileId);
      if (!tile || state.status !== 'playing') return;
      unlock();
      if (tile.z !== 1 || engine.getBlockers(state, tile.id).length) {
        message('抓住上面的小狗，拖到下面的小狗上。'); return;
      }
      onGestureStart();
      const transform = view.transform(), origin = node.getBoundingClientRect();
      const start = {x: event.clientX, y: event.clientY};
      const grab = {x: (start.x - origin.left) / transform.scale, y: (start.y - origin.top) / transform.scale};
      drag = {pointerId: event.pointerId, node, tile, revision: state.revision, transform, origin,
        start, grab, position: dragPosition(start, grab, transform), ghost: null, frame: null,
        targets: dropTargets(view, state), targetRevision: state.revision, highlight: null};
      try { node.setPointerCapture(event.pointerId); } catch (_) { cancel(); }
    }

    function onMove(event) {
      if (!drag || drag.pointerId !== event.pointerId) return;
      updatePoint(drag, event);
      if (drag.ghost) queuePaint(drag);
    }

    function onUp(event) {
      if (!drag || drag.pointerId !== event.pointerId) return;
      const gesture = drag;
      stopFrame(gesture);
      // A release can arrive before the last queued frame, or without a final
      // pointermove. Decisions always use the release point and current rules.
      updatePoint(gesture, event);
      if (!gesture.ghost) { release(gesture); discard(gesture); return; }
      paint(gesture);
      const state = getState(), target = nearestTarget(gesture.position,
        dropTargets(view, state), snapRadius(gesture.transform.scale));
      const from = screenBox(gesture);
      release(gesture);
      if (!target) { showReturn(gesture); message('再靠近一点，松手就能对齐。'); return; }
      const check = checkDrop(engine, state, gesture.tile.id, target);
      if (!check.ok) {
        showReturn(gesture);
        message(target.type === 'park' ? '窝里只能放一张，先把里面的小狗接回来配对。' :
          check.reason === 'target-blocked' ? '还有小狗压着，先把一张拖到临时窝借个位。' : '这两张还不能配对。');
        view.reject(target.id, check.blockers); return;
      }
      if (state.revision !== gesture.revision) {
        showReturn(gesture); message('牌阵已更新，再拖一次就好。'); return;
      }
      handoff(gesture);
      commit(target.type === 'park' ? {type: 'park', sourceId: gesture.tile.id, revision: gesture.revision} :
        {sourceId: gesture.tile.id, targetId: target.id, revision: gesture.revision}, from);
    }

    function onCancel(event) {
      if (drag && event.pointerId === drag.pointerId) cancel();
    }

    function onLostCapture(event) {
      if (drag && event.pointerId === drag.pointerId && event.target === drag.node) cancel();
    }

    function onSecondPointer(event) { if (drag && event.pointerId !== drag.pointerId) cancel(); }
    listen(board, 'pointerdown', onDown);
    listen(board, 'pointermove', onMove, {passive: true});
    listen(board, 'pointerup', onUp);
    listen(board, 'pointercancel', onCancel);
    listen(board, 'lostpointercapture', onLostCapture);
    listen(doc, 'pointerdown', onSecondPointer, true);

    return {cancel, destroy() {
      if (destroyed) return;
      destroyed = true; cancel();
      for (const remove of listeners) remove();
    }};
  }

  const api = {dragPosition, snapRadius, nearestTarget, bindInput};
  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {input: api});
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);
