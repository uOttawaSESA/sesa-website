import { Button } from "@/components/ui/button";

interface HeaderProps {
    topText: string;
    title: string;
    bottomText: string;
    btn1: string;
    btn2: string;
}

const Header = ({ topText, title, bottomText, btn1, btn2 }: HeaderProps) => {
    return (
        <div className="mt-16 flex w-full justify-center px-4 md:mt-24 md:px-6">
            {/* Content Container */}
            <div className="relative z-10 max-w-2xl text-center">
                <p className="relative inline-block bg-clip-text! font-monocode text-sm text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,#8824dc,#b1219d)] md:text-base">
                    {topText}
                </p>

                <h1 className="mx-auto mt-4 max-w-[18ch] font-heading text-3xl text-white uppercase leading-snug md:text-5xl md:leading-tight">
                    <span className="relative inline-block">
                        <span className="highlight-text">huge thanks</span>
                        <span> {title.replace(/huge thanks/i, "")}</span>
                    </span>
                </h1>

                <p className="relative mx-auto mt-4 w-full max-w-[40rem] font-sans text-base text-thistle md:text-xl">
                    {bottomText}
                </p>

                <div className="mt-6 flex flex-col gap-3 font-heading text-white md:flex-row md:justify-center md:space-x-4">
                    <Button className="font-heading text-sm uppercase md:text-lg">{btn1}</Button>
                    <Button className="font-heading text-sm uppercase md:text-lg" variant="outline">
                        {btn2}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Header;
