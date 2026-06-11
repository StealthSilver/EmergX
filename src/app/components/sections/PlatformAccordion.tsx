"use client";

import { useState } from "react";
import PlatformDivider from "@/app/components/sections/PlatformDivider";
import PlatformRow from "@/app/components/sections/PlatformRow";
import { platformContent } from "@/lib/data/platform.data";

export default function PlatformAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      data-platform-accordion
      className="relative z-0 flex w-full justify-end px-7 pb-16"
    >
      <div className="platform-accordion w-[70%]">
        <div className="platform-tabs-layout">
          <PlatformDivider />

          <div className="platform-tabs-rows">
            {platformContent.map((item, index) => (
              <div key={item.title}>
                {index > 0 && <PlatformDivider />}
                <PlatformRow
                  title={item.title}
                  icon={item.icon}
                  content={item.content}
                  index={index}
                  isFirst={index === 0}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              </div>
            ))}
          </div>

          <PlatformDivider />
        </div>
      </div>
    </div>
  );
}
