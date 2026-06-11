import PlatformRows from "@/app/components/sections/PlatformRows";
import ScrollHighlightWord from "@/app/components/sections/ScrollHighlightWord";
import {
  HIGHLIGHT_WORD_COUNT,
  PLATFORM_SCROLL_TRACK_ID,
  PLATFORM_SCROLL_VH_TOTAL,
} from "@/lib/scroll/platformScrollConstants";

export default function PlatformScrollHero() {
  return (
    <div
      id={PLATFORM_SCROLL_TRACK_ID}
      className="relative w-full"
      style={{ height: `${PLATFORM_SCROLL_VH_TOTAL}vh` }}
    >
      <div className="sticky top-0 z-20 w-full bg-white">
        <div className="px-3 pt-40 sm:px-4">
          <p
            id="platform-heading"
            className="ml-14 w-[90%] max-w-8xl text-5xl leading-tight sm:ml-16 sm:text-6xl lg:ml-20"
          >
            EmergX is the only platform where candidates are{" "}
            <ScrollHighlightWord
              wordIndex={0}
              totalWords={HIGHLIGHT_WORD_COUNT}
            >
              sourced
            </ScrollHighlightWord>
            ,{" "}
            <ScrollHighlightWord
              wordIndex={1}
              totalWords={HIGHLIGHT_WORD_COUNT}
            >
              evaluated
            </ScrollHighlightWord>{" "}
            and{" "}
            <ScrollHighlightWord
              wordIndex={2}
              totalWords={HIGHLIGHT_WORD_COUNT}
            >
              verified
            </ScrollHighlightWord>
            . The result?{" "}
            <ScrollHighlightWord
              wordIndex={3}
              totalWords={HIGHLIGHT_WORD_COUNT}
            >
              Faster hires
            </ScrollHighlightWord>
            ,{" "}
            <ScrollHighlightWord
              wordIndex={4}
              totalWords={HIGHLIGHT_WORD_COUNT}
            >
              real talent
            </ScrollHighlightWord>{" "}
            insight and value that&apos;s built, <br />
            not burned.
          </p>
        </div>

        <PlatformRows />
      </div>
    </div>
  );
}
