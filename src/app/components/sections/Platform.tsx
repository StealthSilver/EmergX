"use client";

import { useState } from "react";
import { platformContent } from "@/lib/data/platform.data";

export default function Platform() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="platform"
      className="scroll-mt-24 flex min-h-[100vh] w-full flex-col items-center justify-center bg-white px-7 py-5 pt-10 font-primary text-gray-900"
      aria-labelledby="platform-heading"
    >
      <p id="platform-heading" className="w-[90%] text-4xl leading-relaxed">
        EmergX is the only platform where candidates are{" "}
        <span className="bg-[#580B97] px-2 font-semibold text-white">
          sourced
        </span>
        ,{" "}
        <span className="bg-[#580B97] px-2 font-semibold text-white">
          evaluated
        </span>{" "}
        and{" "}
        <span className="bg-[#580B97] px-2 font-semibold text-white">
          verified
        </span>
        . The result?{" "}
        <span className="bg-[#580B97] px-2 font-semibold text-white">
          Faster hires
        </span>
        ,{" "}
        <span className="bg-[#580B97] px-2 font-semibold text-white">
          real talent
        </span>{" "}
        insight and value that&apos;s built, <br />
        not burned.
      </p>

      <div className="mt-16 w-[90%]">
        {platformContent.map((item, index) => (
          <div key={item.title} className="border-b border-gray-200 py-4">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between text-left"
              aria-expanded={openIndex === index}
            >
              <h3 className="text-2xl font-semibold">{item.title}</h3>

              <span
                className={`text-3xl transition-transform duration-300 ${
                  openIndex === index ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                openIndex === index
                  ? "mt-4 max-h-60 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-2 text-gray-600">
                {item.content.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
