import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";

export const ResourceCard = ({
    title,
    category,
    course,
    rating,
    grade,
}: {
    title: string;
    category: string;
    course?: string;
    rating: string;
    grade: string;
}) => {
    const [showOpen, setShowOpen] = useState(false);

    // Tooltip content based on grade
    const getGradeTooltip = (grade: string) => {
        switch (grade.toUpperCase()) {
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

    return (
        <div
            className="border border-gray-300 bg-gray-100 from-blueviolet-100 to-darkmagenta p-px font-heading transition-all hover:bg-gradient-to-r"
            onMouseEnter={() => setShowOpen(true)} // Show "Open" on hover
            onMouseLeave={() => setShowOpen(false)} // Hide "Open" when not hovering
        >
            <div className="relative flex h-full flex-col bg-gray-100 p-6">
                {/* Category Badges */}
                <div className="mb-4 flex gap-2">
                    <span className="cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta px-3 py-1 text-sm uppercase">
                        {category}
                    </span>
                    {course && (
                        <span className="cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta px-3 py-1 text-sm uppercase">
                            {course}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="mb-8 text-xl uppercase leading-tight">{title}</h3>

                {/* Rating Section */}
                <div className="mt-auto flex items-end justify-between">
                    <div className="flex gap-4 font-[Monocode] text-thistle">
                        {/* Thumbs Up SVG (No Tooltip) */}
                        <div className="flex items-center gap-1">
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
                        <div className="group relative flex items-center gap-1">
                            <Image
                                src="/resources-page/description.svg"
                                alt="Document"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            <span className="text-sm">{grade}</span>
                            <div className="absolute -top-8 left-0 z-10 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                {getGradeTooltip(grade)}
                            </div>
                        </div>
                    </div>

                    {/* Open Button */}
                    {showOpen && (
                        <Button
                            href="#"
                            className="!p-0 font-heading uppercase opacity-100"
                            variant="ghost"
                        >
                            Open
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;
