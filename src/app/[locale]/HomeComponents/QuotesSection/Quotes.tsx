import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { QuoteCard } from "./QuoteCard";
import { quotesData } from "./QuotesData";

const Quotes = () => {
    return (
        <section className="relative text-white lg:mb-0 lg:mt-10">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                {/* Warm gradient */}
                <div className="fade-from-center-bg absolute right-[15rem] top-1/2 h-[120rem] w-full -translate-y-1/2 bg-[#B1219D]/25 blur-xl md:w-screen" />
                {/* Light gradient */}
                <div className="fade-from-center-bg absolute right-[0rem] top-1/2 h-[120rem] w-full -translate-y-1/2 bg-blueviolet-100/10 blur-xl md:w-[80vw] lg:bg-blueviolet-100/20" />
            </div>
            <div className="grid-overlay-right absolute -top-24 lg:h-[43.93rem] xl:w-[55vw] 2xl:h-[50.1rem] 2xl:w-[43vw]"></div>
            <div className="flex flex-col xl:flex-row xl:gap-1 xl:items-center xl:justify-between">
                <Carousel className="flex w-full xl:w-[55%] flex-col justify-center">
                    <CarouselContent>
                        {quotesData.map((quote, index) => (
                            <QuoteCard key={`quote:${index}`} quote={quote} />
                        ))}
                    </CarouselContent>

                    {/* Buttons */}
                    <div className="mt-8 flex justify-center gap-4">
                        <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
                        <CarouselNext className="relative right-0 top-0 translate-y-0" />
                    </div>
                </Carousel>

                <Image
                    src="/imgs/Home/quotes/quotes.webp"
                    alt="Quote Main Image"
                    className="z-10 hidden object-cover xl:-ml-16 xl:block xl:h-[500px] 2xl:-ml-24 2xl:h-[600px] 2xl:max-w-3xl"
                    width={1500}
                    height={1500}
                />
            </div>
        </section>
    );
};

export default Quotes;
