"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useInView } from "@/lib/hooks/useInView";

/** sui.io uses ~14 vertical bars with uneven widths across the viewport. */
const BAR_COUNT = 14;

/**
 * Relative flex weights derived from sui.io frame_0000 bar widths
 * (10, 6, 7, 127, 6, 6, 6, 6, 8, 8, 15, 7) plus two thin edge bars.
 */
const BAR_WIDTHS = [10, 6, 7, 127, 6, 6, 6, 6, 8, 8, 15, 7, 6, 6] as const;

/** Per-bar stagger — sui.io distributes ~0.7s total across all bars. */
const STAGGER_S = 0.05;

/** Single-bar open duration (matches sui.io GSAP scrub segment). */
const DURATION_S = 0.85;

/** Smooth deceleration curve similar to sui.io's GSAP CustomEase. */
const EASE = [0.76, 0, 0.24, 1] as const;

const BAR_COLOR = "#580B97";

/** Center-out stagger mirrors sui.io's organic bar sequencing. */
function staggerDelay(index: number, total: number): number {
  const center = (total - 1) / 2;
  return Math.abs(index - center) * STAGGER_S;
}

type CurtainDividerProps = {
  children: ReactNode;
};

/**
 * Full-width vertical-bar curtain that retracts upward on scroll into view,
 * revealing the dark section beneath — sui.io behavior, flat purple reskin.
 */
export default function CurtainDivider({ children }: CurtainDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, 0.25, true);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full">
      {/* Dark-themed content revealed as bars scale away from the bottom edge. */}
      <div className="relative min-h-screen bg-[#0a0a0a] text-white">{children}</div>

      <div
        className="pointer-events-none absolute inset-0 z-10 flex w-full"
        aria-hidden
      >
        {BAR_WIDTHS.map((width, index) => (
          <motion.div
            key={index}
            className="h-full shrink-0"
            style={{
              flex: `${width} 0 0%`,
              backgroundColor: BAR_COLOR,
              transformOrigin: "bottom center",
              // Overlap adjacent bars by 1px to avoid sub-pixel gaps.
              marginRight: index < BAR_COUNT - 1 ? -1 : 0,
            }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: isInView ? 0 : 1 }}
            transition={{
              duration: DURATION_S,
              delay: staggerDelay(index, BAR_COUNT),
              ease: EASE,
            }}
          />
        ))}
      </div>
    </div>
  );
}
