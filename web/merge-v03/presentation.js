(function (root) {
  'use strict';
  const defaults = {snapMs: 85, growMs: 140, deliverMs: 150, parkMs: 110};
  const pose = (x, y, scale = 1, angle = 0) =>
    'translate3d(' + x + 'px,' + y + 'px,0) scale(' + scale + ') rotate(' + angle + 'deg)';

  /** Disposable visual actors. Simulation never waits for their existence. */
  class Presentation {
    constructor() {
      this.epoch = 0;
      this.actors = new Set();
      this.animations = new Set();
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
      const epoch = this.epoch;
      const reduced = root.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const timing = {...defaults, ...root.TileMergeV03.config};
      const actor = document.createElement('div');
      actor.className = 'delivery-actor';
      actor.setAttribute?.('aria-hidden', 'true');
      const image = document.createElement('img');
      image.src = root.TileMergeV03.asset('puppy');
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
          image.src = root.TileMergeV03.asset('golden');
          actor.classList.add('grown');
          await animate([
            {transform: pose(target.left, target.top, .9, -4)},
            {transform: pose(target.left, target.top, 1.12, 3)},
            {transform: pose(target.left, target.top)}
          ], timing.growMs);
          if (goal) {
            const width = goal.width || target.width * .5;
            const height = goal.height || target.height * .5;
            await animate([
              {transform: pose(target.left, target.top), opacity: 1},
              {transform: pose(goal.left + (width - target.width) / 2,
                goal.top + (height - target.height) / 2, width / target.width), opacity: .12}
            ], timing.deliverMs);
          }
        }
        completed = epoch === this.epoch;
      } catch (_) {
        // Cancelling, leaving the page or missing an animation API never changes rules.
      } finally {
        actor.remove();
        this.actors.delete(actor);
      }
      return completed;
    }
  }

  root.TileMergeV03 = Object.assign(root.TileMergeV03 || {}, {Presentation});
})(globalThis);
