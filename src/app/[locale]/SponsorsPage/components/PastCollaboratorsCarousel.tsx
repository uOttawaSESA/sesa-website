"use client";

import Image from "next/image";
import styles from "./PastCollaboratorsCarousel.module.css";

const gradientBorderClass = `
  border-[1px] border-solid
  [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]
`;

const logos = [
    { src: "/sponsors-page/kinaxis.png", alt: "Kinaxis", width: 120, height: 60 },
    { src: "/sponsors-page/microsoft.png", alt: "Microsoft", width: 120, height: 60 },
    { src: "/sponsors-page/google.png", alt: "Google", width: 160, height: 80 },
    { src: "/sponsors-page/ibm.png", alt: "IBM", width: 80, height: 40 },
    // Duplicate for infinite scroll
    { src: "/sponsors-page/kinaxis.png", alt: "Kinaxis", width: 120, height: 60 },
    { src: "/sponsors-page/microsoft.png", alt: "Microsoft", width: 120, height: 60 },
    { src: "/sponsors-page/google.png", alt: "Google", width: 100, height: 50 },
    { src: "/sponsors-page/ibm.png", alt: "IBM", width: 80, height: 40 },
];

const PastCollaboratorsCarousel = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6 overflow-hidden py-16 text-center">
            <p className="font-monocode relative inline-block !bg-clip-text text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                Our previous partners
            </p>

            <div className="font-heading text-2xl uppercase text-white">
                PAST COLLABORATORS SINCE 2014
            </div>

            <p className="text-md max-w-2xl text-thistle">
                We&apos;ve had the privilege of working with over 20+ big and small companies that
                have enhanced our events, including:
            </p>

            {/* Carousel container */}
            <div className="relative h-36 w-full overflow-hidden">
                <div className={`${styles.animateScroll} gap-10`}>
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            className={`flex min-w-[200px] items-center justify-center rounded-lg p-6 ${gradientBorderClass} h-28`}
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
                </div>
            </div>
        </div>
    );
};

export default PastCollaboratorsCarousel;
