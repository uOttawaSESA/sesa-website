"use client";

import FadeInSection from "@/components/FadeInSection";
import EventCard from "./EventCard";
import type React from "react";
import type { Event } from "../../../types/Event";

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
