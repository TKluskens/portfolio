"use client";

import React, { useState, useEffect } from "react";

const NAV_LINKS = ["About", "Projects", "Experience", "Skills", "Thesis", "Contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accent, setAccent] = useState<string>("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
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

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          background: scrolled || menuOpen
            ? "color-mix(in oklch, var(--bg) 96%, transparent)"
            : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.4s ease",
          fontFamily: "var(--ff-head)",
        }}
      >
        <a
          href="#home"
          style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.01em", color: a, textDecoration: "none" }}
        >
          <span style={{ color: a }}>T</span>K
        </a>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                color: "var(--muted)", fontSize: "0.85rem", textDecoration: "none",
                letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 500,
                transition: "color 0.2s", fontFamily: "var(--ff-head)",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = a)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
            >
              {l}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/tom-kluskens-562a8522b/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.5rem 1.25rem", border: `1px solid ${a}`, color: a,
              borderRadius: "2px", fontSize: "0.8rem", textDecoration: "none",
              fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase",
              transition: "all 0.2s", fontFamily: "var(--ff-head)",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = a; el.style.color = "var(--bg)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = a; }}
          >
            LinkedIn →
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "none", flexDirection: "column", gap: "5px", padding: "4px",
          }}
        >
          <span style={{ display: "block", width: "22px", height: "2px", background: "var(--text)", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: "var(--text)", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: "var(--text)", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className="mobile-drawer"
        style={{
          position: "fixed", top: "64px", left: 0, right: 0, zIndex: 99,
          background: "color-mix(in oklch, var(--bg) 96%, transparent)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          padding: menuOpen ? "1.5rem" : "0 1.5rem",
          maxHeight: menuOpen ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease, padding 0.35s ease",
          display: "none",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "var(--muted)", fontSize: "1rem", textDecoration: "none",
                letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 500,
                fontFamily: "var(--ff-head)", padding: "0.9rem 0",
                borderBottom: "1px solid var(--border)", transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = a)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
            >
              {l}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/tom-kluskens-562a8522b/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "inline-flex", alignItems: "center", alignSelf: "flex-start",
              marginTop: "1rem", marginBottom: "0.5rem",
              padding: "0.75rem 1.5rem", border: `1px solid ${a}`, color: a,
              borderRadius: "2px", fontSize: "0.85rem", textDecoration: "none",
              fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase",
              fontFamily: "var(--ff-head)",
            }}
          >
            LinkedIn →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-drawer { display: block !important; }
        }
      `}</style>
    </>
  );
}
