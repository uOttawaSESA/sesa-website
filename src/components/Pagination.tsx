"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isMobile?: boolean;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, isMobile }) => {
    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    // Generate smart page numbers
    const generatePageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = isMobile ? 3 : 6; // Maximum number of visible page numbers
        const half = Math.floor(maxVisiblePages / 2);

        if (totalPages <= maxVisiblePages) {
            // Show all if total pages are less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show subset of pages
            let start = Math.max(2, currentPage - half);
            let end = Math.min(totalPages - 1, currentPage + half);

            // Adjust if near the beginning
            if (currentPage <= half) {
                start = 2;
                end = maxVisiblePages - 1;
            }

            // Adjust if near the end
            if (currentPage > totalPages - half) {
                start = totalPages - (maxVisiblePages - 2);
                end = totalPages - 1;
            }

            // Always include first page
            pages.push(1);

            if (start > 2) {
                pages.push("...");
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) {
                pages.push("...");
            }

            // Always include last page
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    // Don't render pagination if there's only one page
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:mt-8">
            {/* Previous Button */}
            <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`flex items-center justify-center p-2 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
            >
                <Image
                    src="/resources-page/arrow_backword.svg"
                    alt="Previous"
                    width={20}
                    height={20}
                    className="sm:h-[28px] sm:w-[28px]"
                />
            </Button>

            {/* Page Numbers */}
            <div className="flex flex-wrap justify-center gap-2">
                {pageNumbers.map((page, index) => {
                    if (page === "...") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="flex h-[36px] w-[36px] items-center justify-center text-sm text-thistle sm:h-[50px] sm:w-[50px] sm:text-lg"
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <Button
                            key={page}
                            variant="outline"
                            onClick={() => onPageChange(page as number)}
                            className={`flex h-[36px] w-[36px] items-center justify-center text-sm sm:h-[50px] sm:w-[50px] sm:text-lg ${
                                currentPage === page ? "bg-blueviolet-100" : ""
                            }`}
                        >
                            {page}
                        </Button>
                    );
                })}
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center p-2 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
            >
                <Image
                    src="/resources-page/arrow_forward.svg"
                    alt="Next"
                    width={20}
                    height={20}
                    className="sm:h-[28px] sm:w-[28px]"
                />
            </Button>
        </div>
    );
};

export default Pagination;
