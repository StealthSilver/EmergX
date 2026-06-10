import PlatformAccordion from "@/app/components/sections/PlatformAccordion";
import PlatformScrollHero from "@/app/components/sections/PlatformScrollHero";

export default function Platform() {
  return (
    <section
      id="platform"
      className="scroll-mt-24 w-full bg-white px-7 font-primary text-gray-900"
      aria-labelledby="platform-heading"
    >
      <PlatformScrollHero />
      <PlatformAccordion />
    </section>
  );
}
