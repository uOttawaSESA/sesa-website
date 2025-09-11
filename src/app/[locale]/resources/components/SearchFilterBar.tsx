import { Trash } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { ResourceFilters, ResourceSorts } from "@/server/api/routers/resource";

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
    searchTerm: string | null;
    setSearchTerm: (term: string | null) => void;
    filterOptions: ResourceFilters;
    setFilterOptions: (options: ResourceFilters) => void;
    sortOption: ResourceSorts;
    setSortOption: (option: ResourceSorts) => void;
    isMobile: boolean;
    availableCourses: readonly string[];
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

    const [openDropdown, setOpenDropdown] = useState<null | "view" | "filter" | "sort" | "mobile">(
        null,
    );

    useEffect(() => {
        if (isGridMode) {
            setRowsToShow(isMobile ? 3 : 2);
        } else {
            setRowsToShow(6);
        }
    }, [isGridMode, isMobile, setRowsToShow]);

    const availableCoursesMapped = useMemo(
        () => availableCourses.map(course => ({ label: course, value: course })),
        [availableCourses],
    );

    const filterDropdownOptions: Record<
        keyof ResourceFilters,
        Array<{ label: string; value: string | number }>
    > = {
        course: availableCoursesMapped,
        category: [
            { label: t("filter_academic"), value: "academic" },
            { label: t("filter_career"), value: "career" },
            { label: t("filter_technical"), value: "technical" },
        ],
        format: [
            { label: t("filter_video"), value: "video" },
            { label: t("filter_textbook"), value: "textbook" },
            { label: t("filter_website"), value: "website" },
            { label: t("filter_blog"), value: "blog" },
            { label: t("filter_article"), value: "article" },
        ],
        locale: [
            { label: t("filter_english"), value: "en" },
            { label: t("filter_french"), value: "fr" },
        ],
        tier: [
            { label: t("filter_tier_s"), value: 0 },
            { label: t("filter_tier_a"), value: 1 },
            { label: t("filter_tier_b"), value: 2 },
            { label: t("filter_tier_c"), value: 3 },
        ],
    };

    const filterPlaceholders: Record<keyof ResourceFilters, string> = {
        course: t("filter_placeholder_course"),
        category: t("filter_placeholder_category"),
        format: t("filter_placeholder_format"),
        locale: t("filter_placeholder_language"),
        tier: t("filter_placeholder_tier"),
    };

    const hasActiveFilters = Object.values(filterOptions).some(value => value !== "");

    const changeView = (value: "grid" | "row") => {
        setIsGridMode(value === "grid");
        setOpenDropdown(null);
    };

    const handleSortChange = (value: ResourceSorts) => {
        setSortOption(value);
        setOpenDropdown(null);
    };

    const handleFilterChange = (key: keyof ResourceFilters, value: string) => {
        let realValue: string | number = value;
        if (key === "tier") realValue = parseInt(value, 10);
        setFilterOptions({
            ...filterOptions,
            [key]: realValue === "$none" ? undefined : realValue,
        });
    };

    const clearAllFilters = () => {
        setFilterOptions({});
    };

    return (
        <div className="z-40 mb-8 p-px">
            <div className="flex flex-col outline-gradient bg-gray-100 p-4 md:flex-row md:items-center md:justify-between">
                {/* Search */}
                <div className="flex w-full flex-1 items-center gap-4 text-white">
                    <Image
                        src="/resources-page/search.svg"
                        alt="Search"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                    />
                    <input
                        type="text"
                        value={searchTerm || ""}
                        onChange={e => setSearchTerm(e.target.value)}
                        // onKeyDown={e => {
                        //     if (e.key === 'Enter') setSearchTerm(pendingSearch || null)
                        // }}
                        placeholder={t("search_placeholder")}
                        className="w-full bg-transparent font-sans md:text-base placeholder-white focus:outline-none"
                    />
                </div>

                {/* Desktop Controls */}
                {!isMobile && (
                    <div className="ml-4 mt-4 flex gap-8 md:mt-0">
                        {/* View Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                className="flex items-center gap-2 uppercase text-white"
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "view" ? null : "view")
                                }
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
                                            <SelectTrigger className="w-full text-thistle">
                                                <SelectValue placeholder="Grid" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="grid">
                                                        {t("view_grid")}
                                                    </SelectItem>
                                                    <SelectItem value="row">
                                                        {t("view_row")}
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {isGridMode && (
                                            <Select
                                                value={rowsToShow?.toString()}
                                                onValueChange={value =>
                                                    setRowsToShow(parseInt(value, 10))
                                                }
                                            >
                                                <SelectTrigger className="mt-2 w-full text-thistle">
                                                    <SelectValue placeholder="Rows" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
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

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={clearAllFilters}
                                className="flex items-center gap-2 uppercase text-white transition-colors hover:text-white"
                            >
                                {t("clear_filters")}
                                <Trash size={14} />
                            </button>
                        )}

                        {/* Filter Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
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
                                <div className="absolute right-0 z-30 mt-2 min-w-[18rem]">
                                    <div
                                        className={`${gradientBorderClass} animate-dropdown bg-[rgba(27,27,27,0.3)] p-4 backdrop-blur-3xl backdrop-saturate-150`}
                                    >
                                        {(
                                            [
                                                "course",
                                                "category",
                                                "format",
                                                "locale",
                                                "tier",
                                            ] as Array<keyof ResourceFilters>
                                        ).map(key => (
                                            <div className="mb-4 last:mb-0" key={key}>
                                                <label
                                                    className="mb-2 block font-heading text-sm uppercase text-white"
                                                    htmlFor={key}
                                                >
                                                    {filterPlaceholders[key]}
                                                </label>
                                                <Select
                                                    value={filterOptions[key]?.toString()}
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
                                                            {filterDropdownOptions[key].map(
                                                                option => (
                                                                    <SelectItem
                                                                        key={option.value}
                                                                        value={option.value.toString()}
                                                                    >
                                                                        {option.label}
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                className="flex items-center gap-2 uppercase text-white"
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "sort" ? null : "sort")
                                }
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
                                        <Select
                                            value={sortOption}
                                            onValueChange={(value: ResourceSorts) =>
                                                handleSortChange(value)
                                            }
                                        >
                                            <SelectTrigger className="w-full text-thistle">
                                                <SelectValue placeholder="Sort" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="created_asc">
                                                        {t("sort_created_asc")}
                                                    </SelectItem>
                                                    <SelectItem value="created_desc">
                                                        {t("sort_created_desc")}
                                                    </SelectItem>
                                                    <SelectItem value="updated_asc">
                                                        {t("sort_updated_asc")}
                                                    </SelectItem>
                                                    <SelectItem value="updated_desc">
                                                        {t("sort_updated_desc")}
                                                    </SelectItem>
                                                    <SelectItem value="tier_asc">
                                                        {t("sort_tier_asc")}
                                                    </SelectItem>
                                                    <SelectItem value="tier_desc">
                                                        {t("sort_tier_desc")}
                                                    </SelectItem>
                                                    <SelectItem value="alphabetical_asc">
                                                        {t("sort_alphabetical_asc")}
                                                    </SelectItem>
                                                    <SelectItem value="alphabetical_desc">
                                                        {t("sort_alphabetical_desc")}
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile: Unified Dropdown */}
            {isMobile && (
                <div className="relative mt-2 w-full">
                    <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-md border outline-gradient bg-black/40 px-4 py-2 text-sm uppercase text-white"
                        onClick={() => setOpenDropdown(openDropdown === "mobile" ? null : "mobile")}
                    >
                        {t("filter_label")} & {t("sort_label")}
                        <Image
                            src="/contact-page/arrows.svg"
                            alt="Dropdown Arrow"
                            width={16}
                            height={16}
                            className={`transition-transform duration-200 ${openDropdown === "mobile" ? "rotate-180" : ""}`}
                        />
                    </button>

                    {openDropdown === "mobile" && (
                        <div
                            className={`${gradientBorderClass} absolute left-0 right-0 z-50 mt-2 rounded-md p-4 backdrop-blur-3xl`}
                        >
                            {/* Sort */}
                            <div className="mb-6">
                                <p className="mb-2 font-sans text-sm uppercase text-white">
                                    {t("sort_label")}
                                </p>
                                <Select
                                    value={sortOption}
                                    onValueChange={(value: ResourceSorts) =>
                                        handleSortChange(value)
                                    }
                                >
                                    <SelectTrigger className="w-full text-thistle">
                                        <SelectValue placeholder="Sort" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
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

                            {/* Filters */}
                            <div>
                                <p className="mb-2 font-sans text-sm uppercase text-white">
                                    {t("filter_label")}
                                </p>
                                {(Object.keys(filterOptions) as Array<keyof ResourceFilters>).map(
                                    key => (
                                        <div className="mb-3 last:mb-0" key={key}>
                                            <label
                                                className="mb-1 block text-xs font-heading uppercase text-thistle"
                                                htmlFor={key}
                                            >
                                                {filterPlaceholders[key]}
                                            </label>
                                            <Select
                                                value={filterOptions[key]?.toString()}
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
                                                        {filterDropdownOptions[key].map(option => (
                                                            <SelectItem
                                                                key={option.value}
                                                                value={option.value.toString()}
                                                            >
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
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
            )}

            {hasActiveFilters && isMobile && (
                <div className="w-full flex justify-center">
                    <button
                        type="button"
                        onClick={clearAllFilters}
                        className="flex items-center justify-center text-center gap-2 mt-4 uppercase text-white text-sm transition-colors hover:text-white"
                    >
                        {t("clear_filters")}
                        <Trash size={14} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchFilterBar;
