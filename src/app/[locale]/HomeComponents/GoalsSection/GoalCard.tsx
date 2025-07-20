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
        <div className="flex h-full w-full flex-col items-start justify-between gap-16 lg:flex-row lg:items-center lg:justify-start lg:gap-12 xl:h-[45rem]">
            {/* Left Image */}
            <div className="relative order-2 w-full lg:order-1 lg:w-1/2">
                <Image
                    src={mainImg}
                    alt="Goal Main Image"
                    className="relative z-10 mb-12 h-[250px] w-full object-cover sm:h-[400px] md:h-[600px] lg:mt-12 lg:h-[500px]"
                    width={700}
                    height={700}
                />
                <div className="grid-overlay-left -top-12 z-0 h-[350px] w-full sm:h-[500px] md:h-[700px] lg:-top-12 lg:h-[43.9rem] lg:w-[53vw]"></div>
            </div>

            {/* Content */}
            <div className="order-1 flex h-full w-full max-w-lg flex-col justify-center gap-4 px-8 md:max-w-xl lg:order-2 lg:max-w-md">
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
                    className="w-max text-center font-heading text-sm uppercase md:text-lg"
                >
                    {buttonText}
                </Button>
                <TeamBadgeStack imgs={memberImgLinks} />
            </div>
        </div>
    );
};
