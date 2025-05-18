import React from "react";
import Image from "next/image";

const gradientBorderClass = `
    border-[1px]
    border-solid
    [border-image:linear-gradient(55deg,rgba(136,36,220,0.7)_41.93%,rgba(177,33,157,0.7)_81.89%)_1]
`;

interface RowSelectorProps {
    rowsToShow: number;
    setRowsToShow: (value: number) => void;
    isOpen: boolean;
    toggleDropdown: () => void;
}

const RowSelector: React.FC<RowSelectorProps> = ({
    rowsToShow,
    setRowsToShow,
    isOpen,
    toggleDropdown,
}) => {
    return (
        <div className="relative">
            <button
                className="flex items-center gap-2 uppercase text-thistle"
                onClick={toggleDropdown}
            >
                {rowsToShow} Rows
                <Image
                    src="/contact-page/arrows.svg"
                    alt="Rows Arrow"
                    width={16}
                    height={16}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-20 mt-2 min-w-[8rem]">
                    <div
                        className={`${gradientBorderClass} animate-dropdown bg-[rgba(27,27,27,0.3)] backdrop-blur-md backdrop-saturate-150`}
                    >
                        {[1, 2, 3, 4, 5].map(rows => (
                            <button
                                key={rows}
                                onClick={() => {
                                    setRowsToShow(rows);
                                    toggleDropdown();
                                }}
                                className="w-full px-6 py-3 text-left font-heading text-base uppercase text-white transition-colors duration-200 hover:bg-[rgba(27,27,27,0.4)]"
                            >
                                {rows} Rows
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RowSelector;
