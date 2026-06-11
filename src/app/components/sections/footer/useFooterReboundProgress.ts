"use client";

import { useEffect, useRef, useState } from "react";

const PROGRESS_EPSILON = 0.0005;
const SNAP_VELOCITY_THRESHOLD = 50;
const SNAP_DEBOUNCE_MS = 120;
const SNAP_DURATION_MS = 1100;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Scroll Y when the custom_scroll zone begins (top hits viewport bottom). */
export function getFooterReboundZoneStartScrollY(trackEl: HTMLElement) {
  const rect = trackEl.getBoundingClientRect();
  const docTop = rect.top + window.scrollY;
  return docTop - window.innerHeight;
}

/**
 * Sui.io ScrollTrigger on custom_scroll — progress 0→1 while scrolling
 * through the in-flow zone below footer content.
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
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snapRafRef = useRef<number | null>(null);
  const snappingRef = useRef(false);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    lastScrollTimeRef.current = performance.now();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cancelSnapAnimation = () => {
      if (snapRafRef.current !== null) {
        cancelAnimationFrame(snapRafRef.current);
        snapRafRef.current = null;
      }
      snappingRef.current = false;
    };

    const snapBackToZoneStart = (track: HTMLElement) => {
      if (snappingRef.current) return;

      const targetY = getFooterReboundZoneStartScrollY(track);
      const startY = window.scrollY;

      if (Math.abs(startY - targetY) < 1) return;

      snappingRef.current = true;
      const startTime = performance.now();

      const step = (now: number) => {
        const t = clamp((now - startTime) / SNAP_DURATION_MS, 0, 1);
        window.scrollTo(0, startY + (targetY - startY) * easeOutCubic(t));

        if (t < 1) {
          snapRafRef.current = requestAnimationFrame(step);
          return;
        }

        snapRafRef.current = null;
        snappingRef.current = false;
        lastScrollYRef.current = window.scrollY;
        lastScrollTimeRef.current = performance.now();
        velocityRef.current = 0;
      };

      snapRafRef.current = requestAnimationFrame(step);
    };

    const scheduleSnapBack = (track: HTMLElement) => {
      if (snapTimeoutRef.current !== null) {
        clearTimeout(snapTimeoutRef.current);
      }

      snapTimeoutRef.current = setTimeout(() => {
        snapTimeoutRef.current = null;
        if (snappingRef.current) return;
        if (Math.abs(velocityRef.current) >= SNAP_VELOCITY_THRESHOLD) return;
        if (measureFooterReboundProgress(track) <= PROGRESS_EPSILON) return;
        snapBackToZoneStart(track);
      }, SNAP_DEBOUNCE_MS);
    };

    const update = () => {
      rafRef.current = null;
      const track = trackRef.current;
      if (!track) return;

      const now = performance.now();
      const scrollY = window.scrollY;
      const dt = now - lastScrollTimeRef.current;

      if (dt > 0 && !snappingRef.current) {
        velocityRef.current = ((scrollY - lastScrollYRef.current) / dt) * 1000;
      }

      lastScrollYRef.current = scrollY;
      lastScrollTimeRef.current = now;

      const next = measureFooterReboundProgress(track);
      if (Math.abs(next - lastProgressRef.current) > PROGRESS_EPSILON) {
        lastProgressRef.current = next;
        setProgress(next);
      }

      if (!snappingRef.current && next > PROGRESS_EPSILON && !prefersReducedMotion) {
        scheduleSnapBack(track);
      }
    };

    const onScroll = () => {
      if (!snappingRef.current) {
        cancelSnapAnimation();
        if (snapTimeoutRef.current !== null) {
          clearTimeout(snapTimeoutRef.current);
          snapTimeoutRef.current = null;
        }
      }
      schedule();
    };

    const schedule = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (snapRafRef.current !== null) cancelAnimationFrame(snapRafRef.current);
      if (snapTimeoutRef.current !== null) clearTimeout(snapTimeoutRef.current);
    };
  }, []);

  return { trackRef, progress };
}
