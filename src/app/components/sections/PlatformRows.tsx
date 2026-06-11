"use client";

import { useState } from "react";
import PlatformDivider from "@/app/components/sections/PlatformDivider";
import PlatformRow from "@/app/components/sections/PlatformRow";
import { platformContent } from "@/lib/data/platform.data";

export default function PlatformRows() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="platform-rows-list mt-10 w-full px-7 pb-20 sm:mt-12">
      <div className="platform-tabs-layout">
        <PlatformDivider />

        {platformContent.map((item, index) => (
          <div key={item.title}>
            {index > 0 && <PlatformDivider />}
            <PlatformRow
              title={item.title}
              icon={item.icon}
              content={item.content}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          </div>
        ))}

        <PlatformDivider />
      </div>
    </div>
  );
}
