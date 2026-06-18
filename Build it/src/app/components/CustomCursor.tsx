import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Dot follows instantly (no lag — precision pointer)
  const dotX = useSpring(rawX, { stiffness: 1000, damping: 50, mass: 0.1 });
  const dotY = useSpring(rawY, { stiffness: 1000, damping: 50, mass: 0.1 });

  // Ring lags slightly — communicates physicality
  const ringX = useSpring(rawX, { stiffness: 280, damping: 28, mass: 0.5 });
  const ringY = useSpring(rawY, { stiffness: 280, damping: 28, mass: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(!!t.closest("a, button, [data-magnetic]"));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [rawX, rawY, isVisible]);

  return (
    <>
      {/* Precision dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: isHovering ? 0 : 7, height: isHovering ? 0 : 7, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/35 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 52 : 38,
          height: isHovering ? 52 : 38,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
    </>
  );
}
