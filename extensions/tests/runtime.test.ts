import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { allExtensions, connectTheme, createSmoothLab, type SmoothLabInstance } from "../index";

type Entry = Pick<IntersectionObserverEntry, "isIntersecting" | "target">;
const observers: { callback: (entries: Entry[], self: IntersectionObserver) => void; self: IntersectionObserver; targets: Set<Element> }[] = [];

const enterViewport = (element: Element) =>
  observers.forEach(({ callback, self, targets }) => targets.has(element) && callback([{ isIntersecting: true, target: element }], self));

let reduced = false;
let instance: SmoothLabInstance | undefined;

beforeEach(() => {
  observers.length = 0;
  reduced = false;
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      targets = new Set<Element>();
      constructor(callback: (entries: Entry[], self: IntersectionObserver) => void) {
        observers.push({ callback, self: this as unknown as IntersectionObserver, targets: this.targets });
      }
      observe(element: Element) {
        this.targets.add(element);
      }
      unobserve(element: Element) {
        this.targets.delete(element);
      }
      disconnect() {
        this.targets.clear();
      }
    },
  );
  window.matchMedia = ((query: string) => ({ matches: reduced && query.includes("reduce") })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  instance?.destroy();
  instance = undefined;
  document.body.innerHTML = "";
  document.documentElement.removeAttribute("style");
});

const start = (html: string) => {
  document.body.innerHTML = html;
  instance = createSmoothLab({ extensions: allExtensions, observeMutations: false });
  return instance;
};

describe("runtime", () => {
  it("leaves elements without data-sl-* untouched", () => {
    start(`<section id="host"><p>plain</p></section>`);
    expect(document.body.innerHTML).toBe(`<section id="host"><p>plain</p></section>`);
  });

  it("reveal hides until the element enters the viewport, then shows", () => {
    start(`<div data-sl-reveal id="a">hi</div>`);
    const element = document.getElementById("a")!;
    expect(element.getAttribute("data-sl-state")).toBe("hidden");
    enterViewport(element);
    expect(element.getAttribute("data-sl-state")).toBe("visible");
  });

  it("stagger sets an increasing delay on each child", () => {
    start(`<ul data-sl-reveal data-sl-stagger="100"><li></li><li></li><li></li></ul>`);
    const delays = Array.from(document.querySelectorAll("li"), (li) => li.style.getPropertyValue("--sl-delay"));
    expect(delays).toEqual(["0ms", "100ms", "200ms"]);
  });

  it("mounts each element once even when refreshed again", () => {
    const lab = start(`<p data-sl-marker id="m">Key</p>`);
    lab.refresh();
    lab.refresh();
    expect(document.querySelectorAll("#m > [data-sl-marker-text]")).toHaveLength(1);
  });

  it("marquee duplicates content once, hides the copy and strips its hooks", () => {
    start(`<div data-sl-marquee><span data-sl-reveal>A</span><span>B</span></div>`);
    const groups = document.querySelectorAll("[data-sl-marquee-group]");
    expect(groups).toHaveLength(2);
    expect(groups[1].getAttribute("aria-hidden")).toBe("true");
    expect(groups[1].querySelector("[data-sl-reveal]")).toBeNull();
  });

  it("word-scrub splits words for sighted users and restores the text on destroy", () => {
    const lab = start(`<p data-sl-word-scrub id="w">Good motion guides</p>`);
    const element = document.getElementById("w")!;
    expect(element.querySelectorAll("[data-sl-word]")).toHaveLength(3);
    expect(element.getAttribute("aria-label")).toBe("Good motion guides");
    lab.destroy();
    instance = undefined;
    expect(element.innerHTML).toBe("Good motion guides");
  });

  it("reduced motion jumps straight to the final state", () => {
    reduced = true;
    start(`<div data-sl-reveal id="r"></div><b data-sl-count-up="98" data-sl-count-locale="en-US" id="c">0</b>`);
    expect(document.getElementById("r")!.getAttribute("data-sl-state")).toBe("visible");
    expect(document.getElementById("c")!.textContent).toBe("98");
  });

  it("picks up elements added after start when observing mutations", async () => {
    document.body.innerHTML = `<main id="app"></main>`;
    instance = createSmoothLab({ extensions: allExtensions });
    document.getElementById("app")!.innerHTML = `<div data-sl-reveal id="late"></div>`;
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(document.getElementById("late")!.getAttribute("data-sl-state")).toBe("hidden");
  });
});

describe("connectTheme", () => {
  it("maps host tokens onto the contract and restores previous values", () => {
    const root = document.documentElement;
    root.style.setProperty("--sl-color-accent", "red");
    const disconnect = connectTheme({ "color-accent": "var(--brand)", "radius-md": "4px" });
    expect(root.style.getPropertyValue("--sl-color-accent")).toBe("var(--brand)");
    expect(root.style.getPropertyValue("--sl-radius-md")).toBe("4px");
    disconnect();
    expect(root.style.getPropertyValue("--sl-color-accent")).toBe("red");
    expect(root.style.getPropertyValue("--sl-radius-md")).toBe("");
  });
});
