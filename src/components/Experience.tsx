"use client";

import React, { useEffect, useRef, useState } from "react";

const EXPERIENCE = [
  { title: "Developer", company: "AE", period: "Sep 2026", type: "Full-time", location: "Belgium", description: "Starting as a developer at AE — a Belgian IT consultancy focused on digital transformation, data and software engineering.", upcoming: true },
  { title: "Intern · Bachelor Thesis on AI & Energy", company: "Turtle Srl", period: "2026", type: "Internship", location: "Cesenatico, Italy", description: "Returning to Turtle Srl to complete my bachelor thesis on AI & Energy Efficiency in a live production environment.", current: true },
  { title: "Student Worker", company: "McDonald's", period: "2022 – Present", type: "Part-time", location: "Ghent, Belgium", description: "Fast-paced customer service and team collaboration. Learned how to stay sharp and efficient in demanding environments.", current: true },
  { title: "Intern · Data Visualization", company: "Turtle Srl", period: "2023", type: "Internship", location: "Cesenatico, Italy", description: "Built a data-visualization dashboard in a live production environment during my first internship abroad." },
  { title: "Student Worker", company: "Delhaize", period: "2021 – 2022", type: "Part-time", location: "Ghent, Belgium", description: "Customer service and retail operations. Developed reliability, communication and working under pressure." },
];

function TimelineItem({ exp, index, accent, sectionVisible }: { exp: typeof EXPERIENCE[0]; index: number; accent: string; sectionVisible: boolean }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [itemVisible, setItemVisible] = useState(false);
  const a = accent || "var(--accent)";

  useEffect(() => {
    if (!sectionVisible) return;
    const el = itemRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setItemVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [sectionVisible]);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className="timeline-item"
      style={{
        opacity: itemVisible ? 1 : 0,
        transform: itemVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
      }}
      data-left={isLeft}
    >
      {/* Card */}
      <div className="timeline-card" style={{ borderColor: exp.current || exp.upcoming ? `color-mix(in srgb, ${a} 30%, transparent)` : "var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: a, letterSpacing: "0.1em", textTransform: "uppercase" }}>{exp.period}</span>
          {exp.current && (
            <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.55rem", padding: "0.15rem 0.45rem", background: `color-mix(in srgb, ${a} 12%, transparent)`, color: a, border: `1px solid color-mix(in srgb, ${a} 28%, transparent)`, borderRadius: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Current</span>
          )}
          {exp.upcoming && (
            <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.55rem", padding: "0.15rem 0.45rem", background: "oklch(72% 0.16 150 / 0.12)", color: "oklch(72% 0.16 150)", border: "1px solid oklch(72% 0.16 150 / 0.28)", borderRadius: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Upcoming</span>
          )}
        </div>
        <h3 style={{ fontFamily: "var(--ff-head)", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.25rem", lineHeight: 1.3 }}>{exp.title}</h3>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span style={{ color: a, fontFamily: "var(--ff-head)", fontWeight: 600, fontSize: "0.9rem" }}>{exp.company}</span>
          <span style={{ color: "var(--border)", fontSize: "0.8rem" }}>·</span>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{exp.type}</span>
          <span style={{ color: "var(--border)", fontSize: "0.8rem" }}>·</span>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.06em" }}>{exp.location}</span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{exp.description}</p>
      </div>

      {/* Center dot */}
      <div className="timeline-dot" style={{ background: exp.current || exp.upcoming ? a : "var(--border)", boxShadow: exp.current || exp.upcoming ? `0 0 0 4px color-mix(in srgb, ${a} 15%, transparent)` : "none" }} />
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [accent, setAccent] = useState("");
  const a = accent || "var(--accent)";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.05 });
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

  return (
    <section id="experience" ref={ref} style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "5rem" }}>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: a, letterSpacing: "0.1em" }}>03</span>
        <h2 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>Experience</h2>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>

      <div className="timeline-container">
        {/* Vertical line */}
        <div className="timeline-line" style={{ background: `linear-gradient(to bottom, transparent, var(--border) 5%, var(--border) 95%, transparent)` }} />

        {EXPERIENCE.map((exp, i) => (
          <TimelineItem key={i} exp={exp} index={i} accent={accent} sectionVisible={visible} />
        ))}
      </div>

      <style>{`
        .timeline-container {
          position: relative;
          padding: 1rem 0;
        }
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          transform: translateX(-50%);
        }
        .timeline-item {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 24px 1fr;
          gap: 0;
          margin-bottom: 3rem;
          align-items: start;
        }
        .timeline-item[data-left="true"] .timeline-card {
          grid-column: 1;
          margin-right: 2.5rem;
        }
        .timeline-item[data-left="false"] .timeline-card {
          grid-column: 3;
          margin-left: 2.5rem;
        }
        .timeline-item[data-left="true"] .timeline-dot {
          grid-column: 2;
          grid-row: 1;
        }
        .timeline-item[data-left="false"] .timeline-dot {
          grid-column: 2;
          grid-row: 1;
        }
        .timeline-item[data-left="false"] .timeline-card {
          grid-row: 1;
        }
        .timeline-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 1.5rem;
          transition: border-color 0.3s ease;
        }
        .timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-top: 1.75rem;
          justify-self: center;
          transition: box-shadow 0.3s ease;
          z-index: 1;
          position: relative;
        }
        @media (max-width: 768px) {
          .timeline-line { left: 16px; }
          .timeline-item {
            grid-template-columns: 32px 1fr;
            gap: 0;
          }
          .timeline-item[data-left="true"] .timeline-card,
          .timeline-item[data-left="false"] .timeline-card {
            grid-column: 2;
            grid-row: 1;
            margin-left: 1.25rem;
            margin-right: 0;
          }
          .timeline-item[data-left="true"] .timeline-dot,
          .timeline-item[data-left="false"] .timeline-dot {
            grid-column: 1;
            grid-row: 1;
          }
        }
      `}</style>
    </section>
  );
}
