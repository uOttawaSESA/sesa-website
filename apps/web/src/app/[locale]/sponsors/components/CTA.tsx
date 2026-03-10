"use client";
import { Button } from "@repo/ui/components/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Star from "@/components/decorations/star";
import { Link } from "@/i18n/navigation";

export default function CTA() {
    const t = useTranslations("sponsorships");

    return (
        <div className="relative flex w-full flex-col items-center justify-center px-4 py-6 text-center md:py-8">
            {/* Decorations */}
            <div className="pointer-events-none inset-0 select-none">
                <Image
                    src="/decoration/floor-grid.svg"
                    className="fade-from-center-bg absolute bottom-10 left-1/2 h-[196px] -translate-x-1/2 transform object-cover object-bottom md:-bottom-18"
                    width={1200}
                    height={430}
                    alt=""
                />

                <Star
                    variant="star-faded"
                    className="absolute top-40 right-16 md:top-48 md:right-40"
                    rotate={30}
                    width={55}
                    height={55}
                    delay={0.5}
                />

                <Star
                    variant="star"
                    className="absolute top-28 right-44 hidden md:block"
                    width={125}
                    height={128}
                    delay={1}
                />
            </div>

            <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap md:gap-8">
                <p className="text-center font-heading text-sm text-white uppercase md:text-lg">
                    {t("cta_heading")}
                </p>
                <Button asChild className="px-5 font-heading text-white uppercase">
                    <Link href="/contact">{t("cta_button")}</Link>
                </Button>
            </div>

            <p className="z-3 mt-4 font-sans text-thistle text-xs tracking-widest md:text-sm">
                {t("cta_disclaimer")}
            </p>
        </div>
    );
}
