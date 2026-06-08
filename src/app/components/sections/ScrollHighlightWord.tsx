type ScrollHighlightWordProps = {
  children: string;
  wordIndex: number;
  totalWords: number;
  scrollProgress: number;
};

function getWordProgress(
  scrollProgress: number,
  wordIndex: number,
  totalWords: number,
) {
  const segmentSize = 1 / totalWords;
  const segmentStart = wordIndex * segmentSize;

  return Math.min(
    1,
    Math.max(0, (scrollProgress - segmentStart) / segmentSize),
  );
}

export default function ScrollHighlightWord({
  children,
  wordIndex,
  totalWords,
  scrollProgress,
}: ScrollHighlightWordProps) {
  const wordProgress = getWordProgress(scrollProgress, wordIndex, totalWords);

  return (
    <span className="relative inline-block px-2 font-semibold">
      <span
        aria-hidden
        className="absolute inset-0 bg-[#580B97]"
        style={{
          clipPath: `inset(0 ${(1 - wordProgress) * 100}% 0 0)`,
        }}
      />
      <span
        className="relative z-10 transition-colors duration-150"
        style={{
          color: wordProgress > 0.45 ? "#ffffff" : "#111827",
        }}
      >
        {children}
      </span>
    </span>
  );
}
