import { numberOption, setState, type SmoothLabExtension } from "../core/runtime";

/**
 * <h2><span data-sl-marker>Key line</span></h2>
 * A highlight bar wipes across the text once, revealing it. Options: data-sl-marker-index
 * (sequence position; each step adds 350ms).
 */
export const marker: SmoothLabExtension = {
  name: "marker",
  mount(element, { reducedMotion, onEnter }) {
    element.style.setProperty("--sl-i", String(numberOption(element, "marker-index", 0)));
    if (!element.querySelector(":scope > [data-sl-marker-text]")) {
      const text = document.createElement("span");
      text.setAttribute("data-sl-marker-text", "");
      text.append(...Array.from(element.childNodes));
      element.append(text);
    }
    if (reducedMotion) {
      setState(element, "done");
      return;
    }
    setState(element, "hidden");
    return onEnter(element, () => setState(element, "visible"));
  },
};
