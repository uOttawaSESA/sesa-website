import ConnectSESA from "./components/ConnectSESA";
import EventSection from "./components/EventSection";
import InfiniteCarousel from "./components/InfiniteCarousel";
import TeamUpSection from "./components/TeamUpSection";
import Image from "next/image";

import { Metadata } from "next";

// Precompile i18n
import localeParams from "@/app/data/locales";
export const generateStaticParams = localeParams;

export const metadata: Metadata = {
    title: "Events | Software Engineering Student Association",
    description: "Stay up to date on SESA's events at the University of Ottawa.",
    alternates: {
        canonical: "/events",
        languages: {
            en: "/en/events",
            fr: "/fr/events",
        },
    },
    openGraph: {
        title: "Events | Software Engineering Student Association",
        description: "Stay up to date on SESA's events at the University of Ottawa.",
        url: new URL("https://sesa-aegl.ca/events"),
    },
};

const Events = () => {
    return (
        <div className="min-h-screen font-heading text-white">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                {/* Warm gradient */}
                <div className="fade-from-top-left-bg absolute h-[70rem] w-full bg-[#B1219D] bg-opacity-15 blur-sm md:w-[60vw]" />

                {/* Light gradient */}
                <div className="fade-from-left-bg absolute top-[75rem] h-[70rem] w-[30vw] bg-blueviolet-100 bg-opacity-25 blur-sm" />

                <Image
                    src="/decoration/waves.svg"
                    className="fade-from-top-bg absolute left-1/2 top-[26.5rem] -translate-x-1/2 transform md:top-[16rem]"
                    width={1200}
                    height={280}
                    alt=""
                />

                <Image
                    src="/decoration/star-faded.svg"
                    className="absolute left-[20rem] top-[8rem] md:left-[16rem] md:top-[16rem]"
                    width={55}
                    height={55}
                    alt=""
                />
                <Image
                    src="/decoration/star.svg"
                    className="absolute right-[11rem] top-[22rem] hidden md:block"
                    width={125}
                    height={128}
                    alt=""
                />
            </div>

            <div className="relative z-10">
                <EventSection />
                <TeamUpSection />
                <ConnectSESA />

                <div className="pointer-events relative mb-52 select-none">
                    {/* Bottom Star Decoration */}
                    <Image
                        src="/decoration/star.svg"
                        className="absolute bottom-[-9rem] left-[4rem] rotate-[-110deg] transform md:bottom-[-7rem] md:left-[10rem]"
                        width={100}
                        height={100}
                        alt=""
                    />

                    <InfiniteCarousel />
                </div>
            </div>
        </div>
    );
};

export default Events;
