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
            <Carousel className="w-full">
                <CarouselContent>
                    {goalsData.map((goal, index) => (
                        <CarouselItem key={`goal:${index}`}>
                            <GoalCard key={`goal:${index}`} goal={goal} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="mt-8 flex justify-center gap-4">
                    <CarouselPrevious className="relative top-0 left-0 translate-y-0" />
                    <CarouselNext className="relative top-0 right-0 translate-y-0" />
                </div>
            </Carousel>
        </section>
    );
};

export default Goals;
