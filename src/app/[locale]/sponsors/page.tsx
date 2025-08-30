import SponsorsHeader from "./components/SponsorsHeader";
import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import PastCollaboratorsCarousel from "./components/PastCollaboratorsCarousel";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import SponsorsGrid from "./components/SponsorsGrid";
import PartnerWithUs from "./components/PartnerWithUs";
import FadeInSection from "@/components/FadeInSection";

import type { Metadata } from "next";

// Precompile i18n
import localeParams from "@/app/data/locales";
export const generateStaticParams = localeParams;

export const metadata: Metadata = {
    title: "Sponsors | Software Engineering Student Association",
    description: "The sponsors page for the University of Ottawa's SESA.",
    alternates: {
        canonical: "/sponsors",
        languages: {
            en: "/en/sponsors",
            fr: "/fr/sponsors",
        },
    },
    openGraph: {
        title: "Sponsors | Software Engineering Student Association",
        description: "The sponsors page for the University of Ottawa's SESA.",
        url: new URL("https://sesa-aegl.ca/sponsors"),
    },
};

const Sponsors = () => {
    return (
        <div className="relative">
            <FadeInSection>
                <SponsorsHeader
                    topText="Sponsor & partners"
                    title="HUGE THANKS TO OUR GENEROUS SPONSORS AND PARTNERS"
                    bottomText="Our incredible partnerships make SESA possible at uOttawa. Thank you for believing in our mission!"
                    btn1="Become a sponsor"
                    btn2="View Benefits"
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
