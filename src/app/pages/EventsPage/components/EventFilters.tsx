"use client";

import React, { useState } from "react";
import Button from "@/components/Button";

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
                {/* Dropdown Trigger Button */}
                <Button
                    variant="outline"
                    className="flex items-center gap-2 font-heading uppercase text-white"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    Filter
                    <svg
                        className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </Button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                className={`w-full px-4 py-2 text-left font-heading text-sm uppercase text-white transition-all hover:bg-gray-700 ${
                                    activeFilter === filter ? "bg-gray-700" : ""
                                }`}
                                onClick={() => handleFilterClick(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventFilters;
