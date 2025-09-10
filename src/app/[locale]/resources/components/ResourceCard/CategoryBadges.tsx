export const CategoryBadges = ({
    category,
    course,
    size = "sm",
}: {
    category: string;
    course?: string | null;
    size?: "sm" | "base";
}) => {
    const sizeClasses = size === "sm" ? "text-xs px-3 py-2" : "text-sm p-2";

    return (
        <div className="flex gap-2 font-thin">
            <span
                className={`cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta uppercase ${sizeClasses}`}
            >
                {category}
            </span>
            {course && (
                <span
                    className={`cursor-pointer bg-gradient-to-r from-blueviolet-100 to-darkmagenta uppercase ${sizeClasses}`}
                >
                    {course}
                </span>
            )}
        </div>
    );
};
