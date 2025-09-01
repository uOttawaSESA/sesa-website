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
import { useLocale } from "next-intl";

// Object-based mapping with keys as canonical values
const FILTER_OPTIONS = {
    all: { en: "All", fr: "Tous" },
    workshop: { en: "Workshop", fr: "Atelier" },
    networking: { en: "Networking Event", fr: "Événement de réseautage" },
    social: { en: "Social Event", fr: "Événement social" },
    academic: { en: "Academic Support", fr: "Soutien académique" },
} as const;

const TIME_FILTER_OPTIONS = {
    all: { en: "All", fr: "Tous" },
    past: { en: "Past", fr: "Passé" },
    today: { en: "Today", fr: "Aujourd'hui" },
    upcoming: { en: "Upcoming", fr: "À venir" },
} as const;

// Type definitions using the keys
type EventType = keyof typeof FILTER_OPTIONS;
type TimeFilter = keyof typeof TIME_FILTER_OPTIONS;

// Translation helper function
const getTranslation = <T extends Record<string, { en: string; fr: string }>>(
    options: T,
    locale: string,
): Array<{ key: keyof T; label: string }> => {
    return Object.entries(options).map(([key, translations]) => ({
        key: key as keyof T,
        label: translations[locale as keyof typeof translations] || translations.en,
    }));
};

// Helper functions to map semantic keys to English display values
const getEventTypeDisplayValue = (filter: EventType): string => {
    return FILTER_OPTIONS[filter].en;
};
const getTimeFilterDisplayValue = (filter: TimeFilter): string => {
    return TIME_FILTER_OPTIONS[filter].en;
};

const EventFilters: React.FC<{
    onFilterChange: (filter: string) => void;
    onTimeFilterChange: (filter: string) => void;
}> = ({ onFilterChange, onTimeFilterChange }) => {
    const [activeTimeFilter, setActiveTimeFilter] = useState<TimeFilter>("all");
    const locale = useLocale();

    // Get localized options
    const eventTypeOptions = getTranslation(FILTER_OPTIONS, locale);
    const timeFilterOptions = getTranslation(TIME_FILTER_OPTIONS, locale);

    const handleTimeFilterClick = (filter: TimeFilter) => {
        setActiveTimeFilter(filter);
        // Send English display value to parent component
        const displayValue = getTimeFilterDisplayValue(filter);
        onTimeFilterChange(displayValue);
    };

    const handleEventFilterChange = (filter: EventType) => {
        // Send English display value to parent component
        const displayValue = getEventTypeDisplayValue(filter);
        onFilterChange(displayValue);
    };

    return (
        <div className="mx-4 -mb-6 mt-8 flex items-center justify-between">
            {/* Left Side: Time Filters */}
            <div className="flex flex-wrap gap-4">
                {timeFilterOptions.map(({ key, label }) => (
                    <Button
                        key={key}
                        variant="outline"
                        className={`font-heading uppercase text-white backdrop-blur-lg ${
                            activeTimeFilter === key ? "fill-gradient" : ""
                        }`}
                        onClick={() => handleTimeFilterClick(key)}
                    >
                        {label}
                    </Button>
                ))}
            </div>

            {/* Right Side: Event Type Dropdown */}
            <Select onValueChange={value => handleEventFilterChange(value as EventType)}>
                <SelectTrigger className="!border-none px-5 py-4 uppercase text-white data-[placeholder]:text-white">
                    <SelectValue
                        placeholder={locale === "fr" ? "Type d'événement" : "Event Type"}
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>
                            {locale === "fr" ? "Type d'événement" : "Event Type"}
                        </SelectLabel>
                        {eventTypeOptions.map(({ key, label }) => (
                            <SelectItem key={key} value={key}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default EventFilters;
