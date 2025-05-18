import Image from "next/image";

const sponsors = [
    { src: "/sponsors/ciena.png", alt: "Ciena", size: "col-span-6 h-48", width: 160, height: 80 },
    {
        src: "/sponsors/shopify.png",
        alt: "Shopify",
        size: "col-span-6 h-48",
        width: 180,
        height: 90,
    },
    { src: "/sponsors/qnx.png", alt: "QNX", size: "col-span-4 h-36", width: 100, height: 50 },
    { src: "/sponsors/nokia.png", alt: "Nokia", size: "col-span-4 h-36", width: 140, height: 70 },
    { src: "/sponsors/eef.png", alt: "EEF", size: "col-span-4 h-36", width: 140, height: 70 },
    { src: "/sponsors/warp.png", alt: "Warp", size: "col-span-3 h-26", width: 70, height: 35 },
    {
        src: "/sponsors/surveymonkey.png",
        alt: "SurveyMonkey",
        size: "col-span-3 h-26",
        width: 120,
        height: 60,
    },
    {
        src: "/sponsors/bitesite.png",
        alt: "BiteSite",
        size: "col-span-3 h-26",
        width: 80,
        height: 40,
    },
    { src: "/sponsors/knak.png", alt: "Knak", size: "col-span-3 h-26", width: 60, height: 30 },
    {
        src: "/sponsors/redbull.png",
        alt: "Red Bull",
        size: "col-span-3 h-26",
        width: 60,
        height: 30,
    },
    {
        src: "/sponsors/nationalbank.png",
        alt: "National Bank",
        size: "col-span-3 h-26",
        width: 100,
        height: 50,
    },
    { src: "/sponsors/solace.png", alt: "Solace", size: "col-span-3 h-26", width: 90, height: 45 },
    { src: "/sponsors/aws.png", alt: "AWS", size: "col-span-3 h-26", width: 50, height: 25 },
];

const gradientBorderClass = `
  border-[1px] border-solid
  [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]
`;

const SponsorsGrid = () => {
    return (
        <div className="mt-16 flex justify-center px-6">
            <div className="grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-12">
                {sponsors.map((sponsor, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-center rounded-lg p-6 ${sponsor.size} ${gradientBorderClass} ${
                            sponsor.size === "col-span-6"
                                ? "h-40" // Tallest
                                : sponsor.size === "col-span-4"
                                  ? "h-32" // Medium height
                                  : "h-24" // Shortest
                        }`}
                    >
                        <Image
                            src={sponsor.src}
                            alt={sponsor.alt}
                            width={sponsor.width}
                            height={sponsor.height}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SponsorsGrid;
