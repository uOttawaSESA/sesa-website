"use client";
import { type FC, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as ShadcnPagination,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isMobile?: boolean;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, isMobile }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };
    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
    const handleJump = () => {
        if (inputRef.current) {
            const val = Number(inputRef.current.value);
            if (val >= 1 && val <= totalPages) {
                onPageChange(val);
            }
        }
    };

    // Generate page numbers logic
    const generatePageNumbers = () => {
        if (isMobile) {
            const pages: (number | string)[] = [];
            if (totalPages <= 4) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
                if (currentPage <= 2) pages.push(1, 2, "...", totalPages);
                else if (currentPage >= totalPages - 1)
                    pages.push(1, "...", totalPages - 1, totalPages);
                else pages.push(1, "...", currentPage, totalPages);
            }
            return pages;
        } else {
            const pages: (number | string)[] = [];
            if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
                if (currentPage <= 4) pages.push(1, 2, 3, 4, 5, "...", totalPages);
                else if (currentPage >= totalPages - 3)
                    pages.push(
                        1,
                        "...",
                        totalPages - 4,
                        totalPages - 3,
                        totalPages - 2,
                        totalPages - 1,
                        totalPages,
                    );
                else
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
            return pages;
        }
    };

    const pageNumbers = generatePageNumbers();
    if (totalPages <= 1) return null;

    return (
        <ShadcnPagination className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:mt-8 -ml-6">
            <PaginationContent>
                {/* Prev */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={e => {
                            e.preventDefault();
                            handlePrev();
                        }}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {pageNumbers.map((page, index) => {
                    if (page === "...") {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <PaginationEllipsis className="cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align="center"
                                        side="top"
                                        className="w-auto rounded-lg p-3 shadow-lg"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #8824dc 41.93%, #b1219d 81.89%)",
                                            color: "white",
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <input
                                                ref={inputRef}
                                                type="number"
                                                min={1}
                                                max={totalPages}
                                                defaultValue={currentPage}
                                                className="w-16 rounded border px-2 py-1 text-center text-black"
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") handleJump();
                                                }}
                                            />
                                            <Button
                                                size="sm"
                                                className="px-2 py-1 text-xs text-white"
                                                style={{ background: "transparent" }}
                                                onClick={handleJump}
                                            >
                                                Go
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </PaginationItem>
                        );
                    }
                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === page}
                                onClick={e => {
                                    e.preventDefault();
                                    onPageChange(page as number);
                                }}
                                className={`flex h-[36px] w-[36px] items-center justify-center text-sm sm:h-[50px] sm:w-[50px] sm:text-lg ${
                                    currentPage === page ? "bg-blueviolet-100" : ""
                                }`}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={e => {
                            e.preventDefault();
                            if (currentPage !== totalPages) {
                                handleNext();
                            }
                        }}
                        aria-disabled={currentPage === totalPages}
                        className={
                            currentPage === totalPages ? "pointer-events-none opacity-50" : ""
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </ShadcnPagination>
    );
};

export default Pagination;
