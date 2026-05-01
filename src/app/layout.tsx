import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Tom Kluskens", template: "%s · Tom Kluskens" },
  description: "Portfolio of Tom Kluskens — Full Stack Developer based in Ghent, Belgium. Specializing in React, Next.js, TypeScript, and modern web development.",
  keywords: ["Tom Kluskens", "Full Stack Developer", "Frontend Developer", "React", "Next.js", "TypeScript", "Ghent", "Belgium"],
  authors: [{ name: "Tom Kluskens", url: "https://github.com/TKluskens" }],
  creator: "Tom Kluskens",
  metadataBase: new URL("https://tomkluskens.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tomkluskens.vercel.app",
    siteName: "Tom Kluskens",
    title: "Tom Kluskens — Full Stack Developer",
    description: "Portfolio of Tom Kluskens — Full Stack Developer based in Ghent, Belgium.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom Kluskens — Full Stack Developer",
    description: "Portfolio of Tom Kluskens — Full Stack Developer based in Ghent, Belgium.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: [
              "(function(){",
              "var c=document.createComment('\\n" +
              "  _____ ___  __  __   _  ___    _   _ ___ _  _____ _  _ ___  \\n" +
              " |_   _/ _ \\\\|  \\\\/  | | |/ / |  | | | / __| |/ / __| \\\\| / __| \\n" +
              "   | || (_) | |\\\\/| | | \\' <| |__| |_| \\\\__ \\\\| _|| .` \\\\__ \\\\ \\n" +
              "   |_| \\\\___/|_|  |_| |_|\\\\_\\\\____|\\\\___/|___/_|\\\\_\\\\___|_|\\\\_|___/ \\n" +
              "\\n" +
              "  Full Stack Developer  -  Ghent, Belgium\\n" +
              "  https://github.com/TKluskens\\n" +
              "');",
              "document.head.insertBefore(c,document.head.firstChild);",
              "try{",
              "var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');",
              "document.documentElement.classList.remove('dark','light');",
              "document.documentElement.classList.add(t);",
              "var a=t==='light' ? '#c0392b' : 'oklch(72% 0.16 45)';",
              "document.documentElement.style.setProperty('--accent',a);",
              "document.documentElement.style.setProperty('--accent-dim','color-mix(in srgb, '+a+' 28%, transparent)');",
              "localStorage.setItem('accent',a);",
              "}catch(e){document.documentElement.classList.add('dark');}",
              "var art=' _____ ___  __  __   _  ___    _   _ ___ _  _____ _  _ ___ \\n|_   _/ _ \\\\|  \\\\/  | | |/ / |  | | | / __| |/ / __| \\\\| / __|\\n  | || (_) | |\\\\/| | | \\' <| |__| |_| \\\\__ \\\\| _|| .\\` \\\\__ \\\\\\n  |_| \\\\___/|_|  |_| |_|\\\\_\\\\____|\\\\___/|___/_|\\\\_\\\\___|_|\\\\_|___/';",
              "console.log('%c'+art,'color:oklch(72% 0.16 45);font-family:monospace;font-size:11px;line-height:1.4;');",
              "console.log('%c Full Stack Developer  •  Ghent, Belgium','color:#888;font-family:monospace;font-size:11px;');",
              "console.log('%c https://github.com/TKluskens','color:oklch(72% 0.16 45);font-family:monospace;font-size:11px;');",
              "})();",
            ].join(""),
          }}
        />
      </head>
      <body className={syne.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
