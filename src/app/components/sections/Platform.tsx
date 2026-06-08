"use client";

import { useRef, useState } from "react";
import ScrollHighlightWord from "@/app/components/sections/ScrollHighlightWord";
import { platformContent } from "@/lib/data/platform.data";
import { useElementScrollProgress } from "@/lib/hooks/useElementScrollProgress";

const HIGHLIGHT_WORD_COUNT = 5;

export default function Platform() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useElementScrollProgress(scrollTrackRef);

  return (
    <section
      id="platform"
      className="scroll-mt-24 w-full bg-white px-7 font-primary text-gray-900"
      aria-labelledby="platform-heading"
    >
      <div ref={scrollTrackRef} className="relative h-[250vh] w-full">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <p id="platform-heading" className="w-[90%] text-4xl leading-relaxed">
            EmergX is the only platform where candidates are{" "}
            <ScrollHighlightWord
              wordIndex={0}
              totalWords={HIGHLIGHT_WORD_COUNT}
              scrollProgress={scrollProgress}
            >
              sourced
            </ScrollHighlightWord>
            ,{" "}
            <ScrollHighlightWord
              wordIndex={1}
              totalWords={HIGHLIGHT_WORD_COUNT}
              scrollProgress={scrollProgress}
            >
              evaluated
            </ScrollHighlightWord>{" "}
            and{" "}
            <ScrollHighlightWord
              wordIndex={2}
              totalWords={HIGHLIGHT_WORD_COUNT}
              scrollProgress={scrollProgress}
            >
              verified
            </ScrollHighlightWord>
            . The result?{" "}
            <ScrollHighlightWord
              wordIndex={3}
              totalWords={HIGHLIGHT_WORD_COUNT}
              scrollProgress={scrollProgress}
            >
              Faster hires
            </ScrollHighlightWord>
            ,{" "}
            <ScrollHighlightWord
              wordIndex={4}
              totalWords={HIGHLIGHT_WORD_COUNT}
              scrollProgress={scrollProgress}
            >
              real talent
            </ScrollHighlightWord>{" "}
            insight and value that&apos;s built, <br />
            not burned.
          </p>
        </div>
      </div>

      <div className="mx-auto w-[90%] pb-20">
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
