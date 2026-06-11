"use client";

import { useEffect, useRef } from "react";
import { subscribeCurtainProgress } from "@/lib/scroll/scrollProgressStore";

const ACCENT_COLOR = "#60189b";
const CURTAIN_VIDEO_PLAY_THRESHOLD = 0.12;

type VideoSectionProps = {
  behindCurtain?: boolean;
};

export default function VideoSection({ behindCurtain = false }: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (behindCurtain) {
      return subscribeCurtainProgress((progress) => {
        if (progress >= CURTAIN_VIDEO_PLAY_THRESHOLD) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [behindCurtain]);

  return (
    <section
      id="demo-video"
      className={
        behindCurtain
          ? "flex min-h-screen w-full items-center bg-black px-7 py-16 font-primary text-white sm:py-20"
          : "w-full bg-black px-7 py-24 font-primary text-white sm:py-32"
      }
      aria-labelledby="video-section-heading"
      style={
        behindCurtain
          ? undefined
          : { contentVisibility: "auto", containIntrinsicSize: "0 900px" }
      }
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <h2
          id="video-section-heading"
          className="text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Hiring Revolutionised
        </h2>

        <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8">
          <span
            className="inline-block size-3 shrink-0 sm:size-3.5"
            style={{ backgroundColor: ACCENT_COLOR }}
            aria-hidden
          />
          <p className="text-base text-white/80 sm:text-lg">
            The complete workflow of the application
          </p>
        </div>

        <div className="video-glass-frame relative mt-12 w-full sm:mt-16">
          <div
            className="pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-70"
            aria-hidden
            style={{
              background:
                "linear-gradient(135deg, rgba(96,24,155,0.45) 0%, rgba(255,255,255,0.08) 40%, rgba(188,132,238,0.2) 100%)",
            }}
          />
          <div className="video-glass-frame__inner relative overflow-hidden rounded-[1.65rem]">
            <video
              ref={videoRef}
              className="block aspect-video w-full object-cover"
              loop
              muted
              playsInline
              preload={behindCurtain ? "metadata" : "none"}
              aria-label="EmergX platform demo showing the complete hiring workflow"
            >
              <source src="/video/demoVideo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
