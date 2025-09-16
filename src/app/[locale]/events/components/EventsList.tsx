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
        <div className="full flex justify-start gap-4 md:mt-8 md:mx-20 mx-8 flex-wrap">
            {events.map(event => (
                <FadeInSection className="xl:w-full flex justify-center" key={event.id}>
                    <EventCard event={event} />
                </FadeInSection>
            ))}
        </div>
    );
};

export default EventsList;
