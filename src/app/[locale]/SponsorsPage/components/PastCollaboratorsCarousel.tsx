"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import React from "react";

const gradientBorderClass = `
  border-[1px] border-solid
  [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]
`;

const logos = [
    { src: "/sponsors-page/kinaxis.webp", alt: "Kinaxis", width: 120, height: 60 },
    { src: "/sponsors-page/microsoft.webp", alt: "Microsoft", width: 120, height: 60 },
    { src: "/sponsors-page/google.webp", alt: "Google", width: 160, height: 80 },
    { src: "/sponsors-page/ibm.webp", alt: "IBM", width: 80, height: 40 },
];

const PastCollaboratorsCarousel = () => {
    return (
        <div className="flex flex-col items-center justify-center overflow-hidden text-center">
            {/* Header content with space between */}
            <div className="flex flex-col items-center space-y-3">
                <p className="relative inline-block !bg-clip-text font-mono text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                    Our previous partners
                </p>
                <div className="font-heading text-2xl uppercase text-white">
                    <span className="relative inline-block">
                        PAST
                        <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                    </span>{" "}
                    COLLABORATORS SINCE 2014
                </div>
                <p className="max-w-2xl text-base text-thistle">
                    We&apos;ve had the privilege of working with over 20+ big and small companies
                    that have enhanced our events, including:
                </p>
            </div>

            {/* Marquee Carousel */}
            <div className="relative mt-10 w-full">
                <Marquee speed={40} gradient={false} pauseOnHover={true}>
                    {logos.concat(logos).map((logo, index) => (
                        <div
                            key={index}
                            className={`mx-6 flex h-28 min-w-[200px] items-center justify-center rounded-lg p-6 ${gradientBorderClass}`}
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className="object-contain brightness-0 invert filter"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default PastCollaboratorsCarousel;
