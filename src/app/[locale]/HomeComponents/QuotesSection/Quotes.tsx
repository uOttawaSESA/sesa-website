"use client";
import { useEffect, useRef, useState } from "react";
import { QuoteCard } from "./QuoteCard";
import { quotesData } from "./QuotesData";
import IconButton from "@/components/IconButton";
import Image from "next/image";

const Quotes = () => {
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
            <section className="relative items-center justify-between text-white md:w-full">
                {/* Right Image */}
                <div className="grid-overlay-right absolute top-[10rem] md:h-[43.93rem] md:w-[48vw] 2xl:w-[32vw]"></div>
                <div className="absolute right-0 top-[16.3rem] z-50 lg:block">
                    <Image
                        src="/imgs/Home/goals/academic.webp"
                        alt="Quote Main Image"
                        className="w-full object-contain md:h-[500px] 2xl:h-[600px] 2xl:max-w-3xl"
                        width={700}
                        height={700}
                    />
                </div>

                {/* Carousel */}
                <div ref={items} className="flex w-full overflow-x-hidden scroll-smooth">
                    {quotesData.map((quote, index) => (
                        <div key={index} className="flex-shrink-0">
                            <QuoteCard quote={quote} />
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="absolute bottom-40 flex items-center gap-2 p-4 md:left-20">
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

export default Quotes;
