"use client";
import { useEffect, useState } from "react";

import ComingSoonMessage from "@/components/ComingSoonMessage";
import Pagination from "@/components/Pagination";
import { resources } from "@/app/data/Resources";

import SearchFilterBar from "./SearchFilterBar";
import ResourceList from "./ResourceList";
import { Resource } from "@/app/types/Resource";

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

    // Debugging: Log the current sort option
    console.log("Current Sort Option:", sortOption);

    // Sorting logic
    const sortedResources = [...filteredResources].sort((a, b) => {
        switch (sortOption) {
            case "relevance":
                // Default order (no sorting)
                return 0;
            case "rating":
                // Sort by rating (descending)
                return parseInt(b.rating) - parseInt(a.rating);
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

    // Debugging: Log the sorted resources
    console.log("Sorted Resources:", sortedResources);

    const totalPages = Math.ceil(sortedResources.length / (itemsPerRow * rowsToShow));

    const currentResources = sortedResources.slice(
        (currentPage - 1) * itemsPerRow * rowsToShow,
        currentPage * itemsPerRow * rowsToShow,
    );

    return resources.length === 0 ? (
        <ComingSoonMessage
            title="Coming Fall 2025: Your academic toolbox."
            subtitle="All the resources you need, in one place—launching soon."
            homeButton={true}
        />
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
