"use client";

import EventCard from "./EventCard";
import { useEffect, useRef } from "react";
import { events } from "@/app/[locale]/EventsPage/utils/eventData";

const CARD_WIDTH = 350;

const EventsCarousel = ({
    setScrollFunction,
}: {
    setScrollFunction: (func: (direction: "left" | "right") => void) => void;
}) => {
    const items = useRef<HTMLDivElement>(null);

    // When Nav buttons from Events.tsx are pressed, call scrollItems
    useEffect(() => {
        setScrollFunction(() => scrollItems);
    }, [setScrollFunction]);

    const scrollItems = (direction: "left" | "right") => {
        const scrollAmount = CARD_WIDTH;

        if (direction === "left") {
            items.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            items.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="mt-12 flex flex-col overflow-hidden">
            {/* Scrollable Event Cards */}
            <div className="relative w-full">
                <div
                    ref={items}
                    className="flex w-full items-center gap-8 overflow-hidden scroll-smooth md:px-32 2xl:px-72"
                    style={{
                        maskImage:
                            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
                    }}
                >
                    {events.map((event, index) => (
                        <div
                            key={index}
                            style={{
                                width: `${CARD_WIDTH}px`,
                                minWidth: `${CARD_WIDTH}px`,
                            }}
                            className="h-full min-h-full"
                        >
                            <EventCard {...event} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventsCarousel;
