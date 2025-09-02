"use client";

import type React from "react";
import EventCard from "./EventCard";
import type { Event } from "../../../types/Event";
import FadeInSection from "@/components/FadeInSection";

interface EventsListProps {
    events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
    return (
        <div className="mt-12 flex justify-center space-y-8 md:block">
            {events.map((event, index) => (
                <FadeInSection key={index}>
                    <EventCard event={event} />
                </FadeInSection>
            ))}
        </div>
    );
};

export default EventsList;
