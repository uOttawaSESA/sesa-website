"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function CTA() {
    const t = useTranslations("sponsorships");

    return (
        <div className="relative flex w-full flex-col items-center justify-center px-4 py-6 text-center md:py-8">
            {/* Decorations */}
            <div className="pointer-events-none inset-0 select-none">
                <Image
                    src="/decoration/floor-grid.svg"
                    className="fade-from-center-bg md:-bottom-18 absolute bottom-10 left-1/2 h-[196px] -translate-x-1/2 transform object-cover object-bottom"
                    width={1200}
                    height={430}
                    alt=""
                />
                <Image
                    src="/decoration/star-faded.svg"
                    className="absolute right-[4rem] top-[10rem] rotate-[30deg] transform md:right-[10rem] md:top-[12rem]"
                    width={55}
                    height={55}
                    alt=""
                />
                <Image
                    src="/decoration/star.svg"
                    className="absolute right-[11rem] top-[7rem] hidden md:block"
                    width={125}
                    height={128}
                    alt=""
                />
            </div>
            <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap md:gap-8">
                <p className="text-center font-heading text-sm uppercase text-white md:text-lg">
                    {t("cta_heading")}
                </p>
                <Button asChild className="px-5 font-heading uppercase text-white">
                    <Link href="/contact">{t("cta_button")}</Link>
                </Button>
            </div>

            <p className="mt-4 font-sans text-xs tracking-widest text-thistle md:text-sm">
                {t("cta_disclaimer")}
            </p>
        </div>
    );
}
