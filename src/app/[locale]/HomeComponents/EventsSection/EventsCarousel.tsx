"use client";

import EventCard from "./EventCard";
import { useEffect, useRef } from "react";
import { events } from "@/app/data/Events";

const CARD_WIDTH = 350;

const EventsCarousel = ({
    setScrollFunction,
    setIsAtStart,
    setIsAtEnd,
}: {
    setScrollFunction: (func: (direction: "left" | "right") => void) => void;
    setIsAtStart: (value: boolean) => void;
    setIsAtEnd: (value: boolean) => void;
}) => {
    const items = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const carousel = items.current;
        if (carousel) {
            carousel.addEventListener("scroll", checkScrollPosition);
            return () => carousel.removeEventListener("scroll", checkScrollPosition);
        }
    });

    const checkScrollPosition = () => {
        if (items.current) {
            const { scrollLeft, scrollWidth, clientWidth } = items.current;
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
        }
    };

    return (
        <div className="flex flex-col overflow-hidden">
            {/* Scrollable Event Cards */}
            <div className="relative w-full">
                <div
                    ref={items}
                    className="flex items-stretch gap-4 overflow-hidden scroll-smooth"
                    style={{
                        maskImage:
                            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
                    }}
                >
                    {events.map((event, index) => (
                        <div key={index}>
                            <EventCard {...event} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventsCarousel;
