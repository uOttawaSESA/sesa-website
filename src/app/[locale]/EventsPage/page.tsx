"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import EventFilters from "./components/EventFilters";
import EventsList from "./components/EventsList";
import Pagination from "@/components/Pagination";
import { events } from "@/app/data/Events";
import TeamUpSection from "./components/TeamUpSection";
import ConnectSESA from "./components/ConnectSESA";
import InfiniteCarousel from "./components/InfiniteCarousel";
import Image from "next/image";

// TODO: Remove the "use client" directive from this file
// // Precompile i18n
// import localeParams from "../../data/locales";
// export const generateStaticParams = localeParams;

const parseEventDate = (date: Date): Date => {
    return date;
};

const EventsPage = () => {
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
        <div className="min-h-screen font-heading text-white">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                {/* Warm gradient */}
                <div className="fade-from-top-left-bg absolute h-[70rem] w-full bg-[#B1219D] bg-opacity-15 blur-sm md:w-[60vw]" />

                {/* Light gradient */}
                <div className="fade-from-left-bg absolute top-[75rem] h-[70rem] w-[30vw] bg-blueviolet-100 bg-opacity-25 blur-sm" />

                <Image
                    src="/decoration/waves.svg"
                    className="fade-from-top-bg absolute left-1/2 top-[26.5rem] -translate-x-1/2 transform md:top-[16rem]"
                    width={1200}
                    height={280}
                    alt=""
                />

                <Image
                    src="/decoration/star-faded.svg"
                    className="absolute left-[20rem] top-[8rem] md:left-[16rem] md:top-[16rem]"
                    width={55}
                    height={55}
                    alt=""
                />
                <Image
                    src="/decoration/star.svg"
                    className="absolute right-[11rem] top-[22rem] hidden md:block"
                    width={125}
                    height={128}
                    alt=""
                />
            </div>

            <div className="relative z-10">
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

                <TeamUpSection />
                <ConnectSESA />

                <div className="pointer-events-none relative mb-52 select-none">
                    {/* Bottom Star Decoration */}
                    <Image
                        src="/decoration/star.svg"
                        className="absolute bottom-[-9rem] left-[4rem] rotate-[-110deg] transform md:bottom-[-7rem] md:left-[10rem]"
                        width={100}
                        height={100}
                        alt=""
                    />

                    <InfiniteCarousel />
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
