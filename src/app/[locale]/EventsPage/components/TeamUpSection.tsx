import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import CircleImage from "@/components/CircleImage"; // Import the CircleImage component
import { useTranslations } from "next-intl";

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
                    <Button
                        href="/pages/ContactUsPage"
                        className="relative z-10 font-heading text-xl uppercase"
                    >
                        {t("btn_talk")}
                    </Button>

                    <Button
                        variant="outline"
                        href="/pages/TeamPage"
                        className="relative z-10 font-heading text-xl uppercase"
                    >
                        {t("btn_meet_team")}
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
