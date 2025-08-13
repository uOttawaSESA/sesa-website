"use client";
import { useState } from "react";
import { CategoryBadges } from "./CategoryBadges";
import { StatsSection } from "./StatsSection";
import { OpenButton } from "./OpenButton";

// Main ResourceCard component
export const ResourceCard = ({
    title,
    category,
    course,
    rating,
    tier,
    format,
    mode = "grid",
    onOpen,
}: {
    title: string;
    category: string;
    course?: string;
    rating: string;
    tier: string;
    format: string;
    mode?: "grid" | "row";
    onOpen?: () => void;
}) => {
    const [showOpen, setShowOpen] = useState(false);

    // Row mode layout
    if (mode === "row") {
        return (
            <div
                className="outline-gradient relative flex h-16 w-full items-center p-4 font-heading backdrop-blur-xl transition-all hover:shadow-lg hover:shadow-purple-500/25"
                onMouseEnter={() => setShowOpen(true)}
                onMouseLeave={() => setShowOpen(false)}
            >
                {/* Left side - Category badges */}
                <div className="flex min-w-fit">
                    <CategoryBadges category={category} course={course} size="sm" />
                </div>

                {/* Center - Title */}
                <div className="flex-1 pl-6">
                    <h3 className="truncate text-sm uppercase leading-tight md:text-base">
                        {title}
                    </h3>
                </div>

                {/* Right side - Stats and controls */}
                <div className="flex items-center">
                    <StatsSection
                        rating={rating}
                        tier={tier}
                        format={format}
                        size="sm"
                        layout="compact"
                    />

                    {/* Open Button */}
                    <div className="ml-24">
                        <OpenButton showOpen={showOpen} onOpen={onOpen} />
                    </div>
                </div>
            </div>
        );
    }

    // Grid mode layout
    return (
        <div
            className="outline-gradient relative z-10 h-48 w-80 p-6 font-heading backdrop-blur-xl transition-all hover:shadow-lg hover:shadow-purple-500/25 md:w-96"
            onMouseEnter={() => setShowOpen(true)}
            onMouseLeave={() => setShowOpen(false)}
        >
            <div className="relative flex h-full flex-col">
                {/* Category Badges */}
                <div className="mb-4">
                    <CategoryBadges category={category} course={course} size="base" />
                </div>

                {/* Title */}
                <h3 className="text-base uppercase leading-tight md:text-xl">{title}</h3>

                {/* Bottom Section */}
                <div className="absolute bottom-0 flex flex-row items-center">
                    <StatsSection
                        rating={rating}
                        tier={tier}
                        format={format}
                        size="base"
                        layout="horizontal"
                    />

                    {/* Open Button */}
                    <div className="ms-14 md:ms-28">
                        <OpenButton showOpen={showOpen} onOpen={onOpen} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;
