"use client";

import Image from "next/image";

const sponsors = [
    { src: "/sponsors/ciena.webp", alt: "Ciena", size: "col-span-2 sm:col-span-4 md:col-span-6" },
    {
        src: "/sponsors/shopify.webp",
        alt: "Shopify",
        size: "col-span-2 sm:col-span-4 md:col-span-6",
    },
    { src: "/sponsors/qnx.webp", alt: "QNX", size: "col-span-4" },
    { src: "/sponsors/nokia.webp", alt: "Nokia", size: "col-span-4" },
    { src: "/sponsors/eef.webp", alt: "EEF", size: "col-span-4" },
    { src: "/sponsors/warp.webp", alt: "Warp", size: "col-span-3" },
    { src: "/sponsors/surveymonkey.webp", alt: "SurveyMonkey", size: "col-span-3" },
    { src: "/sponsors/bitesite.webp", alt: "BiteSite", size: "col-span-3" },
    { src: "/sponsors/knak.webp", alt: "Knak", size: "col-span-3" },
    { src: "/sponsors/redbull.webp", alt: "Red Bull", size: "col-span-3" },
    { src: "/sponsors/nationalbank.webp", alt: "National Bank", size: "col-span-3" },
    { src: "/sponsors/solace.webp", alt: "Solace", size: "col-span-3" },
    { src: "/sponsors/aws.webp", alt: "AWS", size: "col-span-3" },
];

const gradientBorderClass = `
  border-[1px] border-solid
  [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]
`;

const SponsorsGrid = () => {
    return (
        <div className="mt-16 flex justify-center px-4 sm:px-6">
            <div className="grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-12">
                {sponsors.map((sponsor, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-center rounded-lg p-4 sm:p-6 ${gradientBorderClass} ${sponsor.size}`}
                    >
                        <Image
                            src={sponsor.src}
                            alt={sponsor.alt}
                            width={96} // 6rem
                            height={48} // 3rem
                            className="h-auto w-full max-w-[6rem] object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SponsorsGrid;
