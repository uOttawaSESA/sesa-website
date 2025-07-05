import Image from "next/image";

const sponsors = [
    {
        src: "/sponsors/ciena.png",
        alt: "Ciena",
        size: "col-span-2 sm:col-span-4 md:col-span-6",
        style: { width: "14em", height: "6em" },
    },
    {
        src: "/sponsors/shopify.png",
        alt: "Shopify",
        size: "col-span-2 sm:col-span-4 md:col-span-6",
        style: { width: "13em", height: "6em" },
    },
    {
        src: "/sponsors/qnx.png",
        alt: "QNX",
        size: "col-span-1 sm:col-span-2 md:col-span-4",
        style: { width: "10em", height: "5em" },
    },
    {
        src: "/sponsors/nokia.png",
        alt: "Nokia",
        size: "col-span-1 sm:col-span-2 md:col-span-4",
        style: { width: "11em", height: "5em" },
    },
    {
        src: "/sponsors/eef.png",
        alt: "EEF",
        size: "col-span-1 sm:col-span-2 md:col-span-4",
        style: { width: "11em", height: "5em" },
    },
    {
        src: "/sponsors/warp.png",
        alt: "Warp",
        size: "col-span-1 sm:col-span-1 md:col-span-3",
        style: { width: "8em", height: "4em" },
    },
    {
        src: "/sponsors/surveymonkey.png",
        alt: "SurveyMonkey",
        size: "col-span-1 sm:col-span-1 md:col-span-3",
        style: { width: "10em", height: "5em" },
    },
    {
        src: "/sponsors/bitesite.png",
        alt: "BiteSite",
        size: "col-span-1 sm:col-span-1 md:col-span-3",
        style: { width: "9em", height: "4.5em" },
    },
    {
        src: "/sponsors/knak.png",
        alt: "Knak",
        size: "col-span-1 sm:col-span-1 md:col-span-3",
        style: { width: "7em", height: "4em" },
    },
    {
        src: "/sponsors/redbull.png",
        alt: "Red Bull",
        size: "col-span-1 sm:col-span-1 md:col-span-3",
        style: { width: "7em", height: "4em" },
    },
    {
        src: "/sponsors/nationalbank.png",
        alt: "National Bank",
        size: "col-span-1 sm:col-span-1 md:col-span-3",
        style: { width: "10em", height: "5em" },
    },
    {
        src: "/sponsors/solace.png",
        alt: "Solace",
        size: "col-span-1 sm:col-span-1 md:col-span-3",
        style: { width: "9em", height: "4.5em" },
    },
    {
        src: "/sponsors/aws.png",
        alt: "AWS",
        size: "col-span-1 sm:col-span-1 md:col-span-3",
        style: { width: "6em", height: "3em" },
    },
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
