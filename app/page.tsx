"use client";
import dynamic from "next/dynamic";
import Head from "next/head";
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
    <>
      <Head>
        <title>
          Ahmed Tamer — Software Engineer &amp; Flutter &amp; Web Developer
        </title>
        <meta
          name="description"
          content="A Software Engineer experienced in Flutter and React ecosystems, with a solid background in building mobile and web applications. I've worked on ERP systems, AI chat applications, invoicing systems, and payment solutions at AppLogica."
        />
        <meta
          name="keywords"
          content="Ahmed Tamer, Software Engineer, Flutter Developer, Web Developer"
        />
        <meta
          property="og:title"
          content="Ahmed Tamer — a Software Engineer &amp; Flutter &amp; Web Developer"
        />
        <meta
          property="og:description"
          content="A Software Engineer experienced in Flutter and React ecosystems, with a solid background in building mobile and web applications."
        />
        <meta
          property="og:image"
          content="/Gemini_Generated_Image_pc7nb0pc7nb0pc7n.ico"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ahmed-tamer.vercel.app" />


      </Head>
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
    </>
  );
}
