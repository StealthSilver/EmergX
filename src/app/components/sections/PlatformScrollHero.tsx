import PlatformAccordion from "@/app/components/sections/PlatformAccordion";
import ScrollHighlightWord from "@/app/components/sections/ScrollHighlightWord";
import { PLATFORM_HIGHLIGHT_TRACK_ID } from "@/lib/scroll/scrollProgressStore";

const HIGHLIGHT_WORD_COUNT = 5;
/** Tall track keeps the heading pinned while scroll only drives word highlights. */
const HIGHLIGHT_SCROLL_HEIGHT = "h-[250vh]";

export default function PlatformScrollHero() {
  return (
    <div
      id={PLATFORM_HIGHLIGHT_TRACK_ID}
      className={`relative w-full ${HIGHLIGHT_SCROLL_HEIGHT}`}
    >
      <div className="sticky top-0 z-20 flex h-screen w-full flex-col bg-white pt-40">
        <div className="px-3 sm:px-4">
          <p
            id="platform-heading"
            className="ml-14 w-[90%] max-w-8xl shrink-0 text-5xl leading-tight sm:ml-16 sm:text-6xl lg:ml-20"
          >
          EmergX is the only platform where candidates are{" "}
          <ScrollHighlightWord wordIndex={0} totalWords={HIGHLIGHT_WORD_COUNT}>
            sourced
          </ScrollHighlightWord>
          ,{" "}
          <ScrollHighlightWord wordIndex={1} totalWords={HIGHLIGHT_WORD_COUNT}>
            evaluated
          </ScrollHighlightWord>{" "}
          and{" "}
          <ScrollHighlightWord wordIndex={2} totalWords={HIGHLIGHT_WORD_COUNT}>
            verified
          </ScrollHighlightWord>
          . The result?{" "}
          <ScrollHighlightWord wordIndex={3} totalWords={HIGHLIGHT_WORD_COUNT}>
            Faster hires
          </ScrollHighlightWord>
          ,{" "}
          <ScrollHighlightWord wordIndex={4} totalWords={HIGHLIGHT_WORD_COUNT}>
            real talent
          </ScrollHighlightWord>{" "}
          insight and value that&apos;s built, <br />
          not burned.
          </p>
        </div>

        <div className="mt-auto w-full">
          <PlatformAccordion />
        </div>
      </div>
    </div>
  );
}
