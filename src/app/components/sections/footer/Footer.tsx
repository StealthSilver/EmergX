"use client";

import Link from "next/link";
import LetterWaveLink from "@/app/components/ui/LetterWaveLink";
import {
  footerLegalLinks,
  footerNavColumns,
  footerSocialLinks,
} from "@/lib/data/footer.data";
import { siteConfig } from "@/lib/data/site.data";

import FooterReboundGraphic from "./FooterReboundGraphic";
import {
  FOOTER_BOTTOM,
  FOOTER_BOTTOM_LEFT,
  FOOTER_CONTACT_BLOCK,
  FOOTER_CONTACT_LINK,
  FOOTER_CUSTOM_SCROLL,
  FOOTER_LOWER,
  FOOTER_MAX_WIDTH,
  FOOTER_NAV_COLUMN,
  FOOTER_NAV_GRID,
  FOOTER_NAV_ITEM,
  FOOTER_NAV_LINK,
  FOOTER_NAV_LINK_TYPOGRAPHY,
  FOOTER_NAV_LIST,
  FOOTER_OVERSCROLL_EXPANDER,
  FOOTER_PRE_BOTTOM,
  FOOTER_SCROLL_SHELL,
  FOOTER_SOCIAL_BUTTON,
  FOOTER_SOCIAL_LIST,
  FOOTER_TOP,
  FOOTER_TOP_LEFT,
} from "./footer-styles";
import { useFooterReboundProgress } from "./useFooterReboundProgress";

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-4 sm:size-[1.125rem]"
        fill="currentColor"
        aria-hidden
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 sm:size-[1.125rem]"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const { trackRef, progress } = useFooterReboundProgress();
  const year = new Date().getFullYear();

  return (
    <footer className={FOOTER_SCROLL_SHELL} aria-labelledby="footer-heading">
      <div
        id="contact"
        className="relative z-[1] px-7 pb-12 pt-20 font-primary text-white sm:px-10 sm:pb-14 sm:pt-24 md:px-14"
      >
        <div className={`${FOOTER_MAX_WIDTH} ${FOOTER_LOWER}`}>
          <div className={FOOTER_TOP}>
            <div className={FOOTER_TOP_LEFT}>
              <p
                id="footer-heading"
                className="text-2xl font-medium tracking-tight sm:text-3xl"
              >
                {siteConfig.name}
              </p>
              <p className="max-w-sm text-sm font-light leading-relaxed text-white/70 sm:text-base">
                {siteConfig.tagline}
              </p>
            </div>
          </div>

          <div className={FOOTER_PRE_BOTTOM}>
            <div className={FOOTER_CONTACT_BLOCK}>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                Get in touch
              </p>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className={FOOTER_CONTACT_LINK}
              >
                {siteConfig.contact.phone}
              </a>
              <a
                href="mailto:hello@emergx.ai"
                className={FOOTER_CONTACT_LINK}
              >
                hello@emergx.ai
              </a>
              <LetterWaveLink
                href="#request-demo"
                label="Request Demo"
                className="request-demo-btn mt-2 inline-flex items-center justify-center rounded-[6px] px-6 py-2 font-primary text-sm font-medium uppercase text-white transition-colors"
              />
            </div>

            <nav aria-label="Footer">
              <div className={FOOTER_NAV_GRID}>
                {footerNavColumns.map((column, columnIndex) => (
                  <div
                    key={`footer-nav-column-${columnIndex}`}
                    className={FOOTER_NAV_COLUMN}
                  >
                    <ul className={FOOTER_NAV_LIST}>
                      {column.links.map((link) => (
                        <li key={link.href} className={FOOTER_NAV_ITEM}>
                          <LetterWaveLink
                            href={link.href}
                            label={link.label}
                            variant="nav"
                            className={`${FOOTER_NAV_LINK} ${FOOTER_NAV_LINK_TYPOGRAPHY} letter-wave--nav`}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </div>

          <div className={FOOTER_BOTTOM}>
            <div className={FOOTER_BOTTOM_LEFT}>
              <p className="text-sm text-white/55">
                © {year} {siteConfig.name}. All rights reserved.
              </p>
              {footerLegalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/55 transition-colors duration-150 ease-linear hover:text-white/85"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <ul className={FOOTER_SOCIAL_LIST}>
              {footerSocialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={FOOTER_SOCIAL_BUTTON}
                    aria-label={social.label}
                  >
                    <SocialIcon label={social.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div ref={trackRef} className={FOOTER_CUSTOM_SCROLL} aria-hidden>
        <div className={FOOTER_OVERSCROLL_EXPANDER}>
          <FooterReboundGraphic progress={progress} />
        </div>
      </div>
    </footer>
  );
}
