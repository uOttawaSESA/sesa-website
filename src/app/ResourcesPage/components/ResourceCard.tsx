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
}) => (
  <div className="bg-gray-100 p-px hover:bg-gradient-to-r from-blueviolet-100 to-darkmagenta transition-all border border-gray-300 font-heading">
    <div className="bg-gray-100 p-6 h-full">
      {/* Category Badges */}
      <div className="flex gap-2 mb-4">
        <span className="px-3 py-1 bg-gradient-to-r from-blueviolet-100 to-darkmagenta text-sm uppercase">
          {category}
        </span>
        {course && (
          <span className="px-3 py-1 bg-gradient-to-r from-blueviolet-100 to-darkmagenta text-sm uppercase">
            {course}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl uppercase leading-tight mb-8">{title}</h3>

      {/* Rating Section */}
      <div className="flex justify-between items-end">
        <div className="flex gap-4 text-thistle font-[Monocode]">
          {/* Thumbs Up SVG */}
          <div className="flex items-center gap-1">
            <Image
              src="/resources-page/thumb_up_24dp_000000_FILL0_wght400_GRAD0_opsz24 1.svg"
              alt="Thumbs Up"
              width={20}
              height={20}
              className="w-5 h-5" // Adjust size as needed
            />
            <span className="text-sm">{rating}%</span>
          </div>

          {/* Document SVG */}
          <div className="flex items-center gap-1">
            <Image
              src="/resources-page/description_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 (1) 1.svg"
              alt="Document"
              width={20}
              height={20}
              className="w-5 h-5" // Adjust size as needed
            />
            <span className="text-sm">{grade}</span>
          </div>
        </div>

        {/* Open Button */}
        <span className="bg-gradient-to-r from-blueviolet-100 to-darkmagenta bg-clip-text text-transparent uppercase">
          Open
        </span>
      </div>
    </div>
  </div>
);

export default ResourceCard;