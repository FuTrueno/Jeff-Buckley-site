import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * RotatingText — cycles phrases with a 3D flip (React Bits "Rotating Text").
 * The widest phrase is rendered invisibly to reserve space, so the line
 * never jumps while the words change.
 */
export default function RotatingText({
  items = [],
  interval = 2600,
  className,
  itemClassName,
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || items.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [items.length, interval, reduceMotion]);

  if (!items.length) return null;

  if (reduceMotion) {
    return <span className={className}>{items[0]}</span>;
  }

  const widest = items.reduce(
    (longest, item) => (item.length > longest.length ? item : longest),
    "",
  );

  return (
    <span className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      <span
        className="invisible col-start-1 row-start-1 whitespace-nowrap"
        aria-hidden="true"
      >
        {widest}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={items[index]}
          className={cn("col-start-1 row-start-1 whitespace-nowrap", itemClassName)}
          initial={{ y: "0.85em", opacity: 0, rotateX: -55 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: "-0.85em", opacity: 0, rotateX: 55 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
