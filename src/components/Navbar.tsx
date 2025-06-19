"use client";

import Image from "next/image";
import Button from "./Button";
import IconButton from "./IconButton";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { useTranslations } from "next-intl";

interface NavLinkItemProps {
    href: string;
    label: string;
    isActive: boolean;
    onClick?: () => void;
}

function NavLinkItem({ href, label, isActive, onClick }: NavLinkItemProps) {
    const navLinkClass = "font-heading text-lg uppercase transition-all hover:opacity-80";
    const activeNavLinkClass = `
      bg-gradient-to-r from-[#8824DC] to-[#B1219D] bg-clip-text text-transparent 
      relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full 
      after:bg-gradient-to-r after:from-[#8824DC] after:to-[#B1219D]
    `;

    return (
        <Link
            href={href}
            className={`${navLinkClass} ${isActive ? activeNavLinkClass : "text-white"}`}
            onClick={onClick}
        >
            {label}
        </Link>
    );
}

export default function Navbar() {
    const t = useTranslations("navigation");

    const pathname = usePathname();
    const [selectedLang, setSelectedLang] = useState("EN");
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        setIsLangDropdownOpen(false);
    };

    const isActivePage = (path: string) => {
        const withoutLocale = pathname.split("/").slice(2).join("/");
        return withoutLocale === path;
    };

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

                <nav className="hidden items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:flex lg:gap-12 xl:gap-16">
                    <NavLinkItem href="/" label={t("home")} isActive={isActivePage("")} />
                    <NavLinkItem
                        href="/AboutPage"
                        label={t("about")}
                        isActive={isActivePage("about")}
                    />
                    <NavLinkItem
                        href="/EventsPage"
                        label={t("events")}
                        isActive={isActivePage("EventsPage")}
                    />
                    <NavLinkItem
                        href="/ResourcesPage"
                        label={t("resources")}
                        isActive={isActivePage("ResourcesPage")}
                    />
                    <NavLinkItem
                        href="/ContactUsPage"
                        label={t("contact")}
                        isActive={isActivePage("ContactUsPage")}
                    />
                </nav>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                            className={`outline-gradient flex items-center gap-2 bg-transparent px-6 py-3 font-heading text-base uppercase text-white`}
                        >
                            {selectedLang}
                            <Image
                                src="/navbar/caret-down.svg"
                                alt="Language selector"
                                width={12}
                                height={12}
                                className={`transition-transform duration-200 ${
                                    isLangDropdownOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        <Dropdown
                            items={languageItems}
                            isOpen={isLangDropdownOpen}
                            onItemClick={handleItemClick}
                        />
                    </div>
                    <Link href="/SponsorsPage" className="hidden lg:block">
                        <Button className="font-heading text-base uppercase text-white">
                            {t("sponsor_us")}
                        </Button>
                    </Link>
                    {/* Hamburger menu for mobile */}
                    <IconButton
                        className="text-white lg:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Image src="/icons/hamburger.svg" alt="Menu" width={24} height={24} />
                    </IconButton>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}
            >
                <div className="flex justify-end p-6">
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-3xl text-white"
                    >
                        &times;
                    </button>
                </div>
                <nav className="flex flex-col items-center gap-8 py-10">
                    <NavLinkItem
                        href="/"
                        label={t("home")}
                        isActive={isActivePage("")}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <NavLinkItem
                        href="/AboutPage"
                        label={t("about")}
                        isActive={isActivePage("about")}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <NavLinkItem
                        href="/EventsPage"
                        label={t("events")}
                        isActive={isActivePage("EventsPage")}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <NavLinkItem
                        href="/ResourcesPage"
                        label={t("resources")}
                        isActive={isActivePage("ResourcesPage")}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <NavLinkItem
                        href="/ContactUsPage"
                        label={t("contact")}
                        isActive={isActivePage("ContactUsPage")}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                </nav>
            </div>

            <div className="h-24" />
        </>
    );
}
