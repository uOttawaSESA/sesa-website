import Image from "next/image";
import { NextResponse } from "next/server";
import { getLocale, getTranslations } from "next-intl/server";
// Precompile i18n
import localeParams from "@/app/data/locales";
import FadeInSection from "@/components/FadeInSection";
import Star from "@/components/ui/decorations/star";
import { api, HydrateClient } from "@/trpc/server";
import ConnectSESA from "./components/ConnectSESA";
import EventSection from "./components/EventSection";
import InfiniteCarousel from "./components/InfiniteCarousel";
import TeamUpSection from "./components/TeamUpSection";
import type { Metadata } from "next";
export const generateStaticParams = localeParams;

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const t = await getTranslations("meta");

    const title = `${t("events_title")} | ${t("title_suffix")}`;
    const description = t("events_description");

    return {
        title,
        description,
        alternates: {
            canonical: `/${locale}/events`,
            languages: {
                en: "/en/events",
                fr: "/fr/events",
            },
        },
        openGraph: {
            title,
            description,
            url: new URL("https://sesa-aegl.ca/events"),
        },
    };
}

export default async function Events() {
    const locale = await getLocale();
    if (locale !== "en" && locale !== "fr")
        return NextResponse.json({ message: "Invalid locale" }, { status: 400 });

    void api.event.getAll.prefetch({ locale });

    return (
        <HydrateClient>
            <div className="min-h-screen font-heading text-white">
                {/* Decorations */}
                <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                    {/* Warm gradient */}
                    <div className="fade-from-top-left-bg absolute h-[70rem] w-full bg-[#B1219D]/15 blur-xs md:w-[60vw]" />

                    {/* Light gradient */}
                    <div className="fade-from-left-bg absolute top-[75rem] h-[70rem] w-[30vw] bg-blueviolet-100/25 blur-xs" />

                    <Image
                        src="/decoration/waves.svg"
                        className="fade-from-top-bg -translate-x-1/2 absolute top-[26.5rem] left-1/2 transform md:top-[10rem]"
                        width={1200}
                        height={280}
                        alt=""
                    />

                    <Star variant="star" className="top-[13rem] right-[11rem]" delay={1} />
                    <Star
                        variant="star-faded"
                        className="top-[8rem] left-[20rem] md:top-[16rem] md:left-[16rem]"
                        delay={0.5}
                        showMobile={true}
                    />
                </div>

                <div className="relative z-10">
                    <FadeInSection>
                        <EventSection />
                    </FadeInSection>
                    <FadeInSection>
                        <TeamUpSection />
                    </FadeInSection>
                    <FadeInSection>
                        <ConnectSESA />
                    </FadeInSection>

                    <div className="pointer-events relative my-16 select-none md:mb-52">
                        {/* Bottom Star Decoration */}
                        <Star
                            variant="star"
                            className="absolute bottom-[-9rem] left-[4rem] rotate-[-110deg] transform md:bottom-[-8rem] md:left-[10rem]"
                            delay={1}
                            rotate={-110}
                        />
                        <Star
                            variant="star"
                            className="absolute right-[14rem] bottom-[-9rem] md:right-[10rem] md:bottom-[-10rem]"
                            delay={1}
                        />
                        <Star
                            variant="star-faded"
                            className="absolute right-[9rem] bottom-[-6rem] rotate-30 transform md:block"
                            delay={0.5}
                        />

                        <FadeInSection>
                            <InfiniteCarousel />
                        </FadeInSection>
                    </div>
                </div>
            </div>
        </HydrateClient>
    );
}
