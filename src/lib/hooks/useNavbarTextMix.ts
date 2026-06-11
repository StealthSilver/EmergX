"use client";

import { useSyncExternalStore } from "react";
import { useHeroScrollProgress } from "@/lib/hooks/useHeroScrollProgress";

export const CURTAIN_TRACK_ID = "curtain-divider";

function getCurtainNavWhite() {
  const curtain = document.getElementById(CURTAIN_TRACK_ID);
  if (!curtain) return false;

  const rect = curtain.getBoundingClientRect();
  // White nav as soon as the curtain sequence reaches the top of the viewport.
  return rect.top <= 80;
}

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  window.addEventListener("resize", onStoreChange);

  return () => {
    window.removeEventListener("scroll", onStoreChange);
    window.removeEventListener("resize", onStoreChange);
  };
}

/**
 * Returns the black percentage for navbar `color-mix` (0 = white, 1 = black).
 * Hero scroll fades white → black; platform stays black; curtain zone returns to white.
 */
export function useNavbarTextMix() {
  const heroProgress = useHeroScrollProgress();
  const curtainNavWhite = useSyncExternalStore(
    subscribeToScroll,
    getCurtainNavWhite,
    () => false,
  );

  if (curtainNavWhite) return 0;
  return heroProgress;
}
