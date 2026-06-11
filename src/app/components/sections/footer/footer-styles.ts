/**
 * @file footer-styles.ts
 * @description Layout class strings for the footer section.
 */

export const FOOTER_MAX_WIDTH = "mx-auto w-full max-w-7xl";

export const FOOTER_LOWER = "flex w-full shrink-0 flex-col gap-8";

export const FOOTER_TOP =
  "flex w-full shrink-0 flex-col items-start gap-2 sm:flex-row sm:items-start sm:justify-between";

export const FOOTER_TOP_LEFT =
  "flex flex-col items-start gap-1 sm:flex-row sm:items-start sm:gap-x-8";

export const FOOTER_PRE_BOTTOM =
  "flex w-full flex-col gap-8 sm:flex-row sm:items-end sm:justify-between";

export const FOOTER_CONTACT_BLOCK = "flex flex-col items-start gap-2 sm:gap-3";

export const FOOTER_CONTACT_LINK =
  "font-primary text-sm font-normal normal-case leading-relaxed tracking-normal text-white/90 transition-colors duration-150 ease-linear hover:text-white sm:text-base md:text-lg";

export const FOOTER_NAV_GRID =
  "grid shrink-0 grid-cols-2 gap-x-12 sm:gap-x-16 md:gap-x-20";

export const FOOTER_NAV_COLUMN =
  "flex min-w-[9rem] flex-col items-end sm:min-w-[10rem] md:min-w-[11rem]";

export const FOOTER_NAV_LIST =
  "flex w-full flex-col items-end gap-5 text-right sm:gap-6";

export const FOOTER_NAV_ITEM = "flex w-full justify-end";

/** Footer nav links — same voice as navbar, larger scale for the page footer. */
export const FOOTER_NAV_LINK_TYPOGRAPHY =
  "font-primary text-base font-normal uppercase leading-none tracking-[0.06em] sm:text-lg md:text-xl";

export const FOOTER_NAV_LINK =
  "inline-flex shrink-0 items-center justify-end whitespace-nowrap text-right text-white/90 transition-colors duration-150 ease-linear hover:text-white";

export const FOOTER_BOTTOM =
  "flex shrink-0 flex-col gap-2 border-t border-white/15 pt-3 sm:flex-row sm:items-start sm:justify-between";

export const FOOTER_BOTTOM_LEFT =
  "flex flex-wrap items-start gap-x-6 gap-y-1 sm:gap-x-8";

export const FOOTER_SOCIAL_LIST =
  "flex flex-wrap items-center justify-end gap-2 sm:gap-2.5";

export const FOOTER_SOCIAL_BUTTON =
  "inline-flex size-9 items-center justify-center rounded-xl text-white transition-colors duration-150 ease-linear hover:text-white/90 sm:size-10";

/** Outer wrapper — sui.io scroll_footer (footer content + custom_scroll runway). */
export const FOOTER_SCROLL_SHELL =
  "footer-scroll-shell relative z-[2] bg-black";

export const FOOTER_CONTENT =
  "footer-content relative z-[1] px-7 pb-12 pt-20 font-primary text-white sm:px-10 sm:pb-14 sm:pt-24 md:px-14";

/** In-flow overscroll zone — 30vh runway below footer content (matches sui.io). */
export const FOOTER_CUSTOM_SCROLL =
  "footer-custom-scroll pointer-events-none relative z-0 flex h-[30vh] w-full items-end justify-center overflow-visible bg-black";

export const FOOTER_OVERSCROLL_EXPANDER =
  "footer-scroll-expander relative block w-full min-w-0 overflow-visible";

/** Rebound gradient layer — flat bars morph on scroll through custom_scroll. */
export const FOOTER_REBOUND_GRAPHIC =
  "footer-rebound-effect pointer-events-none relative block aspect-[1481/535] w-full min-w-0 overflow-visible will-change-transform";
