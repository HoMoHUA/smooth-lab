import { numberOption, setState, type SmoothLabExtension } from "../core/runtime";

/**
 * <div data-sl-reveal>…</div>
 * <ul data-sl-reveal data-sl-stagger="110"><li>…</li></ul>  — children enter one after another
 * Options: data-sl-reveal-delay (ms)
 */
export const reveal: SmoothLabExtension = {
  name: "reveal",
  mount(element, { reducedMotion, onEnter }) {
    const stagger = numberOption(element, "stagger", -1);
    if (stagger >= 0) {
      Array.from(element.children).forEach((child, index) => (child as HTMLElement).style.setProperty("--sl-delay", `${index * stagger}ms`));
    } else {
      element.style.setProperty("--sl-delay", `${numberOption(element, "reveal-delay", 0)}ms`);
    }
    if (reducedMotion) {
      setState(element, "visible");
      return;
    }
    setState(element, "hidden");
    return onEnter(element, () => setState(element, "visible"));
  },
};
