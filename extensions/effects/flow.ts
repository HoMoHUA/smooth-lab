import { setState, type SmoothLabExtension } from "../core/runtime";

const SVG = "http://www.w3.org/2000/svg";

/**
 * Sources connected to a hub by curves that draw in, with signals travelling along them
 * (NotebookLM "How it works").
 *   <div data-sl-flow>
 *     <div data-sl-flow-source>PDF</div> <div data-sl-flow-source>Video</div>
 *     <div data-sl-flow-hub>Answer</div>
 *   </div>
 * Layout is entirely up to the host; curves are measured from wherever the boxes end up.
 */
export const flow: SmoothLabExtension = {
  name: "flow",
  mount(element, { reducedMotion, onEnter, whileVisible }) {
    const hub = element.querySelector<HTMLElement>("[data-sl-flow-hub]");
    const sources = Array.from(element.querySelectorAll<HTMLElement>("[data-sl-flow-source]"));
    if (!hub || !sources.length) return;

    const svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("data-sl-flow-svg", "");
    svg.setAttribute("aria-hidden", "true");
    element.prepend(svg);
    const lines = sources.map((_, index) => {
      const path = document.createElementNS(SVG, "path");
      path.setAttribute("data-sl-flow-line", "");
      path.style.setProperty("--sl-i", String(index));
      const dots = [0, 0.5].map((phase) => {
        const dot = document.createElementNS(SVG, "circle");
        dot.setAttribute("data-sl-flow-dot", "");
        dot.setAttribute("r", "3.5");
        svg.append(dot);
        return { dot, phase };
      });
      svg.prepend(path);
      return { path, dots, length: 0 };
    });

    const layout = () => {
      const box = element.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      const target = hub.getBoundingClientRect();
      sources.forEach((source, index) => {
        const rect = source.getBoundingClientRect();
        const fromLeft = rect.left + rect.width / 2 < target.left + target.width / 2;
        const sx = (fromLeft ? rect.right : rect.left) - box.left;
        const sy = rect.top + rect.height / 2 - box.top;
        const ex = (fromLeft ? target.left : target.right) - box.left;
        const ey = target.top + target.height / 2 - box.top;
        const bend = (ex - sx) * 0.55;
        const line = lines[index];
        line.path.setAttribute("d", `M${sx},${sy} C${sx + bend},${sy} ${ex - bend},${ey} ${ex},${ey}`);
        line.length = typeof line.path.getTotalLength === "function" ? line.path.getTotalLength() : 0;
        line.path.style.setProperty("--sl-flow-length", String(line.length));
      });
    };
    layout();
    const resize = new ResizeObserver(layout);
    resize.observe(element);

    if (reducedMotion) {
      setState(element, "visible");
      return () => {
        resize.disconnect();
        svg.remove();
      };
    }
    setState(element, "hidden");
    const stopEnter = onEnter(element, () => {
      layout();
      setState(element, "visible");
    });
    const stopLoop = whileVisible(element, (time) => {
      if (element.getAttribute("data-sl-state") !== "visible") return;
      lines.forEach(({ path, dots, length }, index) => {
        if (!length) return;
        dots.forEach(({ dot, phase }) => {
          const t = (time / 2600 + phase + index * 0.17) % 1;
          const point = path.getPointAtLength(t * length);
          dot.setAttribute("cx", point.x.toFixed(1));
          dot.setAttribute("cy", point.y.toFixed(1));
          dot.style.opacity = String(Math.sin(t * Math.PI));
        });
      });
    });
    return () => {
      stopEnter();
      stopLoop();
      resize.disconnect();
      svg.remove();
    };
  },
};
