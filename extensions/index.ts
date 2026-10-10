import { createSmoothLab, type SmoothLabExtension, type SmoothLabOptions } from "./core/runtime";
import { arrowLink } from "./effects/arrow-link";
import { carousel } from "./effects/carousel";
import { fan } from "./effects/fan";
import { flow } from "./effects/flow";
import { magnetic } from "./effects/magnetic";
import { pile } from "./effects/pile";
import { rise } from "./effects/rise";
import { shape } from "./effects/shape";
import { shapeText } from "./effects/shape-text";
import { shine } from "./effects/shine";
import { tilt } from "./effects/tilt";
import { countUp } from "./effects/count-up";
import { marker } from "./effects/marker";
import { marquee } from "./effects/marquee";
import { parallax } from "./effects/parallax";
import { reveal } from "./effects/reveal";
import { wordScrub } from "./effects/word-scrub";

export * from "./core/runtime";
export * from "./core/theme";
export { arrowLink, carousel, countUp, fan, flow, magnetic, marker, marquee, parallax, pile, reveal, rise, shape, shapeText, shine, tilt, wordScrub };

// shape-text clones its text, so it runs after rise has split the words it shares a heading with.
export const allExtensions: SmoothLabExtension[] = [
  reveal, rise, marker, marquee, countUp, parallax, wordScrub, arrowLink,
  shape, shapeText, pile, fan, flow, shine, carousel, magnetic, tilt,
];

/** Mounts every bundled extension (or a chosen subset) on `root`. */
export const startSmoothLab = (options: Partial<SmoothLabOptions> = {}) => createSmoothLab({ extensions: allExtensions, ...options });
