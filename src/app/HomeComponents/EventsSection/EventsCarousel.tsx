"use client";

import EventCard from "./EventCard";
import { useEffect, useRef } from "react";

const CARD_WIDTH = 350;

const events = [
    {
        title: "Microsoft Crafting Custom Chatbots",
        date: new Date("2024-03-25"),
        startTime: new Date("2024-03-25T18:00:00"),
        endTime: new Date("2024-03-25T20:00:00"),
        location: "STM 117",
        description:
            "Calling all Tech Enthusiasts! SESA is hosting an engaging AI and LLM workshop with uOttawa’s Microsoft Student Ambassador...",
        imgPath: "/imgs/Events/chatbots.png",
        details: "#",
    },
    {
        title: "SESA Social",
        date: new Date("2024-11-11"),
        startTime: new Date("2024-11-11T16:00:00"),
        endTime: new Date("2024-11-11T20:00:00"),
        location: "Room 210",
        description:
            "WE’RE BACK! Unlock the fun at our SESA Social Event on March 11 🎉 Swing by STM117 from 6-8 PM for an evening of games, laughter, and new connections!",
        imgPath: "/imgs/Events/social.png",
        details: "#",
    },
    {
        title: "SESA Social 2",
        date: new Date("2024-11-02"),
        startTime: new Date("2024-11-02T19:00:00"),
        endTime: new Date("2024-11-02T21:00:00"),
        location: "Auditorium",
        description:
            "YOU'RE INVITED! Come to SESA's Social for an evening of fun with video games, board games, free food, and more 🥳 REGISTER NOW with the link in our bio!",
        imgPath: "/imgs/Events/social2.png",
        details: "#",
    },
    {
        title: "PPOWER UP YOUR NETWORK WITH CIENA!",
        date: new Date("2024-11-02"),
        startTime: new Date("2024-11-02T19:00:00"),
        endTime: new Date("2024-11-02T21:00:00"),
        location: "STM 117",
        description: `SOLD OUT —
                    🌐 Join us for an unforgettable networking experience! 🤝 Ciena...
                    2nd Annual Networking Event is`,
        imgPath: "/imgs/Events/ciena.png",
        details: "#",
    },
    {
        title: "INTRODUCTION TO UNITY",
        date: new Date("2024-11-02"),
        startTime: new Date("2024-11-02T19:00:00"),
        endTime: new Date("2024-11-02T21:00:00"),
        location: "STM 117",
        description:
            "Calling all aspiring game developers! Get ready to level up your game development skills at the #GotGames introduction to Unity workshop! Join @hackthehill and @uogamedev on January 25th from 7pm to 9pm in STM117 and on Twitch.",
        imgPath: "/imgs/Events/hackthehill.png",
        details: "#",
    },
];

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
        <div className="mt-14 flex flex-col overflow-hidden">
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
