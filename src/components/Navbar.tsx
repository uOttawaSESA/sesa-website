"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { useState, useMemo } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";

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

interface NavItem {
    href: string;
    i18nKey: string;
    pageName: string;
}

const navItemsData = [
    { href: "/", i18nKey: "home", pageName: "" },
    { href: "/AboutPage", i18nKey: "about", pageName: "AboutPage" },
    { href: "/EventsPage", i18nKey: "events", pageName: "EventsPage" },
    { href: "/ResourcesPage", i18nKey: "resources", pageName: "ResourcesPage" },
    { href: "/ContactUsPage", i18nKey: "contact", pageName: "ContactUsPage" },
] as const satisfies NavItem[];

export default function Navbar() {
    const t = useTranslations("navigation");
    const pathname = usePathname();
    const router = useRouter();

    // _Technically_ this isn't necessary since the page refreshes anyway,
    // but imo it looks better to a user if the select immediately updates
    // instead of having a moment of confusion until the page reloads.
    const [locale, setLocale] = useState(useLocale());
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const languageItems = [
        {
            label: "EN",
            value: "en",
        },
        {
            label: "FR",
            value: "fr",
        },
    ] as const;

    const navItems = useMemo(() => {
        const firstPathname = pathname.split("/")[1];

        return (
            <>
                {navItemsData.map(item => (
                    <NavLinkItem
                        key={item.i18nKey}
                        href={item.href}
                        label={t(item.i18nKey)}
                        isActive={item.pageName === firstPathname}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                ))}
            </>
        );
    }, [pathname, t]);

    const changeLocale = (newLocale: string) => {
        if (locale !== newLocale) {
            setLocale(newLocale);
            router.push(pathname, { locale: newLocale });
        }
    };

    return (
        <>
            <header className="fixed left-0 right-0 top-0 z-50 flex w-screen items-center justify-between bg-transparent px-8 py-6 backdrop-blur-sm md:px-12 lg:px-20 xl:px-32 2xl:px-64">
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
                    {navItems}
                </nav>

                <div className="flex items-center gap-4">
                    <Select value={locale} onValueChange={changeLocale}>
                        <SelectTrigger className="font-heading">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {languageItems.map(({ label, value }) => (
                                    <SelectItem className="font-heading" key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Link href="/SponsorsPage" className="hidden lg:block">
                        <Button className="font-heading text-base uppercase text-white">
                            {t("sponsor_us")}
                        </Button>
                    </Link>
                    {/* Hamburger menu for mobile */}
                    <Button
                        size="icon"
                        className="touch-manipulation text-white lg:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <Image src="/icons/hamburger.svg" alt="Menu" width={24} height={24} />
                    </Button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}
            >
                <nav className="mt-16 flex flex-col items-center gap-8 py-10">
                    {navItems}
                    <Link href="/SponsorsPage" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="font-heading text-base uppercase text-white">
                            {t("sponsor_us")}
                        </Button>
                    </Link>
                </nav>
            </div>

            <div className="h-24" />
        </>
    );
}
