import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "motion/react";
import anshumanPhoto from "../../imports/IMG_2215_1.png";

// ─── Premium easing ───────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Floating discipline label ────────────────────────────────────────────────
function FloatingLabel({
  text,
  top,
  left,
  right,
  floatAmp,
  floatDur,
  entranceDelay,
  pxFactor,
  smX,
  smY,
}: {
  text: string;
  top?: string;
  left?: string;
  right?: string;
  floatAmp: number;
  floatDur: number;
  entranceDelay: number;
  pxFactor: number;
  smX: ReturnType<typeof useSpring>;
  smY: ReturnType<typeof useSpring>;
}) {
  const lx = useTransform(smX, (v: number) => v * pxFactor);
  const ly = useTransform(smY, (v: number) => v * pxFactor * 0.6);

  return (
    <motion.div
      style={{
        position: "absolute",
        top,
        left,
        right,
        zIndex: 8,
        x: lx,
        y: ly,
        willChange: "transform",
      }}
      initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.85, delay: entranceDelay, ease: EASE }}
    >
      <div
        style={{
          padding: "8px 15px",
          borderRadius: 100,
          background: "rgba(8,8,8,0.75)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 10,
          fontWeight: 500,
          color: "rgba(255,255,255,0.65)",
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          whiteSpace: "nowrap" as const,
          transform: "translate3d(0,0,0)",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}

// ─── Magnetic CTA ─────────────────────────────────────────────────────────────
function MagneticBtn({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 28 });
  const sy = useSpring(my, { stiffness: 280, damping: 28 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.4);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };

  return (
    <motion.a
      href={href}
      style={{ x: sx, y: sy, fontFamily: "'Inter Tight', sans-serif", willChange: "transform" }}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ scale: { duration: 0.2 } }}
      className={
        primary
          ? "inline-flex items-center gap-2.5 px-8 py-4 bg-[#E6FF4D] text-[#050505] text-[13px] font-semibold tracking-wide rounded-full hover:bg-white transition-colors duration-300 select-none cursor-none"
          : "inline-flex items-center gap-2.5 px-8 py-4 border border-white/[0.14] text-white/60 text-[13px] tracking-wide rounded-full hover:border-white/30 hover:text-white/85 transition-all duration-300 select-none cursor-none"
      }
    >
      {children}
    </motion.a>
  );
}

// ─── Labels config ────────────────────────────────────────────────────────────
const LABELS: Array<{
  text: string;
  top?: string;
  left?: string;
  right?: string;
  floatAmp: number;
  floatDur: number;
  entranceDelay: number;
  pxFactor: number;
}> = [
    { text: "User Research", top: "20%", left: "5%", floatAmp: 9, floatDur: 4.4, entranceDelay: 2.2, pxFactor: 75 },
    { text: "Design Systems", top: "16%", right: "5%", floatAmp: 7, floatDur: 5.1, entranceDelay: 2.4, pxFactor: 58 },
    { text: "Wireframes", top: "42%", left: "3%", floatAmp: 11, floatDur: 4.0, entranceDelay: 2.6, pxFactor: 92 },
    { text: "Prototyping", top: "40%", right: "3%", floatAmp: 9, floatDur: 4.6, entranceDelay: 2.3, pxFactor: 70 },
    { text: "Case Studies", top: "65%", left: "6%", floatAmp: 8, floatDur: 5.3, entranceDelay: 2.5, pxFactor: 52 },
    { text: "Interaction Design", top: "63%", right: "5%", floatAmp: 10, floatDur: 4.1, entranceDelay: 2.7, pxFactor: 85 },
    { text: "Product Strategy", top: "29%", left: "18%", floatAmp: 7, floatDur: 4.9, entranceDelay: 2.8, pxFactor: 42 },
    { text: "User Flows", top: "53%", right: "15%", floatAmp: 9, floatDur: 3.8, entranceDelay: 2.9, pxFactor: 62 },
  ];

// ─── HeroSection ─────────────────────────────────────────────────────────────
export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // ── Mouse tracking (normalised -0.5 → +0.5) ──
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smX = useSpring(rawX, { stiffness: 24, damping: 20 });
  const smY = useSpring(rawY, { stiffness: 24, damping: 20 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY, prefersReducedMotion]);

  // ── Scroll parallax (different speeds per layer) ──
  const { scrollY } = useScroll();
  // Portrait: 0.9x — stays close
  const portraitScrollY = useTransform(scrollY, [0, 800], [0, -72]);
  // Bg text: 0.6x — recedes fastest (feels deepest)
  const bgTextScrollY = useTransform(scrollY, [0, 800], [0, -200]);
  // Labels: 0.8x
  const labelScrollY = useTransform(scrollY, [0, 800], [0, -120]);
  // Content: 1.0x (natural)
  const contentScrollY = useTransform(scrollY, [0, 800], [0, -80]);
  // Hero opacity out on scroll
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0]);

  // ── Mouse parallax (portrait and bg text) ──
  const portMouseX = useTransform(smX, (v: number) => v * 30);
  const portMouseY = useTransform(smY, (v: number) => v * 18);
  const bgMouseX = useTransform(smX, (v: number) => v * -20);
  const bgMouseY = useTransform(smY, (v: number) => v * -12);
  const glowX = useTransform(smX, (v: number) => (v + 0.5) * 100);
  const glowY = useTransform(smY, (v: number) => (v + 0.5) * 100);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(700px circle at ${x}% ${y}%, rgba(230,255,77,0.042) 0%, transparent 70%)`
  );

  // ── Portrait tilt (subtle 3D rotation from mouse) ──
  const tiltX = useTransform(smY, (v: number) => v * -6);
  const tiltY = useTransform(smX, (v: number) => v * 5);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative overflow-hidden bg-[#050505]"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Cinematic entrance: full black overlay fades out ── */}
      <motion.div
        className="absolute inset-0 bg-[#050505] pointer-events-none"
        style={{ zIndex: 100 }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
      />

      {/* ── Dot grid ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.042) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* ── Mouse glow ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: glowBg, zIndex: 1, willChange: "background" }}
      />

      {/* ── Ambient: violet ellipse ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0, delay: 0.3 }}
        style={{
          background:
            "radial-gradient(ellipse at 82% -8%, rgba(109,40,217,0.1) 0%, transparent 52%)",
        }}
      />
      {/* ── Ambient: warm glow bottom-center ── */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[260px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0, delay: 1.2 }}
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(230,255,77,0.05) 0%, transparent 70%)",
          filter: "blur(12px)",
          zIndex: 1,
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          LAYER 1 — Background typography (deepest, moves most on scroll)
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        aria-hidden
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{
          x: bgMouseX,
          y: useTransform(
            [bgMouseY, bgTextScrollY],
            ([m, s]: number[]) => (m as number) + (s as number)
          ),
          zIndex: 2,
          willChange: "transform",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.5 }}
      >
        <div
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(72px, 15vw, 210px)",
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
            color: "rgba(255,255,255,0.036)",
            textAlign: "center",
          }}
        >
          ANSHUMAN
        </div>
        <div
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(72px, 15vw, 210px)",
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
            color: "rgba(255,255,255,0.028)",
            textAlign: "center",
          }}
        >
          GUSAIN
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 2 — Portrait (centered, 80vh, scroll + mouse parallax)
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-portrait-layer absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          x: portMouseX,
          y: useTransform(
            [portMouseY, portraitScrollY],
            ([m, s]: number[]) => (m as number) + (s as number)
          ),
          zIndex: 5,
          willChange: "transform",
        }}
        initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
      >
        <motion.div
          style={{
            position: "relative",
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "min(74vh, 640px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Left rim light */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: -2,
                top: "20%",
                width: 2,
                height: "52%",
                borderRadius: 100,
                background:
                  "linear-gradient(to bottom, transparent, rgba(230,255,77,0.4), rgba(230,255,77,0.18), transparent)",
                filter: "blur(3px)",
                zIndex: 10,
              }}
            />

            {/* Portrait image */}
            <img
              src={anshumanPhoto}
              alt="Anshuman Gusain — UX/UI Designer"
              style={{
                height: "100%",
                width: "auto",
                objectFit: "contain",
                objectPosition: "bottom center",
                display: "block",
                filter:
                  "grayscale(0.78) brightness(0.75) contrast(1.12) saturate(0.5)",
                position: "relative",
                zIndex: 2,
                transform: "translate3d(0,-6%,0)",
                willChange: "transform",
              }}
            />

            {/* Gradient masks — dissolve white bg */}
            <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 3, background: "linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.72) 13%, rgba(5,5,5,0.08) 32%, transparent 48%)" }} />
            <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 3, background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.55) 9%, transparent 25%)" }} />
            <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 3, background: "linear-gradient(to right, #050505 0%, rgba(5,5,5,0.65) 9%, transparent 30%)" }} />
            <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 3, background: "linear-gradient(to left, #050505 0%, rgba(5,5,5,0.65) 9%, transparent 30%)" }} />
            <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 4, background: "radial-gradient(ellipse at 50% 40%, transparent 26%, rgba(5,5,5,0.32) 70%, rgba(5,5,5,0.68) 100%)" }} />

            {/* Studio floor glow */}
            <div aria-hidden style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "90%", height: "30%", zIndex: 6, background: "radial-gradient(ellipse at 50% 100%, rgba(230,255,77,0.065) 0%, transparent 70%)", filter: "blur(10px)" }} />
          </div>
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          LAYER 3 — Floating labels (scroll + mouse parallax)
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-label-layer absolute inset-0 pointer-events-none"
        style={{ y: labelScrollY, zIndex: 8, willChange: "transform" }}
      >
        {LABELS.map((label) => (
          <FloatingLabel
            key={label.text}
            {...label}
            smX={smX}
            smY={smY}
          />
        ))}
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          CONTENT — choreographed sequence
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-content-layer absolute inset-0 flex flex-col justify-end pointer-events-none"
        style={{ opacity: heroOpacity, y: contentScrollY, zIndex: 10, willChange: "transform, opacity" }}
      >


        {/* ── Bottom zone: name + title + CTAs ── */}
        <div
          className="pointer-events-auto"
          style={{ padding: "0 48px 44px" }}
        >
          {/* Name */}
          <div style={{ textAlign: "center", overflow: "hidden", marginBottom: 6 }}>
            <motion.h1
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)",
                letterSpacing: "-0.025em",
                color: "#F5F5F5",
                lineHeight: 1.1,
                margin: 0,
              }}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.95, delay: 1.2, ease: EASE }}
            >
              Anshuman Gusain
            </motion.h1>
          </div>

          {/* Role */}
          <motion.p
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 12,
              color: "#8A8A8A",
              letterSpacing: "0.1em",
              textAlign: "center",
              marginBottom: 22,
            }}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.38, ease: EASE }}
          >
            Product Designer &nbsp;·&nbsp; UX/UI Designer &nbsp;·&nbsp; Human-Centered Thinking
          </motion.p>

          {/* Hairline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 1.55, ease: EASE }}
            style={{
              height: 1,
              background: "rgba(255,255,255,0.07)",
              transformOrigin: "center",
              marginBottom: 22,
              willChange: "transform",
            }}
          />

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.72, ease: EASE }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}
          >
            <MagneticBtn href="#work" primary>
              View Case Studies
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticBtn>
            <MagneticBtn href="#contact">Let's Connect</MagneticBtn>
          </motion.div>


        </div>
      </motion.div>
    </section>
  );
}
