"use client";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import AnimateOnScroll from "../components/AnimateOnScroll";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <Hero />
      <Skills />
      <Projects />
      <AnimateOnScroll>
        <About />
      </AnimateOnScroll>
      <Experience />
      <Footer />
      <ThemeToggle />
    </div>
  );
}
