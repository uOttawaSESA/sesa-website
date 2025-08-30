"use client";

import React from "react";
import EventCard from "./EventCard";
import { Event } from "../../../types/Event";
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
