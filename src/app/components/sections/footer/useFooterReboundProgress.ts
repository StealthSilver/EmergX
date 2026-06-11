"use client";

import { useEffect, useRef, useState } from "react";

const PROGRESS_EPSILON = 0.0005;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Sui.io scroll_footer progress — measures how far the user has scrolled
 * through the in-flow custom_scroll zone below footer content.
 */
export function measureFooterReboundProgress(trackEl: HTMLElement) {
  const rect = trackEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const trackHeight = trackEl.offsetHeight;

  if (trackHeight <= 0) return 0;

  const scrolledInto = viewportHeight - rect.top;
  return clamp(scrolledInto / trackHeight, 0, 1);
}

export function useFooterReboundProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const track = trackRef.current;
      if (!track) return;

      const next = measureFooterReboundProgress(track);
      if (Math.abs(next - lastProgressRef.current) > PROGRESS_EPSILON) {
        lastProgressRef.current = next;
        setProgress(next);
      }
    };

    const schedule = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { trackRef, progress };
}
