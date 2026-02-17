"use client";

import type { LocalizedEvent } from "@repo/db/types";
import type React from "react";
import FadeInSection from "@/components/FadeInSection";
import EventCard from "./EventCard";

interface EventsListProps {
    events: LocalizedEvent[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
    return (
        <div className="full mx-8 flex flex-wrap justify-start gap-4 md:mx-20 md:mt-8">
            {events.map(event => (
                <FadeInSection className="flex justify-center xl:w-full" key={event.id}>
                    <EventCard event={event} />
                </FadeInSection>
            ))}
        </div>
    );
};

export default EventsList;
