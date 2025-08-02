"use client";
import { useState } from "react";
import Image from "next/image";

export const ResourceCard = ({
    title,
    category,
    course,
    rating,
    tier,
    format,
    mode = "grid", // Default to grid mode
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

    // Tooltip content based on tier
    const getTierTooltip = (tier: string) => {
        switch (tier.toUpperCase()) {
            case "S":
                return "S Tier: The absolute best (only resource you need realistically).";
            case "A":
                return "A Tier: Still great (your main resource, but benefits from comparison).";
            case "B":
                return "B Tier: Good (a comparison/reference resource for additional insights).";
            case "C":
                return "C Tier: Limited (you'll need many more resources to supplement this).";
            default:
                return "No tier information available.";
        }
    };

    // Row mode layout
    if (mode === "row") {
        return (
            <div
                className="outline-gradient relative flex h-16 w-full items-center p-4 font-heading backdrop-blur-xl transition-all"
                onMouseEnter={() => setShowOpen(true)}
                onMouseLeave={() => setShowOpen(false)}
            >
                {/* Left side - Category badges */}
                <div className="flex min-w-fit gap-2 font-thin">
                    <span className="cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta px-3 py-2 text-xs uppercase">
                        {category}
                    </span>
                    {course && (
                        <span className="cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta px-3 py-2 text-xs uppercase">
                            {course}
                        </span>
                    )}
                </div>

                {/* Center - Title */}
                <div className="flex-1 pl-6">
                    <h3 className="truncate text-sm uppercase leading-tight md:text-base">
                        {title}
                    </h3>
                </div>

                {/* Right side - Stats and controls */}
                <div className="flex items-center font-[Monocode] text-base text-thistle">
                    {/* Stats group */}
                    <div className="flex items-center gap-6">
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            <Image
                                src="/resources-page/thumbsup.svg"
                                alt="Thumbs Up"
                                width={16}
                                height={16}
                                className="h-4 w-4"
                            />
                            <span>{rating}%</span>
                        </div>

                        {/* Tier with Tooltip */}
                        <div className="group relative flex items-center gap-1">
                            <Image
                                src="/resources-page/description.svg"
                                alt="Document"
                                width={16}
                                height={16}
                                className="h-4 w-4"
                            />
                            <span>{tier}</span>
                            <div className="absolute -top-8 left-0 z-10 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                {getTierTooltip(tier)}
                            </div>
                        </div>

                        {/* Format */}
                        <div className="flex items-center gap-1">
                            <Image
                                src="/resources-page/folder.svg"
                                alt="Document"
                                width={16}
                                height={16}
                                className="h-4 w-4"
                            />
                            <span className={`${format === "pdf" ? "uppercase" : "capitalize"}`}>
                                {format}
                            </span>
                        </div>
                    </div>

                    {/* Open Button */}
                    <div className="ml-24">
                        <a
                            href="#"
                            onClick={e => {
                                e.preventDefault();
                                onOpen?.();
                            }}
                            className={`color-gradient-clickable font-heading text-lg transition-opacity duration-200 ease-in-out ${
                                showOpen ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            OPEN
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Original card mode layout
    return (
        <div
            className="outline-gradient relative h-48 w-80 p-6 font-heading backdrop-blur-xl transition-all md:w-96"
            onMouseEnter={() => setShowOpen(true)}
            onMouseLeave={() => setShowOpen(false)}
        >
            <div className="relative flex h-full flex-col">
                {/* Category Badges */}
                <div className="mb-4 flex gap-2 font-thin">
                    <span className="cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta p-2 text-sm uppercase">
                        {category}
                    </span>
                    {course && (
                        <span className="cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta p-2 text-sm uppercase">
                            {course}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-base uppercase leading-tight md:text-xl">{title}</h3>

                {/* Bottom Section */}
                <div className="absolute bottom-0 flex flex-row items-center">
                    <div className="flex gap-7 font-[Monocode] text-thistle">
                        {/* Thumbs Up SVG (No Tooltip) */}
                        <div className="flex w-10 items-center gap-1">
                            <Image
                                src="/resources-page/thumbsup.svg"
                                alt="Thumbs Up"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            <span className="text-sm">{rating}%</span>
                        </div>

                        {/* Document SVG with Tooltip */}
                        <div className="group relative flex w-5 items-center gap-1">
                            <Image
                                src="/resources-page/description.svg"
                                alt="Document"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            <span className="text-sm">{tier}</span>
                            <div className="absolute -top-8 left-0 z-10 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                {getTierTooltip(tier)}
                            </div>
                        </div>

                        {/* Format */}
                        <div className="group relative flex w-6 items-center gap-1">
                            <Image
                                src="/resources-page/folder.svg"
                                alt="Document"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            <span className={` ${format === "pdf" ? "uppercase" : "capitalize"}`}>
                                {format}
                            </span>
                        </div>

                        {/* Open Button */}
                        <div className="ms-14 md:ms-28">
                            <a
                                href="#"
                                onClick={e => {
                                    e.preventDefault();
                                    onOpen?.();
                                }}
                                className={`color-gradient-clickable font-heading text-lg transition-opacity duration-200 ease-in-out ${
                                    showOpen ? "md:opacity-100" : "md:opacity-0"
                                }`}
                            >
                                OPEN
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;
