"use client";

import { motion } from "framer-motion";
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
    delay = 0,
    width,
    height,
    rotate = 0,
    showMobile = false,
}: StarProps) => {
    const { src, width: defaultWidth, height: defaultHeight } = STAR_CONFIG[variant];

    return (
        <div
            className={`pointer-events-none absolute transform-gpu select-none will-change-transform ${
                showMobile ? "block" : "hidden md:block"
            } ${className}`}
            style={{
                backfaceVisibility: "hidden",
                transform: `rotate(${rotate}deg)`,
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay,
                    ease: "easeInOut",
                    type: "tween",
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
            </motion.div>
        </div>
    );
};

export default Star;
