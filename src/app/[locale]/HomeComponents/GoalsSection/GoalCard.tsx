// import {Button} from "@/components/ui/button";

import Image from "next/image";
import { useLocale } from "next-intl";
import { TeamBadgeStack } from "@/components/TeamBadgeStack";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type Goal from "./types/Goal";

export const GoalCard: React.FC<{ goal: Goal }> = ({ goal }) => {
    const locale = useLocale();
    const lang = locale === "fr" ? "fr" : "en";

    return (
        <div className="flex h-full w-full flex-col items-start justify-between gap-16 lg:flex-row lg:items-center lg:justify-start lg:gap-10 xl:h-[45rem] 2xl:gap-32">
            <div className="relative order-2 w-full max-w-2xl lg:max-w-2xl 2xl:max-w-4xl">
                <Image
                    src={goal.mainImg}
                    alt="Goal Main Image"
                    className="relative z-10 mb-12 h-[250px] w-full object-cover sm:h-[400px] md:h-[600px] lg:mt-12 lg:h-[500px]"
                    width={700}
                    height={700}
                />
                <Image
                    src="/decoration/grid-mobile.svg"
                    alt=""
                    className="fade-from-top-grid-mobile absolute top-[-7.5rem] block md:hidden"
                    width={700}
                    height={700}
                />
                <div className="grid-overlay-left -top-12 lg:-top-12 z-0 hidden h-[350px] w-full sm:h-[500px] md:block md:h-[700px] lg:h-[43.9rem] xl:w-[45vw]"></div>
            </div>

            <div className="order-1 flex h-full w-full max-w-lg flex-col justify-center gap-4 px-8 lg:order-2 lg:max-w-md xl:px-0 2xl:max-w-2xl">
                <p className="relative inline-block bg-clip-text! text-left font-monocode text-transparent text-xs [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,#8824dc,#b1219d)] md:text-base">
                    {goal.goalType[lang]}
                </p>
                <h1 className="font-heading text-2xl uppercase leading-tight md:text-4xl">
                    {goal.title[lang]}&nbsp;
                    <span className="highlight-text">{goal.highlightTitle[lang]}</span>
                </h1>

                <p className="w-full text-left font-sans text-base text-thistle md:text-xl">
                    {goal.description[lang]}
                </p>

                <div className="mt-6 flex">
                    <Button className="w-max text-sm md:text-lg" asChild>
                        <Link href={goal.buttonLink}>{goal.buttonText[lang]}</Link>
                    </Button>
                </div>
                <TeamBadgeStack imgs={goal.memberImgLinks} />
            </div>
        </div>
    );
};
