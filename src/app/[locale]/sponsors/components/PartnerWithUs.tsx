"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { TeamBadgeStack } from "@/components/TeamBadgeStack";
import { Button } from "@/components/ui/button";
import Star from "@/components/ui/decorations/star";
import { Link } from "@/i18n/navigation";

const PartnerWithUs = () => {
    const teamImgs = [
        "/imgs/team/dragos.webp",
        "/imgs/team/ayushi.webp",
        "/imgs/team/bilal.jpeg",
        "/imgs/team/whitney.webp",
    ];

    const t = useTranslations("sponsorships");

    return (
        <div className="relative mb-12 flex flex-col items-start justify-start gap-10 px-4 py-16 text-white md:mb-32 md:h-[80vh] md:flex-row md:items-center md:justify-between md:gap-12 md:px-0 md:ps-32 2xl:ps-96">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                {/* Light gradient */}
                <div className="fade-from-left-bg absolute h-[70rem] w-[60vw] bg-blueviolet-100 opacity-15 blur-xs md:bottom-[-20rem] md:h-[100rem]" />

                <Star
                    variant="star-faded"
                    className="absolute md:left-[10rem] md:top-[-5rem]"
                    rotate={30}
                    width={75}
                    height={75}
                    delay={0.5}
                />
                <Star
                    variant="star"
                    className="absolute hidden md:block"
                    rotate={-110}
                    width={125}
                    height={128}
                    delay={1}
                />
                <Star
                    variant="star-faded"
                    className="absolute left-[17rem] top-[45rem] md:left-[30rem] md:top-[30rem] 2xl:left-[40rem] 2xl:top-[40rem]"
                    rotate={30}
                    width={75}
                    height={75}
                    delay={0.5}
                    showMobile={true}
                />
            </div>

            {/* Grid Overlay Right (desktop only) */}
            <div className="grid-overlay-right hidden md:block md:h-[43.93rem] md:w-[50vw] 2xl:w-[45vw]"></div>

            {/* Content Container */}
            <div className="relative z-10 flex w-full flex-col-reverse items-start justify-between gap-8 md:flex-row md:gap-12">
                {/* Text Section */}
                <div className="max-w-xl text-left 2xl:max-w-2xl">
                    <p className="font-monocode relative inline-block bg-clip-text! text-xs text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,#8824dc,#b1219d)] md:text-base">
                        {t("partner_with_us_top")}
                    </p>
                    <h2 className="mb-4 mt-2 font-heading text-2xl uppercase leading-tight text-white md:mt-4 md:text-3xl">
                        {t("partner_with_us_title")}{" "}
                        <span className="highlight-text">{t("partner_with_us_highlight")}</span>{" "}
                        {t("partner_with_us_title_rest")}
                    </h2>
                    <p className="mb-4 mt-2 text-base leading-tight text-thistle md:text-lg">
                        {t("partner_with_us_description")}
                    </p>

                    <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <Button
                            className="w-fit min-w-[12rem] whitespace-nowrap font-heading text-sm uppercase text-white md:text-lg"
                            asChild
                        >
                            <Link href="/contact" className="block h-full text-inherit">
                                {t("partner_with_us_become_sponsor_button")}
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="w-fit min-w-[12rem] whitespace-nowrap font-heading text-sm text-white md:text-lg"
                            asChild
                        >
                            <Link href="/about" className="block h-full text-inherit">
                                {t("partner_with_us_meet_team_button")}
                            </Link>
                        </Button>
                    </div>

                    <div className="-ml-2 md:-ml-1">
                        <TeamBadgeStack imgs={teamImgs} />
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative z-10 flex w-full justify-center md:justify-end">
                    <Image
                        src="/sponsors-page/sponsor-card-img-2.webp"
                        alt={t("partner_with_us_team_image_alt")}
                        className="h-[300px] w-auto object-cover md:h-[500px] 2xl:h-max"
                        width={700}
                        height={700}
                    />
                </div>
            </div>
        </div>
    );
};

export default PartnerWithUs;
