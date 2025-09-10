"use client";

import FadeInSection from "@/components/FadeInSection";
import EventCard from "./EventCard";
import type React from "react";
import type { LocalizedEvent } from "@/server/db/schema";

interface EventsListProps {
    events: LocalizedEvent[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
    return (
        <div className="mt-12 flex justify-center space-y-8 md:block">
            {events.map(event => (
                <FadeInSection key={event.id}>
                    <EventCard event={event} />
                </FadeInSection>
            ))}
        </div>
    );
};

export default EventsList;
