import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveal — scroll-triggered fade/rise wrapper (Framer Motion + React Bits
 * "Scroll Reveal" idea). Use it around any block; pass `delay` to stagger
 * sibling reveals.
 */
export default function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 28,
  blur = false,
  once = true,
  amount = 0.3,
  ...rest
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Static = as;
    return (
      <Static className={className} {...rest}>
        {children}
      </Static>
    );
  }

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
