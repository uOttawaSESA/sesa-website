"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const filters = [
    "All",
    "Workshop",
    "Networking Event",
    "Social Event",
    "Academic Support",
] as const;
const timeFilters = ["All", "Past", "Today", "Upcoming"] as const;

type EventType = (typeof filters)[number];
type TimeFilter = (typeof timeFilters)[number];

const EventFilters: React.FC<{
    onFilterChange: (filter: EventType) => void;
    onTimeFilterChange: (filter: TimeFilter) => void;
}> = ({ onFilterChange, onTimeFilterChange }) => {
    const [activeTimeFilter, setActiveTimeFilter] = useState<TimeFilter>("All");

    const handleTimeFilterClick = (filter: TimeFilter) => {
        setActiveTimeFilter(filter);
        onTimeFilterChange(filter);
    };

    return (
        <div className="mx-4 -mb-6 mt-8 flex items-center justify-between">
            {/* Left Side: Time Filters */}
            <div className="flex flex-wrap gap-4">
                {timeFilters.map(filter => (
                    <Button
                        key={filter}
                        variant="outline"
                        className={`font-heading uppercase text-white backdrop-blur-lg ${
                            activeTimeFilter === filter ? "fill-gradient" : ""
                        }`}
                        onClick={() => handleTimeFilterClick(filter)}
                    >
                        {filter}
                    </Button>
                ))}
            </div>

            {/* Right Side: Event Type Dropdown */}
            <Select onValueChange={onFilterChange}>
                <SelectTrigger className="rounded-none !border-none px-5 py-4 uppercase text-white transition-colors hover:bg-white/10 hover:text-white data-[placeholder]:text-white">
                    <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Event Type</SelectLabel>
                        {filters.map(filter => (
                            <SelectItem
                                key={filter}
                                value={filter}
                                className="transition-colors hover:bg-white/10 hover:text-white"
                            >
                                {filter}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default EventFilters;
