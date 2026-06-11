import Link from "next/link";
import LogoTicker from "@/app/components/sections/LogoTicker";
import { trustedByHeading } from "@/lib/data/hero.data";

const heroGradient =
  "radial-gradient(ellipse 120% 100% at 50% 0%, #150520 0%, #220838 6%, #2f0f4a 14%, #3e165b 22%, #4d1280 30%, #580b97 38%, #6e22ad 46%, #8540c4 54%, #9d5fd4 62%, #b078e0 70%, #c49aed 76%, #dac2f4 82%, #efe4fa 87%, #ffffff 92%, #ffffff 100%)";

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
      className="relative flex h-[100vh] min-h-[100vh] w-full flex-col overflow-hidden font-primary before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-screen before:bg-[#60189B] before:content-['']"
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

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-4 text-center sm:px-8 sm:pb-32 sm:pt-46">
        <h1
          id="hero-heading"
          className="w-full max-w-5xl font-primary text-5xl font-bold leading-[1.3] tracking-tight text-balance text-white sm:max-w-6xl sm:text-6xl sm:leading-[1.35] md:max-w-7xl md:text-7xl md:leading-[1.4]"
        >
          Your Team Deserves Better
          <br />
          Hiring Automation
        </h1>

        <p className="mt-6 max-w-2xl font-primary text-xl leading-relaxed text-white/90 sm:text-2xl">
          AI recruiting agents built for quality. Scale your hiring without
          losing the human insight every great hire deserves.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:mt-14 sm:flex-row sm:justify-center">
          <Link
            href="#request-demo"
            className="request-demo-btn inline-flex min-w-[180px] items-center justify-center rounded-md px-8 py-3.5 font-primary text-sm font-medium uppercase text-white transition-colors"
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

        <div className="mt-48 w-full sm:mt-52 md:mt-56">
          <p className="mb-5 text-center font-primary text-sm font-normal text-black sm:mb-6 sm:text-base">
            {trustedByHeading}
          </p>
          <div className="mt-12 sm:mt-12">
            <LogoTicker />
          </div>
        </div>
      </div>
    </section>
  );
}
