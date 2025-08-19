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
    const lang = locale === "fr" ? "fr" : "en";

    return (
        <div className="mt-12 flex justify-center space-y-8 md:block">
            {events.map((event, index) => (
                <EventCard
                    key={index}
                    title={event.title[lang]}
                    type={event.type[lang]}
                    date={event.date}
                    startTime={event.startTime}
                    endTime={event.endTime}
                    location={event.location}
                    description={event.description[lang]}
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
