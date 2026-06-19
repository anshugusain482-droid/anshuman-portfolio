import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  MotionValue,
} from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Card data ────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: "ux-research",
    title: "UX Research",
    metric: "30+",
    metricLabel: "Interviews Conducted",
    tagline: "Decisions rooted in evidence, never assumption.",
    tags: ["User Interviews", "Usability Testing", "Journey Mapping"],
    accent: "#E6FF4D",
    size: "featured" as const,
  },
  {
    id: "interaction",
    title: "Interaction Design",
    metric: "Zero",
    metricLabel: "Accidental Clicks",
    tagline: "Every tap, swipe, hover — deliberate.",
    tags: ["Micro-interactions", "Flow Design"],
    accent: "#A78BFA",
    size: "normal" as const,
  },
  {
    id: "design-systems",
    title: "Design Systems",
    metric: "50+",
    metricLabel: "Components Built",
    tagline: "Scalable libraries that let teams ship faster.",
    tags: ["Figma Libraries", "Tokens"],
    accent: "#06B6D4",
    size: "normal" as const,
  },
  {
    id: "motion",
    title: "Motion Design",
    metric: "Every",
    metricLabel: "Frame Intentional",
    tagline: "Meaningful motion, not decoration.",
    tags: ["Framer Motion", "Lottie", "GSAP"],
    accent: "#F59E0B",
    size: "wide" as const,
  },
  {
    id: "prototyping",
    title: "Prototyping",
    metric: "< 1 day",
    metricLabel: "Concept → Clickable",
    tagline: "Validate before a single line of code.",
    tags: ["High-Fidelity", "Figma"],
    accent: "#34D399",
    size: "normal" as const,
  },
  {
    id: "product",
    title: "Product Thinking",
    metric: "Why",
    metricLabel: "Behind Every Decision",
    tagline: "Design aligned with business and user outcomes.",
    tags: ["OKRs", "Jobs-to-be-Done"],
    accent: "#F472B6",
    size: "wide" as const,
  },
  {
    id: "accessibility",
    title: "Accessibility",
    metric: "AA",
    metricLabel: "WCAG Compliant",
    tagline: "Inclusive by design, not afterthought.",
    tags: ["WCAG 2.2", "Screen Readers"],
    accent: "#60A5FA",
    size: "normal" as const,
  },
] as const;

const GRID_AREA: Record<string, string> = {
  "ux-research": "featured",
  interaction: "interaction",
  "design-systems": "systems",
  motion: "motion",
  prototyping: "proto",
  product: "product",
  accessibility: "access",
};

// ─── Spotlight hook ───────────────────────────────────────────────────────────
function useCardSpotlight() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smX = useSpring(mx, { stiffness: 180, damping: 24 });
  const smY = useSpring(my, { stiffness: 180, damping: 24 });
  const rotateX = useTransform(smY, [0, 1], [5, -5]);
  const rotateY = useTransform(smX, [0, 1], [-5, 5]);
  const spotX = useTransform(smX, [0, 1], [0, 100]);
  const spotY = useTransform(smY, [0, 1], [0, 100]);
  return { mx, my, smX, smY, rotateX, rotateY, spotX, spotY };
}

// ─── Spotlight overlay ────────────────────────────────────────────────────────
function Spotlight({
  spotX,
  spotY,
  accent,
  visible,
}: {
  spotX: MotionValue<number>;
  spotY: MotionValue<number>;
  accent: string;
  visible: boolean;
}) {
  const bg = useTransform(
    [spotX, spotY] as MotionValue[],
    ([x, y]: number[]) =>
      `radial-gradient(260px circle at ${x}% ${y}%, ${accent}22 0%, transparent 68%)`
  );
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none rounded-2xl"
      style={{ background: bg }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}

// ─── BentoCard wrapper ────────────────────────────────────────────────────────
function BentoCard({
  card,
  index,
  children,
}: {
  card: (typeof CARDS)[number];
  index: number;
  children: (hovered: boolean) => React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { mx, my, rotateX, rotateY, spotX, spotY } = useCardSpotlight();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    },
    [mx, my]
  );

  const onMouseLeave = useCallback(() => {
    setHovered(false);
    mx.set(0.5);
    my.set(0.5);
  }, [mx, my]);

  const delay = 0.07 + index * 0.055;

  return (
    <motion.div
      style={{ gridArea: GRID_AREA[card.id] }}
      initial={{ opacity: 0, y: 44, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          height: "100%",
          willChange: "transform",
          background: "rgba(9,9,9,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        animate={{
          scale: hovered ? 1.016 : 1,
          boxShadow: hovered
            ? `0 28px 72px rgba(0,0,0,0.65), 0 0 0 1px ${card.accent}30`
            : `0 4px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07)`,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden cursor-default"
      >
        {/* Ambient bottom glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at 50% 110%, ${card.accent}16 0%, transparent 60%)`,
          }}
        />

        {/* Mouse spotlight */}
        <Spotlight spotX={spotX} spotY={spotY} accent={card.accent} visible={hovered} />

        {/* Hover border highlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ border: `1px solid ${card.accent}` }}
          animate={{ opacity: hovered ? 0.28 : 0 }}
          transition={{ duration: 0.35 }}
        />
        {/* Static border */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        />

        {/* Content */}
        <div className="relative z-10 h-full">{children(hovered)}</div>
      </motion.div>
    </motion.div>
  );
}

// ─── Featured card content (2×2, UX Research) ─────────────────────────────────
function FeaturedContent({
  card,
  hovered,
}: {
  card: (typeof CARDS)[number];
  hovered: boolean;
}) {
  return (
    <div className="flex flex-col h-full p-9">
      {/* Top row */}
      <div className="flex items-start justify-between mb-auto">
        <div>
          <p
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: card.accent,
              marginBottom: 10,
            }}
          >
            Featured
          </p>
          <h3
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
              letterSpacing: "-0.03em",
              color: "#F5F5F5",
              lineHeight: 1.1,
            }}
          >
            {card.title}
          </h3>
        </div>

        {/* Animated ring icon */}
        <motion.div
          animate={{ rotate: hovered ? 90 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            border: `1.5px solid ${card.accent}45`,
            background: `${card.accent}0e`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: card.accent,
            flexShrink: 0,
          }}
        >
          ◉
        </motion.div>
      </div>

      {/* Large metric */}
      <div className="my-10">
        <div
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(5rem, 9vw, 8rem)",
            letterSpacing: "-0.055em",
            lineHeight: 1,
            color: card.accent,
          }}
        >
          {card.metric}
        </div>
        <p
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.08em",
            marginTop: 6,
            textTransform: "uppercase",
          }}
        >
          {card.metricLabel}
        </p>
      </div>

      {/* Bottom: tagline + tags */}
      <div>
        <p
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 15,
            color: "rgba(255,255,255,0.62)",
            lineHeight: 1.65,
            marginBottom: 18,
            maxWidth: "28ch",
          }}
        >
          {card.tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {card.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 10,
                letterSpacing: "0.05em",
                color: "rgba(255,255,255,0.38)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 100,
                padding: "4px 11px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Dot matrix decoration */}
      <div
        aria-hidden
        className="absolute bottom-9 right-9 pointer-events-none"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 7,
          opacity: hovered ? 0.28 : 0.14,
          transition: "opacity 0.4s ease",
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: card.accent,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Wide card content (2×1) ──────────────────────────────────────────────────
function WideContent({
  card,
  hovered,
}: {
  card: (typeof CARDS)[number];
  hovered: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between h-full gap-8"
      style={{ padding: "26px 32px" }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-3">
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: card.accent,
              boxShadow: `0 0 8px ${card.accent}70`,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: card.accent,
            }}
          >
            {card.title}
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(0.9rem, 1.35vw, 1.1rem)",
            letterSpacing: "-0.02em",
            color: "#F0F0F0",
            lineHeight: 1.45,
            marginBottom: 14,
          }}
        >
          {card.tagline}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {card.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 10,
                color: "rgba(255,255,255,0.32)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 100,
                padding: "3px 9px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="text-right shrink-0">
        <div
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 3.2vw, 3rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: card.accent,
          }}
        >
          {card.metric}
        </div>
        <p
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 10,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.06em",
            marginTop: 5,
            textAlign: "right",
          }}
        >
          {card.metricLabel}
        </p>
      </div>
    </div>
  );
}

// ─── Normal card content (1×1) ────────────────────────────────────────────────
function NormalContent({
  card,
  hovered,
}: {
  card: (typeof CARDS)[number];
  hovered: boolean;
}) {
  return (
    <div className="flex flex-col h-full" style={{ padding: "28px" }}>
      {/* Icon dot */}
      <motion.div
        animate={{
          scale: hovered ? 1.15 : 1,
          boxShadow: hovered ? `0 0 16px ${card.accent}55` : "none",
        }}
        transition={{ duration: 0.35 }}
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: `1.5px solid ${card.accent}35`,
          background: `${card.accent}10`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 22,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: card.accent,
            opacity: 0.85,
          }}
        />
      </motion.div>

      {/* Metric */}
      <div
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: card.accent,
          marginBottom: 4,
        }}
      >
        {card.metric}
      </div>
      <p
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 9,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 18,
        }}
      >
        {card.metricLabel}
      </p>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.06)",
          marginBottom: 18,
        }}
      />

      {/* Title + tagline */}
      <h3
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: "-0.01em",
          color: "#EBEBEB",
          marginBottom: 7,
        }}
      >
        {card.title}
      </h3>
      <p
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 12,
          color: "rgba(255,255,255,0.38)",
          lineHeight: 1.65,
          flex: 1,
        }}
      >
        {card.tagline}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-5">
        {card.tags.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 10,
              color: "rgba(255,255,255,0.28)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 100,
              padding: "3px 9px",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ExpertiseSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="expertise" className="relative py-32 overflow-hidden">
      {/* Ambient section glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(230,255,77,0.045) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-8">
        {/* ── Header ── */}
        <div ref={headingRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex items-center gap-3 mb-5"
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#E6FF4D",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 10,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#8A8A8A",
              }}
            >
              Chapter 05 — What I Bring
            </span>
          </motion.div>

          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "108%", opacity: 0 }}
              animate={headingInView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                letterSpacing: "-0.04em",
                color: "#F5F5F5",
                lineHeight: 1.0,
                margin: 0,
              }}
            >
              Why hire me
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 14,
              color: "#8A8A8A",
              marginTop: 14,
              maxWidth: "42ch",
              lineHeight: 1.75,
            }}
          >
            A complete UX toolkit — from research to launch. Every skill paired with a real outcome.
          </motion.p>
        </div>

        {/* ── Bento Grid ── */}
        <div
          className="expertise-bento-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "320px 160px 200px",
            gridTemplateAreas: `
              "featured featured interaction systems"
              "featured featured motion    motion   "
              "proto    product  product   access   "
            `,
            gap: 10,
          }}
        >
          {CARDS.map((card, i) => (
            <BentoCard key={card.id} card={card} index={i}>
              {(hovered) =>
                card.size === "featured" ? (
                  <FeaturedContent card={card} hovered={hovered} />
                ) : card.size === "wide" ? (
                  <WideContent card={card} hovered={hovered} />
                ) : (
                  <NormalContent card={card} hovered={hovered} />
                )
              }
            </BentoCard>
          ))}
        </div>

        {/* ── Footer note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="flex items-center justify-between mt-8"
        >
          <p
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.18)",
              letterSpacing: "0.06em",
            }}
          >
            Hover each card to explore
          </p>
          <div className="flex items-center gap-3">
            <div
              style={{ width: 20, height: 1, background: "rgba(255,255,255,0.1)" }}
            />
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.06em",
              }}
            >
              7 disciplines
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
