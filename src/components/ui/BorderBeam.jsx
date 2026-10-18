import { cn } from "../../lib/utils";

/**
 * BorderBeam — a travelling light that traces the card outline.
 * (The Border Beam pattern from Magic UI, reimplemented here on top of React
 * Bits' "Border Glow" idea so it ships with zero extra dependencies. The CSS
 * lives in index.css: `.border-beam` + `@property --beam-angle`.)
 */
export default function BorderBeam({
  children,
  className,
  duration = 7,
  radius = "rounded-[1.75rem]",
}) {
  return (
    <div
      className={cn("border-beam relative isolate", radius, className)}
      style={{ "--beam-duration": `${duration}s` }}
    >
      {children}
    </div>
  );
}
