"use client";

import Image from "next/image";
import Button from "@/components/Button";
import CircleImage from "@/components/CircleImage";
import IconButton from "@/components/IconButton";

const SponsorCard = () => {
    return (
        <div className="my-36 flex h-[45rem] items-center justify-start gap-12 align-middle">
            <div className="grid-overlay-left md:h-[43.93rem] md:w-[53vw]"></div>

            <div className="relative z-10 lg:block">
                <Image
                    src="/sponsors-page/sponsor-card-img.webp"
                    alt="SESA Group Photo"
                    className="h-[500px] w-auto"
                    width={700}
                    height={700}
                />
            </div>

            <div className="z-10 max-w-lg text-left text-white">
                {/* Warp logo */}
                <Image
                    src="/sponsors/warp.webp"
                    alt="Warp logo"
                    width={70}
                    height={20}
                    className="mb-4"
                />
                <div className="mt-3 font-heading text-2xl uppercase text-white">
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
                    <CircleImage size={50} src="/sponsors-page/asad.webp" alt="Asad" />
                    <div>
                        <p className="text-m font-bold text-white">Jessica Wang</p>
                        <p className="text-sm text-thistle">Product Growth at Warp</p>
                    </div>
                </div>
                <div className="mt-6">
                    <Button
                        href="/pages/ContactUsPage"
                        className="text-m font-heading uppercase text-white"
                    >
                        Work With Us
                    </Button>
                </div>
            </div>
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
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
