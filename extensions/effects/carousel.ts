import { attr, numberOption, type SmoothLabExtension } from "../core/runtime";

/**
 * Full-bleed autoplay carousel with progress pills (labs.google hero).
 *   <div data-sl-carousel data-sl-carousel-interval="5500" aria-label="Featured">
 *     <article>…</article><article>…</article>
 *   </div>
 * Timing lives in CSS: the active pill's bar animates for the interval and its animationend
 * advances the slide, so hover, focus and off-screen pausing need no timers. Autoplay is off
 * under reduced motion; the buttons always work.
 */
export const carousel: SmoothLabExtension = {
  name: "carousel",
  mount(element, { reducedMotion }) {
    const slides = Array.from(element.children) as HTMLElement[];
    if (slides.length < 2) return;
    element.style.setProperty("--sl-carousel-interval", `${numberOption(element, "carousel-interval", 5500)}ms`);
    element.setAttribute("role", "region");
    element.setAttribute("aria-roledescription", "carousel");
    if (reducedMotion) element.setAttribute(attr("paused"), "");

    const controls = document.createElement("div");
    controls.setAttribute("data-sl-carousel-controls", "");
    const button = (label: string, glyph: string) => {
      const node = document.createElement("button");
      node.type = "button";
      node.setAttribute("aria-label", label);
      node.innerHTML = `<span aria-hidden="true">${glyph}</span>`;
      return node;
    };
    const previous = button(element.getAttribute(attr("carousel-previous")) || "Previous slide", "‹");
    const next = button(element.getAttribute(attr("carousel-next")) || "Next slide", "›");
    previous.setAttribute("data-sl-carousel-step", "previous");
    next.setAttribute("data-sl-carousel-step", "next");
    const pills = slides.map((_, index) => {
      const pill = button(`${index + 1} / ${slides.length}`, "");
      pill.setAttribute("data-sl-carousel-pill", "");
      pill.innerHTML = "<i></i>";
      return pill;
    });
    const track = document.createElement("div");
    track.setAttribute("data-sl-carousel-pills", "");
    track.append(...pills);
    controls.append(previous, track, next);
    element.append(controls);

    let active = -1;
    const show = (index: number) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, position) => {
        const current = position === active;
        slide.setAttribute("data-sl-carousel-slide", current ? "active" : "");
        slide.setAttribute("aria-hidden", String(!current));
        slide.toggleAttribute("inert", !current);
      });
      pills.forEach((pill, position) => {
        pill.setAttribute("data-sl-carousel-pill", position === active ? "active" : position < active ? "done" : "");
        pill.setAttribute("aria-current", String(position === active));
      });
    };
    show(0);

    const onEnd = (event: AnimationEvent) => {
      if ((event.target as HTMLElement).parentElement?.getAttribute("data-sl-carousel-pill") === "active") show(active + 1);
    };
    track.addEventListener("animationend", onEnd);
    previous.addEventListener("click", () => show(active - 1));
    next.addEventListener("click", () => show(active + 1));
    pills.forEach((pill, index) => pill.addEventListener("click", () => show(index)));

    const visibility = new IntersectionObserver(([entry]) => {
      if (reducedMotion) return;
      element.toggleAttribute(attr("paused"), !entry.isIntersecting);
    });
    visibility.observe(element);

    return () => {
      visibility.disconnect();
      controls.remove();
      slides.forEach((slide) => {
        slide.removeAttribute("data-sl-carousel-slide");
        slide.removeAttribute("aria-hidden");
        slide.removeAttribute("inert");
      });
    };
  },
};
