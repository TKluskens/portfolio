"use client";

import { useEffect, useRef, useState } from "react";

function parseRgb(color: string) {
  const match = color.match(/\d+(\.\d+)?/g);
  if (!match || match.length < 3) return null;
  const values = match.map(Number);
  return {
    r: values[0],
    g: values[1],
    b: values[2],
    a: values[3] ?? 1,
  };
}

function relativeLuminance(r: number, g: number, b: number) {
  const toLinear = (value: number) => {
    const channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const baseColorRef = useRef("oklch(72% 0.16 45)");
  const isLightRef = useRef(false);
  const [color, setColor] = useState(() => {
    if (typeof document === "undefined") return "oklch(72% 0.16 45)";
    return getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "oklch(72% 0.16 45)";
  });
  const [blendMode, setBlendMode] = useState<"difference" | "normal">(() => {
    if (typeof document === "undefined") return "difference";
    return document.documentElement.classList.contains("light") ? "normal" : "difference";
  });

  useEffect(() => {
    const updateCursorTheme = () => {
      const root = document.documentElement;
      const isLight = root.classList.contains("light");
      const projectAccent = root.style.getPropertyValue("--project-cursor-accent").trim();
      const fallback = getComputedStyle(root).getPropertyValue("--accent").trim() || "oklch(72% 0.16 45)";
      const nextColor = projectAccent || fallback;
      baseColorRef.current = nextColor;
      isLightRef.current = isLight;
      setColor(nextColor);
      setBlendMode(isLight ? "normal" : "difference");
    };

    updateCursorTheme();
    const obs = new MutationObserver(updateCursorTheme);
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
      const clickable = el?.closest<HTMLElement>("a, button, [role='button'], input, textarea, select, label, [tabindex], .list-card, .skill-flip-outer, [style*='cursor: pointer'], [style*='cursor:pointer']");
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

      if (dot.current) {
        if (isLightRef.current) {
          const clickableBg = clickable ? parseRgb(getComputedStyle(clickable).backgroundColor) : null;
          const hasSolidFill = clickableBg && clickableBg.a > 0.85;
          const nextColor = hasSolidFill && relativeLuminance(clickableBg.r, clickableBg.g, clickableBg.b) < 0.6
            ? "#ffffff"
            : baseColorRef.current;
          dot.current.style.background = nextColor;
        } else {
          dot.current.style.background = baseColorRef.current;
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
        mixBlendMode: blendMode,
        transition: "width 0.25s ease, height 0.25s ease, margin 0.25s ease",
      }}
    />
  );
}
