"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import CircleImage from "@/components/CircleImage";
import { Link } from "@/i18n/navigation";

const SponsorCard = () => {
    return (
        <div className="my-20 flex flex-col items-center justify-start gap-12 px-4 md:my-36 md:h-[45rem] md:flex-row md:items-center md:px-0">
            {/* Background Overlay (desktop only) */}
            <div className="grid-overlay-left hidden md:block md:h-[43.93rem] md:w-[53vw]"></div>

            {/* Sponsor Image */}
            <div className="relative z-10">
                <Image
                    src="/sponsors-page/sponsor-card-img.webp"
                    alt="SESA Group Photo"
                    className="h-[300px] w-auto md:h-[500px]"
                    width={700}
                    height={700}
                />
            </div>

            {/* Text Content */}
            <div className="z-10 max-w-lg text-left text-white">
                <Image
                    src="/sponsors/warp.webp"
                    alt="Warp logo"
                    width={70}
                    height={20}
                    className="mb-4"
                />
                <div className="mt-3 font-heading text-base uppercase text-white md:text-2xl">
                    &ldquo;The folks at SESA were{" "}
                    <span className="highlight-text">professional, communicative,</span>{" "}
                    <span className="highlight-text">and friendly</span> leading up to the talk, and
                    provided some great photos and videos afterwards. I really enjoyed my
                    collaboration with them.
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <CircleImage size={50} src="/sponsors-page/asad.webp" alt="Asad" />
                    <div>
                        <p className="text-sm font-bold text-white md:text-base">Jessica Wang</p>
                        <p className="text-xs text-thistle md:text-sm">Product Growth at Warp</p>
                    </div>
                </div>

                <div className="mt-6">
                    <Button className="font-heading text-sm uppercase text-white md:text-base" asChild>
                        <Link href="/ContactUsPage" className="block h-full w-full">
                            Work With Us
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center gap-2 md:ml-4 md:mt-0">
                <Button size="icon" variant="outline">
                    <Image
                        src="/resources-page/arrow_backword.svg"
                        width={25}
                        height={25}
                        alt="Left"
                    />
                </Button>
                <Button size="icon" variant="outline">
                    <Image
                        src="/resources-page/arrow_forward.svg"
                        width={25}
                        height={25}
                        alt="Right"
                    />
                </Button>
            </div>
        </div>
    );
};

export default SponsorCard;
