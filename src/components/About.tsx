"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PILLARS = [
  { label: "Production experience, early.", text: "I first interned at Turtle Srl in Cesenatico, Italy during my final year of secondary school. They invited me back for my Bachelor's internship — both experiences put me in a real professional environment where I had to adapt quickly and deliver." },
  { label: "Always building.", text: "Outside of work, I run my own homelab and personal server. I enjoy experimenting with new technologies and side projects. It keeps my skills sharp and my curiosity alive." },
  { label: "Team player.", text: "Years of competitive basketball taught me how to collaborate under pressure, communicate clearly, and support the people around me. I bring that same mindset to every team I work with." },
];

const META = [
  ["Location", "Ghent, Belgium"],
  ["Languages", "NL · EN · FR"],
  ["Current", "Turtle Srl · Internship"],
  ["Next", "AE · Dev Consultant"],
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [accent, setAccent] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setAccent(getComputedStyle(document.documentElement).getPropertyValue("--accent").trim());
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    return () => obs.disconnect();
  }, []);

  const a = accent || "var(--accent)";

  return (
    <section id="about" ref={ref} style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "4rem" }}>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: a, letterSpacing: "0.1em" }}>01</span>
        <h2 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>About</h2>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>

      <div className="about-grid">
        {/* Left */}
        <div>
          <div style={{ marginBottom: "2rem", border: "1px solid var(--border)", overflow: "hidden", borderRadius: "4px" }}>
            <Image src="/files/pf.png" alt="Tom Kluskens" width={600} height={600} style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(15%)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {META.map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{k}</span>
                <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <h3 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.75rem" }}>
            Full Stack<br />Developer
          </h3>
          <p style={{ fontSize: "1.15rem", fontWeight: 300, lineHeight: 1.75, marginBottom: "1.75rem", color: "var(--text)" }}>
            I&apos;m a full stack developer finishing my Bachelor&apos;s in Applied IT at HoGent, with a thesis exploring AI and energy efficiency. This September, I&apos;ll be starting as a software engineer at AE.
          </p>
          <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.85, marginBottom: "2rem", color: "var(--muted)" }}>
            To me, engineering is about more than writing code. I care about the full picture: understanding requirements, shaping ideas, and building systems that are solid and easy to maintain. I&apos;m comfortable talking directly with clients, explaining technical concepts in plain language, and making sure the end result actually matches what the business needs.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
            {PILLARS.map(({ label, text }) => (
              <div key={label} style={{ display: "flex", gap: "0.75rem" }}>
                <div style={{ width: "2px", flexShrink: 0, background: a, borderRadius: "1px", marginTop: "4px" }} />
                <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.8, color: "var(--muted)" }}>
                  <span style={{ fontWeight: 600, color: "var(--text)", fontFamily: "var(--ff-head)" }}>{label}</span>{" "}{text}
                </p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.8, marginBottom: "1.75rem", color: "var(--muted)" }}>
            I love building things from the ground up, with a particular interest in frontend work, databases, and infrastructure. I&apos;m always looking for the next opportunity to learn and deliver real value.
          </p>
          <a
            href="https://www.linkedin.com/in/tom-kluskens-562a8522b/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: a, fontFamily: "var(--ff-head)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase", textDecoration: "none", borderBottom: `1px solid ${a}`, paddingBottom: "2px" }}
          >
            Connect on LinkedIn →
          </a>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 6rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
