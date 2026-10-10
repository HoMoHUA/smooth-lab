import { numberOption, viewportProgress, type SmoothLabExtension } from "../core/runtime";

/**
 * <figure style="overflow:hidden"><img data-sl-parallax="20" …></figure>
 * Moves the element vertically by ±value/2 percent of its own height across the viewport.
 * Progress is measured on the parent so the clipping frame stays still.
 */
export const parallax: SmoothLabExtension = {
  name: "parallax",
  mount(element, { reducedMotion, onFrame }) {
    if (reducedMotion) return;
    const range = numberOption(element, "parallax", 20);
    const frame = element.parentElement ?? element;
    return onFrame(() => {
      element.style.setProperty("--sl-parallax-y", `${(viewportProgress(frame) - 0.5) * range}%`);
    });
  },
};
