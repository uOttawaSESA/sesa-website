import { quotesData } from "./QuotesData";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { QuoteCard } from "./QuoteCard";

const Quotes = () => {
    return (
        <section className="relative text-white">
            <div className="grid-overlay-right absolute -top-24 xl:h-[43.93rem] xl:w-[48vw] 2xl:w-[32vw]"></div>
            <div className="flex flex-col xl:flex-row xl:gap-8">
                <Carousel className="flex flex-col xl:items-start xl:ps-32">
                    <CarouselContent>
                        {quotesData.map((quote, index) => (
                            <QuoteCard key={`quote:${index}`} quote={quote} />
                        ))}
                    </CarouselContent>
                    <div className="mt-8 flex justify-center gap-4 xl:justify-start">
                        <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
                        <CarouselNext className="relative right-0 top-0 translate-y-0" />
                    </div>
                </Carousel>

                <Image
                    src="/imgs/Home/goals/academic.webp"
                    alt="Quote Main Image"
                    className="z-10 hidden object-cover xl:block xl:h-[500px] 2xl:h-[600px] 2xl:max-w-3xl"
                    width={700}
                    height={700}
                />
            </div>
        </section>
    );
};

export default Quotes;
