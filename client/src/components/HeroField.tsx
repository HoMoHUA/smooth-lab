/* Style reminder: میدان آرام — ذرات علمی ظریف، رنگ Pulse Cobalt و واکنش جرم‌دار به موس. */
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  hue: number;
};

export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !cursor || !host) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles: Particle[] = [];
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    const ghost = { x: -120, y: -120, targetX: -120, targetY: -120 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
    const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 1.65 + 0.42,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.42 ? 224 : 259,
    });

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.length = 0;
      const count = clamp(Math.floor((width * height) / 5600), 145, 440);
      for (let index = 0; index < count; index += 1) particles.push(createParticle());
      pointer.x = width * 0.6;
      pointer.y = height * 0.49;
      pointer.targetX = pointer.x;
      pointer.targetY = pointer.y;
    };

    const drawParticle = (particle: Particle, time: number) => {
      const brightness = Math.sin(time * 0.0015 + particle.phase) * 0.18 + 0.71;
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(Math.atan2(particle.vy, particle.vx) + particle.phase);
      context.globalAlpha = brightness;
      context.fillStyle = `hsl(${particle.hue} 86% 57%)`;
      context.beginPath();
      context.ellipse(0, 0, particle.size * 0.6, particle.size * 2.15, 0, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const updateParticle = (particle: Particle, time: number) => {
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.hypot(dx, dy) || 1;
      const radius = 205;
      const idleX = Math.sin(time * 0.0003 + particle.phase) * 0.015;
      const idleY = Math.cos(time * 0.00026 + particle.phase) * 0.015;

      if (pointer.active && distance < radius) {
        const force = (1 - distance / radius) ** 2;
        particle.vx += (dx / distance) * force * 0.94;
        particle.vy += (dy / distance) * force * 0.94;
      }

      particle.vx = (particle.vx + idleX) * 0.966;
      particle.vy = (particle.vy + idleY) * 0.966;
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -14 || particle.x > width + 14 || particle.y < -14 || particle.y > height + 14) {
        Object.assign(particle, createParticle());
      }
    };

    const drawOrbit = (time: number) => {
      const radius = 72 + Math.sin(time * 0.0024) * 6;
      context.save();
      context.translate(pointer.x, pointer.y);
      context.strokeStyle = "rgba(49, 92, 255, 0.3)";
      context.lineWidth = 1;
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.stroke();
      context.strokeStyle = "rgba(119, 91, 248, 0.62)";
      context.lineWidth = 1.4;
      context.setLineDash([8, 15]);
      context.lineDashOffset = -time * 0.024;
      context.beginPath();
      context.arc(0, 0, radius + 9, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    };

    const animate = (time: number) => {
      const delta = Math.min(time - lastTime, 40);
      lastTime = time;
      const idleX = width * 0.62 + Math.sin(time * 0.00042) * width * 0.09;
      const idleY = height * 0.52 + Math.cos(time * 0.00036) * height * 0.075;
      pointer.x = lerp(pointer.x, pointer.active ? pointer.targetX : idleX, 0.055);
      pointer.y = lerp(pointer.y, pointer.active ? pointer.targetY : idleY, 0.055);
      ghost.x = lerp(ghost.x, ghost.targetX, 0.16);
      ghost.y = lerp(ghost.y, ghost.targetY, 0.16);
      cursor.style.transform = `translate3d(${ghost.x}px, ${ghost.y}px, 0) translate(-50%, -50%) scale(${pointer.active ? 1 : 0.68})`;

      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        updateParticle(particle, time + delta);
        drawParticle(particle, time);
      });
      drawOrbit(time);
      frame = requestAnimationFrame(animate);
    };

    const move = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointer.targetX = event.clientX - bounds.left;
      pointer.targetY = event.clientY - bounds.top;
      ghost.targetX = event.clientX;
      ghost.targetY = event.clientY;
    };

    const enter = () => {
      pointer.active = true;
      cursor.classList.add("is-visible");
    };

    const leave = () => {
      pointer.active = false;
      cursor.classList.remove("is-visible");
    };

    resize();
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    window.addEventListener("resize", resize);

    if (media.matches) {
      particles.forEach((particle) => drawParticle(particle, 0));
    } else {
      animate(0);
    }

    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
      <div ref={cursorRef} className="pointer-ghost" aria-hidden="true" />
    </>
  );
}
