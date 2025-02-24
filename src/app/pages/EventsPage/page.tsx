"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import EventFilters from "./components/EventFilters";
import EventsList from "./components/EventsList";
import Pagination from "@/components/Pagination";
import { events } from "./utils/eventData";
import TeamUpSection from "./components/TeamUpSection";
import ConnectSESA from "./components/ConnectSESA";
import InfiniteCarousel from "./components/InfiniteCarousel";
import { parseISO } from "date-fns";

const parseEventDate = (date: Date): Date => {
    return date;
};

const EventsPage = () => {
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 3;

    const handleFilterChange = (filter: string) => {
        setCurrentPage(1);
        if (filter === "All") {
            setFilteredEvents(events);
        } else {
            const filtered = events.filter(event => event.type === filter);
            setFilteredEvents(filtered);
        }
    };

    const handleTimeFilterChange = (filter: string) => {
        setCurrentPage(1);
        const currentDate = new Date();
        let filtered = events;

        switch (filter) {
            case "Past":
                filtered = events.filter(event => parseEventDate(event.date) < currentDate);
                break;
            case "Today":
                filtered = events.filter(event => {
                    const eventDate = parseEventDate(event.date);
                    return (
                        eventDate.getDate() === currentDate.getDate() &&
                        eventDate.getMonth() === currentDate.getMonth() &&
                        eventDate.getFullYear() === currentDate.getFullYear()
                    );
                });
                break;
            case "Upcoming":
                filtered = events.filter(event => parseEventDate(event.date) > currentDate);
                break;
            default:
                filtered = events;
                break;
        }

        setFilteredEvents(filtered);
    };

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 via-blueviolet-200 to-[#361D49] font-heading text-white">
            <div className="mx-auto max-w-7xl">
                <Header />
                <EventFilters
                    onFilterChange={handleFilterChange}
                    onTimeFilterChange={handleTimeFilterChange}
                />

                {filteredEvents.length === 0 ? (
                    <div className="mt-12 w-full rounded-lg border-2 border-blueviolet-100 p-8 text-start font-heading text-2xl text-white">
                        No events found
                    </div>
                ) : (
                    <>
                        <EventsList events={currentEvents} />

                        {filteredEvents.length > eventsPerPage && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </>
                )}
            </div>

            <TeamUpSection />
            <ConnectSESA />

            <div className="mb-32">
                <InfiniteCarousel />
            </div>
        </div>
    );
};

export default EventsPage;
