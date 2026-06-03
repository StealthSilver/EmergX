import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/data/site.data";

const navLinks = [
  { label: "For Candidates", href: "#for-candidates" },
] as const;

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className="pointer-events-auto mx-14 flex h-12 max-w-8xl items-center justify-between rounded-md border-2 border-white/20 bg-white/35 px-6 font-primary shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md sm:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2.5 font-primary">
          <Image
            src="/icon.svg"
            alt={`${siteConfig.name} logo`}
            width={24}
            height={24}
            priority
          />
          <span className="font-primary text-base font-medium tracking-tight text-white">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex items-center gap-6 font-primary">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="hidden font-primary text-sm font-medium text-white/80 transition-colors hover:text-white sm:inline"
            >
              {label}
            </Link>
          ))}

          <Link
            href="#request-demo"
            className="font-primary rounded-full bg-white px-3.5 py-1 text-sm font-medium text-[#3e165b] transition-colors hover:bg-white/90"
          >
            Request Demo
          </Link>
        </div>
      </nav>
    </header>
  );
}
