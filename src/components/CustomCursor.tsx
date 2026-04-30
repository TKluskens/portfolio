"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState("oklch(72% 0.16 45)");

  useEffect(() => {
    const updateColor = () => {
      const root = document.documentElement;
      const projectAccent = root.style.getPropertyValue("--project-cursor-accent").trim();
      const fallback = root.classList.contains("light")
        ? "oklch(55% 0.22 25)"
        : "oklch(72% 0.16 45)";
      setColor(projectAccent || fallback);
    };

    updateColor();
    const obs = new MutationObserver(updateColor);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let x = 0, y = 0;
    let cx = 0, cy = 0;
    let raf: number;
    let isPointer = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = document.elementFromPoint(x, y);
      const clickable = el?.closest("a, button, [role='button'], input, textarea, select, label, [tabindex], .list-card, .skill-flip-outer, [style*='cursor: pointer'], [style*='cursor:pointer']");
      const next = !!clickable;
      if (next !== isPointer) {
        isPointer = next;
        if (dot.current) {
          dot.current.style.width = isPointer ? "20px" : "10px";
          dot.current.style.height = isPointer ? "20px" : "10px";
          dot.current.style.marginLeft = isPointer ? "-10px" : "-5px";
          dot.current.style.marginTop = isPointer ? "-10px" : "-5px";
        }
      }
    };

    window.addEventListener("mousemove", onMove);

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate(${cx}px, ${cy}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dot}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 10,
        height: 10,
        marginLeft: -5,
        marginTop: -5,
        borderRadius: "50%",
        background: color,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        mixBlendMode: "difference",
        transition: "width 0.25s ease, height 0.25s ease, margin 0.25s ease",
      }}
    />
  );
}
