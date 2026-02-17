"use client";
import { useTranslations } from "next-intl";
import {
    createParser,
    parseAsString,
    parseAsStringLiteral,
    useQueryState,
    useQueryStates,
} from "nuqs";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks";
import type { ResourceFilters, ResourceSorts } from "@/server/api/routers/resource";
import { api } from "@/trpc/react";
import ResourceList from "./ResourceList";
import SearchFilterBar from "./SearchFilterBar";

const TIER_MAP = ["S", "A", "B", "C", "D", "E", "F"] as const;
const REVERSE_TIER_MAP = {
    S: 0,
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
} as const;

const parseAsTier = createParser<0 | 1 | 2 | 3 | 4 | 5 | 6>({
    parse(value) {
        if (value in REVERSE_TIER_MAP)
            return REVERSE_TIER_MAP[value as keyof typeof REVERSE_TIER_MAP];
        return null;
    },

    serialize(value) {
        return TIER_MAP[value];
    },
});

const ResourceSection = () => {
    const t = useTranslations("resources");

    const [isGridMode, setIsGridMode] = useState(true);
    // The query search term is dependent on the debounced search term,
    // but is still used at first to set the initial value of the base search term
    const [querySearchTerm, setQuerySearchTerm] = useQueryState("search");
    const [searchTerm, setSearchTerm] = useState<string | null>(querySearchTerm);

    const debouncedSearchTerm = useDebounce(searchTerm || null, 300);
    // This is likely to cause a double-rerender when the search term changes,
    // but it's most straightforward way I could find to keep the values in sync
    useEffect(
        () => void setQuerySearchTerm(debouncedSearchTerm),
        [debouncedSearchTerm, setQuerySearchTerm],
    );

    const [filterOptions, setFilterOptions] = useQueryStates({
        course: parseAsString,
        category: parseAsString,
        format: parseAsString,
        locale: parseAsStringLiteral(["en", "fr"] as const),
        tier: parseAsTier,
    }) satisfies [ResourceFilters, unknown];

    const [sortOption, setSortOption] = useQueryState<ResourceSorts>(
        "sort",
        parseAsStringLiteral([
            "created_asc",
            "created_desc",
            "updated_asc",
            "updated_desc",
            "tier_asc",
            "tier_desc",
            "alphabetical_asc",
            "alphabetical_desc",
        ]).withDefault("created_desc"),
    );
    const [isMobile, setIsMobile] = useState(false);

    const { isPending, isFetching, hasNextPage, error, data, fetchNextPage } =
        api.resource.getCursorPage.useInfiniteQuery(
            {
                search: debouncedSearchTerm,
                filters: filterOptions,
                sort: sortOption,
            },
            {
                getPreviousPageParam: lastPage => lastPage.prevCursor,
                getNextPageParam: lastPage => lastPage.nextCursor,
            },
        );
    const resources = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(page => page.data);
    }, [data]);

    const { data: availableCoursesData } = api.resource.getUniqueCourses.useQuery();

    /** The available courses as a sorted list, or an empty list if data is unavailable. */
    const availableCourses = useMemo(
        () => availableCoursesData?.sort() ?? [],
        [availableCoursesData],
    );

    // Detect mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize(); // Run on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* Pass state and handlers to SearchFilterBar */}
            <SearchFilterBar
                isGridMode={isGridMode}
                setIsGridMode={setIsGridMode}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions as (options: ResourceFilters) => void}
                sortOption={sortOption}
                setSortOption={setSortOption}
                isMobile={isMobile}
                availableCourses={availableCourses}
            />

            {isPending ? (
                <div className="flex w-full items-center justify-center py-12">
                    <p className="rounded-md px-4 py-2 font-sans text-violet-400">
                        {t("query_state.pending")}
                    </p>
                </div>
            ) : error ? (
                <div className="flex w-full items-center justify-center py-12">
                    <p className="rounded-md px-4 py-2 font-sans text-red-400">
                        {t("query_state.error")}:{" "}
                        <span className="font-semibold">{error.message}</span>
                    </p>
                </div>
            ) : (
                <>
                    {/* Resources Grid or Row */}
                    {resources.length > 0 ? (
                        <ResourceList
                            currentResources={resources}
                            isGridMode={isGridMode}
                            isFetching={isFetching}
                            hasNextPage={hasNextPage}
                            fetchNextPage={fetchNextPage}
                            setFilterOptions={
                                setFilterOptions as (options: ResourceFilters) => void
                            }
                            filterOptions={filterOptions}
                        />
                    ) : (
                        <div className="flex h-16 items-center justify-center">
                            <h1 className="font-bold font-heading text-white text-xl">
                                No results were found matching this search!
                            </h1>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default ResourceSection;
