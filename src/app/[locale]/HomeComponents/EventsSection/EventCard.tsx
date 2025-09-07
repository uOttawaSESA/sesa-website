import { format } from "date-fns";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Event } from "@/schemas/events";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const locale = useLocale();
    const lang = locale === "fr" ? "fr" : "en";

    const formattedDate = format(event.startTime, "MMM dd, yyyy"); // e.g., "Mar 25, 2024"
    const day = format(event.startTime, "dd"); // e.g., "25"
    const month = format(event.startTime, "MMM"); // e.g., "Mar"
    const timeRange = `${format(event.startTime, "ha")} – ${format(event.endTime, "ha")}`; // "6PM – 8PM"

    const t = useTranslations("homepage");

    return (
        <div className="flex h-full w-full flex-col overflow-hidden border-2 border-solid border-blueviolet-700 bg-gray-200 opacity-90">
            {/* Event Image */}
            <Image
                className="h-[350px] w-full border-b-2 border-solid border-blueviolet-700 object-cover"
                src={event.image}
                alt={event.title[lang]}
                width={350}
                height={350}
            />

            {/* Event Content */}
            <div className="flex flex-col gap-2 p-4 font-heading">
                {/* Date & Location Row */}
                <div className="flex items-center gap-3 text-sm">
                    {/* Date Box */}
                    <div className="outline-gradient flex aspect-square h-full flex-col items-center justify-center px-3">
                        <span className="text-xs">{month}</span>
                        <span className="text-lg">{day}</span>
                    </div>

                    {/* Date & Time */}
                    <div className="flex flex-col gap-1 font-mono text-thistle">
                        {/* Date with Calendar Icon */}
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <span className="text-base font-medium">{formattedDate}</span>
                        </div>

                        {/* Time with Clock Icon */}
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-base font-medium">{timeRange}</span>
                        </div>

                        {/* Location with Map Pin Icon */}
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="text-left text-base">{event.location}</span>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h5 className="text-lg uppercase tracking-tight">{event.title[lang]}</h5>

                {/* Description */}
                <div>
                    <p className={`truncate-multiline font-sans text-base text-thistle`}>
                        {event.description[lang]}
                    </p>
                </div>
            </div>
            <div className="mb-4 mt-auto px-4 text-right">
                <a
                    href={event.instagramLink}
                    target="_blank"
                    className="color-gradient-clickable text-lg text-transparent"
                >
                    {t("event_card_details_btn")}
                </a>
            </div>
        </div>
    );
};
export default EventCard;
