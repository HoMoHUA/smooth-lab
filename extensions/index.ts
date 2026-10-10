import { createSmoothLab, type SmoothLabExtension, type SmoothLabOptions } from "./core/runtime";
import { arrowLink } from "./effects/arrow-link";
import { countUp } from "./effects/count-up";
import { marker } from "./effects/marker";
import { marquee } from "./effects/marquee";
import { parallax } from "./effects/parallax";
import { reveal } from "./effects/reveal";
import { wordScrub } from "./effects/word-scrub";

export * from "./core/runtime";
export * from "./core/theme";
export { arrowLink, countUp, marker, marquee, parallax, reveal, wordScrub };

export const allExtensions: SmoothLabExtension[] = [reveal, marker, marquee, countUp, parallax, wordScrub, arrowLink];

/** Mounts every bundled extension (or a chosen subset) on `root`. */
export const startSmoothLab = (options: Partial<SmoothLabOptions> = {}) => createSmoothLab({ extensions: allExtensions, ...options });
