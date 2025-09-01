"use client";

import Image from "next/image";

const sponsors = [
    {
        name: "National Bank",
        src: "/sponsors/nationalbank.svg",
        alt: "National Bank",
        width: 480,
        height: 240,
        size: "col-span-12 h-96 md:h-[28rem]",
        link: "https://www.nbc.ca/",
    },
    {
        name: "Warp",
        src: "/sponsors/warp.svg",
        alt: "Warp",
        width: 300,
        height: 150,
        size: "col-span-6 h-72 md:h-80",
        link: "https://warp.dev/?ref=sesa",
    },
    {
        name: "CSE",
        src: "/sponsors/cse.svg",
        alt: "CSE",
        width: 300,
        height: 150,
        size: "col-span-6 h-72 md:h-80",
        link: "https://cse-cst.gc.ca/en",
    },
];

const gradientBorderClass = `
  border-[1px] border-solid
  [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]
`;

const SponsorsGrid = () => {
    return (
        <div className="mt-10 flex justify-center px-6 md:mt-16">
            <div className="grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-12">
                {sponsors.map((sponsor, index) => (
                    <a
                        key={index}
                        href={sponsor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center rounded-lg p-10 ${sponsor.size} ${gradientBorderClass} backdrop-blur-lg transition hover:scale-105`}
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
    );
};

export default SponsorsGrid;
