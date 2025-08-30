"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TeamBadgeStack } from "@/components/TeamBadgeStack";
import { Link } from "@/i18n/navigation";

const PartnerWithUs = () => {
    const teamImgs = [
        "/imgs/team/dragos.webp",
        "/imgs/team/ayushi.webp",
        "/imgs/team/bilal.jpeg",
        "/imgs/team/whitney.webp",
    ];

    return (
        <div className="relative mb-12 flex flex-col items-start justify-start gap-10 px-4 py-16 text-white md:mb-32 md:h-[80vh] md:flex-row md:items-center md:justify-between md:gap-12 md:px-0 md:ps-32 2xl:ps-96">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                {/* Light gradient */}
                <div className="fade-from-left-bg absolute h-[70rem] w-[60vw] bg-blueviolet-100 opacity-15 blur-sm md:bottom-[-20rem] md:h-[100rem]" />

                <Image
                    src="/decoration/star-faded.svg"
                    className="absolute right-[4rem] top-[10rem] rotate-[30deg] transform md:left-[10rem] md:top-[-5rem]"
                    width={75}
                    height={75}
                    alt=""
                />
                <Image
                    src="/decoration/star.svg"
                    className="absolute left-[4rem] top-[-9rem] hidden rotate-[-110deg] transform md:block"
                    width={125}
                    height={128}
                    alt=""
                />
                <Image
                    src="/decoration/star-faded.svg"
                    className="absolute right-[4rem] top-[45rem] rotate-[30deg] md:left-[30rem] md:top-[30rem] 2xl:left-[40rem] 2xl:top-[40rem]"
                    width={75}
                    height={75}
                    alt=""
                />
            </div>

            {/* Grid Overlay Right (desktop only) */}
            <div className="grid-overlay-right hidden md:block md:h-[43.93rem] md:w-[50vw] 2xl:w-[45vw]"></div>

            {/* Content Container */}
            <div className="relative z-10 flex w-full flex-col-reverse items-start justify-between gap-8 md:flex-row md:gap-12">
                {/* Text Section */}
                <div className="max-w-xl text-left 2xl:max-w-2xl">
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
                            <Link href="/contact" className="block h-full text-inherit">
                                Become a Sponsor
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="w-fit min-w-[12rem] whitespace-nowrap font-heading text-sm text-white md:text-lg"
                            asChild
                        >
                            <Link href="/about" className="block h-full text-inherit">
                                Meet the Team
                            </Link>
                        </Button>
                    </div>

                    <div className="-ml-2 md:-ml-1">
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

export default PartnerWithUs;
