"use client";

import EventCard from "./EventCard";
import { useEffect, useRef } from "react";
import { events } from "@/app/[locale]/EventsPage/utils/eventData";
import Image from "next/image";

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
        <div className="mt-12 flex flex-col overflow-hidden">
            <div className="relative w-full">
                {events.length === 0 ? (
                    <div className="mx-auto flex h-72 w-11/12 flex-col items-center justify-center gap-6 rounded-xl border border-white/10 px-10 text-center text-white backdrop-blur-super md:w-3/4">
                        <Image
                            src="/icons/calendar-empty.svg"
                            alt="Coming Soon Icon"
                            width={64}
                            height={64}
                            className="opacity-80"
                        />
                        <p className="text-lg">No events right now — check back soon!</p>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default EventsCarousel;
