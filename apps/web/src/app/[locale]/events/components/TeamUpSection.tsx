import Image from "next/image";
import { useTranslations } from "next-intl";
import CircleImage from "@/components/CircleImage"; // Import the CircleImage component
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type React from "react";

const TeamUpSection: React.FC = () => {
    const t = useTranslations("events");

    return (
        <div className="my-8 flex flex-col items-center justify-start gap-4 px-8 sm:flex-row md:my-24 md:gap-12 md:ps-0 lg:my-56 2xl:gap-24">
            <div className="grid-overlay-left md:h-[25rem] md:w-[50vw] xl:h-[43.93rem] 2xl:w-[37vw]"></div>

            <div className="">
                <Image
                    src="/imgs/Events/team-up.webp"
                    alt="SESA Group Photo"
                    className="relative z-10 aspect-7/5 max-h-[400px] object-cover sm:max-h-[500px] lg:block"
                    width={700}
                    height={700}
                />
            </div>

            <div className="z-10 max-w-lg text-left text-white">
                <p className="bg-linear-to-r from-blueviolet-100 to-darkmagenta bg-clip-text font-mono text-transparent text-xs md:text-base">
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
                        src="/imgs/team/peter.jpeg"
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
