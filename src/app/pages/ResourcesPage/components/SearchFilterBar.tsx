import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Dropdown from "@/components/Dropdown";

const gradientBorderClass = `
    border-[1px]
    border-solid
    [border-image:linear-gradient(55deg,rgba(136,36,220,0.7)_41.93%,rgba(177,33,157,0.7)_81.89%)_1]
`;

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

    const filterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        key: keyof typeof filterOptions,
    ) => {
        setFilterOptions({ ...filterOptions, [key]: e.target.value });
        setIsFilterOpen(false); // Close filter dropdown after selection
    };

    const handleSortChange = (value: string) => {
        setSortOption(value);
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
                    <div className="relative" ref={filterRef}>
                        <button
                            className="flex items-center gap-2 uppercase text-thistle"
                            onClick={toggleFilterDropdown}
                        >
                            {Object.values(filterOptions).some(value => value !== "")
                                ? "Filters Active"
                                : "Filter"}
                            <Image
                                src="/contact-page/arrows.svg"
                                alt="Filter Arrow"
                                width={16}
                                height={16}
                                className={`transition-transform duration-200 ${
                                    isFilterOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {isFilterOpen && (
                            <div className="absolute right-0 z-50 mt-2 min-w-[18rem]">
                                <div
                                    className={`${gradientBorderClass} bg-[rgba(27,27,27,0.3)] p-4 backdrop-blur-md backdrop-saturate-150`}
                                >
                                    {Object.entries(filterOptions).map(([key, value]) => (
                                        <div className="mb-4 last:mb-0" key={key}>
                                            <label
                                                htmlFor={key}
                                                className="mb-2 block font-heading text-base uppercase text-white"
                                            >
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
                                                className="w-full bg-[rgba(27,27,27,0.05)] px-3 py-2 font-heading text-base uppercase text-white focus:outline-none"
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
                            </div>
                        )}
                    </div>

                    <div className="relative" ref={sortRef}>
                        <button
                            className="flex items-center gap-2 uppercase text-thistle"
                            onClick={toggleSortDropdown}
                        >
                            {sortOption === "relevance"
                                ? "Relevance"
                                : sortOption === "rating"
                                  ? "Most Highly Rated"
                                  : sortOption === "alphabetical"
                                    ? "Alphabetical Order"
                                    : sortOption === "recent"
                                      ? "Most Recently Added"
                                      : "Sort"}
                            <Image
                                src="/contact-page/arrows.svg"
                                alt="Sort Arrow"
                                width={16}
                                height={16}
                                className={`transition-transform duration-200 ${
                                    isSortOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        <Dropdown
                            items={[
                                {
                                    label: "Relevance",
                                    value: "relevance",
                                    onClick: () => handleSortChange("relevance"),
                                },
                                {
                                    label: "Most Highly Rated",
                                    value: "rating",
                                    onClick: () => handleSortChange("rating"),
                                },
                                {
                                    label: "Alphabetical Order",
                                    value: "alphabetical",
                                    onClick: () => handleSortChange("alphabetical"),
                                },
                                {
                                    label: "Most Recently Added",
                                    value: "recent",
                                    onClick: () => handleSortChange("recent"),
                                },
                            ]}
                            isOpen={isSortOpen}
                            onItemClick={onClick => onClick()}
                            buttonClassName="w-full px-6 py-3 text-left font-heading text-base uppercase text-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilterBar;
