import Link from "next/link";

const heroGradient =
  "radial-gradient(ellipse 120% 100% at 50% 0%, #150520 0%, #220838 6%, #2f0f4a 14%, #3e165b 22%, #4d1280 30%, #580b97 38%, #6e22ad 46%, #8540c4 54%, #9d5fd4 62%, #b078e0 70%, #c49aed 78%, #dac2f4 86%, #efe4fa 93%, #ffffff 100%)";

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
      aria-labelledby="hero-heading"
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

      <div className="relative z-10 mx-auto flex h-full w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-24 pt-8 text-center sm:px-8 sm:pb-28">
        <h1
          id="hero-heading"
          className="font-primary text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Your Team Deserves Better
          <br />
          Hiring Automation
        </h1>

        <p className="mt-6 max-w-2xl font-primary text-base leading-relaxed text-white/90 sm:text-lg">
          AI recruiting agents built for quality. Scale your hiring without
          losing the human insight every great hire deserves.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="#request-demo"
            className="inline-flex min-w-[180px] items-center justify-center rounded-md bg-[#580b97] px-8 py-3.5 font-primary text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#4a0a80]"
          >
            Request Demo
          </Link>
          <Link
            href="#for-candidates"
            className="inline-flex min-w-[180px] items-center justify-center rounded-md border border-white/25 bg-white/20 px-8 py-3.5 font-primary text-sm font-medium uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            For Candidates
          </Link>
        </div>
      </div>
    </section>
  );
}
