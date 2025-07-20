import Button from "@/components/Button";
import SponsorsGrid from "../../SponsorsPage/components/SponsorsGrid";
import { Link } from "@/i18n/navigation";

const Sponsors = () => {
    return (
        <section>
            <div className="text-center">
                <div className="flex w-full justify-center px-6">
                    {/* Content Container */}
                    <div className="relative z-10 text-center">
                        <p className="relative inline-block !bg-clip-text font-mono text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                            Our sponsors & partners
                        </p>
                        <h1 className="font-heading mx-auto mt-4 max-w-[30ch] text-2xl leading-tight text-white uppercase md:text-5xl">
                            <span className="relative inline-block">
                                <span className="relative inline-block">
                                    Trusted and sponsored
                                    <div className="animate-highlight absolute top-0 right-0 h-full w-0 [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                                </span>{" "}
                                by the best in the game
                            </span>
                            <br />
                        </h1>

                        <p className="text-thistle relative mx-auto mt-4 w-full max-w-[40rem] font-sans text-base md:text-lg">
                            We’re incredibly grateful to our partners who believe in our mission to
                            connect students with industry professionals.
                        </p>
                        <div className="font-heading mt-6 flex justify-center space-x-4 text-white">
                            <Button className="font-heading text-sm uppercase md:text-lg">
                                Become a sponsor
                            </Button>
                            <Link href="/AboutPage">
                                <Button
                                    className="font-heading text-sm uppercase md:text-lg"
                                    variant="outline"
                                >
                                    Meet the team
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <SponsorsGrid />
            </div>
        </section>
    );
};

export default Sponsors;
