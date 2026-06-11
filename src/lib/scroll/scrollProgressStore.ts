"use client";

import {
  HIGHLIGHT_SCROLL_SHARE,
  PLATFORM_SCROLL_TRACK_ID,
} from "@/lib/scroll/platformScrollConstants";

export const CURTAIN_TRACK_ID = "curtain-divider";
/** @deprecated Use PLATFORM_SCROLL_TRACK_ID from platformScrollConstants */
export const PLATFORM_HEADING_SCROLL_ID = PLATFORM_SCROLL_TRACK_ID;

/** Video/content behind the curtain reveals once the bars are ~90% open. */
export const CURTAIN_VIDEO_REVEAL_START = 0.9;
const CURTAIN_REVEAL_END = 1;
const PROGRESS_EPSILON = 0.0005;

type ScrollSnapshot = {
  hero: number;
  platformHighlight: number;
  platformRows: number;
  curtain: number;
  navTextMix: number;
};

let snapshot: ScrollSnapshot = {
  hero: 0,
  platformHighlight: 0,
  platformRows: 0,
  curtain: 0,
  navTextMix: 0,
};

let rafId: number | null = null;
let listenerCount = 0;
const listeners = new Set<() => void>();
const curtainListeners = new Set<(progress: number) => void>();

let highlightWordEls: HTMLElement[] | null = null;
let platformRowEls: HTMLElement[] | null = null;
let curtainContentEl: HTMLElement | null = null;
let prefersReducedMotion: boolean | null = null;
let lastPublished: ScrollSnapshot | null = null;

function getPrefersReducedMotion() {
  if (prefersReducedMotion === null) {
    prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }
  return prefersReducedMotion;
}

function getHighlightWords() {
  if (!highlightWordEls) {
    highlightWordEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-highlight-word]"),
    );
  }
  return highlightWordEls;
}

function getPlatformRows() {
  const found = Array.from(
    document.querySelectorAll<HTMLElement>("[data-platform-row]"),
  );
  if (!platformRowEls || platformRowEls.length !== found.length) {
    platformRowEls = found;
  }
  return platformRowEls;
}

function measurePlatformScroll(viewportHeight: number) {
  if (getPrefersReducedMotion()) {
    return { highlight: 1, rows: 1 };
  }

  const track = document.getElementById(PLATFORM_SCROLL_TRACK_ID);
  if (!track) return { highlight: 0, rows: 0 };

  const rect = track.getBoundingClientRect();
  const scrollDistance = track.offsetHeight - viewportHeight;

  if (rect.top > 0) return { highlight: 0, rows: 0 };
  if (scrollDistance <= 0) return { highlight: 1, rows: 1 };

  const progress = Math.min(1, Math.max(0, -rect.top / scrollDistance));
  const highlight = Math.min(1, progress / HIGHLIGHT_SCROLL_SHARE);
  const rows =
    progress <= HIGHLIGHT_SCROLL_SHARE
      ? 0
      : Math.min(
          1,
          (progress - HIGHLIGHT_SCROLL_SHARE) / (1 - HIGHLIGHT_SCROLL_SHARE),
        );

  return { highlight, rows };
}

function updatePlatformRows(rowsProgress: number) {
  const rows = getPlatformRows();
  const count = rows.length || 1;

  for (const [index, row] of rows.entries()) {
    const segmentSize = 1 / count;
    const segmentStart = index * segmentSize;
    const reveal = Math.min(
      1,
      Math.max(0, (rowsProgress - segmentStart) / segmentSize),
    );

    row.style.setProperty("--row-reveal", String(reveal));
    row.style.opacity = String(reveal);
    row.style.transform = `translateY(${(1 - reveal) * 20}px)`;
    row.style.pointerEvents = reveal > 0.02 ? "" : "none";

    const iconBox = row.querySelector<HTMLElement>(".platform-icon-box");
    if (iconBox) {
      iconBox.style.setProperty("--row-reveal", String(reveal));
      iconBox.style.transform = `scale(${0.88 + reveal * 0.12})`;
    }
  }
}

function getWordProgress(
  highlightProgress: number,
  wordIndex: number,
  totalWords: number,
) {
  const segmentSize = 1 / totalWords;
  const segmentStart = wordIndex * segmentSize;
  return Math.min(
    1,
    Math.max(0, (highlightProgress - segmentStart) / segmentSize),
  );
}

function updateHighlightWords(progress: number) {
  const words = getHighlightWords();
  for (const el of words) {
    const index = Number(el.dataset.highlightWord);
    const total = Number(el.dataset.highlightTotal) || 5;
    const wordProgress = getWordProgress(progress, index, total);
    el.style.setProperty("--word-progress", String(wordProgress));

    const text = el.querySelector<HTMLElement>("[data-highlight-text]");
    if (text) {
      text.style.color = wordProgress > 0.45 ? "#ffffff" : "#111827";
    }
  }
}

function curtainRevealProgress(progress: number) {
  if (progress < CURTAIN_VIDEO_REVEAL_START) return 0;
  return Math.min(
    1,
    (progress - CURTAIN_VIDEO_REVEAL_START) /
      (CURTAIN_REVEAL_END - CURTAIN_VIDEO_REVEAL_START),
  );
}

function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

function updateCurtainContent(progress: number) {
  if (!curtainContentEl) {
    curtainContentEl = document.querySelector<HTMLElement>(
      "[data-curtain-content]",
    );
  }
  if (!curtainContentEl) return;

  if (getPrefersReducedMotion()) {
    curtainContentEl.style.opacity =
      progress >= CURTAIN_VIDEO_REVEAL_START ? "1" : "0";
    curtainContentEl.style.transform = "scale(1)";
    return;
  }

  const reveal = curtainRevealProgress(progress);
  const scale = 0.92 + easeOutBack(reveal) * 0.08;

  curtainContentEl.style.opacity = String(reveal);
  curtainContentEl.style.transform = `scale(${scale})`;
}

function measure(): ScrollSnapshot {
  const viewportHeight = window.innerHeight;
  const hero =
    viewportHeight > 0
      ? Math.min(1, Math.max(0, window.scrollY / viewportHeight))
      : 0;

  const platform = measurePlatformScroll(viewportHeight);
  const platformHighlight = platform.highlight;
  const platformRows = platform.rows;

  let curtain = 0;
  let curtainNavWhite = false;
  const curtainTrack = document.getElementById(CURTAIN_TRACK_ID);
  if (curtainTrack) {
    const rect = curtainTrack.getBoundingClientRect();
    const scrollDistance = curtainTrack.offsetHeight - viewportHeight;
    curtainNavWhite = rect.top <= 80;

    if (rect.top <= 0 && scrollDistance > 0) {
      curtain = Math.min(1, Math.max(0, -rect.top / scrollDistance));
    }
  }

  return {
    hero,
    platformHighlight,
    platformRows,
    curtain,
    navTextMix: curtainNavWhite ? 0 : hero,
  };
}

function progressChanged(a: number, b: number) {
  return Math.abs(a - b) > PROGRESS_EPSILON;
}

function publish(next: ScrollSnapshot) {
  const prev = lastPublished;
  snapshot = next;
  lastPublished = next;

  const root = document.documentElement;

  if (!prev || progressChanged(prev.hero, next.hero)) {
    root.style.setProperty("--hero-scroll-progress", String(next.hero));
  }

  if (
    !prev ||
    progressChanged(prev.platformHighlight, next.platformHighlight) ||
    progressChanged(prev.platformRows, next.platformRows)
  ) {
    root.style.setProperty(
      "--platform-highlight-progress",
      String(next.platformHighlight),
    );
    root.style.setProperty(
      "--platform-rows-progress",
      String(next.platformRows),
    );
    updateHighlightWords(next.platformHighlight);
    updatePlatformRows(next.platformRows);
  }

  if (!prev || progressChanged(prev.curtain, next.curtain)) {
    root.style.setProperty("--curtain-scroll-progress", String(next.curtain));
    updateCurtainContent(next.curtain);
    curtainListeners.forEach((listener) => listener(next.curtain));
  }

  if (!prev || progressChanged(prev.navTextMix, next.navTextMix)) {
    root.style.setProperty("--nav-text-mix", String(next.navTextMix));
  }

  listeners.forEach((listener) => listener());
}

function runMeasure() {
  rafId = null;
  publish(measure());
}

function scheduleMeasure() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(runMeasure);
}

function attach() {
  if (listenerCount === 0) {
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    scheduleMeasure();
  }
  listenerCount += 1;
}

function detach() {
  listenerCount = Math.max(0, listenerCount - 1);
  if (listenerCount === 0) {
    window.removeEventListener("scroll", scheduleMeasure);
    window.removeEventListener("resize", scheduleMeasure);
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
}

function invalidateDomCache() {
  highlightWordEls = null;
  platformRowEls = null;
  curtainContentEl = null;
  lastPublished = null;
}

export function initScrollProgress() {
  invalidateDomCache();
  attach();
  scheduleMeasure();

  return () => {
    detach();
    invalidateDomCache();
  };
}

export function subscribeScrollProgress(onStoreChange: () => void) {
  attach();
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    detach();
  };
}

export function getScrollProgressSnapshot(): ScrollSnapshot {
  return snapshot;
}

export function subscribeCurtainProgress(
  onProgress: (progress: number) => void,
) {
  attach();
  curtainListeners.add(onProgress);
  onProgress(snapshot.curtain);

  return () => {
    curtainListeners.delete(onProgress);
    detach();
  };
}
