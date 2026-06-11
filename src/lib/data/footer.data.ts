import { siteConfig } from "@/lib/data/site.data";

export const footerNavColumns = [
  {
    links: [
      { label: "PLATFORM", href: "#platform" },
      { label: "FEATURES", href: "#features" },
    ],
  },
  {
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "CONTACT", href: "#contact" },
    ],
  },
] as const;

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export const footerSocialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/emergx",
  },
  {
    label: "X",
    href: `https://x.com/${siteConfig.twitterHandle.replace("@", "")}`,
  },
] as const;
