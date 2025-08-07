"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TeamBadgeStack } from "@/components/TeamBadgeStack";
import { Link } from "@/i18n/navigation";

const SponsorCard2 = () => {
    const teamImgs = [
        "/imgs/team/taha.jpg",
        "/imgs/team/rayen.webp",
        "/imgs/team/anthony.webp",
        "/imgs/team/priya.webp",
    ];

    return (
        <div className="relative flex flex-col items-start justify-start gap-10 px-4 py-16 text-white md:h-[80vh] md:flex-row md:items-center md:justify-between md:gap-12 md:px-0 md:ps-32 2xl:ps-96">
            {/* Grid Overlay Right (desktop only) */}
            <div className="grid-overlay-right hidden md:block md:h-[43.93rem] md:w-[50vw] 2xl:w-[50vw]"></div>

            {/* Content Container */}
            <div className="relative z-10 flex w-full flex-col-reverse items-start justify-between gap-8 md:flex-row md:gap-12">
                {/* Text Section */}
                <div className="max-w-xl text-left">
                    <p className="font-monocode relative inline-block !bg-clip-text text-xs text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)] md:text-base">
                        Partner with us
                    </p>
                    <h2 className="mb-4 mt-2 font-heading text-2xl uppercase leading-tight text-white md:mt-4 md:text-3xl">
                        Let’s collaborate to make a{" "}
                        <span className="highlight-text">lasting difference </span> on aspiring
                        software engineers
                    </h2>
                    <p className="mb-4 mt-2 text-base leading-tight text-thistle md:text-lg">
                        Together, we can drive a meaningful impact on over 3500+ EECS students at
                        uOttawa by bridging the gap between academic education and industry
                        experience.
                    </p>

                    <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <Button
                            className="w-fit min-w-[12rem] whitespace-nowrap font-heading text-sm uppercase text-white md:text-lg"
                            asChild
                        >
                            <Link href="/ContactUsPage" className="block h-full text-inherit">
                                Become a Sponsor
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="w-fit min-w-[12rem] whitespace-nowrap font-heading text-sm text-white md:text-lg"
                            asChild
                        >
                            <Link href="/AboutPage" className="block h-full text-inherit">
                                Meet the Team
                            </Link>
                        </Button>
                    </div>

                    <div className="relative left-0 md:left-3">
                        <TeamBadgeStack imgs={teamImgs} />
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative z-10 flex w-full justify-center md:justify-end">
                    <Image
                        src="/sponsors-page/sponsor-card-img-2.webp"
                        alt="SESA Team"
                        className="h-[300px] w-auto object-cover md:h-[500px] 2xl:h-max"
                        width={700}
                        height={700}
                    />
                </div>
            </div>
        </div>
    );
};

export default SponsorCard2;
