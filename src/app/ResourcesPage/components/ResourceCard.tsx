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
      className="bg-gray-100 p-px hover:bg-gradient-to-r from-blueviolet-100 to-darkmagenta transition-all border border-gray-300 font-heading"
      onMouseEnter={() => setShowOpen(true)} // Show "Open" on hover
      onMouseLeave={() => setShowOpen(false)} // Hide "Open" when not hovering
    >
      <div className="bg-gray-100 p-6 h-full relative">
        {/* Category Badges */}
        <div className="flex gap-2 mb-4">
          <span
            className="px-3 py-1 bg-gradient-to-r from-blueviolet-100 to-darkmagenta text-sm uppercase cursor-pointer"
          >
            {category}
          </span>
          {course && (
            <span
              className="px-3 py-1 bg-gradient-to-r from-blueviolet-100 to-darkmagenta text-sm uppercase cursor-pointer"
            >
              {course}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl uppercase leading-tight mb-8">{title}</h3>

        {/* Rating Section */}
        <div className="flex justify-between items-end">
          <div className="flex gap-4 text-thistle font-[Monocode]">
            {/* Thumbs Up SVG with Tooltip */}
            <div className="flex items-center gap-1 relative group">
              <Image
                src="/resources-page/thumb_up_24dp_000000_FILL0_wght400_GRAD0_opsz24 1.svg"
                alt="Thumbs Up"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-sm">{rating}%</span>
              <div className="absolute left-0 top-0 opacity-0 group-hover:opacity-100 bg-black text-white text-xs p-1 rounded transition-opacity">
                Like/Dislike Ratio: {rating}%
              </div>
            </div>

            {/* Document SVG with Tooltip */}
            <div className="flex items-center gap-1 relative group">
              <Image
                src="/resources-page/description_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 (1) 1.svg"
                alt="Document"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-sm">{grade}</span>
              <div className="absolute left-0 top-0 opacity-0 group-hover:opacity-100 bg-black text-white text-xs p-1 rounded transition-opacity">
                {grade} Tier Resource
              </div>
            </div>
          </div>

          {/* Open Button */}
          {showOpen && (
            <span className="bg-gradient-to-r from-blueviolet-100 to-darkmagenta bg-clip-text text-transparent uppercase opacity-100 transition-opacity">
              Open
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
