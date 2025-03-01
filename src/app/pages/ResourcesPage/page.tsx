"use client";
import { FC, useState } from "react";
import SearchFilterBar from "./components/SearchFilterBar";
import Pagination from "@/components/Pagination";
import { resources, Resource } from "./utils/resourcesData";
import Header from "./components/Header";
import ResourceList from "./components/ResourceList";
import FooterSection from "./components/FooterSection";

const ResourcesPage: FC = () => {
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

    const itemsPerRow = 3;

    // Filter resources based on search term and filter options
    const filteredResources = resources.filter(resource => {
        // Match search term (title, category, or course)
        const matchesSearchTerm =
            resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.course.toLowerCase().includes(searchTerm.toLowerCase());

        // Match filter options
        const matchesFilters = Object.entries(filterOptions).every(([key, value]) => {
            if (!value) return true; // If no filter is selected, skip
            return resource[key as keyof Resource].toLowerCase() === value.toLowerCase();
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 via-blueviolet-200 to-[#361D49]">
            {/* Main Content Container */}
            <div className="container relative z-10 mx-auto max-w-7xl px-4 py-8">
                <Header />
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
                />

                {/* Resources Grid or Row */}
                <ResourceList currentResources={currentResources} isGridMode={isGridMode} />

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Footer Section (CTA and Ange quote) */}
            <FooterSection />
        </div>
    );
};

export default ResourcesPage;
