(function (root) {
  'use strict';
  const NS = root.TileSlideV05 || {}, C = root.TileMergeContent;
  const config = typeof module !== 'undefined' ? require('./settings.js') : NS.config;
  const copy = typeof module !== 'undefined' ? require('./copy.js') : NS.copy;
  const vectors = {up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0]};
  const set = (node, values) => { for (const [key, value] of Object.entries(values)) node.style.setProperty(key, String(value)); };
  const attr = (node, name, value) => { if (node.getAttribute(name) !== String(value)) node.setAttribute(name, String(value)); };
  class View {
    constructor({board, goals, isReducedMotion = () => false}) {
      this.board = board; this.goals = goals; this.doc = board.ownerDocument;
      this.isReducedMotion = isReducedMotion; this.tiles = new Map(); this.goalSlots = new Map();
      this.cells = []; this.feedback = new Set(); this.guideNodes = [];
    }
    image(item, className) {
      const img = this.doc.createElement('img'); img.src = C.assetUrl(item.assetId);
      img.alt = ''; img.draggable = false; if (className) img.className = className;
      img.addEventListener('error', () => {
        img.hidden = true;
        if (!img.parentNode || img.parentNode.querySelector('.image-fallback')) return;
        const fallback = this.doc.createElement('span'); fallback.className = 'image-fallback';
        fallback.textContent = item.name; img.parentNode.append(fallback);
      }, {once: true}); return img;
    }
    setLevel(level) {
      this.clearGuide(); this.clearPreview(); this.cancelFeedback();
      this.level = level; this.state = null; this.tiles.clear(); this.goalSlots.clear(); this.cells = [];
      this.board.replaceChildren(); this.goals.replaceChildren(); this.board.dataset.levelId = level.id;
      this.board.style.aspectRatio = level.cols + ' / ' + level.rows;
      for (let row = 0; row < level.rows; row++) for (let col = 0; col < level.cols; col++) {
        const node = this.doc.createElement('div'); node.className = 'board-cell';
        node.dataset.row = row; node.dataset.col = col; node.setAttribute('aria-hidden', 'true');
        this.board.append(node); this.cells.push({row, col, node});
      }
    }
    metrics() {
      const rect = this.board.getBoundingClientRect(), cols = this.level?.cols || 3;
      const padding = config.boardPadding, gap = config.boardGap;
      const cell = Math.max(1, (rect.width - 2 * padding - (cols - 1) * gap) / cols);
      return {left: rect.left, top: rect.top, width: rect.width, height: rect.height,
        cell, cellSize: cell, pitch: cell + gap, gap, padding};
    }
    cellBox(row, col) {
      const m = this.metrics();
      return {left: m.left + m.padding + col * m.pitch, top: m.top + m.padding + row * m.pitch,
        width: m.cell, height: m.cell};
    }
    tileBox(tile) { return this.cellBox(tile.row, tile.col); }
    createTile(tile) {
      const item = C.items[tile.itemId], node = this.doc.createElement('button');
      node.type = 'button'; node.className = 'slide-tile'; node.dataset.tileId = tile.id;
      node.dataset.itemId = tile.itemId; node.append(this.image(item)); this.tiles.set(tile.id, node);
      this.board.append(node); return node;
    }
    render(state, level = this.level) {
      if (!this.level || this.level.id !== level.id) this.setLevel(level);
      this.clearPreview(); this.state = state; this.board.dataset.status = state.status;
      this.board.dataset.revision = state.revision ?? '';
      const live = new Set(state.tiles.map(tile => tile.id));
      for (const [id, node] of this.tiles) if (!live.has(id)) { node.remove(); this.tiles.delete(id); }
      for (const tile of state.tiles) {
        const node = this.tiles.get(tile.id) || this.createTile(tile);
        node.dataset.row = tile.row; node.dataset.col = tile.col;
        attr(node, 'aria-label', copy.labels.tileAria(C.items[tile.itemId].name, tile.row, tile.col));
        node.disabled = state.status !== 'playing';
      }
      this.renderGoals(state); this.layout();
    }
    renderGoals(state) {
      const order = this.level.goalOrder || Object.keys(state.goals);
      for (const resultId of order) {
        const item = C.items[resultId]; let slot = this.goalSlots.get(resultId);
        if (!slot) {
          const node = this.doc.createElement('div'); node.className = 'goal-slot'; node.dataset.resultId = resultId;
          const image = this.image(item, 'goal-image'), body = this.doc.createElement('span'); body.className = 'goal-body';
          const name = this.doc.createElement('span'); name.className = 'goal-name'; name.textContent = item.name;
          const count = this.doc.createElement('strong'); count.className = 'goal-progress';
          const check = this.doc.createElement('span'); check.className = 'goal-check'; check.textContent = '✓'; check.setAttribute('aria-hidden', 'true');
          body.append(name, count); node.append(image, body, check); this.goals.append(node);
          slot = {node, image, count, check}; this.goalSlots.set(resultId, slot);
        }
        const count = state.delivered[resultId] || 0, total = state.goals[resultId];
        slot.count.textContent = count + ' / ' + total; slot.check.hidden = count !== total;
        slot.node.classList.toggle('filled', count === total);
        attr(slot.node, 'aria-label', copy.labels.goalAria(item.name, count, total));
      }
      this.goals.dataset.groups = order.length;
    }
    layout() {
      if (!this.level) return;
      const m = this.metrics(), height = m.padding * 2 + m.cell * this.level.rows + m.gap * (this.level.rows - 1);
      this.board.style.height = height + 'px';
      for (const {row, col, node} of this.cells) Object.assign(node.style, {
        left: m.padding + col * m.pitch + 'px', top: m.padding + row * m.pitch + 'px', width: m.cell + 'px', height: m.cell + 'px'});
      for (const tile of this.state?.tiles || []) {
        const node = this.tiles.get(tile.id);
        set(node, {'--x': m.padding + tile.col * m.pitch + 'px', '--y': m.padding + tile.row * m.pitch + 'px'});
        Object.assign(node.style, {width: m.cell + 'px', height: m.cell + 'px', padding: m.cell * .08 + 'px'});
      }
    }
    tileNode(id) { return this.tiles.get(id) || null; }
    goalNode(id) { return this.goalSlots.get(id)?.node || null; }
    goalBox(id) { return this.goalSlots.get(id)?.image.getBoundingClientRect() || null; }
    focusTile(id) {
      const node = this.tiles.get(id) || this.tiles.values().next().value;
      node?.focus({preventScroll: true}); return Boolean(node);
    }
    settle() {
      this.clearPreview(); this.cancelFeedback();
      for (const node of this.tiles.values()) {
        node.style.transition = 'none';
        // Ensure hit regions finish at the committed grid position before a new gesture.
        void node.offsetWidth;
        node.style.transition = '';
      }
    }
    clearPreview() {
      for (const node of this.tiles.values()) {
        node.classList.remove('is-preview', 'merge-target');
        set(node, {'--drag-x': '0px', '--drag-y': '0px'});
      }
      for (const cell of this.cells) cell.node.classList.remove('preview-target', 'preview-merge');
    }
    preview(id, direction, check, progress = 0) {
      this.clearPreview(); const source = this.tiles.get(id), v = vectors[direction]; if (!source || !v) return;
      source.classList.add('is-preview'); const m = this.metrics();
      const distance = check?.ok ? Math.min(.72, Math.max(0, progress)) * m.pitch : Math.min(config.blockedPx, Math.max(0, progress) * m.pitch);
      set(source, {'--drag-x': v[0] * distance + 'px', '--drag-y': v[1] * distance + 'px'});
      if (check?.ok && check.to) {
        this.cells.find(cell => cell.row === check.to.row && cell.col === check.to.col)?.node.classList.add(check.kind === 'merge' ? 'preview-merge' : 'preview-target');
        if (check.targetId) this.tiles.get(check.targetId)?.classList.add('merge-target');
      }
    }
    cancelFeedback() { for (const a of this.feedback) a.cancel(); this.feedback.clear(); }
    reject(id, direction) {
      if (this.isReducedMotion()) return;
      const node = this.tiles.get(id), vector = vectors[direction]; if (!node?.animate || !vector) return;
      const base = root.getComputedStyle(node).transform;
      const animation = node.animate([{transform: base}, {transform: base + ' translate(' + vector[0] * 5 + 'px,' + vector[1] * 5 + 'px)'}, {transform: base}], {duration: 150, easing: 'ease-out'});
      this.feedback.add(animation); Promise.resolve(animation.finished).catch(() => {}).finally(() => this.feedback.delete(animation));
    }
    guide(hint, options = {}) {
      this.clearGuide(); const action = hint?.action || hint;
      const tile = this.state?.tiles.find(t => t.id === action?.tileId), vector = vectors[action?.direction];
      if (!tile || !vector) return;
      const m = this.metrics(), x = m.padding + tile.col * m.pitch, y = m.padding + tile.row * m.pitch;
      const ghost = this.doc.createElement('div'); ghost.className = 'guide-ghost'; ghost.setAttribute('aria-hidden', 'true');
      ghost.append(this.image(C.items[tile.itemId])); Object.assign(ghost.style, {left:x+'px',top:y+'px',width:m.cell+'px',height:m.cell+'px'});
      const arrow = this.doc.createElement('span'); arrow.className = 'guide-arrow'; arrow.setAttribute('aria-hidden','true');
      arrow.textContent = {up:'↑',down:'↓',left:'←',right:'→'}[action.direction];
      Object.assign(arrow.style,{left:x+m.cell/2+vector[0]*m.pitch*.48+'px',top:y+m.cell/2+vector[1]*m.pitch*.48+'px'});
      const label = this.doc.createElement('span'); label.className = 'guide-label';
      label.textContent = options.text || hint.text || (hint.kind === 'merge' ? copy.hints.merge : copy.hints.move);
      this.board.append(ghost,arrow,label); this.guideNodes = [ghost,arrow,label]; this.board.classList.add('has-guide');
      if (!this.isReducedMotion() && !options.reducedMotion && typeof ghost.animate === 'function') {
        this.guideAnimation = ghost.animate([{transform:'translate(0,0)',opacity:0},{transform:'translate(0,0)',opacity:.65,offset:.18},{transform:'translate('+vector[0]*m.pitch*.55+'px,'+vector[1]*m.pitch*.55+'px)',opacity:.65,offset:.78},{transform:'translate('+vector[0]*m.pitch*.55+'px,'+vector[1]*m.pitch*.55+'px)',opacity:0}],{duration:config.tutorialDemoMs,iterations:2,easing:'ease-in-out'});
        this.guideAnimation.finished.catch(() => {});
      }
    }
    clearGuide() {
      this.guideAnimation?.cancel(); this.guideAnimation = null;
      for (const node of this.guideNodes) node.remove(); this.guideNodes = []; this.board.classList.remove('has-guide');
    }
    destroy() { this.clearGuide(); this.clearPreview(); this.cancelFeedback(); }
  }
  root.TileSlideV05 = Object.assign(root.TileSlideV05 || {}, {View});
  if (typeof module !== 'undefined') module.exports = {View};
})(globalThis);
