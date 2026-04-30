"use client";

import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = !document.documentElement.classList.contains("light");
    setDark(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    const root = document.documentElement;
    if (next) {
      root.classList.remove("light");
      root.classList.add("dark");
      root.style.setProperty("--accent", "oklch(72% 0.16 45)");
      root.style.setProperty("--accent-dim", "color-mix(in srgb, oklch(72% 0.16 45) 28%, transparent)");
      localStorage.setItem("theme", "dark");
      localStorage.setItem("accent", "oklch(72% 0.16 45)");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.setProperty("--accent", "#c0392b");
      root.style.setProperty("--accent-dim", "color-mix(in srgb, #c0392b 28%, transparent)");
      localStorage.setItem("theme", "light");
      localStorage.setItem("accent", "#c0392b");
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "1.5rem",
        zIndex: 98,
        width: "52px",

        height: "28px",
        background: dark ? "oklch(22% 0.01 240)" : "oklch(92% 0 0)",
        border: "1px solid var(--border)",
        borderRadius: "999px",
        cursor: "pointer",
        transition: "background 0.4s ease",
        flexShrink: 0,
        padding: 0,
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "6px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "10px",
          opacity: dark ? 0.3 : 0,
          transition: "opacity 0.3s",
        }}
      >
        ☀
      </span>
      <span
        style={{
          position: "absolute",
          right: "6px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "10px",
          opacity: dark ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        ☽
      </span>
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: dark ? "calc(100% - 23px)" : "3px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: dark ? "oklch(72% 0.01 240)" : "#c0392b",
          boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
          transition: "left 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.4s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
        }}
      >
        {dark ? "☽" : "☀"}
      </span>
    </button>
  );
}
