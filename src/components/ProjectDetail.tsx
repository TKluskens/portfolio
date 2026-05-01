"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── Theme hook ────────────────────────────────────────────────────────────────

function useIsLight() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const update = () => setLight(document.documentElement.classList.contains("light"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return light;
}

// Light/dark palette helpers — keep per-project accent, swap neutrals
function palette(isLight: boolean, accentH: number, accentC: number, accentL: number) {
  const accent = `oklch(${accentL}% ${accentC} ${accentH})`;
  if (isLight) {
    return {
      accent,
      bg:      "oklch(100% 0 0)",
      surface: "oklch(96% 0 0)",
      border:  "oklch(85% 0 0)",
      muted:   "oklch(45% 0 0)",
      text:    "oklch(15% 0 0)",
    };
  }
  const l = accentL;
  return {
    accent,
    bg:      `oklch(10% 0.01 ${accentH})`,
    surface: `oklch(14% 0.012 ${accentH})`,
    border:  `oklch(22% 0.012 ${accentH})`,
    muted:   `oklch(60% 0.01 ${accentH})`,
    text:    `oklch(${Math.max(l - 20, 70)}% 0.008 ${accentH})`,
  };
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function BackButton({ onClose, color }: { onClose: () => void; color: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClose}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: "0.5rem",
        background: "none", border: "none", cursor: "pointer",
        color: hov ? color : "var(--muted)",
        fontFamily: "var(--ff-mono)", fontSize: "0.72rem",
        letterSpacing: "0.08em", textTransform: "uppercase",
        transition: "color 0.2s", padding: 0, flexShrink: 0,
      }}>
      ← Back
    </button>
  );
}

function TechTag({ name, color, border }: { name: string; color: string; border: string }) {
  return (
    <span style={{
      fontFamily: "var(--ff-mono)", fontSize: "0.65rem",
      padding: "0.25rem 0.6rem", borderRadius: "2px",
      background: "transparent",
      color,
      border: `1px solid ${border}`,
      letterSpacing: "0.05em",
    }}>{name}</span>
  );
}

function FeaturesCard({ features, accent, borderColor, bg, mutedColor }: {
  features: string[]; accent: string; borderColor: string; bg: string; mutedColor: string;
}) {
  return (
    <div style={{
      borderLeft: `1px solid ${borderColor}`,
      borderRight: `1px solid ${borderColor}`,
      borderBottom: `1px solid ${borderColor}`,
      borderTop: `3px solid ${accent}`,
      padding: "1.75rem",
      marginBottom: "3rem",
      background: bg,
    }}>
      <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", color: accent, marginBottom: "1rem", letterSpacing: "0.1em" }}>FEATURES</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {features.map(f => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem" }}>
            <span style={{ color: accent, fontSize: "0.7rem" }}>▸</span>
            <span style={{ color: mutedColor }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionBlock({ title, body, accent, border, muted, marker }: {
  title: string; body: string; accent: string; border: string; muted: string; marker?: string;
}) {
  return (
    <div style={{ marginBottom: "2.5rem", paddingBottom: "2.5rem", borderBottom: `1px solid ${border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <span style={{ color: accent, fontSize: "0.8rem", fontFamily: "var(--ff-mono)" }}>{marker || "//"}</span>
        <h2 style={{ fontFamily: "var(--ff-head)", fontSize: "1.1rem", fontWeight: 700 }}>{title}</h2>
      </div>
      <p style={{ lineHeight: 1.8, color: muted, fontSize: "0.95rem" }}>{body}</p>
    </div>
  );
}

function GitHubLink({ url, accent }: { url: string; accent: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={url} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        fontFamily: "var(--ff-mono)", fontSize: "0.72rem",
        color: hov ? accent : "var(--muted)",
        textDecoration: "none", letterSpacing: "0.06em",
        border: `1px solid ${hov ? accent : "var(--border)"}`,
        padding: "0.5rem 1rem", borderRadius: "2px",
        transition: "color 0.2s, border-color 0.2s",
        flexShrink: 0,
      }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
      <span className="gh-label">View on GitHub ↗</span>
    </a>
  );
}

function PrivateBadge({ client }: { client: string }) {
  return (
    <span style={{
      fontFamily: "var(--ff-mono)", fontSize: "0.62rem",
      padding: "0.35rem 0.75rem", borderRadius: "2px",
      border: "1px solid var(--border)",
      color: "var(--muted)", letterSpacing: "0.06em",
      textTransform: "uppercase", flexShrink: 0,
    }}>
      Private · {client}
    </span>
  );
}

function ScreenshotFrame({
  src,
  alt,
  ratio = "16 / 9",
  maxWidth,
  imageStyle,
}: {
  src: string;
  alt: string;
  ratio?: string;
  maxWidth?: string;
  imageStyle?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        marginBottom: "3rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: maxWidth ?? "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: ratio,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 840px) 100vw, 800px"
            style={{
              objectFit: "contain",
              ...imageStyle,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Project types ─────────────────────────────────────────────────────────────

export type PublicProject = {
  id: string;
  title: string;
  year: string;
  tags: string[];
  description: string;
  imageUrl: string;
  sourceLink: string;
};

export type PrivateProject = {
  id: string;
  title: string;
  year: string;
  tags: string[];
  description: string;
  client: string;
};

export type AnyProject = PublicProject | PrivateProject;

// ── Shared detail layout ──────────────────────────────────────────────────────

function DetailShell({
  children, bg, text, border, accent,
  headerLabel, headerRight,
  onClose,
}: {
  children: React.ReactNode;
  bg: string; text: string; border: string; accent: string;
  headerLabel: string;
  headerRight: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div style={{ minHeight: "100%", background: bg, color: text, fontFamily: "var(--ff-body)" }}>
      <div style={{
        borderBottom: `1px solid ${border}`,
        padding: "1rem 1.25rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, background: bg, zIndex: 10, gap: "0.75rem",
      }}>
        <BackButton onClose={onClose} color={accent} />
        <span className="detail-header-label" style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: accent, letterSpacing: "0.1em" }}>{headerLabel}</span>
        {headerRight}
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.25rem" }} className="detail-body">
        {children}
      </div>
      <style>{`
        @media (min-width: 640px) {
          .detail-body { padding: 4rem 2.5rem !important; }
          .detail-header-label { display: inline !important; }
        }
        @media (max-width: 639px) {
          .detail-header-label { display: none !important; }
          .gh-label { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ── 1. School Library System ──────────────────────────────────────────────────
function LibraryDetail({ project, onClose }: { project: AnyProject; onClose: () => void }) {
  const isLight = useIsLight();
  const { accent, bg, surface, border, muted, text } = palette(isLight, 5, 0.13, 48);
  const p = project as PublicProject;

  return (
    <DetailShell bg={bg} text={text} border={border} accent={accent}
      headerLabel="SCHOOL LIBRARY SYSTEM · 2023"
      headerRight={<GitHubLink url={p.sourceLink} accent={accent} />}
      onClose={onClose}
    >
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: accent, marginBottom: "1rem", letterSpacing: "0.1em" }}>── PROJECT RECORD ──</div>
        <h1 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "1.5rem" }}>
          School Library<br />System
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: muted, maxWidth: "580px" }}>
          A full library management system that assigns every book a unique ISBN and automatically generates a scannable QR code — replacing manual lookup with instant scanning.
        </p>
      </div>

      <FeaturesCard accent={accent} borderColor={border} bg={surface} mutedColor={muted} features={[
        "Automatic QR code generation per book",
        "Unique ISBN assignment for each title",
        "Student loan tracking & return management",
        "Overdue alerts and loan history",
        "Book inventory management",
        "Admin dashboard with live stats",
      ]} />

      <ScreenshotFrame
        src="/files/Project_Bib.jpg"
        alt="School Library"
        imageStyle={{ filter: "sepia(10%) contrast(1.05)" }}
      />

      <SectionBlock accent={accent} border={border} muted={muted} marker="//" title="What it does"
        body="The system manages the full lifecycle of a school library: book inventory, student loan records, return tracking, and overdue alerts. Every book added to the system gets a unique ISBN assigned and a QR code generated — students or librarians can scan to instantly look up a book's status. An admin dashboard shows live inventory stats and loan history."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="//" title="How it's built"
        body="Built with a classic PHP/MySQL stack — no framework, everything hand-rolled. The backend handles CRUD operations for books, students, and loans. QR code generation uses a PHP library that encodes the ISBN into a scannable image stored server-side. The frontend is semantic HTML with custom CSS, optimised for use on a school's shared computers."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="//" title="Architecture"
        body="Single-server MVC-style structure: PHP scripts handle routing and logic, MySQL stores all data, HTML/CSS renders the views. No JavaScript framework — fast, simple, and deployable on any shared hosting with PHP support."
      />

      <div>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", color: accent, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>STACK</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {p.tags.map(t => <TechTag key={t} name={t} border={border} color={muted} />)}
        </div>
      </div>
    </DetailShell>
  );
}

// ── 2. Turtle SRL Dashboard ───────────────────────────────────────────────────
function TurtleDetail({ project, onClose }: { project: AnyProject; onClose: () => void }) {
  const isLight = useIsLight();
  const { accent, bg, surface, border, muted, text } = palette(isLight, 250, 0.16, 62);
  const p = project as PublicProject;

  return (
    <DetailShell bg={bg} text={text} border={border} accent={accent}
      headerLabel="TURTLE SRL DASHBOARD · 2023"
      headerRight={<GitHubLink url={p.sourceLink} accent={accent} />}
      onClose={onClose}
    >
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: accent, marginBottom: "1rem", letterSpacing: "0.1em" }}>TURTLE SRL · CESENATICO, ITALY</div>
        <h1 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "1.5rem" }}>
          Data Visualization<br />Dashboard
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: muted, maxWidth: "580px" }}>
          Built during an internship at Turtle Srl on the Adriatic coast — converts raw customer datasets into clear, interactive charts for business reporting.
        </p>
      </div>

      <FeaturesCard accent={accent} borderColor={border} bg={surface} mutedColor={muted} features={[
        "Interactive bar charts, line graphs & summary tables",
        "Customer data ingestion from internal exports",
        "Monthly & yearly activity visualizations",
        "Business KPI overview per time period",
        "Responsive layout for any screen",
        "Zero-build-step — runs in any browser",
      ]} />

      <ScreenshotFrame src="/files/Project_Italie.png" alt="Dashboard" />

      <SectionBlock accent={accent} border={border} muted={muted} marker="→" title="What it does"
        body="The dashboard ingests customer data exported from Turtle Srl's internal systems and renders it as a suite of interactive charts — bar charts, line graphs, and summary tables. It gives the sales and operations team a visual overview of customer activity, trends, and KPIs without touching raw spreadsheets."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="→" title="How it's built"
        body="Pure vanilla JavaScript — no framework. Chart.js handles the chart rendering, wired to JSON data fetched from a lightweight local API. HTML and CSS handle layout and responsiveness. The project intentionally kept dependencies minimal so it could run on any browser without a build step."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="→" title="Context"
        body="Developed during a summer internship at Turtle Srl in Cesenatico, Italy. It was a solo project with direct feedback from the client team, making it a strong exercise in translating business needs into clear UI decisions."
      />

      <div>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", color: accent, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>STACK</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {p.tags.map(t => <TechTag key={t} name={t} border={border} color={muted} />)}
        </div>
      </div>
    </DetailShell>
  );
}

// ── 3. Recipe Relay ───────────────────────────────────────────────────────────
function RecipeDetail({ project, onClose }: { project: AnyProject; onClose: () => void }) {
  const isLight = useIsLight();
  const { accent, bg, surface, border, muted, text } = palette(isLight, 45, 0.18, 68);
  const p = project as PublicProject;

  return (
    <DetailShell bg={bg} text={text} border={border} accent={accent}
      headerLabel="RECIPE RELAY · 2024"
      headerRight={<GitHubLink url={p.sourceLink} accent={accent} />}
      onClose={onClose}
    >
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: accent, marginBottom: "1rem", letterSpacing: "0.1em" }}>SOCIAL · FOOD · STUDENTS</div>
        <h1 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.95, marginBottom: "1.5rem" }}>
          Recipe<br />Relay
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: muted, maxWidth: "560px" }}>
          A social recipe-sharing platform built for students — upload your go-to dishes, discover what your friends cook, and build a collection worth keeping.
        </p>
      </div>

      <FeaturesCard accent={accent} borderColor={border} bg={surface} mutedColor={muted} features={[
        "Upload & manage personal recipes with photos",
        "Social feed built around your friend graph",
        "Like & comment on recipes",
        "Search by ingredient or tag",
        "Follow friends and discover trending dishes",
        "Student-first UI, mobile-friendly",
      ]} />

      <ScreenshotFrame src="/files/Project_Recept.png" alt="Recipe Relay" />

      <SectionBlock accent={accent} border={border} muted={muted} marker="◆" title="What it does"
        body="Recipe Relay is a full social platform for sharing recipes — students can create an account, post recipes with photos, follow friends, like and comment on dishes, and discover trending meals. Think of it as a student-focused cooking community where the feed is built around your social graph."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="◆" title="How it's built"
        body="React frontend with Tailwind CSS for styling, wired to a Node.js/Express REST API. MySQL handles persistent storage for users, recipes, likes, comments, and follow relationships. Authentication uses JWT tokens stored in localStorage. Images are uploaded via multipart form and stored server-side."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="◆" title="Architecture"
        body="Classic two-tier web app: a React SPA talks to a RESTful Express API, which queries MySQL. The API is structured around resources (users, recipes, comments) with middleware handling auth and file uploads. The frontend uses React Router for navigation and Context for global auth state."
      />

      <div>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", color: accent, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>STACK</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {p.tags.map(t => <TechTag key={t} name={t} border={border} color={muted} />)}
        </div>
      </div>
    </DetailShell>
  );
}

// ── 4. ConfySpring ────────────────────────────────────────────────────────────
function ConfyDetail({ project, onClose }: { project: AnyProject; onClose: () => void }) {
  const isLight = useIsLight();
  const { accent, bg, surface, border, muted, text } = palette(isLight, 145, 0.2, 65);
  const p = project as PublicProject;

  return (
    <DetailShell bg={bg} text={text} border={border} accent={accent}
      headerLabel="CONFYSPRING · 2024"
      headerRight={<GitHubLink url={p.sourceLink} accent={accent} />}
      onClose={onClose}
    >
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: accent, marginBottom: "1rem", letterSpacing: "0.1em" }}>HOGENT · EWD EXAM PROJECT · JAVA</div>
        <h1 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "1.5rem" }}>
          ConfySpring
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: muted, maxWidth: "560px" }}>
          Conference management system built as an exam project at HoGent. Handles the full event pipeline: speakers, session scheduling, venue management, and attendee registration.
        </p>
      </div>

      <FeaturesCard accent={accent} borderColor={border} bg={surface} mutedColor={muted} features={[
        "Create and manage conference events",
        "Speaker profiles & session assignment",
        "Room & venue capacity management",
        "Attendee registration with confirmation",
        "Role-based access: admin vs. attendee",
        "Full admin panel for all entities",
      ]} />

      <ScreenshotFrame src="/files/ConfySpring.png" alt="ConfySpring" />

      <SectionBlock accent={accent} border={border} muted={muted} marker="▹" title="What it does"
        body="ConfySpring is a complete conference management platform. Organisers can create events, add speakers and sessions, assign rooms, and manage capacity. Attendees register for sessions, get confirmation emails, and can browse the schedule. The admin panel gives full control over all entities."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="▹" title="How it's built"
        body="Java Spring Boot backend with Spring MVC, Spring Security for role-based auth (admin vs. attendee), and Spring Data JPA for persistence. Thymeleaf renders server-side templates. MySQL stores all data. The project follows a strict layered architecture: Controller → Service → Repository."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="▹" title="Architecture"
        body="Classic Spring MVC monolith with Thymeleaf server-side rendering. Security is handled by Spring Security with form login and CSRF protection. JPA entities model the domain: Conference, Speaker, Session, Room, Registration, User."
      />

      <div>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", color: accent, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>STACK</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {p.tags.map(t => <TechTag key={t} name={t} border={border} color={muted} />)}
        </div>
      </div>
    </DetailShell>
  );
}

// ── 5. Delaware Dashboard ─────────────────────────────────────────────────────
function DelawareDetail({ project, onClose }: { project: AnyProject; onClose: () => void }) {
  const isLight = useIsLight();
  const { accent, bg, surface, border, muted, text } = palette(isLight, 25, 0.2, 58);
  const p = project as PublicProject;

  return (
    <DetailShell bg={bg} text={text} border={border} accent={accent}
      headerLabel="DELAWARE · 2025"
      headerRight={<GitHubLink url={p.sourceLink} accent={accent} />}
      onClose={onClose}
    >
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: accent, marginBottom: "1rem", letterSpacing: "0.1em" }}>DELAWARE · TEAM OF 5 · FULL-STACK</div>
        <h1 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "1.5rem" }}>
          Machine Status<br />Dashboard
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: muted, maxWidth: "560px" }}>
          Real-time machine monitoring dashboard for Delaware&apos;s industrial clients — tracks machine health, uptime KPIs, and status across multiple production sites.
        </p>
      </div>

      <FeaturesCard accent={accent} borderColor={border} bg={surface} mutedColor={muted} features={[
        "Real-time machine online/offline/warning status",
        "Per-site KPI overview and uptime tracking",
        "Multi-site filtering and drill-down",
        "Alert system for machine anomalies",
        "Historical uptime and status data",
        "Role-based access for operators and admins",
      ]} />

      <ScreenshotFrame src="/files/Project_Dellaware.png" alt="Delaware Dashboard" />

      <SectionBlock accent={accent} border={border} muted={muted} marker="→" title="What it does"
        body="The dashboard gives Delaware's clients a real-time view of their production floor: each machine's online/offline/warning status, uptime KPIs, and per-site breakdowns. Operators can filter by site, drill into machine history, and see alerts. The design prioritises scanability for factory-floor use."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="→" title="How it's built"
        body="React frontend with a Node.js API gateway sitting in front of a Java microservice layer. The Java services own the business logic and data access (MySQL), while Node.js handles aggregation, auth, and serving the React SPA. The team of 5 split across frontend, API, and Java service ownership."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="→" title="Architecture"
        body="Three-layer architecture: React SPA → Node.js REST gateway → Java microservices → MySQL. The Java layer is intentionally decoupled, allowing independent deployment. The Node.js layer handles JWT auth and request routing. Frontend uses React Query for data fetching and caching."
      />

      <div>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", color: accent, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>STACK</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {p.tags.map(t => <TechTag key={t} name={t} border={border} color={muted} />)}
        </div>
      </div>
    </DetailShell>
  );
}

// ── 6. Webscraper ─────────────────────────────────────────────────────────────
function WebscraperDetail({ project, onClose }: { project: AnyProject; onClose: () => void }) {
  const isLight = useIsLight();
  const { accent, bg, surface, border, muted, text } = palette(isLight, 290, 0.18, 62);
  const p = project as PrivateProject;

  return (
    <DetailShell bg={bg} text={text} border={border} accent={accent}
      headerLabel="WEBSCRAPER · 2026"
      headerRight={<PrivateBadge client={p.client} />}
      onClose={onClose}
    >
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: accent, marginBottom: "1rem", letterSpacing: "0.1em" }}>TURTLE SRL · PYTHON · LLM · ASYNC</div>
        <h1 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "1.5rem" }}>
          Webscraper
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: muted, maxWidth: "580px" }}>
          Async FastAPI service that discovers pages via sitemaps, filters candidate URLs using deterministic rules and LLM assistance, then scrapes and stores results in MongoDB.
        </p>
      </div>

      <FeaturesCard accent={accent} borderColor={border} bg={surface} mutedColor={muted} features={[
        "Sitemap-based automatic page discovery",
        "LLM-assisted URL filtering & relevance scoring",
        "BeautifulSoup + Playwright dual-mode scraping",
        "MongoDB storage with structured results",
        "Rate limiting & API key protection",
        "Deployable on Docker or Scaleway serverless",
      ]} />

      <SectionBlock accent={accent} border={border} muted={muted} marker="//" title="What it does"
        body="The scraper starts from a sitemap, crawls the site structure, and filters which pages are worth scraping using a mix of deterministic rules (URL patterns, content-type checks) and an LLM that scores candidate URLs for relevance. Matched pages are scraped with BeautifulSoup for static content and Playwright for JavaScript-heavy pages. Results land in MongoDB."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="//" title="How it's built"
        body="Built on Python with FastAPI for the async HTTP layer. Playwright handles headless browser scraping where needed; BeautifulSoup handles lighter static pages. An LLM (via API) evaluates URL relevance as part of the filtering pipeline. The service is fully rate-limited, requires an API key, and ships as a Docker container or Scaleway serverless function."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="//" title="Architecture"
        body="Event-driven async pipeline: discovery → filter → scrape → store. FastAPI exposes endpoints to trigger jobs and retrieve results. MongoDB collections hold raw and processed outputs. The LLM call is isolated so it can be swapped or toggled off. Config via environment variables; secrets injected at runtime."
      />

      <div>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", color: accent, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>STACK</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {p.tags.map(t => <TechTag key={t} name={t} border={border} color={muted} />)}
        </div>
      </div>
    </DetailShell>
  );
}

// ── 7. Websearcher ────────────────────────────────────────────────────────────
function WebsearcherDetail({ project, onClose }: { project: AnyProject; onClose: () => void }) {
  const isLight = useIsLight();
  const { accent, bg, surface, border, muted, text } = palette(isLight, 265, 0.17, 60);
  const p = project as PrivateProject;

  return (
    <DetailShell bg={bg} text={text} border={border} accent={accent}
      headerLabel="WEBSEARCHER · 2026"
      headerRight={<PrivateBadge client={p.client} />}
      onClose={onClose}
    >
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: accent, marginBottom: "1rem", letterSpacing: "0.1em" }}>TURTLE SRL · VECTOR DB · EMBEDDINGS · LLM</div>
        <h1 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "1.5rem" }}>
          Websearcher
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: muted, maxWidth: "580px" }}>
          Microservice that takes a search query, retrieves the top 10 web results, scrapes and vectorises their content, and returns semantically relevant results — with an LLM chat interface on top.
        </p>
      </div>

      <FeaturesCard accent={accent} borderColor={border} bg={surface} mutedColor={muted} features={[
        "Query-driven web search with top 10 result retrieval",
        "Full page scraping & content extraction",
        "Vector indexing with text embeddings",
        "Semantic search over indexed page content",
        "Repeated query caching for fast responses",
        "LLM agent chat for natural-language product search",
      ]} />

      <SectionBlock accent={accent} border={border} muted={muted} marker="→" title="What it does"
        body="Given a search query, the service fetches the top 10 web results, scrapes their full content, and indexes everything as vectors. Subsequent queries hit the vector store for semantically relevant answers rather than raw keyword matches. Repeated queries are served from cache. A chat interface lets users search in plain language, with the LLM agent orchestrating retrieval."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="→" title="How it's built"
        body="Python FastAPI service with Playwright for scraping and a vector database for embedding storage and retrieval. Text is chunked, embedded via an embedding model, and stored for cosine-similarity search. The LLM agent layer interprets queries, decides what to retrieve, and formats responses. Docker for deployment."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="→" title="Architecture"
        body="Pipeline: query → web search API → scrape → embed → index → retrieve → LLM response. Cache sits between query and scrape: if a query was recently processed, the vector index is reused. The LLM agent is stateless — context is rebuilt each turn from retrieved chunks."
      />

      <div>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", color: accent, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>STACK</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {p.tags.map(t => <TechTag key={t} name={t} border={border} color={muted} />)}
        </div>
      </div>
    </DetailShell>
  );
}

// ── 8. Echo ───────────────────────────────────────────────────────────────────
function EchoDetail({ project, onClose }: { project: AnyProject; onClose: () => void }) {
  const isLight = useIsLight();
  const { accent, bg, surface, border, muted, text } = palette(isLight, 185, 0.16, 64);
  const p = project as PrivateProject;

  return (
    <DetailShell bg={bg} text={text} border={border} accent={accent}
      headerLabel="ECHO · 2026"
      headerRight={<PrivateBadge client={p.client} />}
      onClose={onClose}
    >
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: accent, marginBottom: "1rem", letterSpacing: "0.1em" }}>TURTLE SRL · WHISPERX · LLM · AUDIO → DOCUMENT</div>
        <h1 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.9, marginBottom: "1.5rem" }}>
          Echo
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: muted, maxWidth: "580px" }}>
          Turns audio recordings of business interviews into structured Word documents — transcribe, clean, review, generate.
        </p>
      </div>

      <FeaturesCard accent={accent} borderColor={border} bg={surface} mutedColor={muted} features={[
        "MP3 transcription via WhisperX",
        "LLM-based transcript cleaning & formatting",
        "Human review & inline editing interface",
        "Template paragraph answering from transcript",
        "Vector retrieval for contextual accuracy",
        "Structured Word document (.docx) generation",
      ]} />

      <SectionBlock accent={accent} border={border} muted={muted} marker="◆" title="What it does"
        body="Echo takes MP3 recordings of business interviews and turns them into polished Word documents. The audio is transcribed by WhisperX, then an LLM cleans and structures the transcript. The user reviews and edits the output in a web interface before triggering report generation — where the LLM fills out a predefined document template by answering each paragraph using the transcript and vector-retrieved context."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="◆" title="How it's built"
        body="React frontend for the review/edit interface, FastAPI backend for all processing. WhisperX handles audio transcription. PostgreSQL stores users, jobs, and document state; Redis manages job queues and session state; Qdrant is the vector store for embedding-based retrieval. The LLM layer handles both transcript cleaning and paragraph-level report generation."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="◆" title="Architecture"
        body="Upload → transcribe (WhisperX) → clean (LLM) → review (React UI) → generate (LLM + Qdrant retrieval) → export (.docx). Long-running jobs are queued via Redis. Qdrant stores transcript chunks as vectors; at generation time, each template paragraph queries the vector store for relevant context before the LLM writes the answer."
      />

      <div>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", color: accent, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>STACK</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {p.tags.map(t => <TechTag key={t} name={t} border={border} color={muted} />)}
        </div>
      </div>
    </DetailShell>
  );
}

// ── 9. Nodo ───────────────────────────────────────────────────────────────────
function NodoDetail({ project, onClose }: { project: AnyProject; onClose: () => void }) {
  const isLight = useIsLight();
  const { accent, bg, surface, border, muted, text } = palette(isLight, 40, 0.22, 62);
  const p = project as PublicProject;

  return (
    <DetailShell bg={bg} text={text} border={border} accent={accent}
      headerLabel="NODO · 2025"
      headerRight={<GitHubLink url={p.sourceLink} accent={accent} />}
      onClose={onClose}
    >
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: accent, marginBottom: "1rem", letterSpacing: "0.1em" }}>HOGENT · TEAM OF 6 · CLEAN ARCHITECTURE</div>
        <h1 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.9, marginBottom: "1.5rem" }}>
          Nodo
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: muted, maxWidth: "580px" }}>
          Social media platform designed for people with mental difficulties — safe spaces, real-time chat, educator oversight, and push notifications, all in a Blazor WASM app.
        </p>
      </div>

      <FeaturesCard accent={accent} borderColor={border} bg={surface} mutedColor={muted} features={[
        "Social feed with posts, reactions and comments",
        "Real-time group & direct chat via SignalR",
        "Push notifications with VAPID / WebPush",
        "Educator and admin role management",
        "Profile pictures & account management",
        "Dual database: MySQL (relational) + MongoDB (chat)",
      ]} />

      <ScreenshotFrame
        src="/files/nodo.png"
        alt="Nodo"
        ratio="9 / 16"
        maxWidth="280px"
      />

      <SectionBlock accent={accent} border={border} muted={muted} marker="◇" title="What it does"
        body="Nodo is a social platform built with accessibility in mind for users with mental difficulties. Users can post to a feed, react and comment, chat in real time with individuals or groups, and receive push notifications for activity. Educators can oversee their group's users, while admins manage roles and accounts across the platform."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="◇" title="How it's built"
        body="Blazor WebAssembly frontend served by an ASP.NET 9 host. FastEndpoints exposes the REST API with FluentValidation on every endpoint. Entity Framework 9 with Pomelo handles the MySQL relational store; MongoDB with the official EF provider stores chat history and projections. SignalR hubs power real-time chat and notifications. Tailwind CSS is compiled via npm. Built by a team of 6 at HoGent using Clean Architecture, DDD, and vertical slicing."
      />
      <SectionBlock accent={accent} border={border} muted={muted} marker="◇" title="Architecture"
        body="Five-layer Clean Architecture: Domain → Services → Persistence → Server → Client, plus a Shared DTOs/contracts project. The Blazor WASM client talks to FastEndpoints over HTTP and connects to SignalR hubs for real-time updates. A centralised GlobalResponseSender post-processor maps Ardalis.Result return values to consistent HTTP codes. MySQL backs relational data; MongoDB handles the chat subsystem. xUnit, bUnit, nSubstitute and Shouldly cover domain, service, endpoint and component tests."
      />

      <div>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", color: accent, marginBottom: "0.75rem", letterSpacing: "0.1em" }}>STACK</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {p.tags.map(t => <TechTag key={t} name={t} border={border} color={muted} />)}
        </div>
      </div>
    </DetailShell>
  );
}

// ── Detail page dispatcher ────────────────────────────────────────────────────

const DETAIL_MAP: Record<string, React.FC<{ project: AnyProject; onClose: () => void }>> = {
  library:     LibraryDetail,
  turtle:      TurtleDetail,
  recipe:      RecipeDetail,
  confy:       ConfyDetail,
  delaware:    DelawareDetail,
  nodo:        NodoDetail,
  webscraper:  WebscraperDetail,
  websearcher: WebsearcherDetail,
  echo:        EchoDetail,
};

function ProjectDetailPage({ project, onClose }: { project: AnyProject; onClose: () => void }) {
  const Component = DETAIL_MAP[project.id] ?? LibraryDetail;
  return <Component project={project} onClose={onClose} />;
}

const PROJECT_CURSOR_ACCENTS: Record<string, string> = {
  library: "oklch(48% 0.13 5)",
  turtle: "oklch(62% 0.16 250)",
  recipe: "oklch(68% 0.18 45)",
  confy: "oklch(65% 0.2 145)",
  delaware: "oklch(58% 0.2 25)",
  nodo: "oklch(62% 0.22 40)",
  webscraper: "oklch(62% 0.18 290)",
  websearcher: "oklch(60% 0.17 265)",
  echo: "oklch(64% 0.16 185)",
};

// ── Slide overlay ─────────────────────────────────────────────────────────────

export function DetailOverlay({ project, onClose }: { project: AnyProject | null; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const prevProject = useRef<AnyProject | null>(null);
  const onCloseRef = useRef(onClose);
  const bodyOverflowRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (project) {
      prevProject.current = project;
      requestAnimationFrame(() => setOpen(true));
      scrollRef.current?.scrollTo({ top: 0 });
      document.documentElement.style.setProperty(
        "--project-cursor-accent",
        PROJECT_CURSOR_ACCENTS[project.id] ?? "var(--accent)"
      );
      if (bodyOverflowRef.current === null) {
        bodyOverflowRef.current = document.body.style.overflow;
      }
      document.body.style.overflow = "hidden";
      history.pushState({ detailOverlay: true }, "", location.pathname + "#project-" + project.id);
    } else {
      setOpen(false);
      document.documentElement.style.removeProperty("--project-cursor-accent");
      if (bodyOverflowRef.current !== null) {
        document.body.style.overflow = bodyOverflowRef.current;
        bodyOverflowRef.current = null;
      }
    }

    return () => {
      document.documentElement.style.removeProperty("--project-cursor-accent");
      if (bodyOverflowRef.current !== null) {
        document.body.style.overflow = bodyOverflowRef.current;
        bodyOverflowRef.current = null;
      }
    };
  }, [project]);

  // Browser back button: listen for popstate and close overlay
  useEffect(() => {
    const handler = (e: PopStateEvent) => {
      if (!e.state?.detailOverlay) {
        onCloseRef.current();
      }
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (history.state?.detailOverlay) history.back();
        else onCloseRef.current();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleClose = () => {
    if (history.state?.detailOverlay) {
      history.back();
    } else {
      onClose();
    }
  };

  const displayed = project ?? prevProject.current;

  return (
    <>
      <div
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "oklch(0% 0 0 / 0.5)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s",
        }}
      />
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="detail-overlay-scroll"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          height: "100dvh",
          width: "100vw",
          overflowY: "auto",
          overflowX: "hidden",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div
          style={{
            minHeight: "100%",
            width: "100%",
            maxWidth: "100%",
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
            overflowX: "hidden",
          }}
        >
          {displayed && <ProjectDetailPage project={displayed} onClose={handleClose} />}
        </div>
      </div>
      <style>{`
        .detail-overlay-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .detail-overlay-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
