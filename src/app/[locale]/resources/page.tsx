import { resources } from "@/app/data/Resources";
import Header from "./components/Header";
import FooterSection from "./components/FooterSection";
import ResourceSection from "./components/ResourceSection";
import Image from "next/image";
import FadeInSection from "@/components/FadeInSection";

import type { Metadata } from "next";

// Precompile i18n
import localeParams from "@/app/data/locales";
export const generateStaticParams = localeParams;

export const metadata: Metadata = {
    title: "Resources | Software Engineering Student Association",
    description: "Stay prepared with SESA's resources at the University of Ottawa.",
    alternates: {
        canonical: "/resources",
        languages: {
            en: "/en/resources",
            fr: "/fr/resources",
        },
    },
    openGraph: {
        title: "Resources | Software Engineering Student Association",
        description: "Stay prepared with SESA's resources at the University of Ottawa.",
        url: new URL("https://sesa-aegl.ca/resources"),
    },
};

const Resources = () => {
    return (
        <div className="min-h-screen text-white">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                {/* Warm gradient */}
                <div className="fade-from-top-right-bg absolute right-0 h-[120rem] w-full bg-[#B1219D] bg-opacity-15 blur-3xl md:w-[80vw]" />

                <Image
                    src="/decoration/waves.svg"
                    className={`fade-from-top-bg absolute left-1/2 top-[26rem] hidden w-11/12 -translate-x-1/2 transform md:top-[10rem] md:block md:w-max ${resources.length === 0 ? "hidden" : ""}`}
                    width={1200}
                    height={280}
                    alt=""
                />
            </div>

            {/* Main Content Container */}
            <div className="container relative z-40 mx-auto w-full px-4 py-8 md:max-w-7xl">
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
    );
};

export default Resources;
