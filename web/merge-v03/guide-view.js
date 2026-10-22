(function (root) {
  'use strict';
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const css = (node, values) => Object.assign(node.style, values);
  const svgNode = (name, attrs = {}) => {
    const node = document.createElementNS(SVG_NS, name);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
    return node;
  };

  /** A disposable, non-interactive overlay. It never reparents or moves a real tile. */
  class GuideView {
    constructor({board, view, isReducedMotion = () => false}) {
      this.board = board;
      this.view = view;
      this.isReducedMotion = isReducedMotion;
      this.animations = new Set();
      this.overlay = null;
      this.destroyed = false;
    }

    show({move, text = '', state = this.view.state, sourceItemId, reducedMotion = this.isReducedMotion()}) {
      this.hide();
      if (this.destroyed || !move || !state) return false;
      const source = state.tiles.find(tile => tile.id === move.sourceId);
      const target = state.tiles.find(tile => tile.id === move.targetId);
      if (!source || (move.type !== 'park' && !target)) return false;
      const sourceBox = this.view.tileBox(source);
      const targetBox = move.type === 'park' ? this.view.parkingBox() : this.view.tileBox(target);
      const boardBox = this.board.getBoundingClientRect();
      if (!sourceBox || !targetBox || !boardBox.width || !boardBox.height) return false;
      const local = box => ({x: box.left - boardBox.left, y: box.top - boardBox.top, width: box.width, height: box.height});
      const a = local(sourceBox), b = local(targetBox);
      const overlay = document.createElement('div');
      overlay.className = 'v04-guide';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('data-guide-source', move.sourceId);
      overlay.setAttribute('data-guide-target', move.type === 'park' ? '__parking__' : move.targetId);
      overlay.title = text;
      css(overlay, {position: 'absolute', inset: '0', pointerEvents: 'none', zIndex: '30', overflow: 'visible'});
      this.overlay = overlay;

      // Double/dashed outlines communicate the relationship without relying on color.
      for (const [box, dashed] of [[a, true], [b, false]]) {
        const outline = document.createElement('span');
        outline.className = 'v04-guide-outline';
        css(outline, {position: 'absolute', left: box.x - 3 + 'px', top: box.y - 3 + 'px',
          width: box.width + 6 + 'px', height: box.height + 6 + 'px', boxSizing: 'border-box',
          border: dashed ? '3px dashed #674820' : '5px double #674820', borderRadius: '18%',
          boxShadow: '0 0 0 2px #fff8d9', opacity: '.85'});
        overlay.append(outline);
      }
      const pathLayer = svgNode('svg', {viewBox: `0 0 ${boardBox.width} ${boardBox.height}`, width: '100%', height: '100%'});
      css(pathLayer, {position: 'absolute', inset: '0', overflow: 'visible'});
      const x1 = a.x + a.width / 2, y1 = a.y + a.height / 2;
      const x2 = b.x + b.width / 2, y2 = b.y + b.height / 2;
      const line = `M ${x1} ${y1} L ${x2} ${y2}`;
      pathLayer.append(svgNode('path', {d: line, fill: 'none', stroke: '#fff8d9', 'stroke-width': '8', 'stroke-linecap': 'round'}));
      pathLayer.append(svgNode('path', {d: line, fill: 'none', stroke: '#674820', 'stroke-width': '3', 'stroke-dasharray': '5 7', 'stroke-linecap': 'round'}));
      const angle = Math.atan2(y2 - y1, x2 - x1), size = 12;
      pathLayer.append(svgNode('path', {d: `M ${x2 - size * Math.cos(angle - .6)} ${y2 - size * Math.sin(angle - .6)} L ${x2} ${y2} L ${x2 - size * Math.cos(angle + .6)} ${y2 - size * Math.sin(angle + .6)}`,
        fill: 'none', stroke: '#674820', 'stroke-width': '4', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}));
      overlay.append(pathLayer);

      if (!reducedMotion) {
        const actor = document.createElement('div');
        actor.className = 'v04-guide-shadow';
        css(actor, {position: 'absolute', left: a.x + 'px', top: a.y + 'px', width: a.width + 'px', height: a.height + 'px',
          borderRadius: '17%', background: '#fff8e8', border: '2px dashed #674820', boxSizing: 'border-box',
          opacity: '.55', willChange: 'transform,opacity'});
        const content = root.TileMergeV03?.content;
        const item = sourceItemId ? content?.items[sourceItemId] : content?.getItemForTile(source);
        const assetUrl = item && content.assetUrl(item.assetId);
        if (assetUrl) {
          const img = document.createElement('img');
          img.src = assetUrl;
          img.alt = '';
          img.draggable = false;
          css(img, {width: '100%', height: '100%', objectFit: 'contain'});
          actor.append(img);
        }
        // Draw the hand as vector artwork, so it remains readable on every platform.
        const hand = svgNode('svg', {viewBox: '0 0 44 48', width: '36', height: '40'});
        hand.append(svgNode('path', {d: 'M14 24V8a4 4 0 0 1 8 0v12-4a4 4 0 0 1 8 0v4a4 4 0 0 1 7 2v10c0 8-5 12-12 12h-3c-4 0-7-3-9-6L5 28c-3-4 3-8 6-4l3 3z',
          fill: '#fff9eb', stroke: '#674820', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}));
        css(hand, {position: 'absolute', right: '-11px', bottom: '-18px', filter: 'drop-shadow(0 2px 1px #79532144)'});
        actor.append(hand);
        overlay.append(actor);
        if (typeof actor.animate === 'function') {
          const animation = actor.animate([
            {transform: 'translate3d(0,0,0)', opacity: .25, offset: 0},
            {transform: 'translate3d(0,0,0)', opacity: .65, offset: .15},
            {transform: `translate3d(${b.x - a.x}px,${b.y - a.y}px,0)`, opacity: .65, offset: .85},
            {transform: `translate3d(${b.x - a.x}px,${b.y - a.y}px,0)`, opacity: 0, offset: 1}
          ], {duration: 1200, easing: 'ease-in-out', fill: 'both'});
          this.animations.add(animation);
          Promise.resolve(animation.finished).catch(() => {}).finally(() => this.animations.delete(animation));
        } else actor.remove();
      }
      this.board.append(overlay);
      return true;
    }

    hide() {
      for (const animation of this.animations) animation.cancel();
      this.animations.clear();
      this.overlay?.remove();
      this.overlay = null;
    }

    destroy() { this.hide(); this.destroyed = true; }
  }

  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {GuideView});
  if (typeof module !== 'undefined') module.exports = GuideView;
})(globalThis);
