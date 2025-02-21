"use client";
import { FC, useState } from "react";
import { ResourceCard } from "./components/ResourceCard";
import SearchFilterBar from "./components/SearchFilterBar";
import Button from "@/components/Button";
import Pagination from "./components/Pagination";
import { resources } from "./utils/resourcesData";
import "../globals.css";

const ResourcesPage: FC = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 9; // Adjust the number of items per page for 3 rows (3 x 3)

  // Calculate total pages
  const totalPages = Math.ceil(resources.length / resourcesPerPage);

  // Get the current resources to display
  const currentResources = resources.slice(
    (currentPage - 1) * resourcesPerPage,
    currentPage * resourcesPerPage
  );

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-gray-100 via-blueviolet-200 to-darkmagenta"
      style={{
        background: "linear-gradient(#1B1B1B, #701BB7, #8824DC, #B1219D)",
      }}
    >
      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Page Header */}
        <div className="mb-12">
          <span className="font-mono text-transparent color-gradient">
            Resources
          </span>
          <h1 className="text-4xl uppercase mt-4 font-heading">
            RESOURCES <span className="bg-gradient-to-r from-blueviolet-100/25 to-darkmagenta/25">FOR STUDENTS BY STUDENTS</span>
          </h1>
          <p className="font-sans text-thistle text-xl max-w-10xl mt-4">
            Our academic team actively curates free resources to support software engineering students in their studies.
          </p>
        </div>

        {/* Search and Filter Section */}
        <SearchFilterBar />

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-12">
          {currentResources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </div>

      {/* CTA Section */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-l uppercase mb-8 font-heading">
            Interested in Contributing or Requesting Resources?
          </h2>
        </div>
        <div className="flex items-center justify-center transform -translate-y-4">
          <Button href="#" className="font-heading uppercase text-xl">
            Join Our Discord
          </Button>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-blueviolet-200/30 to-transparent" />
      </div>
    </div>
  );
};

export default ResourcesPage;
