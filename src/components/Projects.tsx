"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DetailOverlay, type AnyProject } from "./ProjectDetail";

const PUBLIC_PROJECTS = [
  { id: "library",   title: "School Library System", year: "2023", tags: ["HTML", "PHP", "MySQL", "CSS"], description: "A school library system that automatically generates QR codes with unique ISBN numbers for every book.", imageUrl: "/files/Project_Bib.jpg", sourceLink: "https://github.com/TKluskens/SchoolBib" },
  { id: "turtle",    title: "Turtle SRL Dashboard",  year: "2023", tags: ["JavaScript", "HTML", "CSS"], description: "Data visualization dashboard converting customer data into charts. Built during my internship in Cesenatico, Italy.", imageUrl: "/files/Project_Italie.png", sourceLink: "https://github.com/TKluskens/Dashboard-Turtle" },
  { id: "recipe",    title: "Recipe Relay",           year: "2024", tags: ["React", "Node.js", "Tailwind", "MySQL"], description: "A social platform for students to upload, share, like and comment on recipes — with friends and discovery features.", imageUrl: "/files/Project_Recept.png", sourceLink: "https://github.com/TKluskens/RecipeRelay" },
  { id: "confy",     title: "ConfySpring",            year: "2024", tags: ["Java", "Spring Boot", "Thymeleaf", "MySQL"], description: "Conference event management system handling speakers, locations, and user registrations. EWD exam project at HoGent.", imageUrl: "/files/ConfySpring.png", sourceLink: "https://github.com/TKluskens/ConfySpring" },
  { id: "delaware",  title: "Delaware Dashboard",     year: "2025", tags: ["React", "Node.js", "Java", "MySQL"], description: "Machine status dashboard per site with KPIs, built for Delaware in a team of 5. Full-stack with a Java micro-service layer.", imageUrl: "/files/Project_Dellaware.png", sourceLink: "https://github.com/TomKluskens1/2025-react-gent14" },
];

const PRIVATE_PROJECTS = [
  { id: "webscraper",  title: "Webscraper",  year: "2026", tags: ["Python", "FastAPI", "MongoDB", "Playwright", "Docker", "LLM"], description: "Async FastAPI service that discovers pages via sitemaps, filters candidate URLs with deterministic rules + LLM assistance, scrapes with BeautifulSoup/Playwright, and stores results in MongoDB. Rate-limited, API-key protected, deployable on Scaleway serverless or Docker.", client: "Turtle Srl" },
  { id: "websearcher", title: "Websearcher", year: "2026", tags: ["Python", "FastAPI", "Vector DB", "Embeddings", "Playwright", "Docker"], description: "Microservice that takes a search query, retrieves the top 10 results, scrapes and processes page content, indexes it as vectors, and returns semantically relevant results. Repeated queries are served from cache. Includes an LLM agent chat interface for natural-language product search.", client: "Turtle Srl" },
  { id: "echo",        title: "Echo",        year: "2026", tags: ["React", "FastAPI", "PostgreSQL", "Redis", "Qdrant", "WhisperX", "LLM"], description: "Turns audio recordings of business interviews into structured Word documents. Transcribes MP3s via WhisperX, cleans with an LLM, lets users review and edit, then generates a full report by answering template paragraphs from transcriptions and vector retrieval.", client: "Turtle Srl" },
];

function useAccent() {
  const [accent, setAccent] = useState("");
  useEffect(() => {
    const update = () => setAccent(getComputedStyle(document.documentElement).getPropertyValue("--accent").trim());
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    return () => obs.disconnect();
  }, []);
  return accent || "var(--accent)";
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {tags.map((t) => (
        <span key={t} style={{ fontFamily: "var(--ff-mono)", fontSize: "0.62rem", padding: "0.2rem 0.55rem", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--muted)", letterSpacing: "0.04em" }}>{t}</span>
      ))}
    </div>
  );
}

function ListProjectCard({ project, accent, onOpen }: { project: typeof PUBLIC_PROJECTS[0]; accent: string; onOpen: (p: AnyProject) => void }) {
  return (
    <div
      className="list-card"
      style={{ borderTop: "1px solid var(--border)", padding: "1.75rem 0", transition: "padding-left 0.3s", cursor: "pointer" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.paddingLeft = "1rem")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.paddingLeft = "0")}
      onClick={() => onOpen(project)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem", gap: "1rem" }}>
        <div>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", marginBottom: "0.25rem" }}>{project.year}</div>
          <div style={{ fontFamily: "var(--ff-head)", fontSize: "1.15rem", fontWeight: 700 }}>{project.title}</div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onOpen(project); }} style={{ color: accent, fontFamily: "var(--ff-head)", fontSize: "0.8rem", fontWeight: 700, background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>View →</button>
      </div>
      <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{project.description}</p>
      <TagList tags={project.tags} />
    </div>
  );
}

function GridProjectCard({ project, accent, onOpen }: { project: typeof PUBLIC_PROJECTS[0]; accent: string; onOpen: (p: AnyProject) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ border: `1px solid ${hovered ? `color-mix(in srgb, ${accent} 40%, transparent)` : "var(--border)"}`, borderRadius: "4px", overflow: "hidden", background: "var(--surface)", transition: "border-color 0.3s, transform 0.3s", transform: hovered ? "translateY(-4px)" : "none", cursor: "pointer" }}
    >
      <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
        <Image src={project.imageUrl} alt={project.title} fill style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.5s", transform: hovered ? "scale(1.04)" : "scale(1)", filter: "grayscale(20%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--surface) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", top: "1rem", right: "1rem", fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: "var(--muted)", background: "var(--bg)", padding: "0.25rem 0.5rem", borderRadius: "2px", border: "1px solid var(--border)" }}>{project.year}</div>
      </div>
      <div style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
          <h3 style={{ fontFamily: "var(--ff-head)", fontSize: "1.1rem", fontWeight: 700 }}>{project.title}</h3>
          <span style={{ color: accent, fontSize: "1rem", display: "inline-block", transform: hovered ? "translate(3px,-3px)" : "none", transition: "transform 0.2s" }}>↗</span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1rem" }}>{project.description}</p>
        <TagList tags={project.tags} />
      </div>
    </div>
  );
}

function PrivateCard({ project, accent, onOpen }: { project: typeof PRIVATE_PROJECTS[0]; accent: string; onOpen: (p: AnyProject) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      style={{ border: "1px solid var(--border)", borderLeft: `3px solid ${hovered ? accent : "var(--border)"}`, borderRadius: "2px", background: hovered ? "var(--surface)" : "transparent", padding: "1.75rem", transition: "all 0.25s", cursor: "pointer" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <h3 style={{ fontFamily: "var(--ff-head)", fontSize: "1.1rem", fontWeight: 700 }}>{project.title}</h3>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", padding: "0.2rem 0.5rem", background: "oklch(52% 0.012 240 / 0.15)", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: "2px", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Private · {project.client}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: "var(--muted)" }}>{project.year}</span>
          <span style={{ color: hovered ? accent : "var(--muted)", fontFamily: "var(--ff-head)", fontSize: "0.8rem", fontWeight: 700, transition: "color 0.2s" }}>View →</span>
        </div>
      </div>
      <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1rem" }}>{project.description}</p>
      <TagList tags={project.tags} />
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [layout, setLayout] = useState<"list" | "grid">("list");
  const [activeProject, setActiveProject] = useState<AnyProject | null>(null);
  const accent = useAccent();

  useEffect(() => {
    const saved = localStorage.getItem("projectLayout") as "list" | "grid" | null;
    if (saved) setLayout(saved);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: accent, letterSpacing: "0.1em" }}>02</span>
        <h2 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>Projects</h2>
        <div style={{ flex: 1, height: "1px", background: "var(--border)", minWidth: "20px" }} />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {(["list", "grid"] as const).map((opt) => (
            <button key={opt} onClick={() => { setLayout(opt); localStorage.setItem("projectLayout", opt); }} style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.3rem 0.75rem", borderRadius: "2px", border: `1px solid ${layout === opt ? accent : "var(--border)"}`, background: layout === opt ? `color-mix(in srgb, ${accent} 12%, transparent)` : "transparent", color: layout === opt ? accent : "var(--muted)", cursor: "pointer", transition: "all 0.2s" }}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Public */}
      <div style={{ marginBottom: "5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>Public</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: "var(--muted)", marginBottom: "1.5rem", letterSpacing: "0.04em", opacity: 0.7 }}>
          Click any project to explore it in depth
        </div>

        {layout === "grid" ? (
          <div className="projects-grid">
            {PUBLIC_PROJECTS.map((p, i) => <GridProjectCard key={i} project={p} accent={accent} onOpen={setActiveProject} />)}
          </div>
        ) : (
          <div>
            {PUBLIC_PROJECTS.map((p, i) => <ListProjectCard key={i} project={p} accent={accent} onOpen={setActiveProject} />)}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        )}
      </div>

      {/* Private */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Private · Turtle Srl</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>
        <p style={{ fontFamily: "var(--ff-mono)", fontSize: "0.72rem", color: "var(--muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
          Developed during my internship at Turtle Srl — source code is confidential.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {PRIVATE_PROJECTS.map((p, i) => <PrivateCard key={i} project={p} accent={accent} onOpen={setActiveProject} />)}
        </div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <DetailOverlay project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
