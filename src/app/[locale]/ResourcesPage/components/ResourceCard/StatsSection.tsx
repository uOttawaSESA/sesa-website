import Image from "next/image";

const getTierTooltip = (tier: string) => {
    switch (tier.toUpperCase()) {
        case "S":
            return "S Tier: The absolute best (only resource you need realistically).";
        case "A":
            return "A Tier: Still great (your main resource, but benefits from comparison).";
        case "B":
            return "B Tier: Good (a comparison/reference resource for additional insights).";
        case "C":
            return "C Tier: Limited (you'll need many more resources to supplement this).";
        default:
            return "No tier information available.";
    }
};

export const StatsSection = ({
    rating,
    tier,
    format,
    size = "base",
    layout = "horizontal",
}: {
    rating: string;
    tier: string;
    format: string;
    size?: "sm" | "base";
    layout?: "horizontal" | "compact";
}) => {
    const iconSize = size === "sm" ? 16 : 20;
    const textSize = size === "sm" ? "text-base" : "text-sm";
    const gapSize = layout === "compact" ? "gap-6" : "gap-7";
    const widthClasses = layout === "compact" ? "" : "w-10";

    return (
        <div className={`flex ${gapSize} font-[Monocode] text-thistle`}>
            {/* Rating */}
            <div className={`flex items-center gap-1 ${widthClasses}`}>
                <Image
                    src="/resources-page/thumbsup.svg"
                    alt="Thumbs Up"
                    width={iconSize}
                    height={iconSize}
                    className={iconSize === 16 ? "h-4 w-4" : "h-5 w-5"}
                />
                <span className={textSize}>{rating}%</span>
            </div>

            {/* Tier with Tooltip */}
            <div className={`relative flex gap-1 ${layout === "horizontal" ? "w-5" : ""}`}>
                <div className="group relative flex items-center gap-1">
                    <Image
                        src="/resources-page/description.svg"
                        alt="Document"
                        width={iconSize}
                        height={iconSize}
                        className={`h-${iconSize === 16 ? "4" : "5"} w-${iconSize === 16 ? "4" : "5"}`}
                    />
                    <span className={textSize}>{tier}</span>
                    <div className="outline-gradient absolute left-1/2 top-10 z-20 -translate-x-1/2 whitespace-nowrap bg-black/60 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg shadow-purple-500/20 backdrop-blur-xl transition-all duration-300 group-hover:opacity-100">
                        {getTierTooltip(tier)}
                    </div>
                </div>
            </div>

            {/* Format */}
            <div className={`flex items-center gap-1 ${layout === "horizontal" ? "w-6" : ""}`}>
                <Image
                    src="/resources-page/folder.svg"
                    alt="Document"
                    width={iconSize}
                    height={iconSize}
                    className={`h-${iconSize === 16 ? "4" : "5"} w-${iconSize === 16 ? "4" : "5"}`}
                />
                <span
                    className={`${format.toLowerCase() === "pdf" ? "uppercase" : "capitalize"} ${textSize}`}
                >
                    {format}
                </span>
            </div>
        </div>
    );
};
