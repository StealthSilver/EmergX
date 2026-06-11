/** Single scroll track: word highlights, then rows reveal, then section releases to curtain. */
export const PLATFORM_SCROLL_TRACK_ID = "platform-scroll-track";

export const HIGHLIGHT_WORD_COUNT = 5;
/** Scroll distance while heading stays pinned and words highlight 0→1. */
export const HIGHLIGHT_SCROLL_VH = 200;
/** Scroll distance to reveal all four platform rows below the heading. */
export const ROWS_SCROLL_VH = 80;
export const PLATFORM_SCROLL_VH_TOTAL =
  HIGHLIGHT_SCROLL_VH + ROWS_SCROLL_VH;

export const HIGHLIGHT_SCROLL_SHARE =
  HIGHLIGHT_SCROLL_VH / PLATFORM_SCROLL_VH_TOTAL;
