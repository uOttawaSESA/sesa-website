import Image from "next/image";
import { format } from "date-fns";

interface EventCardProps {
    title: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    location: string;
    description: string;
    imgPath: string;
    details: string;
}

const EventCard: React.FC<EventCardProps> = ({
    title,
    description,
    date,
    startTime,
    endTime,
    location,
    imgPath,
    details,
}) => {
    const formattedDate = format(date, "MMM dd, yyyy"); // e.g., "Mar 25, 2024"
    const day = format(date, "dd"); // e.g., "25"
    const month = format(date, "MMM"); // e.g., "Mar"
    const timeRange = `${format(startTime, "ha")} – ${format(endTime, "ha")}`; // "6PM – 8PM"

    return (
        <div className="relative h-[667px] w-[361px] max-w-sm overflow-hidden border-[1.5px] border-solid border-blueviolet-700 bg-gray-200 opacity-90">
            {/* Event Image */}
            <a href="#">
                <Image
                    className="border-b-[1.5px] border-solid border-blueviolet-700 object-cover"
                    src={imgPath}
                    alt={title}
                    width={361}
                    height={361}
                />
            </a>

            {/* Event Content */}
            <div className="p-5 font-heading">
                {/* Date & Location Row */}
                <div className="mb-3 flex items-center gap-3 text-sm">
                    {/* Date Box */}
                    <div className="outline-gradient flex h-14 w-14 flex-col items-center justify-center">
                        <span className="text-xs">{month}</span>
                        <span className="text-lg">{day}</span>
                    </div>

                    {/* Date & Time */}
                    <div className="flex flex-col">
                        <span className="text-base font-medium text-gray-900 dark:text-white">
                            {formattedDate}, {timeRange}
                        </span>
                        <span className="text-left font-mono text-base text-thistle">
                            {location}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <a href="#">
                    <h5 className="mb-2 text-lg uppercase tracking-tight">{title}</h5>
                </a>

                {/* Description */}
                <p className="mb-3 font-sans text-base text-gray-400">{description}</p>

                <div className="absolute bottom-5 right-5">
                    <a href={details} className="color-gradient text-lg text-transparent">
                        Details
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
