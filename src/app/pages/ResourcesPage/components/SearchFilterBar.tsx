import Image from "next/image";
import { useState } from "react";

export const SearchFilterBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterOptions, setFilterOptions] = useState<{
        course: string;
        type: string;
        format: string;
        language: string;
        tier: string;
    }>({
        course: "",
        type: "",
        format: "",
        language: "",
        tier: "",
    });

    const [sortOption, setSortOption] = useState<string>("relevance");

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        key: keyof typeof filterOptions,
    ) => {
        setFilterOptions({ ...filterOptions, [key]: e.target.value });
        setIsFilterOpen(false); // Close filter dropdown after selection
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
        setIsSortOpen(false); // Close sort dropdown after selection
    };

    const toggleFilterDropdown = () => {
        setIsFilterOpen(!isFilterOpen);
        if (isSortOpen) setIsSortOpen(false); // Close sort dropdown if it's open
    };

    const toggleSortDropdown = () => {
        setIsSortOpen(!isSortOpen);
        if (isFilterOpen) setIsFilterOpen(false); // Close filter dropdown if it's open
    };

    return (
        <div className="mb-8 bg-gradient-to-r from-blueviolet-100 to-darkmagenta p-px">
            <div className="flex items-center justify-between bg-gray-100 p-4">
                <div className="flex flex-1 items-center gap-4 text-thistle">
                    <Image
                        src="/resources-page/search.svg"
                        alt="Search"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                    />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search by title, category, course, or author"
                        className="w-full bg-transparent font-sans text-base placeholder-thistle focus:outline-none"
                    />
                </div>

                <div className="ml-4 flex gap-6">
                    <div className="relative">
                        <button
                            className="flex items-center gap-2 uppercase text-thistle"
                            onClick={toggleFilterDropdown}
                        >
                            Filter <span className="text-xl">▾</span>
                        </button>
                        {isFilterOpen && (
                            <div className="absolute right-0 z-10 mt-1 w-72 rounded bg-gradient-to-r from-blueviolet-100 to-darkmagenta p-2 text-thistle shadow-md">
                                {Object.entries(filterOptions).map(([key, value]) => (
                                    <div className="mb-2" key={key}>
                                        <label htmlFor={key} className="block text-sm">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </label>
                                        <select
                                            id={key}
                                            value={value}
                                            onChange={e =>
                                                handleFilterChange(
                                                    e,
                                                    key as keyof typeof filterOptions,
                                                )
                                            }
                                            className="w-full rounded border bg-gray-100 p-1 text-thistle"
                                        >
                                            {key === "course" && (
                                                <>
                                                    <option value="">Select Course</option>
                                                    <option value="ITI1100">ITI1100</option>
                                                    <option value="CS101">CS101</option>
                                                    <option value="MATH150">MATH150</option>
                                                </>
                                            )}
                                            {key === "type" && (
                                                <>
                                                    <option value="">Select Type</option>
                                                    <option value="academic">Academic</option>
                                                    <option value="career">Career</option>
                                                    <option value="technical">Technical</option>
                                                </>
                                            )}
                                            {key === "format" && (
                                                <>
                                                    <option value="">Select Format</option>
                                                    <option value="video">Video</option>
                                                    <option value="pdf">PDF</option>
                                                    <option value="website">Website</option>
                                                </>
                                            )}
                                            {key === "language" && (
                                                <>
                                                    <option value="">Select Language</option>
                                                    <option value="english">English</option>
                                                    <option value="french">French</option>
                                                </>
                                            )}
                                            {key === "tier" && (
                                                <>
                                                    <option value="">Select Tier</option>
                                                    <option value="A">Tier A</option>
                                                    <option value="B">Tier B</option>
                                                    <option value="C">Tier C</option>
                                                    <option value="D">Tier D</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            className="flex items-center gap-2 uppercase text-thistle"
                            onClick={toggleSortDropdown}
                        >
                            Sort <span className="text-xl">▾</span>
                        </button>
                        {isSortOpen && (
                            <div className="absolute right-0 z-10 mt-1 w-72 rounded bg-gradient-to-r from-blueviolet-100 to-darkmagenta p-2 text-thistle shadow-md">
                                <div className="mb-2">
                                    <label htmlFor="sort" className="block text-sm">
                                        Sort by
                                    </label>
                                    <select
                                        id="sort"
                                        value={sortOption}
                                        onChange={handleSortChange}
                                        className="w-full rounded border bg-gray-100 p-1 text-thistle"
                                    >
                                        <option value="relevance">Relevance</option>
                                        <option value="rating">Most Highly Rated</option>
                                        <option value="alphabetical">Alphabetical Order</option>
                                        <option value="recent">Most Recently Added</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilterBar;
