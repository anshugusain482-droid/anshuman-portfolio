import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import anshumanPhoto from "../../imports/IMG_2215_1.png";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MOBILE_LABELS = [
  "User Research",
  "Product Strategy",
  "Wireframes",
  "Prototyping",
  "Case Studies",
  "User Flows",
  "Interaction Design",
  "Design Systems",
];

const DESKTOP_LABELS = [
  { text: "User Research", top: "22%", left: "4%" },
  { text: "Product Strategy", top: "34%", left: "17%" },
  { text: "Wireframes", top: "50%", left: "3%" },
  { text: "Case Studies", top: "73%", left: "6%" },
  { text: "Design Systems", top: "18%", right: "4%" },
  { text: "Prototyping", top: "48%", right: "3%" },
  { text: "User Flows", top: "62%", right: "14%" },
  { text: "Interaction Design", top: "71%", right: "6%" },
];

function SkillPill({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/60 backdrop-blur-2xl">
      {children}
    </span>
  );
}

function CTAButton({
  href,
  children,
  primary,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={
        primary
          ? "inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full bg-[#E6FF4D] px-8 py-4 text-[14px] font-bold text-[#050505] transition-colors hover:bg-white"
          : "inline-flex min-h-[58px] items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.02] px-8 py-4 text-[14px] font-medium text-white/65 transition-all hover:border-white/30 hover:text-white"
      }
    >
      {children}
    </motion.a>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-[#050505] text-white"
    >
      {/* Background dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 82% 0%, rgba(109,40,217,0.12) 0%, transparent 48%), radial-gradient(ellipse at 48% 100%, rgba(230,255,77,0.055) 0%, transparent 55%)",
        }}
      />

      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-7 md:px-8 lg:px-12">
        <a
          href="#home"
          className="text-[13px] font-bold uppercase tracking-[0.22em] text-white/85"
        >
          AG
        </a>

        <nav className="hidden items-center gap-9 text-[15px] text-white/50 md:flex">
          <a className="transition-colors hover:text-white" href="#work">
            Work
          </a>
          <a className="transition-colors hover:text-white" href="#expertise">
            Expertise
          </a>
          <a className="transition-colors hover:text-white" href="#about">
            About
          </a>
          <a className="transition-colors hover:text-white" href="#contact">
            Contact
          </a>
        </nav>

        <a
          href="#contact"
          className="rounded-full border border-white/15 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70 transition-all hover:border-white/35 hover:text-white"
        >
          Hire Me
        </a>
      </header>

      {/* Desktop / laptop hero */}
      <div className="relative hidden min-h-[100svh] md:block">
        <div className="absolute left-8 top-[13%] z-20 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/45">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E6FF4D]" />
          UX/UI Designer
        </div>

        <div className="absolute right-8 top-[13%] z-20 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/45">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.75)]" />
          Open to Work
        </div>

        {/* Big background name */}
        <motion.div
          aria-hidden
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          <div className="text-center font-['Inter_Tight'] text-[clamp(92px,15vw,220px)] font-black leading-[0.86] tracking-[-0.06em] text-white/[0.035]">
            ANSHUMAN
            <br />
            GUSAIN
          </div>
        </motion.div>

        {/* Desktop floating labels */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {DESKTOP_LABELS.map((label) => (
            <motion.div
              key={label.text}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.35, ease: EASE }}
              className="absolute"
              style={{
                top: label.top,
                left: label.left,
                right: label.right,
              }}
            >
              <SkillPill>{label.text}</SkillPill>
            </motion.div>
          ))}
        </div>

        {/* Portrait */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <div className="relative mt-[-3vh] h-[min(76vh,700px)] w-[min(38vw,560px)] overflow-hidden bg-black/30">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 42%, transparent 26%, rgba(5,5,5,0.48) 78%), linear-gradient(to bottom, rgba(5,5,5,0.25) 0%, transparent 28%, rgba(5,5,5,0.8) 100%)",
              }}
            />

            <img
              src={anshumanPhoto}
              alt="Anshuman Gusain"
              className="absolute left-1/2 top-[42%] z-[5] h-[68%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain grayscale-[0.8] brightness-[0.78] contrast-[1.12]"
            />
          </div>
        </motion.div>

        {/* Desktop text + CTA */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="absolute left-1/2 top-[66%] z-30 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 px-6 text-center"
        >
          <h1 className="font-['Inter_Tight'] text-[clamp(44px,4.2vw,64px)] font-black leading-[0.92] tracking-[-0.055em] text-white">
            Anshuman Gusain
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] tracking-wide text-white/50">
            Product Designer · UX/UI Designer · Human-Centered Thinking
          </p>

          <div className="mx-auto mt-9 flex max-w-md items-center justify-center gap-4">
            <CTAButton href="#work" primary>
              View Case Studies <span>↗</span>
            </CTAButton>

            <CTAButton href="#contact">Let&apos;s Connect</CTAButton>
          </div>

          <div className="mt-10 text-[10px] uppercase tracking-[0.42em] text-white/35">
            Scroll
          </div>
        </motion.div>
      </div>

      {/* Mobile hero */}
      <div className="relative z-20 flex min-h-[100svh] flex-col justify-center gap-5 px-5 pb-9 pt-24 md:hidden">
        <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-white/45">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E6FF4D]" />
            UX/UI Designer
          </span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Open to Work
          </span>
        </div>

        <div className="text-center">
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
            Product Designer · UX/UI Designer
          </p>

          <h1 className="font-['Inter_Tight'] text-[clamp(42px,12vw,56px)] font-black leading-[0.94] tracking-[-0.055em] text-white">
            Anshuman
            <br />
            Gusain
          </h1>

          <p className="mx-auto mt-4 max-w-[32ch] text-[14px] leading-6 text-white/50">
            Human-centered portfolio focused on UX research, interaction design,
            product thinking, and polished case studies.
          </p>
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto py-1">
          {MOBILE_LABELS.map((label) => (
            <SkillPill key={label}>{label}</SkillPill>
          ))}
        </div>

        <div className="relative h-[clamp(310px,46svh,430px)] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.025]">
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center font-['Inter_Tight'] text-[clamp(74px,24vw,120px)] font-black leading-[0.86] tracking-[-0.07em] text-white/[0.035]">
            ANSHUMAN
            <br />
            GUSAIN
          </div>

          <img
            src={anshumanPhoto}
            alt="Anshuman Gusain"
            className="absolute bottom-[-3%] left-1/2 h-[104%] w-auto max-w-none -translate-x-1/2 object-contain grayscale-[0.78] brightness-[0.78] contrast-[1.12]"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.12) 22%, transparent 42%, rgba(5,5,5,0.75) 100%)",
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <CTAButton href="#work" primary>
            View Case Studies <span>↗</span>
          </CTAButton>

          <CTAButton href="#contact">Let&apos;s Connect</CTAButton>
        </div>
      </div>
    </section>
  );
}