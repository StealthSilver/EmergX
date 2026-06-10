"use client";

import { useRef } from "react";
import ScrollHighlightWord from "@/app/components/sections/ScrollHighlightWord";
import { useElementScrollProgress } from "@/lib/hooks/useElementScrollProgress";

const HIGHLIGHT_WORD_COUNT = 5;

export default function PlatformScrollHero() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useElementScrollProgress(scrollTrackRef);

  return (
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
  );
}
