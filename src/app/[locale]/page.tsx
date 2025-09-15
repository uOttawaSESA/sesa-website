import { NextResponse } from "next/server";
import { getLocale, getTranslations } from "next-intl/server";
import localeParams from "@/app/data/locales";
import FadeInSection from "@/components/FadeInSection";
import { api, HydrateClient } from "@/trpc/server";
import Connect from "./HomeComponents/ConnectSection/Connect";
import Events from "./HomeComponents/EventsSection/Events";
import FAQ from "./HomeComponents/FAQ/FAQ";
import Goals from "./HomeComponents/GoalsSection/Goals";
import Hero from "./HomeComponents/Hero";
import Quotes from "./HomeComponents/QuotesSection/Quotes";
import Resources from "./HomeComponents/ResourcesSection/Resources";
import Sponsors from "./HomeComponents/SponsorSection/Sponsors";
import Team from "./HomeComponents/TeamSection/Team";
import type { Metadata } from "next";
export const generateStaticParams = localeParams;

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const t = await getTranslations("meta");

    return {
        title: `${t("homepage_title")} | ${t("title_suffix")}`,
        alternates: {
            canonical: `/${locale}`,
            languages: {
                en: "/en",
                fr: "/fr",
            },
        },
    };
}

export default async function Home() {
    const locale = await getLocale();
    if (locale !== "en" && locale !== "fr")
        return NextResponse.json({ message: "Invalid locale" }, { status: 400 });

    void api.event.getAll.prefetch({ locale });
    void api.resource.getCursorPage.prefetchInfinite({
        search: null,
        filters: {
            course: null,
            category: null,
            format: null,
            locale: null,
            tier: null,
        },
        sort: "created_desc",
    });

    return (
        <HydrateClient>
            <div className="flex h-full flex-col gap-24 bg-gray-300 font-mono text-white lg:gap-20 xl:gap-32">
                <FadeInSection>
                    <Hero />
                </FadeInSection>
                <FadeInSection>
                    <Events />
                </FadeInSection>
                <FadeInSection>
                    <Goals />
                </FadeInSection>
                <FadeInSection>
                    <Resources />
                </FadeInSection>
                <FadeInSection>
                    <Quotes />
                </FadeInSection>
                <FadeInSection>
                    <Sponsors />
                </FadeInSection>
                <FadeInSection>
                    <FAQ />
                </FadeInSection>
                <FadeInSection>
                    <Connect />
                </FadeInSection>
                <FadeInSection>
                    <Team />
                </FadeInSection>
            </div>
        </HydrateClient>
    );
}
