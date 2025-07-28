import Image from "next/image";

const sponsors = [
    {
        src: "/sponsors/ciena.webp",
        alt: "Ciena",
        size: "col-span-2 sm:col-span-4 md:col-span-6",
        style: { width: "10em", height: "6em" },
    },
    {
        src: "/sponsors/shopify.webp",
        alt: "Shopify",
        size: "col-span-2 sm:col-span-4 md:col-span-6",
        style: { width: "13em", height: "6em" },
    },
    { src: "/sponsors/qnx.webp", alt: "QNX", size: "col-span-4 h-36", width: 100, height: 50 },
    { src: "/sponsors/nokia.webp", alt: "Nokia", size: "col-span-4 h-36", width: 140, height: 70 },
    { src: "/sponsors/eef.webp", alt: "EEF", size: "col-span-4 h-36", width: 140, height: 70 },
    { src: "/sponsors/warp.webp", alt: "Warp", size: "col-span-3 h-26", width: 70, height: 35 },
    {
        src: "/sponsors/surveymonkey.webp",
        alt: "SurveyMonkey",
        size: "col-span-1 sm:col-span-1 md:col-span-3",
        style: { width: "10em", height: "5em" },
    },
    {
        src: "/sponsors/bitesite.webp",
        alt: "BiteSite",
        size: "col-span-1 sm:col-span-1 md:col-span-3",
        style: { width: "9em", height: "4.5em" },
    },
    { src: "/sponsors/knak.webp", alt: "Knak", size: "col-span-3 h-26", width: 60, height: 30 },
    {
        src: "/sponsors/redbull.webp",
        alt: "Red Bull",
        size: "col-span-1 sm:col-span-1 md:col-span-3",
        style: { width: "7em", height: "4em" },
    },
    {
        src: "/sponsors/nationalbank.webp",
        alt: "National Bank",
        size: "col-span-1 sm:col-span-1 md:col-span-3",
        style: { width: "10em", height: "5em" },
    },
    { src: "/sponsors/solace.webp", alt: "Solace", size: "col-span-3 h-26", width: 90, height: 45 },
    { src: "/sponsors/aws.webp", alt: "AWS", size: "col-span-3 h-26", width: 50, height: 25 },
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
                            width={1}
                            height={1}
                            style={sponsor.style}
                            className="h-auto w-auto object-contain"
                            unoptimized
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SponsorsGrid;
