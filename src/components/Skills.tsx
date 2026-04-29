"use client";

import React, { useEffect, useRef, useState } from "react";

const SKILLS = [
  { name: "HTML / CSS", cat: "Frontend" },
  { name: "JavaScript", cat: "Frontend" },
  { name: "React", cat: "Frontend" },
  { name: "Tailwind CSS", cat: "Frontend" },
  { name: "TypeScript", cat: "Frontend" },
  { name: "C#", cat: "Backend" },
  { name: "FastAPI", cat: "Backend" },
  { name: "Java", cat: "Backend" },
  { name: "Node.js", cat: "Backend" },
  { name: "PHP", cat: "Backend" },
  { name: "Python", cat: "Backend" },
  { name: ".NET / Blazor", cat: "Framework" },
  { name: "Spring Boot", cat: "Framework" },
  { name: "MongoDB", cat: "Data" },
  { name: "MySQL", cat: "Data" },
  { name: "PostgreSQL", cat: "Data" },
  { name: "Qdrant", cat: "Data" },
  { name: "Redis", cat: "Data" },
  { name: "SQL", cat: "Data" },
  { name: "Docker", cat: "DevOps" },
  { name: "n8n", cat: "DevOps" },
  { name: "Playwright", cat: "DevOps" },
  { name: "Ubuntu Server", cat: "DevOps" },
  { name: "Embeddings", cat: "AI" },
  { name: "LLM Integration", cat: "AI" },
  { name: "Vector Search", cat: "AI" },
  { name: "WhisperX / ASR", cat: "AI" },
];

const CAT_ORDER = ["Frontend", "Backend", "Framework", "Data", "DevOps", "AI"];
const CATS = ["All", ...CAT_ORDER];

const CAT_COLORS: Record<string, string> = {
  Backend: "oklch(72% 0.16 45)",
  Framework: "oklch(72% 0.16 150)",
  Frontend: "oklch(72% 0.16 220)",
  Data: "oklch(72% 0.16 290)",
  DevOps: "oklch(72% 0.16 340)",
  AI: "oklch(72% 0.16 95)",
};

const CERTS = [
  {
    name: "Cisco Networking Basics",
    url: "https://www.credly.com/badges/d42e36ff-9002-472c-b4b3-ac9f955606c6/public_url",
    img: "https://images.credly.com/size/110x110/images/5bdd6a39-3e03-4444-9510-ecff80c9ce79/image.png",
  },
  {
    name: "Cisco Intro to Cybersecurity",
    url: "https://www.credly.com/badges/5fb82c13-870e-44f3-b519-d95e7f8ce93a/public_url",
    img: "https://images.credly.com/size/110x110/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png",
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [accent, setAccent] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const update = () =>
      setAccent(getComputedStyle(document.documentElement).getPropertyValue("--accent").trim());
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    return () => obs.disconnect();
  }, []);

  const a = accent || "var(--accent)";

  const filtered =
    activeFilter === "All"
      ? [...SKILLS].sort(
          (x, y) => CAT_ORDER.indexOf(x.cat) - CAT_ORDER.indexOf(y.cat) || x.name.localeCompare(y.name)
        )
      : SKILLS.filter((s) => s.cat === activeFilter).sort((x, y) => x.name.localeCompare(y.name));

  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "4rem" }}>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: a, letterSpacing: "0.1em" }}>04</span>
        <h2 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
          Skills
        </h2>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setActiveFilter(c)}
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.4rem 1rem",
              borderRadius: "2px",
              border: `1px solid ${activeFilter === c ? a : "var(--border)"}`,
              background: activeFilter === c ? `color-mix(in srgb, ${a} 12%, transparent)` : "transparent",
              color: activeFilter === c ? a : "var(--muted)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        className="skills-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "1px",
          background: "var(--border)",
          border: "1px solid var(--border)",
        }}
      >
        {filtered.map((skill, i) => (
          <div
            key={i}
            style={{ background: "var(--bg)", padding: "1.25rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem", transition: "background 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--surface)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg)")}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: CAT_COLORS[skill.cat] || a }} />
            <span style={{ fontFamily: "var(--ff-head)", fontSize: "0.9rem", fontWeight: 600 }}>{skill.name}</span>
            <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {skill.cat}
            </span>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div style={{ marginTop: "5rem" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Certifications
        </div>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {CERTS.map((cert, i) => (
            <a
              key={i}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                border: "1px solid var(--border)",
                padding: "1rem 1.5rem",
                borderRadius: "4px",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `color-mix(in srgb, ${a} 40%, transparent)`;
                el.style.background = "var(--surface)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.background = "transparent";
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cert.img} alt={cert.name} style={{ width: "44px", height: "44px" }} />
              <div>
                <div style={{ fontFamily: "var(--ff-head)", fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>
                  {cert.name}
                </div>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: a, letterSpacing: "0.08em" }}>
                  Cisco · Credly ↗
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); }
        }
      `}</style>
    </section>
  );
}
