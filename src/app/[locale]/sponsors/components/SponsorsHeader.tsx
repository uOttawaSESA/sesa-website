import Image from "next/image";
import { Button } from "@/components/ui/button";
import Star from "@/components/ui/decorations/star";
import { Link } from "@/i18n/navigation";

interface SponsorsHeaderProps {
    topText: string;
    titleHighlighted: string;
    title: string;
    bottomText: string;
    btn1: string;
    btn2: string;
}

const SponsorsHeader = ({
    topText,
    titleHighlighted,
    title,
    bottomText,
    btn1,
    btn2,
}: SponsorsHeaderProps) => {
    return (
        <div className="relative mt-16 flex w-full justify-center px-4 md:mt-24 md:px-6">
            {/* Decorations */}
            <div className="pointer-events-none select-none">
                {/* Warm gradient */}
                <div className="fade-from-center-bg absolute right-0 top-0 h-[120rem] w-full bg-[#B1219D] bg-opacity-15 blur-3xl md:w-[80vw]" />

                <Star
                    variant="star-faded"
                    className="absolute right-[20rem] top-[-2rem] md:right-[13rem] md:top-[21rem]"
                    rotate={30}
                    width={55}
                    height={55}
                    delay={0.5}
                    showMobile={true}
                />

                <Star
                    variant="star"
                    className="absolute right-[8rem] top-[22rem] hidden md:block"
                    width={125}
                    height={128}
                    delay={1}
                />

                <Star
                    variant="star"
                    className="absolute left-[15rem] top-0 hidden md:block"
                    rotate={-110}
                    width={125}
                    height={128}
                    delay={1}
                />

                <Image
                    src="/decoration/sponsorships-floor-grid.svg"
                    className="fade-from-center-sponsorship-floor absolute left-1/2 z-0 hidden -translate-x-1/2 transform opacity-60 md:bottom-[-10rem] md:block"
                    width={1200}
                    height={1000}
                    alt=""
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center">
                <p className="relative inline-block !bg-clip-text font-mono text-xs text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)] md:text-base">
                    {topText}
                </p>

                <h1 className="mx-auto mt-4 max-w-[18ch] font-heading text-3xl uppercase leading-snug text-white md:text-4xl md:leading-tight">
                    <span className="relative inline-block">
                        <span className="highlight-text">{titleHighlighted}</span>
                    </span>
                    <span> {title}</span>
                </h1>

                <p className="relative mx-auto mt-4 w-full max-w-lg font-sans text-base text-thistle md:text-lg">
                    {bottomText}
                </p>

                <div className="mt-6 flex flex-col items-center gap-3 text-center font-heading text-white md:flex-row md:justify-center md:gap-4 md:text-left">
                    <Button
                        className="w-fit min-w-[12rem] justify-center text-center uppercase"
                        asChild
                    >
                        <Link href="/contact">{btn1}</Link>
                    </Button>
                    <Button
                        className="w-fit min-w-[12rem] justify-center text-center uppercase"
                        variant="outline"
                        asChild
                    >
                        <Link href="#benefits">{btn2}</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SponsorsHeader;
