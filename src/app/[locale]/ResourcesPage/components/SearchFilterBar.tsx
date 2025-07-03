import Image from "next/image";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

    // Track which filter dropdown is open
    const [openFilterDropdown, setOpenFilterDropdown] = useState<string | null>(null);

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

    const changeView = (value: "grid" | "row") => {
        setIsGridMode(value === "grid");
    };

    // Handler for filter dropdown selection
    const handleDropdownFilterChange = (key: string, value: string) => {
        setFilterOptions({ ...filterOptions, [key]: value });
        setOpenFilterDropdown(null);
    };

    const handleSortChange = (value: string) => {
        setSortOption(value);
    };

    const toggleFilterDropdown = () => {
        setIsFilterOpen(!isFilterOpen);
        setOpenFilterDropdown(null);
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
                    <Select value={isGridMode ? "grid" : "row"} onValueChange={changeView}>
                        <SelectTrigger className="!border-none !px-0 !py-0">
                            <SelectValue placeholder="View" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>View</SelectLabel>
                                <SelectItem value="grid">Grid</SelectItem>
                                <SelectItem value="row">Row</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Row Selector */}
                    {isGridMode && !isMobile && (
                        <Select
                            value={rowsToShow?.toString()}
                            onValueChange={value => setRowsToShow(parseInt(value))}
                        >
                            <SelectTrigger className="!border-none !px-0 !py-0">
                                <SelectValue placeholder="Rows" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Rows</SelectLabel>
                                    {[1, 2, 3, 4, 5].map(rows => (
                                        <SelectItem
                                            key={rows}
                                            value={rows.toString()}
                                        >{`${rows} ${rows === 1 ? "Row" : "Rows"}`}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}

                    {/* Filter Button */}
                    <div className="relative">
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

                    {/* Sort Select */}
                    <div className="relative">
                        <Select value={sortOption} onValueChange={handleSortChange}>
                            <SelectTrigger className="!border-none !px-0 !py-0">
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sort</SelectLabel>
                                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                                    <SelectItem value="rating">Ratings</SelectItem>
                                    <SelectItem value="recent">Recent</SelectItem>
                                    <SelectItem value="relevance">Relevance</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilterBar;
