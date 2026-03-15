"use client";

import Image from "next/image";
import SponsorCard from "./SponsorCard";
import { gradientBorderClass, type Sponsor, sponsors } from "./SponsorData";

const heroSponsors = sponsors.filter(sponsor => sponsor.featureLevel === "hero");
const featuredSponsors = sponsors.filter(sponsor => sponsor.featureLevel === "featured");
const normalSponsors = sponsors.filter(sponsor => sponsor.featureLevel === "normal");

const desktopRows: Sponsor[][] = [];
for (let i = 0; i < normalSponsors.length; i += 2) {
    desktopRows.push(normalSponsors.slice(i, i + 2));
}

const SponsorsGrid = () => {
    return (
        <div className="mt-10 flex justify-center px-6 md:mt-16">
            <div className="flex w-full max-w-4xl flex-col gap-8">
                {/* Mobile: stack all sponsors vertically */}
                <div className="flex flex-col gap-8 md:hidden">
                    {sponsors.map((sponsor, index) => (
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
                    <div className="flex w-full flex-row gap-8">
                        {heroSponsors.map((sponsor, i) => (
                            <SponsorCard key={i} sponsor={sponsor} className="flex-1" />
                        ))}
                    </div>

                    {/* Features Sponsors */}
                    <div className="flex w-4/5 flex-row gap-8 self-center">
                        {featuredSponsors.map((sponsor, i) => (
                            <SponsorCard key={i} sponsor={sponsor} className="flex-1" />
                        ))}
                    </div>

                    {/* Normal Sponsors */}
                    {desktopRows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={`flex flex-row gap-8 self-center ${row.length === 1 ? "w-3/4" : "w-full"}`}
                        >
                            {row.map((sponsor, i) => (
                                <SponsorCard key={i} sponsor={sponsor} className="flex-1" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SponsorsGrid;
