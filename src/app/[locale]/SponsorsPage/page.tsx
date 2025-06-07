import SponsorsHeader from "./components/SponsorsHeader";
import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import PastCollaboratorsCarousel from "./components/PastCollaboratorsCarousel";
import SponsorCard from "./components/SponsorCard";
import SponsorsGrid from "./components/SponsorsGrid";
import SponsorCard2 from "./components/SponsorCard2";

// Precompile i18n
import localeParams from "../../data/locales";
export const generateStaticParams = localeParams;

const SponsorsPage = () => {
    return (
        <>
            <SponsorsHeader
                topText="Sponsor & partners"
                title="HUGE THANKS TO OUR GENEROUS SPONSORS AND PARTNERS"
                bottomText="Our incredible partnerships make SESA possible at uOttawa. Thank you for believing in our mission!"
                btn1="Become a sponsor"
                btn2="View Benefits"
            />
            <SponsorsGrid />
            <CTA />
            <SponsorCard />
            <PastCollaboratorsCarousel />
            <Benefits />
            <SponsorCard2 />
        </>
    );
};

export default SponsorsPage;
