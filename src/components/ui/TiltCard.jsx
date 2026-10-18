import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * TiltCard — 3D pointer tilt with a moving glare (React Bits "Tilted Card").
 * Springs keep it smooth; reduced-motion visitors get a static card.
 */
export default function TiltCard({
  children,
  className,
  innerClassName,
  intensity = 6,
  glare = true,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const springX = useSpring(pointerX, { stiffness: 140, damping: 18, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 140, damping: 18, mass: 0.6 });

  const rotateY = useTransform(springX, [0, 1], [-intensity, intensity]);
  const rotateX = useTransform(springY, [0, 1], [intensity, -intensity]);

  const glareX = useTransform(springX, [0, 1], [0, 100]);
  const glareY = useTransform(springY, [0, 1], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 246, 224, 0.22), transparent 52%)`;

  const handlePointerMove = (event) => {
    const node = ref.current;
    if (!node || reduceMotion) return;
    const rect = node.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  if (reduceMotion) {
    return <div className={cn("[perspective:1200px]", className)}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn("group [perspective:1200px]", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className={cn("relative h-full w-full", innerClassName)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {children}
        {glare ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glareBackground }}
          />
        ) : null}
      </motion.div>
    </div>
  );
}
