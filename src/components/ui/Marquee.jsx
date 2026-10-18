import { cn } from "../../lib/utils";

/**
 * Marquee — seamless infinite ticker. Content is rendered twice and the
 * track translates by exactly -50%, so the loop never jumps. Pauses on hover.
 */
export default function Marquee({
  items,
  className,
  itemClassName,
  duration = 46,
  reverse = false,
  separator = "·",
}) {
  const group = (
    <div className="flex flex-none items-center">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center">
          <span className={cn("whitespace-nowrap", itemClassName)}>{item}</span>
          <span aria-hidden="true" className="mx-6 text-bronze-500/45 md:mx-9">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {group}
        {group}
      </div>
    </div>
  );
}
