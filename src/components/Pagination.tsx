"use client";
import { FC, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isMobile?: boolean;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, isMobile }) => {
    const [openEllipsis, setOpenEllipsis] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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

    // Always 7 elements: dynamic window with ellipsis
    const generatePageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                // Show first 5 pages, ellipsis, last page
                pages.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage >= totalPages - 3) {
                // Show first page, ellipsis, last 5 pages
                pages.push(
                    1,
                    "...",
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                );
            } else {
                // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
                pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages,
                );
            }
        }
        return pages;
    };

    const pageNumbers = generatePageNumbers();

    // Don't render pagination if there's only one page
    if (totalPages <= 1) {
        return null;
    }

    // Handle page jump and close
    const handleJump = () => {
        if (inputRef.current) {
            const val = Number(inputRef.current.value);
            if (val >= 1 && val <= totalPages) {
                onPageChange(val);
                setOpenEllipsis(null);
            }
        }
    };

    const handleClose = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setOpenEllipsis(null);
    };

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
            <div className="relative flex flex-wrap justify-center gap-2">
                {pageNumbers.map((page, index) => {
                    if (page === "...") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="relative flex h-[36px] w-[36px] cursor-pointer items-center justify-center text-sm text-thistle sm:h-[50px] sm:w-[50px] sm:text-lg"
                                onClick={() => setOpenEllipsis(index)}
                            >
                                ...
                                {openEllipsis === index && (
                                    <div className="outline-gradient absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded p-2 shadow-lg backdrop-blur-lg">
                                        <input
                                            ref={inputRef}
                                            type="number"
                                            min={1}
                                            max={totalPages}
                                            className="w-16 rounded px-2 py-1 text-black"
                                            placeholder="Page"
                                            onKeyDown={e => {
                                                if (e.key === "Enter") {
                                                    handleJump();
                                                }
                                            }}
                                        />
                                        <Button
                                            size="sm"
                                            className="ml-2 px-2 py-1 text-xs"
                                            onClick={handleClose}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="ml-2 px-2 py-1 text-xs"
                                            onClick={handleJump}
                                        >
                                            Go
                                        </Button>
                                    </div>
                                )}
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
