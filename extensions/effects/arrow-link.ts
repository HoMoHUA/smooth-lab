import type { SmoothLabExtension } from "../core/runtime";

/**
 * <a data-sl-arrow-link href="…">Read more <svg …/></a>
 * CSS-only: the underline grows from the inline-start edge and the icon nudges 4px.
 * Registered so the runtime reports it alongside the other extensions.
 */
export const arrowLink: SmoothLabExtension = {
  name: "arrow-link",
  mount() {},
};
