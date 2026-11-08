import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { api, HydrateClient } from "@/trpc/server";
import FooterSection from "./components/FooterSection";
import Header from "./components/Header";
import ResourceSection from "./components/ResourceSection";

// Refresh database-backed content hourly
export const revalidate = 3600;

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
            url: new URL("https://www.sesa-aegl.ca/resources"),
        },
    };
}

export default async function Resources() {
    const locale = await getLocale();
    if (locale !== "en" && locale !== "fr") notFound();
    const t = await getTranslations("resources");

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
                    <div className="fade-from-top-right-bg absolute right-0 h-480 w-full bg-[#B1219D]/15 blur-3xl md:w-[80vw]" />

                    <Image
                        src="/decoration/waves.svg"
                        className="fade-from-top-bg absolute top-104 left-1/2 hidden w-11/12 -translate-x-1/2 transform md:top-40 md:block md:w-max"
                        width={1200}
                        height={280}
                        alt=""
                    />
                </div>

                {/* Main Content Container */}
                <div className="container relative z-30 mx-auto w-full px-4 py-8 md:max-w-7xl">
                    <Header />
                    {/* Search/filter state lives in the URL, so this renders client-side */}
                    <Suspense
                        fallback={
                            <div className="flex w-full items-center justify-center py-12">
                                <p className="rounded-md px-4 py-2 font-sans text-violet-400">
                                    {t("query_state.pending")}
                                </p>
                            </div>
                        }
                    >
                        <ResourceSection />
                    </Suspense>
                </div>

                {/* Footer Section (CTA and Ange quote) */}
                <div className="relative z-10">
                    <FooterSection />
                </div>
            </div>
        </HydrateClient>
    );
}
