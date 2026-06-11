const ACCENT_COLOR = "#60189b";

export default function VideoSection() {
  return (
    <section
      id="demo-video"
      className="w-full bg-black px-7 py-24 font-primary text-white sm:py-32"
      aria-labelledby="video-section-heading"
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
              className="block aspect-video w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
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
