"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { CURTAIN_TRACK_ID } from "@/lib/hooks/useNavbarTextMix";

/** sui.io homepage-scroll sequence — 76 frames at 1440×900. */
const FRAME_COUNT = 76;
const FRAME_BASE =
  "https://res.cloudinary.com/dp6m7thfm/image/upload/sequences/homepage-scroll";
/** Scroll distance matches sui.io's 2315px seqtrigger zone. */
const SCROLL_TRACK_CLASS = "relative h-[2315px] w-full";

/** Upscale before FX so bars stay crisp on large screens. */
const PREPROCESS_SCALE = 2;

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

/** Remap blue curtain pixels to accent purple; blacks and neutrals stay untouched. */
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

/**
 * Smooth cylindrical metal shading per vertical bar column.
 * Column-based (not per-row) to avoid horizontal slit / banding artifacts.
 */
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
  canvas.width = source.naturalWidth * PREPROCESS_SCALE;
  canvas.height = source.naturalHeight * PREPROCESS_SCALE;

  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  recolorBlueToAccent(imageData);
  applyMetallicPurpleBars(imageData);
  ctx.putImageData(imageData, 0, 0);

  return canvas;
}

async function preprocessFrames(
  images: HTMLImageElement[],
): Promise<HTMLCanvasElement[]> {
  const processed: HTMLCanvasElement[] = [];

  for (let i = 0; i < images.length; i++) {
    processed.push(processFrame(images[i]));
    if (i % 3 === 2) {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
    }
  }

  return processed;
}

type CurtainDividerProps = {
  children: ReactNode;
};

/**
 * sui.io curtain divider — scroll-scrubbed canvas image sequence.
 * Frames are recolored to EmergX purple once at load; scroll only blits.
 */
export default function CurtainDivider({ children }: CurtainDividerProps) {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const processedFramesRef = useRef<HTMLCanvasElement[]>([]);
  const scrollProgressRef = useRef(0);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const rafRef = useRef<number | null>(null);
  const framesReadyRef = useRef(false);

  const drawFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    const frames = processedFramesRef.current;
    if (!canvas || !framesReadyRef.current || frames.length === 0) return;

    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.round(progress * (FRAME_COUNT - 1)),
    );
    const frame = frames[frameIndex];
    if (!frame) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
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
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(frame, 0, 0, displayWidth, displayHeight);
  }, []);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      drawFrame(scrollProgressRef.current);
    });
  }, [drawFrame]);

  const updateScrollProgress = useCallback(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const scrollDistance = track.offsetHeight - window.innerHeight;
    scrollProgressRef.current =
      scrollDistance > 0
        ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / scrollDistance))
        : 0;

    scheduleDraw();
  }, [scheduleDraw]);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;

    const onAllLoaded = async () => {
      if (cancelled) return;
      const processed = await preprocessFrames(images);
      if (cancelled) return;
      processedFramesRef.current = processed;
      framesReadyRef.current = true;
      scheduleDraw();
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.decoding = "async";
      img.src = frameUrl(i);
      img.onload = () => {
        if (cancelled) return;
        loaded += 1;
        if (loaded === FRAME_COUNT) {
          void onAllLoaded();
        }
      };
      images[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, [scheduleDraw]);

  useEffect(() => {
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateScrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(updateScrollProgress);
    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
  }, [updateScrollProgress]);

  return (
    <div id={CURTAIN_TRACK_ID} ref={scrollTrackRef} className={SCROLL_TRACK_CLASS}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black">{children}</div>

        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        />
      </div>
    </div>
  );
}
