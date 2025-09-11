"use client";
import { useLocale, useTranslations } from "next-intl";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useMemo, useState } from "react";
import Pagination from "@/components/Pagination";
import { api } from "@/trpc/react";
import ResourceList from "./ResourceList";
import SearchFilterBar from "./SearchFilterBar";
import type { ResourceSorts } from "@/server/api/routers/resource";
import type { MappedResource } from "@/server/db/schema";

const ResourceSection = () => {
    // URL-based state
    const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));

    const t = useTranslations("resources");

    const [rowsToShow, setRowsToShow] = useState(2);
    const [isGridMode, setIsGridMode] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOptions, setFilterOptions] = useState({
        course: "",
        category: "",
        format: "",
        language: "",
        tier: "",
    });
    const [sortOption, setSortOption] = useState<ResourceSorts | undefined>();
    const [isMobile, setIsMobile] = useState(false);

    const locale = useLocale() as "en" | "fr";

    const itemsPerRow = isGridMode ? (isMobile ? 1 : 3) : 1;
    const itemsPerPage = itemsPerRow * rowsToShow;

    const getPageBase = useMemo(
        () => ({
            pageSize: itemsPerPage,
            sort: sortOption,
        }),
        [itemsPerPage, sortOption],
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
    const { data: countData } = api.resource.getCount.useQuery();

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

    // Filter resources based on search term and filter options
    const filteredResources = useMemo(() => {
        if (!resources) return [];
        return resources;

        return resources.filter(resource => {
            const matchesSearchTerm =
                resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.course?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilters = Object.entries(filterOptions).every(([key, value]) => {
                if (!value) return true;

                const resourceValue = resource[key as keyof MappedResource];
                return (
                    typeof resourceValue === "string" &&
                    resourceValue.toLowerCase() === value.toLowerCase()
                );
            });

            return matchesSearchTerm && matchesFilters;
        });
    }, [resources, searchTerm, filterOptions]);

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
                    {filteredResources.length > 0 ? (
                        <ResourceList
                            allResources={resources}
                            currentResources={resources}
                            isGridMode={isGridMode}
                        />
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
