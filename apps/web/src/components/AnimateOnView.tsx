"use client";
import { cn } from "@repo/ui/lib/utils";
import type React from "react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type AnimateOnView = React.PropsWithChildren<{
    className?: string;
    element?: React.ElementType;
    animationClass: string;
    triggerOnce?: boolean;
    threshold?: number;
}>;

const AnimateOnView = ({
    children,
    className,
    element = "span",
    animationClass,
    triggerOnce = true,
    threshold = 0.15,
}: AnimateOnView) => {
    const Element = element;

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { ref, inView } = useInView({
        triggerOnce,
        threshold,
    });

    const extraClasses = mounted && inView ? animationClass : "";

    return (
        <Element ref={ref} className={cn(className, extraClasses)}>
            {children}
        </Element>
    );
};

export default AnimateOnView;
