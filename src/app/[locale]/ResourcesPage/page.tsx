"use client";
import { FC, useEffect, useState } from "react";
import SearchFilterBar from "./components/SearchFilterBar";
import Pagination from "@/components/Pagination";
// import { resources, Resource } from "./utils/resourcesData";
import { resources } from "@/app/data/Resources";
import { Resource } from "@/app/types/Resource";
import Header from "./components/Header";
import ResourceList from "./components/ResourceList";
import FooterSection from "./components/FooterSection";
import Image from "next/image";

import ComingSoonMessage from "../../../components/ComingSoonMessage";

// TODO: Remove the "use client" directive from this file
// // Precompile i18n
// import localeParams from "../../data/locales";
// export const generateStaticParams = localeParams;

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

    return (
        <div className="min-h-screen text-white">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                {/* Warm gradient */}
                <div className="fade-from-top-right-bg absolute right-0 h-[120rem] w-full bg-[#B1219D] bg-opacity-15 blur-3xl md:w-[80vw]" />

                <Image
                    src="/decoration/waves.svg"
                    className={`fade-from-top-bg absolute left-1/2 top-[26rem] w-11/12 -translate-x-1/2 transform md:top-[10rem] md:w-max ${resources.length === 0 ? "hidden" : ""}`}
                    width={1200}
                    height={280}
                    alt=""
                />
            </div>

            {/* Main Content Container */}
            <div className="container relative z-10 mx-auto w-full px-4 py-8 md:max-w-7xl">
                <Header />

                {resources.length === 0 ? (
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
                )}
            </div>

            {/* Footer Section (CTA and Ange quote) */}
            <FooterSection />
        </div>
    );
};

export default ResourcesPage;
