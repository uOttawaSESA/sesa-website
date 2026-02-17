"use client";

import type { LocalizedEvent } from "@repo/db/types";
import { Button } from "@repo/ui/components/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/components/dialog";
import { format } from "date-fns";
import createDOMPurify from "dompurify";
import { CalendarClock, MapPin } from "lucide-react";
import { marked } from "marked";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

interface EventCardProps {
    event: LocalizedEvent;
}

/**
 * Escape text as required by the iCalendar format.
 * @param text Text to escape.
 */
function escapeCalendarText(text: string): string {
    return text
        .replace(/\\/g, "\\\\") // escape backslashes first
        .replace(/;/g, "\\;") // escape semicolons
        .replace(/,/g, "\\,") // escape commas
        .replace(/\r?\n/g, "\\n"); // escape newlines
}

/**
 * Convert a JS date to an iCalendar UTC date.
 * @param date Date to convert.
 */
function dateToCalendar(date: Date): string {
    const pad = (num: number) => String(num).padStart(2, "0");

    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1); // months are 0-indexed
    const day = pad(date.getUTCDate());
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Generates an iCalendar file from event data.
 * @param event Event to use.
 * @param locale Locale to use for localized event data.
 */
function generateCalendarFile(event: LocalizedEvent, locale: "en" | "fr"): string {
    let eventStr = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SESA//${escapeCalendarText(event.title)}//${locale.toUpperCase()}
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:${escapeCalendarText(event.id)}@sesa-aegl.ca
SUMMARY:${escapeCalendarText(event.title)}
DESCRIPTION:${escapeCalendarText(event.description)}
DTSTART:${dateToCalendar(event.startTime)}
DTEND:${dateToCalendar(event.endTime)}
`;

    if (event.location) eventStr += `LOCATION:${escapeCalendarText(event.location)}\n`;

    eventStr += `STATUS:CONFIRMED
BEGIN:VALARM
ACTION:DISPLAY
TRIGGER:-PT1H
DESCRIPTION:Reminder: Event in 1 hour
END:VALARM
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Reminder: Event in 1 day
END:VALARM
END:VEVENT
END:VCALENDAR`;

    return eventStr;
}

export const EventCard = ({ event }: EventCardProps) => {
    const t = useTranslations("events");
    const tType = useTranslations("events.event_type");
    const locale = useLocale();
    const lang = locale === "fr" ? "fr" : "en";

    const [isRegistered, setIsRegistered] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const [icsDialogOpen, setIcsDialogOpen] = useState(false);

    const title = event.title;
    const type = tType(event.type);
    const description = event.description;

    const isPastEvent = event.startTime < new Date();

    const formattedDate = format(event.startTime, "MMM dd, yyyy");
    const day = format(event.startTime, "dd");
    const dayOfWeek = format(event.startTime, "EEE").toUpperCase();
    const timeRange = `${format(event.startTime, "ha")} - ${format(event.endTime, "ha")}`;

    // Handle registration
    const handleRegister = () => {
        if (event.registrationUrl) {
            window.open(event.registrationUrl, "_blank");
            setIsRegistered(true);
        }
    };

    // Handle details
    const handleDetails = () => {
        window.open(event.detailsUrl, "_blank");
    };

    // Handle "Add to Calendar" action
    const handleAddToCalendar = () => {
        // Create ICS file
        const eventStr = generateCalendarFile(event, lang);
        const file = new Blob([eventStr], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(file);

        // Trigger download
        const a = document.createElement("a");
        a.href = url;
        a.download = `${event.title}.ics`;
        a.click();

        // Open modal explaining .ics format
        setIcsDialogOpen(true);

        URL.revokeObjectURL(url);
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

    // Only create DOMPurify when in browser
    const DOMPurify = useMemo(() => {
        if (typeof window !== "undefined") {
            return createDOMPurify(window);
        }
        return null;
    }, []);

    // Helper function to safely parse markdown
    const parseMarkdown = (markdown: string) => {
        const rawHTML = marked(markdown, { async: false }) as string;
        return DOMPurify ? DOMPurify.sanitize(rawHTML) : "";
    };

    const dialogBody = parseMarkdown(t("calendar_export"));

    return (
        <>
            <Dialog open={icsDialogOpen} onOpenChange={setIcsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Event File Downloaded</DialogTitle>
                        <DialogDescription>
                            {/* biome-ignore-start lint/security/noDangerouslySetInnerHtml: HTML has been sanitized */}
                            <div
                                className="markdown prose prose-invert max-w-none text-left [&>li]:mb-2 [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:pl-4 [&_a:hover]:text-white [&_a]:text-purple-400 [&_a]:underline"
                                dangerouslySetInnerHTML={{
                                    __html: dialogBody,
                                }}
                            />
                            {/* biome-ignore-end lint/security/noDangerouslySetInnerHtml: HTML has been sanitized */}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div className="flex w-full flex-col justify-start border font-heading outline-gradient backdrop-blur-2xl transition-all md:mb-4 md:max-w-72 lg:max-w-none lg:flex-row">
                {/* Left Side: Full-Height Image */}
                <Image
                    src={event.imageUrl}
                    alt={event.imageAlt}
                    width={350}
                    height={350}
                    className="aspect-square w-full object-cover lg:size-96"
                />

                {/* Right Side: Event Details */}
                <div className="flex h-full flex-col justify-between gap-4 p-6">
                    {/* Event Type Badge */}
                    <div>
                        <span className="cursor-pointer bg-linear-to-r from-blueviolet-100 to-darkmagenta px-3 py-1 text-xs uppercase md:text-base">
                            {type}
                        </span>
                    </div>

                    {/* Event Title */}
                    <h3 className="text-xl uppercase leading-tight md:text-2xl">{title}</h3>

                    {/* Date and Location */}
                    <div className="flex items-center gap-4 font-mono text-white">
                        {/* Date Box */}
                        <div className="flex aspect-square flex-col items-center justify-center border px-4 outline-gradient">
                            <div className="font-heading text-xs uppercase">{dayOfWeek}</div>
                            <div className="font-heading text-xl">{day}</div>
                        </div>

                        {/* Date and Location Text with Icons */}
                        <div className="flex flex-col gap-2 text-thistle">
                            {/* Date and Time with Icons */}
                            <div className="flex items-center gap-2 text-nowrap text-white text-xs md:text-wrap xl:text-base">
                                <CalendarClock className="size-4" />
                                <span>
                                    {formattedDate}, {timeRange}
                                </span>
                            </div>

                            {/* Location with Icon */}
                            <div className="flex items-center gap-2 text-xs xl:text-base">
                                <MapPin className="size-4" />
                                <span>{event.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Event Description */}
                    <p className="w-full font-mono text-sm text-thistle xl:text-base">
                        {truncatedDescription}
                        {description.length > maxDescriptionLength && (
                            <button
                                type="button"
                                onClick={toggleDescription}
                                className="cursor-pointer text-blueviolet-100 hover:underline focus:outline-hidden"
                            >
                                {showFullDescription ? "Show Less" : "Show More"}
                            </button>
                        )}
                    </p>

                    {/* Buttons */}
                    <div className="mt-auto flex w-full flex-wrap justify-start gap-2">
                        {/* Details Button */}
                        <Button
                            className="flex-grow px-4 font-heading text-sm uppercase md:text-base xl:flex-grow-0"
                            onClick={handleDetails}
                        >
                            {t("btn_details")}
                        </Button>

                        {/* Register Button (only for events that require registration) */}
                        {event.registrationUrl && !isRegistered && !isPastEvent && (
                            <Button
                                className="flex-grow font-heading text-sm uppercase md:text-base xl:flex-grow-0"
                                onClick={handleRegister}
                            >
                                {t("btn_register")}
                            </Button>
                        )}

                        {/* Add to Calendar Button */}
                        <Button
                            className="flex-grow font-heading text-sm uppercase md:text-base xl:flex-grow-0"
                            onClick={handleAddToCalendar}
                            variant="outline"
                            disabled={isPastEvent}
                        >
                            {t("btn_calendar")}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventCard;
