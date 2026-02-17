"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import type React from "react";

type AnimateOnView = React.PropsWithChildren<{
    className?: string;
    animationClass: string;
    triggerOnce?: boolean;
    threshold?: number;
}>;

const AnimateOnView = ({
    children,
    className = "",
    animationClass,
    triggerOnce = true,
    threshold = 0.15,
}: AnimateOnView) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { ref, inView } = useInView({
        triggerOnce,
        threshold,
    });

    return (
        <div ref={ref} className={`${mounted && inView ? animationClass : ""} ${className}`}>
            {children}
        </div>
    );
};

export default AnimateOnView;
