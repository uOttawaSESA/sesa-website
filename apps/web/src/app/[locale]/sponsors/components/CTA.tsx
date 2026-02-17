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
                    className="fade-from-center-bg md:-bottom-18 -translate-x-1/2 absolute bottom-10 left-1/2 h-[196px] transform object-cover object-bottom"
                    width={1200}
                    height={430}
                    alt=""
                />

                <Star
                    variant="star-faded"
                    className="absolute top-[10rem] right-[4rem] md:top-[12rem] md:right-[10rem]"
                    rotate={30}
                    width={55}
                    height={55}
                    delay={0.5}
                />

                <Star
                    variant="star"
                    className="absolute top-[7rem] right-[11rem] hidden md:block"
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

            <p className="mt-4 font-sans text-thistle text-xs tracking-widest md:text-sm">
                {t("cta_disclaimer")}
            </p>
        </div>
    );
}
