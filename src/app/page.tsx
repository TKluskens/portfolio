"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Thesis from "../components/Thesis";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <Header />
      <Hero />
      <div style={{ height: "1px", background: "var(--border)", margin: "0 2rem" }} />
      <About />
      <div style={{ height: "1px", background: "var(--border)", margin: "0 2rem" }} />
      <Projects />
      <div style={{ height: "1px", background: "var(--border)", margin: "0 2rem" }} />
      <Experience />
      <div style={{ height: "1px", background: "var(--border)", margin: "0 2rem" }} />
      <Skills />
      <div style={{ height: "1px", background: "var(--border)", margin: "0 2rem" }} />
      <Thesis />
      <div style={{ height: "1px", background: "var(--border)", margin: "0 2rem" }} />
      <Contact />
      <Footer />
      <ThemeToggle />
    </div>
  );
}
