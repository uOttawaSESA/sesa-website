import { Trash } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
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

    /** Mapping of sort keys to their display values. */
    const sorts = useMemo(
        () =>
            ({
                created_asc: t("sort_created_asc"),
                created_desc: t("sort_created_desc"),
                updated_asc: t("sort_updated_asc"),
                updated_desc: t("sort_updated_desc"),
                tier_asc: t("sort_tier_asc"),
                tier_desc: t("sort_tier_desc"),
                alphabetical_asc: t("sort_alphabetical_asc"),
                alphabetical_desc: t("sort_alphabetical_desc"),
            }) as const satisfies Record<ResourceSorts, string>,
        [t],
    );

    const filterPlaceholders = useMemo(
        () =>
            ({
                course: t("filter_placeholder_course"),
                category: t("filter_placeholder_category"),
                format: t("filter_placeholder_format"),
                locale: t("filter_placeholder_language"),
                tier: t("filter_placeholder_tier"),
            }) as const satisfies Record<keyof ResourceFilters, string>,
        [t],
    );

    const hasActiveFilters = Object.values(filterOptions).some(value => value != null);

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
            [key]: realValue === "$none" ? undefined : realValue,
        });
    };

    const clearAllFilters = () => {
        // Explicitly set all active filters to null
        setFilterOptions(
            Object.keys(filterOptions).reduce((acc, key) => {
                acc[key as keyof ResourceFilters] = null;
                return acc;
            }, {} as ResourceFilters),
        );
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
                                                    {Object.entries(sorts).map(
                                                        ([sort, display]) => (
                                                            <SelectItem key={sort} value={sort}>
                                                                {display}
                                                            </SelectItem>
                                                        ),
                                                    )}
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
                                            <SelectGroup>
                                                {Object.entries(sorts).map(([sort, display]) => (
                                                    <SelectItem key={sort} value={sort}>
                                                        {display}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Filters */}
                            <div>
                                <p className="mb-2 font-sans text-sm uppercase text-white">
                                    {t("filter_label")}
                                </p>
                                {(
                                    Object.keys(filterDropdownOptions) as Array<
                                        keyof ResourceFilters
                                    >
                                ).map(key => (
                                    <div className="mb-3 last:mb-0" key={key}>
                                        <label
                                            className="mb-1 block text-xs font-heading uppercase text-thistle"
                                            htmlFor={key}
                                        >
                                            {filterPlaceholders[key]}
                                        </label>
                                        <Select
                                            value={filterOptions[key]?.toString()}
                                            onValueChange={value => handleFilterChange(key, value)}
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
                                ))}
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
