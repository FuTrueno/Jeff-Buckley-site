import { useRef } from "react";
import { cn } from "../../lib/utils";

/**
 * SpotlightCard — cursor-tracked glow inside a card (React Bits
 * "Spotlight Card"). The pointer position is written to CSS variables so the
 * gradient can follow it without re-rendering React on every mousemove.
 */
export default function SpotlightCard({
  children,
  className,
  as: Tag = "div",
  spotlight = "rgba(200, 169, 107, 0.16)",
  ...rest
}) {
  const ref = useRef(null);

  const handlePointerMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn(
        "group/spot relative overflow-hidden rounded-[1.75rem] border border-white/[0.07]",
        "bg-white/[0.015] transition-colors duration-500 hover:border-white/[0.14]",
        className,
      )}
      {...rest}
    >
      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), ${spotlight}, transparent 70%)`,
        }}
      />
      {/* Top edge highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 z-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
      />
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  );
}
