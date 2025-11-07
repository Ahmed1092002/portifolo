"use client";
import dynamic from "next/dynamic";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Lazy load heavy 3D backgrounds for better initial performance
const FloatingShapes = dynamic(() => import("./components/FloatingShapes"), {
  ssr: false,
  loading: () => null,
});
const ParticleBackground = dynamic(
  () => import("./components/ParticleBackground"),
  {
    ssr: false,
    loading: () => null,
  }
);
const FloatingObjects = dynamic(() => import("./components/FloatingObjects"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-(--background) relative overflow-hidden">
      <ParticleBackground />
      <FloatingObjects />
      <FloatingShapes />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
