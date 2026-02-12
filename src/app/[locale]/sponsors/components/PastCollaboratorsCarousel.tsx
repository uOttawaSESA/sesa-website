"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Marquee from "react-fast-marquee";
import Star from "@/components/ui/decorations/star";

const gradientBorderClass = `
  border border-solid
  [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]
`;

const logos = [
    {
        src: "/sponsors-page/kinaxis.webp",
        alt: "Kinaxis",
        width: 120,
        height: 60,
    },
    {
        src: "/sponsors-page/microsoft.webp",
        alt: "Microsoft",
        width: 120,
        height: 60,
    },
    {
        src: "/sponsors-page/google.webp",
        alt: "Google",
        width: 160,
        height: 80,
    },
    { src: "/sponsors-page/ibm.webp", alt: "IBM", width: 80, height: 40 },
];

const PastCollaboratorsCarousel = () => {
    const t = useTranslations("sponsorships");

    return (
        <div className="relative flex flex-col items-center justify-center overflow-hidden py-24 text-center md:py-32">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <Star
                    variant="star"
                    className="absolute md:top-0 md:left-[15rem]"
                    rotate={-110}
                    width={125}
                    height={128}
                    delay={1}
                />
                <Star
                    variant="star-faded"
                    className="absolute right-[18rem] md:right-[16rem] md:bottom-0"
                    rotate={30}
                    width={75}
                    height={75}
                    delay={0.5}
                    showMobile={true}
                />
                <Image
                    src="/decoration/globe-sponsor-page.svg"
                    className="fade-from-center-sponsorship-floor -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 transform opacity-40 md:opacity-60"
                    width={520}
                    height={520}
                    alt="Globe Decoration"
                />
            </div>

            {/* Header content */}
            <div className="z-20 flex flex-col items-center space-y-3 px-5">
                <p className="relative inline-block bg-clip-text! font-mono text-transparent text-xs [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,#8824dc,#b1219d)] md:text-base">
                    {t("past_collaborators_top")}
                </p>
                <h2 className="font-heading text-2xl text-white uppercase md:text-3xl">
                    <span className="highlight-text">{t("past_collaborators_highlight")}</span>{" "}
                    {t("past_collaborators_title_rest")}
                </h2>
                <p className="max-w-xl text-base text-thistle md:text-lg">
                    {t("past_collaborators_description")}
                </p>
            </div>

            {/* Marquee Carousel */}
            <div className="relative mt-8 w-full">
                <Marquee speed={40} gradient={false} pauseOnHover={true} autoFill>
                    {logos.concat(logos).map((logo, index) => (
                        <div
                            key={index}
                            className={`mx-4 flex h-24 min-w-[160px] items-center justify-center rounded-lg p-4 backdrop-blur-lg md:h-28 md:min-w-[200px] md:p-6 ${gradientBorderClass}`}
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
