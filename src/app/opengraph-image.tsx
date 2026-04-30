import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tom Kluskens — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          background: "oklch(11% 0.008 240)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "oklch(72% 0.16 45)",
          }}
        />

        {/* Index number */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "14px",
            color: "oklch(72% 0.16 45)",
            letterSpacing: "0.12em",
            marginBottom: "24px",
          }}
        >
          tomkluskens.vercel.app
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "88px",
            fontWeight: 800,
            color: "oklch(93% 0.006 60)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
          }}
        >
          Tom Kluskens
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 400,
            color: "oklch(52% 0.012 240)",
            letterSpacing: "0.02em",
          }}
        >
          Full Stack Developer · Ghent, Belgium
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "40px",
          }}
        >
          {["React", "Next.js", "TypeScript", "Node.js"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "6px 16px",
                border: "1px solid oklch(22% 0.01 240)",
                color: "oklch(52% 0.012 240)",
                fontSize: "14px",
                letterSpacing: "0.06em",
                fontFamily: "monospace",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
