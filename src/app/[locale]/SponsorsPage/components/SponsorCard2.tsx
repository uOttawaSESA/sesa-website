"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { TeamBadgeStack } from "@/components/TeamBadgeStack";

const SponsorCard2 = () => {
    const teamImgs = [
        "/imgs/team/taha.jpg",
        "/imgs/team/rayen.jpg",
        "/imgs/team/anthony.jpg",
        "/imgs/team/priya.jpg",
    ];

    return (
        <div className="relative flex flex-col items-start justify-start gap-10 px-4 py-16 text-white md:h-[80vh] md:flex-row md:items-center md:justify-between md:gap-12 md:ps-32 2xl:ps-96">
            {/* Grid Overlay Right (desktop only) */}
            <div className="grid-overlay-right hidden md:block md:h-[43.93rem] md:w-[50vw]"></div>

            {/* Content Container */}
            <div className="relative z-10 flex w-full flex-col-reverse items-start justify-between gap-10 md:flex-row md:gap-12">
                {/* Text Section */}
                <div className="max-w-xl text-left">
                    <p className="font-monocode relative inline-block !bg-clip-text text-sm text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)] md:text-base">
                        Partner with us
                    </p>
                    <h2 className="mt-4 font-heading text-2xl uppercase leading-tight text-white md:text-3xl">
                        Let’s collaborate to make a{" "}
                        <span className="relative inline-block">
                            lasting difference{" "}
                            <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                        </span>{" "}
                        on aspiring software engineers
                    </h2>
                    <p className="mb-4 mt-2 text-sm leading-tight text-thistle md:text-lg">
                        Together, we can drive a meaningful impact on over 3500+ EECS students at
                        uOttawa by bridging the gap between academic education and industry
                        experience.
                    </p>

                    <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <Button
                            href="/pages/ContactUsPage"
                            className="w-fit min-w-[12rem] whitespace-nowrap font-heading text-sm uppercase text-white md:text-base"
                        >
                            Become a Sponsor
                        </Button>
                        <Button
                            href="/pages/AboutPage"
                            variant="outline"
                            className="w-fit min-w-[12rem] whitespace-nowrap font-heading text-sm text-white md:text-base"
                        >
                            Meet the Team
                        </Button>
                    </div>

                    <div className="relative left-0 md:left-3">
                        <TeamBadgeStack imgs={teamImgs} />
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative z-10 flex w-full justify-center md:justify-end">
                    <Image
                        src="/sponsors-page/sponsor-card-img-2.png"
                        alt="SESA Team"
                        className="h-[300px] w-auto object-cover md:h-[500px]"
                        width={700}
                        height={700}
                    />
                </div>
            </div>
        </div>
    );
};

export default SponsorCard2;
