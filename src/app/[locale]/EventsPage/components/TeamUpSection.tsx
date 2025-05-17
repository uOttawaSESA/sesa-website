import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import CircleImage from "@/components/CircleImage"; // Import the CircleImage component
import { useTranslations } from "next-intl";

const TeamUpSection: React.FC = () => {
    const t = useTranslations("events");

    return (
        <div className="my-36 flex h-[45rem] items-center justify-start gap-12 align-middle">
            <div className="grid-overlay-left md:h-[43.93rem] md:w-[53vw]"></div>

            <div className="relative z-10 lg:block">
                <Image
                    src="/imgs/Events/team-up.png"
                    alt="SESA Group Photo"
                    className="h-[500px] w-auto"
                    width={700}
                    height={700}
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

                <div className="mt-6 flex gap-4">
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
                        src="/imgs/team/peter.png"
                        alt="Peter Bou-Farah"
                        className="ml-[-0.75rem]"
                    />
                    <CircleImage
                        size={55}
                        src="/imgs/team/ayushi.png"
                        alt="Ayushi Dosieah"
                        className="ml-[-0.75rem]"
                    />
                    <CircleImage
                        size={55}
                        src="/imgs/team/darren.png"
                        alt="Darren Rakos"
                        className="ml-[-0.75rem]"
                    />
                    <CircleImage
                        size={55}
                        src="/imgs/team/thomas.png"
                        alt="Thomas Boyle"
                        className="ml-[-0.75rem]"
                    />
                    <CircleImage
                        size={55}
                        src="/imgs/team/ichrak.png"
                        alt="Ichrak El Hatimi"
                        className="ml-[-0.75rem]"
                    />
                </div>
            </div>
        </div>
    );
};

export default TeamUpSection;
