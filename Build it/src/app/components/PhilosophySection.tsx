import { useRef } from "react";
import { motion, useInView } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const statements = [
  { num: "01", text: "Great design is not decoration." },
  { num: "02", text: "Great design reduces friction." },
  { num: "03", text: "Great design creates clarity." },
  { num: "04", text: "Great design makes technology feel invisible." },
];

export function PhilosophySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="about" className="py-32 max-w-7xl mx-auto px-8">
      {/* Header — single fade, no stagger overhead */}
      <div ref={headerRef}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E6FF4D]" />
            <span
              className="text-[#8A8A8A] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Chapter 02 — Design Philosophy
            </span>
          </div>
          <p
            className="text-[#8A8A8A] text-sm max-w-[40ch] leading-relaxed"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            Design is not a craft. It's a discipline of thinking. Every decision has a reason.
          </p>
        </motion.div>
      </div>

      {/* Statements — heading reveal only, number is static alongside */}
      <div>
        {statements.map((item, i) => (
          <StatementRow key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function StatementRow({ item, index }: { item: typeof statements[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="py-10 border-b border-white/[0.055] flex items-start gap-8"
    >
      {/* Number fades in with the row — no separate animation overhead */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
        className="text-[10px] text-[#8A8A8A] tracking-[0.3em] uppercase mt-1 w-8 shrink-0 block"
        style={{ fontFamily: "'Inter Tight', sans-serif" }}
      >
        {item.num}
      </motion.span>

      {/* Heading clip reveal — the primary animation for each row */}
      <div style={{ overflow: "hidden" }}>
        <motion.div
          initial={{ y: "105%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.06 + index * 0.07, ease: EASE }}
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(1.75rem, 3.8vw, 3.4rem)",
            color: "#F5F5F5",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {item.text}
        </motion.div>
      </div>
    </div>
  );
}
