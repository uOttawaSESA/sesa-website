import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Dropdown from "@/components/Dropdown";
import RowSelector from "../components/RowSelector";
import { useTranslations } from "next-intl";

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
    sortOption: string;
    setSortOption: (option: string) => void;
    isMobile: boolean;
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
    sortOption,
    setSortOption,
    isMobile,
}) => {
    const t = useTranslations("resources");

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
    const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
    const [isRowSelectorOpen, setIsRowSelectorOpen] = useState<boolean>(false);

    // Track which filter dropdown is open
    const [openFilterDropdown, setOpenFilterDropdown] = useState<string | null>(null);

    const filterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<HTMLDivElement>(null);
    const rowSelectorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
                setOpenFilterDropdown(null);
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

    // Dropdown options for each filter
    const filterDropdownOptions: Record<string, { label: string; value: string }[]> = {
        course: [
            { label: "Select Course", value: "" },
            { label: "ITI1100", value: "ITI1100" },
            { label: "CS101", value: "CS101" },
        ],
        type: [
            { label: "Select Type", value: "" },
            { label: "Academic", value: "academic" },
            { label: "Career", value: "career" },
            { label: "Technical", value: "technical" },
        ],
        format: [
            { label: "Select Format", value: "" },
            { label: "Video", value: "video" },
            { label: "PDF", value: "pdf" },
            { label: "Website", value: "website" },
        ],
        language: [
            { label: "Select Language", value: "" },
            { label: "English", value: "english" },
            { label: "French", value: "french" },
        ],
        tier: [
            { label: "Select Tier", value: "" },
            { label: "Tier S", value: "S" },
            { label: "Tier A", value: "A" },
            { label: "Tier B", value: "B" },
            { label: "Tier C", value: "C" },
        ],
    };

    // Handler for filter dropdown selection
    const handleDropdownFilterChange = (key: string, value: string) => {
        setFilterOptions({ ...filterOptions, [key]: value });
        setOpenFilterDropdown(null);
    };

    const handleSortChange = (value: string) => {
        setSortOption(value);
        setIsSortOpen(false);
    };

    const toggleFilterDropdown = () => {
        setIsFilterOpen(!isFilterOpen);
        setOpenFilterDropdown(null);
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
                        placeholder={t("search_placeholder")}
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
                                    className={`${gradientBorderClass} animate-dropdown bg-[rgba(27,27,27,0.3)] backdrop-blur-md backdrop-saturate-150`}
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
                    {isGridMode && !isMobile && (
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
                                    className={`${gradientBorderClass} animate-dropdown bg-[rgba(27,27,27,0.3)] p-4 backdrop-blur-md backdrop-saturate-150`}
                                >
                                    {Object.entries(filterOptions).map(([key, value]) => (
                                        <div className="mb-4 last:mb-0" key={key}>
                                            <label
                                                htmlFor={key}
                                                className="mb-2 block font-heading text-base uppercase text-white"
                                            >
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </label>
                                            <button
                                                type="button"
                                                className="w-full rounded border border-thistle bg-transparent px-6 py-3 text-left font-heading text-base uppercase text-white transition-colors duration-200 hover:bg-[rgba(27,27,27,0.2)]"
                                                onClick={() =>
                                                    setOpenFilterDropdown(
                                                        openFilterDropdown === key ? null : key,
                                                    )
                                                }
                                            >
                                                {filterDropdownOptions[key].find(
                                                    opt => opt.value === value,
                                                )?.label || filterDropdownOptions[key][0].label}
                                                <span className="float-right">
                                                    <Image
                                                        src="/contact-page/arrows.svg"
                                                        alt="Dropdown Arrow"
                                                        width={16}
                                                        height={16}
                                                        className={`inline transition-transform duration-200 ${
                                                            openFilterDropdown === key
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                </span>
                                            </button>
                                            {openFilterDropdown === key && (
                                                <div className="relative z-50">
                                                    <div className="absolute left-0 right-0 mt-2 min-w-full">
                                                        <div
                                                            className={`${gradientBorderClass} animate-dropdown bg-[rgba(27,27,27,1)] backdrop-blur-md backdrop-saturate-150`}
                                                        >
                                                            {filterDropdownOptions[key].map(
                                                                option => (
                                                                    <button
                                                                        key={option.value}
                                                                        className="w-full px-6 py-3 text-left font-heading text-base uppercase text-white transition-colors duration-200 hover:bg-[rgba(27,27,27,0.4)]"
                                                                        onClick={() => {
                                                                            handleDropdownFilterChange(
                                                                                key,
                                                                                option.value,
                                                                            );
                                                                        }}
                                                                    >
                                                                        {option.label}
                                                                    </button>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
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
