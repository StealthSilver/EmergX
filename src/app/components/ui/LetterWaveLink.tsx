"use client";

import Link from "next/link";
import {
  useMemo,
  type CSSProperties,
  type FocusEventHandler,
  type HTMLAttributeAnchorTarget,
  type MouseEventHandler,
  type ReactNode,
} from "react";

/** Stagger between characters (buttons / CTAs). */
export const LETTER_WAVE_STAGGER_MS = 12;
/** Looser stagger for navbar section links. */
export const LETTER_WAVE_NAV_STAGGER_MS = 16;

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LetterWaveLink({
  href,
  className,
  style,
  label,
  ariaLabel,
  onClick,
  onMouseEnter,
  onFocus,
  onBlur,
  centerInContainer,
  variant = "default",
  target,
  rel,
  suffix,
}: {
  href: string;
  className?: string;
  style?: CSSProperties;
  label: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onFocus?: FocusEventHandler<HTMLAnchorElement>;
  onBlur?: FocusEventHandler<HTMLAnchorElement>;
  centerInContainer?: boolean;
  variant?: "default" | "nav";
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  suffix?: ReactNode;
}) {
  const chars = useMemo(() => [...label], [label]);

  const staggerMs =
    variant === "nav" ? LETTER_WAVE_NAV_STAGGER_MS : LETTER_WAVE_STAGGER_MS;

  const body = (
    <span className="relative inline-grid place-items-center">
      <span className="invisible col-start-1 row-start-1 select-none">
        {label}
      </span>
      <span className="letter-wave__track col-start-1 row-start-1 whitespace-pre">
        {chars.map((ch, i) => (
          <span
            key={`${label}-${i}-${ch}`}
            className="letter-wave__char"
            style={{ animationDelay: `${i * staggerMs}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </span>
  );

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(
        className,
        "letter-wave",
        variant === "nav" && "letter-wave--nav",
      )}
      style={style}
      aria-label={ariaLabel ?? label}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <span
        aria-hidden
        className={cn(
          "relative z-10",
          centerInContainer && "flex w-full justify-center",
        )}
      >
        {body}
      </span>
      {suffix ? <span aria-hidden>{suffix}</span> : null}
    </Link>
  );
}
