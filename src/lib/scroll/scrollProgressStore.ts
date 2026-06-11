"use client";

export const CURTAIN_TRACK_ID = "curtain-divider";
export const PLATFORM_HIGHLIGHT_TRACK_ID = "platform-highlight-track";

/** Black copy appears once the curtain sequence has opened enough to cover the viewport. */
const CURTAIN_CONTENT_THRESHOLD = 0.08;
/** Accordion reveals slightly before the last word finishes so it feels in sync. */
const ACCORDION_REVEAL_THRESHOLD = 0.88;

type ScrollSnapshot = {
  hero: number;
  platformHighlight: number;
  curtain: number;
  navTextMix: number;
};

let snapshot: ScrollSnapshot = {
  hero: 0,
  platformHighlight: 0,
  curtain: 0,
  navTextMix: 0,
};

let rafId: number | null = null;
let listenerCount = 0;
const listeners = new Set<() => void>();
const curtainListeners = new Set<(progress: number) => void>();

function getWordProgress(
  scrollProgress: number,
  wordIndex: number,
  totalWords: number,
) {
  const segmentSize = 1 / totalWords;
  const segmentStart = wordIndex * segmentSize;
  return Math.min(
    1,
    Math.max(0, (scrollProgress - segmentStart) / segmentSize),
  );
}

function updateHighlightWords(progress: number) {
  const words = document.querySelectorAll<HTMLElement>("[data-highlight-word]");
  words.forEach((el) => {
    const index = Number(el.dataset.highlightWord);
    const total = Number(el.dataset.highlightTotal) || 5;
    const wordProgress = getWordProgress(progress, index, total);
    el.style.setProperty("--word-progress", String(wordProgress));

    const text = el.querySelector<HTMLElement>("[data-highlight-text]");
    if (text) {
      text.style.color = wordProgress > 0.45 ? "#ffffff" : "#111827";
    }
  });
}

function updatePlatformAccordion(progress: number) {
  const accordion = document.querySelector("[data-platform-accordion]");
  if (accordion) {
    accordion.classList.toggle(
      "platform-accordion--ready",
      progress >= ACCORDION_REVEAL_THRESHOLD,
    );
  }
}

function updateCurtainContent(progress: number) {
  const content = document.querySelector<HTMLElement>("[data-curtain-content]");
  if (content) {
    content.style.opacity = progress >= CURTAIN_CONTENT_THRESHOLD ? "1" : "0";
  }
}

function measure(): ScrollSnapshot {
  const viewportHeight = window.innerHeight;
  const hero =
    viewportHeight > 0
      ? Math.min(1, Math.max(0, window.scrollY / viewportHeight))
      : 0;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let platformHighlight = prefersReducedMotion ? 1 : 0;
  const platformTrack = document.getElementById(PLATFORM_HIGHLIGHT_TRACK_ID);
  if (platformTrack && !prefersReducedMotion) {
    const rect = platformTrack.getBoundingClientRect();
    const scrollDistance = platformTrack.offsetHeight - viewportHeight;

    if (rect.top > 0) {
      platformHighlight = 0;
    } else if (scrollDistance <= 0) {
      platformHighlight = 1;
    } else {
      platformHighlight = Math.min(1, Math.max(0, -rect.top / scrollDistance));
    }
  }

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
    curtain,
    navTextMix: curtainNavWhite ? 0 : hero,
  };
}

function publish(next: ScrollSnapshot) {
  snapshot = next;

  const root = document.documentElement;
  root.style.setProperty("--hero-scroll-progress", String(next.hero));
  root.style.setProperty(
    "--platform-highlight-progress",
    String(next.platformHighlight),
  );
  root.style.setProperty("--curtain-scroll-progress", String(next.curtain));
  root.style.setProperty("--nav-text-mix", String(next.navTextMix));

  updateHighlightWords(next.platformHighlight);
  updatePlatformAccordion(next.platformHighlight);
  updateCurtainContent(next.curtain);

  curtainListeners.forEach((listener) => listener(next.curtain));
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

export function initScrollProgress() {
  attach();
  scheduleMeasure();

  return () => {
    detach();
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
