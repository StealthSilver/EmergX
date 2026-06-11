"use client";

import { useEffect, useRef } from "react";
import ScrollHighlightWord from "@/app/components/sections/ScrollHighlightWord";
import { usePlatformScroll } from "@/lib/context/PlatformScrollContext";
import { usePinnedHighlightScrollProgress } from "@/lib/hooks/usePinnedHighlightScrollProgress";

const HIGHLIGHT_WORD_COUNT = 5;
/** Tall track keeps the heading pinned while scroll only drives word highlights. */
const HIGHLIGHT_SCROLL_HEIGHT = "h-[250vh]";

export default function PlatformScrollHero() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollProgress = usePinnedHighlightScrollProgress(scrollTrackRef);
  const { setHighlightProgress } = usePlatformScroll();

  useEffect(() => {
    setHighlightProgress(scrollProgress);
  }, [scrollProgress, setHighlightProgress]);

  return (
    <div ref={scrollTrackRef} className={`relative w-full ${HIGHLIGHT_SCROLL_HEIGHT}`}>
      <div className="sticky top-0 z-20 w-full bg-white pt-40 pb-16">
        <p id="platform-heading" className="w-[90%] text-5xl leading-tight sm:text-6xl">
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
