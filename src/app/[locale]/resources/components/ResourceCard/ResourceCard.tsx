import { CategoryBadges } from "./CategoryBadges";
import { OpenButton } from "./OpenButton";
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
    course?: string;
    tier: string;
    format: string;
    mode?: "grid" | "row";
    onOpen?: () => void;
}) => {
    // Row mode layout
    if (mode === "row") {
        return (
            <div className="group outline-gradient relative flex h-16 w-full items-center p-4 font-heading backdrop-blur-xl transition-all hover:shadow-lg hover:shadow-purple-500/25">
                {/* Left side - Category badges */}
                <div className="flex min-w-fit">
                    <CategoryBadges category={category} course={course} size="sm" />
                </div>

                {/* Center - Title */}
                <div className="flex-1 pl-6">
                    <h3 className="truncate text-sm uppercase leading-tight md:text-base">
                        {title}
                    </h3>
                </div>

                {/* Right side - Stats and controls */}
                <div className="flex items-center">
                    <StatsSection tier={tier} format={format} size="sm" layout="compact" />

                    {/* Open Button */}
                    <div className="ml-24">
                        <OpenButton onOpen={onOpen} />
                    </div>
                </div>
            </div>
        );
    }

    // Grid mode layout
    return (
        <div className="group outline-gradient relative z-10 h-48 w-80 p-6 font-heading backdrop-blur-xl transition-all hover:shadow-lg hover:shadow-purple-500/25 md:w-96">
            <div className="relative flex h-full flex-col">
                {/* Category Badges */}
                <div className="mb-4">
                    <CategoryBadges category={category} course={course} size="base" />
                </div>

                {/* Title */}
                <h3 className="line-clamp-3 overflow-hidden text-base uppercase leading-tight md:text-xl">
                    {title}
                </h3>

                {/* Bottom Section */}
                <div className="absolute -bottom-2 flex flex-row items-center">
                    <StatsSection tier={tier} format={format} size="base" layout="horizontal" />

                    {/* Open Button */}
                    <div className="ms-14 md:ms-44">
                        <OpenButton onOpen={onOpen} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;
