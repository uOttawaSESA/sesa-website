"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import CircleImage from "@/components/CircleImage";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";

const sponsorsData = [
    {
        logo: "/sponsors/warp.svg",
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
    {
        logo: "/sponsors/bitesite.webp",
        logoAlt: "BiteSite logo",
        testimonial:
            "SESA has always been an amazing organization. I've always been impressed with their work and what they provide to students. In fact, my first two hires at BiteSite were SESA members. Their continued efforts to help out not only students, but the software community in general is admirable and I hope their work grows for years to come.",
        highlights: ["first two hires at BiteSite were SESA members."],
        person: {
            name: "Casey Li",
            title: "CEO at BiteSite",
            image: "/imgs/people/bitesite/casey-li.webp",
        },
    },
    {
        logo: "/sponsors/uottawa.svg",
        logoAlt: "uOttawa logo",
        testimonial:
            "SESA is an essential contributor to the software engineering program, providing new students with the opportunity to integrate smoothly into their studies while fostering a sense of belonging within the program, school, faculty, and university. By promoting socialization among its members and organizing enriching activities such as conferences and hackathons, SESA not only builds community but also supports the personal and professional growth of students, helping them flourish both academically and socially.",
        highlights: ["essential contributor", "integrate smoothly", "enriching activities"],
        person: {
            name: "Stéphane Sotèg Somé",
            title: "Associate Professor & SEG Co-op Coordinator at uOttawa",
            image: "/imgs/people/uottawa/stephane-some.webp",
        },
    },
    {
        logo: "/sponsors/nationalbank.svg",
        logoAlt: "NBC logo",
        testimonial:
            "Working with SESA has been an absolute pleasure. Their proactive approach, clear communication, and genuine commitment to collaboration make them an exceptional partner. From the very beginning, they’ve demonstrated a strong sense of initiative and responsiveness, which has made our interactions smooth and productive. We’re truly excited about the opportunities this partnership brings and look forward to participating to their events this year.",
        highlights: [
            "exceptional partner",
            "strong sense of initiative",
            "responsiveness",
            "productive",
        ],
        person: {
            name: "Anabelle Latour",
            title: "Coordinator – University Recruitment at National Bank",
            image: "/imgs/people/nbc/anabelle-latour.webp",
        },
    },
    // ...other testimonials...
];

const TestimonialsCarousel = () => {
    const t = useTranslations("sponsorships");

    return (
        <div className="my-20 flex flex-col justify-start gap-12 px-4 md:my-36 md:px-0 2xl:mb-48">
            <div className="flex flex-col items-center justify-start gap-12 md:h-[45rem] md:flex-row md:items-center 2xl:gap-20">
                {/* Background Overlay (desktop only) */}
                <div className="grid-overlay-left hidden md:block md:h-[43.93rem] md:w-[53vw] 2xl:w-[36vw]"></div>

                {/* Sponsor Image - STATIC */}
                <div className="relative z-10 shrink-0">
                    <Image
                        src="/imgs/Home/heroImage.webp"
                        alt="Warp Event Photo"
                        className="h-[300px] w-auto md:h-[500px]"
                        width={1200}
                        height={1200}
                    />
                </div>

                {/* Carousel - Only Text Content Moves */}
                <Carousel className="w-full 2xl:max-w-2xl z-10 md:max-w-xl">
                    <CarouselContent>
                        {sponsorsData.map((sponsor, index) => (
                            <CarouselItem key={`sponsor:${index}`}>
                                <div className="flex h-full flex-col justify-center text-left text-white">
                                    <Image
                                        src={sponsor.logo}
                                        alt={sponsor.logoAlt}
                                        width={160}
                                        height={40}
                                        className={
                                            sponsor.logo.includes("uottawa") ? "-mb-6" : "mb-2"
                                        }
                                    />
                                    <div className="mt-2 font-heading text-xl uppercase text-white md:text-2xl">
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
                                            <Link href="/contact" className="block h-full">
                                                {t("testimonials_work_with_us_btn")}
                                            </Link>
                                        </Button>
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
        </div>
    );
};

export default TestimonialsCarousel;
