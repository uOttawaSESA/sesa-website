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
    {
        name: "Bank of Canada",
        src: "/sponsors/bankofcanada.svg",
        alt: "Bank of Canada",
        width: 500,
        height: 250,
        size: "h-72 md:h-80",
        link: "https://www.bankofcanada.ca/",
    },
];

const gradientBorderClass = `
  border border-solid
  [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]
`;

type Sponsor = (typeof sponsors)[0];
const firstSponsor = sponsors[0] as Sponsor;
const lastSponsor = sponsors[5] as Sponsor;

const SponsorsGrid = () => {
    return (
        <div className="mt-10 flex justify-center px-6 md:mt-16">
            <div className="flex w-full max-w-4xl flex-col gap-8">
                {/* Large sponsor on top */}
                <div className="flex justify-center gap-8 md:flex">
                    <a
                        href={firstSponsor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center rounded-lg p-10 ${firstSponsor.size} ${gradientBorderClass} w-full backdrop-blur-lg transition hover:scale-105`}
                        title={firstSponsor.name}
                    >
                        <Image
                            src={firstSponsor.src}
                            alt={firstSponsor.alt}
                            width={firstSponsor.width}
                            height={firstSponsor.height}
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
                    {sponsors.slice(3, 5).map((sponsor, index) => (
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

                {/* Desktop: Bank of Canada centered as its own row */}
                <div className="hidden w-full justify-center md:flex">
                    <a
                        href={lastSponsor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center rounded-lg p-10 ${lastSponsor.size} ${gradientBorderClass} w-3/5 backdrop-blur-lg transition hover:scale-105`}
                        title={lastSponsor.name}
                    >
                        <Image
                            src={lastSponsor.src}
                            alt={lastSponsor.alt}
                            width={lastSponsor.width}
                            height={lastSponsor.height}
                            className="object-contain"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SponsorsGrid;
