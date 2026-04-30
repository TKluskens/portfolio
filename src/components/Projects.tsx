"use client";

import React, { useEffect, useRef, useState } from "react";
import { DetailOverlay, type AnyProject } from "./ProjectDetail";

const PROJECTS: AnyProject[] = [
  { id: "echo",        title: "Echo",                    year: "2026", tags: ["React", "FastAPI", "PostgreSQL", "Redis", "Qdrant", "WhisperX", "LLM"], description: "Turns audio recordings of business interviews into structured Word documents. Transcribes MP3s via WhisperX, cleans with an LLM, lets users review and edit, then generates a full report by answering template paragraphs from transcriptions and vector retrieval.", client: "Turtle Srl" },
  { id: "websearcher", title: "Websearcher",             year: "2026", tags: ["Python", "FastAPI", "Vector DB", "Embeddings", "Playwright", "Docker"], description: "Microservice that takes a search query, retrieves the top 10 results, scrapes and processes page content, indexes it as vectors, and returns semantically relevant results. Repeated queries are served from cache. Includes an LLM agent chat interface for natural-language product search.", client: "Turtle Srl" },
  { id: "webscraper",  title: "Webscraper",              year: "2026", tags: ["Python", "FastAPI", "MongoDB", "Playwright", "Docker", "LLM"], description: "Async FastAPI service that discovers pages via sitemaps, filters candidate URLs with deterministic rules + LLM assistance, scrapes with BeautifulSoup/Playwright, and stores results in MongoDB. Rate-limited, API-key protected, deployable on Scaleway serverless or Docker.", client: "Turtle Srl" },
  { id: "delaware",    title: "Delaware Dashboard",      year: "2025", tags: ["React", "Node.js", "Java", "MySQL"], description: "Machine status dashboard per site with KPIs, built for Delaware in a team of 5. Full-stack with a Java micro-service layer.", imageUrl: "/files/Project_Dellaware.png", sourceLink: "https://github.com/TomKluskens1/2025-react-gent14" },
  { id: "nodo",        title: "Nodo",                    year: "2025", tags: [".NET 9", "C#", "Blazor", "MySQL", "MongoDB", "SignalR", "Tailwind"], description: "Social media platform for people with mental difficulties. Built in a team of 6 at HoGent — clean architecture with Blazor WASM frontend, ASP.NET 9 API, real-time chat via SignalR, and push notifications.", imageUrl: "/files/nodo.png", sourceLink: "https://github.com/HOGENT-Rise/dotnet-2526-gent10" },
  { id: "confy",       title: "ConfySpring",             year: "2024", tags: ["Java", "Spring Boot", "Thymeleaf", "MySQL"], description: "Conference event management system handling speakers, locations, and user registrations. EWD exam project at HoGent.", imageUrl: "/files/ConfySpring.png", sourceLink: "https://github.com/TKluskens/ConfySpring" },
  { id: "recipe",      title: "Recipe Relay",            year: "2024", tags: ["React", "Node.js", "Tailwind", "MySQL"], description: "A social platform for students to upload, share, like and comment on recipes — with friends and discovery features.", imageUrl: "/files/Project_Recept.png", sourceLink: "https://github.com/TKluskens/RecipeRelay" },
  { id: "turtle",      title: "Turtle SRL Dashboard",   year: "2023", tags: ["JavaScript", "HTML", "CSS"], description: "Data visualization dashboard converting customer data into charts. Built during my internship in Cesenatico, Italy.", imageUrl: "/files/Project_Italie.png", sourceLink: "https://github.com/TKluskens/Dashboard-Turtle" },
  { id: "library",     title: "School Library System",  year: "2023", tags: ["HTML", "PHP", "MySQL", "CSS"], description: "A school library system that automatically generates QR codes with unique ISBN numbers for every book.", imageUrl: "/files/Project_Bib.jpg", sourceLink: "https://github.com/TKluskens/SchoolBib" },
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

function ListProjectCard({ project, index, accent, onOpen, visible, isFirstOfYear, isLast }: { project: AnyProject; index: number; accent: string; onOpen: (p: AnyProject) => void; visible: boolean; isFirstOfYear: boolean; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isPrivate = "client" in project;
  return (
    <div
      style={{ display: "flex", gap: "0", transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms`, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)" }}
    >
      {/* Timeline column */}
      <div style={{ width: "4.5rem", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1.85rem" }}>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.62rem", color: isFirstOfYear ? accent : "transparent", letterSpacing: "0.04em", marginBottom: "0.4rem", userSelect: "none", transition: "color 0.2s", whiteSpace: "nowrap" }}>
          {project.year}
        </span>
        <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: isFirstOfYear ? accent : "var(--border)", border: `1.5px solid ${isFirstOfYear ? accent : "var(--border)"}`, flexShrink: 0, transition: "background 0.2s" }} />
        {!isLast && <div style={{ width: "1px", flex: 1, background: "var(--border)", marginTop: "2px" }} />}
      </div>

      {/* Card */}
      <div
        className="list-card"
        style={{ flex: 1, padding: "1.75rem 0 1.75rem 1.25rem", transition: "padding-left 0.3s", cursor: "pointer", borderTop: "1px solid var(--border)" }}
        onMouseEnter={(e) => { setHovered(true); (e.currentTarget as HTMLElement).style.paddingLeft = "2rem"; }}
        onMouseLeave={(e) => { setHovered(false); (e.currentTarget as HTMLElement).style.paddingLeft = "1.25rem"; }}
        onClick={() => onOpen(project)}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem", gap: "1rem" }}>
          <div>
            {isPrivate && (
              <span style={{ display: "inline-block", fontFamily: "var(--ff-mono)", fontSize: "0.58rem", padding: "0.15rem 0.45rem", background: "oklch(52% 0.012 240 / 0.12)", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: "2px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                Private · {(project as { client: string }).client}
              </span>
            )}
            <div style={{ fontFamily: "var(--ff-head)", fontSize: "1.15rem", fontWeight: 700 }}>{project.title}</div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(project); }}
            style={{ color: hovered ? accent : "var(--muted)", fontFamily: "var(--ff-head)", fontSize: "0.8rem", fontWeight: 700, background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "color 0.2s" }}
          >
            View →
          </button>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{project.description}</p>
        <TagList tags={project.tags} />
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<AnyProject | null>(null);
  const accent = useAccent();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: accent, letterSpacing: "0.1em" }}>02</span>
        <h2 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>Projects</h2>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: "var(--muted)", opacity: 0.6, letterSpacing: "0.06em" }}>{PROJECTS.length}</span>
        <div style={{ flex: 1, height: "1px", background: "var(--border)", minWidth: "20px" }} />
      </div>

      <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: "var(--muted)", marginBottom: "1.5rem", letterSpacing: "0.04em", opacity: 0.7 }}>
        Click any project to explore it in depth
      </div>

      <div>
        {PROJECTS.map((p, i) => (
          <ListProjectCard
            key={p.id}
            project={p}
            index={i}
            accent={accent}
            onOpen={setActiveProject}
            visible={visible}
            isFirstOfYear={i === 0 || PROJECTS[i - 1].year !== p.year}
            isLast={i === PROJECTS.length - 1}
          />
        ))}
      </div>

      <DetailOverlay project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
