import Button from "@/components/Button";
import Goal from "./types/Goal";
import CircleImage from "@/components/CircleImage";
import Image from "next/image";
import { TeamBadgeStack } from "@/app/pages/EventsPage/components/TeamBadgeStack";

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
        <div className="my-36 flex h-[45rem] items-center justify-start gap-12 align-middle">
            {/* Left Image */}
            <div className="grid-overlay-left md:h-[43.93rem] md:w-[48vw]"></div>
            <div className="relative z-10 lg:block">
                <Image
                    src={mainImg}
                    alt="Goal Main Image"
                    className="h-[500px] w-auto object-contain"
                    width={703}
                    height={700}
                />
            </div>

            {/* Content */}
            <div className="max-w-2xl">
                <p className="font-monocode relative inline-block !bg-clip-text text-left text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                    {goalType}
                </p>
                <h1 className="my-2 font-heading text-4xl leading-tight">
                    {title}{" "}
                    <span className="relative inline-block">
                        {highlightTitle}
                        <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                    </span>
                </h1>
                <p className="relative flex w-[40rem] items-center text-left font-sans text-xl text-thistle">
                    {description}
                </p>

                <div className="mt-6 flex">
                    <Button
                        href={buttonLink}
                        className="relative z-10 font-heading text-lg uppercase"
                    >
                        {buttonText}
                    </Button>
                </div>
                <TeamBadgeStack imgs={memberImgLinks} />
            </div>
        </div>
    );
};
