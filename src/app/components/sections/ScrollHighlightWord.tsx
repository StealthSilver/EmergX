import type { CSSProperties } from "react";

type ScrollHighlightWordProps = {
  children: string;
  wordIndex: number;
  totalWords: number;
};

export default function ScrollHighlightWord({
  children,
  wordIndex,
  totalWords,
}: ScrollHighlightWordProps) {
  return (
    <span
      data-highlight-word={wordIndex}
      data-highlight-total={totalWords}
      className="highlight-word relative inline-block px-2 font-semibold"
      style={{ "--word-progress": "0" } as CSSProperties}
    >
      <span
        aria-hidden
        className="highlight-word-bg absolute inset-0 bg-[#580B97]"
      />
      <span data-highlight-text className="relative z-10">
        {children}
      </span>
    </span>
  );
}
