const heroGradient =
  "radial-gradient(ellipse 120% 100% at 50% 0%, #3e165b 12%, #580b97 37%, #a96bdc 62%, #ffffff 84%)";

export default function Hero() {
  return (
    <section
      className="relative flex h-[100vh] min-h-[100vh] w-full flex-col font-primary"
      style={{ background: heroGradient }}
      aria-label="Hero"
    >
      <div className="mx-auto flex h-full w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-24 pt-8 sm:px-8 sm:pb-28" />
    </section>
  );
}
