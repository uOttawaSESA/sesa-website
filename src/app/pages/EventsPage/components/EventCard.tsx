"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useState } from "react";
import { Event } from "../utils/types";
import { format } from "date-fns";

export const EventCard = ({
    title,
    type,
    date,
    startTime,
    endTime,
    location,
    description,
    image,
    requiresRegistration,
    instagramLink,
    registrationLink,
}: Event) => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const eventDate = date;
    const eventStartTime = startTime;
    const eventEndTime = endTime;

    const isPastEvent = eventDate < new Date();

    const formattedDate = format(eventDate, "MMM dd, yyyy"); // e.g., "Mar 25, 2024"
    const day = format(eventDate, "dd"); // e.g., "25"
    const dayOfWeek = format(eventDate, "EEE").toUpperCase(); // e.g., "FRI"
    const timeRange = `${format(eventStartTime, "ha")} - ${format(eventEndTime, "ha")}`; // e.g., "6PM - 8PM"

    // Handle registration
    const handleRegister = () => {
        if (registrationLink) {
            window.open(registrationLink, "_blank"); // Open registration link in a new tab
            setIsRegistered(true); // Mark the event as registered
        }
    };

    // Handle details (Instagram link)
    const handleDetails = () => {
        if (!isPastEvent) {
            window.open(instagramLink, "_blank"); // Open Instagram link in a new tab
        }
    };

    // Handle "Add to Calendar" action
    const handleAddToCalendar = () => {
        if (!isPastEvent) {
            // Logic to add the event to the calendar
            console.log("Adding to calendar:", title);
        }
    };

    // Handle "Show More" toggle
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Truncate description if it's too long
    const maxDescriptionLength = 150; // Number of characters to show initially
    const truncatedDescription =
        description.length > maxDescriptionLength && !showFullDescription
            ? `${description.slice(0, maxDescriptionLength)}...`
            : description;

    return (
        <div className="border border-gray-300 bg-gray-100 from-blueviolet-100 to-darkmagenta p-px font-heading transition-all hover:bg-gradient-to-r">
            <div className="flex h-full bg-gray-100">
                {/* Left Side: Full-Height Image */}
                <div className="relative h-[350px] w-1/4">
                    <Image
                        src={image}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-l-lg"
                    />
                </div>

                {/* Right Side: Event Details */}
                <div className="flex w-3/4 flex-col justify-between p-6">
                    {/* Event Type Badge */}
                    <div>
                        <span className="cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta px-3 py-1 text-sm uppercase">
                            {type}
                        </span>
                    </div>

                    {/* Event Title */}
                    <h3 className="mt-4 text-2xl uppercase leading-tight">{title}</h3>

                    {/* Date and Location */}
                    <div className="mt-4 flex items-start gap-4 font-mono text-white">
                        {/* Date Box */}
                        <Button
                            variant="outline"
                            className="-mt-2 flex flex-col items-center justify-center" // Adjusted margin to move the button higher
                        >
                            <div className="font-heading text-xs uppercase">{dayOfWeek}</div>
                            <div className="font-heading text-xl">{day}</div>
                        </Button>

                        {/* Date and Location Text */}
                        <div className="flex flex-col gap-2">
                            <span>
                                {formattedDate}, {timeRange}
                            </span>
                            <span className="text-thistle">{location}</span>
                        </div>
                    </div>

                    {/* Event Description */}
                    <p className="mt-4 w-full font-mono text-base text-thistle">
                        {truncatedDescription}
                        {description.length > maxDescriptionLength && (
                            <button
                                onClick={toggleDescription}
                                className="ml-2 text-blueviolet-100 hover:underline focus:outline-none"
                            >
                                {showFullDescription ? "Show Less" : "Show More"}
                            </button>
                        )}
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex w-full justify-end gap-4">
                        {/* Details Button */}
                        <Button
                            className="flex items-center gap-2 font-heading uppercase"
                            onClick={handleDetails}
                            disabled={isPastEvent} // Disable for past events
                            variant="fill" // Always use the filled variant
                        >
                            DETAILS
                        </Button>

                        {/* Register Button (only for events that require registration) */}
                        {requiresRegistration && !isRegistered && !isPastEvent && (
                            <Button
                                className="flex items-center gap-2 font-heading uppercase"
                                onClick={handleRegister}
                                variant="fill" // Always use the filled variant
                            >
                                REGISTER
                            </Button>
                        )}

                        {/* Add to Calendar Button */}
                        <Button
                            className="flex items-center gap-2 font-heading uppercase"
                            onClick={handleAddToCalendar}
                            disabled={isPastEvent} // Disable for past events
                            variant="outline" // Keep the outline variant
                        >
                            ADD TO CALENDAR
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
