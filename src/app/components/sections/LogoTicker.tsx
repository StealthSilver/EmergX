import Image from "next/image";
import { trustedLogos } from "@/lib/data/hero.data";

const tickerLogos = [...trustedLogos, ...trustedLogos];

export default function LogoTicker() {
  return (
    <div className="logo-ticker-wrap relative w-full" aria-label="Trusted company logos">
      <div className="logo-ticker-mask relative w-full overflow-hidden">
        <div className="logo-ticker-track flex w-max items-center">
          {tickerLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="logo-ticker-item flex shrink-0 items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={index < trustedLogos.length ? `${logo.name} logo` : ""}
                width={logo.width}
                height={logo.height}
                className="logo-ticker-image"
                draggable={false}
                aria-hidden={index >= trustedLogos.length ? true : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
