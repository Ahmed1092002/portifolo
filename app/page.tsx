import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingShapes from "./components/FloatingShapes";
import ParticleBackground from "./components/ParticleBackground";
import FloatingObjects from "./components/FloatingObjects";

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
