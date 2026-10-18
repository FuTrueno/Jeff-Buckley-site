import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * SplitText — staggered character reveal (React Bits "Split Text" pattern).
 *
 *   <SplitText as="h1" text="A voice that still feels close." />
 *
 * Animates on mount (`trigger="mount"`) or when scrolled into view
 * (`trigger="view"`, the default). Renders plain text when the visitor has
 * asked for reduced motion, and keeps the accessible label intact.
 */
export default function SplitText({
  text,
  as: Tag = "span",
  className,
  delay = 0.08,
  stagger = 0.028,
  duration = 0.9,
  once = true,
  trigger = "view",
}) {
  const reduceMotion = useReducedMotion();
  const words = String(text).split(" ");

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const reveal =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: { once, amount: 0.35 } };

  let charIndex = 0;

  return (
    <Tag className={cn("inline", className)} aria-label={text}>
      {words.map((word, wordIndex) => {
        const characters = (
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, charPosition) => {
              const index = charIndex;
              charIndex += 1;
              return (
                <motion.span
                  key={`${char}-${charPosition}`}
                  className="inline-block will-change-transform"
                  initial={{ y: "0.7em", opacity: 0, rotate: 2.5 }}
                  variants={{ visible: { y: 0, opacity: 1, rotate: 0 } }}
                  transition={{
                    duration,
                    delay: delay + index * stagger,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  {...reveal}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );

        return (
          <Fragment key={`${word}-${wordIndex}`}>
            {characters}
            {wordIndex < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}
