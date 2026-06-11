// Root layout — app-wide metadata, fonts, SEO, OG, and global providers

import type { Metadata, Viewport } from "next";
import { metadata as siteMetadata, viewport as siteViewport } from "@/lib/data/site.data";
import "./globals.css";

// ─── Metadata & Viewport (from site.data.ts) ──────────────────────────────────

export const viewport: Viewport = siteViewport;
export const metadata: Metadata = siteMetadata;

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased bg-hero-gradient-top"
      style={{ backgroundColor: "#60189B" }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-primary text-foreground">
        {children}
      </body>
    </html>
  );
}
