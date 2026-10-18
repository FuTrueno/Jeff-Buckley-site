import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline reading-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-bronze-600/60 via-bronze-300 to-bronze-600/60"
    />
  );
}
