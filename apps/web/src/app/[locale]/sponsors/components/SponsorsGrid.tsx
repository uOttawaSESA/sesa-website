"use client";

import Image from "next/image";
import SponsorCard from "./SponsorCard";
import { type Sponsor, sponsors } from "./SponsorData";

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
                    {featuredSponsors.length > 0 && (
                        <div className="flex w-full flex-wrap gap-8">
                            {featuredSponsors.map((sponsor, i) => (
                                <SponsorCard key={i} sponsor={sponsor} className="min-w-0 flex-1" />
                            ))}
                        </div>
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
