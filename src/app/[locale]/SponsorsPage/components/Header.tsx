import Button from "@/components/Button";

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
                <h1 className="font-heading mx-auto mt-4 max-w-[18ch] text-5xl leading-tight text-white uppercase">
                    <span className="relative inline-block">
                        <span className="relative inline-block">
                            huge thanks
                            <div className="animate-highlight absolute top-0 right-0 h-full w-0 [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                        </span>
                        <span> {title.replace(/huge thanks/i, "")}</span>
                    </span>
                    <br />
                </h1>

                <p className="text-thistle relative mx-auto mt-4 w-full max-w-[40rem] font-sans text-xl">
                    {bottomText}
                </p>
                <div className="font-heading mt-6 flex justify-center space-x-4 text-white">
                    <Button className="font-heading text-lg uppercase">{btn1}</Button>
                    <Button className="font-heading text-lg uppercase" variant="outline">
                        {btn2}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Header;
