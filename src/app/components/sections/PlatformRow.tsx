"use client";

import PlatformIcon from "@/app/components/sections/PlatformIcons";

type PlatformRowProps = {
  title: string;
  icon: "sourcing" | "evaluation" | "verification" | "integrations";
  content: readonly string[];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

export default function PlatformRow({
  title,
  icon,
  content,
  index,
  isOpen,
  onToggle,
}: PlatformRowProps) {
  return (
    <div data-platform-row={index} className="platform-row w-full">
      <div className="tabs_wrapper">
        <button
          type="button"
          className="tabs_content w-full text-left"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <div className="content_divider">
            <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
            <div className="platform-icon-box" aria-hidden>
              <PlatformIcon name={icon} />
            </div>
          </div>
        </button>

        <div
          className={`platform-row-panel${isOpen ? " platform-row-panel--open" : ""}`}
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
