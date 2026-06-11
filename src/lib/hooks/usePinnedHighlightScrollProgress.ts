"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Scroll progress for a pinned highlight sequence.
 * Progress stays at 0 until the track is pinned, then advances 0→1 over the track height.
 */
export function usePinnedHighlightScrollProgress(
  ref: RefObject<HTMLElement | null>,
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollDistance = element.offsetHeight - viewportHeight;

      if (rect.top > 0) {
        setProgress(0);
        return;
      }

      if (scrollDistance <= 0) {
        setProgress(1);
        return;
      }

      const nextProgress = -rect.top / scrollDistance;
      setProgress(Math.min(1, Math.max(0, nextProgress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [ref]);

  return progress;
}
