"use client";

import Image from "next/image";
import { useState } from "react";
import { trustedLogos } from "@/lib/data/hero.data";

const tickerLogos = [...trustedLogos, ...trustedLogos];

export default function LogoTicker() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="logo-ticker-wrap relative w-full"
      aria-label="Trusted company logos"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="logo-ticker-mask relative w-full overflow-hidden">
        <div
          className={`logo-ticker-track flex w-max items-center${isPaused ? " is-paused" : ""}`}
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {tickerLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="logo-ticker-item flex shrink-0 items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={index < trustedLogos.length ? `${logo.name} logo` : ""}
                width={logo.width}
                height={logo.height}
                className="logo-ticker-image"
                draggable={false}
                aria-hidden={index >= trustedLogos.length ? true : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
