"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import EventFilters from "./components/EventFilters";
import EventsList from "./components/EventsList";
import Pagination from "@/components/Pagination";
import { events } from "./utils/eventData";

const parseEventDate = (dateString: string): Date => {
    const datePart = dateString.split(",").slice(1, 3).join(",").trim();
    return new Date(datePart);
};

const EventsPage: React.FC = () => {
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 3;

    // Handle filter changes
    const handleFilterChange = (filter: string) => {
        setCurrentPage(1);
        if (filter === "All") {
            setFilteredEvents(events);
        } else {
            const filtered = events.filter(event => event.type === filter);
            setFilteredEvents(filtered);
        }
    };

    // Handle time filter changes
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
        <div
            className="min-h-screen p-8 font-heading text-white"
            style={{
                background: "linear-gradient(#1B1B1B, #701BB7, #8824DC, #B1219D)",
            }}
        >
            <div className="mx-auto max-w-7xl">
                <Header />
                <EventFilters
                    onFilterChange={handleFilterChange}
                    onTimeFilterChange={handleTimeFilterChange}
                />

                {/* Show "No events found" message if no events match the filters */}
                {filteredEvents.length === 0 ? (
                    <div className="mt-12 w-full rounded-lg border-2 border-blueviolet-100 p-8 text-start font-heading text-2xl text-white">
                        No events found
                    </div>
                ) : (
                    <>
                        {/* Show events if there are any */}
                        <EventsList events={currentEvents} />

                        {/* Show pagination only if there are multiple pages */}
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
        </div>
    );
};

export default EventsPage;
