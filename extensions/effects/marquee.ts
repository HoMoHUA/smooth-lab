import { numberOption, type SmoothLabExtension } from "../core/runtime";

/**
 * <div data-sl-marquee data-sl-marquee-duration="22"><span>REVEAL</span><span>HOVER</span></div>
 * Content is duplicated once (aria-hidden) and looped. Pauses on hover; static under reduced motion.
 */
export const marquee: SmoothLabExtension = {
  name: "marquee",
  mount(element, { reducedMotion }) {
    element.style.setProperty("--sl-marquee-duration", `${numberOption(element, "marquee-duration", 22)}s`);
    if (reducedMotion || element.querySelector(":scope > [data-sl-marquee-track]")) return;
    const original = Array.from(element.childNodes);
    const track = document.createElement("div");
    track.setAttribute("data-sl-marquee-track", "");
    const first = document.createElement("div");
    first.setAttribute("data-sl-marquee-group", "");
    first.append(...original);
    const copy = first.cloneNode(true) as HTMLElement;
    copy.setAttribute("aria-hidden", "true");
    // The copy must not be mounted as a second set of extensions.
    copy.querySelectorAll("*").forEach((node) => Array.from(node.attributes).forEach(({ name }) => name.startsWith("data-sl-") && node.removeAttribute(name)));
    track.append(first, copy);
    element.append(track);
    return () => {
      element.append(...Array.from(first.childNodes));
      track.remove();
    };
  },
};
