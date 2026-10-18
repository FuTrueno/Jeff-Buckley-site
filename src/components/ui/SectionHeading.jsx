import { cn } from "../../lib/utils";
import Reveal from "./Reveal";

/** Small mono label with a bronze rule — used above every section heading. */
export function Eyebrow({ children, className, align = "left" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.42em] text-bronze-500",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-bronze-500 to-bronze-500/0" />
      {children}
    </span>
  );
}

/**
 * SectionHeading — the one place the display type scale is defined, so every
 * section lines up on the same rhythm.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
  titleClassName,
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow align={align}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      <div
        className={cn(
          "flex w-full flex-wrap items-end justify-between gap-x-10 gap-y-6",
          align === "center" && "justify-center",
        )}
      >
        <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
          <Reveal delay={0.06} blur>
            <h2
              className={cn(
                "font-display text-[clamp(2.3rem,4.4vw,3.9rem)] leading-[1.02] tracking-[-0.015em] text-ivory-50",
                titleClassName,
              )}
            >
              {title}
            </h2>
          </Reveal>
          {description ? (
            <Reveal delay={0.13}>
              <p
                className={cn(
                  "mt-5 max-w-xl text-[14.5px] leading-relaxed text-mist-400",
                  align === "center" && "mx-auto",
                )}
              >
                {description}
              </p>
            </Reveal>
          ) : null}
        </div>

        {action ? (
          <Reveal delay={0.2} className="shrink-0">
            {action}
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
