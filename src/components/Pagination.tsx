"use client";
import { FC } from "react";
import Button from "@/components/Button";
import Image from "next/image";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
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
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        onClick={() => onPageChange(index + 1)}
                        className={`flex h-[36px] w-[36px] items-center justify-center text-sm sm:h-[50px] sm:w-[50px] sm:text-lg ${
                            currentPage === index + 1 ? "bg-blueviolet-100" : ""
                        }`}
                    >
                        {index + 1}
                    </Button>
                ))}
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
