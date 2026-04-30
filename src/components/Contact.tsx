"use client";

import React, { useEffect, useRef, useState } from "react";

const SOCIALS = [
  { label: "LinkedIn", value: "tom-kluskens", href: "https://www.linkedin.com/in/tom-kluskens-562a8522b/" },
  { label: "GitHub", value: "TKluskens", href: "https://github.com/TKluskens" },
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [accent, setAccent] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

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

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.9rem 1rem", background: "var(--surface)",
    border: "1px solid var(--border)", color: "var(--text)", fontFamily: "var(--ff-body)",
    fontSize: "0.95rem", borderRadius: "2px", outline: "none", transition: "border-color 0.2s",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "4rem" }}>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: a, letterSpacing: "0.1em" }}>06</span>
        <h2 style={{ fontFamily: "var(--ff-head)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>Contact</h2>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>

      <div className="contact-grid">
        <div>
          <p style={{ fontSize: "1.2rem", fontWeight: 300, lineHeight: 1.7, marginBottom: "3rem", color: "var(--muted)" }}>
            Looking for a developer who delivers and collaborates well? Let&apos;s talk.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {SOCIALS.map(({ label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", borderTop: "1px solid var(--border)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
                <span style={{ color: a, fontFamily: "var(--ff-head)", fontWeight: 600, fontSize: "0.9rem" }}>{value} →</span>
              </a>
            ))}
          </div>
        </div>

        {status === "success" ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "1rem", padding: "3rem", background: `color-mix(in srgb, ${a} 6%, var(--surface))`, border: `1px solid color-mix(in srgb, ${a} 25%, transparent)`, borderRadius: "4px" }}>
            <div style={{ fontFamily: "var(--ff-mono)", fontSize: "0.65rem", color: a, letterSpacing: "0.1em", textTransform: "uppercase" }}>Message sent</div>
            <p style={{ fontFamily: "var(--ff-head)", fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>Thanks, I&apos;ll be in touch.</p>
            <button onClick={() => setStatus("idle")} style={{ marginTop: "0.5rem", background: "none", border: "none", color: "var(--muted)", fontFamily: "var(--ff-mono)", fontSize: "0.7rem", letterSpacing: "0.08em", cursor: "pointer", padding: 0, textDecoration: "underline" }}>Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="contact-name-email">
              <input
                placeholder="Name *" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                style={inputStyle} onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = a)} onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--border)")}
              />
              <input
                type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                style={inputStyle} onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = a)} onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--border)")}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <input
                placeholder="Subject" value={form.subject} onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                style={inputStyle} onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = a)} onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "var(--border)")}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <textarea
                placeholder="Your message *" rows={5} value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--ff-body)" }}
                onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = a)} onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "var(--border)")}
              />
            </div>
            {status === "error" && (
              <p style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "oklch(65% 0.2 25)", marginBottom: "1rem", letterSpacing: "0.06em" }}>
                Something went wrong — please try again or reach out directly on LinkedIn.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              style={{ width: "100%", padding: "1rem", background: a, color: "var(--bg)", fontFamily: "var(--ff-head)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.06em", textTransform: "uppercase", border: "none", borderRadius: "2px", cursor: status === "loading" ? "not-allowed" : "pointer", transition: "opacity 0.2s", opacity: status === "loading" ? 0.6 : 1 }}
              onMouseEnter={(e) => { if (status !== "loading") (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { if (status !== "loading") (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              {status === "loading" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 6rem;
          align-items: start;
        }
        .contact-name-email {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .contact-name-email {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
