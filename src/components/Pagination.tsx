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
        <div className="mt-8 flex items-center justify-center gap-4">
            {/* Previous Button with SVG */}
            <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`flex items-center justify-center ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
            >
                <Image
                    src="/resources-page/arrow_backword.svg"
                    alt="Previous"
                    width={28}
                    height={28}
                />
            </Button>

            {/* Page Numbers */}
            <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        onClick={() => onPageChange(index + 1)}
                        className={`flex h-[50px] w-[50px] items-center justify-center ${currentPage === index + 1 ? "bg-blueviolet-100" : ""}`}
                    >
                        <span className="text-lg">{index + 1}</span>
                    </Button>
                ))}
            </div>

            {/* Next Button with SVG */}
            <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
            >
                <Image src="/resources-page/arrow_forward.svg" alt="Next" width={28} height={28} />

            </Button>
        </div>
    );
};

export default Pagination;
