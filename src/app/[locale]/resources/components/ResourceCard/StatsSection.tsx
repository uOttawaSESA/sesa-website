import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Tooltip component to display tier information
// This uses a portal to render the tooltip outside the normal DOM hierarchy
const TooltipPortal = ({
    children,
    position,
    id,
}: {
    children: React.ReactNode;
    position: { top: number; left: number };
    id?: string;
}) => {
    return createPortal(
        <div
            id={id}
            className="outline-gradient fixed z-9999 px-3 py-1.5 text-sm text-white shadow-lg shadow-purple-500/20 backdrop-blur-xl"
            style={{ top: position.top, left: position.left }}
        >
            {children}
        </div>,
        document.body,
    );
};

export const StatsSection = ({
    tier,
    format,
    size = "base",
    layout = "horizontal",
}: {
    tier: string;
    format: string;
    size?: "sm" | "base";
    layout?: "horizontal" | "compact";
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
    const iconRef = useRef<HTMLDivElement>(null);

    const t = useTranslations("resources");

    const tooltipId = useId();

    const iconSize = size === "sm" ? 16 : 20;
    const textSize = size === "sm" ? "text-base" : "text-sm";
    const gapSize = layout === "compact" ? "gap-6" : "gap-7";

    useEffect(() => {
        if (showTooltip && iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            setTooltipPos({
                top: rect.bottom + 8, // 8px offset
                left: rect.left + rect.width / 2 - 100,
            });
        }
    }, [showTooltip]);

    const getTierTooltip = (tier: string) => {
        switch (tier.toUpperCase()) {
            case "S":
                return t("tooltip.s_tier");
            case "A":
                return t("tooltip.a_tier");
            case "B":
                return t("tooltip.b_tier");
            case "C":
                return t("tooltip.c_tier");
            default:
                return t("tooltip.default");
        }
    };

    return (
        <div className={`flex ${gapSize} font-[Monocode] text-thistle`}>
            {/* Tier with Tooltip */}
            <div className={`relative flex gap-1 ${layout === "horizontal" ? "w-5" : ""}`}>
                <div
                    ref={iconRef}
                    role="tooltip"
                    aria-describedby={tooltipId}
                    className="-m-1 flex flex-1 items-center px-1 py-1"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <Image
                        src="/resources-page/description.svg"
                        alt="Document"
                        width={iconSize}
                        height={iconSize}
                        className={`h-${iconSize === 16 ? "4" : "5"} w-${iconSize === 16 ? "4" : "5"} mr-1`}
                    />
                    <span className={textSize}>{tier}</span>
                </div>
                {showTooltip && (
                    <TooltipPortal id={tooltipId} position={tooltipPos}>
                        {getTierTooltip(tier)}
                    </TooltipPortal>
                )}
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
