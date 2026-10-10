import { clamp, type SmoothLabExtension } from "../core/runtime";

/**
 * <p data-sl-word-scrub>Good motion turns a static message into a guided experience.</p>
 * Words brighten one by one as the paragraph scrolls through the viewport.
 */
export const wordScrub: SmoothLabExtension = {
  name: "word-scrub",
  mount(element, { reducedMotion, onFrame }) {
    if (reducedMotion) return;
    const source = element.textContent ?? "";
    const words = source.split(/(\s+)/).filter(Boolean);
    element.setAttribute("aria-label", source.trim());
    element.replaceChildren(
      ...words.map((word) => {
        if (/^\s+$/.test(word)) return document.createTextNode(word);
        const span = document.createElement("span");
        span.setAttribute("data-sl-word", "");
        span.setAttribute("aria-hidden", "true");
        span.textContent = word;
        return span;
      }),
    );
    const spans = Array.from(element.querySelectorAll<HTMLElement>("[data-sl-word]"));
    const last = Math.max(spans.length - 1, 1);
    const stop = onFrame(() => {
      const rect = element.getBoundingClientRect();
      const progress = clamp((window.innerHeight * 0.82 - rect.top) / (window.innerHeight * 0.62 + rect.height), 0, 1);
      spans.forEach((span, index) => {
        const local = clamp(progress * 1.65 - (index / last) * 0.65, 0, 1);
        span.style.opacity = String(0.15 + local * 0.85);
      });
    });
    return () => {
      stop();
      element.textContent = source;
      element.removeAttribute("aria-label");
    };
  },
};
