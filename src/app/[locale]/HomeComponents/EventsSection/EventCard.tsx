import Image from "next/image";
import { format } from "date-fns";
import { useTranslations, useLocale } from "next-intl";
import { Event } from "@/app/types/Event";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const locale = useLocale();
    const lang = locale === "fr" ? "fr" : "en";

    const formattedDate = format(event.date, "MMM dd, yyyy"); // e.g., "Mar 25, 2024"
    const day = format(event.date, "dd"); // e.g., "25"
    const month = format(event.date, "MMM"); // e.g., "Mar"
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
                    <div className="flex flex-col">
                        <span className="text-base font-medium text-thistle">
                            {formattedDate}, {timeRange}
                        </span>
                        <span className="text-left font-mono text-base text-thistle">
                            {event.location}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h5 className="text-lg uppercase tracking-tight">{event.title[lang]}</h5>

                {/* Description */}
                <div>
                    <p className={`truncate-multiline font-sans text-base text-gray-400`}>
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
