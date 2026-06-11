import CurtainDivider from "@/app/components/sections/CurtainDivider";
import PlatformScrollHero from "@/app/components/sections/PlatformScrollHero";

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
        <div className="flex min-h-screen items-end px-7 pb-24">
          <p className="max-w-3xl text-4xl font-medium leading-tight text-white/90">
            The next chapter of your hiring stack starts here.
          </p>
        </div>
      </CurtainDivider>
    </>
  );
}
