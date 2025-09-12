"use client";
import { useTranslations } from "next-intl";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useMemo, useState } from "react";
import Pagination from "@/components/Pagination";
import { useDebounce } from "@/hooks";
import { api } from "@/trpc/react";
import ResourceList from "./ResourceList";
import SearchFilterBar from "./SearchFilterBar";
import type { ResourceFilters, ResourceSorts } from "@/server/api/routers/resource";

const ResourceSection = () => {
    // URL-based state
    const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));

    const t = useTranslations("resources");

    const [rowsToShow, setRowsToShow] = useState(2);
    const [isGridMode, setIsGridMode] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const debouncedSearchTerm = useDebounce(searchTerm || null, 300);
    const [filterOptions, setFilterOptions] = useState<ResourceFilters>({});
    const [sortOption, setSortOption] = useState<ResourceSorts>("created_desc");
    const [isMobile, setIsMobile] = useState(false);

    const itemsPerRow = isGridMode ? (isMobile ? 1 : 3) : 1;
    const itemsPerPage = itemsPerRow * rowsToShow;

    const getPageBase = useMemo(
        () => ({
            pageSize: itemsPerPage,
            search: debouncedSearchTerm,
            filters: filterOptions,
            sort: sortOption,
        }),
        [itemsPerPage, debouncedSearchTerm, filterOptions, sortOption],
    );

    const {
        isPending,
        error,
        data: resources,
    } = api.resource.getPage.useQuery({
        ...getPageBase,
        page: currentPage,
    });

    const { data: availableCoursesData } = api.resource.getUniqueCourses.useQuery();
    const { data: countData } = api.resource.getCount.useQuery({
        search: debouncedSearchTerm,
        filters: filterOptions,
    });

    const utils = api.useUtils();

    const availableCourses = availableCoursesData ?? [];
    const count = countData ?? 0;
    const totalPages = Math.ceil(count / (itemsPerRow * rowsToShow));

    // Prefetch next page, if it exists
    useEffect(() => {
        if (currentPage < totalPages)
            utils.resource.getPage.prefetch({ ...getPageBase, page: currentPage + 1 });
    }, [currentPage, totalPages, getPageBase, utils]);

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
                rowsToShow={rowsToShow}
                setRowsToShow={setRowsToShow}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
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
                        <ResourceList currentResources={resources} isGridMode={isGridMode} />
                    ) : (
                        <div className="flex justify-center items-center h-16">
                            <h1 className="font-heading text-xl text-white font-bold">
                                No results were found matching this search!
                            </h1>
                        </div>
                    )}

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        isMobile={isMobile}
                    />
                </>
            )}
        </>
    );
};

export default ResourceSection;
