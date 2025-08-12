"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { events } from "@/app/data/Events";
import Pagination from "@/components/Pagination";
import EventFilters from "./EventFilters";
import Header from "./Header";
import EventsList from "./EventsList";

const parseEventDate = (date: Date): Date => {
    return date;
};

const EventSection = () => {
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [isMobile, setIsMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Check if device is mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint
        };

        // Check on mount
        checkIsMobile();

        // Add event listener for window resize
        window.addEventListener("resize", checkIsMobile);

        // Cleanup
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);
    const eventsPerPage = isMobile ? 1 : 3;

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
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center">
            <Header />
            <EventFilters
                onFilterChange={handleFilterChange}
                onTimeFilterChange={handleTimeFilterChange}
            />

            {filteredEvents.length === 0 ? (
                <div className="z-10 mt-10 flex h-[calc(100vh-200px)] items-start justify-center md:items-center">
                    <div className="flex h-[60%] w-[100%] max-w-7xl flex-col items-center justify-center gap-9 rounded-none border-2 border-blueviolet-100/70 p-20 text-center font-heading text-2xl text-white backdrop-blur-lg md:h-[85%]">
                        <Image
                            src="/icons/calendar-empty.svg"
                            alt="Coming Soon Icon"
                            width={64}
                            height={64}
                            className="opacity-80"
                        />
                        <p>No events right now — check back soon!</p>
                    </div>
                </div>
            ) : (
                <div className="z-10">
                    <EventsList events={currentEvents} />

                    {filteredEvents.length > eventsPerPage && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            )}
            <div className="pointer-events-none select-none">
                <Image
                    src="/decoration/floor-grid.svg"
                    className="fade-from-bottom-bg absolute bottom-48 left-1/2 z-0 -translate-x-1/2 transform md:-bottom-16"
                    width={1200}
                    height={430}
                    alt=""
                />
                <Image
                    src="/decoration/star.svg"
                    className="absolute bottom-[-9rem] right-[14rem] hidden md:bottom-[-5rem] md:right-[10rem] md:block"
                    width={120}
                    height={120}
                    alt=""
                />
                <Image
                    src="/decoration/star-faded.svg"
                    className="absolute bottom-[-6rem] right-[9rem] hidden rotate-[30deg] transform md:block"
                    width={63}
                    height={63}
                    alt=""
                />
            </div>
        </div>
    );
};

export default EventSection;
