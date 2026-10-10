import { attr, type SmoothLabExtension } from "../core/runtime";

/**
 * Letters change color where a shape passes behind them (labs.google headline effect).
 *   <div data-sl-shapes>
 *     <i data-sl-shape="circle" data-sl-tint="#d01884" …></i>
 *     <h2 data-sl-shape-text>Be the first to experiment</h2>
 *   </div>
 * Every shape with data-sl-tint inside the same [data-sl-shapes] field gets its own tinted
 * copy of the text, clipped live to the shape's outline.
 */
export const shapeText: SmoothLabExtension = {
  name: "shape-text",
  mount(element, { whileVisible }) {
    const field = element.closest("[data-sl-shapes]");
    if (!field) return;
    const sources = Array.from(field.querySelectorAll<HTMLElement>(`[${attr("shape")}][${attr("tint")}]`));
    if (!sources.length) return;
    element.style.position ||= "relative";
    const markup = element.innerHTML;
    const layers = sources.map((source) => {
      const layer = document.createElement("span");
      layer.setAttribute("data-sl-tint-layer", "");
      layer.setAttribute("aria-hidden", "true");
      layer.style.color = source.getAttribute(attr("tint")) || "currentColor";
      layer.innerHTML = markup;
      element.append(layer);
      return { source, layer };
    });
    const stop = whileVisible(element, () => {
      const box = element.getBoundingClientRect();
      layers.forEach(({ source, layer }) => {
        const rect = source.getBoundingClientRect();
        const x = rect.left - box.left;
        const y = rect.top - box.top;
        layer.style.clipPath = clipFor(source.getAttribute(attr("shape")) ?? "", x, y, rect.width, rect.height);
      });
    });
    return () => {
      stop();
      layers.forEach(({ layer }) => layer.remove());
    };
  },
};

function clipFor(kind: string, x: number, y: number, w: number, h: number) {
  if (kind === "circle") return `circle(${w / 2}px at ${x + w / 2}px ${y + h / 2}px)`;
  if (kind === "hexagon") {
    const points = [[0.5, 0.05], [0.89, 0.27], [0.89, 0.73], [0.5, 0.95], [0.11, 0.73], [0.11, 0.27]];
    return `polygon(${points.map(([px, py]) => `${x + px * w}px ${y + py * h}px`).join(", ")})`;
  }
  const round = kind === "pill" ? h / 2 : Math.min(w, h) * (kind === "clover" ? 0.36 : 0.22);
  return `inset(${y}px calc(100% - ${x + w}px) calc(100% - ${y + h}px) ${x}px round ${round}px)`;
}
