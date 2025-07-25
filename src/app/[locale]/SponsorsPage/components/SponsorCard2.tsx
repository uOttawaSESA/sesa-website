"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TeamBadgeStack } from "@/components/TeamBadgeStack";
import { Link } from "@/i18n/navigation";

const SponsorCard2 = () => {
    const teamImgs = [
        "/imgs/team/taha.jpg",
        "/imgs/team/rayen.jpg",
        "/imgs/team/anthony.jpg",
        "/imgs/team/priya.jpg",
    ];

    return (
        <div className="relative flex h-[80vh] w-full items-center justify-between text-white md:ps-32 2xl:ps-96">
            {/* Grid Gradient Right Overlay */}
            <div className="grid-overlay-right md:h-[43.93rem] md:w-[50vw]"></div>

            {/* Content Container */}
            <div className="relative z-10 flex w-full items-center justify-between gap-12">
                {/* Text Content */}
                <div className="max-w-xl text-left text-white">
                    <p className="font-monocode relative inline-block !bg-clip-text text-left text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                        Partner with us
                    </p>
                    <h2 className="mt-4 font-heading text-3xl uppercase leading-tight text-white">
                        Let’s collaborate to make a{" "}
                        <span className="highlight-text">lasting difference </span> on aspiring
                        software engineers
                    </h2>
                    <p className="mb-4 mt-2 max-w-2xl text-lg leading-tight text-thistle">
                        Together, we can drive a meaningful impact on over 3500+ EECS students at
                        uOttawa by bridging the gap between academic education and industry
                        experience.
                    </p>

                    <div className="mb-6 flex items-center gap-4">
                        <Button className="font-heading uppercase text-white" asChild>
                            <Link href="/pages/ContactUsPage">Become a Sponsor</Link>
                        </Button>
                        <Button variant="outline" className="font-heading text-white">
                            <Link href="/pages/AboutPage">Meet the Team</Link>
                        </Button>
                    </div>

                    <div className="relative left-3">
                        <TeamBadgeStack imgs={teamImgs} />
                    </div>
                </div>

                {/* Right Image */}
                <div className="r relative z-10 hidden lg:block">
                    <Image
                        src="/sponsors-page/sponsor-card-img-2.webp"
                        alt="SESA Team"
                        className="h-[500px] w-auto object-cover"
                        width={700}
                        height={700}
                    />
                </div>
            </div>
        </div>
    );
};

export default SponsorCard2;
