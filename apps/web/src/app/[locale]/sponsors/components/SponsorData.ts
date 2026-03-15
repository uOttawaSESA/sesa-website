export type Sponsor = {
    name: string;
    src: string;
    alt?: string;
    width: number;
    height: number;
    size: string;
    link: string;
    featureLevel: "hero" | "featured" | "normal";
    invert?: boolean;
};

export const sponsors: Sponsor[] = [
    {
        name: "National Bank",
        src: "/sponsors/nationalbank.svg",
        featureLevel: "hero",
        width: 480,
        height: 240,
        size: "h-72 md:h-80",
        link: "https://www.nbc.ca/",
    },
    {
        name: "Microsoft",
        src: "/sponsors-page/microsoft.webp",
        featureLevel: "featured",
        invert: true,
        width: 550,
        height: 150,
        size: "h-72 md:h-80",
        link: "https://www.microsoft.com",
    },
    {
        name: "Ciena",
        src: "/sponsors/ciena.webp",
        featureLevel: "normal",
        width: 300,
        height: 150,
        size: "h-72 md:h-80",
        link: "https://www.ciena.com/",
    },
    {
        name: "Warp",
        src: "/sponsors/warp.svg",
        featureLevel: "normal",
        width: 300,
        height: 150,
        size: "h-72 md:h-80",
        link: "https://warp.dev/?ref=sesa",
    },
    {
        name: "CSE",
        src: "/sponsors/cse.svg",
        featureLevel: "normal",
        width: 300,
        height: 150,
        size: "h-72 md:h-80",
        link: "https://cse-cst.gc.ca/en",
    },
    {
        name: "Amazon",
        src: "/sponsors/amazon.svg",
        featureLevel: "normal",
        width: 300,
        height: 150,
        size: "h-72 md:h-80",
        link: "https://www.amazon.com/",
    },
    {
        name: "Bank of Canada",
        src: "/sponsors/bankofcanada.svg",
        featureLevel: "normal",
        width: 500,
        height: 250,
        size: "h-72 md:h-80",
        link: "https://www.bankofcanada.ca/",
    },
    {
        name: "Deloitte",
        src: "/sponsors/deloitte.svg",
        featureLevel: "normal",
        invert: true,
        width: 300,
        height: 150,
        size: "h-72 md:h-80",
        link: "https://www.deloitte.com/",
    },
    {
        name: "Noibu",
        src: "/sponsors/noibu.svg",
        featureLevel: "normal",
        width: 300,
        height: 150,
        size: "h-72 md:h-80",
        link: "https://www.noibu.com/",
    },
];

export const gradientBorderClass = `
  border border-solid
  [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]
`;
