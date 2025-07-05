"use client";

import Image from "next/image";
import Button from "@/components/Button";
import CircleImage from "@/components/CircleImage";
import IconButton from "@/components/IconButton";

const SponsorCard = () => {
    return (
        <div className="my-20 flex flex-col items-center justify-start gap-12 px-4 md:my-36 md:h-[45rem] md:flex-row md:items-center md:px-0">
            {/* Background Overlay (desktop only) */}
            <div className="grid-overlay-left hidden md:block md:h-[43.93rem] md:w-[53vw]"></div>

            {/* Sponsor Image */}
            <div className="relative z-10">
                <Image
                    src="/sponsors-page/sponsor-card-img.png"
                    alt="SESA Group Photo"
                    className="h-[300px] w-auto md:h-[500px]"
                    width={700}
                    height={700}
                />
            </div>

            {/* Text Content */}
            <div className="z-10 max-w-lg text-left text-white">
                <Image
                    src="/sponsors/warp.png"
                    alt="Warp logo"
                    width={70}
                    height={20}
                    className="mb-4"
                />
                <div className="mt-3 font-heading text-base uppercase text-white md:text-2xl">
                    &ldquo;The folks at SESA were{" "}
                    <span className="relative inline-block">
                        professional, communicative,
                        <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                    </span>{" "}
                    <span className="relative inline-block">
                        and friendly
                        <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                    </span>{" "}
                    leading up to the talk, and provided some great photos and videos afterwards. I
                    really enjoyed my collaboration with them.
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <CircleImage size={50} src="/sponsors-page/asad.png" alt="Asad" />
                    <div>
                        <p className="text-sm font-bold text-white md:text-base">Jessica Wang</p>
                        <p className="text-xs text-thistle md:text-sm">Product Growth at Warp</p>
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        href="/pages/ContactUsPage"
                        className="font-heading text-sm uppercase text-white md:text-base"
                    >
                        Work With Us
                    </Button>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center gap-2 md:ml-4 md:mt-0">
                <IconButton variant="outline">
                    <Image
                        src="/resources-page/arrow_backword.svg"
                        width={25}
                        height={25}
                        alt="Left"
                    />
                </IconButton>
                <IconButton variant="outline">
                    <Image
                        src="/resources-page/arrow_forward.svg"
                        width={25}
                        height={25}
                        alt="Right"
                    />
                </IconButton>
            </div>
        </div>
    );
};

export default SponsorCard;
