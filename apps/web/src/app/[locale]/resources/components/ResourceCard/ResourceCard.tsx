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
    onBadgeClick,
}: {
    title: string;
    category: string;
    course?: string | null;
    tier: string;
    format: string;
    mode?: "grid" | "row";
    onOpen?: () => void;
    onBadgeClick?: (type: "category" | "course", value: string) => void;
}) => {
    // Row mode layout
    if (mode === "row") {
        return (
            <div className="group relative flex h-16 w-full items-center p-4 font-heading outline-gradient backdrop-blur-xl transition-all hover:shadow-lg hover:shadow-purple-500/25">
                {/* Left side - Category badges */}
                <div className="flex min-w-fit">
                    <CategoryBadges
                        category={category}
                        course={course}
                        size="sm"
                        onBadgeClick={onBadgeClick}
                    />
                </div>

                {/* Center - Title */}
                <button className="min-w-0 flex-1 pl-6" onClick={onOpen} type="button">
                    <h3 className="truncate text-start text-sm uppercase leading-tight group-hover:underline md:text-base">
                        {title}
                    </h3>
                </button>

                {/* Right side - Stats and controls */}
                <div className="flex items-center">
                    <StatsSection tier={tier} format={format} size="sm" layout="compact" />
                </div>
            </div>
        );
    }

    // Grid mode layout
    return (
        <div className="group relative z-10 h-48 w-80 p-6 font-heading outline-gradient backdrop-blur-xl transition-all hover:shadow-lg hover:shadow-purple-500/25 md:w-96">
            <div className="relative flex h-full flex-col">
                {/* Category Badges */}
                <div className="mb-3">
                    <CategoryBadges
                        category={category}
                        course={course}
                        size="base"
                        onBadgeClick={onBadgeClick}
                    />
                </div>

                {/* Title */}
                <button type="button" onClick={onOpen} className="hover:cursor-pointer">
                    <h3 className="line-clamp-3 overflow-hidden text-start text-base uppercase leading-tight group-hover:underline md:text-xl">
                        {title}
                    </h3>
                </button>

                {/* Bottom Section */}
                <div className="-bottom-2 absolute flex flex-row items-center">
                    <StatsSection tier={tier} format={format} size="base" layout="horizontal" />
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;
