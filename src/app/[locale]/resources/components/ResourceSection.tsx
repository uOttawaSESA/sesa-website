"use client";
import { useEffect, useMemo, useState } from "react";
import Pagination from "@/components/Pagination";
import { useResources } from "@/lib/query";
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
    const [sortOption, setSortOption] = useState<string>("relevance");
    const [isMobile, setIsMobile] = useState(false);

    const { isPending, error, data: resources } = useResources();

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

    const itemsPerRow = isGridMode ? (isMobile ? 1 : 3) : 1;

    // Filter resources based on search term and filter options
    const filteredResources = useMemo(() => {
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

    // Sorting logic
    const sortedResources = [...filteredResources].sort((a, b) => {
        const tierOrder = { c: 1, b: 2, a: 3, s: 4 };

        const tierA = a.tier?.toLowerCase() || "";
        const tierB = b.tier?.toLowerCase() || "";

        const tierValueA = tierA in tierOrder ? tierOrder[tierA as keyof typeof tierOrder] : 0;
        const tierValueB = tierB in tierOrder ? tierOrder[tierB as keyof typeof tierOrder] : 0;

        switch (sortOption) {
            case "relevance":
                // Default order (no sorting)
                return 0;
            case "alphabetical":
                // Sort by title (ascending)
                return a.title.localeCompare(b.title);
            case "last updated":
                // Sort by lastUpdated date (newest first)
                if (a.lastUpdated && b.lastUpdated) {
                    const dateA = new Date(a.lastUpdated);
                    const dateB = new Date(b.lastUpdated);
                    return dateB.getTime() - dateA.getTime();
                }
                // Resources without a lastUpdated date are pushed to the end
                if (a.lastUpdated) return -1;
                if (b.lastUpdated) return 1;
                return 0; // Both don't have a date, maintain original order
            case "tier (worst to best)":
                return tierValueA - tierValueB;
            case "tier (best to worst)":
                return tierValueB - tierValueA;
            default:
                return 0;
        }
    });

    const totalPages = Math.ceil(sortedResources.length / (itemsPerRow * rowsToShow));

    const currentResources = sortedResources.slice(
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
                setSortOption={setSortOption}
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
