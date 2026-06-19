import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";


const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const projects = [
  {
    id: 1,
    title: "Scribbly",
    industry: "EdTech",
    year: "2024",
    role: "UX/UI Designer",
    tags: ["Mobile App", "Education", "Interaction Design"],
    problem: "Children found writing practice dull and repetitive, leading to disengagement and low confidence in early literacy skills.",
    solution: "A playful writing app that transforms every scribble into a learning moment — using gamification and positive reinforcement to build writing confidence.",
    outcome: "Designed in 3 weeks with a 6-member team. Achieved high engagement scores in usability testing.",
    color: "#F59E0B",
    accentBg: "rgba(245,158,11,0.07)",
    img: "/project-image/Screenshot_1.png",
    behance: "https://www.behance.net/anshumangusain",
  },
  {
    id: 2,
    title: "Rethinking ADHD in Classrooms",
    industry: "EdTech / Healthcare",
    year: "2024",
    role: "UX Researcher & Designer",
    tags: ["UX Research", "Inclusive Design", "Accessibility"],
    problem: "Students with ADHD lacked tools tailored to their cognitive patterns in traditional classroom environments.",
    solution: "An interactive classroom solution that reframes ADHD as a design problem — offering structured, sensory-friendly learning flows backed by cognitive science.",
    outcome: "Deep UX research with competitive analysis, user interviews with educators, and high-fidelity prototypes.",
    color: "#8B5CF6",
    accentBg: "rgba(139,92,246,0.07)",
    img: "/project-image/Screenshot_2.png",
    behance: "https://www.behance.net/anshumangusain",
  },
  {
    id: 3,
    title: "Ethnographic Journey — स लान गांव",
    industry: "Culture & Heritage",
    year: "2024",
    role: "Experience Designer",
    tags: ["Cultural UX", "Ethnography", "Visual Storytelling"],
    problem: "The folk traditions of Uttarakhand's Himalayan villages remain invisible and undocumented in the digital world.",
    solution: "A deeply researched ethnographic experience that digitises and celebrates the music, costumes, and culture of Salan village.",
    outcome: "Ethnographic research, field visits, and visual design to create an authentic heritage experience.",
    color: "#06B6D4",
    accentBg: "rgba(6,182,212,0.07)",
    img: "/project-image/Screenshot_3.png",
    behance: "https://www.behance.net/anshumangusain",
  },
  {
    id: 4,
    title: "Green Hospitality",
    industry: "Travel & Sustainability",
    year: "2023",
    role: "Product Designer",
    tags: ["Product Design", "Sustainability", "Brand Identity"],
    problem: "Eco-conscious travellers struggled to find and trust genuinely sustainable accommodation.",
    solution: "A premium hospitality platform centred on verified sustainable stays — with an earthy visual identity and transparency-first design system.",
    outcome: "End-to-end product design including brand identity, UI system, and booking flow.",
    color: "#22C55E",
    accentBg: "rgba(34,197,94,0.07)",
    img: "/project-image/Screenshot_4.png",
    behance: "https://www.behance.net/anshumangusain",
  },
];

// ─── Project card ─────────────────────────────────────────────────────────────
// Tilt uses useMotionValue + useSpring — no setState, no re-renders
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smX = useSpring(mx, { stiffness: 140, damping: 20 });
  const smY = useSpring(my, { stiffness: 140, damping: 20 });
  const rotateX = useTransform(smY, [0, 1], [5, -5]);
  const rotateY = useTransform(smX, [0, 1], [-5, 5]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.09, ease: EASE }}
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
          boxShadow: hovered
            ? `0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px ${project.color}28`
            : "0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.07)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="h-full rounded-2xl bg-[#0B0B0B] overflow-hidden cursor-pointer group"
      >
        {/* Project image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <motion.div
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={project.img}
              alt={project.title}
              className="w-full h-full object-contain sm:object-cover object-top bg-[#0B0B0B]"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/15 to-transparent" />

          {/* Industry badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase backdrop-blur-sm"
            style={{
              border: `1px solid ${project.color}45`,
              color: project.color,
              background: project.color + "15",
              fontFamily: "'Inter Tight', sans-serif",
            }}
          >
            {project.industry}
          </div>

          {/* Arrow — visible on hover only: meaningful feedback */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-sm"
          >
            ↗
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-3">
            <h3
              className="text-white leading-tight mb-1 tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
            >
              {project.title}
            </h3>
            <p className="text-[#8A8A8A] text-xs" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {project.role} · {project.year}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2.5 py-1 rounded-full tracking-wide"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#8A8A8A",
                  fontFamily: "'Inter Tight', sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Problem */}
          <div className="mb-3 p-3 rounded-xl" style={{ background: project.accentBg }}>
            <p
              className="text-[10px] uppercase tracking-widest mb-1"
              style={{ color: project.color, fontFamily: "'Inter Tight', sans-serif" }}
            >
              The Problem
            </p>
            <p className="text-[#8A8A8A] text-xs leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {project.problem}
            </p>
          </div>

          <p className="text-white/55 text-xs leading-relaxed mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            {project.solution}
          </p>

          <div
            className="pt-4 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p
              className="text-xs leading-relaxed"
              style={{ color: project.color, fontFamily: "'Inter Tight', sans-serif" }}
            >
              {project.outcome.split(".")[0]}.
            </p>
            <a
              href={project.behance}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full transition-all duration-200 shrink-0 ml-3"
              style={{
                border: `1px solid ${project.color}40`,
                color: project.color,
                fontFamily: "'Inter Tight', sans-serif",
              }}
            >
              View ↗
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function WorkSection() {
  return (
    <section id="work" className="work-mobile-fix py-32 max-w-7xl mx-auto px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#E6FF4D]" />
            <span
              className="text-[#8A8A8A] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Chapter 03 — Featured Work
            </span>
          </motion.div>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "105%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
              className="text-white tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Selected Projects
            </motion.h2>
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="text-[#8A8A8A] text-sm max-w-[36ch] leading-relaxed md:text-right"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          Four case studies from{" "}
          <a
            href="https://www.behance.net/anshumangusain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E6FF4D] hover:underline"
          >
            Behance
          </a>
          {" "}— each built around real user problems, rigorous research, and measurable outcomes.
        </motion.p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
        className="flex justify-center mt-14"
      >
        <a
          href="https://www.behance.net/anshumangusain"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 border text-[#8A8A8A] text-sm hover:border-[#E6FF4D]/50 hover:text-[#E6FF4D] transition-all duration-300 rounded-full"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            borderColor: "rgba(255,255,255,0.12)",
          }}
        >
          View all on Behance ↗
        </a>
      </motion.div>
    </section>
  );
}
