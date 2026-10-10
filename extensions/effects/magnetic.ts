import { numberOption, type SmoothLabExtension } from "../core/runtime";

/**
 * The element leans toward the pointer and springs back on leave.
 *   <a data-sl-magnetic="0.35">…</a>   (strength 0–1, default 0.3)
 * A child marked data-sl-magnetic-inner moves a little further for depth. Fine pointers only.
 */
export const magnetic: SmoothLabExtension = {
  name: "magnetic",
  mount(element, { reducedMotion }) {
    if (reducedMotion || !window.matchMedia?.("(pointer: fine)").matches) return;
    const strength = numberOption(element, "magnetic", 0.3);
    const inner = element.querySelector<HTMLElement>("[data-sl-magnetic-inner]");
    const state = { x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0 };
    let frame = 0;
    const step = () => {
      // Critically-damped-ish spring: snappy follow, one small overshoot on release.
      state.vx = (state.vx + (state.tx - state.x) * 0.16) * 0.72;
      state.vy = (state.vy + (state.ty - state.y) * 0.16) * 0.72;
      state.x += state.vx;
      state.y += state.vy;
      element.style.translate = `${state.x.toFixed(2)}px ${state.y.toFixed(2)}px`;
      if (inner) inner.style.translate = `${(state.x * 0.6).toFixed(2)}px ${(state.y * 0.6).toFixed(2)}px`;
      const settled = Math.abs(state.tx - state.x) < 0.05 && Math.abs(state.ty - state.y) < 0.05 && Math.abs(state.vx) < 0.05;
      frame = settled ? 0 : requestAnimationFrame(step);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };
    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      state.tx = (event.clientX - (rect.left + rect.width / 2)) * strength;
      state.ty = (event.clientY - (rect.top + rect.height / 2)) * strength;
      kick();
    };
    const leave = () => {
      state.tx = 0;
      state.ty = 0;
      kick();
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
      element.style.translate = "";
      if (inner) inner.style.translate = "";
    };
  },
};
