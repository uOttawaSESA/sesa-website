import Button from "@/components/Button";
import EventsCarousel from "./EventsCarousel";
import IconButton from "@/components/IconButton";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Events() {
    const [scrollItems, setScrollItems] = useState<((direction: "left" | "right") => void) | null>(
        null,
    );

    const t = useTranslations("homepage");

    return (
        <>
            <section className="relative mt-20 w-full items-center justify-between text-white md:ps-32 2xl:ps-96">
                {/* Content Container */}
                <div className="relative z-10 max-w-2xl">
                    <p className="font-monocode relative inline-block !bg-clip-text text-left text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                        {t("events")}
                    </p>
                    <h1 className="mt-4 font-heading text-4xl uppercase leading-tight">
                        <span className="relative inline-block">
                            {t("events_heading_hl")}
                            <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                        </span>{" "}
                        {t("events_heading")}
                    </h1>
                    <p className="relative flex w-[40rem] items-center text-left font-sans text-xl text-thistle">
                        {t("events_subheading")}
                    </p>

                    <div className="mt-6 flex flex-row items-center justify-between md:w-[70rem] 2xl:w-[100rem]">
                        <div className="flex font-heading">
                            <Button
                                className="font-heading text-lg uppercase"
                                href="/pages/EventsPage"
                            >
                                {t("view_all_events")}
                            </Button>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-2">
                            <IconButton
                                variant="outline"
                                onClick={() => scrollItems && scrollItems("left")}
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
                                onClick={() => scrollItems && scrollItems("right")}
                            >
                                <Image
                                    src="/resources-page/arrow_forward.svg"
                                    width={25}
                                    height={25}
                                    alt="Right"
                                />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Carousel */}
            <EventsCarousel setScrollFunction={setScrollItems} />
        </>
    );
}
