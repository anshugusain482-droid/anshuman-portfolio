import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <a href="#" className="text-white/90 tracking-[0.2em] uppercase text-xs font-medium select-none">
        AG
      </a>
      <ul className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-[#8A8A8A] hover:text-white transition-colors duration-300 text-sm tracking-wide"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-white/20 text-white/80 hover:border-[#E6FF4D] hover:text-[#E6FF4D] transition-all duration-300 rounded-full"
      >
        Hire Me
      </a>
    </motion.nav>
  );
}
