/*
 * Connects a host design system to the Smooth Lab token contract at runtime.
 * Values can be literal colors or references to the host's own variables, e.g.
 *   connectTheme({ "color-accent": "var(--brand-primary)" })
 */

export type TokenName =
  | "color-accent"
  | "color-accent-contrast"
  | "color-highlight"
  | "color-highlight-contrast"
  | "color-surface"
  | "color-surface-raised"
  | "color-surface-inverse"
  | "color-text"
  | "color-text-inverse"
  | "color-text-muted"
  | "color-border"
  | "color-shape-1"
  | "color-shape-2"
  | "color-shape-3"
  | "color-shape-4"
  | "color-shape-5"
  | "gradient-accent"
  | "font-body"
  | "font-mono"
  | "radius-sm"
  | "radius-md"
  | "radius-lg"
  | "space-1"
  | "space-2"
  | "space-3"
  | "space-4"
  | "ease-out"
  | "ease-in-out"
  | "ease-standard"
  | "duration-enter"
  | "duration-hover"
  | "reveal-distance"
  | "ease-spring";

export type ThemeMap = Partial<Record<TokenName, string>>;

/** Writes the mapping onto `target` (default :root) and returns a function that restores the previous values. */
export function connectTheme(map: ThemeMap, target: HTMLElement = document.documentElement) {
  const previous = new Map<string, string>();
  Object.entries(map).forEach(([name, value]) => {
    if (value === undefined) return;
    const property = `--sl-${name}`;
    previous.set(property, target.style.getPropertyValue(property));
    target.style.setProperty(property, value);
  });
  return () => {
    previous.forEach((value, property) => {
      if (value) target.style.setProperty(property, value);
      else target.style.removeProperty(property);
    });
  };
}
