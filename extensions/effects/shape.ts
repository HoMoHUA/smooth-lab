import { numberOption, viewportProgress, type SmoothLabExtension } from "../core/runtime";

/**
 * Labs-style decorative shapes.
 *   <div data-sl-shapes>
 *     <i data-sl-shape="hexagon" data-sl-shape-color="1" data-sl-depth="0.6"
 *        style="--sl-x: 8%; --sl-y: 20%; --sl-size: 14rem"></i>
 *   </div>
 * Shapes: circle | square | hexagon | clover | pill. Colors 1–5 map to --sl-color-shape-*.
 * Inside [data-sl-shapes] a shape is absolutely placed and floats; data-sl-depth adds
 * scroll parallax (positive = moves up faster). data-sl-float="drift" floats without rotating.
 */
export const shape: SmoothLabExtension = {
  name: "shape",
  mount(element, { reducedMotion, onFrame }) {
    // Desynchronise the float loops so a field of shapes never moves in lockstep.
    element.style.setProperty("--sl-float-offset", `${-(Math.abs(hash(element.outerHTML)) % 9000)}ms`);
    const depth = numberOption(element, "depth", 0);
    if (reducedMotion || !depth) return;
    const field = element.closest("[data-sl-shapes]") ?? element.parentElement ?? element;
    return onFrame(() => {
      element.style.setProperty("--sl-shape-scroll", `${(0.5 - viewportProgress(field)) * depth * 240}px`);
    });
  },
};

function hash(text: string) {
  let value = 0;
  for (let index = 0; index < text.length; index++) value = (value * 31 + text.charCodeAt(index)) | 0;
  return value;
}
