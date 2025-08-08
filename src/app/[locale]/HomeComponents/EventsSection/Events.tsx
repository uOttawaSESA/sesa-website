import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import EventCard from "./EventCard";
import { events } from "@/app/data/Events";

export default function Events() {
    const t = useTranslations("homepage");

    return (
        <section className="space-y-4 ps-8 md:ps-20 xl:ps-32">
            <div className="max-w-80 sm:max-w-md md:max-w-2xl">
                <p className="font-monocode relative inline-block !bg-clip-text text-left text-xs text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)] md:text-base">
                    {t("events")}
                </p>
                <h2 className="my-2 font-heading text-2xl uppercase leading-tight md:text-4xl">
                    <span className="highlight-text">{t("events_heading_hl")}</span>{" "}
                    {t("events_heading")}
                </h2>
                <p className="relative flex items-center text-left font-sans text-base text-thistle md:text-lg">
                    {t("events_subheading")}
                </p>

                <div className="mt-4 flex w-[90%] flex-row items-center justify-between md:mt-6">
                    <div className="flex font-heading">
                        <Button className="font-heading text-sm uppercase md:text-lg">
                            <Link href="/EventsPage">{t("view_all_events")}</Link>
                        </Button>
                    </div>
                </div>
            </div>
            {events.length === 0 ? (
                <></>
            ) : (
                <Carousel className="w-full pe-8" opts={{ align: "start" }}>
                    <CarouselContent>
                        {events.map((event, index) => (
                            <CarouselItem
                                className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                key={`event:${index}`}
                            >
                                <EventCard {...event} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className="mt-8 flex justify-center gap-4">
                        <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
                        <CarouselNext className="relative right-0 top-0 translate-y-0" />
                    </div>
                </Carousel>
            )}
        </section>
    );
}
