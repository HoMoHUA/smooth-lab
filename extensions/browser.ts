/*
 * Drop-in build for sites without a bundler:
 *   <link rel="stylesheet" href="smooth-lab.css">
 *   <script src="smooth-lab.iife.js" defer></script>
 * Starts automatically; add data-sl-manual to the script tag to call
 * window.SmoothLab.startSmoothLab() yourself.
 */
import * as SmoothLab from "./index";

declare global {
  interface Window {
    SmoothLab: typeof SmoothLab & { instance?: ReturnType<typeof SmoothLab.startSmoothLab> };
  }
}

const script = document.currentScript;
window.SmoothLab = SmoothLab;

if (!script?.hasAttribute("data-sl-manual")) {
  const start = () => (window.SmoothLab.instance = SmoothLab.startSmoothLab());
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
}
