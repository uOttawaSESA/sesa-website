"use client";

import Image from "next/image";
import Button from "@/components/Button";
import CircleImage from "@/components/CircleImage";

const SponsorCard2 = () => {
    return (
        <div className="relative my-36 flex w-full justify-center px-8">
            {/* Grid Background Behind Image */}
            <div className="grid-overlay-right absolute right-0 top-0 z-0 h-full w-1/2" />

            {/* Content Wrapper */}
            <div className="z-10 flex w-full max-w-[1200px] items-center justify-between gap-12">
                {/* Text Content (Left Side) */}
                <div className="max-w-md text-left text-white">
                    <p className="color-gradient relative font-mono text-base">Partner with us</p>
                    <h2 className="mb-4 font-heading text-2xl uppercase leading-tight text-white">
                        Let’s collaborate to make a lasting difference on aspiring software
                        engineers
                    </h2>
                    <p className="mb-4 max-w-2xl text-base leading-tight text-thistle">
                        Together, we can drive a meaningful impact on over 3500+ EECS students at
                        uOttawa by bridging the gap between academic education and industry
                        experience.
                    </p>

                    <div className="mb-6 flex items-center gap-4">
                        <Button
                            href="/pages/ContactUsPage"
                            className="text-m font-heading uppercase text-white"
                        >
                            Become a Sponsor
                        </Button>
                        <Button
                            href="/pages/TeamPage"
                            variant="outline"
                            className="text-sm text-white"
                        >
                            Meet the Team
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <CircleImage size={40} src="/sponsors-page/asad.png" alt="Asad" />
                        <CircleImage size={40} src="/sponsors-page/asad.png" alt="Asad" />
                        <CircleImage size={40} src="/sponsors-page/asad.png" alt="Asad" />
                    </div>
                </div>

                {/* Image on the far right (Right Side) */}
                <div className="relative ml-auto flex-shrink-0">
                    <Image
                        src="/sponsors-page/sponsor-card-img-2.png"
                        alt="SESA Team"
                        className="relative z-10 h-[500px] w-auto"
                        width={700}
                        height={700}
                    />
                </div>
            </div>
        </div>
    );
};

export default SponsorCard2;
