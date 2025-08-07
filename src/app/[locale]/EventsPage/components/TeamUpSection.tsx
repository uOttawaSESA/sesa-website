import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CircleImage from "@/components/CircleImage"; // Import the CircleImage component
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const TeamUpSection: React.FC = () => {
    const t = useTranslations("events");

    return (
        <div className="mx-4 my-36 flex h-[45rem] flex-col items-center justify-start gap-12 sm:mx-0 sm:flex-row">
            <div className="grid-overlay-left md:h-[43.93rem] md:w-[53vw]"></div>

            <div className="relative z-10 lg:block">
                <Image
                    src="/imgs/Events/team-up.webp"
                    alt="SESA Group Photo"
                    className="aspect-[7/5] max-h-[400px] sm:max-h-[500px]"
                    width={700}
                    height={500}
                />
            </div>

            <div className="z-10 max-w-lg text-left text-white">
                <span className="bg-gradient-to-r from-blueviolet-100 to-darkmagenta bg-clip-text font-mono text-transparent">
                    {t("work_with_us")}
                </span>
                <div className="mt-3 font-heading text-2xl uppercase">{t("teamup_heading")}</div>
                <p className="mt-4 max-w-[558px] font-sans text-xl text-thistle">
                    {t("teamup_blurb")}
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                    <Button className="relative z-10 font-heading text-xl uppercase" asChild>
                        <Link href="/ContactUsPage">{t("btn_talk")}</Link>
                    </Button>

                    <Button
                        variant="outline"
                        className="relative z-10 font-heading text-xl uppercase"
                        asChild
                    >
                        <Link href="/TeamPage">{t("btn_meet_team")}</Link>
                    </Button>
                </div>

                <div className="mt-6 flex">
                    <CircleImage
                        size={55}
                        src="/imgs/team/peter.webp"
                        alt="Peter Bou-Farah"
                        className="ml-[-0.75rem]"
                    />
                    <CircleImage
                        size={55}
                        src="/imgs/team/ayushi.webp"
                        alt="Ayushi Dosieah"
                        className="ml-[-0.75rem]"
                    />
                    <CircleImage
                        size={55}
                        src="/imgs/team/darren.webp"
                        alt="Darren Rakos"
                        className="ml-[-0.75rem]"
                    />
                    <CircleImage
                        size={55}
                        src="/imgs/team/thomas.webp"
                        alt="Thomas Boyle"
                        className="ml-[-0.75rem]"
                    />
                    <CircleImage
                        size={55}
                        src="/imgs/team/ichrak.webp"
                        alt="Ichrak El Hatimi"
                        className="ml-[-0.75rem]"
                    />
                </div>
            </div>
        </div>
    );
};

export default TeamUpSection;
