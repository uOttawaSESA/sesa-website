"use client";
import { useEffect, useRef, useState } from "react";
import { GoalCard } from "./GoalCard";
import { goalsData } from "./GoalsData";
import IconButton from "@/components/IconButton";
import Image from "next/image";

const Goals = () => {
    const items = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    // Scroll to the leftmost position on mount
    useEffect(() => {
        if (items.current) {
            items.current.scrollLeft = 0; // Ensure the carousel starts at the beginning
        }
    }, []);

    // Add scroll event listener for checking position of carousel
    useEffect(() => {
        const carousel = items.current;
        if (carousel) {
            carousel.addEventListener("scroll", checkScrollPosition);
            return () => carousel.removeEventListener("scroll", checkScrollPosition);
        }
    });

    // Check scroll position and update state
    const checkScrollPosition = () => {
        if (items.current) {
            const { scrollLeft, scrollWidth, clientWidth } = items.current;
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
        }
    };
    const scrollItems = (direction: "left" | "right") => {
        if (!items.current) return;

        // Calculate based on container's visible width
        const containerWidth = items.current.clientWidth;
        const scrollAmount = containerWidth + 40;

        items.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };
    return (
        <>
            <section className="relative mt-20 items-center justify-between text-white md:w-full">
                {/* Carousel */}
                <div
                    ref={items}
                    className="flex w-full overflow-x-hidden scroll-smooth"
                    style={{
                        maskImage:
                            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
                    }}
                >
                    {goalsData.map((goal, index) => (
                        <div key={index} className="flex-shrink-0">
                            <GoalCard goal={goal} />
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="absolute bottom-40 flex items-center gap-2 p-4 md:right-40">
                    <IconButton
                        variant="outline"
                        onClick={() => scrollItems("left")}
                        disabled={isAtStart}
                    >
                        <Image
                            src="/resources-page/arrow_backword.svg"
                            width={25}
                            height={25}
                            alt="Left"
                        />
                    </IconButton>
                    <IconButton
                        variant="outline"
                        onClick={() => scrollItems("right")}
                        disabled={isAtEnd}
                    >
                        <Image
                            src="/resources-page/arrow_forward.svg"
                            width={25}
                            height={25}
                            alt="Right"
                        />
                    </IconButton>
                </div>
            </section>
        </>
    );
};

export default Goals;
