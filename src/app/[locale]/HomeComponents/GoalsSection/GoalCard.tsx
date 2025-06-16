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
        <div className="flex w-screen flex-col items-start justify-start gap-4 p-4 md:h-[45rem] md:w-screen md:flex-row md:items-center md:gap-12">
            {/* Left Image */}
            <div className="grid-overlay-left md:h-[43.93rem] md:w-[48vw] 2xl:w-[32vw]"></div>
            <div className="relative z-10 lg:block">
                <Image
                    src={mainImg}
                    alt="Goal Main Image"
                    className="w-full object-contain md:h-[500px] 2xl:h-[600px] 2xl:max-w-3xl"
                    width={700}
                    height={700}
                />
            </div>

            {/* Content */}
            <div className="flex max-w-2xl flex-col gap-4">
                <p className="font-monocode relative inline-block !bg-clip-text text-left text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                    {goalType}
                </p>
                <h1 className="font-heading text-2xl uppercase leading-tight md:text-5xl">
                    {title}&nbsp;
                    <span className="relative inline-block">
                        {highlightTitle}
                        <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                    </span>
                </h1>

                <p className="text-md relative flex w-[20rem] items-center text-left font-sans text-thistle md:w-[35rem] md:text-xl 2xl:w-[40rem]">
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
