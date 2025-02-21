import { useState } from "react";
import Image from "next/image";

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

    return (
        <div
            className="border border-gray-300 bg-gray-100 from-blueviolet-100 to-darkmagenta p-px font-heading transition-all hover:bg-gradient-to-r"
            onMouseEnter={() => setShowOpen(true)} // Show "Open" on hover
            onMouseLeave={() => setShowOpen(false)} // Hide "Open" when not hovering
        >
            <div className="relative h-full bg-gray-100 p-6">
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
                <div className="flex items-end justify-between">
                    <div className="flex gap-4 font-[Monocode] text-thistle">
                        {/* Thumbs Up SVG with Tooltip */}
                        <div className="group relative flex items-center gap-1">
                            <Image
                                src="/resources-page/thumb_up_24dp_000000_FILL0_wght400_GRAD0_opsz24 1.svg"
                                alt="Thumbs Up"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            <span className="text-sm">{rating}%</span>
                            <div className="absolute left-0 top-0 rounded bg-black p-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                Like/Dislike Ratio: {rating}%
                            </div>
                        </div>

                        {/* Document SVG with Tooltip */}
                        <div className="group relative flex items-center gap-1">
                            <Image
                                src="/resources-page/description_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 (1) 1.svg"
                                alt="Document"
                                width={20}
                                height={20}
                                className="h-5 w-5"
                            />
                            <span className="text-sm">{grade}</span>
                            <div className="absolute left-0 top-0 rounded bg-black p-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                {grade} Tier Resource
                            </div>
                        </div>
                    </div>

                    {/* Open Button */}
                    {showOpen && (
                        <span className="bg-gradient-to-r from-blueviolet-100 to-darkmagenta bg-clip-text uppercase text-transparent opacity-100 transition-opacity">
                            Open
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;
