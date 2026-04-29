"use client";

import React, { useEffect, useRef, useState } from "react";

const EXPERIENCE = [
  { title: "Intern · Thesis on AI & Energy", company: "Turtle Srl", period: "2023 & 2026 · Internship", location: "Cesenatico, Italy", description: "First internship in 2023: built a data-visualization dashboard in a live production environment. Returning in 2026 to complete my bachelor thesis on AI & Energy Efficiency.", current: true },
  { title: "Developer", company: "AE", period: "September 2026", location: "Belgium", description: "Starting as a developer at AE — a Belgian IT consultancy focused on digital transformation, data and software engineering.", upcoming: true },
  { title: "Student Worker", company: "Delhaize", period: "2021 – 2022 · 1 year", location: "Ghent, Belgium", description: "Customer service and retail operations. Developed reliability, communication and working under pressure." },
  { title: "Student Worker", company: "McDonald's", period: "2022 – Present · 2+ years", location: "Ghent, Belgium", description: "Fast-paced customer service and team collaboration. Learned how to stay sharp and efficient in demanding environments.", current: true },
];

export default function Experience() {
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
    <section id="experience" ref={ref} style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "4rem" }}>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: a, letterSpacing: "0.1em" }}>03</span>
        <h2 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>Experience</h2>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>

      <div>
        {EXPERIENCE.map((exp, i) => (
          <div key={i} className="exp-row">
            <div className="exp-meta">
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.08em", marginBottom: "0.3rem", textTransform: "uppercase" }}>{exp.period}</div>
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.08em" }}>{exp.location}</div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem", flexWrap: "wrap" }}>
                <h3 style={{ fontFamily: "var(--ff-head)", fontSize: "1.15rem", fontWeight: 700 }}>{exp.title}</h3>
                {exp.current && (
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", padding: "0.2rem 0.5rem", background: `color-mix(in srgb, ${a} 12%, transparent)`, color: a, border: `1px solid color-mix(in srgb, ${a} 28%, transparent)`, borderRadius: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Current</span>
                )}
                {exp.upcoming && (
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", padding: "0.2rem 0.5rem", background: "oklch(72% 0.16 150 / 0.15)", color: "oklch(72% 0.16 150)", border: "1px solid oklch(72% 0.16 150 / 0.3)", borderRadius: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Upcoming</span>
                )}
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.95rem", marginBottom: "0.6rem" }}>{exp.company}</div>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>{exp.description}</p>
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      <style>{`
        .exp-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 3rem;
          border-top: 1px solid var(--border);
          padding: 2.5rem 0;
          align-items: start;
        }
        @media (max-width: 640px) {
          .exp-row {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            padding: 1.75rem 0;
          }
        }
      `}</style>
    </section>
  );
}
