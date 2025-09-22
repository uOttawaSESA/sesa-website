import { useTranslations } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
// Precompile i18n
import localeParams from "@/app/data/locales";
import FadeInSection from "@/components/FadeInSection";
import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import PartnerWithUs from "./components/PartnerWithUs";
import PastCollaboratorsCarousel from "./components/PastCollaboratorsCarousel";
import SponsorsGrid from "./components/SponsorsGrid";
import SponsorsHeader from "./components/SponsorsHeader";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import type { Metadata } from "next";
export const generateStaticParams = localeParams;

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const t = await getTranslations("meta");

    const title = `${t("sponsors_title")} | ${t("title_suffix")}`;
    const description = t("sponsors_description");

    return {
        title,
        description,
        alternates: {
            canonical: `/${locale}/sponsors`,
            languages: {
                en: "/en/sponsors",
                fr: "/fr/sponsors",
            },
        },
        openGraph: {
            title,
            description,
            url: new URL("https://www.sesa-aegl.ca/sponsors"),
        },
    };
}

const Sponsors = () => {
    const t = useTranslations("sponsorships");

    return (
        <div className="relative">
            <FadeInSection>
                <SponsorsHeader
                    titleHighlighted={t("header_highlight")}
                    title={t("header_title_rest")}
                    topText={t("header_top")}
                    bottomText={t("header_bottom")}
                    btn1={t("header_btn1")}
                    btn2={t("header_btn2")}
                />
            </FadeInSection>
            <div className="relative z-20">
                <FadeInSection>
                    <SponsorsGrid />
                </FadeInSection>
            </div>
            <div className="relative z-10">
                <FadeInSection>
                    <CTA />
                </FadeInSection>
            </div>
            <FadeInSection>
                <TestimonialsCarousel />
            </FadeInSection>
            <FadeInSection>
                <PastCollaboratorsCarousel />
            </FadeInSection>
            <FadeInSection>
                <Benefits />
            </FadeInSection>
            <FadeInSection>
                <PartnerWithUs />
            </FadeInSection>
        </div>
    );
};

export default Sponsors;
