"use client";
import { useEffect, useMemo, useState } from "react";
import Pagination from "@/components/Pagination";
import { type ResourceSorts, useInfiniteResources } from "@/lib/query";
import ResourceList from "./ResourceList";
import SearchFilterBar from "./SearchFilterBar";
import type { Resource } from "@/schemas/resources";

const ResourceSection = () => {
    const [currentPage, setCurrentPage] = useState(1);

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
    const [sortOption, setSortOption] = useState<ResourceSorts>("creation_desc");
    const [isMobile, setIsMobile] = useState(false);

    const { isPending, isFetching, error, data, fetchNextPage } = useInfiniteResources(sortOption);
    const resources = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(page => page.docs);
    }, [data]);

    const itemsPerRow = isGridMode ? (isMobile ? 1 : 3) : 1;
    const resourcesPerPage = itemsPerRow * rowsToShow;

    // Fetch new resources as required
    const loadedResources = resources?.length ?? 0;
    useEffect(() => {
        // We do currentPage + 1 so that if the user is on the current last available page,
        // the next page's fetch will already have started
        if (!isFetching && loadedResources < (currentPage + 1) * resourcesPerPage) fetchNextPage();
    }, [loadedResources, currentPage, resourcesPerPage, isFetching, fetchNextPage]);

    // Extract unique courses from resources for the course filter
    const availableCourses = useMemo(() => {
        const courseSet = new Set<string>();
        if (!resources) return [];

        resources.forEach(resource => {
            if (resource.course && typeof resource.course === "string" && resource.course.trim()) {
                courseSet.add(resource.course.trim());
            }
        });

        // Convert to the format SearchFilterBar expects
        return [
            ...Array.from(courseSet)
                .sort() // Sort alphabetically
                .map(course => ({
                    label: course,
                    value: course,
                })),
        ];
    }, [resources]); // Recalculate when resources change

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
    const filteredResources = resources ?? [];
    const _filteredResources = useMemo(() => {
        if (!resources) return [];

        return resources.filter(resource => {
            const matchesSearchTerm =
                resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.course?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilters = Object.entries(filterOptions).every(([key, value]) => {
                if (!value) return true;

                const resourceValue = resource[key as keyof Resource];
                return (
                    typeof resourceValue === "string" &&
                    resourceValue.toLowerCase() === value.toLowerCase()
                );
            });

            return matchesSearchTerm && matchesFilters;
        });
    }, [resources, searchTerm, filterOptions]);

    const totalPages = Math.ceil(resources.length / (itemsPerRow * rowsToShow));

    const currentResources = resources.slice(
        (currentPage - 1) * itemsPerRow * rowsToShow,
        currentPage * itemsPerRow * rowsToShow,
    );

    return isPending ? (
        <div className="flex w-full items-center justify-center py-12">
            <p className="rounded-md px-4 py-2 font-sans text-violet-400">Loading resources...</p>
        </div>
    ) : error ? (
        <div className="flex w-full items-center justify-center py-12">
            <p className="rounded-md px-4 py-2 font-sans text-red-400">
                Error loading resources: <span className="font-semibold">{error.message}</span>
            </p>
        </div>
    ) : (
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
                setSortOption={sort => {
                    setSortOption(sort);
                    setCurrentPage(1);
                }}
                isMobile={isMobile}
                availableCourses={availableCourses}
            />

            {/* Resources Grid or Row */}
            <ResourceList currentResources={currentResources} isGridMode={isGridMode} />

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                isMobile={isMobile}
            />
        </>
    );
};

export default ResourceSection;
