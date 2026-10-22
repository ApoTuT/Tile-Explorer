(function (root) {
  'use strict';
  const {geometry: G, engine: E, content: C, copy: Copy} = root.TileMergeV03;
  const styles = (node, values) => {
    for (const [name, value] of Object.entries(values)) {
      if (node.style[name] !== value) node.style[name] = value;
    }
  };
  const attribute = (node, name, value) => {
    if (node.getAttribute(name) !== String(value)) node.setAttribute(name, String(value));
  };
  const reducedBySystem = () => Boolean(root.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

  /** Persistent board actors share one world/screen transform with the input system. */
  class View {
    constructor(board, goals, {isReducedMotion = reducedBySystem} = {}) {
      this.board = board;
      this.goals = goals;
      this.isReducedMotion = isReducedMotion;
      this.tiles = new Map();
      this.goalSlots = new Map();
      this.feedback = new Set();
      this.highlight = null;
    }

    setLevel(level) {
      this.clearTargets();
      this.level = level;
      this.state = null;
      // Include the parking caption in the initial bounds. Removing tiles never shifts the board.
      this.bounds = G.bounds([...level.tiles, level.parkingSlot,
        {...level.parkingSlot, y: level.parkingSlot.y + 26}], 12);
      this.tiles.clear();
      this.goalSlots.clear();
      this.board.replaceChildren();
      this.goals.replaceChildren();
      this.board.dataset.levelId = level.id;
      this.createParking();
    }

    createParking() {
      this.parking = document.createElement('div');
      this.parking.className = 'parking-target';
      this.parking.dataset.dropId = '__parking__';
      this.pad = document.createElement('button');
      this.pad.type = 'button';
      this.pad.id = 'parking-pad';
      this.pad.className = 'parking-pad';
      this.pad.setAttribute('aria-label', Copy.labels.parkingAria);
      const icon = document.createElement('span');
      icon.className = 'parking-icon';
      icon.textContent = '+';
      icon.setAttribute('aria-hidden', 'true');
      const label = document.createElement('small');
      label.textContent = Copy.labels.park;
      const caption = document.createElement('span');
      caption.className = 'parking-caption';
      caption.textContent = Copy.labels.parking;
      this.pad.append(icon, label);
      this.parking.append(this.pad, caption);
      this.board.append(this.parking);
    }

    transform() {
      const box = this.board.getBoundingClientRect();
      const scale = Math.max(.01, Math.min(1.42,
        (box.width - 8) / this.bounds.width, (box.height - 12) / this.bounds.height));
      return {
        scale,
        left: box.left + (box.width - this.bounds.width * scale) / 2 - this.bounds.x * scale,
        top: box.top + (box.height - this.bounds.height * scale) / 2 - this.bounds.y * scale
      };
    }

    parkingBox() { return this.tileBox(this.level.parkingSlot); }

    dropTargets(state) {
      return [...state.tiles.filter(tile => tile.z === 0),
        {id: '__parking__', type: 'park', ...state.parkingSlot}];
    }

    tileBox(tile) {
      if (tile.id && tile.id === this.state?.parkingId) tile = this.level.parkingSlot;
      const tr = this.transform();
      return {left: tr.left + tile.x * tr.scale, top: tr.top + tile.y * tr.scale,
        width: 100 * tr.scale, height: 100 * tr.scale};
    }

    image(item, className = '') {
      const img = document.createElement('img');
      img.src = C.assetUrl(item.assetId);
      img.alt = '';
      img.draggable = false;
      if (className) img.className = className;
      // Types stay distinguishable even if a local asset cannot be decoded.
      img.addEventListener('error', () => {
        img.hidden = true;
        const fallback = document.createElement('span');
        fallback.className = 'image-fallback';
        fallback.textContent = item.name;
        img.parentNode?.append(fallback);
      }, {once: true});
      return img;
    }

    createTile(tile) {
      const item = C.getItemForTile(tile);
      const node = document.createElement('button');
      node.type = 'button';
      node.className = 'merge-tile ' + (tile.z ? 'upper' : 'lower');
      node.dataset.tileId = tile.id;
      node.dataset.layer = tile.z;
      node.dataset.family = tile.family;
      node.append(this.image(item));
      if (tile.z) {
        const grip = document.createElement('span');
        grip.className = 'grip';
        grip.textContent = '•••';
        grip.setAttribute('aria-hidden', 'true');
        node.append(grip);
      }
      this.tiles.set(tile.id, node);
      return node;
    }

    render(state) {
      this.state = state;
      this.board.dataset.status = state.status;
      this.board.dataset.revision = state.revision;
      this.pad.hidden = Boolean(state.parkingId);
      this.parking.classList.toggle('occupied', Boolean(state.parkingId));
      const live = new Set(state.tiles.map(tile => tile.id));
      for (const [id, node] of this.tiles) {
        if (!live.has(id)) {
          if (this.highlight?.id === id) this.clearDropHighlight();
          node.remove();
          this.tiles.delete(id);
        }
      }
      for (const tile of state.tiles) {
        const node = this.tiles.get(tile.id) || this.createTile(tile);
        const nested = tile.id === state.parkingId;
        node.classList.toggle('nested', nested);
        attribute(node, 'aria-label', Copy.labels.tileAria(C.getItemForTile(tile).name,
          tile.z, nested, E.getBlockers(state, tile.id).length > 0));
        const parent = nested ? this.parking : this.board;
        if (node.parentNode !== parent) {
          const focused = document.activeElement === node;
          parent.append(node);
          if (focused) node.focus({preventScroll: true});
        }
      }
      this.renderGoals(state);
      this.layout();
    }

    renderGoals(state) {
      const order = this.level.goalOrder || Object.keys(state.goals);
      for (const [id, slot] of this.goalSlots) {
        if (!order.includes(id)) { slot.node.remove(); this.goalSlots.delete(id); }
      }
      for (const resultId of order) {
        const item = C.items[resultId];
        let slot = this.goalSlots.get(resultId);
        if (!slot) {
          const node = document.createElement('div');
          node.className = 'goal-slot';
          node.dataset.resultId = resultId;
          const image = this.image(item, 'goal-image');
          const body = document.createElement('span');
          body.className = 'goal-body';
          const label = document.createElement('span');
          label.className = 'goal-name';
          label.textContent = item.name;
          const count = document.createElement('strong');
          count.className = 'goal-progress';
          const check = document.createElement('span');
          check.className = 'goal-check';
          check.textContent = '✓';
          check.setAttribute('aria-hidden', 'true');
          body.append(label, count);
          node.append(image, body, check);
          this.goals.append(node);
          slot = {node, image, count, check};
          this.goalSlots.set(resultId, slot);
        }
        const count = state.delivered[resultId] || 0;
        const total = state.goals[resultId];
        const filled = count === total;
        slot.node.classList.toggle('filled', filled);
        slot.count.textContent = count + ' / ' + total;
        slot.check.hidden = !filled;
        attribute(slot.node, 'aria-label', Copy.labels.goalAria(item.name, count, total));
      }
      this.goals.dataset.groups = order.length;
    }

    goalBox(resultId) {
      const slot = this.goalSlots.get(resultId);
      return slot?.image.getBoundingClientRect() || slot?.node.getBoundingClientRect() || null;
    }

    /** Resize updates positions without recreating actors or changing the initial bounds. */
    layout() {
      if (!this.state) return;
      const tr = this.transform();
      const box = this.board.getBoundingClientRect();
      const local = tile => ({left: tr.left - box.left + tile.x * tr.scale + 'px',
        top: tr.top - box.top + tile.y * tr.scale + 'px',
        width: 100 * tr.scale + 'px', height: 100 * tr.scale + 'px'});
      styles(this.parking, local(this.level.parkingSlot));
      for (const tile of this.state.tiles) {
        const nested = tile.id === this.state.parkingId;
        const position = local(tile);
        if (nested) { position.left = '-2px'; position.top = '-2px'; }
        position.zIndex = String(2 + tile.z * 10);
        styles(this.tiles.get(tile.id), position);
      }
    }

    dropNode(id) { return id === '__parking__' ? this.parking : this.tiles.get(id); }

    clearDropHighlight() {
      if (!this.highlight) return;
      this.dropNode(this.highlight.id)?.classList.remove('can-drop', 'cannot-drop');
      this.highlight = null;
    }

    clearTargets() {
      this.clearDropHighlight();
      for (const node of this.tiles.values()) node.classList.remove('keyboard-source');
      for (const animation of this.feedback) animation.cancel();
      this.feedback.clear();
    }

    markTargets(id, check) {
      const ok = Boolean(check?.ok);
      if (this.highlight && this.highlight.id === id && this.highlight.ok === ok) return;
      this.clearDropHighlight();
      const node = this.dropNode(id);
      if (!node) return;
      node.classList.add(ok ? 'can-drop' : 'cannot-drop');
      this.highlight = {id, ok};
    }

    reject(id, blockers = []) {
      if (this.isReducedMotion()) return;
      for (const key of new Set([id, ...blockers])) {
        const node = this.dropNode(key);
        if (typeof node?.animate !== 'function') continue;
        const animation = node.animate([
          {transform: 'translate3d(0,0,0)'}, {transform: 'translate3d(-3px,0,0)'},
          {transform: 'translate3d(3px,0,0)'}, {transform: 'translate3d(0,0,0)'}
        ], {duration: 150, easing: 'ease-out'});
        this.feedback.add(animation);
        Promise.resolve(animation.finished).catch(() => {}).finally(() => this.feedback.delete(animation));
      }
    }
  }

  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {View});
})(globalThis);
