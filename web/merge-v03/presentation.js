(function (root) {
  'use strict';
  const defaults = {snapMs: 85, growMs: 180, deliverMs: 170, parkMs: 110};
  const pose = (x, y, scale = 1, angle = 0) =>
    'translate3d(' + x + 'px,' + y + 'px,0) scale(' + scale + ') rotate(' + angle + 'deg)';
  const reducedBySystem = () => Boolean(root.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

  /** Disposable, cancellable visual actors; committed state never waits on a visual result. */
  class Presentation {
    constructor({isReducedMotion = reducedBySystem} = {}) {
      this.epoch = 0;
      this.actors = new Set();
      this.animations = new Set();
      this.isReducedMotion = isReducedMotion;
    }

    cancel() {
      this.epoch++;
      for (const animation of this.animations) animation.cancel();
      this.animations.clear();
      for (const actor of this.actors) actor.remove();
      this.actors.clear();
    }

    async play(event, from, target, goal) {
      if (!target || !root.document?.body) return false;
      const {content: C, config} = root.TileMergeV03;
      const epoch = this.epoch;
      const reduced = this.isReducedMotion();
      const timing = {...defaults, ...config};
      const actor = document.createElement('div');
      actor.className = 'delivery-actor';
      actor.setAttribute?.('aria-hidden', 'true');
      const image = document.createElement('img');
      const source = C.items[event.sourceItemId];
      image.src = C.assetUrl(source.assetId);
      image.alt = '';
      actor.append(image);
      const start = from || target;
      const startScale = start.width ? start.width / target.width : 1;
      Object.assign(actor.style, {
        left: '0px', top: '0px', width: target.width + 'px', height: target.height + 'px',
        transform: pose(start.left, start.top, startScale)
      });
      document.body.append(actor);
      this.actors.add(actor);

      const animate = async (frames, duration) => {
        if (epoch !== this.epoch) throw new Error('cancelled');
        const last = frames[frames.length - 1];
        if (typeof actor.animate !== 'function' || reduced) {
          Object.assign(actor.style, last);
          return;
        }
        const animation = actor.animate(frames, {
          duration, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'forwards'
        });
        this.animations.add(animation);
        try {
          await animation.finished;
          if (epoch !== this.epoch) throw new Error('cancelled');
          Object.assign(actor.style, last);
        } finally {
          this.animations.delete(animation);
          animation.cancel();
        }
      };

      let completed = false;
      try {
        await animate([
          {transform: pose(start.left, start.top, startScale)},
          {transform: pose(target.left, target.top)}
        ], timing.snapMs);
        if (event.type === 'park') {
          await animate([
            {transform: pose(target.left, target.top, 1.04)},
            {transform: pose(target.left, target.top)}
          ], timing.parkMs);
        } else {
          const result = C.items[event.resultId];
          image.src = C.assetUrl(result.assetId);
          actor.classList.add('grown');
          const recipe = C.recipes[event.recipeId];
          const preset = recipe?.feedbackId || 'inflate';
          actor.dataset.feedback = preset;
          const x = target.left, y = target.top;
          const frames = preset === 'upgrade' ? [
            {transform: pose(x - 4, y, .87, -2)},
            {transform: pose(x + 4, y, 1.08, 1)},
            {transform: pose(x, y)}
          ] : preset === 'sprout' ? [
            {transform: pose(x, y + target.height * .12, .65, -3), opacity: .7},
            {transform: pose(x, y - 3, 1.1, 2), opacity: 1},
            {transform: pose(x, y), opacity: 1}
          ] : [
            {transform: pose(x, y, .8, -4)},
            {transform: pose(x, y, 1.15, 3)},
            {transform: pose(x, y)}
          ];
          await animate(frames, timing.growMs);
          if (goal) {
            const width = goal.width || target.width * .5;
            const height = goal.height || target.height * .5;
            await animate([
              {transform: pose(x, y), opacity: 1},
              {transform: pose(goal.left + (width - target.width) / 2,
                goal.top + (height - target.height) / 2, width / target.width), opacity: .15}
            ], timing.deliverMs);
          }
        }
        completed = epoch === this.epoch;
      } catch (_) {
        // Reduced motion, missing APIs and interrupted effects never change the saved transaction.
      } finally {
        actor.remove();
        this.actors.delete(actor);
      }
      return completed;
    }
  }

  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {Presentation});
})(globalThis);
