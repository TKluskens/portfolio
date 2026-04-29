"use client";

import React from "react";

export default function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontFamily: "var(--ff-mono)", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.08em" }}>
        © 2025 Tom Kluskens
      </span>
      <style>{`
        @media (max-width: 480px) {
          .site-footer { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
