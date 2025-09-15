"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
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
import type React from "react";

// Type definitions
type TimeFilter = "all" | "past" | "today" | "upcoming";
type EventType = "all" | "workshop" | "networking" | "social" | "academic";

const EventFilters: React.FC<{
    onFilterChange: (filter: string) => void;
    onTimeFilterChange: (filter: string) => void;
}> = ({ onFilterChange, onTimeFilterChange }) => {
    const [activeTimeFilter, setActiveTimeFilter] = useState<TimeFilter>("all");
    const t = useTranslations("events");
    const tType = useTranslations("events.event_type");

    const timeFilters: TimeFilter[] = ["all", "past", "today", "upcoming"];
    const eventTypes: EventType[] = ["all", "workshop", "networking", "social", "academic"];

    const handleTimeFilterClick = (filter: TimeFilter) => {
        setActiveTimeFilter(filter);
        onTimeFilterChange(filter);
    };

    const handleEventFilterChange = (filter: EventType) => {
        onFilterChange(filter);
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
                        {t(`time_filter_${filter}`)}
                    </Button>
                ))}
            </div>

            {/* Right Side: Event Type Dropdown */}
            <Select onValueChange={value => handleEventFilterChange(value as EventType)}>
                <SelectTrigger className="bg-transparent! cursor-pointer border-none! px-5 py-4 uppercase text-white transition-colors data-placeholder:text-white">
                    <SelectValue placeholder={t("filter_type_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{t("filter_type_placeholder")}</SelectLabel>
                        {eventTypes.map(type => (
                            <SelectItem className="cursor-pointer" key={type} value={type}>
                                {tType(type)}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default EventFilters;
