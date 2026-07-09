import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  MotionValue,
} from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Rotating phrases ─────────────────────────────────────────────────────────
const PHRASES = [
  "Designing with intention.",
  "Creating with purpose.",
  "Solving through empathy.",
];

// ─── DNA traits ───────────────────────────────────────────────────────────────

// ─── Static grid background (no looping animations) ──────────────────────────
function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Subtle product-design grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />
      {/* Static ambient glows — depth without movement */}
      <div
        className="absolute"
        style={{
          width: 640,
          height: 640,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.055) 0%, transparent 70%)",
          top: "-10%",
          left: "58%",
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230,255,77,0.035) 0%, transparent 70%)",
          bottom: "5%",
          left: "18%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}


// ─── Section spotlight ────────────────────────────────────────────────────────
function SectionSpotlight({
  spotX,
  spotY,
}: {
  spotX: MotionValue<number>;
  spotY: MotionValue<number>;
}) {
  const bg = useTransform(
    [spotX, spotY] as MotionValue[],
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.032) 0%, transparent 65%)`
  );
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ background: bg }}
      aria-hidden
    />
  );
}

// ─── Rotating headline ────────────────────────────────────────────────────────
function RotatingHeadline() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-120px" });

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % PHRASES.length), 3200);
    return () => clearInterval(t);
  }, [inView]);

  const words = PHRASES[idx].split(" ");

  return (
    <div ref={ref} style={{ minHeight: "clamp(3.5rem, 7vw, 6.5rem)", marginBottom: 6 }}>
      <AnimatePresence mode="wait">
        <motion.h2
          key={idx}
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 4.5vw, 4.2rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "#F5F5F5",
            margin: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: "0.28em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)", transition: { duration: 0.25 } }}
          transition={{ duration: 0.1 }}
        >
          {words.map((word, wi) => (
            <motion.span
              key={wi}
              style={{ display: "inline-block" }}
              initial={{ y: 28, opacity: 0, filter: "blur(6px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: wi * 0.09, ease: EASE }}
            >
              {word === "intention." || word === "purpose." || word === "empathy." ? (
                <span style={{ color: "#E6FF4D", fontStyle: "italic", fontFamily: "'Instrument Serif', serif" }}>
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}

// ─── Tilt card ────────────────────────────────────────────────────────────────
function TiltCard({
  children,
  accent = "rgba(255,255,255,0.08)",
  delay = 0,
}: {
  children: React.ReactNode;
  accent?: string;
  delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smX = useSpring(mx, { stiffness: 160, damping: 22 });
  const smY = useSpring(my, { stiffness: 160, damping: 22 });
  const rotateX = useTransform(smY, [0, 1], [4, -4]);
  const rotateY = useTransform(smX, [0, 1], [-4, 4]);
  const spotX = useTransform(smX, [0, 1], [0, 100]);
  const spotY = useTransform(smY, [0, 1], [0, 100]);

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

  const spotBg = useTransform(
    [spotX, spotY] as MotionValue[],
    ([x, y]: number[]) =>
      `radial-gradient(220px circle at ${x}% ${y}%, ${accent}33 0%, transparent 70%)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
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
          willChange: "transform",
        }}
        animate={{
          scale: hovered ? 1.014 : 1,
          boxShadow: hovered
            ? `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${accent}55`
            : "0 4px 20px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden cursor-default"
      >
        {/* Glass surface */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(24px)" }}
        />
        {/* Mouse spotlight */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: spotBg, opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease" }}
        />
        {/* Hover border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: `1px solid ${accent}` }}
          animate={{ opacity: hovered ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ border: "1px solid rgba(255,255,255,0.07)" }} />
        <div className="relative z-10">{children}</div>
      </motion.div>
    </motion.div>
  );
}

// ─── DNA ring ─────────────────────────────────────────────────────────────────
function DNARing({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) {
  const ref = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });

  const R = 36;
  const circ = 2 * Math.PI * R;
  const offset = circ * (1 - pct / 100);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: 92, height: 92 }}>
        <svg width="92" height="92" viewBox="0 0 92 92" style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle
            cx="46" cy="46" r={R}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2.5"
          />
          {/* Fill */}
          <motion.circle
            ref={ref}
            cx="46" cy="46" r={R}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circ }}
            transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 6px ${color}55)` }}
          />
        </svg>
        {/* Center % */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ flexDirection: "column" }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.8 }}
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "-0.03em",
              color: color,
              lineHeight: 1,
            }}
          >
            {pct}
          </motion.span>
        </div>
      </div>
      <span
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 10,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.38)",
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: "9ch",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Experience block ─────────────────────────────────────────────────────────
function ExperienceBlock({
  accent,
  label,
  headline,
  body,
  badge,
  delay,
}: {
  accent: string;
  label: string;
  headline: string;
  body: string;
  badge?: string;
  delay?: number;
}) {
  return (
    <TiltCard accent={accent} delay={delay ?? 0}>
      <div style={{ padding: "26px 28px" }}>
        <div className="flex items-start justify-between mb-4">
          <span
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {label}
          </span>
          {badge && (
            <span
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 9,
                letterSpacing: "0.1em",
                color: accent,
                background: `${accent}12`,
                border: `1px solid ${accent}30`,
                borderRadius: 100,
                padding: "3px 9px",
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <h3
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
            letterSpacing: "-0.02em",
            color: "#F0F0F0",
            lineHeight: 1.35,
            marginBottom: 10,
          }}
        >
          {headline}
        </h3>
        <p
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,0.38)",
            lineHeight: 1.7,
          }}
        >
          {body}
        </p>
      </div>
    </TiltCard>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  // Section-level spotlight
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const smSpotX = useSpring(spotX, { stiffness: 60, damping: 20 });
  const smSpotY = useSpring(spotY, { stiffness: 60, damping: 20 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      spotX.set(e.clientX - rect.left);
      spotY.set(e.clientY - rect.top);
    },
    [spotX, spotY]
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative py-36 overflow-hidden border-t border-white/[0.05]"
    >
      {/* Background systems */}
      <GridBackground />
      <SectionSpotlight spotX={smSpotX} spotY={smSpotY} />

      {/* Deep purple ambient */}
      <div
        aria-hidden
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: 700,
          height: 500,
          background: "radial-gradient(ellipse at 100% 0%, rgba(109,40,217,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8">

        {/* ── Chapter label ── */}
        <div ref={headingRef}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex items-center gap-3 mb-14"
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#E6FF4D" }} />
            <span
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 10,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#8A8A8A",
              }}
            >
              Chapter 06 — Professional Profile
            </span>
          </motion.div>
        </div>

        {/* ── Main two-column grid ── */}
        <div className="impact-mobile-grid grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] gap-8 lg:gap-16 xl:gap-24 items-start mb-24">

          {/* ════ LEFT: Rotating headline + philosophy ═══════════════════════ */}
          <div>
            <RotatingHeadline />

            {/* Sub-headline philosophy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 15,
                color: "rgba(255,255,255,0.42)",
                lineHeight: 1.85,
                maxWidth: "50ch",
                marginBottom: 36,
                marginTop: 18,
              }}
            >
              I believe great design begins long before the first pixel. It starts with
              listening — to users, to context, to tension. Then comes the thinking.
              Then the making.
            </motion.p>

            {/* Thin divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
              style={{
                height: 1,
                background: "rgba(255,255,255,0.07)",
                transformOrigin: "left",
                marginBottom: 36,
              }}
            />

            {/* Two thought strips */}
            <div className="space-y-0">
              {[
                {
                  num: "30+",
                  label: "user conversations before forming an opinion",
                  accent: "#E6FF4D",
                },
                {
                  num: "2022",
                  label: "began formalising craft at DIT University, Dehradun",
                  accent: "#A78BFA",
                },
                {
                  num: "100%",
                  label: "decisions traced back to a real user need",
                  accent: "#06B6D4",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.25 + i * 0.1, ease: EASE }}
                  className="flex items-center gap-6 py-5 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                      letterSpacing: "-0.04em",
                      color: s.accent,
                      minWidth: "3.5ch",
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.42)",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT: Experience blocks ════════════════════════════════════ */}
          <div className="space-y-4">
            <ExperienceBlock
              accent="#E6FF4D"
              label="Foundation"
              headline="Building a foundation in systems, research, and human-centered thinking."
              body="Bachelor's in UX/UI Design · DIT University, Dehradun · 2022 – Present · Final year."
              badge="Currently Enrolled"
              delay={0.3}
            />
            <ExperienceBlock
              accent="#A78BFA"
              label="Process"
              headline="Understanding people before designing solutions."
              body="Every project starts with deep listening — interviews, observations, and moments of honest confusion that become the clearest design signals."
              delay={0.4}
            />
            <ExperienceBlock
              accent="#34D399"
              label="Craft"
              headline="Turning complexity into clarity."
              body="Wireframes, prototypes, and flows that reduce cognitive friction — not add to it. Simplicity is the hardest thing to achieve."
              delay={0.5}
            />
            <TiltCard accent="rgba(255,255,255,0.12)" delay={0.6}>
              <div style={{ padding: "22px 28px" }} className="flex items-center justify-between">
                <div>
                  <span
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Tools
                  </span>
                  <p
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: 15,
                      color: "rgba(255,255,255,0.55)",
                      fontStyle: "italic",
                      lineHeight: 1.4,
                    }}
                  >
                    "Tools are secondary.<br />Thinking comes first."
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 items-end shrink-0 ml-6">
                  {["Figma", "FigJam"].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: 9,
                        color: "rgba(255,255,255,0.22)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 100,
                        padding: "2px 8px",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* ── Designer DNA panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(8,8,8,0.9)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Panel ambient */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 120%, rgba(230,255,77,0.04) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 px-10 py-10">
            {/* Panel header */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#E6FF4D" }} />
                  <span
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#8A8A8A",
                    }}
                  >
                    Designer DNA
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                    letterSpacing: "-0.025em",
                    color: "#F0F0F0",
                  }}
                >
                  Strengths I bring to every project.
                </p>
              </div>
              <div
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#E6FF4D",
                  boxShadow: "0 0 12px rgba(230,255,77,0.5)",
                }}
              />
            </div>

            {/* DNA rings */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {DNA.map((d, i) => (
                <DNARing
                  key={d.label}
                  label={d.label}
                  pct={d.pct}
                  color={d.color}
                  delay={0.2 + i * 0.12}
                />
              ))}
            </div>

            {/* Panel footer note */}
            <div
              className="mt-8 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.05em",
                }}
              >
                Based on peer feedback, project outcomes, and self-assessment across 24+ projects.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
