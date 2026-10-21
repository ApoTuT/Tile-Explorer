(function (root) {
  'use strict';
  const {geometry: G, engine: E} = root.TileMergeV03;
  const asset = name => './assets/merge-v03/' + name + '.svg';
  const styles = (node, values) => {
    for (const [name, value] of Object.entries(values)) {
      if (node.style[name] !== value) node.style[name] = value;
    }
  };
  const attribute = (node, name, value) => {
    if (node.getAttribute(name) !== value) node.setAttribute(name, value);
  };

  /** Reconcile stable actors by ID; a normal move never rebuilds the board. */
  class View {
    constructor(board, goals) {
      this.board = board;
      this.goals = goals;
      this.tiles = new Map();
      this.goalSlots = [];
      this.feedback = new Set();
      this.highlight = null;
      this.guide = null;
    }

    setLevel(level) {
      this.clearTargets();
      this.level = level;
      this.state = null;
      this.bounds = G.bounds([...level.tiles, level.nest, {...level.nest, y: level.nest.y + 22}], 8);
      this.tiles.clear();
      this.goalSlots = [];
      this.guide = null;
      this.board.replaceChildren();
      this.goals.replaceChildren();
      this.createNest();
    }

    createNest() {
      this.nest = document.createElement('div');
      this.nest.className = 'nest-target';
      this.nest.dataset.dropId = '__nest__';
      this.pad = document.createElement('button');
      this.pad.type = 'button';
      this.pad.id = 'nest-pad';
      this.pad.className = 'nest-pad';
      this.pad.setAttribute('aria-label', '临时窝，只能借放一张上层小狗');
      const home = document.createElement('span');
      home.className = 'nest-icon';
      home.textContent = '⌂';
      home.setAttribute('aria-hidden', 'true');
      const label = document.createElement('small');
      label.textContent = '借放一张';
      const caption = document.createElement('span');
      caption.className = 'nest-caption';
      caption.textContent = '临时窝';
      this.pad.append(home, label);
      this.nest.append(this.pad, caption);
      this.board.append(this.nest);
    }

    transform() {
      const box = this.board.getBoundingClientRect();
      const scale = Math.min(.84, (box.width - 10) / this.bounds.width, (box.height - 10) / this.bounds.height);
      return {
        scale,
        left: box.left + (box.width - this.bounds.width * scale) / 2 - this.bounds.x * scale,
        top: box.top + (box.height - this.bounds.height * scale) / 2 - this.bounds.y * scale
      };
    }

    nestBox() { return this.tileBox(this.level.nest); }

    dropTargets(state) {
      return [...state.tiles.filter(tile => tile.z === 0), {id: '__nest__', type: 'park', ...state.nestSlot}];
    }

    tileBox(tile) {
      if (tile.id && tile.id === this.state?.nestId) tile = this.level.nest;
      const tr = this.transform();
      return {left: tr.left + tile.x * tr.scale, top: tr.top + tile.y * tr.scale,
        width: 100 * tr.scale, height: 100 * tr.scale};
    }

    createTile(tile) {
      const node = document.createElement('button');
      node.type = 'button';
      node.className = 'animal-tile ' + (tile.z ? 'upper' : 'lower');
      node.dataset.tileId = tile.id;
      node.dataset.layer = tile.z;
      const img = document.createElement('img');
      img.src = asset('puppy');
      img.alt = '';
      img.draggable = false;
      node.append(img);
      if (tile.z) {
        const grip = document.createElement('span');
        grip.className = 'grip';
        grip.textContent = '···';
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
      this.pad.hidden = Boolean(state.nestId);
      this.nest.classList.toggle('inviting', !state.nestId && !E.listMergeMoves(state).length);

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
        const nested = tile.id === state.nestId;
        node.classList.toggle('nested', nested);
        attribute(node, 'aria-label', (nested ? '临时窝里的' : tile.z ? '上层' : '下层') + '小狗' +
          (E.getBlockers(state, tile.id).length ? '，还有小狗压着' : ''));
        const parent = nested ? this.nest : this.board;
        if (node.parentNode !== parent) {
          const focused = document.activeElement === node;
          parent.append(node);
          if (focused) node.focus({preventScroll: true});
        }
      }
      this.renderGoals(state);
      this.renderGuide(state);
      this.layout();
    }

    renderGoals(state) {
      while (this.goalSlots.length > state.goals.golden) this.goalSlots.pop().node.remove();
      for (let i = 0; i < state.goals.golden; i++) {
        let slot = this.goalSlots[i];
        if (!slot) {
          const node = document.createElement('div');
          node.className = 'goal-slot';
          node.dataset.slot = i;
          const img = document.createElement('img');
          img.src = asset('golden');
          img.alt = '';
          const check = document.createElement('span');
          check.textContent = '✓';
          check.setAttribute('aria-hidden', 'true');
          node.append(img, check);
          this.goals.append(node);
          slot = this.goalSlots[i] = {node, check};
        }
        const filled = i < state.delivered.golden;
        slot.node.classList.toggle('filled', filled);
        slot.check.hidden = !filled;
        attribute(slot.node, 'aria-label', filled ? '金毛已到家' : '等待一只金毛');
      }
    }

    renderGuide(state) {
      const show = this.level.id === 'merge-01' && state.status === 'playing' && !state.nestId;
      if (!show) {
        this.guide?.remove();
        this.guide = null;
      } else if (!this.guide) {
        this.guide = document.createElement('span');
        this.guide.className = 'drag-guide';
        this.guide.textContent = '↘';
        this.guide.setAttribute('aria-hidden', 'true');
        this.board.append(this.guide);
      }
    }

    /** Resize only changes CSS positions, preserving focus and ongoing feedback. */
    layout() {
      if (!this.state) return;
      const tr = this.transform();
      const box = this.board.getBoundingClientRect();
      const local = tile => ({left: tr.left - box.left + tile.x * tr.scale + 'px',
        top: tr.top - box.top + tile.y * tr.scale + 'px',
        width: 100 * tr.scale + 'px', height: 100 * tr.scale + 'px'});
      styles(this.nest, local(this.level.nest));
      for (const tile of this.state.tiles) {
        const nested = tile.id === this.state.nestId;
        const position = local(tile);
        // The nest border is decorative, not an offset in the shared world geometry.
        if (nested) { position.left = '-2px'; position.top = '-2px'; }
        position.zIndex = String(2 + tile.z * 10);
        styles(this.tiles.get(tile.id), position);
      }
      if (this.guide) {
        const source = this.level.tiles.find(tile => tile.id === 'u1');
        const target = this.level.tiles.find(tile => tile.id === 'l1');
        styles(this.guide, {
          left: tr.left - box.left + (source.x + 55) * tr.scale + 'px',
          top: tr.top - box.top + (source.y + 65) * tr.scale + 'px'
        });
        this.guide.style.setProperty('--dx', (target.x - source.x) * tr.scale + 'px');
        this.guide.style.setProperty('--dy', (target.y - source.y) * tr.scale + 'px');
      }
    }

    dropNode(id) { return id === '__nest__' ? this.nest : this.tiles.get(id); }

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
      if (root.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
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

  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {View, asset});
})(globalThis);
