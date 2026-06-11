import CurtainDivider from "@/app/components/sections/CurtainDivider";
import PlatformScrollHero from "@/app/components/sections/PlatformScrollHero";
import VideoSection from "@/app/components/sections/VideoSection";

export default function Platform() {
  return (
    <>
      <section
        id="platform"
        className="scroll-mt-24 w-full bg-white font-primary text-gray-900"
        aria-labelledby="platform-heading"
      >
        <PlatformScrollHero />
      </section>

      <CurtainDivider>
        <VideoSection behindCurtain />
      </CurtainDivider>
    </>
  );
}
