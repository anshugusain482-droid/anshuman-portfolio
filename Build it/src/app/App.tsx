import { SmoothScroll } from "./components/SmoothScroll";
import { Nav } from "./components/Nav";
import { HeroSection } from "./components/HeroSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { WorkSection } from "./components/WorkSection";
import { ExpertiseSection } from "./components/ExpertiseSection";
import { ImpactSection } from "./components/ImpactSection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  return (
    <SmoothScroll>
      <div
        className="min-h-screen bg-[#050505] text-[#F5F5F5] overflow-x-hidden"
        style={{ fontFamily: "'Inter Tight', sans-serif" }}
      >
        <Nav />

        {/* Grain texture overlay */}
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none z-[1] opacity-[0.022]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        <main className="relative z-10">
          <HeroSection />

          {/* Marquee ticker */}
          <div className="py-5 border-y border-white/[0.055] overflow-hidden">
            <div
              className="flex gap-10 whitespace-nowrap"
              style={{ animation: "marquee 22s linear infinite" }}
            >
              {Array(4)
                .fill(null)
                .flatMap((_, gi) =>
                  [
                    "UX Research",
                    "Interaction Design",
                    "Visual Design",
                    "Design Systems",
                    "Accessibility",
                    "Prototyping",
                    "Motion Design",
                    "Product Thinking",
                  ].map((item, i) => (
                    <span
                      key={`${gi}-${i}`}
                      className="text-[#8A8A8A] text-[10px] tracking-[0.3em] uppercase shrink-0"
                      style={{ fontFamily: "'Inter Tight', sans-serif" }}
                    >
                      {item}
                      <span className="text-[#E6FF4D] mx-3">·</span>
                    </span>
                  ))
                )}
            </div>
          </div>

          <PhilosophySection />
          <WorkSection />
          <ExpertiseSection />
          <ImpactSection />
          <ContactSection />
        </main>

        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }

          /* Hide scrollbar */
          ::-webkit-scrollbar { display: none; }
          * { scrollbar-width: none; }

          /* Text selection */
          ::selection { background: #E6FF4D; color: #050505; }

          /* GPU hints for key animated surfaces */
          .will-change-transform { will-change: transform; }

          /* Lenis smooth scroll */
          html.lenis, html.lenis body { height: auto; }
          .lenis.lenis-smooth { scroll-behavior: auto !important; }
          .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
          .lenis.lenis-stopped { overflow: hidden; }
        `}</style>
      </div>
    </SmoothScroll>
  );
}
