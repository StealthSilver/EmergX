"use client";

import { useEffect, useState } from "react";

/** 0 at page top, 1 when the 100vh hero section has fully scrolled past. */
export function useHeroScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const heroHeight = window.innerHeight;
      const next =
        heroHeight > 0
          ? Math.min(1, Math.max(0, window.scrollY / heroHeight))
          : 0;
      setProgress(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}
