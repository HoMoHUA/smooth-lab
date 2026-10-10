/*
 * Smooth Lab runtime: discovers [data-sl-*] elements inside a root, mounts the
 * matching extension once per element, and shares one IntersectionObserver
 * pool and one rAF scroll loop between all of them. It never touches elements
 * that do not opt in, so it can run on top of any host site.
 */

export type Cleanup = () => void;

export type ExtensionContext = {
  /** True when the user prefers reduced motion. Extensions jump to their end state. */
  reducedMotion: boolean;
  /** Run `callback` once when `element` enters the viewport. */
  onEnter: (element: Element, callback: () => void, options?: { threshold?: number; rootMargin?: string }) => Cleanup;
  /** Run `callback` on every animation frame while the page scrolls or resizes. */
  onFrame: (callback: () => void) => Cleanup;
};

export type SmoothLabExtension = {
  /** Attribute suffix: name "reveal" matches [data-sl-reveal]. */
  name: string;
  mount: (element: HTMLElement, context: ExtensionContext) => Cleanup | void;
};

export type SmoothLabOptions = {
  root?: ParentNode;
  extensions: SmoothLabExtension[];
  /** Watch the root for elements added later (SPA hosts). Default true. */
  observeMutations?: boolean;
};

export type SmoothLabInstance = {
  /** Mount extensions on any new matching elements. Called automatically on DOM changes. */
  refresh: () => void;
  destroy: () => void;
};

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** 0 when the element's top reaches the bottom of the viewport, 1 when its bottom leaves the top. */
export const viewportProgress = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);
};

export const attr = (name: string) => `data-sl-${name}`;

/** Reads a numeric data-sl-* option, falling back when absent or invalid. */
export const numberOption = (element: HTMLElement, name: string, fallback: number) => {
  const value = Number(element.getAttribute(attr(name)) ?? "");
  return element.hasAttribute(attr(name)) && Number.isFinite(value) ? value : fallback;
};

const STATE = attr("state");
export const setState = (element: Element, state: string) => element.setAttribute(STATE, state);

function createScheduler() {
  const frameCallbacks = new Set<() => void>();
  const observers = new Map<string, IntersectionObserver>();
  const enterCallbacks = new WeakMap<Element, Set<() => void>>();
  let frame = 0;

  const run = () => {
    frame = 0;
    frameCallbacks.forEach((callback) => callback());
  };
  const request = () => {
    if (!frame) frame = requestAnimationFrame(run);
  };

  const onFrame = (callback: () => void): Cleanup => {
    if (frameCallbacks.size === 0) {
      window.addEventListener("scroll", request, { passive: true });
      window.addEventListener("resize", request);
    }
    frameCallbacks.add(callback);
    request();
    return () => {
      frameCallbacks.delete(callback);
      if (frameCallbacks.size === 0) {
        window.removeEventListener("scroll", request);
        window.removeEventListener("resize", request);
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      }
    };
  };

  const onEnter: ExtensionContext["onEnter"] = (element, callback, options = {}) => {
    const threshold = options.threshold ?? 0.12;
    const rootMargin = options.rootMargin ?? "0px 0px -8% 0px";
    const key = `${threshold}|${rootMargin}`;
    let observer = observers.get(key);
    if (!observer) {
      observer = new IntersectionObserver(
        (entries, self) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            self.unobserve(entry.target);
            enterCallbacks.get(entry.target)?.forEach((fn) => fn());
            enterCallbacks.delete(entry.target);
          });
        },
        { threshold, rootMargin },
      );
      observers.set(key, observer);
    }
    const callbacks = enterCallbacks.get(element) ?? new Set();
    callbacks.add(callback);
    enterCallbacks.set(element, callbacks);
    observer.observe(element);
    return () => {
      callbacks.delete(callback);
      if (callbacks.size === 0) observer.unobserve(element);
    };
  };

  const destroy = () => {
    observers.forEach((observer) => observer.disconnect());
    observers.clear();
    frameCallbacks.clear();
    window.removeEventListener("scroll", request);
    window.removeEventListener("resize", request);
    if (frame) cancelAnimationFrame(frame);
  };

  return { onFrame, onEnter, destroy };
}

export function createSmoothLab({ root = document, extensions, observeMutations = true }: SmoothLabOptions): SmoothLabInstance {
  const reducedMotion = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scheduler = createScheduler();
  const context: ExtensionContext = { reducedMotion, onEnter: scheduler.onEnter, onFrame: scheduler.onFrame };
  const mounted = new Map<HTMLElement, Map<string, Cleanup | void>>();

  const refresh = () => {
    // Unmount elements that left the DOM.
    mounted.forEach((byName, element) => {
      if (element.isConnected) return;
      byName.forEach((cleanup) => cleanup?.());
      mounted.delete(element);
    });
    extensions.forEach((extension) => {
      root.querySelectorAll<HTMLElement>(`[${attr(extension.name)}]`).forEach((element) => {
        const byName = mounted.get(element) ?? new Map<string, Cleanup | void>();
        if (byName.has(extension.name)) return;
        byName.set(extension.name, extension.mount(element, context));
        mounted.set(element, byName);
      });
    });
  };

  let mutationObserver: MutationObserver | undefined;
  let pending = 0;
  if (observeMutations && typeof MutationObserver !== "undefined") {
    mutationObserver = new MutationObserver(() => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        refresh();
      });
    });
    mutationObserver.observe(root instanceof Document ? root.documentElement : (root as Node), { childList: true, subtree: true });
  }

  refresh();

  return {
    refresh,
    destroy: () => {
      mutationObserver?.disconnect();
      if (pending) cancelAnimationFrame(pending);
      mounted.forEach((byName) => byName.forEach((cleanup) => cleanup?.()));
      mounted.clear();
      scheduler.destroy();
    },
  };
}
