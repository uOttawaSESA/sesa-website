"use client";
import { cn } from "@repo/ui/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export interface MetricProps {
    /** The figure to display. */
    figure: number;
    /** An optional prefix before the figure. */
    prefix?: string;
    /** An optional suffix after the figure. */
    suffix?: string;
    /** The caption under the figure, eg. `Ranking` or `EECS students` */
    caption?: string | undefined;
    /** Whether to add a coloured border around the component */
    border?: boolean | undefined;
    /** Additional classes added to the metric container */
    className?: string | undefined;
}

const Metric = ({ figure, prefix, suffix, caption, border, className }: MetricProps) => {
    const baseStyle = "py-5 px-10 text-center w-min h-min";

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.15,
    });

    // Create a motion value starting at 0
    const count = useMotionValue(0);

    // Create a spring animation with ease-in-out feel
    const spring = useSpring(count, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Transform the spring value to rounded integers
    const display = useTransform(
        spring,
        current => `${prefix ?? ""}${Math.round(current).toLocaleString()}${suffix ?? ""}`,
    );

    useEffect(() => {
        // Animate to figure value once the user scrolls the metric into view
        if (inView) {
            const controls = count.set(figure);
            return () => controls;
        }
    }, [figure, count, inView]);

    return (
        <div className={cn(baseStyle, border && "outline-gradient", className)}>
            <motion.span ref={ref} className="font-heading text-3xl">
                {display}
            </motion.span>
            {caption && (
                <p className="whitespace-nowrap font-sans text-lg text-thistle">{caption}</p>
            )}
        </div>
    );
};

export default Metric;
