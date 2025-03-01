import React from "react";
import Button from "@/components/Button";
import Image from "next/image";

const FooterSection: React.FC = () => {
    return (
        <>
            {/* CTA Section */}
            <div className="mt-16 flex items-center justify-center gap-6">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-l mb-8 font-heading uppercase">
                        Interested in Contributing or Requesting Resources?
                    </h2>
                </div>
                <div className="flex -translate-y-4 transform items-center justify-center">
                    <Button href="#" className="font-heading text-xl uppercase">
                        Join Our Discord
                    </Button>
                </div>
            </div>

            {/* Ange quote section */}
            <div className="my-36 flex h-[45rem] items-center justify-start gap-12 align-middle">
                {/* Grid Gradient Back */}
                <div className="grid-overlay-left md:h-[43.93rem] md:w-[53vw]"></div>

                <div className="relative z-10 lg:block">
                    <Image
                        src="/resources-page/ange-quote.png"
                        alt="SESA Group Photo"
                        className="h-[500px] w-auto object-contain"
                        width={703}
                        height={700}
                    />
                </div>

                <div className="z-10 max-w-lg text-left text-white">
                    <div className="font-heading text-2xl">
                        “TRUE EDUCATION IS BORN WHERE{" "}
                        <span className="relative inline-block">
                            KNOWLEDGE MEETS ACCESSIBILITY
                            <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                        </span>{" "}
                        SESA’S ACADEMIC TEAM IS PROUD TO STAND AT THAT INTERSECTION.”
                    </div>
                    <div className="my-3 flex items-center gap-4">
                        <Image
                            src="/imgs/team/ange.png"
                            alt="Ange Emmanuel"
                            className="z-10 h-14 w-14 rounded-full object-cover"
                            width={50}
                            height={50}
                        />
                        <div>
                            <p className="z-20 mt-4 font-heading text-xl">ANGE EMMANUEL</p>
                            <p className="text-sm opacity-70">Academic Lead</p>
                        </div>
                    </div>
                    {/* Call To Action Button */}
                    <div className="mt-6">
                        <Button
                            href="/pages/TeamPage"
                            className="relative z-10 font-heading text-lg uppercase"
                        >
                            Join Our Team
                        </Button>
                        <div className="mt-6 flex items-center gap-2">
                            <Image
                                src="/resources-page/thumbsup.svg"
                                alt="Thumbs Up"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            <div className="font-[Monocode] leading-[100%] text-thistle">
                                95% average helpfulness, 1000+ students helped
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FooterSection;
