"use client";

import { useRef } from "react";
import PlatformIcon from "@/app/components/sections/PlatformIcons";
import { useInView } from "@/lib/hooks/useInView";

type PlatformRowProps = {
  title: string;
  icon: "sourcing" | "evaluation" | "verification" | "integrations";
  content: readonly string[];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isFirst?: boolean;
};

export default function PlatformRow({
  title,
  icon,
  content,
  index,
  isOpen,
  onToggle,
  isFirst = false,
}: PlatformRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef);

  return (
    <div
      ref={rowRef}
      className={`platform-row ${isInView ? "platform-row--visible" : ""}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={`tabs_wrapper ${isFirst ? "first_section" : ""} ${isOpen ? "is-open" : ""}`}
      >
        <button
          type="button"
          onClick={onToggle}
          className="tabs_content w-full text-left"
          aria-expanded={isOpen}
        >
          <div className="content_divider">
            <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
            <div
              className={`platform-icon-box ${isInView ? "platform-icon-box--visible" : ""}`}
              style={{ animationDelay: `${index * 80 + 120}ms` }}
              aria-hidden
            >
              <PlatformIcon name={icon} />
            </div>
          </div>
        </button>

        <div
          className={`platform-row-panel ${isOpen ? "platform-row-panel--open" : ""}`}
        >
          <ul className="platform-row-list">
            {content.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


