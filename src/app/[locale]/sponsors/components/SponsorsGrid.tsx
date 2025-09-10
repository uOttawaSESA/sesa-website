"use client";

import Image from "next/image";

const sponsors = [
    {
        name: "National Bank",
        src: "/sponsors/nationalbank.svg",
        alt: "National Bank",
        width: 480,
        height: 240,
        size: "h-72 md:h-80",
        link: "https://www.nbc.ca/",
    },
    {
        name: "Ciena",
        src: "/sponsors/ciena.webp",
        alt: "Ciena",
        width: 300,
        height: 150,
        size: "h-72 md:h-80",
        link: "https://www.ciena.com/",
    },

    {
        name: "Warp",
        src: "/sponsors/warp.svg",
        alt: "Warp",
        width: 300,
        height: 150,
        size: "h-72 md:h-80",
        link: "https://warp.dev/?ref=sesa",
    },
    {
        name: "CSE",
        src: "/sponsors/cse.svg",
        alt: "CSE",
        width: 300,
        height: 150,
        size: "h-72 md:h-80",
        link: "https://cse-cst.gc.ca/en",
    },
    {
        name: "Amazon",
        src: "/sponsors/amazon.svg",
        alt: "Amazon",
        width: 300,
        height: 150,
        size: "h-72 md:h-80",
        link: "https://www.amazon.com/",
    },
];

const gradientBorderClass = `
  border-[1px] border-solid
  [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]
`;

const SponsorsGrid = () => {
    return (
        <div className="mt-10 flex justify-center px-6 md:mt-16">
            <div className="flex w-full max-w-4xl flex-col gap-8">
                {/* Large sponsor on top */}
                <div className="flex justify-center gap-8 md:flex">
                    <a
                        href={sponsors[0].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center rounded-lg p-10 ${sponsors[0].size} ${gradientBorderClass} w-full backdrop-blur-lg transition hover:scale-105`}
                        title={sponsors[0].name}
                    >
                        <Image
                            src={sponsors[0].src}
                            alt={sponsors[0].alt}
                            width={sponsors[0].width}
                            height={sponsors[0].height}
                            className="object-contain"
                        />
                    </a>
                </div>
                {/* Mobile: stack all sponsors vertically */}
                <div className="flex flex-col gap-8 md:hidden">
                    {sponsors.slice(1).map((sponsor, index) => (
                        <a
                            key={index}
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center rounded-lg p-10 ${sponsor.size} ${gradientBorderClass} w-full backdrop-blur-lg transition hover:scale-105`}
                            title={sponsor.name}
                        >
                            <Image
                                src={sponsor.src}
                                alt={sponsor.alt}
                                width={sponsor.width}
                                height={sponsor.height}
                                className="object-contain"
                            />
                        </a>
                    ))}
                </div>
                {/* Desktop: row 2 (Ciena + Warp) */}
                <div className="hidden w-full flex-row gap-8 md:flex">
                    {sponsors.slice(1, 3).map((sponsor, index) => (
                        <a
                            key={index}
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-1 items-center justify-center rounded-lg p-10 ${sponsor.size} ${gradientBorderClass} backdrop-blur-lg transition hover:scale-105`}
                            title={sponsor.name}
                        >
                            <Image
                                src={sponsor.src}
                                alt={sponsor.alt}
                                width={sponsor.width}
                                height={sponsor.height}
                                className="object-contain"
                            />
                        </a>
                    ))}
                </div>

                {/* Desktop: row 3 (CSE + Amazon) */}
                <div className="hidden w-full flex-row gap-8 md:flex">
                    {sponsors.slice(3).map((sponsor, index) => (
                        <a
                            key={index}
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-1 items-center justify-center rounded-lg p-10 ${sponsor.size} ${gradientBorderClass} backdrop-blur-lg transition hover:scale-105`}
                            title={sponsor.name}
                        >
                            <Image
                                src={sponsor.src}
                                alt={sponsor.alt}
                                width={sponsor.width}
                                height={sponsor.height}
                                className="object-contain"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SponsorsGrid;
