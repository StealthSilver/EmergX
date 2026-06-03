const heroGradient =
  "radial-gradient(ellipse 120% 100% at 50% 0%, #3e165b 12%, #580b97 37%, #a96bdc 62%, #ffffff 84%)";

const noiseOverlay = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="5" stitchTiles="stitch"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>`,
)}")`;

export default function Hero() {
  return (
    <section
      className="relative flex h-[100vh] min-h-[100vh] w-full flex-col overflow-hidden font-primary"
      style={{ background: heroGradient }}
      aria-label="Hero"
    >
      <div
        aria-hidden
        className="hero-noise pointer-events-none absolute -inset-4 z-0 opacity-[0.55] mix-blend-soft-light"
        style={{
          backgroundImage: noiseOverlay,
          backgroundRepeat: "repeat",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-24 pt-8 sm:px-8 sm:pb-28" />
    </section>
  );
}
