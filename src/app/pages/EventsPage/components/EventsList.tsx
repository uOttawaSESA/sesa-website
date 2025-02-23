"use client";

import React from "react";
import EventCard from "./EventCard";
import { Event } from "../utils/types";

interface EventsListProps {
    events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
    return (
        <div className="mx-auto mt-12 space-y-8">
            {events.map((event, index) => (
                <EventCard
                    key={index}
                    title={event.title}
                    type={event.type}
                    date={event.date}
                    location={event.location}
                    description={event.description}
                    image={event.image}
                    requiresRegistration={event.requiresRegistration}
                    instagramLink={event.instagramLink}
                    registrationLink={event.registrationLink}
                />
            ))}
        </div>
    );
};

export default EventsList;
