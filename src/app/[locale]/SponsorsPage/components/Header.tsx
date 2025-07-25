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
        <div className="mt-24 flex w-full justify-center px-6">
            {/* Content Container */}
            <div className="relative z-10 max-w-2xl text-center">
                <p className="font-monocode relative inline-block !bg-clip-text text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                    {topText}
                </p>
                <h1 className="mx-auto mt-4 max-w-[18ch] font-heading text-5xl uppercase leading-tight text-white">
                    <span className="relative inline-block">
                        <span className="highlight-text">huge thanks</span>
                        <span> {title.replace(/huge thanks/i, "")}</span>
                    </span>
                    <br />
                </h1>

                <p className="relative mx-auto mt-4 w-full max-w-[40rem] font-sans text-xl text-thistle">
                    {bottomText}
                </p>
                <div className="mt-6 flex justify-center space-x-4 font-heading text-white">
                    <Button>{btn1}</Button>
                    <Button variant="outline">{btn2}</Button>
                </div>
            </div>
        </div>
    );
};

export default Header;
