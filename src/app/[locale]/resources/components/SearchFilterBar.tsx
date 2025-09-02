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
    category: string;
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

    // Only one dropdown open at a time
    const [openDropdown, setOpenDropdown] = useState<null | "view" | "filter" | "sort">(null);

    useEffect(() => {
        if (isGridMode) {
            setRowsToShow(isMobile ? 3 : 2);
        } else {
            setRowsToShow(6);
        }
    }, [isGridMode, isMobile, setRowsToShow]);

    const filterDropdownOptions: Record<keyof FilterOptions, { label: string; value: string }[]> = {
        course: availableCourses,
        category: [
            { label: t("filter_academic"), value: "Academic" },
            { label: t("filter_career"), value: "Career" },
            { label: t("filter_technical"), value: "Technical" },
        ],
        format: [
            { label: t("filter_video"), value: "video" },
            { label: t("filter_textbook"), value: "textbook" },
            { label: t("filter_website"), value: "website" },
            { label: t("filter_blog"), value: "blog" },
            { label: t("filter_article"), value: "article" },
        ],
        language: [
            { label: t("filter_english"), value: "english" },
            { label: t("filter_french"), value: "french" },
            { label: t("filter_bilingual"), value: "bilingual" },
        ],
        tier: [
            { label: t("filter_tier_s"), value: "S" },
            { label: t("filter_tier_a"), value: "A" },
            { label: t("filter_tier_b"), value: "B" },
            { label: t("filter_tier_c"), value: "C" },
        ],
    };

    // Placeholder text for each filter
    const filterPlaceholders: Record<keyof FilterOptions, string> = {
        course: t("filter_placeholder_course"),
        category: t("filter_placeholder_category"),
        format: t("filter_placeholder_format"),
        language: t("filter_placeholder_language"),
        tier: t("filter_placeholder_tier"),
    };

    // Check if any filters are active
    const hasActiveFilters = Object.values(filterOptions).some(value => value !== "");

    const changeView = (value: "grid" | "row") => {
        setIsGridMode(value === "grid");
        setOpenDropdown(null);
    };

    const handleSortChange = (value: string) => {
        setSortOption(value);
        setOpenDropdown(null);
    };

    const handleFilterChange = (key: keyof FilterOptions, value: string) => {
        setFilterOptions({
            ...filterOptions,
            [key]: value === "$none" ? "" : value,
        });
    };

    const clearAllFilters = () => {
        setFilterOptions({
            course: "",
            category: "",
            format: "",
            language: "",
            tier: "",
        });
    };

    return (
        <div className="z-40 mb-8 bg-gradient-to-r from-blueviolet-100 to-darkmagenta p-px">
            <div className="flex items-center justify-between bg-gray-100 p-4">
                <div className="flex flex-1 items-center gap-4 text-white">
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
                        className="w-full bg-transparent font-sans text-base placeholder-white focus:outline-none"
                    />
                </div>

                <div className="ml-4 flex gap-8">
                    {/* View Dropdown */}
                    {!isMobile && (
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 uppercase text-white"
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "view" ? null : "view")
                                }
                                aria-label="View"
                            >
                                <Image
                                    src="/resources-page/view.svg"
                                    alt="View"
                                    width={18}
                                    height={18}
                                />
                                {t("view_label")}
                                <Image
                                    src="/contact-page/arrows.svg"
                                    alt="Dropdown Arrow"
                                    width={16}
                                    height={16}
                                    className={`transition-transform duration-200 ${openDropdown === "view" ? "rotate-180" : ""}`}
                                />
                            </button>
                            {openDropdown === "view" && (
                                <div className="absolute right-0 z-50 mt-2 min-w-[14rem]">
                                    <div
                                        className={`${gradientBorderClass} animate-dropdown bg-[rgba(27,27,27,0.3)] p-4 backdrop-blur-md backdrop-saturate-150`}
                                    >
                                        <Select
                                            value={isGridMode ? "grid" : "row"}
                                            onValueChange={changeView}
                                        >
                                            <SelectTrigger className="w-full text-white">
                                                <SelectValue placeholder="Grid" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel className="text-white">
                                                        {t("view_label")}
                                                    </SelectLabel>
                                                    <SelectItem value="grid">
                                                        <span className="flex items-center gap-2">
                                                            <Image
                                                                src="/resources-page/view.svg"
                                                                width={14}
                                                                height={14}
                                                                alt="Grid"
                                                            />
                                                            {t("view_grid")}
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="row">
                                                        <span className="flex items-center gap-2">
                                                            <Image
                                                                src="/resources-page/view.svg"
                                                                width={14}
                                                                height={14}
                                                                alt="Rows"
                                                            />
                                                            {t("view_row")}
                                                        </span>
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {isGridMode && (
                                            <Select
                                                value={rowsToShow?.toString()}
                                                onValueChange={value =>
                                                    setRowsToShow(parseInt(value))
                                                }
                                            >
                                                <SelectTrigger className="mt-2 w-full text-white">
                                                    <SelectValue placeholder="Rows" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel className="text-white">
                                                            {t("view_row")}
                                                        </SelectLabel>
                                                        {[1, 2, 3, 4, 5].map(rows => (
                                                            <SelectItem
                                                                key={rows}
                                                                value={rows.toString()}
                                                            >{`${rows} ${rows === 1 ? t("view_row") : t("n_rows")}`}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Clear Filters Button - Only show if filters are active */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="flex items-center gap-2 uppercase text-thistle transition-colors hover:text-white"
                            title="Clear all filters"
                        >
                            {t("clear_filters")}
                            <Trash size={14} />
                        </button>
                    )}

                    {/* Filter Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center gap-2 uppercase text-white"
                            onClick={() =>
                                setOpenDropdown(openDropdown === "filter" ? null : "filter")
                            }
                        >
                            <Image
                                src="/resources-page/filter.svg"
                                alt="Filter"
                                width={18}
                                height={18}
                            />
                            {hasActiveFilters ? t("filters_active_label") : t("filter_label")}
                            <Image
                                src="/contact-page/arrows.svg"
                                alt="Dropdown Arrow"
                                width={16}
                                height={16}
                                className={`transition-transform duration-200 ${openDropdown === "filter" ? "rotate-180" : ""}`}
                            />
                        </button>
                        {openDropdown === "filter" && (
                            <div className="absolute -right-20 z-30 mt-2 min-w-[18rem]">
                                <div
                                    className={`${gradientBorderClass} animate-dropdown bg-[rgba(27,27,27,0.3)] p-4 backdrop-blur-3xl backdrop-saturate-150`}
                                >
                                    {/* Clear All Button inside dropdown */}
                                    {hasActiveFilters && (
                                        <div className="mb-4 flex justify-end">
                                            <button
                                                onClick={clearAllFilters}
                                                className="text-sm uppercase text-thistle underline transition-colors hover:text-white"
                                            >
                                                {t("clear_all")}
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
                                                    <SelectTrigger className="w-full text-white">
                                                        <SelectValue
                                                            placeholder={filterPlaceholders[key]}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel className="text-white">
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

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center gap-2 uppercase text-white"
                            onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
                        >
                            <Image
                                src="/resources-page/sort-arrows.svg"
                                alt="Sort"
                                width={18}
                                height={18}
                            />
                            {t("sort_label")}
                            <Image
                                src="/contact-page/arrows.svg"
                                alt="Dropdown Arrow"
                                width={16}
                                height={16}
                                className={`transition-transform duration-200 ${openDropdown === "sort" ? "rotate-180" : ""}`}
                            />
                        </button>
                        {openDropdown === "sort" && (
                            <div className="absolute right-0 z-50 mt-2 min-w-[14rem]">
                                <div
                                    className={`${gradientBorderClass} animate-dropdown bg-[rgba(27,27,27,0.3)] p-4 backdrop-blur-md backdrop-saturate-150`}
                                >
                                    <Select value={sortOption} onValueChange={handleSortChange}>
                                        <SelectTrigger className="w-full text-white">
                                            <SelectValue placeholder="Sort" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel className="text-white">
                                                    {t("sort_label")}
                                                </SelectLabel>
                                                <SelectItem value="relevance">
                                                    {t("sort_item_relevance")}
                                                </SelectItem>
                                                <SelectItem value="alphabetical">
                                                    {t("sort_item_alphabetical")}
                                                </SelectItem>
                                                <SelectItem value="tier (worst to best)">
                                                    {t("sort_tier_worst_best")}
                                                </SelectItem>
                                                <SelectItem value="tier (best to worst)">
                                                    {t("sort_tier_best_worst")}
                                                </SelectItem>
                                                <SelectItem value="last updated">
                                                    {t("sort_last_updated")}
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
