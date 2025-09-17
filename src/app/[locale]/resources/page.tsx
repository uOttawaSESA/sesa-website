import Image from "next/image";
import { NextResponse } from "next/server";
import { getLocale, getTranslations } from "next-intl/server";
// Precompile i18n
import localeParams from "@/app/data/locales";
import FadeInSection from "@/components/FadeInSection";
import { api, HydrateClient } from "@/trpc/server";
import FooterSection from "./components/FooterSection";
import Header from "./components/Header";
import ResourceSection from "./components/ResourceSection";
import type { Metadata } from "next";
export const generateStaticParams = localeParams;

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const t = await getTranslations("meta");

    const title = `${t("resources_title")} | ${t("title_suffix")}`;
    const description = t("resources_description");

    return {
        title,
        description,
        alternates: {
            canonical: `/${locale}/resources`,
            languages: {
                en: "/en/resources",
                fr: "/fr/resources",
            },
        },
        openGraph: {
            title,
            description,
            url: new URL("https://sesa-aegl.ca/resources"),
        },
    };
}

export default async function Resources() {
    const locale = await getLocale();
    if (locale !== "en" && locale !== "fr")
        return NextResponse.json({ message: "Invalid locale" }, { status: 400 });

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

    void api.resource.getUniqueCourses.prefetch();

    return (
        <HydrateClient>
            <div className="min-h-screen text-white">
                {/* Decorations */}
                <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                    {/* Warm gradient */}
                    <div className="fade-from-top-right-bg absolute right-0 h-[120rem] w-full bg-[#B1219D]/15 blur-3xl md:w-[80vw]" />

                    <Image
                        src="/decoration/waves.svg"
                        className="fade-from-top-bg -translate-x-1/2 absolute top-[26rem] left-1/2 hidden w-11/12 transform md:top-[10rem] md:block md:w-max"
                        width={1200}
                        height={280}
                        alt=""
                    />
                </div>

                {/* Main Content Container */}
                <div className="container relative z-30 mx-auto w-full px-4 py-8 md:max-w-7xl">
                    <FadeInSection>
                        <Header />
                    </FadeInSection>
                    <FadeInSection>
                        <ResourceSection />
                    </FadeInSection>
                </div>

                {/* Footer Section (CTA and Ange quote) */}
                <div className="relative z-10">
                    <FadeInSection>
                        <FooterSection />
                    </FadeInSection>
                </div>
            </div>
        </HydrateClient>
    );
}
