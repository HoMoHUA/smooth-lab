import { numberOption, setState, type SmoothLabExtension } from "../core/runtime";

/**
 * Children fall in with gravity, bounce and settle at their resting angle (the labs.google
 * footer shapes and category chips).
 *   <div data-sl-pile><i data-sl-shape="hexagon" style="--sl-rotate: -8deg"></i>…</div>
 * Options: data-sl-pile-stagger (ms between drops, default 90), data-sl-pile-bounce (0–1, default 0.38).
 */
export const pile: SmoothLabExtension = {
  name: "pile",
  mount(element, { reducedMotion, onEnter }) {
    const items = Array.from(element.children) as HTMLElement[];
    if (reducedMotion || !items.length) {
      setState(element, "visible");
      return;
    }
    const stagger = numberOption(element, "pile-stagger", 90);
    const bounce = numberOption(element, "pile-bounce", 0.38);
    setState(element, "hidden");
    let frame = 0;
    const stop = onEnter(
      element,
      () => {
        const drop = element.getBoundingClientRect().height + window.innerHeight * 0.35;
        const bodies = items.map((item, index) => ({
          item,
          start: index * stagger + Math.random() * 60,
          y: -drop - Math.random() * 120,
          vy: 0,
          spin: (Math.random() - 0.5) * 70,
          done: false,
        }));
        bodies.forEach(({ item, y, spin }) => {
          item.style.translate = `0 ${y}px`;
          item.style.rotate = `calc(var(--sl-rotate, 0deg) + ${spin}deg)`;
        });
        setState(element, "visible");
        let last = performance.now();
        const begin = last;
        const step = (now: number) => {
          const dt = Math.min(32, now - last);
          last = now;
          let active = false;
          bodies.forEach((body) => {
            if (body.done) return;
            active = true;
            if (now - begin < body.start) return;
            body.vy += 0.0042 * dt;
            body.y += body.vy * dt;
            if (body.y >= 0) {
              body.y = 0;
              body.vy = -body.vy * bounce;
              if (Math.abs(body.vy) < 0.08) body.done = true;
            }
            body.spin *= 0.9;
            if (body.done) body.spin = 0;
            body.item.style.translate = body.done ? "" : `0 ${body.y}px`;
            body.item.style.rotate = body.done ? "" : `calc(var(--sl-rotate, 0deg) + ${body.spin}deg)`;
          });
          if (active) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3, rootMargin: "0px" },
    );
    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  },
};
