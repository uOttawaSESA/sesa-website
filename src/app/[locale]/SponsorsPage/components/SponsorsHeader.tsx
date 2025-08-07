import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface SponsorsHeaderProps {
    topText: string;
    title: string;
    bottomText: string;
    btn1: string;
    btn2: string;
}

const SponsorsHeader = ({ topText, title, bottomText, btn1, btn2 }: SponsorsHeaderProps) => {
    return (
        <div className="mt-16 flex w-full justify-center px-4 md:mt-24 md:px-6">
            {/* Content Container */}
            <div className="relative z-10 text-center">
                <p className="relative inline-block !bg-clip-text font-mono text-sm text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)] md:text-base">
                    {topText}
                </p>

                <h1 className="mx-auto mt-4 max-w-[18ch] font-heading text-3xl uppercase leading-snug text-white md:text-5xl md:leading-tight">
                    <span className="relative inline-block">
                        <span className="highlight-text">huge thanks</span>
                        <span> {title.replace(/huge thanks/i, "")}</span>
                    </span>
                </h1>

                <p className="relative mx-auto mt-4 w-full max-w-[40rem] font-sans text-sm text-thistle md:text-xl">
                    {bottomText}
                </p>

                <div className="mt-6 flex flex-col items-center gap-3 text-center font-heading text-white md:flex-row md:justify-center md:gap-4 md:text-left">
                    <Button
                        className="w-fit min-w-[12rem] justify-center text-center text-sm uppercase md:text-lg"
                        asChild
                    >
                        <Link href="/ContactUsPage">{btn1}</Link>
                    </Button>
                    <Button
                        className="w-fit min-w-[12rem] justify-center text-center text-sm uppercase md:text-lg"
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
