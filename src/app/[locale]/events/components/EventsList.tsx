"use client";

import React from "react";
import EventCard from "./EventCard";
import { Event } from "../../../types/Event";
import { useLocale } from "next-intl";

interface EventsListProps {
    events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
    const locale = useLocale();

    return (
        <div className="mt-12 flex justify-center space-y-8 md:block">
            {events.map((event, index) => (
                <EventCard key={index} event={event} />
            ))}
        </div>
    );
};

export default EventsList;
