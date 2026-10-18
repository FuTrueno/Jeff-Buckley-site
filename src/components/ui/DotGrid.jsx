import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

/**
 * DotGrid — a blueprint dot field with a warm spotlight that follows the
 * cursor (React Bits "Dot Grid" pattern, reduced to CSS).
 */
export default function DotGrid({
  className,
  cell = 26,
  opacity = 0.5,
  spotlight = true,
  spotlightColor = "rgba(200, 169, 107, 0.10)",
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!spotlight) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--x", `${event.clientX - rect.left}px`);
      node.style.setProperty("--y", `${event.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [spotlight]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="dot-grid absolute inset-0"
        style={{ backgroundSize: `${cell}px ${cell}px`, opacity }}
      />
      {spotlight ? (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(560px circle at var(--x, 50%) var(--y, 34%), ${spotlightColor}, transparent 70%)`,
          }}
        />
      ) : null}
    </div>
  );
}
