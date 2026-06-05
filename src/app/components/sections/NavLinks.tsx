"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

const navLinks = [
  { label: "PLATFORM", href: "#platform" },
  { label: "FEATURES", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "CONTACT", href: "#contact" },
] as const;

type IndicatorStyle = {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
};

const hiddenIndicator: IndicatorStyle = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  opacity: 0,
};

export default function NavLinks() {
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<IndicatorStyle>(hiddenIndicator);

  const moveIndicator = useCallback((target: HTMLAnchorElement) => {
    const list = listRef.current;
    if (!list) return;

    const listRect = list.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    setIndicator({
      left: targetRect.left - listRect.left,
      top: targetRect.top - listRect.top,
      width: targetRect.width,
      height: targetRect.height,
      opacity: 1,
    });
  }, []);

  const hideIndicator = useCallback(() => {
    setIndicator((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      onMouseLeave={hideIndicator}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute rounded-md border border-white/[0.06] bg-white/[0.02] transition-[left,width,height,opacity] duration-300 ease-out"
        style={{
          left: indicator.left,
          top: indicator.top,
          width: indicator.width,
          height: indicator.height,
          opacity: indicator.opacity,
        }}
      />
      <ul
        ref={listRef}
        className="relative z-10 flex items-center gap-3 sm:gap-4"
      >
        {navLinks.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="relative block px-2.5 py-1 font-primary text-sm font-light uppercase text-[#FFFFFF] sm:px-3"
              onMouseEnter={(e) => moveIndicator(e.currentTarget)}
              onFocus={(e) => moveIndicator(e.currentTarget)}
              onBlur={hideIndicator}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
