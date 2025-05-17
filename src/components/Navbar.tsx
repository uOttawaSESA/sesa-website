"use client";

import Image from "next/image";
import Button from "./Button";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { useTranslations } from "next-intl";

export default function Navbar() {
    const t = useTranslations("navigation");

    const pathname = usePathname();
    const [selectedLang, setSelectedLang] = useState("EN");
    const [isOpen, setIsOpen] = useState(false);

    const languageItems = [
        {
            label: "EN",
            value: "EN",
            onClick: () => setSelectedLang("EN"),
        },
        {
            label: "FR",
            value: "FR",
            onClick: () => setSelectedLang("FR"),
        },
    ];

    const handleItemClick = (onClick: () => void) => {
        onClick();
        setIsOpen(false);
    };

    const isActivePage = (path: string) => {
        const withoutLocale = pathname.split("/").slice(2).join("/");
        return withoutLocale === path;
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
                        className={`${navLinkClass} ${isActivePage("") ? activeNavLinkClass : "text-white"}`}
                    >
                        {t("home")}
                    </Link>
                    <Link
                        href="#"
                        className={`${navLinkClass} ${isActivePage("about") ? activeNavLinkClass : "text-white"}`}
                    >
                        {t("about")}
                    </Link>
                    <Link
                        href="/EventsPage"
                        className={`${navLinkClass} ${isActivePage("EventsPage") ? activeNavLinkClass : "text-white"}`}
                    >
                        {t("events")}
                    </Link>
                    <Link
                        href="/ResourcesPage"
                        className={`${navLinkClass} ${isActivePage("ResourcesPage") ? activeNavLinkClass : "text-white"}`}
                    >
                        {t("resources")}
                    </Link>
                    <Link
                        href="/ContactUsPage"
                        className={`${navLinkClass} ${isActivePage("ContactUsPage") ? activeNavLinkClass : "text-white"}`}
                    >
                        {t("contact")}
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`outline-gradient flex items-center gap-2 bg-transparent px-6 py-3 font-heading text-base uppercase text-white`}
                        >
                            {selectedLang}
                            <Image
                                src="/navbar/caret-down.svg"
                                alt="Language selector"
                                width={12}
                                height={12}
                                className={`transition-transform duration-200 ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        <Dropdown
                            items={languageItems}
                            isOpen={isOpen}
                            onItemClick={handleItemClick}
                        />
                    </div>
                    <Button className="font-heading text-base uppercase">{t("sponsor")}</Button>
                </div>
            </header>

            <div className="h-24" />
        </>
    );
}
