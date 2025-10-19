"use client";

import { Button } from "@repo/ui/components/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/select";
import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";

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
        <div className="mt-8 mb-4 flex flex-wrap items-center justify-between gap-1 px-8 md:gap-4 md:px-20 lg:mt-16">
            {timeFilters.map(filter => (
                <Button
                    key={filter}
                    variant="outline"
                    className={`flex-grow cursor-pointer p-2 font-heading text-base text-white uppercase backdrop-blur-lg md:px-8 xl:flex-grow-0 ${
                        activeTimeFilter === filter ? "fill-gradient" : ""
                    }`}
                    onClick={() => handleTimeFilterClick(filter)}
                >
                    {t(`time_filter_${filter}`)}
                </Button>
            ))}

            <Select onValueChange={value => handleEventFilterChange(value as EventType)}>
                <SelectTrigger className="cursor-pointer border-none! bg-transparent! px-0 text-white uppercase transition-colors data-placeholder:text-white md:ml-auto md:px-6">
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
