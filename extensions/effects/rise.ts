import { setState, type SmoothLabExtension } from "../core/runtime";

/**
 * Words rise out of a mask with a short blur, one after another (NotebookLM hero entrance).
 *   <h1 data-sl-rise>Understand <em>anything</em></h1>
 * Inline markup is kept; only text nodes are split. Screen readers get the original text.
 */
export const rise: SmoothLabExtension = {
  name: "rise",
  mount(element, { reducedMotion, onEnter }) {
    if (reducedMotion) return;
    const original = element.innerHTML;
    element.setAttribute("aria-label", (element.textContent ?? "").replace(/\s+/g, " ").trim());
    let index = 0;
    const split = (node: Node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) return split(child);
        if (child.nodeType !== Node.TEXT_NODE) return;
        const parts = (child.textContent ?? "").split(/(\s+)/).filter(Boolean);
        const fragment = document.createDocumentFragment();
        parts.forEach((part) => {
          if (/^\s+$/.test(part)) return fragment.append(part);
          const mask = document.createElement("span");
          mask.setAttribute("data-sl-rise-mask", "");
          mask.setAttribute("aria-hidden", "true");
          const word = document.createElement("span");
          word.setAttribute("data-sl-rise-word", "");
          word.style.setProperty("--sl-i", String(index++));
          word.textContent = part;
          mask.append(word);
          fragment.append(mask);
        });
        child.replaceWith(fragment);
      });
    };
    split(element);
    setState(element, "hidden");
    const stop = onEnter(element, () => setState(element, "visible"));
    return () => {
      stop();
      element.innerHTML = original;
      element.removeAttribute("aria-label");
    };
  },
};
