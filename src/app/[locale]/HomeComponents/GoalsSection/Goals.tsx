import { GoalCard } from "./GoalCard";
import { goalsData } from "./GoalsData";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Goals = () => {
    return (
        <section className="relative">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                {/* Warm gradient */}
                <div className="fade-from-center-bg absolute left-1/2 top-1/2 h-[70rem] w-full -translate-x-1/2 -translate-y-1/2 bg-[#B1219D] bg-opacity-15 blur-sm md:w-[60vw]" />

                <Image
                    src="/decoration/star.svg"
                    className="absolute hidden md:right-[10rem] md:top-[5rem] md:block"
                    width={120}
                    height={120}
                    alt=""
                />
            </div>
            <Carousel className="w-full">
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
