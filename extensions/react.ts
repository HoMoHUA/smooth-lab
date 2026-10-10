import { useEffect, useRef } from "react";
import { allExtensions, createSmoothLab, type SmoothLabExtension } from "./index";

/**
 * Scopes the runtime to one subtree of a React host:
 *   const ref = useSmoothLab<HTMLElement>();
 *   <section ref={ref}><p data-sl-word-scrub>…</p></section>
 */
export function useSmoothLab<T extends HTMLElement>(extensions: SmoothLabExtension[] = allExtensions) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const instance = createSmoothLab({ root: ref.current, extensions });
    return () => instance.destroy();
    // The extension list is configuration, not state; re-mounting on identity changes would restart every effect.
  }, []);
  return ref;
}
