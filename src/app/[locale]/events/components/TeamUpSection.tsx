import Image from "next/image";
import { useTranslations } from "next-intl";
import CircleImage from "@/components/CircleImage"; // Import the CircleImage component
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type React from "react";

const TeamUpSection: React.FC = () => {
    const t = useTranslations("events");

    return (
        <div className="px-8 lg:my-56 md:ps-0 flex my-8 md:my-24 flex-col items-center justify-start gap-4 md:gap-12 sm:flex-row 2xl:gap-24">
            <div className="grid-overlay-left md:h-[25rem] xl:h-[43.93rem] md:w-[50vw] 2xl:w-[37vw]"></div>

            <div className="">
                <Image
                    src="/imgs/Events/team-up.webp"
                    alt="SESA Group Photo"
                    className="relative z-10 lg:block aspect-7/5 object-cover max-h-[400px] sm:max-h-[500px]"
                    width={700}
                    height={700}
                />
            </div>

            <div className="z-10 max-w-lg text-left text-white">
                <p className="bg-linear-to-r from-blueviolet-100 to-darkmagenta bg-clip-text font-mono text-xs text-transparent md:text-base">
                    {t("work_with_us")}
                </p>
                <h2 className="mt-3 font-heading text-2xl uppercase md:text-4xl">
                    {t("teamup_heading")}
                </h2>
                <p className="mt-4 max-w-[558px] font-sans text-base text-thistle md:text-lg">
                    {t("teamup_blurb")}
                </p>

                <div className="mt-4 flex gap-4 text-base md:text-lg">
                    <Button className="flex-grow font-heading uppercase" asChild>
                        <Link href="/contact">{t("btn_talk")}</Link>
                    </Button>

                    <Button variant="outline" className="flex-grow font-heading uppercase" asChild>
                        <Link href="/about">{t("btn_meet_team")}</Link>
                    </Button>
                </div>

                <div className="ms-4 mt-6 flex">
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
