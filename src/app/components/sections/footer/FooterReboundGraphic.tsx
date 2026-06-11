/**
 * @file FooterReboundGraphic.tsx
 * @description Sui-style stepped rebound graphic with dotted dividers and noise.
 */

"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";

import { FOOTER_REBOUND_GRAPHIC } from "./footer-styles";
import {
  getReboundBlockPaths,
  REBOUND_BLOCK_OPACITY,
} from "./reboundPaths";

export interface FooterReboundGraphicProps {
  progress: number;
  className?: string;
}

const REBOUND_BAR_COLOR_STOPS = [
  { top: "var(--rebound-purple-50)", mid: "var(--rebound-purple-300)", base: "var(--rebound-purple-700)" },
  { top: "var(--rebound-purple-100)", mid: "var(--rebound-purple-400)", base: "var(--rebound-purple-800)" },
  { top: "var(--rebound-purple-200)", mid: "var(--rebound-purple-500)", base: "var(--rebound-purple-900)" },
  { top: "var(--rebound-purple-50)", mid: "var(--rebound-purple-200)", base: "var(--rebound-accent)" },
  { top: "var(--rebound-purple-100)", mid: "var(--rebound-purple-400)", base: "var(--rebound-purple-800)" },
  { top: "var(--rebound-purple-200)", mid: "var(--rebound-purple-500)", base: "var(--rebound-purple-900)" },
  { top: "var(--rebound-purple-300)", mid: "var(--rebound-purple-600)", base: "var(--rebound-purple-950)" },
] as const;

const REBOUND_DOT_PATHS = [
  { d: "M1269.54 238.676L1269.54 535", gradientId: "strokeGradient3" },
  { d: "M1058.23 156.064V535", gradientId: "strokeGradient2" },
  { d: "M846.928 0.597656V535", gradientId: "strokeGradient1" },
  { d: "M635.621 0.597656V535", gradientId: "strokeGradient1" },
  { d: "M424.314 156.064V535", gradientId: "strokeGradient2" },
  { d: "M213.007 238.676L213.007 535", gradientId: "strokeGradient3" },
] as const;

const EDGE_NOISE_TEXTURE_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.08' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.95'/%3E%3C/svg%3E";

const BAR_NOISE_TEXTURE_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.95'/%3E%3C/svg%3E";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function FooterReboundGraphic({
  progress,
  className,
}: FooterReboundGraphicProps) {
  const blockPaths = useMemo(() => getReboundBlockPaths(progress), [progress]);

  const reveal = clamp(progress, 0, 1);
  const glowOpacity = reveal * clamp(0.26 + progress * 0.42, 0, 0.68);
  const bloomOpacity = reveal * clamp(0.2 + progress * 0.36, 0, 0.56);
  const noiseOpacity = reveal * clamp(0.22 + progress * 0.34, 0, 0.56);
  const edgeBlendOpacity = reveal * clamp(0.42 + progress * 0.2, 0.42, 0.62);
  const edgeNoiseOpacity = reveal * clamp(0.22 + progress * 0.14, 0.22, 0.38);
  const barNoiseOpacity = reveal * clamp(0.18 + progress * 0.18, 0.18, 0.36);
  const dotOpacity = reveal;

  if (reveal <= 0) return null;

  return (
    <div
      aria-hidden
      className={cn(FOOTER_REBOUND_GRAPHIC, className)}
      style={{
        transformOrigin: "center bottom",
        maskImage:
          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.95) 8%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 84%, rgba(0,0,0,0.95) 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 64%, rgba(0,0,0,0.44) 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.95) 8%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 84%, rgba(0,0,0,0.95) 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 64%, rgba(0,0,0,0.44) 82%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-full w-full"
        style={{
          backgroundImage:
            "radial-gradient(92% 160% at 50% 106%, color-mix(in srgb, var(--rebound-purple-300) 58%, transparent) 0%, color-mix(in srgb, var(--rebound-purple-500) 42%, transparent) 26%, color-mix(in srgb, var(--rebound-accent) 28%, transparent) 46%, color-mix(in srgb, var(--rebound-purple-900) 14%, transparent) 62%, rgba(2, 8, 22, 0) 100%)",
          filter: "blur(18px) saturate(132%)",
          opacity: glowOpacity,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-full w-full"
        style={{
          backgroundImage:
            "radial-gradient(70% 120% at 50% 102%, color-mix(in srgb, var(--rebound-purple-400) 38%, transparent) 0%, color-mix(in srgb, var(--rebound-accent) 24%, transparent) 44%, rgba(0, 0, 0, 0) 100%)",
          filter: "blur(22px) saturate(138%)",
          mixBlendMode: "screen",
          opacity: bloomOpacity,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-full w-full text-[var(--rebound-purple-300)]"
      >
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 1481 535"
          preserveAspectRatio="none"
          role="presentation"
        >
          <defs>
            <linearGradient id="strokeGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%" />
              <stop stopColor="#FFFFFF" stopOpacity="1" offset="100%" />
            </linearGradient>
            <linearGradient id="strokeGradient2" x1="0%" y1="20%" x2="0%" y2="100%">
              <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%" />
              <stop stopColor="#FFFFFF" stopOpacity="1" offset="100%" />
            </linearGradient>
            <linearGradient id="strokeGradient3" x1="0%" y1="40%" x2="0%" y2="100%">
              <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%" />
              <stop stopColor="#FFFFFF" stopOpacity="1" offset="100%" />
            </linearGradient>
            {REBOUND_BAR_COLOR_STOPS.map((bar, index) => (
              <linearGradient
                key={`barSeaGradient-${index}`}
                id={`barSeaGradient${index}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop stopColor={bar.top} offset="0%" />
                <stop stopColor={bar.mid} offset="46%" />
                <stop stopColor={bar.base} offset="100%" />
              </linearGradient>
            ))}
            <linearGradient id="barSheenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop stopColor="#ffffff" stopOpacity="0.3" offset="0%" />
              <stop stopColor="var(--rebound-purple-100)" stopOpacity="0.12" offset="42%" />
              <stop stopColor="var(--rebound-purple-300)" stopOpacity="0.08" offset="72%" />
              <stop stopColor="var(--rebound-accent)" stopOpacity="0.04" offset="100%" />
            </linearGradient>
            <mask id="barNoiseMask">
              <rect x="0" y="0" width="1481" height="535" fill="black" />
              {blockPaths.map((path) => (
                <path key={`bar-mask-${path}`} d={path} fill="white" />
              ))}
            </mask>
          </defs>
          <g className="rebound_blocks">
            {blockPaths.map((path, index) => (
              <path
                key={path}
                d={path}
                fill={`url(#barSeaGradient${index})`}
                opacity={REBOUND_BLOCK_OPACITY[index]}
              />
            ))}
          </g>
          <g>
            {blockPaths.map((path) => (
              <path
                key={`bar-sheen-${path}`}
                d={path}
                fill="url(#barSheenGradient)"
                opacity="0.52"
              />
            ))}
          </g>
          <image
            href={BAR_NOISE_TEXTURE_DATA_URI}
            x="0"
            y="0"
            width="1481"
            height="535"
            preserveAspectRatio="none"
            mask="url(#barNoiseMask)"
            opacity={barNoiseOpacity}
          />
          <g className="rebound_dots" style={{ opacity: dotOpacity }}>
            {REBOUND_DOT_PATHS.map((line) => (
              <path
                key={line.d}
                d={line.d}
                fill="none"
                stroke={`url(#${line.gradientId})`}
                strokeWidth="2"
                strokeDasharray="2 10"
              />
            ))}
          </g>
        </svg>
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-full w-full"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 28%, rgba(255, 255, 255, 0.2) 0 0.8px, transparent 1px), radial-gradient(circle at 67% 43%, rgba(255, 255, 255, 0.18) 0 0.8px, transparent 1px), radial-gradient(circle at 81% 73%, rgba(255, 255, 255, 0.16) 0 0.9px, transparent 1px), radial-gradient(circle at 34% 62%, rgba(255, 255, 255, 0.17) 0 0.7px, transparent 1px), radial-gradient(circle at 55% 15%, rgba(255, 255, 255, 0.14) 0 0.7px, transparent 1px)",
          backgroundSize: "3px 3px, 4px 4px, 3px 3px, 5px 5px, 4px 4px",
          backgroundPosition: "0 0, 1px 1px, 2px 0, 0 2px, 1px 3px",
          mixBlendMode: "soft-light",
          filter: "blur(0.7px) contrast(128%) saturate(130%)",
          opacity: noiseOpacity,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: `url("${EDGE_NOISE_TEXTURE_DATA_URI}")`,
          backgroundSize: "180px 180px",
          backgroundRepeat: "repeat",
          mixBlendMode: "soft-light",
          filter: "blur(1.35px) contrast(150%) saturate(128%)",
          opacity: edgeNoiseOpacity,
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 14%, rgba(0,0,0,0) 86%, rgba(0,0,0,1) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 24%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 14%, rgba(0,0,0,0) 86%, rgba(0,0,0,1) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 24%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.96) 0%, rgba(0, 0, 0, 0.64) 7%, rgba(0, 0, 0, 0.16) 16%, rgba(0, 0, 0, 0) 26%, rgba(0, 0, 0, 0) 74%, rgba(0, 0, 0, 0.16) 84%, rgba(0, 0, 0, 0.64) 93%, rgba(0, 0, 0, 0.96) 100%), linear-gradient(to bottom, rgba(0, 0, 0, 0.96) 0%, rgba(0, 0, 0, 0.52) 11%, rgba(0, 0, 0, 0.14) 24%, rgba(0, 0, 0, 0) 40%)",
          filter: "blur(6px)",
          opacity: edgeBlendOpacity,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-full w-full"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.78) 14%, rgba(0, 0, 0, 0.42) 33%, rgba(0, 0, 0, 0.12) 57%, rgba(0, 0, 0, 0) 78%)",
          filter: "blur(5px)",
        }}
      />
    </div>
  );
}
