import Image from "next/image";
import Button from "@/components/Button";

export default function Hero() {
    return (
        <section className="relative flex h-[80vh] w-full items-center justify-between text-white md:pe-0 md:ps-32 2xl:pe-0 2xl:ps-96">
            {/* Grid Gradient Back */}
            <div className="grid-overlay-right md:h-[43.93rem] md:w-[53vw]"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-2xl">
                <p className="font-monocode relative inline-block !bg-clip-text text-left text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                    We are SESA
                </p>
                <h1 className="mt-4 font-heading text-5xl leading-tight">
                    <span className="relative inline-block">
                        BRIDGING THE GAP
                        <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                    </span>{" "}
                    <br />
                    BETWEEN STUDENTS <br />
                    AND INDUSTRY PROFESSIONALS
                </h1>
                <p className="relative flex w-[40rem] items-center text-left font-sans text-xl text-thistle">
                    SESA connects University of Ottawa students with industry professionals in
                    software engineering, providing resources, networking, and career development to
                    ensure they can be successful.
                </p>
                <div className="mt-6 flex space-x-4 font-heading">
                    <Button className="font-heading text-lg uppercase">Learn More</Button>
                    <Button className="font-heading text-lg uppercase" variant="outline">
                        Get Involved
                    </Button>
                </div>
            </div>

            {/* Right Side Image */}
            <div className="relative z-10 hidden lg:block">
                <Image
                    src="/imgs/Home/heroImage.png"
                    alt="SESA Group Photo"
                    className="h-[500px] w-[auto] object-cover"
                    width={703}
                    height={700}
                />
            </div>
        </section>
    );
}
