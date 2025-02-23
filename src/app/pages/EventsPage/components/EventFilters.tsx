"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";

const gradientBorderClass = `
    border-[1px]
    border-solid
    [border-image:linear-gradient(55deg,rgba(136,36,220,0.7)_41.93%,rgba(177,33,157,0.7)_81.89%)_1]
`;

type EventType = "All" | "Workshop" | "Networking Event" | "Social Event" | "Academic Support";
type TimeFilter = "All" | "Past" | "Today" | "Upcoming";

const EventFilters: React.FC<{
    onFilterChange: (filter: EventType) => void;
    onTimeFilterChange: (filter: TimeFilter) => void;
}> = ({ onFilterChange, onTimeFilterChange }) => {
    const [activeFilter, setActiveFilter] = useState<EventType>("All"); // For event type filter
    const [activeTimeFilter, setActiveTimeFilter] = useState<TimeFilter>("All"); // For time filter
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filters: EventType[] = [
        "All",
        "Workshop",
        "Networking Event",
        "Social Event",
        "Academic Support",
    ];
    const timeFilters: TimeFilter[] = ["All", "Past", "Today", "Upcoming"];

    const handleFilterClick = (filter: EventType) => {
        setActiveFilter(filter);
        onFilterChange(filter);
        setIsDropdownOpen(false); // Close the dropdown after selecting a filter
    };

    const handleTimeFilterClick = (filter: TimeFilter) => {
        setActiveTimeFilter(filter);
        onTimeFilterChange(filter);
    };

    return (
        <div className="-mb-6 mt-8 flex items-center justify-between">
            {/* Left Side: Time Filters */}
            <div className="flex gap-4">
                {timeFilters.map(filter => (
                    <Button
                        key={filter}
                        variant="outline"
                        className={`font-heading uppercase text-white ${
                            activeTimeFilter === filter ? "bg-gray-700" : ""
                        }`}
                        onClick={() => handleTimeFilterClick(filter)}
                    >
                        {filter}
                    </Button>
                ))}
            </div>

            {/* Right Side: Event Type Dropdown */}
            <div className="relative">
                <button
                    className="flex items-center gap-2 uppercase text-thistle"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {activeFilter}
                    <Image
                        src="/contact-page/arrows.svg"
                        alt="Filter Arrow"
                        width={16}
                        height={16}
                        className={`transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 z-20 mt-2 min-w-[18rem]">
                        <div
                            className={`${gradientBorderClass} bg-[rgba(27,27,27,0.3)] backdrop-blur-md backdrop-saturate-150`}
                        >
                            {filters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => {
                                        handleFilterClick(filter);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full px-6 py-3 text-left font-heading text-base uppercase text-white transition-colors duration-200 hover:bg-[rgba(27,27,27,0.4)]"
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventFilters;
