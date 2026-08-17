/* Style reminder: میدان آرام — ابزارهای حرکت باید کوتاه، مستقل و قابل استفادهٔ مجدد باشند. */
export const premiumEffects = [
  "reveal",
  "stagger",
  "marker-wipe",
  "marquee",
  "text-swap",
  "arrow-link",
  "award-rise",
  "accordion",
  "parallax",
  "sticky-stack",
  "cursor-follower",
  "count-up",
  "progressive-blur",
] as const;

export const splitCharacters = (text: string) => Array.from(text).map((character) => (character === " " ? "\u00a0" : character));

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
