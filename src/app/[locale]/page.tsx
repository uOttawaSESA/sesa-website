// Precompile i18n
import localeParams from "@/app/data/locales";
import FadeInSection from "@/components/FadeInSection";
import Connect from "./HomeComponents/ConnectSection/Connect";
import Events from "./HomeComponents/EventsSection/Events";
import FAQ from "./HomeComponents/FAQ/FAQ";
import Goals from "./HomeComponents/GoalsSection/Goals";
import Hero from "./HomeComponents/Hero";
import Quotes from "./HomeComponents/QuotesSection/Quotes";
import Resources from "./HomeComponents/ResourcesSection/Resources";
import Sponsors from "./HomeComponents/SponsorSection/Sponsors";
import Team from "./HomeComponents/TeamSection/Team";
import Providers from "./providers";
import type { Metadata } from "next";
export const generateStaticParams = localeParams;

export const metadata: Metadata = {
    title: "Home | Software Engineering Student Association",
    alternates: {
        canonical: "/",
        languages: {
            en: "/en",
            fr: "/fr",
        },
    },
};

const Home = () => {
    return (
        <div className="flex h-full flex-col gap-24 bg-gray-300 font-mono text-white lg:gap-20 xl:gap-32">
            <FadeInSection>
                <Hero />
            </FadeInSection>
            <FadeInSection>
                <Providers>
                    <Events />
                </Providers>
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
    );
};

export default Home;
