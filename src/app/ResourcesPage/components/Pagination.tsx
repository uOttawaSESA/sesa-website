"use client";
import { FC } from "react";
import Button from "@/components/Button";
import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
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
    <div className="flex justify-center items-center gap-4 mt-8">
      {/* Previous Button with SVG */}
      <Button
        variant="outline"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`flex items-center justify-center ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Image
          src="/resources-page/arrow_backward_ios_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 2.svg"
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
            className={`w-[50px] h-[50px] flex items-center justify-center ${currentPage === index + 1 ? "bg-blueviolet-100" : ""}`}
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
        className={`flex items-center justify-center ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Image
          src="/resources-page/arrow_forward_ios_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 2 (1).svg"
          alt="Next"
          width={28}
          height={28}
        />
      </Button>
    </div>
  );
};

export default Pagination;
