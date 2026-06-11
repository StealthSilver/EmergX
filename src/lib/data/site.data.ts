import type { Metadata, Viewport } from "next";

// ─── Sitemap Routes ───────────────────────────────────────────────────────────

export const sitemapRoutes = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
] as const;

// ─── Site Config ──────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "EmergX",
  tagline: "Automated Hiring. Human Quality.",
  description:
    "Build the best teams with EmergX's trusted recruiting agents. Scale your hiring process with Eva, the AI interviewer — AI-powered recruitment that delivers human quality, explainable evaluations, and industry-leading time-to-hire.",
  url: "https://emergx.ai",
  ogImage: "/og-image.png",
  twitterHandle: "@EmergX",
  locale: "en_US",
  themeColor: "#150520",
  contact: {
    phone: "+91 91628 41781",
  },
  product: {
    name: "Eva",
    tagline: "The AI interviewer",
    description:
      "Designed by AI researchers and hiring leaders to evaluate what matters in the real world — with expert-curated rubrics, human-in-the-loop validation, and ongoing fairness audits.",
  },
  keywords: [
    "EmergX",
    "Eva AI interviewer",
    "AI recruitment platform",
    "automated hiring",
    "AI evals",
    "recruiting agents",
    "AI-powered hiring",
    "candidate evaluation",
    "talent acquisition",
    "hiring automation",
    "AI interviews",
    "human-in-the-loop recruitment",
    "explainable hiring AI",
    "recruitment scheduling",
    "time to hire",
    "on-job performance prediction",
    "hiring rubrics",
    "recruitment integrations",
  ],
} as const;

// ─── Viewport ─────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.themeColor },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.themeColor },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Your Team Deserves Better Hiring Automation`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  applicationName: siteConfig.name,
  category: "technology",
  classification: "Business / HR Technology / AI Recruitment",
};
