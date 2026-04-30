"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [accent, setAccent] = useState("");

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
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "2rem",
        overflow: "hidden",
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />
      {/* Glow */}
      <div style={{ position: "absolute", top: "20%", left: "10%", width: "500px", height: "500px", background: `radial-gradient(circle, color-mix(in srgb, ${a} 10%, transparent) 0%, transparent 70%)`, pointerEvents: "none" }} />

      {/* Top label */}
      <div style={{ position: "absolute", top: "7rem", left: "2rem", right: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }} className="fade-up fade-up-1">
        <div>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Status</div>
          <div style={{ color: "var(--text)", fontSize: "1rem", fontWeight: 300 }}>Page not found</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Error</div>
          <div style={{ color: a, fontSize: "1rem", fontWeight: 300 }}>404</div>
        </div>
      </div>

      {/* Big text */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "flex-end" }} className="fade-up fade-up-2">
        <h1
          style={{
            fontFamily: "var(--ff-head)",
            fontWeight: 800,
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            marginBottom: "2rem",
          }}
        >
          <span style={{ color: a }}>N</span>OT
          <br />
          <span style={{ color: a }}>F</span>OUND
          <span className="cursor" />
        </h1>
      </div>

      {/* Bottom bar */}
      <div
        className="fade-up fade-up-3"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--border)",
          paddingTop: "1rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
          This page doesn&apos;t exist.
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link
            href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.5rem", background: a, color: "var(--bg)", fontFamily: "var(--ff-head)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.05em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            Go home ↑
          </Link>
        </div>
      </div>
    </main>
  );
}
