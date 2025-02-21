import Image from "next/image";

export const SearchFilterBar = () => (
  <div className="bg-gradient-to-r from-blueviolet-100 to-darkmagenta p-px mb-8">
    <div className="bg-gray-100 flex items-center justify-between p-4">
      <div className="flex items-center gap-4 text-thistle flex-1">
        {/* Search SVG Icon */}
        <Image
          src="/resources-page/search_24dp_2C2C2C_FILL0_wght400_GRAD0_opsz24 1.svg"
          alt="Search"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <input
          type="text"
          placeholder="Search by title, category, course, or author"
          className="bg-transparent placeholder-thistle font-sans text-base focus:outline-none w-full"
        />
      </div>

      <div className="flex gap-6 ml-4">
        {/* Filter Button */}
        <button
          className="flex items-center gap-2 uppercase"
          onClick={() => console.log("Filter clicked")} // Add your filter logic here
        >
          Filter <span className="text-xl">▾</span>
        </button>

        {/* Sort Button */}
        <button
          className="flex items-center gap-2 uppercase"
          onClick={() => console.log("Sort clicked")} // Add your sort logic here
        >
          Sort <span className="text-xl">▾</span>
        </button>
      </div>
    </div>
  </div>
);

export default SearchFilterBar;
