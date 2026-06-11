"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import {
  CURTAIN_TRACK_ID,
  subscribeCurtainProgress,
} from "@/lib/scroll/scrollProgressStore";

/** sui.io homepage-scroll sequence — 76 frames at 1440×900. */
const FRAME_COUNT = 76;
/** Half-width delivery — faster decode + recolor, upscaled smoothly on draw. */
const FRAME_BASE =
  "https://res.cloudinary.com/dp6m7thfm/image/upload/w_960,q_auto,f_webp/sequences/homepage-scroll";
/** Scroll distance matches sui.io's 2315px seqtrigger zone. */
const SCROLL_TRACK_CLASS = "relative h-[2315px] w-full";

const PREPROCESS_SCALE = 1;
const MAX_DPR = 1.5;

/** EmergX metallic purple palette. */
const PURPLE_DARK = { r: 18, g: 4, b: 52 };
const PURPLE_MID = { r: 96, g: 24, b: 155 };
const PURPLE_LIGHT = { r: 188, g: 132, b: 238 };

function frameUrl(index: number) {
  return `${FRAME_BASE}/frame_${String(index).padStart(4, "0")}.webp`;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clampByte(value: number) {
  return Math.min(255, Math.max(0, Math.round(value)));
}

function isSourceBarPixel(r: number, g: number, b: number) {
  if (r + g + b < 20) return false;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  if (max - min < 10) return false;

  return b > r + 5 && b > g;
}

function isPurpleBarPixel(r: number, g: number, b: number) {
  if (r + g + b < 24) return false;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  if (max - min < 12) return false;

  return b > g + 8 && r > g + 4;
}

function recolorBlueToAccent(imageData: ImageData) {
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (!isSourceBarPixel(r, g, b)) continue;

    const max = Math.max(r, g, b);
    const chroma = max - Math.min(r, g, b);
    const brightness = max / 255;

    let nr: number;
    let ng: number;
    let nb: number;

    if (brightness < 0.42) {
      const t = brightness / 0.42;
      nr = lerp(PURPLE_DARK.r, PURPLE_MID.r, t);
      ng = lerp(PURPLE_DARK.g, PURPLE_MID.g, t);
      nb = lerp(PURPLE_DARK.b, PURPLE_MID.b, t);
    } else {
      const t = (brightness - 0.42) / 0.58;
      nr = lerp(PURPLE_MID.r, PURPLE_LIGHT.r, t);
      ng = lerp(PURPLE_MID.g, PURPLE_LIGHT.g, t);
      nb = lerp(PURPLE_MID.b, PURPLE_LIGHT.b, t);
    }

    const variation = chroma / max;
    data[i] = clampByte(nr * (0.88 + variation * 0.12));
    data[i + 1] = clampByte(ng * (0.88 + variation * 0.12));
    data[i + 2] = clampByte(nb * (0.88 + variation * 0.12));
  }
}

function applyMetallicPurpleBars(imageData: ImageData) {
  const { data, width, height } = imageData;

  const columnHasBar = new Uint8Array(width);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const i = (y * width + x) * 4;
      if (isPurpleBarPixel(data[i], data[i + 1], data[i + 2])) {
        columnHasBar[x] = 1;
        break;
      }
    }
  }

  const columnT = new Float32Array(width);
  columnT.fill(-1);

  let x = 0;
  while (x < width) {
    if (!columnHasBar[x]) {
      x += 1;
      continue;
    }

    const left = x;
    while (x < width && columnHasBar[x]) x += 1;
    const right = x - 1;
    const barWidth = right - left + 1;

    for (let bx = left; bx <= right; bx++) {
      columnT[bx] = barWidth <= 1 ? 0.5 : (bx - left) / (barWidth - 1);
    }
  }

  for (let y = 0; y < height; y++) {
    for (let px = 0; px < width; px++) {
      const i = (y * width + px) * 4;
      if (!isPurpleBarPixel(data[i], data[i + 1], data[i + 2])) continue;

      const t = columnT[px];
      if (t < 0) continue;

      const cylinder = Math.pow(Math.sin(t * Math.PI), 0.72);
      const bodyShade = 0.62 + cylinder * 0.38;
      const softHighlight = Math.pow(cylinder, 2.2) * 0.18;

      let r = data[i] * bodyShade;
      let g = data[i + 1] * bodyShade;
      let b = data[i + 2] * bodyShade;

      r += softHighlight * PURPLE_LIGHT.r;
      g += softHighlight * PURPLE_LIGHT.g;
      b += softHighlight * PURPLE_LIGHT.b;

      data[i] = clampByte(r);
      data[i + 1] = clampByte(g);
      data[i + 2] = clampByte(b);
    }
  }
}

function processFrame(source: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(source.naturalWidth * PREPROCESS_SCALE);
  canvas.height = Math.round(source.naturalHeight * PREPROCESS_SCALE);

  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  recolorBlueToAccent(imageData);
  applyMetallicPurpleBars(imageData);
  ctx.putImageData(imageData, 0, 0);

  return canvas;
}

function frameIndexForProgress(progress: number) {
  return Math.min(
    FRAME_COUNT - 1,
    Math.max(0, Math.floor(progress * (FRAME_COUNT - 1))),
  );
}

function waitForIdle(timeout = 32) {
  return new Promise<void>((resolve) => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => resolve(), { timeout });
    } else {
      setTimeout(resolve, 0);
    }
  });
}

type CurtainDividerProps = {
  children: ReactNode;
};

/**
 * sui.io curtain divider — scroll-scrubbed canvas image sequence.
 * Purple recolor runs off the scroll path; draw only blits cached frames.
 */
export default function CurtainDivider({ children }: CurtainDividerProps) {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourceImagesRef = useRef<HTMLImageElement[]>([]);
  const processedFramesRef = useRef<Map<number, HTMLCanvasElement>>(new Map());
  const scrollProgressRef = useRef(0);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const rafRef = useRef<number | null>(null);
  const framesReadyRef = useRef(false);
  const lastFrameIndexRef = useRef(-1);
  const processingRef = useRef(false);
  const preloadQueueRef = useRef<number[]>([]);
  const cancelledRef = useRef(false);
  const currentFrameRef = useRef(0);

  const enqueuePreload = useCallback((indices: number[]) => {
    const queue = preloadQueueRef.current;
    for (const index of indices) {
      if (index < 0 || index >= FRAME_COUNT) continue;
      if (processedFramesRef.current.has(index)) continue;
      if (queue.includes(index)) continue;
      queue.push(index);
    }

    if (processingRef.current) return;

    processingRef.current = true;
    cancelledRef.current = false;

    const drain = async () => {
      const images = sourceImagesRef.current;
      const cache = processedFramesRef.current;

      while (preloadQueueRef.current.length > 0 && !cancelledRef.current) {
        const pivot = currentFrameRef.current;
        preloadQueueRef.current.sort(
          (a, b) => Math.abs(a - pivot) - Math.abs(b - pivot),
        );

        const index = preloadQueueRef.current.shift();
        if (index === undefined) break;
        if (cache.has(index)) continue;

        const source = images[index];
        if (!source?.complete || source.naturalWidth === 0) {
          preloadQueueRef.current.push(index);
          await waitForIdle(16);
          continue;
        }

        cache.set(index, processFrame(source));

        if (index === currentFrameRef.current) {
          lastFrameIndexRef.current = -1;
          scheduleDrawRef.current?.();
        }

        await waitForIdle();
      }

      processingRef.current = false;

      if (preloadQueueRef.current.length > 0 && !cancelledRef.current) {
        processingRef.current = true;
        void drain();
      }
    };

    void drain();
  }, []);

  const scheduleDrawRef = useRef<(() => void) | null>(null);

  const drawFrame = useCallback((progress: number, force = false) => {
    const canvas = canvasRef.current;
    const images = sourceImagesRef.current;
    if (!canvas || !framesReadyRef.current || images.length === 0) return;

    const frameIndex = frameIndexForProgress(progress);
    currentFrameRef.current = frameIndex;

    if (!force && frameIndex === lastFrameIndexRef.current) return;
    lastFrameIndexRef.current = frameIndex;

    const cache = processedFramesRef.current;
    const processed = cache.get(frameIndex);
    const source = images[frameIndex];

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    } as CanvasRenderingContext2DSettings);
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    const pixelWidth = Math.round(displayWidth * dpr);
    const pixelHeight = Math.round(displayHeight * dpr);

    if (
      canvasSizeRef.current.width !== pixelWidth ||
      canvasSizeRef.current.height !== pixelHeight
    ) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      canvasSizeRef.current = { width: pixelWidth, height: pixelHeight };
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastFrameIndexRef.current = -1;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "medium";

    const bitmap = processed ?? (source?.complete ? source : null);
    if (!bitmap) return;

    ctx.drawImage(bitmap, 0, 0, displayWidth, displayHeight);

    if (!processed) {
      enqueuePreload([frameIndex]);
    }

    enqueuePreload([
      frameIndex,
      frameIndex - 1,
      frameIndex + 1,
      frameIndex - 2,
      frameIndex + 2,
      frameIndex - 3,
      frameIndex + 3,
    ]);
  }, [enqueuePreload]);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      drawFrame(scrollProgressRef.current);
    });
  }, [drawFrame]);

  scheduleDrawRef.current = scheduleDraw;

  const applyScrollProgress = useCallback(
    (progress: number) => {
      scrollProgressRef.current = progress;
      scheduleDraw();
    },
    [scheduleDraw],
  );

  useEffect(() => {
    cancelledRef.current = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;

    const markFramesReady = () => {
      if (cancelledRef.current || framesReadyRef.current) return;
      framesReadyRef.current = true;
      lastFrameIndexRef.current = -1;
      enqueuePreload(
        Array.from({ length: FRAME_COUNT }, (_, index) => index),
      );
      scheduleDraw();
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.decoding = "async";
      img.src = frameUrl(i);
      img.onload = () => {
        if (cancelledRef.current) return;
        loaded += 1;
        if (loaded === 1) {
          markFramesReady();
        }
        enqueuePreload([i, i + 1, i - 1]);
      };
      images[i] = img;
    }

    sourceImagesRef.current = images;

    return () => {
      cancelledRef.current = true;
      processingRef.current = false;
      preloadQueueRef.current = [];
      processedFramesRef.current.clear();
      sourceImagesRef.current = [];
      framesReadyRef.current = false;
      lastFrameIndexRef.current = -1;
    };
  }, [enqueuePreload, scheduleDraw]);

  useEffect(() => {
    return subscribeCurtainProgress(applyScrollProgress);
  }, [applyScrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      lastFrameIndexRef.current = -1;
      scheduleDraw();
    });
    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
  }, [scheduleDraw]);

  return (
    <div
      id={CURTAIN_TRACK_ID}
      ref={scrollTrackRef}
      className={SCROLL_TRACK_CLASS}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <div
          data-curtain-content=""
          className="absolute inset-0 origin-center bg-black opacity-0 will-change-[opacity,transform]"
          suppressHydrationWarning
        >
          {children}
        </div>

        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full will-change-[contents]"
          aria-hidden
        />
      </div>
    </div>
  );
}
