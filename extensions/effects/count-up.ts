import { clamp, numberOption, attr, type SmoothLabExtension } from "../core/runtime";

/**
 * <strong data-sl-count-up="98" data-sl-count-decimals="1" data-sl-count-locale="fa-IR">0</strong>
 * Options: data-sl-count-duration (ms, default 2800), data-sl-count-locale (default: page lang).
 */
export const countUp: SmoothLabExtension = {
  name: "count-up",
  mount(element, { reducedMotion, onEnter }) {
    const target = numberOption(element, "count-up", 0);
    const decimals = numberOption(element, "count-decimals", 0);
    const duration = numberOption(element, "count-duration", 2800);
    const locale = element.getAttribute(attr("count-locale")) || document.documentElement.lang || undefined;
    const format = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const write = (value: number) => (element.textContent = format.format(value));
    if (reducedMotion) {
      write(target);
      return;
    }
    write(0);
    let frame = 0;
    const stop = onEnter(
      element,
      () => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = clamp((now - start) / duration, 0, 1);
          write(target * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.45, rootMargin: "0px" },
    );
    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  },
};
