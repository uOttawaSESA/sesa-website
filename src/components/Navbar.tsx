"use client";

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* const gradientBorderClass = `
  relative
  before:absolute before:inset-0
  before:p-[1px]
  before:bg-gradient-to-r before:from-[rgba(136,36,220,0.7)] before:to-[rgba(177,33,157,0.7)]
  before:content-['']
  before:transition-all
  hover:before:rounded-3xl
`; */

export default function Navbar() {
    const pathname = usePathname();

    const isActivePage = (path: string) => {
        return pathname === path;
    };

    const navLinkClass = "font-heading text-lg uppercase transition-all hover:opacity-80";
    const activeNavLinkClass = `
      bg-gradient-to-r from-[#8824DC] to-[#B1219D] bg-clip-text text-transparent 
      relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full 
      after:bg-gradient-to-r after:from-[#8824DC] after:to-[#B1219D]
    `;

    return (
        <>
            <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-transparent px-8 py-6 backdrop-blur-sm md:px-12 lg:px-20 xl:px-32 2xl:px-64">
                <div className="flex items-center gap-3">
                    <Link href="/">
                        <Image width={40} height={40} src="/sesa-logo.svg" alt="SESA Logo" />
                    </Link>
                    <Link href="/">
                        <Image
                            width={90}
                            height={21}
                            src="/logo-text.svg"
                            alt="SESA Logo Text"
                            className="h-5"
                        />
                    </Link>
                </div>

                <nav className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
                    <Link
                        href="/"
                        className={`${navLinkClass} ${isActivePage("/") ? activeNavLinkClass : "text-white"}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="#"
                        className={`${navLinkClass} ${isActivePage("/about") ? activeNavLinkClass : "text-white"}`}
                    >
                        About
                    </Link>
                    <Link
                        href="/pages/EventsPage"
                        className={`${navLinkClass} ${isActivePage("/pages/EventsPage") ? activeNavLinkClass : "text-white"}`}
                    >
                        Events
                    </Link>
                    <Link
                        href="/pages/ResourcesPage"
                        className={`${navLinkClass} ${isActivePage("/pages/ResourcesPage") ? activeNavLinkClass : "text-white"}`}
                    >
                        Resources
                    </Link>
                    <Link
                        href="/pages/ContactUsPage"
                        className={`${navLinkClass} ${isActivePage("/pages/ContactUsPage") ? activeNavLinkClass : "text-white"}`}
                    >
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Button variant="outline" className="font-heading text-base uppercase">
                        FR
                    </Button>
                    <Button className="font-heading text-base uppercase">Sponsor us</Button>
                </div>
            </header>

            <div className="h-24" />
        </>
    );
}
