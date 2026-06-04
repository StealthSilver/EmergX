import Image from "next/image";
import { trustedLogos } from "@/lib/data/hero.data";

function LogoItem({ name, src }: (typeof trustedLogos)[number]) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={140}
        height={40}
        className="h-8 w-auto max-w-[140px] object-contain opacity-80 grayscale sm:h-9"
      />
    );
  }

  return (
    <span className="whitespace-nowrap font-primary text-lg font-light tracking-wide text-black/70 sm:text-xl">
      {name}
    </span>
  );
}

export default function LogoTicker() {
  const items = [...trustedLogos, ...trustedLogos];

  return (
    <div
      className="logo-ticker-mask relative w-full overflow-hidden"
      aria-label="Trusted company logos"
    >
      <div className="logo-ticker-track flex w-max items-center gap-12 sm:gap-16">
        {items.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex shrink-0 items-center justify-center px-2"
          >
            <LogoItem {...logo} />
          </div>
        ))}
      </div>
    </div>
  );
}
