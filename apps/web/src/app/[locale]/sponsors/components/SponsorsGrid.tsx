"use client";

import { cn } from "@repo/ui/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimateOnView from "@/components/AnimateOnView";
import { Link } from "@/i18n/navigation";
import SponsorCard from "./SponsorCard";
import { type Sponsor, sponsors } from "./SponsorData";

const heroSponsors = sponsors.filter(sponsor => sponsor.featureLevel === "hero");
const featuredSponsors = sponsors.filter(sponsor => sponsor.featureLevel === "featured");
const normalSponsors = sponsors.filter(sponsor => sponsor.featureLevel === "normal");
const featuredRows: Sponsor[][] = [];
for (let i = 0; i < featuredSponsors.length; i += 2) {
    featuredRows.push(featuredSponsors.slice(i, i + 2));
}

const SponsorsGrid = () => {
    const t = useTranslations("sponsorships");

    return (
        <div className="mt-10 flex justify-center px-6 md:mt-16">
            <div className="flex w-full max-w-6xl flex-col gap-8">
                {/* Mobile: stack all sponsors vertically */}
                <div className="flex flex-col gap-8 md:hidden">
                    {sponsors.map((sponsor, index) => (
                        <a
                            key={index}
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center rounded-lg p-10 ${sponsor.size} w-full outline-gradient backdrop-blur-lg transition hover:scale-105`}
                            title={sponsor.name}
                        >
                            <Image
                                src={sponsor.src}
                                alt={sponsor.alt ?? sponsor.name}
                                width={sponsor.width}
                                height={sponsor.height}
                                className="object-contain brightness-0 invert"
                            />
                        </a>
                    ))}
                </div>

                {/* Desktop rows */}
                <div className="hidden w-full flex-col gap-8 md:flex">
                    {/* Hero Sponsors */}
                    <div className="flex flex-col gap-8 md:flex-row">
                        {heroSponsors.map((sponsor, i) => (
                            <SponsorCard key={i} sponsor={sponsor} className="flex-1" />
                        ))}
                    </div>

                    {/* Featured Sponsors */}
                    {featuredRows.length > 0 &&
                        featuredRows.map((row, rowIndex) =>
                            row.length === 1 ? (
                                <div
                                    key={`featured-row-${rowIndex}`}
                                    className="grid w-full grid-cols-1 gap-8 md:grid-cols-2"
                                >
                                    {row.map((sponsor, i) => (
                                        <SponsorCard
                                            key={`${rowIndex}-${i}`}
                                            sponsor={sponsor}
                                            className="w-full max-w-4xl"
                                        />
                                    ))}
                                    <Link
                                        href="/contact"
                                        title="Become a Sponsor"
                                        className={cn(
                                            "flex items-center justify-center rounded-lg p-10 outline-gradient backdrop-blur-lg transition hover:scale-105",
                                            "h-72 md:h-80",
                                            "font-bold text-white",
                                        )}
                                    >
                                        <h1 className="mx-auto max-w-[18ch] text-center font-heading text-3xl text-white uppercase leading-snug md:text-4xl md:leading-tight">
                                            {t("become")}{" "}
                                            <AnimateOnView animationClass="highlight-text">
                                                {t("sponsor")}
                                            </AnimateOnView>
                                        </h1>
                                    </Link>
                                </div>
                            ) : (
                                <div
                                    key={`featured-row-${rowIndex}`}
                                    className="grid w-full grid-cols-1 gap-8 md:grid-cols-2"
                                >
                                    {row.map((sponsor, i) => (
                                        <SponsorCard
                                            key={`${rowIndex}-${i}`}
                                            sponsor={sponsor}
                                            className="w-full"
                                        />
                                    ))}
                                </div>
                            ),
                        )}

                    {/* Normal Sponsors */}
                    {normalSponsors.length > 0 && (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                            {normalSponsors.map((sponsor, i) => (
                                <SponsorCard key={i} sponsor={sponsor} className="w-full" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SponsorsGrid;
