"use client";

import { useEffect } from "react";
import { initScrollProgress } from "@/lib/scroll/scrollProgressStore";

/** Boots the single rAF scroll loop that drives navbar, highlights, and curtain sync. */
export default function ScrollProgressRoot() {
  useEffect(() => initScrollProgress(), []);
  return null;
}
