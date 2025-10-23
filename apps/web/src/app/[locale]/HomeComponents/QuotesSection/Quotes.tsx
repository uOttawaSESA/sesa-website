import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@repo/ui/components/carousel";
import Image from "next/image";
import { QuoteCard } from "./QuoteCard";
import { quotesData } from "./QuotesData";

const Quotes = () => {
    return (
        <section className="relative text-white lg:mt-10 lg:mb-0">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                {/* Warm gradient */}
                <div className="fade-from-center-bg -translate-y-1/2 absolute top-1/2 right-[15rem] h-[120rem] w-full bg-[#B1219D]/25 blur-xl md:w-screen" />
                {/* Light gradient */}
                <div className="fade-from-center-bg -translate-y-1/2 absolute top-1/2 right-[0rem] h-[120rem] w-full bg-blueviolet-100/10 blur-xl md:w-[80vw] lg:bg-blueviolet-100/20" />
            </div>
            <div className="grid-overlay-right -top-24 absolute lg:h-[43.93rem] xl:w-[55vw] 2xl:h-[50.1rem] 2xl:w-[43vw]"></div>
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between xl:gap-1">
                <Carousel className="flex w-full flex-col justify-center xl:w-[55%]">
                    <CarouselContent>
                        {quotesData.map((quote, index) => (
                            <QuoteCard key={`quote:${index}`} quote={quote} />
                        ))}
                    </CarouselContent>

                    {/* Buttons */}
                    <div className="mt-8 flex justify-center gap-4">
                        <CarouselPrevious
                            className="relative top-0 left-0 translate-y-0"
                            image={
                                <Image
                                    src="/resources-page/arrow_backword.svg"
                                    width={25}
                                    height={25}
                                    alt="Left"
                                />
                            }
                        />
                        <CarouselNext
                            className="relative top-0 right-0 translate-y-0"
                            image={
                                <Image
                                    src="/resources-page/arrow_forward.svg"
                                    width={25}
                                    height={25}
                                    alt="Right"
                                />
                            }
                        />
                    </div>
                </Carousel>

                <Image
                    src="/imgs/Home/quotes/quotes.webp"
                    alt="Quote Main Image"
                    className="xl:-ml-16 2xl:-ml-24 z-10 hidden object-cover xl:block xl:h-[500px] 2xl:h-[600px] 2xl:max-w-3xl"
                    width={1500}
                    height={1500}
                />
            </div>
        </section>
    );
};

export default Quotes;
