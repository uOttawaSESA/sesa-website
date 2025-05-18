"use client";

import Image from "next/image";

export default function Benefits() {
    const cards = [
        {
            image: "/sponsors-page/benefits-1.png",
            icon: "/sponsors-page/network.png",
            title: "NETWORK WITH TOP TALENT",
            description:
                "Connect and recruit highly skilled job-ready students pursuing the field of software engineering at uOttawa.",
        },
        {
            image: "/sponsors-page/benefits-2.jpg",
            icon: "/sponsors-page/impact.png",
            title: "MAKE A REAL-WORLD IMPACT",
            description:
                "Give back to your community and make a meaningful difference in software engineering education at the University of Ottawa.",
        },
        {
            image: "/sponsors-page/benefits-3.png",
            icon: "/sponsors-page/brand.png",
            title: "PROMOTE YOUR BRAND",
            description:
                "Increase your brand visibility, survey your target audience, or offer exclusive discounts to students attending uOttawa.",
        },
    ];

    return (
        <div className="flex min-h-screen flex-col justify-center space-y-10 px-40 py-20">
            {/* Header Section */}
            <p className="font-monocode relative inline-block !bg-clip-text text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                Benefits
            </p>

            <h2 className="max-w-4xl font-heading text-3xl uppercase leading-snug text-white">
                <span className="block md:inline">CONNECT WITH </span>
                <span className="relative block md:inline">
                    THE NEXT GENERATION
                    <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                </span>
                <span className="block md:inline"> OF SOFTWARE ENGINEERS</span>
            </h2>

            <p className="text-md max-w-2xl text-thistle">
                Without our sponsors and partners, we would not be able to fund our events and
                projects that provide SEG students with academic opportunities and workplace
                experiences.
            </p>

            {/* Cards */}
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="overflow-hidden border-[1px] border-solid text-left text-white [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]"
                    >
                        <Image
                            src={card.image}
                            alt={card.title}
                            width={500}
                            height={300}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            {/* Icon */}
                            <Image
                                src={card.icon}
                                alt={`${card.title} icon`}
                                width={24}
                                height={24}
                                className="mb-3"
                            />
                            <div className="text-3lg mb-2 font-heading uppercase leading-snug text-white">
                                {card.title}
                            </div>
                            <p className="text-sm text-thistle">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Nav Arrows (optional placeholders) */}
            <div className="mt-10 flex gap-4">
                <button className="rounded border border-white p-2 transition hover:bg-white">
                    <Image
                        src="/resources-page/arrow_backword.svg"
                        alt="Previous"
                        width={24}
                        height={24}
                    />
                </button>
                <button className="rounded border border-white p-2 transition hover:bg-white">
                    <Image
                        src="/resources-page/arrow_forward.svg"
                        alt="Next"
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </div>
    );
}
