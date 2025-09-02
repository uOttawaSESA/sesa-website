"use client";
import { useInView } from "react-intersection-observer";
import type React from "react";

type FadeInSectionProps = React.PropsWithChildren<{
    className?: string;
}>;

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, className = "" }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.15,
    });

    return (
        <section ref={ref} className={`fade-in-section ${inView ? "in-view" : ""} ${className}`}>
            {children}
        </section>
    );
};

export default FadeInSection;
