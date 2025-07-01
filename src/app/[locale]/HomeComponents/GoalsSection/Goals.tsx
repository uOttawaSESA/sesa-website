"use client";
import { GoalCard } from "./GoalCard";
import { goalsData } from "./GoalsData";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const Goals = () => {
    return (
        <section className="relative">
            <div className="grid-overlay-left md:h-[43.93rem] md:w-[48vw] 2xl:w-[32vw]"></div>
            <Carousel className="w-full px-8 md:pe-0 md:ps-0">
                <CarouselContent>
                    {goalsData.map((goal, index) => (
                        <CarouselItem key={`goal:${index}`}>
                            <GoalCard key={`goal:${index}`} goal={goal} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="mt-8 flex justify-center gap-4">
                    <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
                    <CarouselNext className="relative right-0 top-0 translate-y-0" />
                </div>
            </Carousel>
        </section>
    );
};

export default Goals;
