import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Quote from "./types/Quote";

export const QuoteCard: React.FC<{ quote: Quote }> = ({ quote }) => {
    const {
        heading,
        quote_part1,
        highlightQuote,
        quote_part2,
        buttonLink,
        memberImg,
        memberName,
        memberRole,
    } = quote;

    return (
        <div className="my-36 flex h-[45rem] items-center ps-32 align-middle md:w-screen">
            {/* Content */}
            <div className="max-w-2xl">
                <p className="font-monocode relative inline-block !bg-clip-text text-left text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                    {heading}
                </p>
                <h1 className="my-2 font-heading text-4xl uppercase leading-tight">
                    “{quote_part1}{" "}
                    <span className="relative inline-block">
                        {highlightQuote}
                        <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                    </span>
                    {quote_part2 && ` ${quote_part2}`}”
                </h1>
                <div className="my-3 flex items-center gap-4">
                    <Image
                        src={memberImg}
                        alt={memberImg}
                        className="z-10 h-14 w-14 rounded-full object-cover"
                        width={50}
                        height={50}
                    />
                    <div>
                        <p className="z-20 mt-4 font-heading text-xl uppercase">{memberName}</p>
                        <p className="text-sm opacity-70">{memberRole}</p>
                    </div>
                </div>
                <div className="mt-6 flex">
                    <Link
                        href={buttonLink}
                        className="fill-gradient relative z-10 px-6 py-2 font-heading text-lg uppercase transition-all ease-in-out"
                    >
                        See our story
                    </Link>
                </div>
            </div>

            {/* Right Image
            <div className="grid-overlay-right md:h-[43.93rem] md:w-[48vw] 2xl:w-[32vw]"></div>
            <div className="relative z-10 lg:block">
                <Image
                    src={mainImg}
                    alt="Quote Main Image"
                    className="w-full object-contain md:h-[500px] 2xl:h-[600px] 2xl:max-w-3xl"
                    width={700}
                    height={700}
                />
            </div> */}
        </div>
    );
};
