import Image from "next/image";
import { format } from "date-fns";
import { Event } from "@/app/[locale]/EventsPage/utils/types";

const EventCard: React.FC<Event> = ({
    title,
    description,
    date,
    startTime,
    endTime,
    location,
    image,
    instagramLink,
}) => {
    const formattedDate = format(date, "MMM dd, yyyy"); // e.g., "Mar 25, 2024"
    const day = format(date, "dd"); // e.g., "25"
    const month = format(date, "MMM"); // e.g., "Mar"
    const timeRange = `${format(startTime, "ha")} – ${format(endTime, "ha")}`; // "6PM – 8PM"

    return (
        <div className="flex h-full w-full flex-col overflow-hidden border-2 border-solid border-blueviolet-700 bg-gray-200 opacity-90">
            {/* Event Image */}
            <a href="#">
                <Image
                    className="w-full border-b-2 border-solid border-blueviolet-700 object-cover"
                    src={image}
                    alt={title}
                    width={350}
                    height={350}
                />
            </a>

            {/* Event Content */}
            <div className="flex flex-col gap-2 p-4 font-heading">
                {/* Date & Location Row */}
                <div className="flex items-center gap-3 text-sm">
                    {/* Date Box */}
                    <div className="outline-gradient flex aspect-square h-full flex-col items-center justify-center p-2">
                        <span className="text-xs">{month}</span>
                        <span className="text-lg">{day}</span>
                    </div>

                    {/* Date & Time */}
                    <div className="flex flex-col">
                        <span className="text-base font-medium text-thistle">
                            {formattedDate}, {timeRange}
                        </span>
                        <span className="text-left font-mono text-base text-thistle">
                            {location}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h5 className="text-lg uppercase tracking-tight">{title}</h5>

                {/* Description */}
                <div>
                    <p className={`truncate-multiline font-sans text-base text-gray-400`}>
                        {description}
                    </p>
                </div>
            </div>
            <div className="mb-4 mt-auto px-4 text-right">
                <a
                    href={instagramLink}
                    target="_blank"
                    className="color-gradient-clickable text-lg text-transparent"
                >
                    Details
                </a>
            </div>
        </div>
    );
};

export default EventCard;
