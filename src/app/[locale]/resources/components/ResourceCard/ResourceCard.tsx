import { CategoryBadges } from "./CategoryBadges";
import { StatsSection } from "./StatsSection";

// Main ResourceCard component
export const ResourceCard = ({
    title,
    category,
    course,
    tier,
    format,
    mode = "grid",
    onOpen,
}: {
    title: string;
    category: string;
    course?: string | null;
    tier: string;
    format: string;
    mode?: "grid" | "row";
    onOpen?: () => void;
}) => {
    // Row mode layout
    if (mode === "row") {
        return (
            <button
                className="group outline-gradient relative flex h-16 w-full items-center p-4 font-heading backdrop-blur-xl transition-all hover:shadow-lg hover:shadow-purple-500/25"
                onClick={onOpen}
                type="button"
            >
                {/* Left side - Category badges */}
                <div className="flex min-w-fit">
                    <CategoryBadges category={category} course={course} size="sm" />
                </div>

                {/* Center - Title */}
                <div className="flex-1 pl-6 min-w-0">
                    <h3 className="truncate group-hover:underline text-sm uppercase text-start leading-tight md:text-base">
                        {title}
                    </h3>
                </div>

                {/* Right side - Stats and controls */}
                <div className="flex items-center">
                    <StatsSection tier={tier} format={format} size="sm" layout="compact" />
                </div>
            </button>
        );
    }

    // Grid mode layout
    return (
        <button
            type="button"
            className="group outline-gradient relative z-10 h-48 w-80 p-6 font-heading backdrop-blur-xl transition-all hover:shadow-lg hover:shadow-purple-500/25 md:w-96"
            onClick={onOpen}
        >
            <div className="relative flex h-full flex-col">
                {/* Category Badges */}
                <div className="mb-3">
                    <CategoryBadges category={category} course={course} size="base" />
                </div>

                {/* Title */}
                <h3 className="line-clamp-3 text-start group-hover:underline overflow-hidden text-base uppercase leading-tight md:text-xl">
                    {title}
                </h3>

                {/* Bottom Section */}
                <div className="absolute -bottom-2 flex flex-row items-center">
                    <StatsSection tier={tier} format={format} size="base" layout="horizontal" />
                </div>
            </div>
        </button>
    );
};

export default ResourceCard;
