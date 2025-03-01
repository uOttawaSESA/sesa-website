import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Dropdown from "@/components/Dropdown";
import RowSelector from "../components/RowSelector";

const gradientBorderClass = `
    border-[1px]
    border-solid
    [border-image:linear-gradient(55deg,rgba(136,36,220,0.7)_41.93%,rgba(177,33,157,0.7)_81.89%)_1]
`;

interface SearchFilterBarProps {
    isGridMode: boolean;
    setIsGridMode: (mode: boolean) => void;
    rowsToShow: number;
    setRowsToShow: (rows: number) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterOptions: {
        course: string;
        type: string;
        format: string;
        language: string;
        tier: string;
    };
    setFilterOptions: (options: {
        course: string;
        type: string;
        format: string;
        language: string;
        tier: string;
    }) => void;
    sortOption: string; // Add this
    setSortOption: (option: string) => void; // Add this
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
    isGridMode,
    setIsGridMode,
    rowsToShow,
    setRowsToShow,
    searchTerm,
    setSearchTerm,
    filterOptions,
    setFilterOptions,
    sortOption, // Destructure sortOption
    setSortOption, // Destructure setSortOption
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
    const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
    const [isRowSelectorOpen, setIsRowSelectorOpen] = useState<boolean>(false);

    const filterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<HTMLDivElement>(null);
    const rowSelectorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
            if (viewRef.current && !viewRef.current.contains(event.target as Node)) {
                setIsViewOpen(false);
            }
            if (rowSelectorRef.current && !rowSelectorRef.current.contains(event.target as Node)) {
                setIsRowSelectorOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, key: string) => {
        setFilterOptions({ ...filterOptions, [key]: e.target.value });
        setIsFilterOpen(false);
    };

    const handleSortChange = (value: string) => {
        setSortOption(value); // Use setSortOption from props
        setIsSortOpen(false);
    };

    const toggleFilterDropdown = () => {
        setIsFilterOpen(!isFilterOpen);
        if (isSortOpen) setIsSortOpen(false);
        if (isViewOpen) setIsViewOpen(false);
        if (isRowSelectorOpen) setIsRowSelectorOpen(false);
    };

    const toggleSortDropdown = () => {
        setIsSortOpen(!isSortOpen);
        if (isFilterOpen) setIsFilterOpen(false);
        if (isViewOpen) setIsViewOpen(false);
        if (isRowSelectorOpen) setIsRowSelectorOpen(false);
    };

    const toggleViewDropdown = () => {
        setIsViewOpen(!isViewOpen);
        if (isFilterOpen) setIsFilterOpen(false);
        if (isSortOpen) setIsSortOpen(false);
        if (isRowSelectorOpen) setIsRowSelectorOpen(false);
    };

    const toggleRowSelector = () => {
        setIsRowSelectorOpen(!isRowSelectorOpen);
        if (isFilterOpen) setIsFilterOpen(false);
        if (isSortOpen) setIsSortOpen(false);
        if (isViewOpen) setIsViewOpen(false);
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
                    {/* View Dropdown */}
                    <div className="relative" ref={viewRef}>
                        <button
                            className="flex items-center gap-2 uppercase text-thistle"
                            onClick={toggleViewDropdown}
                        >
                            View
                            <Image
                                src="/contact-page/arrows.svg"
                                alt="View Arrow"
                                width={16}
                                height={16}
                                className={`transition-transform duration-200 ${
                                    isViewOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {isViewOpen && (
                            <div className="absolute right-0 z-50 mt-2 min-w-[5rem]">
                                <div
                                    className={`${gradientBorderClass} bg-[rgba(27,27,27,0.3)] backdrop-blur-md backdrop-saturate-150`}
                                >
                                    <button
                                        onClick={() => {
                                            setIsGridMode(true);
                                            setIsViewOpen(false);
                                        }}
                                        className="w-full px-6 py-3 text-left font-heading text-base uppercase text-white transition-colors duration-200 hover:bg-[rgba(27,27,27,0.4)]"
                                    >
                                        Grid
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsGridMode(false);
                                            setIsViewOpen(false);
                                        }}
                                        className="w-full px-6 py-3 text-left font-heading text-base uppercase text-white transition-colors duration-200 hover:bg-[rgba(27,27,27,0.4)]"
                                    >
                                        Row
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Row Selector */}
                    {isGridMode && (
                        <div ref={rowSelectorRef}>
                            <RowSelector
                                rowsToShow={rowsToShow}
                                setRowsToShow={setRowsToShow}
                                isOpen={isRowSelectorOpen}
                                toggleDropdown={toggleRowSelector}
                            />
                        </div>
                    )}

                    {/* Filter Button */}
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
                                                onChange={e => handleFilterChange(e, key)}
                                                className="w-full bg-[rgba(27,27,27,0.05)] px-3 py-2 font-heading text-base uppercase text-white focus:outline-none"
                                            >
                                                {key === "course" && (
                                                    <>
                                                        <option value="">Select Course</option>
                                                        <option value="ITI1100">ITI1100</option>
                                                        <option value="CS101">CS101</option>
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
                                                        <option value="S">Tier S</option>
                                                        <option value="A">Tier A</option>
                                                        <option value="B">Tier B</option>
                                                        <option value="C">Tier C</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sort Button */}
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
