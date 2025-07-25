"use client";

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
    ];

    return (
        <div className="relative flex min-h-screen flex-col justify-center space-y-5 px-40 py-20">
            {/* Header + Arrows Container */}
            <div className="flex items-start justify-between">
                <div className="w-1/2">
                    <p className="color-gradient relative font-mono text-base">Benefits</p>
                    <h2 className="mb-4 font-heading text-3xl uppercase text-white">
                        <span className="block md:inline">CONNECT WITH </span>
                        <span className="highlight-text md:inline">THE NEXT</span>{" "}
                        <span className="highlight-text md:inline">GENERATION</span>
                        <span className="block md:inline"> OF SOFTWARE ENGINEERS</span>
                    </h2>

                    <p className="mb-4 max-w-2xl text-base leading-tight text-thistle">
                        Without our sponsors and partners, we would not be able to fund our events
                        and projects that provide SEG students with academic opportunities and
                        workplace experiences.
                    </p>
                </div>

                {/* Arrows in top right */}
                <div className="flex gap-2 pt-6">
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

            {/* Cards */}
            <div className="mt-10 grid h-[450px] grid-cols-1 gap-8 md:grid-cols-3">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="overflow-hidden border-[1px] border-solid text-left text-white backdrop-blur-super [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]"
                    >
                        <Image
                            src={card.image}
                            alt={card.title}
                            width={500}
                            height={300}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <div className="my-3 inline-block border-[1px] border-solid [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]">
                                <Image
                                    src={card.icon}
                                    alt={`${card.title} icon`}
                                    width={24}
                                    height={24}
                                    className="m-3"
                                />
                            </div>
                            <div className="mb-2 font-heading text-lg uppercase leading-snug text-white">
                                {card.title}
                            </div>
                            <p className="font-sans text-lg leading-snug text-thistle">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
