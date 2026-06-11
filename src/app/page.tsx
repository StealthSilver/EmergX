import ScrollProgressRoot from "@/app/components/ScrollProgressRoot";
import Hero from "@/app/components/sections/Hero";
import Navbar from "@/app/components/sections/Navbar";
import Platform from "@/app/components/sections/Platform";
import FaqSection from "@/app/components/sections/FaqSection";
import Footer from "@/app/components/sections/footer/Footer";
export default function Home() {
  return (
    <>
      <ScrollProgressRoot />
      <Navbar />
      <Hero />
      <Platform />
      <FaqSection />
      <Footer />
    </>
  );
}
