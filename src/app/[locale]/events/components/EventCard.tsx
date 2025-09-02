"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";
import { useTranslations, useLocale } from "next-intl";
import { Event } from "../../../types/Event";

interface EventCardProps {
    event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
    const t = useTranslations("events");
    const locale = useLocale();
    const lang = locale === "fr" ? "fr" : "en";

    const [isRegistered, setIsRegistered] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Extract localized content
    const title = event.title[lang];
    const type = event.type[lang];
    const description = event.description[lang];

    const isPastEvent = event.date < new Date();

    const formattedDate = format(event.date, "MMM dd, yyyy");
    const day = format(event.date, "dd");
    const dayOfWeek = format(event.date, "EEE").toUpperCase();
    const timeRange = `${format(event.startTime, "ha")} - ${format(event.endTime, "ha")}`;

    // Handle registration
    const handleRegister = () => {
        if (event.registrationLink) {
            window.open(event.registrationLink, "_blank");
            setIsRegistered(true);
        }
    };

    // Handle details (Instagram link)
    const handleDetails = () => {
        window.open(event.instagramLink, "_blank");
    };

    // Handle "Add to Calendar" action
    const handleAddToCalendar = () => {
        if (!isPastEvent) {
            // Logic to add the event to the calendar
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
        <div className="w-min border border-gray-300 bg-gray-100 from-blueviolet-100 to-darkmagenta p-px font-heading transition-all hover:bg-gradient-to-r md:w-auto">
            <div className="flex w-min flex-col justify-start bg-gray-100 md:w-auto md:flex-row">
                {/* Left Side: Full-Height Image */}
                <div>
                    <Image
                        src={event.image}
                        alt={title}
                        width={350}
                        height={350}
                        className="aspect-square h-full max-w-none object-cover"
                    />
                </div>

                {/* Right Side: Event Details */}
                <div className="flex flex-col justify-between p-6">
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
                        <div className="outline-gradient -mt-2 flex flex-col items-center justify-center border px-4 py-3">
                            <div className="font-heading text-xs uppercase">{dayOfWeek}</div>
                            <div className="font-heading text-xl">{day}</div>
                        </div>

                        {/* Date and Location Text */}
                        <div className="flex flex-col gap-2">
                            <span>
                                {formattedDate}, {timeRange}
                            </span>
                            <span className="text-thistle">{event.location}</span>
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
                        >
                            {t("btn_details")}
                        </Button>

                        {/* Register Button (only for events that require registration) */}
                        {event.requiresRegistration && !isRegistered && !isPastEvent && (
                            <Button
                                className="flex items-center gap-2 font-heading uppercase"
                                onClick={handleRegister}
                            >
                                {t("btn_register")}
                            </Button>
                        )}

                        {/* Add to Calendar Button */}
                        <Button
                            className="flex items-center gap-2 font-heading uppercase"
                            onClick={handleAddToCalendar}
                            variant="outline"
                        >
                            {t("btn_calendar")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
