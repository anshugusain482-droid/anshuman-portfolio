import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

createRoot(document.getElementById("root")!).render(<App />);

const lenis = new Lenis({
  duration: 0.65,
  easing: (t: number) => 1 - Math.pow(1 - t, 3),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);