export const CategoryBadges = ({
    category,
    course,
    size = "sm",
    onBadgeClick,
}: {
    category: string;
    course?: string | null;
    size?: "sm" | "base";
    onBadgeClick?: (type: "category" | "course", value: string) => void;
}) => {
    const sizeClasses = size === "sm" ? "text-xs px-3 py-2" : "text-sm p-2";

    return (
        <div className="flex gap-2 font-thin">
            <button
                type="button"
                className={`cursor-pointer bg-linear-to-r from-blueviolet-100 to-darkmagenta uppercase ${sizeClasses}`}
                onClick={e => {
                    e.stopPropagation();
                    onBadgeClick?.("category", category);
                }}
            >
                {category}
            </button>
            {course && (
                <button
                    type="button"
                    className={`cursor-pointer bg-linear-to-r from-blueviolet-100 to-darkmagenta uppercase ${sizeClasses}`}
                    onClick={e => {
                        e.stopPropagation();
                        onBadgeClick?.("course", course);
                    }}
                >
                    {course}
                </button>
            )}
        </div>
    );
};
