"use client";
import { useEffect, useMemo, useState } from "react";

import Pagination from "@/components/Pagination";

import SearchFilterBar from "./SearchFilterBar";
import ResourceList from "./ResourceList";
import { Resource } from "@/app/types/Resource";
import { useResources } from "@/hooks/useResources";

const ResourceSection = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsToShow, setRowsToShow] = useState(2);
    const [isGridMode, setIsGridMode] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOptions, setFilterOptions] = useState({
        course: "",
        type: "",
        format: "",
        language: "",
        tier: "",
    });
    const [sortOption, setSortOption] = useState<string>("relevance");
    const [isMobile, setIsMobile] = useState(false);

    const { resources, loading, error } = useResources();

    // Extract unique courses from resources for the course filter
    const availableCourses = useMemo(() => {
        const courseSet = new Set<string>();

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

    console.log(resources);

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
    const filteredResources = resources.filter(resource => {
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

    // Sorting logic
    const sortedResources = [...filteredResources].sort((a, b) => {
        switch (sortOption) {
            case "relevance":
                // Default order (no sorting)
                return 0;
            case "alphabetical":
                // Sort by title (ascending)
                return a.title.localeCompare(b.title);
            case "recent":
                // Placeholder for recent sorting (requires a "dateAdded" field)
                return 0;
            default:
                return 0;
        }
    });

    const totalPages = Math.ceil(sortedResources.length / (itemsPerRow * rowsToShow));

    const currentResources = sortedResources.slice(
        (currentPage - 1) * itemsPerRow * rowsToShow,
        currentPage * itemsPerRow * rowsToShow,
    );

    return loading ? (
        <div>Loading resources...</div>
    ) : error ? (
        <div>Error loading resources: {error}</div>
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
            />
        </>
    );
};

export default ResourceSection;
