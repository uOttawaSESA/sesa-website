import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Star from "@/components/ui/decorations/star";
import { GoalCard } from "./GoalCard";
import { goalsData } from "./GoalsData";

const Goals = () => {
    return (
        <section className="relative">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                {/* Warm gradient */}
                <div className="fade-from-center-bg -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[70rem] w-full bg-[#B1219D]/15 blur-xs md:w-[60vw]" />

                <Star
                    variant="star"
                    className="hidden md:top-[5rem] md:right-[10rem] md:block"
                    delay={1}
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
                    <CarouselPrevious className="relative top-0 left-0 translate-y-0" />
                    <CarouselNext className="relative top-0 right-0 translate-y-0" />
                </div>
            </Carousel>
        </section>
    );
};

export default Goals;
