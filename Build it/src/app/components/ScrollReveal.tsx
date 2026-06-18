import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Shared premium easing — used across the entire site
export const SITE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE = SITE_EASE;

// ─── Heading reveal (clip from bottom) ───────────────────────────────────────
// Use for display-size text only. Blur kept minimal to avoid legibility cost.
export function RevealHeading({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <div ref={ref} style={{ overflow: "hidden", ...style }} className={className}>
      <motion.div
        initial={{ y: "105%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.85, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Word-by-word stagger reveal ─────────────────────────────────────────────
export function RevealWords({
  text,
  delay = 0,
  stagger = 0.065,
  className,
  style,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const words = text.split(" ");

  return (
    <span ref={ref} style={style} className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "105%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

// ─── Fade-up block (y + opacity only — no blur on body text) ─────────────────
export function FadeUp({
  children,
  delay = 0,
  distance = 24,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: distance, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Mask reveal (clip-path wipe) — use for images and featured blocks ────────
export function MaskReveal({
  children,
  delay = 0,
  direction = "up",
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left";
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  const initial =
    direction === "up"
      ? { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }
      : { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 };

  const animate =
    direction === "up"
      ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
      : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : {}}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      style={{ willChange: "clip-path", ...style }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger container ────────────────────────────────────────────────────────
export function StaggerContainer({
  children,
  stagger = 0.07,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// y + opacity only — blur removed from stagger items (performance + legibility)
export const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};
