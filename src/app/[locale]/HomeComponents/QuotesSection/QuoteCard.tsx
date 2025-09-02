"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Quote from "./types/Quote";
import { CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export const QuoteCard: React.FC<{ quote: Quote }> = ({ quote }) => {
    const locale = useLocale();

    const lang = locale === "fr" ? "fr" : "en";
    const t = useTranslations("homepage");

    return (
        <CarouselItem className="flex justify-center lg:justify-center">
            <div className="flex max-w-xs flex-col items-center text-center md:max-w-lg xl:max-w-2xl xl:items-start xl:text-left">
                <p className="font-monocode relative inline-block !bg-clip-text text-xs text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)] md:text-base">
                    {quote.heading[lang]}
                </p>
                <h1 className="my-2 font-heading text-2xl uppercase leading-tight md:text-4xl">
                    <q>
                        {quote.quote_part1[lang]}&nbsp;
                        <span className="highlight-text">{quote.highlightQuote[lang]}</span>{" "}
                        {quote.quote_part2[lang]}
                    </q>
                </h1>

                <div className="flex items-center gap-4">
                    <Image
                        src={quote.memberImg}
                        alt={quote.memberImg}
                        className="z-10 h-14 w-14 rounded-full object-cover"
                        width={50}
                        height={50}
                    />
                    <div>
                        <p className="z-20 font-heading text-xl uppercase">{quote.memberName}</p>
                        <p className="text-sm opacity-70">{quote.memberRole}</p>
                    </div>
                </div>
                <div className="mt-6 flex">
                    <Button>
                        <Link href={`/about`} className="relative z-10 font-heading uppercase">
                            {t("see_our_story_btn")}
                        </Link>
                    </Button>
                </div>
            </div>
        </CarouselItem>
    );
};
