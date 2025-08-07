"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import CircleImage from "@/components/CircleImage";
import { Link } from "@/i18n/navigation";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const sponsorsData = [
    {
        logo: "/sponsors/warp.webp",
        logoAlt: "Warp logo",
        testimonial:
            "The folks at SESA were professional, communicative, and friendly leading up to the talk, and provided some great photos and videos afterwards. I really enjoyed my collaboration with them.",
        highlights: ["professional, communicative,", "and friendly"],
        person: {
            name: "Jessica Wang",
            title: "Product Growth at Warp",
            image: "/imgs/people/warp/jessica-wang.webp",
        },
    },
    // Add more sponsor testimonials here
    // {
    //     logo: "/sponsors/example-company.webp",
    //     logoAlt: "Example Company logo",
    //     testimonial:
    //         "SESA exceeded our expectations with their innovative approach and dedication to excellence. The event was flawlessly executed.",
    //     highlights: ["exceeded our expectations", "innovative approach"],
    //     person: {
    //         name: "John Smith",
    //         title: "CTO at Example Company",
    //         image: "/imgs/people/example/john-smith.webp",
    //     },
    // },
];

const SponsorCard = () => {
    return (
        <div className="my-20 flex flex-col justify-start gap-12 px-4 md:my-36 md:px-0">
            <Carousel className="w-full max-w-7xl">
                <CarouselContent>
                    {sponsorsData.map((sponsor, index) => (
                        <CarouselItem key={`sponsor:${index}`}>
                            <div className="flex flex-col items-center justify-start gap-12 md:h-[45rem] md:flex-row md:items-center 2xl:gap-20">
                                {/* Background Overlay (desktop only) */}
                                <div className="grid-overlay-left hidden md:block md:h-[43.93rem] md:w-[53vw] 2xl:w-[45vw]"></div>

                                {/* Sponsor Image */}
                                <div className="relative z-10 flex-shrink-0">
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
                                        src={sponsor.logo}
                                        alt={sponsor.logoAlt}
                                        width={70}
                                        height={20}
                                        className="mb-4"
                                    />
                                    <div className="mt-3 font-heading text-xl uppercase text-white md:text-2xl">
                                        &ldquo;
                                        {sponsor.testimonial
                                            .split(new RegExp(`(${sponsor.highlights.join("|")})`))
                                            .map((part, i) =>
                                                sponsor.highlights.includes(part) ? (
                                                    <span key={i} className="highlight-text">
                                                        {part}
                                                    </span>
                                                ) : (
                                                    part
                                                ),
                                            )}
                                        &rdquo;
                                    </div>

                                    <div className="mt-4 flex items-center gap-3">
                                        <CircleImage
                                            size={50}
                                            src={sponsor.person.image}
                                            alt={sponsor.person.name}
                                        />
                                        <div>
                                            <p className="text-sm font-bold text-white md:text-base">
                                                {sponsor.person.name}
                                            </p>
                                            <p className="text-xs text-thistle md:text-sm">
                                                {sponsor.person.title}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <Button
                                            className="font-heading text-sm uppercase text-white md:text-base"
                                            asChild
                                        >
                                            <Link href="/ContactUsPage" className="block h-full">
                                                Work With Us
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-center gap-4">
                    <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
                    <CarouselNext className="relative right-0 top-0 translate-y-0" />
                </div>
            </Carousel>
        </div>
    );
};

export default SponsorCard;
