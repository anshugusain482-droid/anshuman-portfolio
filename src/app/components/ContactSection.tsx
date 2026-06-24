import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anshuman-gusain-855624310/?skipRedirect=true",
    handle: "anshuman-gusain",
    icon: "in",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/anshumangusain",
    handle: "@anshumangusain",
    icon: "Be",
  },
  {
    label: "Email",
    href: "mailto:anshugusain482@gmail.com",
    handle: "anshugusain482@gmail.com",
    icon: "@",
  },
  {
    label: "Phone",
    href: "tel:+917895974990",
    handle: "+91 78959 74990",
    icon: "↗",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative py-40 border-t border-white/[0.06] overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom, #E6FF4D 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-8">
        {/* Chapter label */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E6FF4D]" />
          <span
            className="text-[#8A8A8A] text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            Chapter 07 — Contact
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* Headline */}
          <h2
            className="text-white leading-[1.0] mb-8 max-w-[12ch]"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Let's build experiences{" "}
            <span
              className="italic"
              style={{ fontFamily: "'Instrument Serif', serif", color: "#E6FF4D" }}
            >
              people remember.
            </span>
          </h2>

          <p
            className="text-[#8A8A8A] max-w-[48ch] leading-relaxed mb-16"
            style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 17 }}
          >
            Open to full-time roles, freelance projects, and creative collaborations. If you're
            building something that matters, let's talk.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-20">
            <motion.a
              href="https://www.linkedin.com/in/anshuman-gusain-855624310/?skipRedirect=true"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 border border-white/20 text-white/80 rounded-full text-sm tracking-wide hover:border-white/50 hover:text-white transition-all duration-300"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Connect on LinkedIn
            </motion.a>
          </div>

          {/* Contact details grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                className="group flex flex-col gap-3 p-7 bg-[#050505] transition-colors duration-300"
              >
                {/* Icon badge */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid rgba(230,255,77,0.2)",
                    background: "rgba(230,255,77,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    color: "#E6FF4D",
                    letterSpacing: "0.02em",
                    flexShrink: 0,
                  }}
                >
                  {s.icon}
                </div>

                {/* Label */}
                <span
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "#8A8A8A",
                  }}
                >
                  {s.label}
                </span>

                {/* Handle */}
                <span
                  className="group-hover:text-[#E6FF4D] transition-colors duration-300 break-all"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.72)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.4,
                  }}
                >
                  {s.handle}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
