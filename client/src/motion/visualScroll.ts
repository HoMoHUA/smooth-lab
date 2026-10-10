import { useLayoutEffect, useRef, type RefObject } from "react";
import { motionValue, useTransform, type MotionValue } from "framer-motion";

/**
 * The scroll position the user actually sees. Home's smooth scroll moves the page with a
 * transform, so window.scrollY runs ahead of the picture; Home writes the visual position here
 * every frame (and the native one when smooth scroll is off).
 */
export const visualScrollY = motionValue(typeof window === "undefined" ? 0 : window.scrollY);

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Document offset ignoring transforms (offsetTop walks layout boxes, not painted ones). */
function documentTop(element: HTMLElement) {
  let top = 0;
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop;
  return top;
}

function useBox(ref: RefObject<HTMLElement | null>) {
  const box = useRef({ top: 0, height: 1 });
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => (box.current = { top: documentTop(element), height: element.offsetHeight || 1 });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref]);
  return box;
}

/** 0 when the element's top meets the viewport bottom, 1 when its bottom leaves the top. */
export function useViewportProgress(ref: RefObject<HTMLElement | null>): MotionValue<number> {
  const box = useBox(ref);
  return useTransform(visualScrollY, (y) => clamp((y + window.innerHeight - box.current.top) / (window.innerHeight + box.current.height)));
}

/**
 * Pinning without position: sticky (which cannot work inside a transformed scroller).
 * Returns progress through a tall track (0 → 1) and the offset that keeps a child pinned.
 */
export function usePinnedTrack(ref: RefObject<HTMLElement | null>) {
  const box = useBox(ref);
  const travel = () => Math.max(1, box.current.height - window.innerHeight);
  const progress = useTransform(visualScrollY, (y) => clamp((y - box.current.top) / travel()));
  const offset = useTransform(visualScrollY, (y) => Math.min(travel(), Math.max(0, y - box.current.top)));
  return { progress, offset };
}
