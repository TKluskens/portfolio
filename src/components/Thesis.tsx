"use client";

import React, { useEffect, useRef, useState } from "react";

const PILLARS = [
  { label: "Research Question", text: "Which web architecture — serverless, classic on-premises, or PWA — consumes the least energy when running an AI-driven application?" },
  { label: "Methodology", text: "Built three variants of the same Flask-based AI app using Gemma 3 12B (server/cloud) and Gemma 3 1B (PWA edge). Measured CPU & GPU energy with Scaphandre, NVIDIA GPU Exporter, Google Cloud Monitoring, and CodeCarbon." },
  { label: "Expected Outcome", text: "PWA wins per invoice (local compute), serverless scales on-demand via Google Cloud Run, classic infrastructure pays an always-on cost. Results translate to a decision tree for IT architects." },
];

const STACK = ["Python", "Flask", "Gemma 3", "WebGPU", "Google Cloud Run", "Scaphandre", "CodeCarbon", "Docker"];

export default function Thesis() {
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
    <section id="thesis" ref={ref} style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "4rem" }}>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: a, letterSpacing: "0.1em" }}>05</span>
        <h2 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>Thesis</h2>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>

      {/* Title block */}
      <div style={{ marginBottom: "4rem", paddingBottom: "3rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: a, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
          Bachelor Applied IT · HoGent · 2025–2026
        </div>
        <h3 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(1.2rem, 3vw, 2.2rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", maxWidth: "820px", marginBottom: "1.5rem" }}>
          AI &amp; Energy Consumption in Web Architecture: A Comparison Between Serverless, Classic Infrastructure, and Progressive Web Apps
        </h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {[["Promotor", "H. Roobrouck"], ["Co-promotor", "R. Caselli"], ["Institution", "Turtle Srl"]].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{k}</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Context + pillars */}
      <div className="thesis-grid">
        <div>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Context</div>
          <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--muted)" }}>
            The rapid growth of AI is driving up global energy consumption. Companies like Turtle Srl need ESG reporting platforms that extract data from energy invoices — supplier, delivery period, energy usage, and CO₂eq quantity. Developers lack objective data on the energy impact of their infrastructure choices, making it hard to balance speed, cost, and sustainability.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {PILLARS.map(({ label, text }) => (
            <div key={label} style={{ borderLeft: `2px solid ${a}`, paddingLeft: "1.5rem" }}>
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: a, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{label}</div>
              <p style={{ fontSize: "0.92rem", fontWeight: 300, lineHeight: 1.75, color: "var(--muted)" }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginTop: "4rem" }}>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Tech used</span>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {STACK.map((t) => (
            <span key={t} style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", padding: "0.2rem 0.6rem", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--muted)", letterSpacing: "0.04em" }}>{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        .thesis-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .thesis-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}
