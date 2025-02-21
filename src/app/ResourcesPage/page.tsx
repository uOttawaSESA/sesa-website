"use client";
import { FC, useState } from "react";
import SearchFilterBar from "./components/SearchFilterBar";
import Button from "@/components/Button";
import Pagination from "./components/Pagination";
import { resources } from "./utils/resourcesData";
import Header from "./components/Header";
import ModeToggle from "./components/ModeToggle";
import RowSelector from "./components/RowSelector";
import ResourceList from "./components/ResourceList";

const ResourcesPage: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsToShow, setRowsToShow] = useState(2);
    const [isGridMode, setIsGridMode] = useState(true);

    const itemsPerRow = 3;
    const totalPages = Math.ceil(resources.length / (itemsPerRow * rowsToShow));

    const currentResources = resources.slice(
        (currentPage - 1) * itemsPerRow * rowsToShow,
        currentPage * itemsPerRow * rowsToShow,
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 via-blueviolet-200 to-darkmagenta">
            {/* Main Content Container */}
            <div className="container relative z-10 mx-auto px-4 py-8">
                <Header />
                <SearchFilterBar />

                {/* Layout and Row Selection */}
                <div className="mb-8 flex items-center justify-between">
                    {/* Grid/Row Mode Toggle (Left) */}
                    <ModeToggle isGridMode={isGridMode} setIsGridMode={setIsGridMode} />

                    {/* Row Selection Button (Right) */}
                    {isGridMode && (
                        <RowSelector rowsToShow={rowsToShow} setRowsToShow={setRowsToShow} />
                    )}
                </div>

                {/* Resources Grid or Row */}
                <ResourceList currentResources={currentResources} isGridMode={isGridMode} />

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* CTA Section */}
            <div className="mt-16 flex items-center justify-center gap-6">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-l mb-8 font-heading uppercase">
                        Interested in Contributing or Requesting Resources?
                    </h2>
                </div>
                <div className="flex -translate-y-4 transform items-center justify-center">
                    <Button href="#" className="font-heading text-xl uppercase">
                        Join Our Discord
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
