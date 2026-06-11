import Link from "next/link";
import NavbarLogo from "@/app/components/sections/NavbarLogo";
import NavLinks from "@/app/components/sections/NavLinks";

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 p-3 sm:p-4">
      <nav
        className="pointer-events-auto relative mx-14 flex max-w-8xl items-center justify-between rounded-md border-2 border-white/20 bg-white/35 px-2 py-1.5 font-primary shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md sm:mx-16 lg:mx-20"
        aria-label="Main navigation"
      >
        <NavbarLogo />

        <NavLinks />

        <Link
          href="#request-demo"
          className="request-demo-btn relative z-10 inline-flex min-w-[150px] shrink-0 items-center justify-center rounded-[6px] px-7 py-1.5 font-primary text-sm font-medium uppercase text-white transition-colors"
        >
          Request Demo
        </Link>
      </nav>
    </header>
  );
}
