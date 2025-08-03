"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Benefits() {
    const cards = [
        {
            image: "/sponsors-page/benefits-1.webp",
            icon: "/sponsors-page/network.webp",
            title: "NETWORK WITH TOP TALENT",
            description:
                "Connect and recruit highly skilled job-ready students pursuing the field of software engineering at uOttawa.",
        },
        {
            image: "/sponsors-page/benefits-2.webp",
            icon: "/sponsors-page/impact.webp",
            title: "MAKE A REAL-WORLD IMPACT",
            description:
                "Give back to your community and make a meaningful difference in software engineering education at the University of Ottawa.",
        },
        {
            image: "/sponsors-page/benefits-3.webp",
            icon: "/sponsors-page/brand.webp",
            title: "PROMOTE YOUR BRAND",
            description:
                "Increase your brand visibility, survey your target audience, or offer exclusive discounts to students attending uOttawa.",
        },
        {
            image: "/sponsors-page/benefits-4.webp",
            icon: "/sponsors-page/connect.svg",
            title: "ACCESS EXCLUSIVE EVENTS",
            description:
                "Participate in workshops, mentorship programs, and networking events tailored for sponsors and students alike.",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        updateIsMobile(); // Initial check
        window.addEventListener("resize", updateIsMobile);

        return () => {
            window.removeEventListener("resize", updateIsMobile);
        };
    }, []);

    const cardWidthVW = isMobile ? 60 : 28;

    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? cards.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev === cards.length - 1 ? 0 : prev + 1));
    };

    return (
        <div
            id="benefits"
            className="relative flex min-h-screen flex-col justify-center space-y-5 py-10 md:py-20"
        >
            {/* Header + Arrows */}
            <div className="flex flex-col space-y-6 px-6 md:flex-row md:items-start md:justify-between md:space-y-0 md:px-40">
                <div className="md:w-1/2">
                    <p className="color-gradient relative font-mono text-sm md:text-base">
                        Benefits
                    </p>
                    <h2 className="mb-4 font-heading text-2xl uppercase text-white md:text-3xl">
                        <span className="block md:inline">CONNECT WITH</span>{" "}
                        <span className="relative inline-block">
                            THE NEXT GENERATION
                            <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                        </span>{" "}
                        <span className="block md:inline">OF SOFTWARE ENGINEERS</span>
                    </h2>

                    <p className="mb-4 max-w-full text-sm leading-tight text-thistle md:max-w-2xl md:text-base">
                        Without our sponsors and partners, we would not be able to fund our events
                        and projects that provide SEG students with academic opportunities and
                        workplace experiences.
                    </p>
                </div>

                {/* Arrows */}
                <div className="flex translate-y-3 gap-2 self-start md:translate-y-4">
                    <Button size="icon" variant="outline" onClick={handlePrev}>
                        <Image
                            src="/resources-page/arrow_backword.svg"
                            width={25}
                            height={25}
                            alt="Left"
                        />
                    </Button>
                    <Button size="icon" variant="outline" onClick={handleNext}>
                        <Image
                            src="/resources-page/arrow_forward.svg"
                            width={25}
                            height={25}
                            alt="Right"
                        />
                    </Button>
                </div>
            </div>

            {/* Carousel */}
            <div className="relative mt-10 overflow-visible">
                <div
                    className="flex gap-6 pl-6 pr-6 transition-transform duration-500 ease-in-out md:gap-8 md:pl-40 md:pr-40"
                    style={{
                        transform: `translateX(-${currentIndex * cardWidthVW}vw)`,
                    }}
                >
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0"
                            style={{
                                width: `${cardWidthVW}vw`,
                            }}
                        >
                            <div className="flex h-full flex-col overflow-hidden border-[1px] border-solid text-left text-white backdrop-blur-super [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    width={500}
                                    height={300}
                                    className="h-40 w-full object-cover md:h-48"
                                />
                                <div className="flex grow flex-col justify-between p-4">
                                    <div>
                                        <div className="my-3 inline-block border-[1px] border-solid [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]">
                                            <Image
                                                src={card.icon}
                                                alt={`${card.title} icon`}
                                                width={24}
                                                height={24}
                                                className="m-3"
                                            />
                                        </div>
                                        <div className="mb-2 font-heading text-base uppercase leading-snug text-white md:text-lg">
                                            {card.title}
                                        </div>
                                        <p className="font-sans text-sm leading-snug text-thistle md:text-lg">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
