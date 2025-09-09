import Image from "next/image";
// Precompile i18n
import localeParams from "@/app/data/locales";
import FadeInSection from "@/components/FadeInSection";
import Star from "@/components/ui/decorations/star";
import Providers from "../providers";
import ConnectSESA from "./components/ConnectSESA";
import EventSection from "./components/EventSection";
import InfiniteCarousel from "./components/InfiniteCarousel";
import TeamUpSection from "./components/TeamUpSection";
import type { Metadata } from "next";
export const generateStaticParams = localeParams;

export const metadata: Metadata = {
    title: "Events | Software Engineering Students' Association",
    description: "Stay up to date on SESA's events at the University of Ottawa.",
    alternates: {
        canonical: "/events",
        languages: {
            en: "/en/events",
            fr: "/fr/events",
        },
    },
    openGraph: {
        title: "Events | Software Engineering Students' Association",
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

                <Star variant="star" className="right-[11rem] top-[22rem]" delay={1} />
                <Star
                    variant="star-faded"
                    className="left-[20rem] top-[8rem] md:left-[16rem] md:top-[16rem]"
                    delay={0.5}
                    showMobile={true}
                />
            </div>

            <div className="relative z-10">
                <FadeInSection>
                    <Providers>
                        <EventSection />
                    </Providers>
                </FadeInSection>
                <FadeInSection>
                    <TeamUpSection />
                </FadeInSection>
                <FadeInSection>
                    <ConnectSESA />
                </FadeInSection>

                <div className="pointer-events relative mb-52 select-none">
                    {/* Bottom Star Decoration */}
                    <Star
                        variant="star"
                        className="absolute bottom-[-9rem] left-[4rem] rotate-[-110deg] transform md:bottom-[-8rem] md:left-[10rem]"
                        delay={1}
                        rotate={-110}
                    />
                    <Star
                        variant="star"
                        className="absolute bottom-[-9rem] right-[14rem] md:bottom-[-10rem] md:right-[10rem]"
                        delay={1}
                    />
                    <Star
                        variant="star-faded"
                        className="absolute bottom-[-6rem] right-[9rem] rotate-[30deg] transform md:block"
                        delay={0.5}
                    />

                    <FadeInSection>
                        <InfiniteCarousel />
                    </FadeInSection>
                </div>
            </div>
        </div>
    );
};

export default Events;
