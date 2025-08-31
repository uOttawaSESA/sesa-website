import Image from "next/image";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
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

interface FilterOptions {
    course: string;
    type: string;
    format: string;
    language: string;
    tier: string;
}

interface SearchFilterBarProps {
    isGridMode: boolean;
    setIsGridMode: (mode: boolean) => void;
    rowsToShow: number;
    setRowsToShow: (rows: number) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterOptions: FilterOptions;
    setFilterOptions: (options: FilterOptions) => void;
    sortOption: string;
    setSortOption: (option: string) => void;
    isMobile: boolean;
    availableCourses: { label: string; value: string }[];
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
    isGridMode = true,
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
    availableCourses,
}) => {
    const t = useTranslations("resources");

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    // Auto-adjust rows based on grid mode
    useEffect(() => {
        if (isGridMode) {
            if (isMobile) {
                setRowsToShow(3);
            } else {
                setRowsToShow(2);
            }
        } else {
            setRowsToShow(6);
        }
    }, [isGridMode, isMobile, setRowsToShow]);

    // Dropdown options for each filter
    const filterDropdownOptions: Record<keyof FilterOptions, { label: string; value: string }[]> = {
        course: availableCourses,
        type: [
            { label: "Academic", value: "academic" },
            { label: "Career", value: "career" },
            { label: "Technical", value: "technical" },
        ],
        format: [
            { label: "Video", value: "video" },
            { label: "Textbook", value: "textbook" },
            { label: "Website", value: "website" },
            { label: "Blog", value: "blog" },
            { label: "Article", value: "article" },
        ],
        language: [
            { label: "English", value: "english" },
            { label: "French", value: "french" },
            { label: "Bilingual", value: "bilingual" },
        ],
        tier: [
            { label: "Tier S", value: "S" },
            { label: "Tier A", value: "A" },
            { label: "Tier B", value: "B" },
            { label: "Tier C", value: "C" },
        ],
    };

    // Placeholder text for each filter
    const filterPlaceholders: Record<keyof FilterOptions, string> = {
        course: "Select Course",
        type: "Select Type",
        format: "Select Format",
        language: "Select Language",
        tier: "Select Tier",
    };

    // Check if any filters are active
    const hasActiveFilters = Object.values(filterOptions).some(value => value !== "");

    const changeView = (value: "grid" | "row") => {
        setIsGridMode(value === "grid");
    };

    const handleSortChange = (value: string) => {
        setSortOption(value);
    };

    const toggleFilterDropdown = () => {
        setIsFilterOpen(prev => !prev);
    };

    const handleFilterChange = (key: keyof FilterOptions, value: string) => {
        setFilterOptions({
            ...filterOptions,
            // Done because shadcn/ui Selects don't support empty string values
            [key]: value === "$none" ? "" : value,
        });
    };

    const clearAllFilters = () => {
        setFilterOptions({
            course: "",
            type: "",
            format: "",
            language: "",
            tier: "",
        });
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
                    {/* View Dropdown - Hidden on mobile since grid mode is forced */}
                    {!isMobile && (
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
                    )}

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

                    {/* Clear Filters Button - Only show if filters are active */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="flex items-center gap-2 uppercase text-thistle transition-colors hover:text-white"
                            title="Clear all filters"
                        >
                            Clear Filters
                            <Trash size={14} />
                        </button>
                    )}

                    {/* Filter Button */}
                    <div className="relative">
                        <button
                            className="flex items-center gap-2 uppercase text-thistle"
                            onClick={toggleFilterDropdown}
                        >
                            {hasActiveFilters ? "Filters Active" : "Filter"}
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
                            <div className="absolute right-0 mt-2 min-w-[18rem]">
                                <div
                                    className={`${gradientBorderClass} animate-dropdown bg-[rgba(27,27,27,0.3)] p-4 backdrop-blur-md backdrop-saturate-150`}
                                >
                                    {/* Clear All Button inside dropdown */}
                                    {hasActiveFilters && (
                                        <div className="mb-4 flex justify-end">
                                            <button
                                                onClick={clearAllFilters}
                                                className="text-sm uppercase text-thistle underline transition-colors hover:text-white"
                                            >
                                                Clear All
                                            </button>
                                        </div>
                                    )}

                                    {(Object.keys(filterOptions) as Array<keyof FilterOptions>).map(
                                        key => (
                                            <div className="mb-4 last:mb-0" key={key}>
                                                <label
                                                    htmlFor={key}
                                                    className="mb-2 block font-heading text-base uppercase text-white"
                                                >
                                                    {key}
                                                </label>
                                                <Select
                                                    value={filterOptions[key]}
                                                    onValueChange={value =>
                                                        handleFilterChange(key, value)
                                                    }
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue
                                                            placeholder={filterPlaceholders[key]}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel className="text-thistle">
                                                                {key.charAt(0).toUpperCase() +
                                                                    key.slice(1)}
                                                            </SelectLabel>
                                                            {filterDropdownOptions[key].map(
                                                                option => (
                                                                    <SelectItem
                                                                        key={option.value}
                                                                        value={option.value}
                                                                    >
                                                                        {option.label}
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        ),
                                    )}
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
                                    <SelectItem value="relevance">Relevance</SelectItem>
                                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                                    <SelectItem value="tier (worst to best)">
                                        Tier (worst to best)
                                    </SelectItem>
                                    <SelectItem value="tier (best to worst)">
                                        Tier (best to worst)
                                    </SelectItem>
                                    <SelectItem value="last updated">Last Updated</SelectItem>
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
