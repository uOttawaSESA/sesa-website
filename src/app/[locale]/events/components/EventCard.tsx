"use client";

import { format } from "date-fns";
import createDOMPurify from "dompurify";
import { CalendarClock, MapPin } from "lucide-react";
import { marked } from "marked";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { LocalizedEvent } from "@/server/db/schema";

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
                                className="markdown text-left prose prose-invert max-w-none [&>li]:mb-2 [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:pl-4 [&_a:hover]:text-white [&_a]:text-purple-400 [&_a]:underline"
                                dangerouslySetInnerHTML={{
                                    __html: dialogBody,
                                }}
                            />
                            {/* biome-ignore-end lint/security/noDangerouslySetInnerHtml: HTML has been sanitized */}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div className="w-min border outline-gradient backdrop-blur-2xl p-px font-heading transition-all md:w-auto">
                <div className="flex w-min flex-col justify-start md:w-auto md:flex-row">
                    {/* Left Side: Full-Height Image */}
                    <div>
                        <Image
                            src={event.imageUrl}
                            alt={event.imageAlt}
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

                            {/* Date and Location Text with Icons */}
                            <div className="flex flex-col gap-2 text-thistle">
                                {/* Date and Time with Icons */}
                                <div className="flex items-center gap-2 text-white">
                                    <CalendarClock className="h-4 w-4" />
                                    <span>
                                        {formattedDate}, {timeRange}
                                    </span>
                                </div>

                                {/* Location with Icon */}
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Event Description */}
                        <p className="mt-4 w-full font-mono text-base text-thistle">
                            {truncatedDescription}
                            {description.length > maxDescriptionLength && (
                                <button
                                    type="button"
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
                            {event.registrationUrl && !isRegistered && !isPastEvent && (
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
                                disabled={isPastEvent}
                            >
                                {t("btn_calendar")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventCard;
