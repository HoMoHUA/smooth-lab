import { clamp, type SmoothLabExtension } from "../core/runtime";

/**
 * Cards start stacked in the middle and fan out along an arc as the row scrolls in.
 *   <div data-sl-fan><article>…</article><article>…</article>…</div>
 * Tune with --sl-fan-angle (default 6deg), --sl-fan-lift (1.25rem) and --sl-fan-gap (1rem).
 * Put hover effects such as data-sl-tilt on an element inside each card, not on the card.
 */
export const fan: SmoothLabExtension = {
  name: "fan",
  mount(element, { reducedMotion, onFrame }) {
    const cards = () => Array.from(element.children) as HTMLElement[];
    const measure = () => {
      const center = element.clientWidth / 2;
      const list = cards();
      list.forEach((card) => {
        const dx = center - (card.offsetLeft + card.offsetWidth / 2);
        const offset = -dx / Math.max(card.offsetWidth, 1);
        card.style.setProperty("--sl-fan-dx", `${dx}px`);
        card.style.setProperty("--sl-fan-o", offset.toFixed(3));
        card.style.setProperty("--sl-fan-o2", Math.abs(offset).toFixed(3));
        card.style.zIndex = String(100 - Math.round(Math.abs(offset) * 10));
      });
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    if (reducedMotion) {
      element.style.setProperty("--sl-fan-p", "1");
      return () => resize.disconnect();
    }
    const stop = onFrame(() => {
      const rect = element.getBoundingClientRect();
      const raw = clamp((window.innerHeight - rect.top) / (window.innerHeight * 0.75), 0, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      element.style.setProperty("--sl-fan-p", eased.toFixed(4));
    });
    return () => {
      stop();
      resize.disconnect();
    };
  },
};
