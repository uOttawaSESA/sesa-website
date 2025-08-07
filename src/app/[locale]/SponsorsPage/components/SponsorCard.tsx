"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import CircleImage from "@/components/CircleImage";
import { Link } from "@/i18n/navigation";

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
                    <span className="highlight-text">professional, communicative,</span>{" "}
                    <span className="highlight-text">and friendly</span> leading up to the talk, and
                    provided some great photos and videos afterwards. I really enjoyed my
                    collaboration with them.
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <CircleImage size={50} src="/sponsors-page/asad.webp" alt="Asad" />
                    <div>
                        <p className="text-m font-bold text-white">Jessica Wang</p>
                        <p className="text-sm text-thistle">Product Growth at Warp</p>
                    </div>
                </div>
                <div className="mt-6">
                    <Button className="text-m font-heading uppercase text-white" asChild>
                        <Link href="/ContactUsPage">Work With Us</Link>
                    </Button>
                </div>
            </div>
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
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
