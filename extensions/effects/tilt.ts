import { numberOption, type SmoothLabExtension } from "../core/runtime";

/**
 * 3D tilt toward the pointer with a moving glare (premium card hover).
 *   <div data-sl-tilt="8">…</div>   (max angle in degrees, default 8)
 * Writes --sl-tilt-x/y and --sl-glare-x/y; fine pointers only.
 */
export const tilt: SmoothLabExtension = {
  name: "tilt",
  mount(element, { reducedMotion }) {
    if (reducedMotion || !window.matchMedia?.("(pointer: fine)").matches) return;
    const max = numberOption(element, "tilt", 8);
    const state = { x: 0, y: 0, tx: 0, ty: 0 };
    let frame = 0;
    const step = () => {
      state.x += (state.tx - state.x) * 0.14;
      state.y += (state.ty - state.y) * 0.14;
      element.style.setProperty("--sl-tilt-x", `${(-state.y * max).toFixed(2)}deg`);
      element.style.setProperty("--sl-tilt-y", `${(state.x * max).toFixed(2)}deg`);
      element.style.setProperty("--sl-glare-x", `${((state.x + 1) * 50).toFixed(1)}%`);
      element.style.setProperty("--sl-glare-y", `${((state.y + 1) * 50).toFixed(1)}%`);
      const settled = Math.abs(state.tx - state.x) < 0.002 && Math.abs(state.ty - state.y) < 0.002;
      frame = settled ? 0 : requestAnimationFrame(step);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };
    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      state.tx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      state.ty = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      element.setAttribute("data-sl-state", "active");
      kick();
    };
    const leave = () => {
      state.tx = 0;
      state.ty = 0;
      element.removeAttribute("data-sl-state");
      kick();
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  },
};
