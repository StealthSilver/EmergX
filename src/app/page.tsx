import ScrollProgressRoot from "@/app/components/ScrollProgressRoot";
import Hero from "@/app/components/sections/Hero";
import Navbar from "@/app/components/sections/Navbar";
import Platform from "@/app/components/sections/Platform";
import VideoSection from "@/app/components/sections/VideoSection";

export default function Home() {
  return (
    <>
      <ScrollProgressRoot />
      <Navbar />
      <Hero />
      <Platform />
      <VideoSection />
    </>
  );
}
