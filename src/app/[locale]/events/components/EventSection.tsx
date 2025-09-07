"use client";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as z from "zod";
import Pagination from "@/components/Pagination";
import Star from "@/components/ui/decorations/star";
import { db } from "@/lib/firebase";
import { type Event, FirestoreEvent } from "@/schemas/events";
import EventFilters from "./EventFilters";
import EventsList from "./EventsList";
import Header from "./Header";

const EventSection = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["eventsData"],
        queryFn: async () => {
            const docs = (await getDocs(collection(db, "Events"))).docs.map(doc => doc.data());
            console.log(docs);
            const validated = z.array(FirestoreEvent).parse(docs);
            return validated;
        },
    });

    const [isMobile, setIsMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [typeFilter, setTypeFilter] = useState("all");
    const [timeFilter, setTimeFilter] = useState<string | undefined>();

    const today = useMemo(() => new Date(), []);

    /**
     * An argument that can be passed to {@link Array#filter} to exclude events by type.
     */
    const typeFilterPredicate = useCallback(
        (event: Event) => {
            if (typeFilter === "all") return true;
            return event.type === typeFilter;
        },
        [typeFilter],
    );

    /**
     * An argument that can be passed to {@link Array#filter} to exclude events by time.
     */
    const timeFilterPredicate = useCallback(
        (event: Event) => {
            switch (timeFilter) {
                case "past":
                    return event.startTime < today;
                case "today":
                    return (
                        event.startTime.getDate() === today.getDate() &&
                        event.startTime.getMonth() === today.getMonth() &&
                        event.startTime.getFullYear() === today.getFullYear()
                    );
                case "upcoming":
                    return event.startTime > today;
                default:
                    return true;
            }
        },
        [timeFilter, today],
    );

    /** A filtered copy of the available events. */
    const filteredEvents = useMemo(() => {
        if (!data) return [];
        return data.filter(typeFilterPredicate).filter(timeFilterPredicate);
    }, [data, typeFilterPredicate, timeFilterPredicate]);

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

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    return (
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center">
            <Header />
            <EventFilters onFilterChange={setTypeFilter} onTimeFilterChange={setTimeFilter} />

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

                <Star
                    variant="star"
                    className="bottom-[-9rem] right-[14rem] md:bottom-[-5rem] md:right-[10rem]"
                    delay={1}
                />
                <Star
                    variant="star-faded"
                    className="bottom-[-6rem] right-[9rem] rotate-[30deg] transform md:block"
                    delay={0.5}
                />
            </div>
        </div>
    );
};

export default EventSection;
