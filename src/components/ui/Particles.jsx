import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

/**
 * Particles — a lightweight canvas field with drifting dust, constellations
 * and cursor repulsion (React Bits "Particles" pattern, dependency-free).
 *
 * Pauses when scrolled out of view or when the tab is hidden, caps the device
 * pixel ratio at 2, and renders a single still frame for reduced motion.
 */
export default function Particles({
  className,
  density = 26000,
  maxCount = 76,
  minCount = 26,
  color = "232, 209, 167",
  linkColor = "200, 169, 107",
  interactionRadius = 140,
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let particles = [];
    let frame = 0;
    let inView = true;

    const spawn = (count) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.5 + 0.12,
        twinkle: Math.random() * Math.PI * 2,
      }));

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((width * height) / density);
      particles = spawn(Math.max(minCount, Math.min(maxCount, count)));
      if (reduceMotion) draw(0);
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Constellation links (O(n^2), but n stays under 80)
      const maxDistanceSq = 130 * 130;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq < maxDistanceSq) {
            ctx.strokeStyle = `rgba(${linkColor}, ${(1 - distanceSq / maxDistanceSq) * 0.14})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const particle of particles) {
        const twinkle = 0.65 + 0.35 * Math.sin(time * 0.0011 + particle.twinkle);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${particle.alpha * twinkle})`;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (time) => {
      if (!inView || document.hidden) {
        frame = requestAnimationFrame(step);
        return;
      }

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < interactionRadius && distance > 0.01) {
          const force = (1 - distance / interactionRadius) * 0.55;
          particle.x += (dx / distance) * force;
          particle.y += (dy / distance) * force;
        }

        if (particle.x < -12) particle.x = width + 12;
        if (particle.x > width + 12) particle.x = -12;
        if (particle.y < -12) particle.y = height + 12;
        if (particle.y > height + 12) particle.y = -12;
      }

      draw(time);
      frame = requestAnimationFrame(step);
    };

    const handlePointerMove = (event) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(wrap);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    resize();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    if (!reduceMotion) frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [color, density, interactionRadius, linkColor, maxCount, minCount]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
