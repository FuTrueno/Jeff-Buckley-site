import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

const variants = {
  primary:
    "bg-bronze-300 text-ink-950 hover:bg-bronze-200 hover:shadow-[0_0_44px_-10px_rgba(233,211,167,0.65)]",
  ghost:
    "border border-white/12 bg-white/[0.03] text-ivory-100 backdrop-blur-md hover:border-bronze-500/50 hover:bg-white/[0.06] hover:text-white",
  outline:
    "border border-bronze-500/40 text-bronze-300 hover:border-bronze-400 hover:bg-bronze-500/10 hover:text-bronze-200",
  dark: "bg-ink-900 text-ivory-100 border border-white/10 hover:border-white/20 hover:bg-ink-800",
};

/**
 * Button — one API for links, router links and buttons, so CTAs stay
 * consistent across pages.
 */
export default function Button({
  children,
  to,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  ...rest
}) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2.5 rounded-full font-medium uppercase",
    "transition-all duration-300 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50",
    size === "sm"
      ? "px-5 py-2.5 text-[12px] tracking-[0.18em]"
      : "px-7 py-3.5 text-[12px] tracking-[0.2em]",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
