// import Button from "@/components/Button";
import Goal from "./types/Goal";
import Image from "next/image";
import { TeamBadgeStack } from "@/components/TeamBadgeStack";
import Button from "@/components/Button";

export const GoalCard: React.FC<{ goal: Goal }> = ({ goal }) => {
    const {
        goalType,
        title,
        highlightTitle,
        description,
        buttonLink,
        buttonText,
        memberImgLinks,
        mainImg,
    } = goal;
    return (
        <div className="flex w-full flex-col items-start justify-start gap-4 xl:h-[45rem] xl:flex-row xl:items-center xl:gap-12">
            {/* Left Image */}
            <div className="z-10">
                <Image
                    src={mainImg}
                    alt="Goal Main Image"
                    className="h-[300px] object-cover md:h-[400px] xl:h-[500px] 2xl:h-[600px] 2xl:max-w-3xl"
                    width={700}
                    height={700}
                />
            </div>

            {/* Content */}
            <div className="flex w-full max-w-lg flex-col gap-4 md:max-w-xl xl:max-w-sm">
                <p className="font-monocode relative inline-block !bg-clip-text text-left text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                    {goalType}
                </p>
                <h1 className="font-heading text-2xl uppercase leading-tight md:text-3xl xl:text-5xl">
                    {title}&nbsp;
                    <span className="relative inline-block">
                        {highlightTitle}
                        <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                    </span>
                </h1>

                <p className="w-full text-left font-sans text-base text-thistle md:text-xl">
                    {description}
                </p>

                <Button
                    href={buttonLink}
                    className="w-max text-center font-heading text-lg uppercase md:mt-6"
                >
                    {buttonText}
                </Button>
                <TeamBadgeStack imgs={memberImgLinks} />
            </div>
        </div>
    );
};
