import Image from "next/image";

type StarVariant = "star" | "star-faded";

interface StarProps {
    variant: StarVariant;
    className?: string; // extra positioning / rotation / breakpoints
    delay?: number; // optional: stagger shimmer
    width?: number; // override width
    height?: number; // override height
    rotate?: number; // rotation in degrees
    showMobile?: boolean; // whether to show on mobile (default: false)
}

const STAR_CONFIG: Record<StarVariant, { src: string; width: number; height: number }> = {
    star: { src: "/decoration/star.svg", width: 121, height: 121 },
    "star-faded": { src: "/decoration/star-faded.svg", width: 50, height: 50 },
};

const Star = ({
    variant,
    className = "",
    width,
    height,
    rotate = 0,
    showMobile = false,
}: StarProps) => {
    const { src, width: defaultWidth, height: defaultHeight } = STAR_CONFIG[variant];

    return (
        <div
            className={`pointer-events-none absolute select-none ${
                showMobile ? "block" : "hidden md:block"
            } ${className}`}
            style={{
                backfaceVisibility: "hidden",
                transform: `rotate(${rotate}deg)`,
            }}
        >
            <Image
                src={src}
                width={width ?? defaultWidth}
                height={height ?? defaultHeight}
                alt=""
                className="block drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
                style={{ maxWidth: "none", display: "block" }}
            />
        </div>
    );
};

export default Star;
