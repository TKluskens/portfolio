"use client";

import React, { useEffect, useState } from "react";

export default function Hero() {
  const [accent, setAccent] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const update = () =>
      setAccent(getComputedStyle(document.documentElement).getPropertyValue("--accent").trim());
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("showCursor");
    if (saved !== null) setShowCursor(saved !== "false");
  }, []);

  const a = accent || "var(--accent)";

  return (
    <section
      id="home"
      style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem", overflow: "hidden" }}
    >
      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      {/* Glow */}
      <div style={{ position: "absolute", top: "20%", right: "10%", width: "500px", height: "500px", background: `radial-gradient(circle, color-mix(in srgb, ${a} 10%, transparent) 0%, transparent 70%)`, pointerEvents: "none" }} />

      {/* Top row — hidden on mobile, shown on desktop */}
      <div className="hero-top-row">
        <div className="fade-up fade-up-1">
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Currently</div>
          <div style={{ color: "var(--text)", fontSize: "1rem", fontWeight: 300, maxWidth: "340px", lineHeight: 1.4 }}>Bachelor Applied IT · HoGent · Final Year</div>
        </div>
        <div className="fade-up fade-up-2" style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Specialization</div>
          <div style={{ color: "var(--text)", fontSize: "1rem", fontWeight: 300 }}>Frontend Developer</div>
        </div>
      </div>

      {/* Big name */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <h1
          className="fade-up fade-up-2 hero-name"
          style={{ fontFamily: "var(--ff-head)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: "2rem" }}
        >
          <span style={{ color: a }}>T</span>OM<br />
          <span style={{ color: a }}>K</span>LUSKENS
          {showCursor && <span className="cursor" />}
        </h1>

        {/* Mobile subtitle */}
        <div className="hero-mobile-sub fade-up fade-up-3">
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Bachelor Applied IT · HoGent</div>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Frontend Developer</div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fade-up fade-up-4 hero-bottom" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em" }}>Ghent, Belgium</div>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.6rem", color: "var(--muted)", opacity: 0.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>Founder of Exinal</div>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.5rem", background: a, color: "var(--bg)", fontFamily: "var(--ff-head)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.05em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            View Work ↓
          </a>
          <a
            href="#contact"
            style={{ color: "var(--muted)", fontFamily: "var(--ff-head)", fontSize: "0.78rem", letterSpacing: "0.05em", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid var(--border)", paddingBottom: "2px", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
          >
            Get in touch
          </a>
        </div>
      </div>

      <style>{`
        .hero-name { font-size: clamp(3.5rem, 10vw, 9rem); }
        .hero-top-row {
          position: absolute; top: 7rem; left: 2rem; right: 2rem;
          display: flex; justify-content: space-between; align-items: flex-start;
        }
        .hero-bottom {
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid var(--border); padding-top: 1rem;
        }
        .hero-mobile-sub { display: none; margin-bottom: 1.5rem; }

        @media (max-width: 640px) {
          .hero-top-row { display: none !important; }
          .hero-mobile-sub { display: block !important; }
          .hero-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1rem;
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
